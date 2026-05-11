import { Link } from 'react-router';
import styles from './MetaCard.module.css';

export interface MetaCardProps {
  /**
   * Short one-sentence "currently" blurb.
   * Omit to render a "sentence pending" placeholder — no lorem ipsum.
   */
  currently?: string;
  /** Build duration, e.g. "1 week" or "2 weeks, in progress". */
  shipDuration?: string;
  /** Trigger the entrance transition. */
  visible?: boolean;
  /** Entrance delay in ms. */
  entranceDelay?: number;
}

/**
 * Two-signal meta card pinned to the bottom-right of the canvas.
 *
 * Signals:
 *   1. `Currently: [one sentence]` — an ongoing-work hook for founder readers.
 *   2. `This site — designed and shipped in X with Claude Code. Colophon →`
 *
 * Visual: small note on paper-soft card, a washi-tape strip across the top,
 * slight rotation. Reads as a physical note someone pinned to the pinboard,
 * not a marketing badge.
 *
 * Per the 2026-04-23 positioning shift: the site is the case study; this card
 * is one of the earlier surfaces that makes the build-ness visible before the
 * reader commits to opening the colophon.
 */
export function MetaCard({
  currently,
  shipDuration = '1 week',
  visible = true,
  entranceDelay = 0,
}: MetaCardProps) {
  const cls = [
    styles.card,
    visible ? styles.entered : styles.entering,
  ].join(' ');

  return (
    <aside
      className={cls}
      style={{
        transitionDelay: visible ? `${entranceDelay}ms` : '0ms',
      }}
      aria-label="Currently and site colophon"
    >
      <span className={styles.tape} aria-hidden="true" />

      <p className={styles.kicker}>Note</p>

      <div className={styles.row}>
        <p className={styles.rowLabel}>Currently</p>
        {currently ? (
          <p className={styles.rowBody}>{currently}</p>
        ) : (
          <p className={styles.rowPending}>
            <span className={styles.pendingDot} aria-hidden="true" />
            <span>sentence pending</span>
          </p>
        )}
      </div>

      <span className={styles.divider} aria-hidden="true" />

      <div className={styles.row}>
        <p className={styles.rowBody}>
          This site — designed and shipped in {shipDuration} with Claude Code.
        </p>
        <Link to="/colophon" className={styles.link}>
          <span>Colophon</span>
          <span className={styles.arrow} aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </aside>
  );
}
