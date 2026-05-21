import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import NotebookSpread from '../components/canvas/NotebookSpread';
import NotebookPage from '../components/canvas/NotebookPage';
import ProjectRow from '../components/canvas/ProjectRow';
import CanvasCloseButton from '../components/canvas/CanvasCloseButton';
import CanvasMarginNote from '../components/canvas/CanvasMarginNote';
import { SpotlightDotGrid } from '../components/canvas/SpotlightDotGrid';
import Grain from '../components/shared/Grain';
import { useTransitionState } from '../interactions/useTransitionState';
import { projects } from '../data/projects';
import styles from './CanvasRoute.module.css';

/**
 * Base delay (ms) for the page-content entrance animations when the
 * canvas mounts via the desk -> canvas open transition. Must be >= the
 * time from canvas mount until the open-transition overlay fully clears,
 * otherwise the earliest content animations begin behind the still-fading
 * overlay and the user can't see them.
 *
 * Project-detail returns skip these entrance animations entirely, so they
 * do not inherit this wait.
 */
const CONTENT_ENTER_DELAY_AFTER_TRANSITION = 920;

/**
 * CanvasRoute — chromeless notebook spread.
 *
 * Single-section notebook surface. Four projects laid out 2 + 2 across the
 * spread (CHAI top-left, Agentic top-right, Build with AI bottom-left, SAP
 * bottom-right).
 * Side margins carry the close affordance (left) and a THOUGHTS pull-quote
 * sticky (right). The notebook is the focus — no editorial-plate chrome on
 * this route, only the SpotlightDotGrid background.
 */

const PAGE_HEADER_LEFT = {
  label: 'NOTE / 001 — WORKS',
  description:
    'A short collection of works in AI, enterprise, and content systems.',
};

const PAGE_HEADER_RIGHT = {
  label: 'SELECTED WORKS',
};

const THOUGHTS_TEXT = 'The work is in the spread, not the cover.';

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

  // Spread arrangement: top row first (left page top, right page top), then
  // bottom row (left page bottom, right page bottom). Z-pattern reading.
  const [leftTop, rightTop, leftBottom, rightBottom] = projects;

  return (
    <>
      <div
        className={styles.canvas}
        data-entry-motion={canvasEntryMotion}
        style={{ ['--canvas-enter-delay' as string]: contentEnterDelay }}
      >
        {/* Ambient dot field with cursor spotlight — the only background
         * pattern. Mounted first so it sits behind the notebook + side
         * margin elements. */}
        <SpotlightDotGrid />

        <CanvasCloseButton onClick={handleClose} />

        <NotebookSpread
          leftPage={
            <NotebookPage header={PAGE_HEADER_LEFT}>
              <ProjectRow
                project={leftTop}
                index={0}
                onClick={handleProjectClick}
              />
              <ProjectRow
                project={leftBottom}
                index={2}
                onClick={handleProjectClick}
              />
            </NotebookPage>
          }
          rightPage={
            <NotebookPage header={PAGE_HEADER_RIGHT}>
              <ProjectRow
                project={rightTop}
                index={1}
                onClick={handleProjectClick}
              />
              <ProjectRow
                project={rightBottom}
                index={3}
                onClick={handleProjectClick}
              />
            </NotebookPage>
          }
        />

        <CanvasMarginNote text={THOUGHTS_TEXT} />
      </div>

      <Grain />
    </>
  );
}
