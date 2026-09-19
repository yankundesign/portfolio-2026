import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import ProjectPlate from '../components/canvas/ProjectPlate';
import CanvasCloseButton from '../components/canvas/CanvasCloseButton';
import CanvasPager from '../components/canvas/CanvasPager';
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
const DESKTOP_CANVAS_QUERY = '(min-width: 1101px)';
const PROJECTS_PER_SPREAD = 4;

function useDesktopCanvas(): boolean {
  const [isDesktop, setIsDesktop] = useState(() => {
    return (
      typeof window !== 'undefined' &&
      window.matchMedia(DESKTOP_CANVAS_QUERY).matches
    );
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_CANVAS_QUERY);
    const onChange = (event: MediaQueryListEvent) => {
      setIsDesktop(event.matches);
    };

    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
  }, []);

  return isDesktop;
}

/**
 * CanvasRoute — canvas v1.0 (viewport-fitted spread).
 *
 * A real notebook spread is a fixed page: you turn it, you don't scroll it.
 * Four equal plates sit on one shared desktop spread at a time, with later
 * projects continuing onto a second viewport-fitted spread. Tops and bottoms
 * stay registered across the spine; hierarchy comes from reading order,
 * status, and metric — never card size. Below 1100px pagination disappears
 * and all projects become one single-column scroll.
 *
 * The notebook backdrop carries `data-transition-source="spread"` so the
 * desk -> canvas close transition can measure it (see NotebookTransition).
 */

export default function CanvasRoute() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { state, closeNotebook } = useTransitionState();
  const isDesktop = useDesktopCanvas();
  const [hasPaged, setHasPaged] = useState(false);

  const pageCount = Math.max(
    1,
    Math.ceil(projects.length / PROJECTS_PER_SPREAD),
  );
  const requestedPage = Number(searchParams.get('page') ?? '1');
  const currentPage = Number.isInteger(requestedPage)
    ? Math.min(Math.max(requestedPage - 1, 0), pageCount - 1)
    : 0;

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
      navigate(`/works/${slug}`, {
        state: { fromCanvas: `${location.pathname}${location.search}` },
      });
    },
    [location.pathname, location.search, navigate],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      const nextPage = Math.min(Math.max(page, 0), pageCount - 1);
      const nextParams = new URLSearchParams(searchParams);

      if (nextPage === 0) {
        nextParams.delete('page');
      } else {
        nextParams.set('page', String(nextPage + 1));
      }

      setHasPaged(true);
      setSearchParams(nextParams);
    },
    [pageCount, searchParams, setSearchParams],
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

  // Source order in data/projects.ts IS the composition. Desktop slices that
  // order into four-project spreads; tablet/mobile keep one complete list.
  // `index` remains global so figure identity and entrance staggering never
  // reset when the fifth project moves onto spread two.
  const plates = useMemo(
    () => {
      const startIndex = isDesktop
        ? currentPage * PROJECTS_PER_SPREAD
        : 0;
      const visibleProjects = isDesktop
        ? projects.slice(startIndex, startIndex + PROJECTS_PER_SPREAD)
        : projects;

      return visibleProjects.map((project, index) => ({
        project,
        index: isDesktop ? startIndex + index : index,
      }));
    },
    [currentPage, isDesktop],
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
          <div
            className={styles.spreadStage}
            data-current-spread={currentPage + 1}
          >
            <div
              key={isDesktop ? `spread-${currentPage}` : 'spread-all'}
              className={`${styles.spread} ${hasPaged ? styles.spreadChanged : ''}`}
            >
              {plates.map(({ project, index }) => (
                <ProjectPlate
                  key={project.slug}
                  project={project}
                  index={index}
                  onClick={handleProjectClick}
                />
              ))}
            </div>

            {isDesktop && pageCount > 1 && (
              <div
                className={`${styles.spreadPager} ${currentPage > 0 ? styles.spreadPagerContinuation : ''}`}
              >
                <CanvasPager
                  currentPage={currentPage}
                  pageCount={pageCount}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </main>

        {/* Running footer — decorative folio furniture only. The interactive
         * pager is anchored to the project grid above for contrast. */}
        <div className={styles.runningFooter} aria-hidden="true">
          <span aria-hidden="true">note / 001 — works</span>
        </div>
      </div>

      <Grain />
    </>
  );
}
