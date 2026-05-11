import { useCallback, useEffect, useRef, useState } from 'react';
import type { Project } from '../../data/projects';
import { useReducedMotion } from '../../interactions/useReducedMotion';
import styles from './ProjectRow.module.css';

export interface ProjectRowProps {
  project: Project;
  index: number;
  onClick: (slug: string) => void;
}

/**
 * ProjectRow — one project as a row inside a notebook page.
 *
 * Layout: front card with mockup left + text right (number / title / role).
 * Behind the front card sits an accession slip holding the fig/year,
 * subtitle, and impact. At rest the slip peeks out as a thin sliver
 * below/right of the front card. On hover the card stays still while
 * the screenshot blooms, crop marks appear, and the slip slides out.
 *
 * Subtitle is removed from the front card per the v0.8.2 hover-reveal pass:
 * the front carries identity (number, title, role); the back carries
 * description and impact.
 */
/**
 * Per-card "hand-placed" variation for the entrance animation. Each card
 * lands with a clearly different starting offset and rotation so the
 * sequence reads as four DELIBERATE placements, not a templated wave.
 *
 * v1.6: variation pumped up from the v1.5 values (-1.4°/+1°/-1°/+1.6°
 * → -2.4°/+2°/-1.8°/+2.6°; -10..-16px → -22..-28px) because the user
 * couldn't see the entrance arc — the original numbers were too subtle
 * against the textured paper background to register. Still small enough
 * that the cards align cleanly at rest; the asymmetry only registers
 * during the entrance.
 *
 * Indices match canvas reading order (Z-pattern):
 *   0: top-left   (CHAI)         — placed first, slight CCW tilt
 *   1: top-right  (Agentic)      — placed second, slight CW tilt
 *   2: bottom-left (Build with AI) — placed third, slight CCW tilt
 *   3: bottom-right (SAP)        — placed last, slight CW tilt
 *
 * The alternating CCW/CW pattern mimics natural hand-placement — a
 * right-handed person placing cards in sequence would alternate the
 * angle as they reach across.
 */
const ENTRANCE_VARIATION = [
  { rotation: '-2.4deg', offsetY: '-26px' },
  { rotation: '2deg', offsetY: '-22px' },
  { rotation: '-1.8deg', offsetY: '-28px' },
  { rotation: '2.6deg', offsetY: '-24px' },
] as const;

/**
 * Per-card stagger between placements (ms). Larger = each card reads
 * as its own deliberate beat; smaller = a faster cascade. 240ms feels
 * like a hand placing each card down, glancing, then placing the next.
 */
const STAGGER_MS = 240;

/**
 * Lead-in delay (ms) before the FIRST card is placed. Lets the page
 * header appear and settle (~480ms duration) before the first card
 * lands on top of it. Without this lead-in, the row 0 entrance would
 * start simultaneously with the header and the choreography would feel
 * like everything is happening at once.
 */
const FIRST_CARD_LEAD_IN_MS = 320;
const COMMIT_DELAY_MS = 140;

export default function ProjectRow({ project, index, onClick }: ProjectRowProps) {
  const reducedMotion = useReducedMotion();
  const [isCommitting, setIsCommitting] = useState(false);
  const commitTimeoutRef = useRef<number | null>(null);
  const number = String(index + 1).padStart(2, '0');
  // Stagger delay = lead-in + (index × stagger). Composed with
  // --canvas-enter-delay (set on the .canvas root by CanvasRoute) in the
  // CSS keyframe `animation-delay` declaration.
  const enterDelay = `${FIRST_CARD_LEAD_IN_MS + index * STAGGER_MS}ms`;
  const variation = ENTRANCE_VARIATION[index % ENTRANCE_VARIATION.length];
  const rowWrapperClass = [
    styles.rowWrapper,
    isCommitting ? styles.committing : '',
  ].join(' ');

  useEffect(() => {
    return () => {
      if (commitTimeoutRef.current !== null) {
        window.clearTimeout(commitTimeoutRef.current);
      }
    };
  }, []);

  const handleClick = useCallback(() => {
    if (isCommitting) return;

    if (reducedMotion) {
      onClick(project.slug);
      return;
    }

    setIsCommitting(true);
    commitTimeoutRef.current = window.setTimeout(() => {
      onClick(project.slug);
    }, COMMIT_DELAY_MS);
  }, [isCommitting, onClick, project.slug, reducedMotion]);

  return (
    <div
      className={rowWrapperClass}
      data-row
      style={{
        ['--row-delay' as string]: enterDelay,
        ['--row-rotation' as string]: variation.rotation,
        ['--row-offset-y' as string]: variation.offsetY,
      }}
    >
      {/* Back label — paper-shadow card sitting behind the front card.
       * A sliver shows at rest; the hover drawer motion exposes more. The text
       * inside fades in on hover (hidden at rest so the sliver reads as
       * a paper edge, not a teaser of text). */}
      <div className={styles.backLabel} aria-hidden="true">
        <p className={styles.accessionMeta}>
          <span>fig. {number}</span>
          <span>{project.year}</span>
        </p>
        <p className={styles.subtitle}>{project.subtitle}</p>
        <p className={styles.impact}>
          <span className={styles.impactLabel}>IMPACT — </span>
          {project.impact}
        </p>
      </div>

      <button
        type="button"
        className={styles.row}
        onClick={handleClick}
        aria-label={`${project.title} — ${project.subtitle}. Impact: ${project.impact}.`}
      >
        <div className={styles.mockup}>
          {project.mockup ? (
            <img
              src={project.mockup}
              alt=""
              className={styles.mockupImage}
              draggable={false}
            />
          ) : (
            <div className={styles.mockupPlaceholder} aria-hidden="true" />
          )}
        </div>

        <div className={styles.text}>
          <span className={styles.number}>{number}</span>
          <h3 className={styles.title}>{project.title}</h3>
          <span className={styles.category}>
            {project.role}
            <span className={styles.arrow} aria-hidden="true">
              {' '}→
            </span>
          </span>
        </div>
      </button>
    </div>
  );
}
