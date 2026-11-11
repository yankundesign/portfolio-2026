import { useRef, type MouseEvent } from 'react';
import type { Project } from '../../data/projects';
import { useContentsSelection } from '../../interactions/useContentsSelection';
import { usePlateFlight } from '../../interactions/usePlateFlight';
import { usePlateLoop } from '../../interactions/usePlateLoop';
import styles from './NotebookContents.module.css';

export interface NotebookContentsProps {
  projects: Project[];
  /** Open a case study (internal projects); external ones are plain links. */
  onOpenProject: (project: Project) => void;
}

const nn = (i: number) => String(i + 1).padStart(2, '0');

/**
 * NotebookContents — what the open notebook shows: the works page.
 *
 * Left page: the contents, one ruled row per project. Right page: all six
 * plates as a contact sheet. Pointing at a title raises that project's plate
 * out of its own thumbnail (usePlateFlight); leaving flies it home. Pointing
 * draws the row's rule in ink and swaps the year for "Read →"; nothing shifts,
 * so no row ever looks misaligned. Pointing at a plate on the sheet marks its
 * row and leaves the sheet in place. A project with a preview loop plays it in
 * the raised plate.
 *
 * The contents title and the plates start on one line: the title is trimmed to
 * its caps, so the top of the C sits on the plates' top edge.
 */
export default function NotebookContents({ projects, onOpenProject }: NotebookContentsProps) {
  const { active, source, last, point, release } = useContentsSelection();
  // Only a title raises a plate; a plate on the sheet just marks its row.
  const current = active >= 0 && source === 'contents' ? active : -1;
  const shown = last >= 0 ? projects[last] : null;
  const playing = current >= 0 ? projects[current] : null;
  const { playLoop, videoRef } = usePlateLoop();
  const pageRef = useRef<HTMLElement>(null);
  usePlateFlight(pageRef, current);

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
        <ol className={styles.toc} onPointerLeave={release}>
          {projects.map((project, i) => (
            <li key={project.slug} className={styles.reveal} style={{ transitionDelay: `${120 + i * 45}ms` }}>
              <a
                {...linkProps(project)}
                data-toc-link
                className={`${styles.row} ${active === i ? styles.on : ''}`}
                onPointerEnter={() => point(i)}
                onFocus={() => point(i)}
                onBlur={release}
              >
                <span className={styles.n}>{nn(i)}</span>
                <span className={styles.t}>{project.title}</span>
                <span className={styles.y}>{project.year}</span>
                <span className={styles.go} aria-hidden="true">Read →</span>
              </a>
            </li>
          ))}
        </ol>
        <div className={`${styles.foot} ${styles.reveal}`} style={{ transitionDelay: '420ms' }}>
          <span>Yankun Wang</span>
          <span>2020–2026</span>
        </div>
      </section>

      <section ref={pageRef} className={styles.pageRight} aria-label="Plates">
        <p className={`${styles.kicker} ${styles.reveal}`}>{current >= 0 ? 'Selected work' : 'Plates'}</p>

        <div className={`${styles.sheetWrap} ${styles.reveal}`} style={{ transitionDelay: '160ms' }}>
          <div className={styles.sheet} data-sheet>
            {projects.map((project, i) => (
              <a
                key={project.slug}
                {...linkProps(project)}
                className={styles.thumb}
                tabIndex={-1}
                aria-hidden="true"
                data-thumb
                onPointerEnter={() => point(i, 'sheet')}
                onPointerLeave={release}
              >
                <span className={styles.thumbFrame} data-thumb-frame>
                  {project.mockup && <img src={project.mockup} alt="" loading="lazy" draggable={false} />}
                </span>
                <span className={styles.thumbCaption}>
                  <span className={styles.capN}>{nn(i)}</span>
                  <span className={styles.capT}>{project.title}</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <figure className={styles.plate} aria-live="polite">
          <span className={styles.plateSlot} data-plate-slot>
            <span className={styles.plateFrame} data-plate-frame>
              {projects.map((project, i) =>
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
              <>
                <span className={styles.cap}>
                  <span className={styles.capLine}>
                    <span className={styles.capN}>{nn(last)}</span>
                    <span className={styles.capT}>{shown.title}</span>
                  </span>
                  <span>{shown.year}</span>
                </span>
                <span className={styles.sub}>{shown.subtitle}</span>
              </>
            )}
          </figcaption>
        </figure>
      </section>
    </>
  );
}
