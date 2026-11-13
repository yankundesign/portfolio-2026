import type { ReactNode } from 'react';
import { Link } from 'react-router';
import ClothBoard from './ClothBoard';
import Credits from './Credits';
import RevealOnScroll from './RevealOnScroll';
import { useRunningHead } from '../../interactions/useRunningHead';
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
  backTo: string;
  /** Module-level constant: the observer restarts if this changes identity. */
  chapterIds: readonly string[];
  chapters: readonly Chapter[];
  /** What the head says above the first chapter. */
  title: string;
  ofTotal: string;
}

/** The homepage's top bar, kept as the reader scrolls; its centre names the chapter. */
export function RunningHead({ backTo, chapterIds, chapters, title, ofTotal }: RunningHeadProps) {
  const active = useRunningHead(chapterIds);
  const current = chapters.find((c) => c.id === active) ?? null;
  return (
    <div className={s.head}>
      <div className={s.headRow}>
        <Link to={backTo} className={s.back}>
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
  header: CaseHeader;
  glance: readonly Glance[];
}

/** The title set like the homepage's name, the facts strip, the opening board, three short answers. */
export function CaseOpener({ header, glance }: CaseOpenerProps) {
  return (
    <header className={s.opener}>
      <div className={s.titleBlock}>
        <h1 className={s.title}>
          <span className={s.titleRoman}>{header.title.roman}</span>{' '}
          <span className={s.titleItalic}>{header.title.italic}</span>
        </h1>
        <p className={s.subtitle}>{header.subtitle}</p>
      </div>

      <dl className={`${s.row} ${s.facts}`}>
        {header.facts.map((f) => (
          <div key={f.label} className={s.fact}>
            <dt>{f.label}</dt>
            <dd>{f.value}</dd>
          </div>
        ))}
      </dl>

      <ClothBoard board={header.hero} eager className={s.hero} />

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

/** A chapter opens like the works page's Contents: numeral, one italic word, a full ink rule, one claim. */
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
    <RevealOnScroll as="figure" className={`${s.row} ${s.statement}`}>
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
    <RevealOnScroll as="figure" className={s.poster}>
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

/** Credits, the next project as a works-page row, and the colophon. */
export function CaseEnd({ credits, next, ofTotal }: CaseEndProps) {
  return (
    <footer className={s.end}>
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
