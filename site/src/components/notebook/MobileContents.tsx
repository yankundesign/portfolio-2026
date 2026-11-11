import type { MouseEvent } from 'react';
import type { Project } from '../../data/projects';
import styles from './MobileContents.module.css';

export interface MobileContentsProps {
  projects: Project[];
  onOpenProject: (project: Project) => void;
  onClose: () => void;
}

const nn = (i: number) => String(i + 1).padStart(2, '0');

/**
 * MobileContents — the works page on narrow screens. A 3D spread at phone
 * width would shrink the contents past reading, so the notebook's page is set
 * as a single column: the same contents, each entry with its plate and line.
 * It arrives with a short paper cross-fade.
 */
export default function MobileContents({ projects, onOpenProject, onClose }: MobileContentsProps) {
  const open = (project: Project) => (e: MouseEvent) => {
    if (project.externalUrl || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    onOpenProject(project);
  };

  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <p className={styles.kicker}>Field Notebook</p>
        <button type="button" className={styles.close} onClick={onClose}>Close ×</button>
      </header>
      <h2 className={styles.title}>Contents</h2>
      <ol className={styles.list}>
        {projects.map((project, i) => (
          <li key={project.slug}>
            <a
              className={styles.entry}
              href={project.externalUrl ?? `/works/${project.slug}`}
              onClick={open(project)}
            >
              <span className={styles.frame}>
                {project.mockup && <img src={project.mockup} alt="" loading="lazy" draggable={false} />}
              </span>
              <span className={styles.meta}>{nn(i)} · {project.year}</span>
              <span className={styles.name}>{project.title}</span>
              <span className={styles.sub}>{project.subtitle}</span>
            </a>
          </li>
        ))}
      </ol>
      <footer className={styles.foot}>
        <span>Yankun Wang</span>
        <span>2020–2026</span>
      </footer>
    </div>
  );
}
