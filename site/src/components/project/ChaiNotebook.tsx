import { Link } from 'react-router';
import ClothBoard from './ClothBoard';
import ScreenInspector from './ScreenInspector';
import RoadmapDrawing from './RoadmapDrawing';
import { RunningHead, CaseOpener, ChapterMark, Statement, PosterLine, MarginNote, CaseEnd } from './NotebookCase';
import { contents } from '../../data/projects';
import { casePosition, type Chapter } from '../../data/notebookCase';
import {
  header,
  glance,
  chapters,
  context,
  roadmapStages,
  roadmapNext,
  evolution,
  find,
  understand,
  fix,
  outcome,
  credits,
} from '../../data/chaiNotebook';
import s from './NotebookCase.module.css';

export interface ChaiNotebookProps {
  /** Where "← Works" goes: the open notebook. */
  backTo: string;
}

const CHAPTER_IDS = chapters.map((c) => c.id);
const chapterById = (id: string): Chapter => chapters.find((c) => c.id === id) as Chapter;
const TOTAL = chapters.length;
const position = casePosition('chai', contents);
const workflows = casePosition(roadmapNext.slug, contents);

/**
 * Control Hub AI Assistant (CHAI) — v4, the notebook layout, in the same
 * system as Control Hub Workflows (NotebookCase.tsx and its stylesheet):
 * the running head, the title set like the homepage's name, chapters that
 * open like the works page's Contents, every screen tipped onto the
 * notebook's navy cloth, and one four-step type scale.
 *
 * The chapters follow CHAI's own roadmap (find, understand, fix), drawn in
 * ink in the first chapter; each job in the drawing links to its chapter.
 * The page's one poster-scale line is the outcome, 3% → 18%. The v3 page
 * stays at ?v=3 for comparison.
 */
export default function ChaiNotebook({ backTo }: ChaiNotebookProps) {
  return (
    <ScreenInspector>
    <article className={s.article} data-layout="notebook">
      <RunningHead
        slug="chai"
        backTo={backTo}
        chapterIds={CHAPTER_IDS}
        chapters={chapters}
        title="Control Hub AI Assistant"
        ofTotal={position.ofTotal}
      />
      <CaseOpener slug="chai" header={header} glance={glance} />

      {/* ---- 01 Context ------------------------------------------ */}
      <section id="context" className={s.chapter} aria-labelledby="context-word">
        <ChapterMark total={TOTAL} chapter={chapterById('context')} />
        <div className={s.row}>
          <p className={`${s.t} ${s.lede}`}>{context.lede}</p>
        </div>
        <div className={`${s.row} ${s.sub}`}>
          <p className={`${s.l} ${s.label}`}>{context.roadmapLabel}</p>
          <p className={`${s.t} ${s.body}`}>{context.roadmap}</p>
        </div>
        <div className={`${s.row} ${s.diagram}`}>
          <div className={s.w}>
            <RoadmapDrawing
              stages={roadmapStages}
              next={{ ...roadmapNext, number: workflows.number }}
              caption="The roadmap · three jobs, each a chapter below, then the agentic work"
            />
          </div>
        </div>
      </section>

      {/* ---- 02 Evolution ---------------------------------------- */}
      <section id="evolution" className={s.chapter} aria-labelledby="evolution-word">
        <ChapterMark total={TOTAL} chapter={chapterById('evolution')} />
        <div className={s.row}>
          <p className={`${s.t} ${s.lede}`}>{evolution.lede}</p>
        </div>
        <ClothBoard board={evolution.board} className={s.board} />
        <div className={`${s.row} ${s.more}`}>
          <p className={`${s.t} ${s.body}`}>{evolution.turn}</p>
        </div>
        {evolution.boards.map((b, i) => (
          <ClothBoard key={b.caption} board={b} className={i === 0 ? s.board : s.boardNext} />
        ))}
      </section>

      {/* ---- 03 Find --------------------------------------------- */}
      <section id="find" className={s.chapter} aria-labelledby="find-word">
        <ChapterMark total={TOTAL} chapter={chapterById('find')} />
        <div className={s.row}>
          <p className={`${s.t} ${s.lede}`}>{find.lede}</p>
        </div>
        <div className={`${s.row} ${s.sub}`}>
          <p className={`${s.t} ${s.body}`}>{find.call}</p>
        </div>
        <ClothBoard board={find.board} className={s.board} />
        {/* The result sits under the state that earned it. */}
        <dl className={`${s.row} ${s.outcomes}`}>
          {find.metrics.map((m) => (
            <div key={m.big} className={s.outcomeItem}>
              <dt>{m.big}</dt>
              <dd>{m.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ---- 04 Understand --------------------------------------- */}
      <section id="understand" className={s.chapter} aria-labelledby="understand-word">
        <ChapterMark total={TOTAL} chapter={chapterById('understand')} />
        <div className={s.row}>
          <p className={`${s.t} ${s.lede}`}>{understand.lede}</p>
        </div>
        <ClothBoard board={understand.report} className={s.board} />

        <div className={`${s.row} ${s.more}`}>
          <p className={`${s.l} ${s.label} ${s.subLabel}`}>{understand.acrossLabel}</p>
          <p className={`${s.t} ${s.body}`}>{understand.across}</p>
        </div>
        <ClothBoard board={understand.acrossBoard} className={s.board} />

        <Statement phrase={understand.quote.phrase} from={understand.quote.attribution} />
        <div className={`${s.row} ${s.sub}`}>
          <p className={`${s.l} ${s.label} ${s.subLabel}`}>{understand.widgetsLabel}</p>
          <p className={`${s.t} ${s.body}`}>{understand.widgets}</p>
        </div>
        <ClothBoard board={understand.widgetsBoard} className={s.board} />

        <div className={`${s.row} ${s.more} ${s.reason}`}>
          <p className={`${s.l} ${s.label} ${s.subLabel}`}>{understand.reportsLabel}</p>
          <p className={`${s.t} ${s.body}`}>{understand.reports}</p>
          <MarginNote label="Trust" text={understand.reportsNote} />
        </div>
        <ClothBoard board={understand.reportsBoard} className={s.board} />
      </section>

      {/* ---- 05 Fix ---------------------------------------------- */}
      <section id="fix" className={s.chapter} aria-labelledby="fix-word">
        <ChapterMark total={TOTAL} chapter={chapterById('fix')} />
        <div className={s.row}>
          <p className={`${s.t} ${s.lede}`}>{fix.lede}</p>
        </div>
        <ClothBoard board={fix.board} className={s.board} />
      </section>

      {/* ---- 06 Outcome: the page's one line at poster scale ----- */}
      <section id="outcome" className={s.chapter} aria-labelledby="outcome-word">
        <ChapterMark total={TOTAL} chapter={chapterById('outcome')} />
        <div className={s.outcomePoster}>
          <PosterLine from={outcome.from}>{outcome.figure}</PosterLine>
        </div>
        <div className={`${s.row} ${s.reason}`}>
          <p className={`${s.t} ${s.body}`}>{outcome.text}</p>
          <MarginNote label="Scope" text={outcome.scope} />
        </div>
        <div className={`${s.row} ${s.more}`}>
          <p className={`${s.l} ${s.label} ${s.subLabel}`}>{outcome.nextLabel}</p>
          <div className={`${s.t} ${s.body}`}>
            <p>{outcome.next}</p>
            <p>
              <Link to={`/works/${roadmapNext.slug}`} className={s.inlineLink}>
                {workflows.number} · {roadmapNext.label} →
              </Link>
            </p>
          </div>
        </div>
      </section>

      <CaseEnd credits={credits} next={position.next} ofTotal={position.ofTotal} />
    </article>
    </ScreenInspector>
  );
}
