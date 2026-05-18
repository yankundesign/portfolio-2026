import ProjectHeader from './ProjectHeader';
import EditorialPlate from './EditorialPlate';
import SectionHeader from './SectionHeader';
import SectionRail from './SectionRail';
import Credits from './Credits';
import TodoSlot from './TodoSlot';
import {
  header,
  figures,
  proofs,
  credits,
  sections,
} from '../../data/controlHubAgenticContent';
import styles from './ChaiProject.module.css';

/**
 * Control Hub Agentic — project detail page.
 *
 * Mirrors the CHAI case-study layout: header, sticky section rail, one reading
 * column, section headers, prose slots, and editorial plates. The outline is
 * not final prose, so each prose beat renders a TodoSlot until Yankun writes
 * the case-study essay.
 */
export default function ControlHubAgenticProject() {
  return (
    <article className={styles.article}>
      <ProjectHeader {...header} />

      <div className={styles.grid}>
        <SectionRail sections={sections} className={styles.rail} />
        <div className={styles.body}>

          <section id="opening" aria-label="Opening" className={styles.beat}>
            <SectionHeader label="Opening" />
            <TodoSlot
              beat="Beat 1 · Opening moment"
              hint="Open on the review tension: customers needed a recognizable Control Hub home base, not an AI surface that took the console away."
              outlineRef="01-content/control-hub-agentic-outline.md · Beat 1"
              size="md"
            />
            <EditorialPlate figure={figures.aiHome} />
          </section>

          <section id="context" aria-label="Context" className={styles.beat}>
            <SectionHeader label="Context" />
            <TodoSlot
              beat="Beat 2 · From CHAI to agentic work"
              hint="Bridge from CHAI: trust starts with explanation; agentic AI asks what trust looks like when the assistant can change the system."
              outlineRef="01-content/control-hub-agentic-outline.md · Beat 2"
              size="sm"
            />
          </section>

          <section id="framework" aria-label="Framework" className={styles.beat}>
            <SectionHeader
              label="Framework"
              title="Chat, insights, workflow, activity"
              summary="An interaction architecture for trust, not a dashboard tour."
            />
            <TodoSlot
              beat="Beat 3 · Core framework"
              hint="Name the four surfaces and the design calls: chat first, insights before action, widgets as portable primitives, canvas only for commit-level review, Activity as audit."
              outlineRef="01-content/control-hub-agentic-outline.md · Beat 3"
              size="md"
            />
            <div className={styles.evolutionRow}>
              <EditorialPlate figure={figures.frameworkChat} />
              <EditorialPlate figure={figures.frameworkInsights} />
              <EditorialPlate figure={figures.frameworkWorkflow} />
              <EditorialPlate figure={figures.frameworkActivity} />
            </div>
          </section>

          <section id="compare" aria-label="Compare Locations" className={styles.proof}>
            <SectionHeader
              label="Proof one"
              title={proofs.compare.title}
              summary={proofs.compare.summary}
            />
            <TodoSlot
              beat="Beat 4 · Compare locations"
              hint="Confirm whether this is one of the final three proof flows, and avoid time-saved claims until the estimate is defensible."
              outlineRef="01-content/control-hub-agentic-outline.md · Beat 4"
              size="md"
            />
            <EditorialPlate figure={figures.compare} />
          </section>

          <section id="onboard" aria-label="Device Onboarding" className={styles.proof}>
            <SectionHeader
              label="Proof two"
              title={proofs.onboard.title}
              summary={proofs.onboard.summary}
            />
            <TodoSlot
              beat="Beat 5 · Device onboarding"
              hint="Choose the exact device story: Cisco 8865 hot desk phones, mixed MTR, Room Bars / Desk Pros, or the final demo version."
              outlineRef="01-content/control-hub-agentic-outline.md · Beat 5"
              size="md"
            />
            <EditorialPlate figure={figures.onboardingPlan} />
            <EditorialPlate figure={figures.onboardingRun} />
          </section>

          <section id="delete" aria-label="Delete Virtual Line" className={styles.proof}>
            <SectionHeader
              label="Proof three"
              title={proofs.deleteLine.title}
              summary={proofs.deleteLine.summary}
            />
            <TodoSlot
              beat="Beat 6 · Destructive action"
              hint="Confirm whether Delete Virtual Line is the strongest third proof, or whether proactive troubleshooting replaced it."
              outlineRef="01-content/control-hub-agentic-outline.md · Beat 6"
              size="md"
            />
            <EditorialPlate figure={figures.dependencyMap} />
            <EditorialPlate figure={figures.activity} />
          </section>

          <section id="craft" aria-label="Prototype Craft" className={styles.proof}>
            <SectionHeader
              label="Craft"
              title={proofs.craft.title}
              summary={proofs.craft.summary}
            />
            <TodoSlot
              beat="Beat 7 · Prototype craft"
              hint="Add one concrete before/after from the widget restraint pass, and decide whether code/prototype craft belongs here or in the colophon."
              outlineRef="01-content/control-hub-agentic-outline.md · Beat 7"
              size="md"
            />
            <EditorialPlate figure={figures.widgetAnatomy} />
          </section>

          <section id="outcome" aria-label="Outcome" className={styles.beat}>
            <SectionHeader label="Outcome" />
            <TodoSlot
              beat="Beat 8 · What the work made possible"
              hint="Be honest about prototype impact: leadership alignment, product direction, buildable patterns, and reusable prototype architecture."
              outlineRef="01-content/control-hub-agentic-outline.md · Beat 8"
              size="md"
            />
            <EditorialPlate figure={figures.outcome} />
          </section>

          <section id="reflection" aria-label="Reflection" className={styles.beat}>
            <SectionHeader label="Reflection" />
            <TodoSlot
              beat="Beat 9 · Reflection"
              hint="One paragraph on what this project changed about your belief in agentic AI for enterprise software."
              outlineRef="01-content/control-hub-agentic-outline.md · Beat 9"
              size="sm"
            />
          </section>

          <section id="credits" aria-label="Credits" className={styles.beat}>
            <SectionHeader label="Credits" />
            <Credits design={credits.design} partners={credits.partners} />
          </section>

        </div>
        <div className={styles.gutter} aria-hidden="true" />
      </div>

      <footer className={styles.colophon}>
        <p className={styles.colophonLine}>
          <span>fig. 02 of iv</span>
          <span aria-hidden="true" className={styles.sep}>·</span>
          <span>Typeset in Fraunces &amp; JetBrains Mono</span>
        </p>
      </footer>
    </article>
  );
}
