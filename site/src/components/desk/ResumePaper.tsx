import FigCaption from '../shared/FigCaption';
import styles from './ResumePaper.module.css';

export interface ResumePaperProps {
  onClick: () => void;
  className?: string;
}

/**
 * Resume card — fig. 02. Upper-right on the desk plate.
 *
 * Renders the real generated CV asset. Clicking opens /cv. The asset
 * carries the typeset content; this component is just the frame + caption.
 *
 * Material treatment (v0.5 density pass): soft drop shadow so the card
 * sits on the desk, plus a small SVG dog-ear at the top-right corner —
 * the corner is "folded down" exposing a triangle of slightly-darker
 * paper-shadow (the back of the card), with a thin diagonal crease line.
 * Decorative; aria-hidden.
 */
export default function ResumePaper({ onClick, className }: ResumePaperProps) {
  return (
    <figure className={`${styles.figure} ${className ?? ''}`}>
      <button
        type="button"
        className={styles.button}
        onClick={onClick}
        aria-label="View CV"
      >
        <img
          src="/plate/cv.webp"
          alt=""
          className={styles.image}
          draggable={false}
        />
        {/* Dog-ear at top-right corner. Triangle of paper-shadow color
         * represents the back of the folded paper; diagonal line is the
         * crease. Sized in pixels so it stays consistent across viewports. */}
        <svg
          className={styles.dogEar}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            d="M 0 0 L 24 0 L 24 24 Z"
            fill="var(--paper-shadow)"
            opacity="0.78"
          />
          <line
            x1="0"
            y1="0"
            x2="24"
            y2="24"
            stroke="var(--ink-muted)"
            strokeWidth="0.6"
          />
        </svg>
      </button>
      <FigCaption number={2} label="resume" align="left" />
    </figure>
  );
}
