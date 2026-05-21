import ProjectHeader from './ProjectHeader';
import ProseBlock from './ProseBlock';
import EditorialPlate from './EditorialPlate';
import SectionHeader from './SectionHeader';
import SectionRail from './SectionRail';
import RevealOnScroll from './RevealOnScroll';
import {
  header,
  sections,
  openingProse,
  evidenceIndex,
  figures,
  writeLikeWebex,
  studioSync,
  teamImpactProse,
  testimonialFigures,
  teamContributions,
  methodSteps,
  portfolioProse,
  portfolioStack,
  closingPillars,
} from '../../data/buildWithAiContent';
import styles from './BuildWithAiProject.module.css';

export default function BuildWithAiProject() {
  return (
    <article className={styles.article}>
      <ProjectHeader {...header} />

      <div className={styles.grid}>
        <SectionRail sections={sections} className={styles.rail} />
        <div className={styles.body}>
          <section id="opening" aria-label="Opening Plate" className={styles.beat}>
            <SectionHeader
              label="Opening Plate"
              title="AI-native designer"
              summary="Not a tools list. A record of how I turn AI into useful product and team practice."
            />
            <ProseBlock paragraphs={openingProse} />
            <div className={styles.indexGrid} aria-label="Evidence index">
              {evidenceIndex.map((item, index) => (
                <RevealOnScroll
                  key={item.label}
                  className={styles.indexItem}
                  delay={index * 50}
                  translate={12}
                >
                  <p className={styles.indexLabel}>{item.label}</p>
                  <p className={styles.indexText}>{item.text}</p>
                </RevealOnScroll>
              ))}
            </div>
          </section>

          <section id="tools" aria-label="Project Evidence" className={styles.proof}>
            <SectionHeader
              label="Project Evidence"
              title="Tools I built"
              summary="Small tools, built around real design-team friction."
            />

            <div className={styles.toolFocus}>
              <div className={styles.toolCopy}>
                <p className={styles.eyebrow}>{writeLikeWebex.eyebrow}</p>
                <h3 className={styles.toolTitle}>{writeLikeWebex.title}</h3>
                <p className={styles.toolIntro}>{writeLikeWebex.intro}</p>
                <div className={styles.toolMeta} aria-label="Write Like Webex project information">
                  {writeLikeWebex.info.map((item) => (
                    <div key={item.label} className={styles.toolMetaItem}>
                      <p className={styles.rowLabel}>{item.label}</p>
                      <p className={styles.metaText}>{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
              <EditorialPlate figure={figures.wlwIntro} className={styles.toolPlate} />
            </div>

            <div className={styles.proofRows} aria-label="Write Like Webex proof points">
              {writeLikeWebex.problem.map((proof) => (
                <RevealOnScroll key={proof.label} className={styles.proofRow} translate={12}>
                  <p className={styles.rowLabel}>{proof.label}</p>
                  <p className={styles.rowText}>{proof.body}</p>
                </RevealOnScroll>
              ))}
            </div>

            <EditorialPlate figure={figures.wlwFlow} className={styles.sequencePlate} />

            <div className={styles.toolStep}>
              <p className={styles.eyebrow}>Solution</p>
              <p className={styles.stepText}>{writeLikeWebex.solution}</p>
              <EditorialPlate figure={figures.wlwSolution} className={styles.sequencePlate} />
            </div>

            <div className={styles.toolStep}>
              <p className={styles.eyebrow}>{writeLikeWebex.guidelineSystem.title}</p>
              <p className={styles.stepText}>{writeLikeWebex.guidelineSystem.body}</p>
              <EditorialPlate figure={figures.wlwGuidelineSystem} className={styles.sequencePlate} />
            </div>

            <div className={styles.proofRows} aria-label="Write Like Webex impact and learning">
              {writeLikeWebex.learnings.map((proof) => (
                <RevealOnScroll key={proof.label} className={styles.proofRow} translate={12}>
                  <p className={styles.rowLabel}>{proof.label}</p>
                  <p className={styles.rowText}>{proof.body}</p>
                </RevealOnScroll>
              ))}
            </div>

            <aside className={styles.nextBlock}>
              <p className={styles.eyebrow}>Next</p>
              <p className={styles.nextText}>{writeLikeWebex.next}</p>
            </aside>

            <section className={styles.studioSync} aria-labelledby="studio-sync-title">
              <div className={styles.studioIntro}>
                <p className={styles.eyebrow}>Brief note</p>
                <h3 id="studio-sync-title" className={styles.compactTitle}>{studioSync.title}</h3>
                <p className={styles.compactText}>{studioSync.description}</p>
                <p className={styles.compactNote}>{studioSync.note}</p>
              </div>
              <div className={styles.studioPlates}>
                {studioSync.figures.map((figureKey) => (
                  <EditorialPlate
                    key={figureKey}
                    figure={figures[figureKey]}
                    className={styles.sequencePlate}
                  />
                ))}
              </div>
            </section>
          </section>

          <section id="team-impact" aria-label="Team Impact" className={styles.proof}>
            <SectionHeader
              label="Team Impact"
              title="I helped the team become AI-first"
              summary="The strongest signal is that the work changed how other people approached building."
            />
            <ProseBlock paragraphs={teamImpactProse} />

            <div className={styles.testimonialGrid}>
              {testimonialFigures.map((figureKey, index) => (
                <RevealOnScroll
                  key={figureKey}
                  className={styles.testimonial}
                  delay={index * 70}
                  translate={14}
                >
                  <EditorialPlate
                    figure={figures[figureKey]}
                    className={styles.testimonialPlate}
                  />
                </RevealOnScroll>
              ))}
            </div>

            <div className={styles.contributionList}>
              {teamContributions.map((contribution) => (
                <p key={contribution}>{contribution}</p>
              ))}
            </div>
          </section>

          <section id="method" aria-label="How I Work" className={styles.proof}>
            <SectionHeader
              label="How I Work"
              title="My AI workflow is constraint-led"
              summary="The repeatable part is not the tool. It is how the problem gets framed before the tool enters."
            />
            <ol className={styles.methodList}>
              {methodSteps.map((step) => (
                <RevealOnScroll as="li" key={step.title} className={styles.methodItem} translate={12}>
                  <h3 className={styles.methodTitle}>{step.title}</h3>
                  <p className={styles.methodText}>{step.body}</p>
                </RevealOnScroll>
              ))}
            </ol>
          </section>

          <section id="portfolio" aria-label="This Portfolio as Proof" className={styles.beat}>
            <SectionHeader
              label="This Portfolio"
              title="The site is part of the argument"
              summary="AI-assisted build, human-directed craft."
            />
            <ProseBlock paragraphs={portfolioProse} />
            <div className={styles.stackGrid}>
              {portfolioStack.map((item) => (
                <RevealOnScroll key={item.label} className={styles.stackItem} translate={12}>
                  <p className={styles.rowLabel}>{item.label}</p>
                  <p className={styles.rowText}>{item.body}</p>
                </RevealOnScroll>
              ))}
            </div>
          </section>

          <section id="closing" aria-label="What I Bring to a Team" className={styles.proof}>
            <SectionHeader
              label="Closing"
              title="What I bring to a team"
              summary="A designer who can imagine AI experiences, make them tangible, and bring others along."
            />
            <div className={styles.closingGrid}>
              {closingPillars.map((pillar) => (
                <RevealOnScroll key={pillar.title} className={styles.closingItem} translate={12}>
                  <h3 className={styles.closingTitle}>{pillar.title}</h3>
                  <p className={styles.closingText}>{pillar.body}</p>
                </RevealOnScroll>
              ))}
            </div>
          </section>
        </div>
        <div className={styles.gutter} aria-hidden="true" />
      </div>

      <footer className={styles.colophon}>
        <p className={styles.colophonLine}>
          <span>fig. 03 of iv</span>
          <span aria-hidden="true" className={styles.sep}>·</span>
          <span>Typeset in Fraunces &amp; JetBrains Mono</span>
        </p>
      </footer>
    </article>
  );
}
