import { useRef, type CSSProperties, type MouseEvent } from 'react';
import type { Project } from '../../data/projects';
import { useContentsSelection } from '../../interactions/useContentsSelection';
import { useContentsStamp } from '../../interactions/useContentsStamp';
import { usePlateFlight } from '../../interactions/usePlateFlight';
import { usePlateLoop } from '../../interactions/usePlateLoop';
import styles from './NotebookContents.module.css';

export interface NotebookContentsProps {
  /** Every plate on the contact sheet, in order. */
  projects: Project[];
  /** The contents rows: the projects that are in the contents, in order. */
  contents: Project[];
  /** Open a case study (internal projects); external ones are plain links. */
  onOpenProject: (project: Project) => void;
}

const nn = (i: number) => String(i + 1).padStart(2, '0');
/** The stagger step for the raised plate's notes. */
const k = (n: number) => ({ '--k': n }) as CSSProperties;

/** One contents entry: number, title, year (or “Read →”), and its caption. */
function RowBody({ project, i }: { project: Project; i: number }) {
  return (
    <>
      <span className={styles.n}>{nn(i)}</span>
      <span className={styles.t}>{project.title}</span>
      <span className={styles.y}>{project.year}</span>
      <span className={styles.go} aria-hidden="true">Read →</span>
      <span className={styles.c}>{project.caption}</span>
    </>
  );
}

/**
 * NotebookContents — what the open notebook shows: the works page.
 *
 * Left page: the contents, one ruled row per project, each with its caption.
 * Right page: the plates as a contact sheet. Pointing at a title raises that
 * project's plate out of its own thumbnail (usePlateFlight); leaving flies it
 * home. The row pointed at becomes a solid object (useContentsStamp): a navy
 * band with the row stamped on it in paper, which slides from row to row; the
 * title grows a little from its left edge and the year turns to "Read →".
 * Left edges never move. Pointing at a plate on the sheet marks its row and
 * leaves the sheet in place. A project with a preview loop plays it in the
 * raised plate.
 *
 * The raised plate carries its notes: the caption, a summary, at most two
 * figures set in the sheet's two columns, and a line of facts on the page's
 * foot, level with the contents' foot. They follow the plate in, one after
 * another, and play again when the reader points at another title.
 *
 * A plate can be on the sheet without a contents row (inContents: false); it
 * is unnumbered and raises nothing.
 *
 * The contents title and the plates start on one line: the title is trimmed to
 * its caps, so the top of the C sits on the plates' top edge.
 */
export default function NotebookContents({ projects, contents, onOpenProject }: NotebookContentsProps) {
  const { active, source, last, point, release } = useContentsSelection();
  // Only a title raises a plate; a plate on the sheet just marks its row.
  const current = active >= 0 && source === 'contents' ? active : -1;
  const shown = last >= 0 ? contents[last] : null;
  const playing = current >= 0 ? contents[current] : null;
  const rowOf = (project: Project) => contents.findIndex((p) => p.slug === project.slug);
  const plateOf = (row: number) => (row >= 0 ? projects.findIndex((p) => p.slug === contents[row].slug) : -1);
  const { playLoop, videoRef } = usePlateLoop();
  const pageRef = useRef<HTMLElement>(null);
  const tocRef = useRef<HTMLDivElement>(null);
  usePlateFlight(pageRef, plateOf(current));
  useContentsStamp(tocRef, active);

  const linkProps = (project: Project) => {
    if (project.externalUrl) return { href: project.externalUrl };
    return {
      href: `/works/${project.slug}`,
      onClick: (e: MouseEvent) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        onOpenProject(project);
      },
    };
  };

  return (
    <>
      <section className={styles.pageLeft} aria-labelledby="contents-title">
        <p className={`${styles.kicker} ${styles.reveal}`}>Field Notebook</p>
        <h2 id="contents-title" className={`${styles.title} ${styles.reveal}`}>Contents</h2>
        <div ref={tocRef} className={styles.tocWrap}>
          <ol className={`${styles.toc} ${styles.list}`} onPointerLeave={release}>
            {contents.map((project, i) => (
              <li key={project.slug} data-toc-row className={styles.reveal} style={{ transitionDelay: `${120 + i * 45}ms` }}>
                <a
                  {...linkProps(project)}
                  data-toc-link
                  className={`${styles.row} ${active === i ? styles.on : ''}`}
                  onPointerEnter={() => point(i)}
                  onFocus={() => point(i)}
                  onBlur={release}
                >
                  <RowBody project={project} i={i} />
                </a>
              </li>
            ))}
          </ol>
          {/* The band: the same rows, paper on ink, clipped to the row pointed at (useContentsStamp). */}
          <div className={styles.shade} aria-hidden="true">
            <ol className={`${styles.toc} ${styles.stamp}`} data-stamp-copy>
              {contents.map((project, i) => (
                <li key={project.slug} className={styles.reveal} style={{ transitionDelay: `${120 + i * 45}ms` }}>
                  <span className={`${styles.row} ${active === i ? styles.on : ''}`}>
                    <RowBody project={project} i={i} />
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className={`${styles.foot} ${styles.reveal}`} style={{ transitionDelay: '420ms' }}>
          <span>Yankun Wang</span>
          <span>2020–2026</span>
        </div>
      </section>

      <section ref={pageRef} className={styles.pageRight} aria-label="Plates">
        <p className={`${styles.kicker} ${styles.reveal}`}>{current >= 0 ? 'Selected work' : 'Plates'}</p>

        <div className={`${styles.sheetWrap} ${styles.reveal}`} style={{ transitionDelay: '160ms' }}>
          <div className={styles.sheet} data-sheet>
            {projects.map((project) => {
              const row = rowOf(project);
              return (
                <a
                  key={project.slug}
                  {...linkProps(project)}
                  className={styles.thumb}
                  tabIndex={row >= 0 ? -1 : undefined}
                  aria-hidden={row >= 0 ? true : undefined}
                  data-thumb
                  onPointerEnter={row >= 0 ? () => point(row, 'sheet') : undefined}
                  onPointerLeave={row >= 0 ? release : undefined}
                >
                  <span className={styles.thumbFrame} data-thumb-frame>
                    {project.mockup && <img src={project.mockup} alt="" loading="lazy" draggable={false} />}
                  </span>
                  <span className={styles.thumbCaption}>
                    {row >= 0 && <span className={styles.capN}>{nn(row)}</span>}
                    <span className={styles.capT}>{project.title}</span>
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        <figure className={styles.plate} aria-live="polite">
          <span className={styles.plateSlot} data-plate-slot>
            <span className={styles.plateFrame} data-plate-frame>
              {contents.map((project, i) =>
                project.mockup ? (
                  <img key={project.slug} src={project.mockup} alt="" loading="lazy" draggable={false} data-on={i === last} />
                ) : null,
              )}
              {playLoop && playing?.preview && (
                <video
                  key={`loop-${playing.slug}`}
                  ref={videoRef}
                  className={styles.loop}
                  muted
                  loop
                  playsInline
                  disablePictureInPicture
                  preload="auto"
                  aria-hidden="true"
                  tabIndex={-1}
                >
                  <source src={playing.preview.webm} type="video/webm" />
                  <source src={playing.preview.mp4} type="video/mp4" />
                </video>
              )}
            </span>
          </span>
          <figcaption className={styles.plateCaption}>
            {shown && (
              <div key={shown.slug} className={styles.notes}>
                <span className={styles.cap} style={k(0)}>
                  <span className={styles.capLine}>
                    <span className={styles.capN}>{nn(last)}</span>
                    <span className={styles.capT}>{shown.title}</span>
                  </span>
                  <span>{shown.year}</span>
                </span>
                {shown.notes && (
                  <>
                    <p className={styles.summary} style={k(1)}>{shown.notes.summary}</p>
                    <div className={styles.figures} style={k(2)}>
                      <p className={styles.figKicker}>{shown.notes.figuresLabel}</p>
                      <dl>
                        {shown.notes.figures.map((f) => (
                          <div key={f.label} className={styles.figure}>
                            <dt>{f.label}</dt>
                            <dd>{f.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                    <p className={styles.facts} style={k(3)}>{shown.notes.facts.join(' · ')}</p>
                  </>
                )}
              </div>
            )}
          </figcaption>
        </figure>
      </section>
    </>
  );
}
