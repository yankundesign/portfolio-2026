import ClothBoard from './ClothBoard';
import TaskPathDiagram from './TaskPathDiagram';
import PivotDiagram from './PivotDiagram';
import LayersDiagram from './LayersDiagram';
import { RunningHead, CaseOpener, ChapterMark, Statement, PosterLine, MarginNote, CaseEnd } from './NotebookCase';
import { contents } from '../../data/projects';
import { casePosition } from '../../data/notebookCase';
import {
  header,
  glance,
  chapters,
  task,
  taskRequest,
  taskStops,
  answer,
  prototypesLede,
  prototypes,
  research,
  turn,
  pivot,
  decisions,
  outcome,
  layers,
  lessons,
  credits,
  type Chapter,
  type Prototype,
} from '../../data/controlHubAgenticNotebook';
import s from './NotebookCase.module.css';

export interface ControlHubAgenticNotebookProps {
  /** Where "← Works" goes: the open notebook. */
  backTo: string;
}

const CHAPTER_IDS = chapters.map((c) => c.id);
const chapterById = (id: string): Chapter => chapters.find((c) => c.id === id) as Chapter;
const TOTAL = chapters.length;
const position = casePosition('control-hub-agentic', contents);

/**
 * Control Hub Workflows (the slug stays control-hub-agentic) — v4, the
 * notebook layout. Shared pieces and styles: NotebookCase.tsx and
 * NotebookCase.module.css.
 *
 * The case study in the language of the Monograph homepage and the open
 * notebook: a running head with a hairline, the title set like the
 * homepage's name, chapters that open like the works page's Contents, and
 * every dark screen tipped onto the notebook's navy cloth (ClothBoard).
 *
 * The page sits on a 12-column grid with two margins: the left (1–3) says
 * where you are, the right (10–12) holds supporting evidence; text runs in
 * 4–9. References and the move taken from each:
 * 00-brief/references/agentic-case-study-v4/README.md. The v3 page stays at
 * ?v=3 for comparison.
 */
export default function ControlHubAgenticNotebook({ backTo }: ControlHubAgenticNotebookProps) {
  const [p01, p02, p03, p04, p05] = prototypes;

  return (
    <article className={s.article} data-layout="notebook">
      <RunningHead
        backTo={backTo}
        chapterIds={CHAPTER_IDS}
        chapters={chapters}
        title="Control Hub Workflows"
        ofTotal={position.ofTotal}
      />
      <CaseOpener header={header} glance={glance} />

      {/* ---- 01 The task ----------------------------------------- */}
      <section id="task" className={s.chapter} aria-labelledby="task-word">
        <ChapterMark total={TOTAL} chapter={chapterById('task')} />
        {/* One spread: the ticket and its cost beside the path it takes. */}
        <div className={`${s.row} ${s.spread}`}>
          <div className={s.spreadText}>
            <p className={s.body}>{task.lede}</p>
            <figure className={s.ticket}>
              <blockquote>
                <p>&ldquo;{taskRequest}&rdquo;</p>
              </blockquote>
              <figcaption className={s.ticketFrom}>{task.ticketFrom}</figcaption>
            </figure>
            <p className={s.body}>{task.cost}</p>
          </div>
          <div className={s.spreadFigure}>
            <TaskPathDiagram request={taskRequest} stops={taskStops} caption={task.diagramCaption} bare />
          </div>
        </div>
      </section>

      {/* ---- 02 The answer --------------------------------------- */}
      <section id="answer" className={s.chapter} aria-labelledby="answer-word">
        <ChapterMark total={TOTAL} chapter={chapterById('answer')} />
        <div className={s.row}>
          <p className={`${s.t} ${s.lede}`}>{answer.lede}</p>
        </div>
        <div className={`${s.row} ${s.sub}`}>
          <p className={`${s.l} ${s.label}`}>{answer.engineLabel}</p>
          <p className={`${s.t} ${s.body}`}>{answer.engine}</p>
        </div>
        <ClothBoard board={answer.board} className={s.board} />
      </section>

      {/* ---- 03 Five prototypes ---------------------------------- */}
      <section id="prototypes" className={s.chapter} aria-labelledby="prototypes-word">
        <ChapterMark total={TOTAL} chapter={chapterById('prototypes')} />
        <div className={s.row}>
          <p className={`${s.t} ${s.lede}`}>{prototypesLede}</p>
        </div>

        <nav className={s.row} aria-label="The five prototypes">
          <ol className={`${s.w} ${s.toc}`}>
            {prototypes.map((p) => (
              <li key={p.id}>
                <a href={`#${p.id}`} className={s.tocRow}>
                  <span className={s.tocN}>{p.n}</span>
                  <span className={s.tocTitle}>{p.title}</span>
                  <span className={s.tocMove}>{p.move}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <PrototypeModule p={p01} />
        <PrototypeModule p={p02} />

        <Statement phrase={research.phrase} from={research.from} />
        <div className={s.row}>
          <p className={`${s.t} ${s.body}`}>{research.text}</p>
        </div>

        <PrototypeModule p={p03} />

        {/* The turn: the page's one line at poster scale. */}
        <div id="turn" className={s.turn}>
          <PosterLine from={turn.from}>{turn.phrase}</PosterLine>
          <div className={s.row}>
            <p className={`${s.t} ${s.body}`}>{turn.text}</p>
          </div>
          <div className={`${s.row} ${s.diagram}`}>
            <div className={s.c}>
              <PivotDiagram {...pivot} caption={turn.diagramCaption} />
            </div>
          </div>
          <div className={`${s.row} ${s.reason}`}>
            <p className={`${s.t} ${s.body}`}>{turn.call}</p>
            <MarginNote label="Trade-off" text={turn.tradeoff} />
          </div>
        </div>

        <PrototypeModule p={p04} />
        <PrototypeModule p={p05} />
      </section>

      {/* ---- 04 Decisions ---------------------------------------- */}
      <section id="decisions" className={s.chapter} aria-labelledby="decisions-word">
        <ChapterMark total={TOTAL} chapter={chapterById('decisions')} />
        {decisions.map((d, i) => (
          <section key={d.id} id={d.id} className={s.decision} aria-labelledby={`${d.id}-title`}>
            <div className={s.row}>
              <p className={`${s.l} ${s.decisionN}`} aria-hidden="true">
                {i + 1} / {decisions.length}
              </p>
              <h3 id={`${d.id}-title`} className={`${s.c} ${s.decisionTitle}`}>
                {d.title}
              </h3>
            </div>
            <div className={`${s.row} ${s.reason}`}>
              <p className={`${s.t} ${s.body}`}>{d.why}</p>
              <MarginNote label="Trade-off" text={d.tradeoff} />
            </div>
            <ClothBoard board={d.board} className={s.board} />
          </section>
        ))}
      </section>

      {/* ---- 05 Outcome ------------------------------------------ */}
      <section id="outcome" className={s.chapter} aria-labelledby="outcome-word">
        <ChapterMark total={TOTAL} chapter={chapterById('outcome')} />
        <div className={s.row}>
          <p className={`${s.t} ${s.lede}`}>{outcome.lede}</p>
        </div>
        <dl className={`${s.row} ${s.outcomes}`}>
          {outcome.facts.map((f) => (
            <div key={f.big} className={s.outcomeItem}>
              <dt>{f.big}</dt>
              <dd>{f.text}</dd>
            </div>
          ))}
        </dl>
        <div className={`${s.row} ${s.diagram}`}>
          <div className={s.w}>
            <LayersDiagram {...layers} caption={outcome.diagramCaption} />
          </div>
        </div>
      </section>

      {/* ---- 06 Lessons ------------------------------------------ */}
      <section id="lessons" className={s.chapter} aria-labelledby="lessons-word">
        <ChapterMark total={TOTAL} chapter={chapterById('lessons')} />
        {lessons.map((l) => (
          <div key={l.line} className={`${s.row} ${s.lesson}`}>
            <p className={`${s.c} ${s.lessonLine}`}>{l.line}</p>
            <p className={`${s.t} ${s.body}`}>{l.text}</p>
          </div>
        ))}
      </section>

      <CaseEnd credits={credits} next={position.next} ofTotal={position.ofTotal} />
    </article>
  );
}

/* ---- Pieces ------------------------------------------------------- */

/** A prototype: its numeral in the left margin, one question, the text, then its board. */
function PrototypeModule({ p }: { p: Prototype }) {
  return (
    <section id={p.id} className={s.proto} aria-labelledby={`${p.id}-title`}>
      <div className={s.row}>
        <p className={`${s.l} ${s.protoMark}`}>
          <span className={s.protoN}>{p.n}</span>
          <span className={s.protoMove}>{p.move}</span>
        </p>
        <div className={s.t}>
          <h3 id={`${p.id}-title`} className={s.protoTitle}>
            {p.title}
          </h3>
          <div className={s.body}>
            {p.text.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
        </div>
      </div>
      <ClothBoard board={p.board} className={s.board} />
      {p.more && (
        <>
          {p.more.text?.length ? (
            <div className={`${s.row} ${s.more}`}>
              <div className={`${s.t} ${s.body}`}>
                {p.more.text.map((para) => (
                  <p key={para.slice(0, 24)}>{para}</p>
                ))}
              </div>
            </div>
          ) : null}
          {/* After text, the first board takes a board's space; otherwise
              they all continue the run from the first board. */}
          {p.more.boards.map((b, i) => (
            <ClothBoard key={b.caption} board={b} className={i === 0 && p.more?.text?.length ? s.board : s.boardNext} />
          ))}
        </>
      )}
    </section>
  );
}
