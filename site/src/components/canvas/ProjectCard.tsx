import { useCallback } from 'react';
import type { CSSProperties, KeyboardEvent } from 'react';
import type { Project, ProjectAspect } from '../../data/projects';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
  onClick: (slug: string) => void;
  entranceDelay?: number;
  visible?: boolean;
}

/**
 * Map semantic aspect names to CSS aspect-ratio values.
 * Kept in TS instead of CSS so adding a new aspect is a one-line change.
 */
function aspectStyle(aspect: ProjectAspect): string {
  switch (aspect) {
    case '16-10':
      return '16 / 10';
    case '4-5':
      return '4 / 5';
    case '10-16':
      return '10 / 16';
    case '1-1':
      return '1 / 1';
    case '16-9':
      return '16 / 9';
  }
}

/**
 * ProjectCard v0.7 — grid-placed editorial plate.
 *
 * The card is no longer a UI container with metadata inside. It is two parts:
 *   1. The plate (a paper / inverted-ink rectangle holding the screenshot)
 *   2. The museum-label caption beneath, on the canvas surface
 *
 * Caption sits *outside* the card box — that's the editorial register move.
 * Hover lifts the plate and reveals the caption's second line.
 */
export function ProjectCard({
  project,
  onClick,
  entranceDelay = 0,
  visible = true,
}: ProjectCardProps) {
  const handleClick = useCallback(() => {
    onClick(project.slug);
  }, [onClick, project.slug]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick(project.slug);
      }
    },
    [onClick, project.slug],
  );

  const figLabel = `fig. ${String(project.figNumber).padStart(2, '0')}`;

  const tierClass =
    project.size === 'featured'
      ? styles.featured
      : project.size === 'main'
        ? styles.main
        : styles.standard;

  const wrapperClass = [
    styles.wrapper,
    visible ? styles.entered : styles.entering,
  ].join(' ');

  const wrapperStyle: CSSProperties = {
    gridColumnStart: project.colStart,
    gridColumnEnd: `span ${project.colSpan}`,
    gridRowStart: `row-${project.gridRow}`,
    alignSelf: project.alignVertical ?? 'start',
    transitionDelay: visible ? `${entranceDelay}ms` : '0ms',
  };

  const plateStyle: CSSProperties = {
    aspectRatio: aspectStyle(project.aspect),
  };

  return (
    <div
      className={wrapperClass}
      style={wrapperStyle}
      role="link"
      aria-label={`${project.title} — ${project.impact}`}
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className={`${styles.plate} ${tierClass}`} style={plateStyle}>
        <div className={styles.platePlaceholder}>
          <span className={styles.plateText}>screenshot</span>
        </div>
      </div>

      {/* Museum-label caption — sits on the canvas paper, not inside the card.
       *  Two-line label: title + metadata. Impact line revealed on hover. */}
      <div className={styles.label}>
        <span className={styles.fig}>{figLabel}</span>
        <h2 className={styles.title}>{project.title}</h2>
        <p className={styles.meta}>
          <span>{project.role}</span>
          <span aria-hidden="true" className={styles.metaSep}>·</span>
          <span>{project.year}</span>
        </p>
        <p className={styles.impact}>{project.impact}</p>
      </div>
    </div>
  );
}
