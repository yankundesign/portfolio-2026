import type { Project } from '../../data/projects';
import { usePaperBend } from '../../interactions/usePaperBend';
import styles from './ProjectPlate.module.css';

export interface ProjectPlateProps {
  project: Project;
  index: number;
  onClick: (slug: string) => void;
}

/**
 * ProjectPlate — a tipped-in silk print on the notebook page.
 *
 * The original paper face remains the semantic button and establishes the
 * viewport-fitted plate size. On fine-pointer hover or keyboard focus, the
 * face bends from its fixed top edge; touch keeps immediate navigation.
 * The full-color mockup stays in its 1px editorial frame.
 *
 * Caption at rest is three lines: fig line (status folded in) · title ·
 * headline metric. `canvasContext` moved into the aria-label and the case
 * study — the spread stays scannable in a single viewport.
 */
export default function ProjectPlate({
  project,
  index,
  onClick,
}: ProjectPlateProps) {
  const plateRef = usePaperBend();
  const number = String(project.figNumber).padStart(2, '0');
  const [headlineProof] = project.canvasProofs;

  const ariaLabel = `${project.title} — ${project.canvasContext} ${
    headlineProof ? `Outcome: ${headlineProof}.` : ''
  }`;

  return (
    <article
      ref={plateRef}
      className={styles.plate}
      data-plate
      style={{ ['--plate-index' as string]: index }}
    >
      <span className={styles.ambientShadow} aria-hidden="true" />
      <span className={styles.hinge} aria-hidden="true" />
      <button
        type="button"
        className={styles.button}
        data-paper-button
        onClick={() => onClick(project.slug)}
        aria-label={ariaLabel}
      >
        <span className={`${styles.paperFace} ${styles.paperSource}`} data-paper-source>
          <span className={styles.sleeve}>
            {project.mockup ? (
              <img
                src={project.mockup}
                alt=""
                className={styles.mockup}
                draggable={false}
                loading="lazy"
              />
            ) : (
              <span className={styles.mockupPlaceholder} aria-hidden="true" />
            )}
          </span>

          <span className={styles.meta}>
            <span className={styles.fig}>
              fig. {number} · {project.year} · {project.canvasStatus}
            </span>

            <h3 className={styles.title}>{project.title}</h3>

            {headlineProof && (
              <span className={styles.proof}>{headlineProof}</span>
            )}
          </span>
        </span>
        <span className={styles.mesh} data-paper-mesh aria-hidden="true" inert />
      </button>
    </article>
  );
}
