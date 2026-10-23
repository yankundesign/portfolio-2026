import type { Project } from '../../data/projects';
import { usePaperBend } from '../../interactions/usePaperBend';
import { usePlatePreview } from '../../interactions/usePlatePreview';
import styles from './ProjectPlate.module.css';

export interface ProjectPlateProps {
  project: Project;
  index: number;
  onClick: (slug: string) => void;
}

/**
 * ProjectPlate — a tipped-in silk print on the notebook page.
 *
 * The original paper face remains the semantic action and establishes the
 * viewport-fitted plate size. On fine-pointer hover or keyboard focus, the
 * face bends from its fixed top edge; touch keeps immediate navigation.
 * The full-color mockup stays in its 1px editorial frame.
 *
 * Caption at rest is three lines: year and status · title ·
 * headline metric. `canvasContext` moved into the aria-label and the case
 * study — the spread stays scannable in a single viewport.
 *
 * Plates with a `preview` loop crossfade from the still mockup into motion
 * while hovered or keyboard-focused (usePlatePreview). Touch and reduced
 * motion keep the still.
 */
export default function ProjectPlate({
  project,
  index,
  onClick,
}: ProjectPlateProps) {
  const plateRef = usePaperBend();
  usePlatePreview(plateRef, Boolean(project.preview));
  const [headlineProof] = project.canvasProofs;
  const Action = project.externalUrl ? 'a' : 'button';

  const ariaLabel = `${project.title} — ${project.canvasContext} ${
    headlineProof ? `Outcome: ${headlineProof}.` : ''
  }`;

  return (
    <article
      ref={plateRef}
      className={styles.plate}
      data-plate
      data-book-content
      style={{ ['--plate-index' as string]: index }}
    >
      <span className={styles.ambientShadow} aria-hidden="true" />
      <span className={styles.hinge} aria-hidden="true" />
      <Action
        type={project.externalUrl ? undefined : 'button'}
        href={project.externalUrl}
        className={styles.button}
        data-paper-button
        onClick={project.externalUrl ? undefined : () => onClick(project.slug)}
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
            {project.preview && (
              <video
                className={styles.preview}
                data-plate-preview
                muted
                loop
                playsInline
                disablePictureInPicture
                preload="none"
                aria-hidden="true"
                tabIndex={-1}
              >
                <source src={project.preview.webm} type="video/webm" />
                <source src={project.preview.mp4} type="video/mp4" />
              </video>
            )}
          </span>

          <span className={styles.meta}>
            <span className={styles.fig}>
              {project.year} · {project.canvasStatus}
            </span>

            <h3 className={styles.title}>{project.title}</h3>

            {headlineProof && (
              <span className={styles.proof}>{headlineProof}</span>
            )}
          </span>
        </span>
        <span className={styles.mesh} data-paper-mesh aria-hidden="true" inert />
      </Action>
    </article>
  );
}
