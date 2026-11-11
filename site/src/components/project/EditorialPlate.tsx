import { useState } from 'react';
import type { CSSProperties } from 'react';
import { Link } from 'react-router';
import RevealOnScroll from './RevealOnScroll';
import PlateHead from './PlateHead';
import { stageClass, stageScreensClass } from './plateStage';
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
 * Two families:
 *   · Composed — an annotated slide or diagram, printed flush to the rule.
 *   · Staged — raw product screens (`figure.stage`) laid on a mat the plate
 *     draws: one 16:10 shape, one paper-soft field, screens resting on the
 *     floor. The screens carry no baked background, so every product shot
 *     on a page shares the same stage.
 *
 * If the image fails to load or is missing, a framed placeholder shows
 * the caption and the expected file path — the page structure holds.
 */
export default function EditorialPlate({ figure, className }: EditorialPlateProps) {
  const srcs = figure.srcs && figure.srcs.length > 0 ? figure.srcs : [figure.src];
  const [loadedCount, setLoadedCount] = useState(0);
  const [hasError, setHasError] = useState(false);
  const loadState: 'loading' | 'loaded' | 'error' = hasError
    ? 'error'
    : loadedCount >= srcs.length
      ? 'loaded'
      : 'loading';
  const widthClass = styles[`width-${figure.width ?? 'column'}`];
  const { stage } = figure;

  const placeholder = (
    <div className={styles.placeholder} role="img" aria-label={figure.alt}>
      <span className={styles.placeholderLabel}>Image pending</span>
      <code className={styles.placeholderPath}>{srcs.join(', ')}</code>
    </div>
  );

  const frame = stage ? (
    <div className={stageClass(stage)}>
      {loadState === 'error' ? (
        <div className={styles.stagePlaceholder}>{placeholder}</div>
      ) : (
        <div
          className={stageScreensClass(stage)}
          style={
            {
              '--n': srcs.length,
            } as CSSProperties
          }
          role="img"
          aria-label={figure.alt}
        >
          {srcs.map((src, i) => {
            const [w, h] = stage.sizes[i] ?? stage.sizes[0];
            return (
              <img
                key={src}
                src={src}
                alt=""
                width={w}
                height={h}
                className={styles.screen}
                style={{ '--r': w / h, '--native': w } as CSSProperties}
                loading="lazy"
                decoding="async"
                onLoad={() => setLoadedCount((c) => c + 1)}
                onError={() => setHasError(true)}
              />
            );
          })}
        </div>
      )}
    </div>
  ) : (
    <div
      className={[
        styles.frame,
        loadState === 'error' ? styles.framePlaceholder : '',
        loadState === 'loaded' ? styles.frameLoaded : '',
        srcs.length > 1 ? styles.frameStacked : '',
        figure.variant === 'dashed' ? styles.frameDashed : '',
      ]
        .join(' ')
        .trim()}
    >
      {loadState !== 'error' &&
        srcs.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={
              srcs.length > 1
                ? `${figure.alt} (${i + 1} of ${srcs.length})`
                : figure.alt
            }
            className={styles.image}
            loading="lazy"
            onLoad={() => setLoadedCount((c) => c + 1)}
            onError={() => setHasError(true)}
          />
        ))}
      {loadState === 'error' && placeholder}
    </div>
  );

  return (
    <RevealOnScroll as="figure" className={[styles.plate, widthClass, className ?? ''].join(' ').trim()}>
      {figure.head && <PlateHead head={figure.head} />}
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
