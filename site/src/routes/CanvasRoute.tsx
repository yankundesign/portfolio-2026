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
 * CanvasRoute — canvas v0.9 (notebook backdrop + floating editorial plates).
 *
 * The open notebook is a fixed, full-height background STAGE (cropped at the
 * sides). Project plates are independent editorial plates laid over it on a
 * scrollable 12-column grid — no longer constrained to two notebook page
 * slots. CHAI is the clear hero. See `00-brief/prd-canvas-v0.9-backdrop-plates.md`.
 *
 * The notebook backdrop carries `data-transition-source="spread"` so the
 * desk -> canvas close transition can measure it (see NotebookTransition).
 */

const INTRO = {
  label: 'NOTE / 001 — WORKS',
  description:
    'A short collection of works in AI, enterprise, and AI-native design.',
};

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

  // Plates are grouped onto two pages straddling the notebook spine. The
  // original index is preserved (entrance stagger + fig numbers) even though
  // the visual grouping isn't sequential. Left page leads with the CHAI hero.
  const pages = useMemo(() => {
    const indexed = projects.map((project, index) => ({ project, index }));
    return {
      left: indexed.filter(({ project }) =>
        ['chai', 'build-with-ai'].includes(project.slug),
      ),
      right: indexed.filter(({ project }) =>
        ['control-hub-agentic', 'sap-fieldglass'].includes(project.slug),
      ),
    };
  }, []);

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
            <div className={styles.page} data-page="left">
              <header className={styles.intro}>
                <span className={styles.introLabel}>{INTRO.label}</span>
                <p className={styles.introDescription}>{INTRO.description}</p>
              </header>
              {pages.left.map(({ project, index }) => (
                <ProjectPlate
                  key={project.slug}
                  project={project}
                  index={index}
                  onClick={handleProjectClick}
                />
              ))}
            </div>
            <div className={styles.page} data-page="right">
              {pages.right.map(({ project, index }) => (
                <ProjectPlate
                  key={project.slug}
                  project={project}
                  index={index}
                  onClick={handleProjectClick}
                />
              ))}
            </div>
          </div>
        </main>
      </div>

      <Grain />
    </>
  );
}
