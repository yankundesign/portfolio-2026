import styles from './FigCaption.module.css';

/**
 * FigCaption — the `fig. 0N — name` caption that sits beneath each
 * object on the editorial plate.
 *
 * In the Swiss register, the caption is the object's affordance: hovering
 * the parent object draws a 1px ink rule beneath the caption, 160ms ease-out.
 * The object itself doesn't move. Wire this underline by giving the parent
 * a `:hover` rule that targets a descendant with `data-figcaption-underline`.
 *
 * Usage:
 *   <figure>
 *     <NotebookCover ... />
 *     <FigCaption number="01" label="field notebook" />
 *   </figure>
 */

export interface FigCaptionProps {
  /** Fig. number, zero-padded string or number. `1` renders as `01`. */
  number: number | string;
  /** Caption text — lowercase-preferred per plate convention. */
  label: string;
  /** Alignment within the caption block. Default `left`. */
  align?: 'left' | 'center' | 'right';
  /** Optional inline className for positioning wrapper. */
  className?: string;
}

export default function FigCaption({
  number,
  label,
  align = 'left',
  className,
}: FigCaptionProps) {
  const numberStr =
    typeof number === 'number' ? String(number).padStart(2, '0') : number;

  const alignClass =
    align === 'center'
      ? styles.alignCenter
      : align === 'right'
        ? styles.alignRight
        : styles.alignLeft;

  return (
    <figcaption
      className={`${styles.caption} ${alignClass} ${className ?? ''}`}
      data-figcaption
    >
      <span className={styles.rule} aria-hidden="true" />
      <span className={styles.text}>
        fig. {numberStr} — {label}
      </span>
      <span
        className={styles.underline}
        data-figcaption-underline
        aria-hidden="true"
      />
    </figcaption>
  );
}
