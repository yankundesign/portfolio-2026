import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../interactions/useReducedMotion';
import styles from './ProjectHeader.module.css';

const ACTION_STATUS_DURATION_MS = 4600;

export interface ProjectHeaderHeroImage {
  src: string;
  alt: string;
}

export interface ProjectHeaderHeroVideo {
  webm?: string;
  mp4: string;
  poster: string;
  alt: string;
  /**
   * The recording's own proportions, e.g. '1846 / 1114'. When set, the
   * whole frame shows (no 16:10 crop) — for screen recordings where the
   * edges carry the product chrome.
   */
  aspectRatio?: string;
}

export interface ProjectHeaderAction {
  label: string;
  statusLabel: string;
  statusMessage: string;
}

export interface ProjectHeaderProps {
  figNumber: string;
  title: string;
  subtitle: string;
  yearRange: string;
  context: string;
  role: string;
  /** Optional primary CTA with a temporary status popover. */
  primaryAction?: ProjectHeaderAction;
  /**
   * Optional hero media. Sits between the italic subtitle and the meta
   * strip — a single uncaptioned plate that opens the chapter visually.
   * Treated as plate chrome (1px ink rule, paper-soft fill) so it stays
   * inside the editorial language; it is not a numbered figure.
   */
  heroImage?: ProjectHeaderHeroImage;
  heroVideo?: ProjectHeaderHeroVideo;
}

/**
 * Project detail header.
 *
 * Structured like a chapter opening:
 *   fig. 01
 *   Control Hub AI
 *   — subtitle, italic
 *   [optional hero image]
 *   Cisco Webex · Control Hub · 2024–present · Product Designer
 *
 * The fig number ties this detail page back to its card on the canvas —
 * both carry the same figure numeral in JetBrains Mono. The optional
 * hero image is a plain, uncaptioned plate; numbered figures begin
 * inside the body beats below.
 */
export default function ProjectHeader({
  figNumber,
  title,
  subtitle,
  yearRange,
  context,
  role,
  primaryAction,
  heroImage,
  heroVideo,
}: ProjectHeaderProps) {
  const reducedMotion = useReducedMotion();
  const [heroFailed, setHeroFailed] = useState(false);
  const [actionStatusVisible, setActionStatusVisible] = useState(false);
  const [actionStatusKey, setActionStatusKey] = useState(0);
  const actionStatusTimer = useRef<number | null>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => () => {
    if (actionStatusTimer.current !== null) {
      window.clearTimeout(actionStatusTimer.current);
    }
  }, []);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video || !heroVideo) return;

    if (typeof IntersectionObserver === 'undefined') {
      if (reducedMotion) video.pause();
      else void video.play().catch(() => {});
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !reducedMotion) {
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    }, { threshold: 0.1 });

    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [heroVideo, reducedMotion]);

  const showActionStatus = () => {
    if (actionStatusTimer.current !== null) {
      window.clearTimeout(actionStatusTimer.current);
    }

    setActionStatusVisible(true);
    setActionStatusKey((key) => key + 1);
    actionStatusTimer.current = window.setTimeout(() => {
      setActionStatusVisible(false);
      actionStatusTimer.current = null;
    }, ACTION_STATUS_DURATION_MS);
  };

  const metaStrip = (
    <p className={styles.metaStrip}>
      <span>{context}</span>
      <span className={styles.sep} aria-hidden="true">·</span>
      <span>{yearRange}</span>
      <span className={styles.sep} aria-hidden="true">·</span>
      <span>{role}</span>
    </p>
  );

  return (
    <header className={styles.header}>
      <p className={styles.figNumber} aria-hidden="true">
        {figNumber}
      </p>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>
        <em>{subtitle}</em>
      </p>
      {primaryAction && metaStrip}
      {(heroImage || heroVideo) && (
        <figure className={styles.hero}>
          {heroVideo ? (
            heroFailed ? (
              <img src={heroVideo.poster} alt={heroVideo.alt} className={styles.heroImage} />
            ) : (
              <video
                ref={heroVideoRef}
                className={`${styles.heroImage} ${heroVideo.aspectRatio ? styles.heroVideoNative : styles.heroVideo}`}
                style={heroVideo.aspectRatio ? { aspectRatio: heroVideo.aspectRatio } : undefined}
                aria-label={heroVideo.alt}
                poster={heroVideo.poster}
                controls
                loop
                muted
                playsInline
                preload="metadata"
                onError={() => setHeroFailed(true)}
              >
                {heroVideo.webm && <source src={heroVideo.webm} type="video/webm" />}
                <source src={heroVideo.mp4} type="video/mp4" />
              </video>
            )
          ) : heroImage && heroFailed ? (
            <div className={styles.heroPlaceholder} role="img" aria-label={heroImage.alt}>
              <span className={styles.heroPlaceholderLabel}>Hero image pending</span>
              <code className={styles.heroPlaceholderPath}>{heroImage.src}</code>
            </div>
          ) : heroImage ? (
            <img
              src={heroImage.src}
              alt={heroImage.alt}
              className={styles.heroImage}
              loading="eager"
              onError={() => setHeroFailed(true)}
            />
          ) : null}
        </figure>
      )}
      {primaryAction && (
        <div className={styles.actionGroup}>
          <button
            type="button"
            className={styles.actionButton}
            aria-expanded={actionStatusVisible}
            aria-controls="project-primary-action-status"
            onClick={showActionStatus}
          >
            {primaryAction.label}
          </button>
          {actionStatusVisible && (
            <div
              key={actionStatusKey}
              id="project-primary-action-status"
              className={styles.actionPopover}
              role="status"
              aria-live="polite"
            >
              <p className={styles.actionStatusLabel}>{primaryAction.statusLabel}</p>
              <p className={styles.actionStatusMessage}>{primaryAction.statusMessage}</p>
            </div>
          )}
        </div>
      )}
      {!primaryAction && metaStrip}
    </header>
  );
}
