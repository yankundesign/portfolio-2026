import FigCaption from '../shared/FigCaption';
import styles from './AboutObject.module.css';

export interface AboutObjectProps {
  onClick: () => void;
  className?: string;
}

/**
 * About card — fig. 03. Polaroid specimen, lower-right region.
 *
 * Renders the real generated polaroid asset; the polaroid WebP already
 * carries its own caption strip, so no overlay text is added here.
 */
export default function AboutObject({ onClick, className }: AboutObjectProps) {
  return (
    <figure className={`${styles.figure} ${className ?? ''}`}>
      <button
        type="button"
        className={styles.button}
        onClick={onClick}
        aria-label="About"
      >
        <img
          src="/plate/about.webp"
          alt=""
          className={styles.image}
          draggable={false}
        />
      </button>
      <FigCaption number={3} label="about" align="left" />
    </figure>
  );
}
