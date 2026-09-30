import ProjectHeader from './ProjectHeader';
import ProseBlock from './ProseBlock';
import EditorialPlate from './EditorialPlate';
import InlineMetric from './InlineMetric';
import MetricDisplay from './MetricDisplay';
import SectionHeader from './SectionHeader';
import SectionRail from './SectionRail';
import Credits from './Credits';
import TodoSlot from './TodoSlot';
import RevealOnScroll from './RevealOnScroll';
import {
  header,
  // openingProse,
  contextProse,
  roadmapProse,
  evolutionProse,
  smartSearchProse,
  reportDataAnalysisProse,
  customReportProse,
  aiInsightsProse,
  outcomeProse,
  nextProse,
  proofs,
  figures,
  metrics,
  credits,
  sections,
} from '../../data/chaiContent';
import styles from './ChaiProject.module.css';

/**
 * CHAI — Control Hub AI case study detail page.
 *
 * Bespoke layout, not a template. Each section has its own placement
 * decisions: where plates sit, where sub-beats break, how the rhythm
 * shifts between narrative and proof.
 *
 * Structure (top to bottom, matches the section rail order):
 *   1. Header           fig number, title, subtitle, metadata strip
 *   2. Opening          lead paragraph + CHAI v1.0 plate
 *   3. Context          tight paragraph + Control Hub plate
 *   4. Road Map         release plan paragraph + roadmap plate
 *   5. Evolution        1.0 → 2.0 → 3.0, three plates side by side
 *   6. Smart Search     prose, inline metrics, plate
 *   7. Report Analysis  two sub-beats:
 *                         · 6.1 Report + data analysis → widgets — 3 plates
 *                         · 6.2 Custom report generation         — 2 plates
 *   8. Active Troubleshooting
 *                       AI-generated insights, one composite plate
 *   9. Outcome          3% → 18% display + context paragraph
 *  10. Next             transition into the Control Hub Agentic case study
 *  11. Credits          role-only, no names
 *  12. Colophon         tiny mono footer
 *
 * Content comes from site/src/data/chaiContent.ts. Prose slots that
 * are null render a TodoSlot — explicit placeholder, never lorem ipsum.
 */
export default function ChaiProject() {
  return (
    <article className={styles.article}>
      {/* ---- Header -------------------------------------------- */}
      <ProjectHeader {...header} />

      {/* ---- Body grid: rail · reading column · gutter --------- */}
      <div className={styles.grid}>
        <SectionRail sections={sections} className={styles.rail} />
        <div className={styles.body}>

          {/* ---- Beat 1 · Opening (temporarily hidden) -------------
          <section id="beat-1" aria-label="Opening" className={styles.beat}>
            <SectionHeader label="Opening" />
            {openingProse ? (
              <ProseBlock paragraphs={openingProse} />
            ) : (
              <TodoSlot
                beat="Beat 1 · Opening moment"
                hint="2–4 sentences. Open on the CHAI v1.0 screen, the admin, or a specific moment — not on the diagnosis. Let the reader see what you saw."
                outlineRef="01-content/chai.md · Beat 1"
                size="md"
              />
            )}
            <EditorialPlate figure={figures.chai10} />
          </section>
          */}

          {/* ---- Beat 2 · Context ---------------------------------- */}
          <section id="beat-2" aria-label="Context" className={styles.beat}>
            <SectionHeader label="Context" />
            {contextProse ? (
              <ProseBlock paragraphs={contextProse} />
            ) : (
              <TodoSlot
                beat="Beat 2 · Context"
                hint="40–60 words. What Control Hub is, who the admins are, where CHAI v1 sat when you joined."
                outlineRef="01-content/chai.md · Beat 2"
                size="sm"
              />
            )}
            <EditorialPlate figure={figures.context} />
          </section>

          {/* ---- Beat 3 · Road Map --------------------------------- */}
          <section id="roadmap" aria-label="Road Map" className={styles.beat}>
            <SectionHeader label="Road Map" />
            {roadmapProse ? (
              <ProseBlock paragraphs={roadmapProse} />
            ) : (
              <TodoSlot
                beat="Beat 3 · Road Map"
                hint="50–90 words. Why three releases, what each one was scoped to prove, how the work was paced."
                outlineRef="01-content/chai.md · Beat 3"
                size="md"
              />
            )}
            <EditorialPlate figure={figures.roadmap} />
          </section>

          {/* ---- Beat 4 · Evolution (1.0 → 2.0 → 3.0) -------------- */}
          <section id="evolution" aria-label="Evolution" className={styles.beat}>
            <SectionHeader label="Evolution" summary={proofs.evolution.summary} />
            {evolutionProse ? (
              <ProseBlock paragraphs={evolutionProse} />
            ) : (
              <TodoSlot
                beat="Beat 4 · Evolution"
                hint="Lead paragraph for the three releases. The plates carry the visual proof; the prose names what changed and why."
                outlineRef="01-content/chai.md · Beat 4"
                size="md"
              />
            )}
            <div className={styles.evolutionRow}>
              <EditorialPlate figure={figures.evolution10} />
              <EditorialPlate figure={figures.evolution20} />
              <EditorialPlate figure={figures.evolutionFloating} />
              <EditorialPlate figure={figures.evolution30} />
            </div>
          </section>

          {/* ---- Beat 5 · Smart Search ----------------------------- */}
          <section id="proof-1" aria-label="Smart Search" className={styles.proof}>
            <SectionHeader label="Smart Search" summary={proofs.smartSearch.summary} />
            {smartSearchProse ? (
              <ProseBlock paragraphs={smartSearchProse} />
            ) : (
              <TodoSlot
                beat="Beat 5 · Smart Search"
                hint="Two or three design calls that made the tunnel affordance work. Craft detail, not just outcome."
                outlineRef="01-content/chai.md · Beat 5"
                size="md"
              />
            )}
            <RevealOnScroll className={styles.inlineMetrics} translate={16}>
              <InlineMetric {...metrics.noResult} />
              <InlineMetric {...metrics.entryPoints} />
            </RevealOnScroll>
            <EditorialPlate figure={figures.smartSearch} />
          </section>

          {/* ---- Beat 6 · Report Analysis (with 6.1 / 6.2) --------- */}
          <section id="proof-2" aria-label="Report Analysis" className={styles.proof}>
            <SectionHeader label="Report Analysis" summary={proofs.reportAnalysis.summary} />

            {/* 6.1 · Report analysis → data analysis → widget system */}
            <div className={styles.subBeat}>
              <h3 className={styles.subBeatTitle}>
                <span className={styles.subBeatNumeral}>6.1</span>
                Report analysis → data analysis
              </h3>
              {reportDataAnalysisProse ? (
                <ProseBlock paragraphs={reportDataAnalysisProse} />
              ) : (
                <TodoSlot
                  beat="Beat 6.1 · Report and data analysis"
                  hint="Report analysis → live data → reusable widget system. Keep the progression concise."
                  outlineRef="01-content/chai.md · Beat 6.1"
                  size="md"
                />
              )}
              <EditorialPlate figure={figures.reportAnalysis} />
              <EditorialPlate figure={figures.dataAnalysis} />
              <EditorialPlate figure={figures.widgetSystem} />
            </div>

            {/* 6.2 · AI-generated reports (the reframe) */}
            <div className={styles.subBeat}>
              <h3 className={styles.subBeatTitle}>
                <span className={styles.subBeatNumeral}>6.2</span>
                AI-generated reports — flipping the workflow
              </h3>
              {customReportProse ? (
                <ProseBlock paragraphs={customReportProse} />
              ) : (
                <TodoSlot
                  beat="Beat 6.2 · AI-generated reports"
                  hint="The reframe: from report → insights to using AI to generate the custom report itself. Name the call you changed your mind on."
                  outlineRef="01-content/chai.md · Beat 6.2"
                  size="md"
                />
              )}
              <EditorialPlate figure={figures.customReport1} />
              <EditorialPlate figure={figures.customReport2} />
            </div>
          </section>

          {/* ---- Beat 7 · Active Troubleshooting -------------------- */}
          <section id="proof-3" aria-label="AI-generated insights" className={styles.proof}>
            <SectionHeader label="AI-generated insights" summary={proofs.aiInsights.summary} />
            {aiInsightsProse ? (
              <ProseBlock paragraphs={aiInsightsProse} />
            ) : (
              <TodoSlot
                beat="Beat 7 · Active Troubleshooting"
                hint="Reactive troubleshooting → proactive insight → recommended action → adjustable generation rules."
                outlineRef="01-content/chai.md · Beat 7"
                size="md"
              />
            )}
            <EditorialPlate figure={figures.aiInsights} />
          </section>

          {/* ---- Beat 8 · Outcome ---------------------------------- */}
          <section id="outcome" aria-label="Outcome" className={styles.beat}>
            <SectionHeader label="Outcome" />
            <MetricDisplay {...metrics.adoption} />
            {outcomeProse ? (
              <ProseBlock paragraphs={outcomeProse} />
            ) : (
              <TodoSlot
                beat="Beat 8 · Outcome"
                hint="2–3 sentences. What 18% means in lived terms — what it replaced, who it freed up."
                outlineRef="01-content/chai.md · Beat 8"
                size="md"
              />
            )}
          </section>

          {/* ---- Beat 9 · Next ------------------------------------- */}
          <section id="next" aria-label="Next" className={styles.beat}>
            <SectionHeader label="Next: Control Hub Agentic" summary={proofs.next.summary} />
            {nextProse ? (
              <ProseBlock paragraphs={nextProse} />
            ) : (
              <TodoSlot
                beat="Beat 9 · Next — Control Hub Agentic"
                hint="2–3 sentences setting up the next case study. What CHAI taught you that the agentic work picks up. Bridge, not summary."
                outlineRef="01-content/chai.md · Beat 9"
                size="md"
              />
            )}
            <EditorialPlate figure={figures.nextPreview} />
          </section>

          {/* ---- Credits ------------------------------------------- */}
          <section id="credits" aria-label="Credits" className={styles.beat}>
            <SectionHeader label="Credits" />
            <Credits design={credits.design} partners={credits.partners} />
          </section>

        </div>
        <div className={styles.gutter} aria-hidden="true" />
      </div>

      {/* ---- Colophon ------------------------------------------ */}
      <footer className={styles.colophon}>
        <p className={styles.colophonLine}>
          <span>fig. 01 of iv</span>
          <span aria-hidden="true" className={styles.sep}>·</span>
          <span>Typeset in Fraunces &amp; JetBrains Mono</span>
        </p>
      </footer>
    </article>
  );
}
