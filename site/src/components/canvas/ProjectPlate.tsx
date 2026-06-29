import type { Project } from '../../data/projects';
import styles from './ProjectPlate.module.css';

export interface ProjectPlateProps {
  project: Project;
  index: number;
  onClick: (slug: string) => void;
}

/**
 * ProjectPlate — canvas v0.9 editorial plate.
 *
 * A loose plate laid over the notebook backdrop. The CARD ITSELF is the
 * sheet of sulfuric-acid paper: a translucent vellum whose `backdrop-filter`
 * blurs the notebook softly THROUGH the card's paper areas. The mockup sits
 * on that sheet crisp and uncovered — the work is never obscured (guideline:
 * screenshots are honest, full-color editorial plates).
 *
 * Strictly two-color: the vellum is paper-toned, never tinted. This is the
 * material of sulfuric-acid paper, not the colored print of the reference
 * samples (decisions-log 2026-06-14).
 *
 * Size variants map to the existing tier ladder via `project.size`
 * (featured | main | standard); column placement lives in CSS by source
 * order (CHAI, Agentic, Build with AI, SAP).
 */
export default function ProjectPlate({
  project,
  index,
  onClick,
}: ProjectPlateProps) {
  const number = String(index + 1).padStart(2, '0');
  const [headlineProof] = project.canvasProofs;

  const ariaLabel = `${project.title} — ${project.canvasContext} ${
    headlineProof ? `Outcome: ${headlineProof}.` : ''
  }`;

  return (
    <article
      className={styles.plate}
      data-size={project.size}
      style={{ ['--plate-index' as string]: index }}
    >
      <button
        type="button"
        className={styles.button}
        onClick={() => onClick(project.slug)}
        aria-label={ariaLabel}
      >
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
          <span className={styles.topline}>
            <span className={styles.status}>{project.canvasStatus}</span>
            <span className={styles.fig}>
              fig. {number} · {project.year}
            </span>
          </span>

          <h3 className={styles.title}>{project.title}</h3>

          <span className={styles.context}>{project.canvasContext}</span>

          {headlineProof && (
            <span className={styles.proof}>
              <strong className={styles.proofMetric}>{headlineProof}</strong>
            </span>
          )}

        </span>
      </button>
    </article>
  );
}
