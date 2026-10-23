import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import {
  TRANSITION_EVENTS,
  broadcastState,
  cacheDeskRect,
  getCachedDeskRect,
  readSourceRect,
  type TransitionRect,
  type TransitionState,
} from '../../interactions/useTransitionState';
import { useReducedMotion } from '../../interactions/useReducedMotion';
import { markRevealSeen } from '../../interactions/usePlateProofReveal';
import { CustomEase, gsap } from '../../interactions/gsap';
import { projects } from '../../data/projects';
import styles from './NotebookTransition.module.css';

/**
 * Desk ↔ canvas portal, v2: one book and one gesture.
 *
 * The book is laid out at the final spread rect. Its front-cover image is
 * positioned so the visible board starts exactly at the hinge; the back of
 * that cover is the left half of the same spread image used by the pages.
 * Only the book group carries the camera push. The desk stage follows that
 * push until the paper wash covers the route change. At touchdown the left
 * page is uncovered and the cover is hidden in the same frame.
 *
 * Close keeps the plates on both paper surfaces, pulls the desk back with
 * the book, then hands the lifted cover to the real desk object for set-down.
 * Open and close retain the event bus and state machine. Reduced motion and
 * narrow screens use the 240ms paper crossfade.
 */

const ASSET_COVER = '/plate/notebook.webp';
const ASSET_SPREAD = '/canvas/open-notebook.webp';
const COVER_ASPECT = 947 / 1380;
// Keep in lockstep with CanvasRoute.module.css .backdrop.
const SPREAD_ASPECT = 2600 / 1812;
const REDUCED_MOTION_DURATION = 240;
const PUSH_EASE = CustomEase.create('notebook-push', '0.5,0,0.1,1');
const SWING_EASE = CustomEase.create('notebook-swing', '0.45,0,0.4,1');
const CLOSE_SWING_EASE = CustomEase.create('notebook-close-swing', '0.45,0,0.65,1');
const CLOSE_CAMERA_EASE = CustomEase.create('notebook-close-camera', '0.5,0,0.2,1');
const CLIPPED_PAGES = 'inset(0 0 0 50%)';
const FULL_PAGES = 'inset(0 0 0 0)';

interface BookPose {
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
}

interface Layers {
  root: HTMLDivElement;
  background: HTMLDivElement;
  book: HTMLDivElement;
  pages: HTMLDivElement;
  pagesContent: HTMLDivElement;
  cover: HTMLDivElement;
  backContent: HTMLDivElement;
  frontShade: HTMLDivElement;
  backShade: HTMLDivElement;
  pageShadow: HTMLDivElement;
  gutter: HTMLDivElement;
  shadowLeft: HTMLDivElement;
  shadowRight: HTMLDivElement;
}

function computeCanvasSpreadRect(): TransitionRect {
  const height = window.innerHeight;
  const width = height * SPREAD_ASPECT;
  return {
    left: (window.innerWidth - width) / 2,
    top: 0,
    width,
    height,
  };
}

/** The closed image box whose visible board matches the spread's right board. */
function computeCoverEndRect(spread: TransitionRect): TransitionRect {
  return {
    left: spread.left + 0.4590 * spread.width,
    top: spread.top - 0.0123 * spread.height,
    width: 0.5711 * spread.width,
    height: 1.0475 * spread.height,
  };
}

/** Transform the final-size book so its cover image coincides with the desk. */
function computeBookStartPose(
  desk: TransitionRect,
  spread: TransitionRect,
  coverEnd: TransitionRect,
): BookPose {
  const scaleX = desk.width / coverEnd.width;
  const scaleY = desk.height / coverEnd.height;
  return {
    x: desk.left - spread.left - (coverEnd.left - spread.left) * scaleX,
    y: desk.top - spread.top - (coverEnd.top - spread.top) * scaleY,
    scaleX,
    scaleY,
  };
}

/**
 * Cold /works visits have no measured desk frame yet. Match the responsive
 * cover size, but keep the position provisional: the newly mounted desk's
 * actual bounds own the close handoff.
 */
function fallbackDeskRect(): TransitionRect {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  let width: number;
  if (vw <= 767) width = 200;
  else if (vw <= 1023) width = 240;
  else if (vw <= 1279) width = 300;
  else {
    // Keep chrome, caption, and sketch overhang in sync with
    // DeskRoute.module.css. The desktop identity shares the cover row.
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    const preferredWidth = Math.min(720, Math.max(340, vw * 0.18 + 108));
    const captionHeight = 42 + rootFontSize * 0.75 * 1.3;
    const availableWidth = (vh - 314 - captionHeight) / 1.607;
    width = Math.max(300, Math.min(preferredWidth, availableWidth));
  }
  const height = width / COVER_ASPECT;
  return {
    left: (vw - width) / 2,
    top: (vh - height) / 2,
    width,
    height,
  };
}

function centre(rect: TransitionRect): { x: number; y: number } {
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}

function setBookRect(book: HTMLElement, rect: TransitionRect): void {
  gsap.set(book, {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
    transformOrigin: '0 0',
    visibility: 'visible',
  });
}

/**
 * All lighting is derived from one angular progress value. quickSetter
 * writes only transforms and opacity, so light cannot trail the cover.
 */
function makeLightController(layers: Layers): (progress: number) => void {
  const rotateCover = gsap.quickSetter(layers.cover, 'rotationY', 'deg');
  const frontOpacity = gsap.quickSetter(layers.frontShade, 'opacity');
  const backOpacity = gsap.quickSetter(layers.backShade, 'opacity');
  const pageOpacity = gsap.quickSetter(layers.pageShadow, 'opacity');
  const pageScale = gsap.quickSetter(layers.pageShadow, 'scaleX');
  const gutterOpacity = gsap.quickSetter(layers.gutter, 'opacity');
  const leftOpacity = gsap.quickSetter(layers.shadowLeft, 'opacity');
  const leftScale = gsap.quickSetter(layers.shadowLeft, 'scaleX');

  return (progress: number) => {
    const angle = 180 * progress;
    const radians = angle * Math.PI / 180;
    const sine = Math.max(0, Math.sin(radians));
    const cosine = Math.cos(radians);

    rotateCover(-angle);
    frontOpacity(angle <= 90 ? 0.45 * sine : 0);
    backOpacity(angle >= 90 ? 0.32 * sine : 0);
    pageOpacity(0.34 * sine);
    pageScale(Math.min(1, Math.max(0, cosine + 0.35 * sine)));
    gutterOpacity(0.5 + 0.5 * sine);
    leftScale(Math.max(0, -cosine));
    leftOpacity(Math.min(1, Math.max(0, (angle - 100) / 80)));
  };
}

function primeBook(
  layers: Layers,
  spread: TransitionRect,
  pose: BookPose,
  opened: boolean,
): (progress: number) => void {
  const { root, background, book, pages, cover, shadowLeft, shadowRight } = layers;
  gsap.set(root, { opacity: 1, pointerEvents: 'auto' });
  gsap.set(background, { opacity: 0 });
  setBookRect(book, spread);
  gsap.set(book, pose);
  gsap.set(pages, {
    opacity: opened ? 1 : 0,
    clipPath: CLIPPED_PAGES,
  });
  gsap.set(cover, {
    visibility: 'visible',
    transformOrigin: '0% 50%',
  });
  gsap.set(shadowRight, { opacity: opened ? 1 : 0 });
  gsap.set(shadowLeft, {
    opacity: opened ? 1 : 0,
    scaleX: opened ? 1 : 0,
    transformOrigin: '100% 50%',
  });

  const light = makeLightController(layers);
  light(opened ? 1 : 0);
  return light;
}

/** Preserve the actual visible spread for the first frame of desktop close. */
function snapshotBookContent(spread: TransitionRect): DocumentFragment | null {
  const sources = Array.from(
    document.querySelectorAll<HTMLElement>('[data-book-content]'),
  );
  if (!sources.length || sources.some((source) => {
    let current: HTMLElement | null = source;
    while (current && !current.hasAttribute('data-entry-motion')) {
      if (Number(getComputedStyle(current).opacity) < 0.999) return true;
      current = current.parentElement;
    }
    return false;
  })) return null;

  const fragment = document.createDocumentFragment();
  for (const source of sources) {
    const rect = source.getBoundingClientRect();
    const clone = source.cloneNode(true) as HTMLElement;
    clone.querySelectorAll('video, [data-paper-mesh]').forEach((node) => node.remove());
    clone.querySelectorAll('img').forEach((img) => { img.loading = 'eager'; });
    clone.removeAttribute('data-paper-bending');
    clone.removeAttribute('data-previewing');
    Object.assign(clone.style, {
      position: 'absolute',
      margin: '0',
      maxWidth: 'none',
      left: `${rect.left - spread.left}px`,
      top: `${rect.top - spread.top}px`,
      right: 'auto',
      bottom: 'auto',
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      animation: 'none',
      transition: 'none',
      transform: 'none',
      opacity: '1',
    });
    fragment.append(clone);
  }
  return fragment;
}

let canvasMockupsPreloaded = false;
function preloadCanvasMockups(): void {
  if (canvasMockupsPreloaded || typeof window === 'undefined') return;
  canvasMockupsPreloaded = true;
  for (const project of projects) {
    if (!project.mockup) continue;
    const img = new Image();
    img.src = project.mockup;
    img.decode?.().catch(() => {
      // Normal image loading still handles a decode failure.
    });
  }
}

const warnedAssets = new Set<string>();
function warnMissingAsset(src: string): void {
  if (warnedAssets.has(src)) return;
  warnedAssets.add(src);
  console.warn('[NotebookTransition] Asset missing or failed to load: ' + src);
}

function tweenOpacity(
  target: HTMLElement,
  opacity: number,
  durationMs: number,
): Promise<void> {
  return new Promise((resolve) => {
    gsap.to(target, {
      opacity,
      duration: durationMs / 1000,
      ease: 'power2.out',
      overwrite: 'auto',
      onComplete: resolve,
      onInterrupt: resolve,
    });
  });
}

async function fadeBetweenSurfaces(
  background: HTMLElement,
  onMidpoint: () => void,
): Promise<void> {
  gsap.killTweensOf(background);
  gsap.set(background, { opacity: 0 });
  await tweenOpacity(background, 1, REDUCED_MOTION_DURATION / 2);
  onMidpoint();
  await new Promise<void>((resolve) => window.setTimeout(resolve, 16));
  await tweenOpacity(background, 0, REDUCED_MOTION_DURATION / 2);
}

export default function NotebookTransition() {
  const navigate = useNavigate();
  const location = useLocation();
  const reducedMotion = useReducedMotion();
  const [state, setState] = useState<TransitionState>(() =>
    typeof window !== 'undefined' && window.location.pathname === '/works'
      ? 'open'
      : 'idle',
  );

  const rootRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const pagesRef = useRef<HTMLDivElement>(null);
  const pagesContentRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const backContentRef = useRef<HTMLDivElement>(null);
  const frontShadeRef = useRef<HTMLDivElement>(null);
  const backShadeRef = useRef<HTMLDivElement>(null);
  const pageShadowRef = useRef<HTMLDivElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);
  const shadowLeftRef = useRef<HTMLDivElement>(null);
  const shadowRightRef = useRef<HTMLDivElement>(null);
  const isRunningRef = useRef(false);
  const activeTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const mountedRef = useRef(true);
  const navigateRef = useRef(navigate);

  const getLayers = useCallback((): Layers | null => {
    const root = rootRef.current;
    const background = backgroundRef.current;
    const book = bookRef.current;
    const pages = pagesRef.current;
    const pagesContent = pagesContentRef.current;
    const cover = coverRef.current;
    const backContent = backContentRef.current;
    const frontShade = frontShadeRef.current;
    const backShade = backShadeRef.current;
    const pageShadow = pageShadowRef.current;
    const gutter = gutterRef.current;
    const shadowLeft = shadowLeftRef.current;
    const shadowRight = shadowRightRef.current;
    if (
      !root || !background || !book || !pages || !pagesContent ||
      !cover || !backContent ||
      !frontShade || !backShade || !pageShadow || !gutter ||
      !shadowLeft || !shadowRight
    ) return null;
    return {
      root, background, book, pages, pagesContent, cover, backContent,
      frontShade, backShade,
      pageShadow, gutter, shadowLeft, shadowRight,
    };
  }, []);

  const transitionTo = useCallback((next: TransitionState) => {
    setState(next);
    broadcastState(next);
  }, []);

  useEffect(() => {
    navigateRef.current = navigate;
  }, [navigate]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      activeTimelineRef.current?.kill();
    };
  }, []);

  useEffect(() => {
    const idleWindow = window as unknown as {
      requestIdleCallback?: (callback: () => void) => number;
      cancelIdleCallback?: (id: number) => void;
      setTimeout: Window['setTimeout'];
      clearTimeout: Window['clearTimeout'];
    };
    if (typeof idleWindow.requestIdleCallback === 'function') {
      const id = idleWindow.requestIdleCallback(preloadCanvasMockups);
      return () => idleWindow.cancelIdleCallback?.(id);
    }
    const id = idleWindow.setTimeout(preloadCanvasMockups, 600);
    return () => idleWindow.clearTimeout(id);
  }, []);

  // Keep deep links and external navigation coherent with the event bus.
  useEffect(() => {
    let nextState: TransitionState | null = null;
    if (state === 'idle' && location.pathname === '/works') {
      nextState = 'open';
    } else if (state === 'open' && location.pathname === '/') {
      nextState = 'idle';
    }
    if (!nextState) return;
    const id = window.setTimeout(() => transitionTo(nextState), 0);
    return () => window.clearTimeout(id);
  }, [location.pathname, state, transitionTo]);

  const runOpen = useCallback(async () => {
    const layers = getLayers();
    if (!layers || isRunningRef.current) return;
    isRunningRef.current = true;
    let deskVisual: HTMLElement | null = null;
    let deskVisibility = '';
    let stage: HTMLElement | null = null;

    try {
      preloadCanvasMockups();
      const deskRect = readSourceRect('notebook') ?? fallbackDeskRect();
      const spreadRect = computeCanvasSpreadRect();
      const endRect = computeCoverEndRect(spreadRect);
      const startPose = computeBookStartPose(deskRect, spreadRect, endRect);
      cacheDeskRect(deskRect);

      deskVisual = document.querySelector<HTMLElement>(
        '[data-transition-visual-source="notebook"]',
      );
      stage = document.querySelector<HTMLElement>('[data-transition-stage="desk"]');
      const stageRect = stage?.getBoundingClientRect();

      // Read all geometry before writing any transforms.
      transitionTo('opening');
      const light = primeBook(layers, spreadRect, startPose, false);
      if (stage && stageRect) {
        const deskCentre = centre(deskRect);
        gsap.set(stage, {
          transformOrigin:
            String(deskCentre.x - stageRect.left) + 'px ' +
            String(deskCentre.y - stageRect.top) + 'px',
          willChange: 'transform',
        });
        // The desk stage and book use the same eased camera progress.
        gsap.set(stage, { x: 0, y: 0, scale: 1 });
      }
      if (deskVisual) {
        deskVisibility = deskVisual.style.visibility;
        deskVisual.style.visibility = 'hidden';
      }
      void layers.book.offsetHeight;

      const swing = { progress: 0 };
      let touchdown = false;
      let navigated = false;
      let finish: (completed: boolean) => void = () => undefined;
      const finished = new Promise<boolean>((resolve) => {
        finish = resolve;
      });
      const timeline = gsap.timeline({
        defaults: { overwrite: 'auto' },
        onComplete: () => finish(true),
        onInterrupt: () => finish(false),
        onUpdate: () => {
          // This also makes reverse frame-stepping of the timeline truthful.
          const reached = timeline.time() >= 0.98 - 0.0001;
          if (reached === touchdown) return;
          touchdown = reached;
          gsap.set(layers.pages, {
            clipPath: reached ? FULL_PAGES : CLIPPED_PAGES,
          });
          gsap.set(layers.cover, {
            visibility: reached ? 'hidden' : 'visible',
          });
        },
      });
      activeTimelineRef.current = timeline;

      timeline
        .addLabel('takeover', 0)
        .to(layers.book, {
          x: 0, y: 0, scaleX: 1, scaleY: 1,
          duration: 0.88,
          ease: PUSH_EASE,
        }, 'takeover');

      if (stage && stageRect) {
        const deskCentre = centre(deskRect);
        const endCentre = centre(endRect);
        timeline.to(stage, {
          x: endCentre.x - deskCentre.x,
          y: endCentre.y - deskCentre.y,
          scale: endRect.height / deskRect.height,
          duration: 0.88,
          ease: PUSH_EASE,
        }, 'takeover');
      }

      timeline
        .addLabel('swing', 0.04)
        .to(swing, {
          progress: 1,
          duration: 0.94,
          ease: SWING_EASE,
          onUpdate: () => light(swing.progress),
        }, 'swing')
        .to(layers.background, {
          opacity: 1,
          duration: 0.38,
          ease: 'power1.inOut',
        }, 0.08)
        .to(layers.pages, {
          opacity: 1,
          duration: 0.08,
          ease: 'none',
        }, 0.10)
        .to(layers.shadowRight, {
          opacity: 1,
          duration: 0.40,
          ease: 'power1.out',
        }, 0.10)
        .call(() => {
          if (navigated) return;
          navigated = true;
          navigateRef.current('/works');
        }, undefined, 0.50)
        .addLabel('touchdown', 0.98)
        .to(layers.root, {
          opacity: 0,
          duration: 0.18,
          ease: 'power2.out',
        }, 'touchdown');

      const completed = await finished;
      if (mountedRef.current) {
        transitionTo(
          completed || window.location.pathname === '/works' ? 'open' : 'idle',
        );
      }
    } finally {
      if (deskVisual) deskVisual.style.visibility = deskVisibility;
      if (stage) {
        gsap.killTweensOf(stage);
        gsap.set(stage, { clearProps: 'transform,transformOrigin,willChange' });
      }
      gsap.set(layers.book, { visibility: 'hidden' });
      gsap.set(layers.root, { pointerEvents: 'none' });
      activeTimelineRef.current = null;
      isRunningRef.current = false;
    }
  }, [getLayers, transitionTo]);

  const runClose = useCallback(async () => {
    const layers = getLayers();
    if (!layers || isRunningRef.current) return;
    isRunningRef.current = true;
    let stage: HTMLElement | null = null;
    const deskVisualState: { element: HTMLElement | null } = { element: null };
    let timeline: gsap.core.Timeline | null = null;
    let handedOff = false;
    const chrome = Array.from(
      document.querySelectorAll<HTMLElement>('[data-canvas-chrome]'),
      (element) => ({ element, visibility: element.style.visibility }),
    );

    try {
      const spreadRect = readSourceRect('spread') ?? computeCanvasSpreadRect();
      const endRect = computeCoverEndRect(spreadRect);
      let deskRect = getCachedDeskRect() ?? fallbackDeskRect();
      let pose = computeBookStartPose(deskRect, spreadRect, endRect);
      let push = { x: 0, y: 0, scale: 1 };
      const desktop = window.matchMedia('(min-width: 1101px)').matches;
      const snapshot = desktop ? snapshotBookContent(spreadRect) : null;
      layers.pagesContent.replaceChildren();
      layers.backContent.replaceChildren();
      if (snapshot) {
        const parent = document.querySelector<HTMLElement>('[data-book-content]')?.parentElement;
        if (parent) {
          const computed = getComputedStyle(parent);
          for (const container of [layers.pagesContent, layers.backContent]) {
            container.style.font = computed.font;
            container.style.color = computed.color;
          }
        }
        layers.backContent.append(snapshot.cloneNode(true));
        layers.pagesContent.append(snapshot);
      }

      // The route chrome must leave on the click frame, before React renders.
      chrome.forEach(({ element }) => { element.style.visibility = 'hidden'; });
      transitionTo('closing');
      const light = primeBook(
        layers,
        spreadRect,
        { x: 0, y: 0, scaleX: 1, scaleY: 1 },
        true,
      );
      if (!snapshot) gsap.set(layers.root, { opacity: 0 });
      void layers.book.offsetHeight;

      const bookX = gsap.quickSetter(layers.book, 'x', 'px');
      const bookY = gsap.quickSetter(layers.book, 'y', 'px');
      const bookScaleX = gsap.quickSetter(layers.book, 'scaleX');
      const bookScaleY = gsap.quickSetter(layers.book, 'scaleY');
      let stageX: ((value: number) => void) | null = null;
      let stageY: ((value: number) => void) | null = null;
      let stageScale: ((value: number) => void) | null = null;
      const camera = { q: 0 };

      const adoptDesk = () => {
        const nextStage = document.querySelector<HTMLElement>(
          '[data-transition-stage="desk"]',
        );
        if (!nextStage) return;
        // The hidden, lifted notebook still has measurable bounds. Read them
        // before transforming its plate, then use those live bounds for landing.
        const liveRect = readSourceRect('notebook');
        if (!liveRect || liveRect.width < 1 || liveRect.height < 1) return;
        const stageRect = nextStage.getBoundingClientRect();
        deskRect = liveRect;
        cacheDeskRect(liveRect);
        pose = computeBookStartPose(liveRect, spreadRect, endRect);
        const deskCentre = centre(liveRect);
        const endCentre = centre(endRect);
        push = {
          x: endCentre.x - deskCentre.x,
          y: endCentre.y - deskCentre.y,
          scale: endRect.height / liveRect.height,
        };
        stage = nextStage;
        deskVisualState.element = document.querySelector<HTMLElement>(
          '[data-transition-visual-source="notebook"]',
        );
        gsap.set(nextStage, {
          transformOrigin:
            `${deskCentre.x - stageRect.left}px ${deskCentre.y - stageRect.top}px`,
          willChange: 'transform',
        });
        stageX = gsap.quickSetter(nextStage, 'x', 'px') as (value: number) => void;
        stageY = gsap.quickSetter(nextStage, 'y', 'px') as (value: number) => void;
        stageScale = gsap.quickSetter(nextStage, 'scale') as (value: number) => void;
        // The wash stays opaque until the new route and its camera are ready.
        timeline?.to(layers.background, {
          opacity: 0,
          duration: 0.40,
          ease: 'power1.inOut',
        }, Math.max(0.16, timeline.time()));
      };

      const applyCamera = () => {
        if (!stage) adoptDesk();
        const q = camera.q;
        bookX(pose.x * q);
        bookY(pose.y * q);
        bookScaleX(1 + (pose.scaleX - 1) * q);
        bookScaleY(1 + (pose.scaleY - 1) * q);
        if (stage && stageX && stageY && stageScale) {
          stageX(push.x * (1 - q));
          stageY(push.y * (1 - q));
          stageScale(1 + (push.scale - 1) * (1 - q));
        }
      };
      const swing = { progress: 1 };
      let navigated = false;
      let finish: (completed: boolean) => void = () => undefined;
      const finished = new Promise<boolean>((resolve) => {
        finish = resolve;
      });
      timeline = gsap.timeline({
        defaults: { overwrite: 'auto' },
        onComplete: () => finish(true),
        onInterrupt: () => finish(false),
      });
      activeTimelineRef.current = timeline;

      timeline
        .addLabel('fold', 0)
        .to(swing, {
          progress: 0,
          duration: 0.62,
          ease: CLOSE_SWING_EASE,
          onUpdate: () => light(swing.progress),
        }, 'fold')
        .to(layers.background, {
          opacity: 1,
          duration: 0.10,
          ease: 'none',
        }, 'fold')
        .call(() => {
          if (navigated) return;
          navigated = true;
          markRevealSeen();
          navigateRef.current('/');
        }, undefined, 0.10)
        .to(camera, {
          q: 1,
          duration: 0.60,
          ease: CLOSE_CAMERA_EASE,
          onUpdate: applyCamera,
        }, 0.10)
        .to(layers.shadowRight, {
          opacity: 0,
          duration: 0.25,
          ease: 'power1.in',
        }, 0.40)
        .to(layers.pages, {
          opacity: 0,
          duration: 0.06,
          ease: 'none',
        }, 0.56)
        .call(() => {
          if (!stage) adoptDesk();
          applyCamera();
          if (deskVisualState.element) deskVisualState.element.style.visibility = '';
          gsap.set(layers.book, { visibility: 'hidden' });
          gsap.set(layers.root, { opacity: 0, pointerEvents: 'none' });
          handedOff = true;
          transitionTo(window.location.pathname === '/' ? 'idle' : 'open');
          finish(true);
        }, undefined, 0.70);

      if (!snapshot) {
        timeline.to(layers.root, {
          opacity: 1,
          duration: 0.10,
          ease: 'none',
        }, 'fold');
      }

      const completed = await finished;
      if (mountedRef.current && !handedOff) {
        transitionTo(
          completed || window.location.pathname === '/' ? 'idle' : 'open',
        );
      }
    } finally {
      timeline?.kill();
      chrome.forEach(({ element, visibility }) => {
        element.style.visibility = visibility;
      });
      if (deskVisualState.element) deskVisualState.element.style.visibility = '';
      if (stage) {
        gsap.killTweensOf(stage);
        gsap.set(stage, { clearProps: 'transform,transformOrigin,willChange' });
      }
      layers.pagesContent.replaceChildren();
      layers.backContent.replaceChildren();
      gsap.set(layers.book, { visibility: 'hidden' });
      gsap.set(layers.background, { opacity: 0 });
      gsap.set(layers.root, { opacity: 0, pointerEvents: 'none' });
      activeTimelineRef.current = null;
      isRunningRef.current = false;
    }
  }, [getLayers, transitionTo]);

  const runOpenReduced = useCallback(async () => {
    const layers = getLayers();
    if (!layers || isRunningRef.current) return;
    isRunningRef.current = true;
    try {
      gsap.set(layers.root, { opacity: 1, pointerEvents: 'auto' });
      gsap.set(layers.book, { visibility: 'hidden' });
      transitionTo('opening');
      await fadeBetweenSurfaces(
        layers.background,
        () => navigateRef.current('/works'),
      );
      if (mountedRef.current) transitionTo('open');
    } finally {
      gsap.set(layers.root, { pointerEvents: 'none' });
      isRunningRef.current = false;
    }
  }, [getLayers, transitionTo]);

  const runCloseReduced = useCallback(async () => {
    const layers = getLayers();
    if (!layers || isRunningRef.current) return;
    isRunningRef.current = true;
    try {
      gsap.set(layers.root, { opacity: 1, pointerEvents: 'auto' });
      gsap.set(layers.book, { visibility: 'hidden' });
      transitionTo('closing');
      await fadeBetweenSurfaces(
        layers.background,
        () => {
          markRevealSeen();
          navigateRef.current('/');
        },
      );
      if (mountedRef.current) transitionTo('idle');
    } finally {
      gsap.set(layers.root, { pointerEvents: 'none' });
      isRunningRef.current = false;
    }
  }, [getLayers, transitionTo]);

  useEffect(() => {
    const simpleMotionRequested = () =>
      reducedMotion || window.matchMedia('(max-width: 767px)').matches;
    const onOpen = () => {
      if (simpleMotionRequested()) void runOpenReduced();
      else void runOpen();
    };
    const onClose = () => {
      if (simpleMotionRequested()) void runCloseReduced();
      else void runClose();
    };
    window.addEventListener(TRANSITION_EVENTS.open, onOpen);
    window.addEventListener(TRANSITION_EVENTS.close, onClose);
    return () => {
      window.removeEventListener(TRANSITION_EVENTS.open, onOpen);
      window.removeEventListener(TRANSITION_EVENTS.close, onClose);
    };
  }, [reducedMotion, runOpen, runClose, runOpenReduced, runCloseReduced]);

  const isActive = state === 'opening' || state === 'closing';

  return (
    <div
      ref={rootRef}
      className={
        styles.root +
        (isActive ? ' ' + styles.rootActive : '') +
        (reducedMotion ? ' ' + styles.reducedMotion : '')
      }
      style={{ opacity: 0 }}
      aria-hidden="true"
    >
      <img
        className={styles.preload}
        src={ASSET_SPREAD}
        alt=""
        onError={() => warnMissingAsset(ASSET_SPREAD)}
      />
      <div
        ref={backgroundRef}
        className={styles.background}
        style={{ opacity: 0 }}
      />
      <div
        ref={bookRef}
        className={styles.book}
        style={{ visibility: 'hidden' }}
      >
        <div ref={shadowRightRef} className={styles.shadowRight} />
        <div ref={shadowLeftRef} className={styles.shadowLeft} />
        <div ref={pagesRef} className={styles.pages}>
          <img
            src={ASSET_SPREAD}
            alt=""
            draggable={false}
            onError={() => warnMissingAsset(ASSET_SPREAD)}
          />
          <div ref={pagesContentRef} className={styles.pagesContent} />
        </div>
        <div ref={pageShadowRef} className={styles.pageShadow} />
        <div ref={gutterRef} className={styles.gutter} />
        <div ref={coverRef} className={styles.cover}>
          <div className={styles.coverFront}>
            <img
              src={ASSET_COVER}
              alt=""
              draggable={false}
              onError={() => warnMissingAsset(ASSET_COVER)}
            />
            <div ref={frontShadeRef} className={styles.frontShade} />
          </div>
          <div className={styles.coverBack}>
            <div ref={backContentRef} className={styles.backContent} />
            <div ref={backShadeRef} className={styles.backShade} />
          </div>
          <div className={styles.coverEdge} />
        </div>
      </div>
    </div>
  );
}
