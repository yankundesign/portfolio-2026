import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import Notebook from '../components/notebook/Notebook';
import NotebookContents from '../components/notebook/NotebookContents';
import MobileContents from '../components/notebook/MobileContents';
import Grain from '../components/shared/Grain';
import { projects, type Project } from '../data/projects';
import { useNotebook, type NotebookState } from '../interactions/useNotebook';
import { useMonographPointer } from '../interactions/useMonographPointer';
import { useTrailingPeek } from '../interactions/useTrailingPeek';
import { useInputModality } from '../interactions/useInputModality';
import { useMediaQuery } from '../interactions/useMediaQuery';
import { useReducedMotion } from '../interactions/useReducedMotion';
import styles from './HomeRoute.module.css';

const NARROW = '(max-width: 900px)';

/** The name, one span per letter so each can carry its own weight. */
function Letters({ text, line }: { text: string; line: number }) {
  return (
    <>
      {[...text].map((c, i) => (
        <span key={i} className={styles.ch} data-letter style={{ ['--i' as string]: i, ['--line' as string]: line }}>
          {c}
        </span>
      ))}
    </>
  );
}

/**
 * HomeRoute — the homepage (01 · Monograph) and the works page, as one place.
 *
 * "/" shows the name at poster scale with the Field Notebook standing in front
 * of it. "/works" is the same notebook, open: the contents spread. The URL is
 * the source of truth; the notebook animates between the two, so links, the
 * back button and direct visits to /works all work. Returning from a case
 * study lands on the open spread without replaying the opening.
 *
 * Narrow screens keep the homepage composition (stacked) and show the works
 * page as a single column instead of a 3D spread.
 */
export default function HomeRoute() {
  const location = useLocation();
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();
  const narrow = useMediaQuery(NARROW);
  const modality = useInputModality();
  const wantOpen = location.pathname === '/works';

  const rootRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLButtonElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const firstSync = useRef(true);

  const [bookState, setBookState] = useState<NotebookState>('closed');
  const engine = useNotebook({ slotRef, reducedMotion, onStateChange: setBookState });
  const { peekRef, show: showPeek, hide: hidePeek } = useTrailingPeek(reducedMotion);
  useMonographPointer({ rootRef, slotRef, nameRef, engine, active: bookState === 'closed' && !narrow, reducedMotion });

  // The URL decides; the book follows. Re-runs when an animation settles, so
  // a back/forward press mid-animation is honoured once the book is still.
  useEffect(() => {
    if (narrow) return;
    const state = engine.getState();
    if (wantOpen && state === 'closed') {
      if (firstSync.current) engine.showOpen();
      else void engine.open();
    } else if (!wantOpen && state === 'open') {
      void engine.close();
    }
    firstSync.current = false;
  }, [engine, wantOpen, bookState, narrow]);

  // On narrow screens the homepage scrolls; the book layer is fixed, so it
  // re-measures its slot as the page moves.
  useEffect(() => {
    const root = rootRef.current;
    if (!narrow || !root) return;
    const onScroll = () => engine.remeasure();
    root.addEventListener('scroll', onScroll, { passive: true });
    return () => root.removeEventListener('scroll', onScroll);
  }, [engine, narrow]);

  // A homepage visit starts with the book lifted and shadowless; it settles.
  useEffect(() => {
    if (!wantOpen) engine.settleFrom({ lift: 0.07, shadow: 0, blur: 40 });
    // only on first mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openWorks = useCallback(() => {
    navigate('/works', { state: { fromHome: true } });
  }, [navigate]);

  const closeWorks = useCallback(() => {
    const fromHome = (location.state as { fromHome?: boolean } | null)?.fromHome;
    if (fromHome) navigate(-1);
    else navigate('/');
  }, [location.state, navigate]);

  const openProject = useCallback((project: Project) => {
    navigate(`/works/${project.slug}`, { state: { fromCanvas: '/works' } });
  }, [navigate]);

  useEffect(() => {
    if (!wantOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeWorks(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [wantOpen, closeWorks]);

  const homeHidden = narrow ? wantOpen : bookState !== 'closed';

  return (
    <div
      ref={rootRef}
      className={styles.home}
      data-book={narrow ? (wantOpen ? 'open' : 'closed') : bookState}
      data-start={wantOpen ? 'open' : 'closed'}
    >
      <div className={styles.lamp} aria-hidden="true" />

      <main className={styles.frame} inert={homeHidden}>
        <header className={styles.top}>
          <span className={styles.c1}>Yankun Wang</span>
          <span className={styles.c2}>Senior product designer</span>
          <span className={styles.c3}>San Francisco · 2026</span>
        </header>

        <h1 ref={nameRef} className={styles.name} aria-label="Yankun Wang">
          <span className={`${styles.line} ${styles.l1}`} aria-hidden="true"><Letters text="Yankun" line={0} /></span>
          <span className={`${styles.line} ${styles.l2}`} aria-hidden="true"><Letters text="Wang" line={1} /></span>
        </h1>

        <div className={styles.aside}>
          <span>Field Notebook</span>
          <span>Selected work, 2020–2026</span>
        </div>

        <button
          ref={slotRef}
          type="button"
          className={styles.slot}
          onClick={openWorks}
          aria-label="Open the notebook: selected work"
          aria-expanded={wantOpen}
        />

        <ul className={styles.index} aria-label="Pages">
          <li>
            <button type="button" onClick={openWorks}>
              <span className={styles.n}>01</span><span className={styles.lbl}>Works</span><span className={styles.arrow}>→</span>
            </button>
          </li>
          <li>
            <a href="/Yankun-Wang-CV-2026.pdf" target="_blank" rel="noopener">
              <span className={styles.n}>02</span><span className={styles.lbl}>Résumé</span><span className={styles.arrow}>PDF ↗</span>
            </a>
          </li>
          <li>
            <Link to="/about" onPointerEnter={showPeek} onPointerLeave={hidePeek} onClick={hidePeek}>
              <span className={styles.n}>03</span><span className={styles.lbl}>About</span><span className={styles.arrow}>→</span>
            </Link>
          </li>
          <li>
            <a href="mailto:yankunux@gmail.com">
              <span className={styles.n}>04</span><span className={styles.lbl}>Email</span><span className={styles.arrow}>↗</span>
            </a>
          </li>
        </ul>
      </main>

      <div className={styles.bookFade}>
        <Notebook engine={engine} state={bookState} onClose={closeWorks} keyboardOpen={modality === 'keyboard'}>
          <NotebookContents projects={projects} onOpenProject={openProject} />
        </Notebook>
      </div>

      {narrow && wantOpen && (
        <MobileContents projects={projects} onOpenProject={openProject} onClose={closeWorks} />
      )}

      <div ref={peekRef} className={styles.peek} aria-hidden="true">
        <img src="/images/about/me.png" alt="" />
        <span>Yankun, 2026</span>
      </div>

      <Grain />
    </div>
  );
}
