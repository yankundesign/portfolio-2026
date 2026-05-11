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
      <span className={styles.label}>close</span>
      <svg
        className={styles.arrow}
        viewBox="0 0 24 12"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M 1 6 L 22 6 M 17 1 L 22 6 L 17 11"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
