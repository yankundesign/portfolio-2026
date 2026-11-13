import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import Notebook from '../components/notebook/Notebook';
import NotebookContents from '../components/notebook/NotebookContents';
import MobileContents from '../components/notebook/MobileContents';
import Grain from '../components/shared/Grain';
import { contents, projects, type Project } from '../data/projects';
import { useNotebook, type NotebookState } from '../interactions/useNotebook';
import { useMonographPointer } from '../interactions/useMonographPointer';
import { useTrailingPeek } from '../interactions/useTrailingPeek';
import { useInputModality } from '../interactions/useInputModality';
import { useMediaQuery } from '../interactions/useMediaQuery';
import { useReducedMotion } from '../interactions/useReducedMotion';
import styles from './HomeRoute.module.css';

const NARROW = '(max-width: 900px)';

/** The faces the intro waits for. `document.fonts.ready` can resolve before the
 * font stylesheet has even been read, so the intro asks for the faces. */
const FACES = ["300 100px Fraunces", "italic 300 100px Fraunces", "400 12px 'JetBrains Mono'"];

const SF_TIME = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Los_Angeles', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });

/** San Francisco time in the top bar, the colon breathing. */
function LocalTime() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 15000);
    return () => window.clearInterval(id);
  }, []);
  const parts = Object.fromEntries(SF_TIME.formatToParts(now).map((x) => [x.type, x.value]));
  return (
    <span className={styles.clock}>
      San Francisco · {parts.hour}<b>:</b>{parts.minute}
    </span>
  );
}

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

/** An index label, one span per letter so each can carry its own weight (MonographIndex). */
function Glyphs({ text }: { text: string }) {
  return (
    <span className={styles.lblCell}>
      <span className={styles.lbl}>
        {[...text].map((c, i) => <span key={i} data-glyph>{c}</span>)}
      </span>
    </span>
  );
}

/** The index's rules as strings: five lines, and the ink of the four under the rows. */
const ROWS = 4;

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
  const lampRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<SVGSVGElement>(null);
  const openLabelRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<HTMLDivElement>(null);
  const firstSync = useRef(true);

  // The intro: 'wait' (fonts loading, everything hidden) → 'run' (the rule draws,
  // the name rises, the notebook is set down) → 'done'. A visit that starts on
  // the open book, and reduced motion, skip it.
  const [intro, setIntro] = useState<'wait' | 'run' | 'done'>(() => (wantOpen || reducedMotion ? 'done' : 'wait'));
  const playIntro = useRef(intro === 'wait');

  const [bookState, setBookState] = useState<NotebookState>('closed');
  // The raised plates' full-size PNGs load from the first time the book is
  // asked to open (they arrive while the cover swings), never on the homepage.
  const [platesWanted, setPlatesWanted] = useState(wantOpen);
  if (wantOpen && !platesWanted) setPlatesWanted(true);
  const engine = useNotebook({ slotRef, reducedMotion, onStateChange: setBookState });
  const { peekRef, show: showPeek, hide: hidePeek } = useTrailingPeek(reducedMotion);
  const pointer = useMonographPointer({
    engine, slotRef, nameRef, lampRef, ruleRef, openLabelRef, indexRef,
    active: bookState === 'closed' && !narrow,
    reducedMotion,
  });

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

  // The intro, timed from when the faces are in:
  //   0 ms    the rule under the top bar draws (700 ms)
  //   200 ms  the name rises, letter by letter
  //   520 ms  the notebook comes down, opaque within ~40 ms, and settles
  //   950 ms  the index and the aside
  //   1900 ms the name starts answering the cursor
  useEffect(() => {
    if (!playIntro.current) { pointer.land(); return; }
    let cancelled = false;
    const timers: number[] = [];
    const wait = (ms: number) => new Promise<void>((r) => { timers.push(window.setTimeout(r, ms)); });
    void (async () => {
      await Promise.race([Promise.all(FACES.map((f) => document.fonts.load(f))).catch(() => undefined), wait(2500)]);
      await new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));
      if (cancelled) return;
      setIntro('run');
      pointer.drawRule(700);
      // the book is set down as it appears: a little lifted, no contact shadow yet
      timers.push(window.setTimeout(() => engine.settleFrom({ lift: 0.05, shadow: 0.12 }), 520));
      timers.push(window.setTimeout(() => { setIntro('done'); pointer.land(); }, 1900));
    })();
    return () => { cancelled = true; timers.forEach((t) => window.clearTimeout(t)); };
  }, [engine, pointer]);

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
      data-intro={intro}
    >
      <div ref={lampRef} className={styles.lamp} aria-hidden="true" />

      <main className={styles.frame} inert={homeHidden}>
        <header className={styles.top}>
          <span className={styles.c1}>Yankun Wang</span>
          <span className={styles.c2}>Senior product designer</span>
          <span className={styles.c3}><LocalTime /></span>
        </header>
        {/* The top bar's hairline, drawn as a line that can ring (MonographPointer). */}
        <svg ref={ruleRef} className={styles.rule} aria-hidden="true"><path d="" /></svg>

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

        {/* The index: its rules are strings, its labels swell under the cursor (MonographIndex). */}
        <div ref={indexRef} className={styles.index}>
          <ul aria-label="Pages">
            <li data-index-row data-opens-book>
              <button type="button" onClick={openWorks}>
                <span className={styles.n}>01</span><Glyphs text="Works" />
                <span className={styles.arrow}><span className={styles.go}>→</span></span>
              </button>
            </li>
            <li data-index-row>
              <a href="/Yankun-Wang-CV-2026.pdf" target="_blank" rel="noopener">
                <span className={styles.n}>02</span><Glyphs text="Résumé" />
                <span className={styles.arrow}>PDF <span className={styles.go} data-dir="ne">↗</span></span>
              </a>
            </li>
            <li data-index-row>
              <Link to="/about" onPointerEnter={showPeek} onPointerLeave={hidePeek} onClick={hidePeek}>
                <span className={styles.n}>03</span><Glyphs text="About" />
                <span className={styles.arrow}><span className={styles.go}>→</span></span>
              </Link>
            </li>
            <li data-index-row>
              <a href="mailto:yankunux@gmail.com">
                <span className={styles.n}>04</span><Glyphs text="Email" />
                <span className={styles.arrow}><span className={styles.go} data-dir="ne">↗</span></span>
              </a>
            </li>
          </ul>
          <svg className={styles.strings} aria-hidden="true" data-strings>
            {Array.from({ length: ROWS + 1 }, (_, j) => <path key={`line-${j}`} data-line={j} />)}
            {Array.from({ length: ROWS }, (_, i) => <path key={`ink-${i}`} className={styles.ink} data-ink={i} pathLength={1} />)}
          </svg>
        </div>
      </main>

      <div className={styles.bookFade}>
        <Notebook engine={engine} state={bookState} onClose={closeWorks} keyboardOpen={modality === 'keyboard'}>
          <NotebookContents projects={projects} contents={contents} onOpenProject={openProject} loadPlates={platesWanted} />
        </Notebook>
      </div>

      {narrow && wantOpen && (
        <MobileContents projects={projects} contents={contents} onOpenProject={openProject} onClose={closeWorks} />
      )}

      {/* Over the closed notebook, this label is the cursor. */}
      <div ref={openLabelRef} className={styles.openLabel} aria-hidden="true"><span>Open →</span></div>

      <div ref={peekRef} className={styles.peek} aria-hidden="true">
        <img src="/images/about/me.png" alt="" />
        <span>Yankun, 2026</span>
      </div>

      <Grain />
    </div>
  );
}
