import ProjectHeader from './ProjectHeader';
import AtAGlance from './AtAGlance';
import EditorialPlate from './EditorialPlate';
import VideoPlate from './VideoPlate';
import ProseBlock from './ProseBlock';
import PullQuote from './PullQuote';
import SectionHeader from './SectionHeader';
import SectionRail from './SectionRail';
import TaskPathDiagram from './TaskPathDiagram';
import PrototypeMap from './PrototypeMap';
import PivotDiagram from './PivotDiagram';
import DecisionRow from './DecisionRow';
import LayersDiagram from './LayersDiagram';
import QuoteSpread from './QuoteSpread';
import GroundedPanels from './GroundedPanels';
import Credits from './Credits';
import {
  header,
  glance,
  prose,
  quotes,
  bridgeSpread,
  onWorkflows,
  lessons,
  taskRequest,
  taskStops,
  prototypeMap,
  runLoop,
  runSteps,
  figures,
  videos,
  pivot,
  decisions,
  layers,
  credits,
  sections,
} from '../../data/controlHubAgenticContent';
import layout from './ChaiProject.module.css';
import styles from './ControlHubAgenticProject.module.css';

/**
 * Control Hub Agentic — project detail page, v2.
 *
 * Answer first, then the story: the task, where it ended up, how we got
 * there (explore · turn · bridge, five prototypes), the decisions up
 * close, how I worked, where the work went, what I learned. Same chapter
 * layout as CHAI: header, sticky rail, one reading column.
 * Brief: 00-brief/prd-agentic-case-study-v2.md.
 */
export default function ControlHubAgenticProject() {
  return (
    <article className={layout.article}>
      <ProjectHeader {...header} />

      <div className={layout.grid}>
        <SectionRail sections={sections} className={layout.rail} />
        <div className={layout.body}>
          <AtAGlance rows={glance} />

          {/* ---- The task ------------------------------------------ */}
          <section id="task" aria-label="The task" className={layout.beat}>
            <SectionHeader
              label="The task"
              title="Admins think in tasks. Control Hub is built around settings."
            />
            <ProseBlock paragraphs={[...prose.ask, prose.task[0]]} />
            <TaskPathDiagram
              request={taskRequest}
              stops={taskStops}
              caption="One task, then every page and tab — the manual path"
            />
            <ProseBlock paragraphs={prose.task.slice(1)} />
          </section>

          {/* ---- Where it ended up --------------------------------- */}
          <section id="answer" aria-label="Where it ended up" className={layout.beat}>
            <SectionHeader
              label="Where it ended up"
              title="One request. A plan to approve. Every step shown."
            />
            <ProseBlock paragraphs={prose.answer.slice(0, 1)} />
            <VideoPlate figure={runLoop} />
            <div className={styles.quad}>
              {runSteps.map((step) => (
                <EditorialPlate key={step.src} figure={step} className={styles.gridPlate} />
              ))}
            </div>
            <ProseBlock paragraphs={prose.answer.slice(1)} />
          </section>

          {/* ---- How we got there ---------------------------------- */}
          <section id="how" aria-label="How we got there" className={layout.proof}>
            <SectionHeader label="How we got there" title="A prototype for every question" />
            <ProseBlock paragraphs={prose.how} />
            <PrototypeMap
              moves={prototypeMap}
              caption="Explore · turn · bridge — five prototypes, with Cloud Control underneath"
            />

            <h3 className={styles.move}>Explore</h3>

            <section id="p01" aria-labelledby="p01-title" className={styles.prototype}>
              <h4 id="p01-title" className={layout.subBeatTitle}>
                <span className={layout.subBeatNumeral}>01</span>
                What could agentic AI do for admins?
              </h4>
              <ProseBlock paragraphs={prose.p01} />
              <EditorialPlate figure={figures.p01} />
            </section>

            <section id="p02" aria-labelledby="p02-title" className={styles.prototype}>
              <h4 id="p02-title" className={layout.subBeatTitle}>
                <span className={layout.subBeatNumeral}>02</span>
                Easy to start, easy to watch
              </h4>
              <ProseBlock paragraphs={prose.p02} />
              <VideoPlate figure={videos.p02} />
            </section>

            <section id="research" aria-label="Research" className={styles.anchor}>
              <PullQuote {...quotes.research} quoted={false} />
              <ProseBlock paragraphs={prose.research} />
            </section>

            <section id="p03" aria-labelledby="p03-title" className={styles.prototype}>
              <h4 id="p03-title" className={layout.subBeatTitle}>
                <span className={layout.subBeatNumeral}>03</span>
                The agent shows its plan first, inside the Assistant
              </h4>
              <ProseBlock paragraphs={prose.p03} />
              <VideoPlate figure={videos.p03} />
            </section>

            <h3 className={styles.move}>Turn</h3>

            <section id="pause" aria-label="Should we pause?" className={styles.anchor}>
              <PullQuote {...quotes.pause} />
              <ProseBlock paragraphs={prose.pause} />
            </section>

            <section id="call" aria-labelledby="call-title" className={styles.prototype}>
              <h4 id="call-title" className={layout.subBeatTitle}>
                <span className={layout.subBeatNumeral}>My call</span>
                Not an agent. Steps the admin can check.
              </h4>
              <PivotDiagram
                {...pivot}
                caption="The agent that decides, dropped · the steps the admin checks, kept"
              />
              <ProseBlock paragraphs={prose.call} />
            </section>

            <section id="p04" aria-labelledby="p04-title" className={styles.prototype}>
              <h4 id="p04-title" className={layout.subBeatTitle}>
                <span className={layout.subBeatNumeral}>04</span>
                Instructions the AI follows, step by step
              </h4>
              <ProseBlock paragraphs={prose.p04} />
              <EditorialPlate figure={figures.p04} />
            </section>

            <h3 className={styles.move}>Bridge</h3>

            <section id="bridge" aria-label="We have something similar" className={styles.anchor}>
              <QuoteSpread {...bridgeSpread} />
              <ProseBlock paragraphs={prose.bridge} />
            </section>

            <section id="p05" aria-labelledby="p05-title" className={styles.prototype}>
              <h4 id="p05-title" className={layout.subBeatTitle}>
                <span className={layout.subBeatNumeral}>05</span>
                Workflows can act on Control Hub
              </h4>
              <ProseBlock paragraphs={prose.p05} />
              <GroundedPanels {...onWorkflows} />
            </section>
          </section>

          {/* ---- Decisions ----------------------------------------- */}
          <section id="decisions" aria-label="Design decisions" className={layout.proof}>
            <SectionHeader
              label="Decisions"
              title="If admins treat AI like an intern, design it like a good one."
            />
            <ProseBlock paragraphs={prose.decisions} />
            {decisions.map((decision) => (
              <DecisionRow key={decision.id} {...decision} />
            ))}
          </section>

          {/* ---- How I worked -------------------------------------- */}
          <section id="craft" aria-label="How I worked" className={layout.proof}>
            <SectionHeader
              label="How I worked"
              title="I designed the states and the rules, not the screens"
            />
            <ProseBlock paragraphs={prose.craft} />
            <div className={styles.pair}>
              <EditorialPlate figure={figures.studio} className={styles.gridPlate} />
              <EditorialPlate figure={figures.studioGuide} className={styles.gridPlate} />
            </div>
          </section>

          {/* ---- Outcome ------------------------------------------- */}
          <section id="outcome" aria-label="Where the work went" className={layout.beat}>
            <SectionHeader label="Outcome" title="Where the work went" />
            <ProseBlock paragraphs={prose.outcome.slice(0, 1)} />
            <LayersDiagram {...layers} caption="My layer, between the admin’s task and the platform" />
            <ProseBlock paragraphs={prose.outcome.slice(1)} />
          </section>

          {/* ---- What I learned ------------------------------------ */}
          <section id="lessons" aria-label="What I learned" className={layout.beat}>
            <SectionHeader label="What I learned" />
            <div className={styles.lessons}>
              {lessons.map((lesson) => (
                <div key={lesson.line} className={styles.lesson}>
                  <p className={styles.lessonLine}>{lesson.line}</p>
                  <ProseBlock paragraphs={[lesson.text]} width="narrow" />
                </div>
              ))}
            </div>
          </section>

          {/* ---- Credits ------------------------------------------- */}
          <section id="credits" aria-label="Credits" className={layout.beat}>
            <SectionHeader label="Credits" />
            <Credits design={credits.design} partners={credits.partners} />
          </section>
        </div>
        <div className={layout.gutter} aria-hidden="true" />
      </div>

      <footer className={layout.colophon}>
        <p className={layout.colophonLine}>
          <span>fig. 02 of iv</span>
          <span aria-hidden="true" className={layout.sep}>·</span>
          <span>Typeset in Fraunces &amp; JetBrains Mono</span>
        </p>
      </footer>
    </article>
  );
}
