import { useState } from 'react';
import { Link } from 'react-router';
import RevealOnScroll from './RevealOnScroll';
import styles from './EditorialPlate.module.css';
import type { Figure } from '../../data/chaiContent';

export interface EditorialPlateProps {
  figure: Figure;
  /** Optional class for the outer figure — for placement overrides. */
  className?: string;
}

/**
 * Editorial plate.
 *
 * The signature image treatment: 1px ink-blue rule around the image,
 * paper-soft fill behind, mono caption beneath. Never duotoned, never
 * full-bleed (hard rule, CLAUDE.md).
 *
 * If the image fails to load or is missing, a framed placeholder shows
 * the caption and the expected file path — the page structure holds.
 */
export default function EditorialPlate({ figure, className }: EditorialPlateProps) {
  const [loadState, setLoadState] = useState<'loading' | 'loaded' | 'error'>('loading');
  const widthClass = styles[`width-${figure.width ?? 'column'}`];
  const frame = (
    <div
      className={[
        styles.frame,
        loadState === 'error' ? styles.framePlaceholder : '',
        loadState === 'loaded' ? styles.frameLoaded : '',
      ]
        .join(' ')
        .trim()}
    >
      {loadState !== 'error' && (
        <img
          src={figure.src}
          alt={figure.alt}
          className={styles.image}
          loading="lazy"
          onLoad={() => setLoadState('loaded')}
          onError={() => setLoadState('error')}
        />
      )}
      {loadState === 'error' && (
        <div className={styles.placeholder} role="img" aria-label={figure.alt}>
          <span className={styles.placeholderLabel}>Image pending</span>
          <code className={styles.placeholderPath}>{figure.src}</code>
        </div>
      )}
    </div>
  );

  return (
    <RevealOnScroll as="figure" className={[styles.plate, widthClass, className ?? ''].join(' ').trim()}>
      {figure.linkTo ? (
        <Link to={figure.linkTo} className={styles.frameLink} aria-label={`Open ${figure.caption}`}>
          {frame}
        </Link>
      ) : (
        frame
      )}
      <figcaption className={styles.caption}>
        {figure.linkTo ? (
          <Link to={figure.linkTo} className={styles.captionLink}>
            {figure.caption}
          </Link>
        ) : (
          figure.caption
        )}
      </figcaption>
    </RevealOnScroll>
  );
}
