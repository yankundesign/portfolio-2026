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
  credits,
  sections,
} from '../../data/sapFieldglassContent';
import styles from './ChaiProject.module.css';

/**
 * SAP Fieldglass - concise project detail page.
 *
 * Built as a compact showcase rather than a long case study: one opening,
 * one reframe, three design proofs, and a short outcome/reflection.
 */
export default function SapFieldglassProject() {
  return (
    <article className={styles.article}>
      <ProjectHeader {...header} />

      <div className={styles.grid}>
        <SectionRail sections={sections} className={styles.rail} />
        <div className={styles.body}>

          <section id="opening" aria-label="Opening" className={styles.beat}>
            <SectionHeader label="Opening" />
            <ProseBlock paragraphs={prose.opening} variant="lead" />
          </section>

          <section id="reframe" aria-label="Reframe" className={styles.proof}>
            <SectionHeader
              label="Reframe"
              title="From search to a stronger default path"
              summary="The project started as UI modernization. The bigger opportunity was navigation."
            />
            <ProseBlock paragraphs={prose.reframe} />
            <EditorialPlate figure={figures.searchReframe} />
          </section>

          <section id="homepage" aria-label="Homepage Framework" className={styles.proof}>
            <SectionHeader
              label="Proof one"
              title="Role-based homepage"
              summary="Templates made the first view useful before customers configured anything."
            />
            <ProseBlock paragraphs={prose.homepage} />
            <EditorialPlate figure={figures.personaMapping} />
            <EditorialPlate figure={figures.widgetSystem} />
          </section>

          <section id="worker" aria-label="Worker Management" className={styles.proof}>
            <SectionHeader
              label="Proof two"
              title="Worker management"
              summary="Hiring managers needed worker context and next actions in the same place."
            />
            <ProseBlock paragraphs={prose.worker} />
            <div className={styles.evolutionRow}>
              <EditorialPlate figure={figures.todos} />
              <EditorialPlate figure={figures.insights} />
            </div>
          </section>

          <section id="profile" aria-label="Worker Profile" className={styles.proof}>
            <SectionHeader
              label="Proof three"
              title="Worker profile"
              summary="Dense worker information became a scannable overview."
            />
            <ProseBlock paragraphs={prose.profile} />
            <EditorialPlate figure={figures.profile} />
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
          <span>fig. 04 of iv</span>
          <span aria-hidden="true" className={styles.sep}>&middot;</span>
          <span>Typeset in Fraunces &amp; JetBrains Mono</span>
        </p>
      </footer>
    </article>
  );
}
