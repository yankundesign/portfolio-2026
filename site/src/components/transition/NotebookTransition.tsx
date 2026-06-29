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
import { gsap } from '../../interactions/gsap';
import styles from './NotebookTransition.module.css';

/**
 * NotebookTransition — the desk → canvas signature transition overlay.
 *
 * Mounted once at the app root. Listens to `notebook:open` /
 * `notebook:close` events from the trigger components (NotebookCover,
 * CanvasCloseButton, CanvasRoute Escape handler) and orchestrates the
 * 8-beat choreography described in `00-brief/prd-desk-canvas-transition.md`.
 *
 * The overlay paints all the visible work during the transition:
 *
 *   1. Captures the source rect (desk notebook OR canvas spread) from a
 *      tagged DOM element via `[data-transition-source]`.
 *   2. Snaps the layers into their start positions.
 *   3. Runs the choreography: cover lifts, rotates, position/scale morphs,
 *      spread fades in beneath, background paper covers the route swap.
 *   4. At the choreography midpoint (~400ms open / ~300ms close), calls
 *      `navigate()` so the URL changes mid-flight while the overlay's
 *      paper background covers the route swap.
 *   5. Settles at the destination, fades the overlay out, revealing the
 *      destination route's content underneath.
 *
 * The animation engine is GSAP. Earlier versions used hand-written WAAPI
 * promise helpers; the current version keeps the same measured layer model
 * but lets GSAP own tween lifecycle, easing, interruption, and cleanup.
 *
 * AnimatePresence is still used at the App root for route-level transitions
 * (currently a no-op for non-motion children, set up for future use).
 *
 * Architecture: TWO layers, each animated separately:
 *
 *   spread     The open-notebook spread. Fixed at canvas-center geometry
 *              from the first frame; only opacity animates.
 *   cover      The rotating notebook cover. Uses the SAME asset as the
 *              desk (`/plate/notebook.webp`) so the start/end frames are
 *              pixel-identical to what the desk paints — no asset
 *              swap, no cross-fade handoff, no aspect-ratio mismatch.
 *              Position/size morph from desk-rect to spread-binding-half-
 *              rect; rotation hinges around its left edge (the spine).
 *              `backface-visibility: hidden` makes it disappear past 90°
 *              of rotation, revealing the spread underneath.
 *   bg         Paper-coloured wash that covers the route swap.
 *
 * Why one asset for the cover (was three layers: closed + cover + spread):
 * v1.1 used a separate `notebook-closed.png` and `notebook-cover-front.png`
 * for the cover layer. Both had aspect 0.598; the desk asset has aspect
 * 0.686. That mismatch meant the overlay's notebook was visibly NARROWER
 * than the desk's, with letterbox gaps from `object-fit: contain`. The
 * cover-front asset also got obscured because the cross-fade swap from
 * "closed" to "cover" was too quick to see. v1.2 (this version) drops
 * both transition assets and uses the desk asset directly. One source of
 * truth, perfect alignment, no swap to obscure.
 *
 * Reduced motion: skip the 3D rotation and morph, run a 240ms paper
 * cross-fade between the two surfaces.
 */

const ASSET_COVER = '/plate/notebook.webp';
const ASSET_SPREAD = '/canvas/open-notebook.webp';

const COVER_ASPECT = 947 / 1380;
const SPREAD_ASPECT = 2600 / 1812;
const SPREAD_PAGE_TOP_RATIO = 0.07;
const SPREAD_PAGE_BOTTOM_RATIO = 0.07;
const SPREAD_LEFT_PAGE_WIDTH_RATIO = 0.42;
const REDUCED_MOTION_DURATION = 240;

/* ─── Easing curves ──────────────────────────────────────────────────────────
 *
 * EASE_OUT_EXPO is the workhorse. Confident deceleration, no overshoot, the
 * curve a heavy hardcover would actually trace under its own weight. Used
 * for the cover rotation, the position+size morph, and the soft landing.
 *
 * EASE_INOUT_PAPER is for the gentle lift — soft acceleration into the rise,
 * soft deceleration into the pause. Mimics fingers slowly lifting an object.
 *
 * EASE_OUT is the standard cross-fade curve for opacity transitions where
 * physical metaphor doesn't apply (background paper, asset cross-fades).
 *
 * No overshoot/spring curves anywhere. They feel snappy at this scale and
 * draw attention to the animation rather than the object being animated.
 * ────────────────────────────────────────────────────────────────────────── */
const EASE_OUT_EXPO = 'cubic-bezier(0.16, 1, 0.3, 1)';
const EASE_INOUT_PAPER = 'cubic-bezier(0.42, 0, 0.32, 1)';
const EASE_OUT = 'cubic-bezier(0.4, 0, 0.2, 1)';
const EASE_LINEAR = 'linear';

/**
 * Canvas v0.9 geometry. The canvas notebook is a fixed, full-height backdrop
 * (`CanvasRoute.module.css .backdrop`), cropped at the sides when wider than
 * the viewport. This MUST mirror that CSS exactly so the open transition's
 * cover endpoint and the close transition's measured rect agree:
 *
 *   height = 100svh, width = height * SPREAD_ASPECT, horizontally centered.
 *
 * Close prefers the live measurement of `[data-transition-source="spread"]`
 * (the backdrop element); this computed value is the fallback and the open
 * endpoint, so the two stay in lockstep.
 */
function computeCanvasSpreadRect(): TransitionRect {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const height = vh;
  const width = height * SPREAD_ASPECT;
  return {
    left: (vw - width) / 2,
    top: 0,
    width,
    height,
  };
}

/**
 * Where the front cover lays when fully open. The spine sits at the
 * spread's horizontal midpoint; the cover's wrapper is anchored with its
 * LEFT edge at the binding so `transform-origin: 0% 50%` rotates around
 * the spine. At rotation 0 the cover faces right (closed-look orientation
 * on top of the spread); at rotation -180 the cover lays flat into the
 * spread's left half — actual book physics.
 */
function computeOpenCoverRect(spread: TransitionRect): TransitionRect {
  const halfWidth = spread.width / 2;
  const pageTop = spread.top + spread.height * SPREAD_PAGE_TOP_RATIO;
  const pageHeight =
    spread.height * (1 - SPREAD_PAGE_TOP_RATIO - SPREAD_PAGE_BOTTOM_RATIO);
  const leftPageWidth = spread.width * SPREAD_LEFT_PAGE_WIDTH_RATIO;
  const coverWidth = Math.min(leftPageWidth, pageHeight * COVER_ASPECT);
  return {
    left: spread.left + halfWidth,
    top: pageTop,
    width: coverWidth,
    height: pageHeight,
  };
}

/**
 * Default rect if the desk notebook can't be measured AND we have no
 * cached value (cold deep-link to /works). Mirrors the responsive width
 * media queries from `NotebookCover.module.css` so the fallback is at
 * least the right size for the current viewport — even if the position
 * is just a viewport-center guess.
 */
function fallbackDeskRect(): TransitionRect {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  // Match the breakpoints in NotebookCover.module.css `.image` rules.
  let width: number;
  if (vw >= 2000) width = 480;
  else if (vw >= 1600) width = 400;
  else if (vw <= 767) width = 200;
  else if (vw <= 1023) width = 240;
  else if (vw <= 1279) width = 300;
  else width = 340;
  // Native asset aspect: 947 / 1380 ≈ 0.686 → height = width / 0.686.
  const height = width / COVER_ASPECT;
  return {
    left: (vw - width) / 2,
    top: (vh - height) / 2,
    width,
    height,
  };
}

const warnedAssets = new Set<string>();
function warnMissingAsset(src: string): void {
  if (warnedAssets.has(src)) return;
  warnedAssets.add(src);
  console.warn(
    `[NotebookTransition] Asset missing or failed to load: ${src}. ` +
      `Generate the real asset per 00-brief/transition-asset-prompts.md ` +
      `to remove the placeholder fallback.`,
  );
}

/**
 * Snap a layer (wrapper) to a static rect + opacity + lift offset.
 * Cancels any in-flight animations on the element. The wrapper's
 * transform carries ONLY translate3d for the lift offset — rotation
 * lives on the inner image element (see snapRotation).
 */
function snap(
  el: HTMLElement,
  state: { rect?: TransitionRect; opacity?: number; translateY?: number },
): void {
  gsap.killTweensOf(el);

  const vars: gsap.TweenVars = {
    x: 0,
    y: state.translateY ?? 0,
  };

  if (state.rect) {
    vars.left = state.rect.left;
    vars.top = state.rect.top;
    vars.width = state.rect.width;
    vars.height = state.rect.height;
  }
  if (state.opacity !== undefined) vars.opacity = state.opacity;

  gsap.set(el, vars);
}

/**
 * Snap an image's rotation. Cancels in-flight rotation animations.
 * Used to seed the rotation start state at the beginning of each
 * choreography. Separated from snap() because rotation lives on a
 * different element to avoid transform conflicts.
 */
function snapRotation(el: HTMLElement, rotateY: number): void {
  gsap.killTweensOf(el);
  gsap.set(el, {
    rotationY: rotateY,
    transformOrigin: '0% 50%',
  });
}

interface AnimateOpts {
  duration: number; // ms
  easing?: string;
  delay?: number; // ms
}

function gsapEase(easing?: string): string {
  if (easing === EASE_LINEAR) return 'none';
  if (easing === EASE_OUT_EXPO) return 'expo.out';
  if (easing === EASE_INOUT_PAPER) return 'power2.inOut';
  return 'power2.out';
}

function tweenTo(target: HTMLElement, vars: gsap.TweenVars): Promise<void> {
  return new Promise((resolve) => {
    let resolved = false;
    const done = () => {
      if (resolved) return;
      resolved = true;
      resolve();
    };

    gsap.to(target, {
      ...vars,
      overwrite: 'auto',
      onComplete: done,
      onInterrupt: done,
    });
  });
}

/** Animate to target values via GSAP. */
function animateTo(
  el: HTMLElement,
  to: Partial<{
    left: number;
    top: number;
    width: number;
    height: number;
    opacity: number;
    translateY: number;
  }>,
  opts: AnimateOpts,
): Promise<void> {
  const vars: gsap.TweenVars = {
    duration: opts.duration / 1000,
    delay: (opts.delay ?? 0) / 1000,
    ease: gsapEase(opts.easing),
  };

  if (to.left !== undefined) vars.left = to.left;
  if (to.top !== undefined) vars.top = to.top;
  if (to.width !== undefined) vars.width = to.width;
  if (to.height !== undefined) vars.height = to.height;
  if (to.opacity !== undefined) vars.opacity = to.opacity;
  if (to.translateY !== undefined) vars.y = to.translateY;

  return tweenTo(el, vars);
}

/**
 * Animate the rotateY of the cover face stack. The wrapper handles the
 * position morph via translate + left/top/width/height, while the face
 * stack rotates the front and back surfaces together around the spine.
 *
 * Resolves when the GSAP tween completes or is interrupted.
 */
function animateRotation(
  wrapper: HTMLElement,
  toRotateY: number,
  opts: AnimateOpts,
): Promise<void> {
  // The face stack is the first child of the wrapper. It contains the
  // front image plus a paper-colored back face, both hinged as one rigid
  // object around the left edge (transform-origin set in CSS).
  const img = wrapper.querySelector<HTMLElement>('[data-transition-cover-face]');
  if (!img) return Promise.resolve();

  return tweenTo(img, {
    rotationY: toRotateY,
    transformOrigin: '0% 50%',
    duration: opts.duration / 1000,
    delay: (opts.delay ?? 0) / 1000,
    ease: gsapEase(opts.easing),
  });
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

  // DOM refs for direct GSAP animation. Layers are always mounted so the
  // refs are always valid once the component has mounted.
  const bgRef = useRef<HTMLDivElement>(null);
  const spreadRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);
  const isRunningRef = useRef(false);

  const transitionTo = useCallback((next: TransitionState) => {
    setState(next);
    broadcastState(next);
  }, []);

  const navigateRef = useRef(navigate);
  useEffect(() => {
    navigateRef.current = navigate;
  }, [navigate]);

  // Sync state with URL on direct deep-link navigation.
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

  /**
   * OPEN choreography. ~1240ms total.
   *
   * Single-asset model (v1.2): the cover layer uses the SAME image as the
   * desk (`/plate/notebook.webp`). At opacity 1, position-matched to the
   * desk's notebook, it's pixel-identical to what's already painted there
   * — so the user can't distinguish the desk's static notebook from the
   * overlay's animated cover. No swap, no cross-fade handoff, no
   * letterboxing from aspect-ratio mismatches.
   *
   *   0–80     Beat 0 — cover snaps to desk-rect at opacity 1 (invisible
   *                     swap because it matches the desk's notebook
   *                     pixel-for-pixel)
   *   0–220    Beat 1 — cover lifts -16px (gentle ease-in-out;
   *                     felt as a deliberate "pick up" gesture)
   *   220–280  Beat 2 — settle pause at lifted position (60ms hold)
   *   280–1000 Beat 3 — cover rotates 0 → -180° AND morphs from desk-rect
   *                     to spread-binding-half-rect (720ms ease-out-expo;
   *                     rotation and position share easing so the cover
   *                     reads as one rigid body)
   *   500–900  Beat 4 — spread fades in beneath rotating cover
   *   200–400  Beat 5 — bg paper covers the desk
   *   ~520     Beat 6 — navigate('/works')
   *   1000–1240 Beat 7 — overlay fades out, canvas content reveals
   */
  const runOpen = useCallback(async () => {
    const bg = bgRef.current;
    const spread = spreadRef.current;
    const cover = coverRef.current;
    const spine = spineRef.current;
    if (!bg || !spread || !cover || isRunningRef.current) return;
    isRunningRef.current = true;

    try {
      const deskRect = readSourceRect('notebook') ?? fallbackDeskRect();
      const spreadRect = computeCanvasSpreadRect();
      const openCoverRect = computeOpenCoverRect(spreadRect);

      // Cache the desk rect so close — which fires from /works where the
      // desk isn't in the DOM — can land the cover at the matching size
      // instead of the small fallback (340px).
      cacheDeskRect(deskRect);

      transitionTo('opening');

      // Beat 0 — cover snaps to desk-rect at opacity 1. Because the cover
      // asset IS the desk's asset, this snap is invisible: the overlay's
      // notebook lands exactly on top of the desk's notebook with the same
      // pixels.
      snap(cover, { rect: deskRect, opacity: 1, translateY: 0 });
      const coverFace = cover.querySelector<HTMLElement>(
        '[data-transition-cover-face]',
      );
      if (coverFace) snapRotation(coverFace, 0);
      snap(spread, { rect: spreadRect, opacity: 0 });
      if (spine) {
        snap(spine, {
          rect: {
            left: spreadRect.left + spreadRect.width / 2 - 2,
            top: spreadRect.top + spreadRect.height * 0.04,
            width: 4,
            height: spreadRect.height * 0.92,
          },
          opacity: 0,
        });
      }
      snap(bg, { opacity: 0 });

      // Force a layout flush so the snapped geometry is committed before
      // GSAP interpolates toward the open spread.
      void bg.offsetHeight;

      await new Promise<void>((resolve) => {
        const revealTargets = spine ? [bg, spread, spine] : [bg, spread];
        const timeline = gsap.timeline({
          defaults: { overwrite: 'auto' },
          onComplete: resolve,
        });

        // A labeled score makes the page turn easier to tune as one
        // physical gesture: pick up, hinge, reveal, then settle.
        timeline
          .addLabel('pickUp', 0)
          .to(
            bg,
            {
              opacity: 1,
              duration: 0.58,
              ease: 'none',
            },
            'pickUp+=0.08',
          )
          .to(
            cover,
            {
              y: -16,
              duration: 0.22,
              ease: 'power2.inOut',
            },
            'pickUp',
          );

        if (coverFace) {
          timeline.to(
            coverFace,
            {
              rotationY: -5,
              transformOrigin: '0% 50%',
              duration: 0.16,
              ease: 'power2.inOut',
            },
            'pickUp+=0.06',
          );
        }

        timeline.addLabel('hinge', 'pickUp+=0.28').to(
          cover,
          {
            left: openCoverRect.left,
            top: openCoverRect.top,
            width: openCoverRect.width,
            height: openCoverRect.height,
            y: 0,
            duration: 0.76,
            ease: 'expo.out',
          },
          'hinge',
        );

        if (coverFace) {
          timeline.to(
            coverFace,
            {
              rotationY: -180,
              transformOrigin: '0% 50%',
              duration: 0.92,
              ease: 'power2.inOut',
            },
            'hinge',
          );
        }

        timeline
          .to(
            spread,
            {
              opacity: 1,
              duration: 0.5,
              ease: 'power2.out',
            },
            'hinge+=0.2',
          )
          .call(() => navigateRef.current('/works'), undefined, 'hinge+=0.43');

        if (spine) {
          timeline.to(
            spine,
            {
              opacity: 1,
              duration: 0.38,
              ease: 'power2.out',
            },
            'hinge+=0.22',
          );
        }

        timeline
          .addLabel('settle', 'hinge+=0.94')
          .to(
            cover,
            {
              opacity: 0,
              duration: 0.18,
              ease: 'power2.out',
            },
            'settle',
          )
          .to(
            revealTargets,
            {
              opacity: 0,
              duration: 0.28,
              ease: 'power2.out',
            },
            'settle+=0.04',
          );
      });

      transitionTo('open');
    } finally {
      isRunningRef.current = false;
    }
  }, [transitionTo]);

  /**
   * CLOSE choreography. ~1140ms total.
   *
   * v1.3 polish: applies the same treatment that v1.2 gave the open —
   * slower rotation so the visible 90°→0° portion is actually readable
   * (~360ms instead of ~290ms), translateY-based landing for symmetry
   * with the open's lift, and a settle-pause beat after the landing so
   * the cover registers as resting on the desk before fading away.
   *
   * Single-asset model (v1.2): the cover that's been laid flat on the
   * spread folds back, morphs to the desk position (lifted), settles
   * onto the surface, then fades into the desk's already-rendered
   * notebook. Same asset throughout — no swap, no second handoff.
   *
   * Mirror of open's wind-up→main→reveal arc:
   *
   *   Open  : LIFT → pause → MORPH+ROTATE+SPREAD-IN  → reveal
   *   Close :         MORPH+ROTATE+SPREAD-OUT → LAND → settle → reveal
   *
   *   0–620    Beat 1 — cover position morphs from spread-binding back
   *                     to desk-rect (arriving lifted via translateY: -16)
   *   0–720    Beat 2 — cover folds -180° → 0° (ease-in-out so the
   *                     visible -90°→0° back-half gets ~360ms; long
   *                     enough that the eye reads the closing motion)
   *   60–400   Beat 3 — spread fades out beneath the folding cover
   *   100–340  Beat 4 — bg ramps up to cover the route swap
   *   ~300     Beat 5 — navigate('/')
   *   720–920  Beat 6 — soft landing: cover descends from translateY -16
   *                     to 0 (200ms ease-out-expo; mimics a hardcover
   *                     coming to rest under its own weight)
   *   920–1000 Beat 7 — settle pause (80ms hold); the cover sits on the
   *                     desk for a beat, mirrors open's apex pause
   *   1000–1240 Beat 8 — bg + cover cross-fade out together, revealing
   *                      the desk's notebook underneath. Single asset =
   *                      invisible handoff. 240ms matches open's reveal
   *                      duration so the closing feels symmetric in
   *                      texture even though it's faster overall.
   */
  const runClose = useCallback(async () => {
    const bg = bgRef.current;
    const spread = spreadRef.current;
    const cover = coverRef.current;
    const spine = spineRef.current;
    if (!bg || !spread || !cover || isRunningRef.current) return;
    isRunningRef.current = true;

    try {
    const spreadRect = readSourceRect('spread') ?? computeCanvasSpreadRect();
    // Resolution priority for the desk rect:
    //   1. Live measurement (only works if user navigated to /works WITHOUT
    //      using the open transition — rare; route would be in a half-state)
    //   2. Cached value from the most recent open transition (the common
    //      path — open caches, close consumes)
    //   3. Hardcoded fallback (340px) for cold-deep-link cases where the
    //      user lands on /works without ever having seen the desk
    const deskRect =
      readSourceRect('notebook') ?? getCachedDeskRect() ?? fallbackDeskRect();
    const openCoverRect = computeOpenCoverRect(spreadRect);

    transitionTo('closing');

    // Snap initial state — cover fully open at -180°, spread visible.
    snap(cover, { rect: openCoverRect, opacity: 1, translateY: 0 });
    const coverFace = cover.querySelector<HTMLElement>('[data-transition-cover-face]');
    if (coverFace) snapRotation(coverFace, -180);
    snap(spread, { rect: spreadRect, opacity: 1 });
    if (spine) {
      snap(spine, {
        rect: {
          left: spreadRect.left + spreadRect.width / 2 - 2,
          top: spreadRect.top + spreadRect.height * 0.04,
          width: 4,
          height: spreadRect.height * 0.92,
        },
        opacity: 1,
      });
    }
    snap(bg, { opacity: 0 });

    void bg.offsetHeight;

    // Beat 4 (background) — briefly covers the route swap, then starts
    // revealing the desk while the cover is still folding. This makes the
    // desk return as a visible process instead of appearing at the end.
    const bgCoverPromise = animateTo(bg, { opacity: 1 }, {
      duration: 220,
      easing: EASE_LINEAR,
      delay: 40,
    });
    const bgRevealPromise = bgCoverPromise.then(() =>
      animateTo(bg, { opacity: 0 }, {
        duration: 720,
        easing: EASE_LINEAR,
        delay: 60,
      }),
    );

    // Beat 1 (position morph) — cover travels from spread-binding back
    // to the desk slot, ARRIVING at the lifted position (translateY: -16).
    // The soft-landing beat below will settle it the last 16px down to
    // the desk surface. Using translateY here (instead of a top offset)
    // keeps the morph + landing as transform-only animations — GPU
    // composited, no layout thrash, and symmetric with open's lift
    // which also uses translateY.
    const morphPromise = animateTo(
      cover,
      {
        left: deskRect.left,
        top: deskRect.top,
        width: deskRect.width,
        height: deskRect.height,
        translateY: -16,
      },
      { duration: 620, easing: EASE_OUT_EXPO },
    );

    // Beat 2 (rotation) — cover folds back -180° → 0°. Slowed from v1.2's
    // 580ms to 720ms so the visible back-half (-90° → 0°) gets ~360ms
    // instead of ~290ms. The user actually sees the cover swing closed
    // rather than blink past horizontal.
    const rotatePromise = animateRotation(cover, 0, {
      duration: 720,
      easing: EASE_INOUT_PAPER,
    });

    // Beat 3 (spread fade-out) — slowed from 280ms to 340ms for a more
    // graceful disappearance. Delay 60ms so the fold has visibly begun
    // before the spread starts to dissolve.
    const spreadPromise = animateTo(
      spread,
      { opacity: 0 },
      { duration: 340, easing: EASE_OUT, delay: 60 },
    );
    const spinePromise = spine
      ? animateTo(spine, { opacity: 0 }, {
          duration: 300,
          easing: EASE_OUT,
          delay: 120,
        })
      : Promise.resolve();

    // Beat 5 — route swap behind opaque bg. The desk begins fading back
    // in shortly afterward while the notebook is still closing.
    window.setTimeout(() => {
      navigateRef.current('/');
    }, 290);

    await Promise.all([morphPromise, rotatePromise, spreadPromise, spinePromise]);

    // Beat 6 — soft landing. Cover descends from translateY -16 to 0
    // over 200ms with ease-out-expo. Slowed from v1.2's 140ms so the
    // settle reads as a deliberate landing, not a blink. Mirrors the
    // open's lift gesture (translateY 0 → -16 over 220ms) so the close
    // feels like the lift in reverse.
    await animateTo(cover, { translateY: 0 }, {
      duration: 200,
      easing: EASE_OUT_EXPO,
    });

    // Beat 7 — settle pause. The cover sits on the desk for 80ms before
    // the overlay fades away. Mirrors open's 60ms apex-pause and gives
    // the user a moment to register "the notebook is back where it
    // started" before the route reveals.
    await new Promise<void>((r) => window.setTimeout(r, 80));

    // Beat 8 — the desk is already visible behind the cover by now. Fade
    // only the overlay cover into the desk's matching notebook image; keep
    // awaiting the earlier desk reveal so the overlay doesn't go idle
    // before the linear background handoff has completed.
    await Promise.all([
      bgRevealPromise,
      animateTo(cover, { opacity: 0 }, { duration: 240, easing: EASE_OUT }),
    ]);

    transitionTo('idle');
    } finally {
      isRunningRef.current = false;
    }
  }, [transitionTo]);

  /** Reduced-motion paths — both directions become a 240ms paper cross-fade. */
  const runOpenReduced = useCallback(async () => {
    const bg = bgRef.current;
    if (!bg || isRunningRef.current) return;
    isRunningRef.current = true;
    try {
      transitionTo('opening');
      await fadeBetweenSurfaces(bg, () => navigateRef.current('/works'));
      transitionTo('open');
    } finally {
      isRunningRef.current = false;
    }
  }, [transitionTo]);

  const runCloseReduced = useCallback(async () => {
    const bg = bgRef.current;
    if (!bg || isRunningRef.current) return;
    isRunningRef.current = true;
    try {
      transitionTo('closing');
      await fadeBetweenSurfaces(bg, () => navigateRef.current('/'));
      transitionTo('idle');
    } finally {
      isRunningRef.current = false;
    }
  }, [transitionTo]);

  // Bind to the event bus.
  useEffect(() => {
    const onOpen = () => {
      if (reducedMotion) {
        void runOpenReduced();
      } else {
        void runOpen();
      }
    };
    const onClose = () => {
      if (reducedMotion) {
        void runCloseReduced();
      } else {
        void runClose();
      }
    };
    window.addEventListener(TRANSITION_EVENTS.open, onOpen);
    window.addEventListener(TRANSITION_EVENTS.close, onClose);
    return () => {
      window.removeEventListener(TRANSITION_EVENTS.open, onOpen);
      window.removeEventListener(TRANSITION_EVENTS.close, onClose);
    };
  }, [reducedMotion, runOpen, runOpenReduced, runClose, runCloseReduced]);

  const isActive = state !== 'idle' && state !== 'open';

  return (
    <div
      className={`${styles.root} ${isActive ? styles.rootActive : ''} ${reducedMotion ? styles.reducedMotion : ''}`}
      aria-hidden="true"
    >
      {/* Preload — kept mounted so assets are decoded before transition.
       * The cover asset is the same as the desk's, already cached by the
       * desk render — no separate preload needed for it. We only preload
       * the spread, which the desk doesn't render. */}
      <img
        className={styles.preload}
        src={ASSET_SPREAD}
        alt=""
        onError={() => warnMissingAsset(ASSET_SPREAD)}
      />

      {/* Background paper — covers the route swap. */}
      <div ref={bgRef} className={styles.background} style={{ opacity: 0 }} />

      {/* Spread layer — fixed at canvas-center geometry; only opacity moves. */}
      <div ref={spreadRef} className={styles.spreadLayer} style={{ opacity: 0 }}>
        <img
          className={styles.spreadImg}
          src={ASSET_SPREAD}
          alt=""
          onError={() => warnMissingAsset(ASSET_SPREAD)}
        />
      </div>

      {/* Spine/contact shadow — a thin ink wash at the hinge. It gives the
       * rotation a fixed physical pivot while staying inside the two-color
       * paper system. */}
      <div ref={spineRef} className={styles.spineShadow} style={{ opacity: 0 }} />

      {/* Cover layer — the rotating notebook. Uses the same asset as the
       * desk so its start/end frames are pixel-identical to what the desk
       * paints. Position+size+rotation animate from desk-rect to spread-
       * binding-half-rect (or vice versa). */}
      <div ref={coverRef} className={styles.coverLayer} style={{ opacity: 0 }}>
        <div className={styles.coverFace} data-transition-cover-face>
          <img
            className={styles.coverImg}
            src={ASSET_COVER}
            alt=""
            onError={() => warnMissingAsset(ASSET_COVER)}
          />
          <div className={styles.coverBack} />
        </div>
      </div>
    </div>
  );
}

/** Reduced-motion helper — fade bg up, navigate, fade bg back down. */
async function fadeBetweenSurfaces(
  bg: HTMLElement,
  onMidpoint: () => void,
): Promise<void> {
  snap(bg, { opacity: 0 });
  void bg.offsetHeight;
  await animateTo(bg, { opacity: 1 }, {
    duration: REDUCED_MOTION_DURATION / 2,
    easing: EASE_OUT,
  });
  onMidpoint();
  await new Promise((r) => setTimeout(r, 16));
  await animateTo(bg, { opacity: 0 }, {
    duration: REDUCED_MOTION_DURATION / 2,
    easing: EASE_OUT,
  });
}
