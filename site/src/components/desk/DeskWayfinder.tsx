import styles from './DeskWayfinder.module.css';

/**
 * DeskWayfinder — always-on marginalia pointing at the notebook.
 *
 * Caption + curved hand-drawn arrow, anchored below-left of the notebook
 * column and aimed up-right at the cover's lower-left corner. The wrapper
 * is `pointer-events: none` so it never intercepts the notebook button.
 * Caption text stays in the accessible tree; the arrow SVG is decorative.
 *
 * Per voice rule, this is the desk's one marginalia entry — don't add
 * others on this page (the polaroid `About me` handwriting counts as the
 * second under the ≤2-marginalia cap).
 */
export default function DeskWayfinder() {
  return (
    <div className={styles.wayfinder}>
      <span className={styles.caption}>open it</span>
      <svg
        className={styles.arrow}
        viewBox="0 0 120 80"
        fill="none"
        aria-hidden="true"
      >
        {/* Curved spine — starts low-left, rises up-right toward the
         * notebook above. Slight wobble in the control points so the
         * path doesn't read as a machined Bezier. */}
        <path
          d="M 4 70 C 22 74, 44 68, 62 54 S 92 24, 104 10"
          stroke="var(--ink)"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Arrowhead at the path terminus, aimed up-right at the
         * notebook cover's bottom-left corner. */}
        <path
          d="M 96 18 L 104 10 L 92 6"
          stroke="var(--ink)"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
