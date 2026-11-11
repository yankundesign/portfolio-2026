import ProjectHeader from './ProjectHeader';
import ProseBlock from './ProseBlock';
import EditorialPlate from './EditorialPlate';
import VideoPlate from './VideoPlate';
import SectionHeader from './SectionHeader';
import SectionRail from './SectionRail';
import {
  breathPatterns,
  figures,
  header,
  interceptLoop,
  prose,
  sections,
  setupFlow,
} from '../../data/ebbContent';
import layout from './ReadingLayout.module.css';

/**
 * Ebb — source-locked iOS case study.
 *
 * It follows the established project-detail chapter structure with a shorter,
 * product-forward cadence. Breath patterns and the setup guide are the two
 * chapters after the first build: what kept the pause seen past week three,
 * and what lets someone other than me get through setup.
 */
export default function EbbProject() {
  return (
    <article className={layout.article}>
      <ProjectHeader {...header} />

      <div className={layout.grid}>
        <SectionRail sections={sections} className={layout.rail} />
        <div className={layout.body}>
          <section
            id="why"
            aria-label="Why Ebb exists"
            className={layout.beat}
          >
            <SectionHeader
              label="Why Ebb exists"
              title="How do you build friction that survives week three?"
            />
            <ProseBlock paragraphs={prose.why} variant="lead" />
          </section>

          <section
            id="what"
            aria-label="What Ebb is"
            className={layout.proof}
          >
            <SectionHeader
              label="What Ebb is"
              title="A pause between the tap and the feed"
              summary="The response remains calm and optional: Ebb never hard-blocks an app."
            />
            <ProseBlock paragraphs={prose.what} />
            <EditorialPlate figure={figures.productFrames} />
          </section>

          <section
            id="works"
            aria-label="How it works"
            className={layout.proof}
          >
            <SectionHeader
              label="How it works"
              title="Three breaths, every single time"
              summary="The count never changes. Only the pace does."
            />
            <ProseBlock paragraphs={prose.works} />
            <VideoPlate figure={interceptLoop} />
          </section>

          <section
            id="visual-system"
            aria-label="Visual system"
            className={layout.proof}
          >
            <SectionHeader
              label="Visual system"
              title="A record, not a reward"
              summary="The meter and the mark are the same object."
            />
            <ProseBlock paragraphs={prose.visualSystem} />
            <EditorialPlate figure={figures.record} />
            <EditorialPlate figure={figures.interceptScreen} />
          </section>

          <section
            id="patterns"
            aria-label="Breath patterns"
            className={layout.proof}
          >
            <SectionHeader
              label="Breath patterns"
              title="The form changes. The breath doesn't."
              summary="Each pattern must be quieter than the copy above it."
            />
            <ProseBlock paragraphs={prose.patterns} />
            <VideoPlate figure={breathPatterns} />
          </section>

          <section
            id="setup"
            aria-label="Setup guide"
            className={layout.proof}
          >
            <SectionHeader
              label="Setup guide"
              title="Three lines hid ten taps"
              summary="Setup is the most likely place Ebb fails, and it happens in another app."
            />
            <ProseBlock paragraphs={prose.setupProblem} />
            <VideoPlate figure={setupFlow} />
            <ProseBlock paragraphs={prose.setupDrawn} />
            <EditorialPlate figure={figures.setupPictures} />
            <ProseBlock paragraphs={prose.setupRecovery} />
          </section>

          <section
            id="build"
            aria-label="How I built it"
            className={layout.proof}
          >
            <SectionHeader
              label="How I built it"
              title="Two weeks from constraint to working iPhone app"
              summary="I designed the product and built it with Claude and Codex — carrying one interaction thesis from research through SwiftUI and QA."
            />
            <ProseBlock paragraphs={prose.build} />
          </section>
        </div>
        <div className={layout.gutter} aria-hidden="true" />
      </div>

      <footer className={layout.colophon}>
        <p className={layout.colophonLine}>
          <span>fig. 05 · independent iOS app</span>
          <span aria-hidden="true" className={layout.sep}>·</span>
          <span>First build in two weeks, with Claude &amp; Codex</span>
          <span aria-hidden="true" className={layout.sep}>·</span>
          <span>Typeset in Fraunces &amp; JetBrains Mono</span>
        </p>
      </footer>
    </article>
  );
}
