import FigCaption from '../shared/FigCaption';
import styles from './Pen.module.css';

export interface PenProps {
  className?: string;
}

/**
 * Pen — fig. 04. Non-interactive prop, lower-right of the plate.
 *
 * Renders the real generated pen asset. No onClick, but still gets a
 * figcaption to match the plate convention (every object is numbered).
 */
export default function Pen({ className }: PenProps) {
  return (
    <figure className={`${styles.figure} ${className ?? ''}`}>
      <div className={styles.prop} aria-hidden="true">
        <img
          src="/plate/pen.png"
          alt=""
          className={styles.image}
          draggable={false}
        />
      </div>
      <FigCaption number={4} label="pen" align="right" />
    </figure>
  );
}
