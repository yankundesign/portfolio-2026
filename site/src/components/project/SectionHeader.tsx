import RevealOnScroll from './RevealOnScroll';
import styles from './SectionHeader.module.css';

export interface SectionHeaderProps {
  /** Mono caps label that sits next to the vertical rule. e.g. "CONTEXT", "SMART SEARCH". */
  label: string;
  /** Optional display title in Fraunces. Omit for compact, label-only sections. */
  title?: string;
  /** Optional italic summary line beneath the title. */
  summary?: string;
  /** Visual rhythm — a "compact" header has no display title and gets tighter top margin. */
  variant?: 'full' | 'compact';
}

/**
 * Section header used across all CHAI case-study sections.
 *
 * Visual pattern: a 1px ink vertical rule on the left, a mono caps label to
 * the right, and optionally a display title + italic summary stacked below.
 * Replaces ProofHeader (which used a horizontal rule) and the previous
 * srOnly-only beat openings.
 *
 * Compact variant — used for sections that don't need a display title
 * (Opening, Context, The shift, Outcome, Reflection, Credits). The rule
 * + label still mark the section so the page reads consistently.
 *
 * Full variant — used for the three proofs (Smart Search, Report Analysis,
 * Devices) where the section needs a real title and summary.
 */
export default function SectionHeader({
  label,
  title,
  summary,
  variant = title ? 'full' : 'compact',
}: SectionHeaderProps) {
  const isCompact = variant === 'compact';
  return (
    <RevealOnScroll
      as="header"
      className={[styles.header, isCompact ? styles.compact : ''].join(' ').trim()}
    >
      <span className={styles.rule} aria-hidden="true" />
      <div className={styles.body}>
        <p className={styles.label}>{label}</p>
        {title && <h2 className={styles.title}>{title}</h2>}
        {summary && (
          <p className={styles.summary}>
            <em>{summary}</em>
          </p>
        )}
      </div>
    </RevealOnScroll>
  );
}
