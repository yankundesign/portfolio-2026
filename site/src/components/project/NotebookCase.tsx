import type { MouseEvent, ReactNode } from 'react';
import { Link, useNavigate } from 'react-router';
import ClothBoard from './ClothBoard';
import Credits from './Credits';
import RevealOnScroll from './RevealOnScroll';
import StringRule from '../shared/StringRule';
import SpringRule from '../shared/SpringRule';
import { useRunningHead } from '../../interactions/useRunningHead';
import { usePlateLanding } from '../../interactions/usePlateLanding';
import { plateCarry } from '../../interactions/plateCarry';
import type { CaseHeader, Chapter, Glance } from '../../data/notebookCase';
import s from './NotebookCase.module.css';

/**
 * The notebook case-study layout's shared pieces (Control Hub Workflows,
 * Control Hub AI Assistant). Styles: NotebookCase.module.css, which also
 * holds the grid (.row and the .l .t .r .c .w .f columns) and the four-step
 * type scale the pages compose with. References and moves:
 * 00-brief/references/agentic-case-study-v4/README.md.
 */

export interface RunningHeadProps {
  /** The project's slug: from the top of the page, “← Works” carries its opening board home. */
  slug: string;
  backTo: string;
  /** Module-level constant: the observer restarts if this changes identity. */
  chapterIds: readonly string[];
  chapters: readonly Chapter[];
  /** What the head says above the first chapter. */
  title: string;
  ofTotal: string;
}

/** The homepage's top bar, kept as the reader scrolls; its centre names the chapter. */
export function RunningHead({ slug, backTo, chapterIds, chapters, title, ofTotal }: RunningHeadProps) {
  const active = useRunningHead(chapterIds);
  const current = chapters.find((c) => c.id === active) ?? null;
  const navigate = useNavigate();
  // While the opening board is still on screen, it is carried back to its
  // thumbnail on the works page (PlateCarry). Further down, the link is a link.
  const back = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    const page = e.currentTarget.closest('article');
    if (plateCarry.carrying) { e.preventDefault(); return; }
    const under = e.currentTarget.closest('[data-running-head]')?.getBoundingClientRect().bottom ?? 0;
    if (!page || !plateCarry.canBring(slug, page, under)) return;
    e.preventDefault();
    void plateCarry.bring(slug, page).then(() => navigate(backTo));
  };
  return (
    <div className={s.head} data-running-head>
      <div className={s.headRow}>
        <Link to={backTo} className={s.back} onClick={back}>
          <span aria-hidden="true">←</span> Works
        </Link>
        <p className={s.headChapter} aria-hidden="true">
          <span key={current?.id ?? 'opener'} className={s.headSwap}>
            {current ? `${current.n} · ${current.word}` : title}
          </span>
        </p>
        <p className={s.headRight}>Field notebook · {ofTotal}</p>
      </div>
    </div>
  );
}

export interface CaseOpenerProps {
  /** The project's slug: a plate carried from the works page lands on this opener's board. */
  slug: string;
  header: CaseHeader;
  glance: readonly Glance[];
}

/**
 * The title set like the homepage's name, the facts as one mono line, the
 * opening board, three short answers. Reached from the works page, the board
 * is that page's plate, carried here (usePlateLanding), and the type inks in
 * around it.
 */
export function CaseOpener({ slug, header, glance }: CaseOpenerProps) {
  const landing = usePlateLanding(slug);
  return (
    <header className={s.opener} data-arriving={landing.arriving || undefined}>
      <div className={s.titleBlock}>
        <h1 className={s.title}>
          <span className={s.titleRoman}>{header.title.roman}</span>{' '}
          <span className={s.titleItalic}>{header.title.italic}</span>
        </h1>
        <p className={s.subtitle}>{header.subtitle}</p>
      </div>

      <dl className={s.facts}>
        {header.facts.map((f) => (
          <div key={f.label} className={s.fact}>
            <dt>{f.label}</dt>
            <dd>{f.value}</dd>
          </div>
        ))}
      </dl>

      <ClothBoard board={header.hero} eager className={s.hero} landing={landing} />

      <dl className={`${s.row} ${s.glance}`}>
        {glance.map((g) => (
          <div key={g.label} className={s.glanceItem}>
            <dt>{g.label}</dt>
            <dd>{g.text}</dd>
          </div>
        ))}
      </dl>
    </header>
  );
}

/** A chapter opens like the works page's Contents: numeral, one italic word, a full ink rule (a string: it draws in and rings), one claim. */
export function ChapterMark({ chapter, total }: { chapter: Chapter; total: number }) {
  return (
    <>
      <div className={`${s.row} ${s.mark}`}>
        <p className={`${s.l} ${s.markN}`} aria-hidden="true">
          {chapter.n}
          <span className={s.markOf}> / {String(total).padStart(2, '0')}</span>
        </p>
        <h2 id={`${chapter.id}-word`} className={`${s.w} ${s.markWord}`}>
          {chapter.word}
        </h2>
        {/* the chapter's rule is a string, as the homepage's rules are */}
        <StringRule />
      </div>
      {chapter.claim && (
        <div className={s.row}>
          <p className={`${s.c} ${s.claim}`}>{chapter.claim}</p>
        </div>
      )}
    </>
  );
}

/** One sentence set alone, with its source under it. */
export function Statement({ phrase, from }: { phrase: string; from: string }) {
  return (
    <RevealOnScroll as="figure" variant="ink" className={`${s.row} ${s.statement}`}>
      <blockquote className={`${s.w} ${s.statementPhrase}`}>
        <p>&ldquo;{phrase}&rdquo;</p>
      </blockquote>
      <figcaption className={`${s.w} ${s.statementFrom}`}>{from}</figcaption>
    </RevealOnScroll>
  );
}

/** The page's one line at poster scale, with its source. Children are the line itself. */
export function PosterLine({ children, from }: { children: ReactNode; from: string }) {
  return (
    <RevealOnScroll as="figure" variant="ink" className={s.poster}>
      <blockquote className={s.posterPhrase}>
        <p>{children}</p>
      </blockquote>
      <figcaption className={s.posterFrom}>{from}</figcaption>
    </RevealOnScroll>
  );
}

/** A note in the right margin beside the paragraph it qualifies (a trade-off, a scope). */
export function MarginNote({ label, text }: { label: string; text: string }) {
  return (
    <aside className={`${s.r} ${s.note}`} aria-label={label}>
      <p className={s.label}>{label}</p>
      <p className={s.noteText}>{text}</p>
    </aside>
  );
}

export interface CaseEndProps {
  credits: { design: string; partners: readonly string[] };
  next: { slug: string; title: string; caption: string; number: string } | null;
  ofTotal: string;
}

/** The cover's line as the closing rule, credits, the next project as a works-page row, and the colophon. */
export function CaseEnd({ credits, next, ofTotal }: CaseEndProps) {
  return (
    <footer className={s.end}>
      {/* the cover's line closes the case study: a spring, then the rule */}
      <SpringRule />
      <div className={`${s.row} ${s.credits}`}>
        <p className={`${s.l} ${s.label}`}>Credits</p>
        <div className={s.t}>
          <Credits design={credits.design} partners={credits.partners} />
        </div>
      </div>

      {next && (
        <Link to={`/works/${next.slug}`} className={`${s.row} ${s.next}`}>
          <span className={`${s.l} ${s.label}`}>Next</span>
          <span className={`${s.w} ${s.nextRow}`}>
            <span className={s.tocN}>{next.number}</span>
            <span className={s.nextTitle}>{next.title}</span>
            <span className={s.nextArrow} aria-hidden="true">→</span>
            <span className={s.tocLine}>{next.caption}</span>
          </span>
        </Link>
      )}

      <p className={s.colophon}>
        Field notebook · {ofTotal} <span aria-hidden="true">·</span> Typeset in Fraunces &amp; JetBrains Mono
      </p>
    </footer>
  );
}
