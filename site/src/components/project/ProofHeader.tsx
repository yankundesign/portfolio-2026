import RevealOnScroll from './RevealOnScroll';
import styles from './ProofHeader.module.css';

export interface ProofHeaderProps {
  /** e.g. "Proof I" */
  numeral: string;
  title: string;
  summary?: string;
}

/**
 * Section header for the three proofs (Smart Search, Report Analysis,
 * Devices Troubleshooting).
 *
 * Design: numeral as mono caption, title as display-M, short summary as
 * body-lg italic. A short ink rule beneath marks the section boundary.
 */
export default function ProofHeader({ numeral, title, summary }: ProofHeaderProps) {
  return (
    <RevealOnScroll as="header" className={styles.header}>
      <p className={styles.numeral}>
        <span className={styles.numeralText}>{numeral}</span>
        <span className={styles.numeralRule} aria-hidden="true" />
      </p>
      <h2 className={styles.title}>{title}</h2>
      {summary && (
        <p className={styles.summary}>
          <em>{summary}</em>
        </p>
      )}
    </RevealOnScroll>
  );
}
