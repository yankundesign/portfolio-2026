import styles from './Pen.module.css';

export interface PenProps {
  className?: string;
}

/**
 * Pen — fig. 04. Non-interactive prop, lower-right of the plate.
 *
 * Renders the real generated pen asset. Caption suppressed: the pen is
 * decorative and crowds the corner; figure 4 is intentionally absent
 * from the plate's numbered set.
 */
export default function Pen({ className }: PenProps) {
  return (
    <figure className={`${styles.figure} ${className ?? ''}`}>
      <div className={styles.prop} aria-hidden="true">
        <img
          src="/plate/pen.webp"
          alt=""
          className={styles.image}
          draggable={false}
        />
      </div>
    </figure>
  );
}
