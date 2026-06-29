import ProjectHeader from './ProjectHeader';
import EditorialPlate from './EditorialPlate';
import ProseBlock from './ProseBlock';
import SectionHeader from './SectionHeader';
import SectionRail from './SectionRail';
import Credits from './Credits';
import {
  header,
  prose,
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
 * column, section headers, prose, and editorial plates.
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
            <ProseBlock paragraphs={prose.opening} />
            <EditorialPlate figure={figures.aiHome} />
          </section>

          <section id="context" aria-label="Context" className={styles.beat}>
            <SectionHeader label="Context" />
            <ProseBlock paragraphs={prose.context} />
          </section>

          <section id="framework" aria-label="Framework" className={styles.beat}>
            <SectionHeader
              label="Framework"
              title="Chat, insights, workflow, activity"
              summary="An interaction architecture for trust, not a dashboard tour."
            />
            <ProseBlock paragraphs={prose.framework} />
            <div className={styles.evolutionRow}>
              <EditorialPlate figure={figures.frameworkChat} />
              <EditorialPlate figure={figures.frameworkInsights} />
              <EditorialPlate figure={figures.frameworkAgents} />
              <EditorialPlate figure={figures.frameworkSkills} />
              <EditorialPlate figure={figures.frameworkActivity} />
            </div>
          </section>

          <section id="compare" aria-label="Compare Locations" className={styles.proof}>
            <SectionHeader
              label="Proof one"
              title={proofs.compare.title}
              summary={proofs.compare.summary}
            />
            <ProseBlock paragraphs={prose.compare} />
            <EditorialPlate figure={figures.compare} />
          </section>

          <section id="onboard" aria-label="Device Onboarding" className={styles.proof}>
            <SectionHeader
              label="Proof two"
              title={proofs.onboard.title}
              summary={proofs.onboard.summary}
            />
            <ProseBlock paragraphs={prose.onboard} />
            <EditorialPlate figure={figures.onboardingPlan} />
            <EditorialPlate figure={figures.onboardingRun} />
          </section>

          <section id="delete" aria-label="Delete Virtual Line" className={styles.proof}>
            <SectionHeader
              label="Proof three"
              title={proofs.deleteLine.title}
              summary={proofs.deleteLine.summary}
            />
            <ProseBlock paragraphs={prose.deleteLine} />
            <EditorialPlate figure={figures.dependencyMap} />
            <EditorialPlate figure={figures.activity} />
          </section>

          <section id="craft" aria-label="Prototype Craft" className={styles.proof}>
            <SectionHeader
              label="Craft"
              title={proofs.craft.title}
              summary={proofs.craft.summary}
            />
            <ProseBlock paragraphs={prose.craft} />
            <EditorialPlate figure={figures.widgetAnatomy} />
          </section>

          <section id="outcome" aria-label="Outcome" className={styles.beat}>
            <SectionHeader label="Outcome" />
            <ProseBlock paragraphs={prose.outcome} />
          </section>

          <section id="reflection" aria-label="Reflection" className={styles.beat}>
            <SectionHeader label="Reflection" />
            <ProseBlock paragraphs={prose.reflection} width="narrow" />
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
