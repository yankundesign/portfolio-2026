import RevealOnScroll from './RevealOnScroll';
import styles from './PullQuote.module.css';

export interface PullQuoteProps {
  phrase: string;
  attribution?: string;
}

/**
 * The thesis moment. Display-M italic Fraunces, offset left of the
 * reading column, with a hairline ink rule above.
 *
 * Not a decorative element — this is where the case study's argument
 * crystallizes. The pull quote should read before any other text around
 * it, and its typography should demand a second look.
 */
export default function PullQuote({ phrase, attribution }: PullQuoteProps) {
  return (
    <RevealOnScroll as="blockquote" className={styles.quote} translate={28}>
      <div className={styles.rule} aria-hidden="true" />
      <p className={styles.phrase}>
        <span className={styles.openMark} aria-hidden="true">&ldquo;</span>
        {phrase}
        <span className={styles.closeMark} aria-hidden="true">&rdquo;</span>
      </p>
      {attribution && (
        <footer className={styles.attribution}>
          <span className={styles.dash} aria-hidden="true">—&nbsp;</span>
          <cite>{attribution}</cite>
        </footer>
      )}
    </RevealOnScroll>
  );
}
