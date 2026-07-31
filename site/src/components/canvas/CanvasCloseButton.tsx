import styles from './CanvasCloseButton.module.css';

export interface CanvasCloseButtonProps {
  onClick: () => void;
}

/**
 * CanvasCloseButton — left-margin close affordance.
 *
 * The only navigation back from the canvas to the desk. Sits in the canvas
 * plate's left margin, vertical mid-page. Mono caps "close" + small arrow.
 *
 * Position is tunable via `:root` CSS variables so it can be adjusted in
 * DevTools without rebuilds — same pattern as DeskWayfinder.
 */
export default function CanvasCloseButton({ onClick }: CanvasCloseButtonProps) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      aria-label="Close notebook, return to desk"
    >
      {/* Arrow leads and points LEFT — closing returns to the desk, so the
       * affordance reads as "back", not "forward". */}
      <svg
        className={styles.arrow}
        viewBox="0 0 24 12"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M 23 6 L 2 6 M 7 1 L 2 6 L 7 11"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className={styles.label}>close</span>
    </button>
  );
}
