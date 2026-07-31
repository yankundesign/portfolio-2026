import type { Project } from '../../data/projects';
import styles from './ProjectPlate.module.css';

export interface ProjectPlateProps {
  project: Project;
  index: number;
  onClick: (slug: string) => void;
}

/**
 * ProjectPlate — canvas v1.0 bare editorial plate.
 *
 * The vellum container is retired (decisions-log 2026-07-31). The plate is
 * now the guideline's editorial-plate pattern verbatim: the mockup in a
 * 1px ink rule, with a museum-label caption set directly on the notebook
 * paper beneath it. All four plates are the same size and the same 16:10
 * sleeve — hierarchy comes from reading order, the fig line's status, and
 * the metric, never from card size.
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
  const number = String(index + 1).padStart(2, '0');
  const [headlineProof] = project.canvasProofs;

  const ariaLabel = `${project.title} — ${project.canvasContext} ${
    headlineProof ? `Outcome: ${headlineProof}.` : ''
  }`;

  return (
    <article
      className={styles.plate}
      data-plate
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
          <span className={styles.fig}>
            fig. {number} · {project.year} · {project.canvasStatus}
          </span>

          <h3 className={styles.title}>{project.title}</h3>

          {headlineProof && (
            <span className={styles.proof}>{headlineProof}</span>
          )}
        </span>
      </button>
    </article>
  );
}
