import type { MouseEvent } from 'react';
import type { Project } from '../../data/projects';
import { useContentsSelection } from '../../interactions/useContentsSelection';
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
 * plates as a contact sheet until the reader points at a title, then that
 * one plate with its subtitle. Pointing draws the row's rule in ink and swaps
 * the year for "Read →"; nothing shifts, so no row ever looks misaligned.
 * Pointing at a plate on the sheet marks its row the same way and leaves the
 * sheet in place. A project with a preview loop plays it in the single plate.
 */
export default function NotebookContents({ projects, onOpenProject }: NotebookContentsProps) {
  const { active, source, point, release } = useContentsSelection();
  // Only a title swaps the right page; a plate on the sheet just marks its row.
  const current = active >= 0 && source === 'contents' ? projects[active] : null;
  const { playLoop, videoRef } = usePlateLoop();

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

      <section className={styles.pageRight} aria-label="Plates">
        <p className={`${styles.kicker} ${styles.reveal}`}>{current ? 'Selected work' : 'Plates'}</p>

        <div className={`${styles.sheetWrap} ${styles.reveal}`} style={{ transitionDelay: '160ms' }}>
          <div className={styles.sheet} data-hidden={Boolean(current)}>
            {projects.map((project, i) => (
              <a
                key={project.slug}
                {...linkProps(project)}
                className={styles.thumb}
                tabIndex={-1}
                aria-hidden="true"
                onPointerEnter={() => point(i, 'sheet')}
                onPointerLeave={release}
              >
                <span className={styles.thumbFrame}>
                  {project.mockup && <img src={project.mockup} alt="" loading="lazy" draggable={false} />}
                </span>
                <span className={styles.thumbCaption}><b>{nn(i)}</b>{project.title}</span>
              </a>
            ))}
          </div>
        </div>

        <div className={styles.soloWrap} aria-live="polite">
          <figure className={styles.solo} data-shown={Boolean(current)}>
            {current && (
              <>
                <span className={styles.plateFrame}>
                  {current.mockup && <img key={`still-${current.slug}`} src={current.mockup} alt="" draggable={false} />}
                  {playLoop && current.preview && (
                    <video
                      key={`loop-${current.slug}`}
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
                      <source src={current.preview.webm} type="video/webm" />
                      <source src={current.preview.mp4} type="video/mp4" />
                    </video>
                  )}
                </span>
                <figcaption>
                  <span className={styles.cap}>
                    <span>{nn(active)} · {current.title}</span>
                    <span>{current.year}</span>
                  </span>
                  <span className={styles.sub}>{current.subtitle}</span>
                </figcaption>
              </>
            )}
          </figure>
        </div>
      </section>
    </>
  );
}
