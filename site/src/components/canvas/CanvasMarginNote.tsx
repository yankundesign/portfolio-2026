import styles from './CanvasMarginNote.module.css';

export interface CanvasMarginNoteProps {
  /** Pull-quote text. ≤12 words per voice rule. Italic Fraunces rendering. */
  text: string;
  /** Mono caps label above the quote. Default: `THOUGHTS`. */
  label?: string;
}

/**
 * CanvasMarginNote — right-margin THOUGHTS sticky on the canvas.
 *
 * A small paper note with washi tape at the top, mono caps label, italic
 * pull-quote, and a faint stamp/cancel mark in a corner. Lives in the canvas
 * plate's right margin, vertical mid-page. Counts as the canvas's marginalia
 * entry under the ≤2-marginalia rule.
 *
 * Position is tunable via `:root` CSS variables.
 */
export default function CanvasMarginNote({
  text,
  label = 'THOUGHTS',
}: CanvasMarginNoteProps) {
  return (
    <aside className={styles.note} aria-label="Notebook margin note">
      {/* Washi tape strip across the top — material attachment. */}
      <span className={styles.washi} aria-hidden="true" />

      <div className={styles.body}>
        <span className={styles.label}>{label}</span>
        <p className={styles.text}>{text}</p>
      </div>

      {/* Postal cancel mark in the lower-right corner. Real-feeling ink:
       * irregular density, slightly off-axis. */}
      <svg
        className={styles.stamp}
        viewBox="0 0 48 48"
        aria-hidden="true"
      >
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke="var(--ink)"
          strokeWidth="0.6"
          fill="none"
          opacity="0.55"
        />
        <circle
          cx="24"
          cy="24"
          r="15"
          stroke="var(--ink)"
          strokeWidth="0.4"
          fill="none"
          opacity="0.4"
        />
        {/* Tick marks suggesting partially-legible cancel text. */}
        <line x1="24" y1="6" x2="24" y2="9" stroke="var(--ink)" strokeWidth="0.5" opacity="0.5" />
        <line x1="24" y1="39" x2="24" y2="42" stroke="var(--ink)" strokeWidth="0.5" opacity="0.5" />
        <line x1="6" y1="24" x2="9" y2="24" stroke="var(--ink)" strokeWidth="0.5" opacity="0.5" />
        <line x1="39" y1="24" x2="42" y2="24" stroke="var(--ink)" strokeWidth="0.5" opacity="0.5" />
      </svg>
    </aside>
  );
}
