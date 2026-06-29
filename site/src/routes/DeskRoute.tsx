import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import EditorialPlate from '../components/shared/EditorialPlate';
import NotebookCover from '../components/desk/NotebookCover';
import ResumePaper from '../components/desk/ResumePaper';
import AboutObject from '../components/desk/AboutObject';
import Pen from '../components/desk/Pen';
import CatRoulette from '../components/desk/CatRoulette';
import DeskLight from '../components/desk/DeskLight';
import DeskWayfinder from '../components/desk/DeskWayfinder';
import DeskJellyfishLayer from '../components/desk/DeskJellyfishLayer';
import Ephemera from '../components/desk/Ephemera';
import Grain from '../components/shared/Grain';
import { gsap, useGSAP } from '../interactions/gsap';
import { usePlateProofReveal } from '../interactions/usePlateProofReveal';
import { useReducedMotion } from '../interactions/useReducedMotion';
import styles from './DeskRoute.module.css';

/**
 * DeskRoute — v0.4 Swiss editorial plate register.
 *
 * The homepage is `EDITORIAL PLATE — 01 · DESK OBJECTS`. Five real-asset
 * specimens (notebook, cv, about, pen, roulette) sit on an 8-column grid
 * inside the plate chrome. No composing animation, no ambient light,
 * no parallax — the plate is still and information-forward, per v0.4.
 */
export default function DeskRoute() {
  const navigate = useNavigate();
  const proofReveal = usePlateProofReveal();
  const sceneRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // Report the live viewport in the top-right chrome. Quiet technical
  // touch that matches the real behavior of a specimen sheet.
  const [format, setFormat] = useState(() => formatViewport());
  useEffect(() => {
    const onResize = () => setFormat(formatViewport());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const prev = {
      htmlOverflow: document.documentElement.style.overflow,
      bodyOverflow: document.body.style.overflow,
    };

    const syncOverflow = () => {
      if (media.matches) {
        document.documentElement.style.overflow = 'auto';
        document.body.style.overflow = 'auto';
        return;
      }
      document.documentElement.style.overflow = prev.htmlOverflow;
      document.body.style.overflow = prev.bodyOverflow;
    };

    syncOverflow();
    media.addEventListener('change', syncOverflow);

    return () => {
      media.removeEventListener('change', syncOverflow);
      document.documentElement.style.overflow = prev.htmlOverflow;
      document.body.style.overflow = prev.bodyOverflow;
    };
  }, []);

  useGSAP(
    () => {
      if (reducedMotion || proofReveal.phase !== 'objects') return;

      const scene = sceneRef.current;
      if (!scene) return;

      const slots = gsap.utils.toArray<HTMLElement>(
        '[data-desk-slot]',
        scene,
      );
      const supports = gsap.utils.toArray<HTMLElement>(
        '[data-desk-support]',
        scene,
      );
      const allObjects = [...slots, ...supports];

      gsap.set(allObjects, {
        autoAlpha: 0,
        filter: 'blur(2px)',
        y: 10,
      });

      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .to(slots, {
          autoAlpha: 1,
          filter: 'blur(0px)',
          y: 0,
          duration: 0.72,
          stagger: {
            each: 0.09,
            from: 1,
          },
        })
        .to(
          supports,
          {
            autoAlpha: (_index, target) =>
              (target as HTMLElement).dataset.deskSupport === 'wayfinder'
                ? 0.7
                : 1,
            filter: 'blur(0px)',
            y: 0,
            duration: 0.56,
            stagger: 0.08,
          },
          0.26,
        );
    },
    {
      scope: sceneRef,
      dependencies: [proofReveal.phase, reducedMotion],
      revertOnUpdate: true,
    },
  );

  const bottomRightLine =
    proofReveal.makeReadyLine ??
    (proofReveal.showStartHint
      ? 'START WITH FIG. 01 — FIELD NOTEBOOK'
      : 'CURRENTLY — Building something fun.');

  return (
    <>
      <EditorialPlate
        plateNumber={1}
        plateTitle="DESK OBJECTS"
        system="12 COLUMN GRID"
        brand={{ title: 'Yankun Wang', subtitle: 'Portfolio' }}
        format={format}
        columns={12}
        grid={{ columns: 12, gutter: 24, margin: 60 }}
        currentlyLine={bottomRightLine}
        siteBuildLine={
          proofReveal.makeReadyLine
            ? undefined
            : 'THIS SITE · DESIGNED AND SHIPPED IN 2 WEEKS WITH CLAUDE CODE.'
        }
        revealPhase={proofReveal.phase}
      >
        <DeskLight />

        <div
          ref={sceneRef}
          className={styles.scene}
          data-proof-phase={proofReveal.phase}
          aria-hidden={proofReveal.sceneHidden ? true : undefined}
          inert={proofReveal.sceneHidden ? true : undefined}
        >
          <DeskJellyfishLayer />

          {/* Ephemera mounted before navigation objects so both ambient layers
           * paint behind the desk interaction targets. */}
          <Ephemera />

          <div
            className={`${styles.slot} ${styles.slotRoulette}`}
            data-desk-slot="roulette"
          >
            <CatRoulette />
          </div>

          <div
            className={`${styles.slot} ${styles.slotNotebook}`}
            data-desk-slot="notebook"
          >
            {/* No onClick — NotebookCover dispatches the transition event;
             * the NotebookTransition overlay owns the route change. */}
            <NotebookCover />
          </div>

          <div
            className={`${styles.slot} ${styles.slotCv}`}
            data-desk-slot="cv"
          >
            <ResumePaper onClick={() => navigate('/cv')} />
          </div>

          <div
            className={`${styles.slot} ${styles.slotAbout}`}
            data-desk-slot="about"
          >
            <AboutObject onClick={() => navigate('/about')} />
          </div>

          <div
            className={`${styles.slot} ${styles.slotPen}`}
            data-desk-slot="pen"
          >
            <Pen />
          </div>

          <DeskWayfinder />
        </div>
      </EditorialPlate>

      <Grain />
    </>
  );
}

function formatViewport(): string {
  if (typeof window === 'undefined') return '1280 × 720 PX';
  return `${window.innerWidth} × ${window.innerHeight} PX`;
}
