import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import ProjectPlate from '../components/canvas/ProjectPlate';
import CanvasCloseButton from '../components/canvas/CanvasCloseButton';
import { SpotlightDotGrid } from '../components/canvas/SpotlightDotGrid';
import Grain from '../components/shared/Grain';
import { useTransitionState } from '../interactions/useTransitionState';
import { projects } from '../data/projects';
import styles from './CanvasRoute.module.css';

/**
 * Base delay (ms) for the page-content entrance animations when the
 * canvas mounts via the desk -> canvas open transition. Starts while the
 * overlay is still clearing so the handoff never exposes an empty stage
 * before the intro and plates begin to resolve.
 *
 * Project-detail returns skip these entrance animations entirely, so they
 * do not inherit this wait.
 */
const CONTENT_ENTER_DELAY_AFTER_TRANSITION = 560;

/**
 * CanvasRoute — canvas v1.0 (viewport-fitted spread).
 *
 * A real notebook spread is a fixed page: you turn it, you don't scroll it.
 * The four plates now sit on ONE shared grid spanning both notebook pages —
 * two equal plates per page, tops and bottoms registered across the spine,
 * the whole spread fitted to a single desktop viewport. Hierarchy comes
 * from reading order (fig. 01 top-left), status, and metric — never card
 * size. Intro occupies the top-left register; the site imprint (colophon
 * link) sits bottom-right like a printed book's imprint. Below 1100px the
 * spread degrades to the single-column scroll.
 *
 * The notebook backdrop carries `data-transition-source="spread"` so the
 * desk -> canvas close transition can measure it (see NotebookTransition).
 */

export default function CanvasRoute() {
  const navigate = useNavigate();
  const { state, closeNotebook } = useTransitionState();

  // Capture the transition state once on mount. The staged canvas entrance
  // only belongs to the desk -> canvas opening; direct /works visits and
  // returns from project detail should show the full canvas immediately.
  const canvasEntryMotion = useMemo(() => {
    return state === 'opening' ? 'staged' : 'instant';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const contentEnterDelay =
    canvasEntryMotion === 'staged'
      ? `${CONTENT_ENTER_DELAY_AFTER_TRANSITION}ms`
      : '0ms';

  const handleProjectClick = useCallback(
    (slug: string) => {
      navigate(`/works/${slug}`);
    },
    [navigate],
  );

  // Close routes through the transition hook — the NotebookTransition
  // overlay handles the reverse choreography and fires the navigate('/')
  // call at the midpoint. Direct navigate would skip the animation.
  const handleClose = useCallback(() => {
    closeNotebook();
  }, [closeNotebook]);

  // Escape key also closes the notebook. Same path through the transition.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleClose]);

  // Source order in data/projects.ts IS the spread composition: items
  // auto-flow left→right, top→bottom across the shared grid (chai top-left,
  // agentic top-right, build-with-ai bottom-left, fieldglass bottom-right).
  const plates = useMemo(
    () => projects.map((project, index) => ({ project, index })),
    [],
  );

  return (
    <>
      <div
        className={styles.canvas}
        data-entry-motion={canvasEntryMotion}
        style={{ ['--canvas-enter-delay' as string]: contentEnterDelay }}
      >
        {/* Ambient dot field with cursor spotlight. Mounted as a direct child
         * of the scroll surface so its pointermove listener (which binds to
         * its parent) receives events across the whole page. */}
        <SpotlightDotGrid />

        {/* Notebook backdrop — fixed, full-height, cropped at the sides. The
         * held stage the plates float over. `data-transition-source` exposes
         * it to NotebookTransition, which measures it on close. */}
        <div
          className={styles.backdrop}
          data-transition-source="spread"
          aria-hidden="true"
        >
          <img
            className={styles.backdropImage}
            src="/canvas/open-notebook.webp"
            alt=""
            draggable={false}
          />
        </div>

        <CanvasCloseButton onClick={handleClose} />

        <main className={styles.content}>
          <div className={styles.spread}>
            {plates.map(({ project, index }) => (
              <ProjectPlate
                key={project.slug}
                project={project}
                index={index}
                onClick={handleProjectClick}
              />
            ))}
          </div>
        </main>

        {/* Running footer — the spread's only page furniture. Fixed to the
         * viewport bottom, like a printed folio line. */}
        <div className={styles.runningFooter} aria-hidden="true">
          <span>note / 001 — works</span>
          <span>field notes · vol. v</span>
        </div>
      </div>

      <Grain />
    </>
  );
}
