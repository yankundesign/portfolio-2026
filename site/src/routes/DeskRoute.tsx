import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import EditorialPlate from '../components/shared/EditorialPlate';
import NotebookCover from '../components/desk/NotebookCover';
import ResumePaper from '../components/desk/ResumePaper';
import AboutObject from '../components/desk/AboutObject';
import Pen from '../components/desk/Pen';
import CatRoulette from '../components/desk/CatRoulette';
import DeskLight from '../components/desk/DeskLight';
import DeskWaveGrid, { type DeskIntroStyle } from '../components/desk/DeskWaveGrid';
import DeskWayfinder from '../components/desk/DeskWayfinder';
import DeskJellyfishLayer from '../components/desk/DeskJellyfishLayer';
import Ephemera from '../components/desk/Ephemera';
import Grain from '../components/shared/Grain';
import { gsap, useGSAP } from '../interactions/gsap';
import { usePlateProofReveal } from '../interactions/usePlateProofReveal';
import { useReducedMotion } from '../interactions/useReducedMotion';
import styles from './DeskRoute.module.css';

const SHOW_DESK_JELLYFISH = false;
const PLATE_COLUMNS = 12;

/**
 * DeskRoute — v0.4 Swiss editorial plate register.
 *
 * The homepage is `EDITORIAL PLATE — 01 · DESK OBJECTS`. Five real-asset
 * specimens (notebook, cv, about, pen, roulette) sit on an 8-column grid
 * inside the plate chrome. A responsive central composition grows with
 * the viewport; the papers settle during the first entrance.
 */
export default function DeskRoute() {
  const navigate = useNavigate();
  const proofReveal = usePlateProofReveal();
  const sceneRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  // The opening scatters drops across the plate; ?intro=ring brings back the
  // single centre ring for comparison.
  const [introStyle] = useState<DeskIntroStyle>(() =>
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('intro') === 'ring'
      ? 'ring'
      : 'scatter',
  );

  // Report the live viewport in the top-right chrome. Quiet technical
  // touch that matches the real behavior of a specimen sheet.
  const [format, setFormat] = useState(() => formatViewport());
  useEffect(() => {
    const onResize = () => setFormat(formatViewport());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const prev = {
      htmlOverflow: document.documentElement.style.overflow,
      bodyOverflow: document.body.style.overflow,
    };

    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';

    return () => {
      document.documentElement.style.overflow = prev.htmlOverflow;
      document.body.style.overflow = prev.bodyOverflow;
    };
  }, []);

  useGSAP(
    () => {
      if (reducedMotion || proofReveal.phase !== 'objects') return;

      const scene = sceneRef.current;
      if (!scene) return;

      // Keep the established desktop reveal sequence independent from the DOM
      // order, which follows the mobile reading and keyboard-navigation order.
      const slots = ['roulette', 'notebook', 'cv', 'about', 'pen'].flatMap(
        (slotName) => {
          const slot = scene.querySelector<HTMLElement>(
            `[data-desk-slot="${slotName}"]`,
          );
          return slot ? [slot] : [];
        },
      );
      const supports = gsap.utils.toArray<HTMLElement>(
        '[data-desk-support]',
        scene,
      );
      gsap.set(slots, {
        autoAlpha: 0,
        filter: 'blur(2px)',
        y: 10,
      });
      gsap.set(supports, { autoAlpha: 0, y: 4 });

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
      ? 'START WITH THE FIELD NOTEBOOK'
      : 'CURRENTLY — Building something fun.');

  return (
    <>
      <EditorialPlate
        plateNumber={1}
        plateTitle="DESK OBJECTS"
        system="12 COLUMN GRID"
        brand={{ title: 'Yankun Wang', subtitle: 'Portfolio' }}
        format={format}
        columns={PLATE_COLUMNS}
        grid={{ columns: PLATE_COLUMNS, gutter: 24, margin: 60 }}
        currentlyLine={bottomRightLine}
        siteBuildLine={
          proofReveal.makeReadyLine
            ? undefined
            : 'Designed and built with Claude and Codex'
        }
        revealPhase={proofReveal.phase}
        underlay={
          <>
            <DeskLight />
            <DeskWaveGrid
              columns={PLATE_COLUMNS}
              active={proofReveal.phase !== 'paper'}
              intro={proofReveal.phase === 'rulings'}
              introStyle={introStyle}
            />
          </>
        }
      >
        <div className={styles.composition}>
          <div
            ref={sceneRef}
            className={styles.scene}
            data-proof-phase={proofReveal.phase}
            aria-hidden={proofReveal.sceneHidden ? true : undefined}
            inert={proofReveal.sceneHidden ? true : undefined}
          >
            {SHOW_DESK_JELLYFISH ? <DeskJellyfishLayer /> : null}

            {/* Ephemera mounted before navigation objects so both ambient layers
             * paint behind the desk interaction targets. */}
            <Ephemera />

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

            <div
              className={`${styles.slot} ${styles.slotRoulette}`}
              data-desk-slot="roulette"
            >
              <CatRoulette />
            </div>

            <DeskWayfinder />
          </div>
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
