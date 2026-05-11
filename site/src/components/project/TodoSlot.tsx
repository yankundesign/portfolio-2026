import styles from './TodoSlot.module.css';

export interface TodoSlotProps {
  /** Which beat this slot is for. e.g. "Beat 1 · Opening moment" */
  beat: string;
  /** Pointer to where the writing prompts live. */
  outlineRef?: string;
  /** Short one-line framing of what this beat is about. */
  hint?: string;
  /** Relative size of the slot — matches the prose length it stands in for. */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Loud placeholder for prose not yet written.
 *
 * Hard rule (CLAUDE.md): no lorem ipsum. When a prose beat is null in
 * chaiContent.ts, the layout renders this marker instead — explicit,
 * visible, and informative. Renders in place so the page structure and
 * pacing are visible even before the writing lands.
 */
export default function TodoSlot({ beat, outlineRef, hint, size = 'md' }: TodoSlotProps) {
  return (
    <aside className={[styles.slot, styles[size]].join(' ')} aria-label={`Writing pending: ${beat}`}>
      <p className={styles.label}>
        <span className={styles.dot} aria-hidden="true" />
        Prose pending
      </p>
      <p className={styles.beat}>{beat}</p>
      {hint && <p className={styles.hint}>{hint}</p>}
      {outlineRef && (
        <p className={styles.ref}>
          <code>{outlineRef}</code>
        </p>
      )}
    </aside>
  );
}
