import { useEffect, useRef, useState } from 'react';
import styles from './ProjectHeader.module.css';

const ACTION_STATUS_DURATION_MS = 4600;

export interface ProjectHeaderHeroImage {
  src: string;
  alt: string;
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
   * Optional hero image. Sits between the italic subtitle and the meta
   * strip — a single uncaptioned plate that opens the chapter visually.
   * Treated as plate chrome (1px ink rule, paper-soft fill) so it stays
   * inside the editorial language; it is not a numbered figure.
   */
  heroImage?: ProjectHeaderHeroImage;
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
}: ProjectHeaderProps) {
  const [heroFailed, setHeroFailed] = useState(false);
  const [actionStatusVisible, setActionStatusVisible] = useState(false);
  const [actionStatusKey, setActionStatusKey] = useState(0);
  const actionStatusTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (actionStatusTimer.current !== null) {
      window.clearTimeout(actionStatusTimer.current);
    }
  }, []);

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
      {heroImage && (
        <figure className={styles.hero}>
          {heroFailed ? (
            <div className={styles.heroPlaceholder} role="img" aria-label={heroImage.alt}>
              <span className={styles.heroPlaceholderLabel}>Hero image pending</span>
              <code className={styles.heroPlaceholderPath}>{heroImage.src}</code>
            </div>
          ) : (
            <img
              src={heroImage.src}
              alt={heroImage.alt}
              className={styles.heroImage}
              loading="eager"
              onError={() => setHeroFailed(true)}
            />
          )}
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
