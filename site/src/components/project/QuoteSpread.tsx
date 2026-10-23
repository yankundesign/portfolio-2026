import RevealOnScroll from './RevealOnScroll';
import styles from './QuoteSpread.module.css';

export interface QuoteSpreadProps {
  /** Who said it, as a mono label. */
  label: string;
  phrase: string;
  /** One italic line under the quote. */
  subline: string;
  figure: { src: string; caption: string; alt: string };
}

/**
 * A turning-point quote set the way the deck sets it: on ink, with the
 * screen it's about beside it. The screen keeps its full frame; the mono
 * caption under it says whose it is.
 */
export default function QuoteSpread({ label, phrase, subline, figure }: QuoteSpreadProps) {
  return (
    <RevealOnScroll as="figure" className={styles.spread}>
      <div className={styles.text}>
        <p className={styles.label}>{label}</p>
        <blockquote className={styles.quote}>
          <p className={styles.phrase}>
            <span className={styles.openMark} aria-hidden="true">&ldquo;</span>
            {phrase}
            <span aria-hidden="true">&rdquo;</span>
          </p>
        </blockquote>
        <p className={styles.subline}>{subline}</p>
      </div>
      <div className={styles.shot}>
        <img src={figure.src} alt={figure.alt} className={styles.image} loading="lazy" />
        <figcaption className={styles.caption}>{figure.caption}</figcaption>
      </div>
    </RevealOnScroll>
  );
}
