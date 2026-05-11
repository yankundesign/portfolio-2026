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
 * canvas mounts via the open transition. Must be ≥ the time from canvas
 * mount until the open-transition overlay fully clears, otherwise the
 * earliest content animations begin BEHIND the still-fading overlay
 * and the user can't see them.
 *
 * Open transition timing (from NotebookTransition.tsx runOpen):
 *   click             t = 0
 *   navigate('/works')t = 520   ← canvas mounts here
 *   overlay clears    t = 1340  (1100 + 240 final fade)
 *
 * Gap from canvas mount to overlay clear: 1340 - 520 = 820ms.
 * Add 100ms breathing room so the user sees a brief "blank notebook"
 * moment before the first card lands → 920ms.
 *
 * On direct deep-links (no transition) this base is 0 — the rows enter
 * immediately on mount, no overlay to wait for.
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

  // Capture the transition state ONCE on mount (via useMemo with empty
  // semantics — useState would also work). If we mounted while the
  // overlay was opening (the common path), gate content animations
  // until the overlay clears. If state is already 'open' (deep link or
  // browser back/forward), no overlay to wait for — content enters
  // immediately. The captured value is stable for the route's lifetime
  // so the CSS variable doesn't churn mid-animation.
  const contentEnterDelay = useMemo(() => {
    return state === 'opening'
      ? `${CONTENT_ENTER_DELAY_AFTER_TRANSITION}ms`
      : '0ms';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
