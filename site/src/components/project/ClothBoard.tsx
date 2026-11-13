import { useRef, type CSSProperties } from 'react';
import RevealOnScroll from './RevealOnScroll';
import { useBoardVideo } from '../../interactions/useBoardVideo';
import type { Board } from '../../data/notebookCase';
import styles from './ClothBoard.module.css';

export interface ClothBoardProps {
  board: Board;
  /** Above the fold: load the screen straight away. */
  eager?: boolean;
  className?: string;
}

/* The gap between two screens, as a share of the row. The board's margins
   (4.5% at the sides and top, 5.5% below: a tipped-in plate) live in CSS. */
const GAP = 0.045;

/**
 * A dark product screen tipped onto a board of the notebook's navy cloth,
 * the cloth of the homepage cover (references: Actual Source's bounded
 * evidence, Hofmann's dark field, Upstream's whole interface; see
 * 00-brief/references/agentic-case-study-v4/README.md).
 *
 * Every board takes the full measure; the screens sit centred on it. Screens
 * are never cropped and never shown wider than their capture: the row stops
 * growing when a screen reaches its native width, or when the board would be
 * taller than the window. Two screens share one row, each at its weight,
 * bottoms on one line, each with a stamp above it.
 *
 * The caption sits under the board on paper, with the one Play / Pause
 * control a recording carries. A board holds at most one recording.
 */
export default function ClothBoard({ board, eager = false, className }: ClothBoardProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const video = useBoardVideo(frameRef, videoRef);

  const { screens, caption } = board;
  const n = screens.length;
  const total = screens.reduce((sum, s) => sum + (s.weight ?? 1), 0);
  const shares = screens.map((s) => ((s.weight ?? 1) / total) * (1 - GAP * (n - 1)));
  // The row's height over its width (set by its tallest screen), and the
  // widest the row may be before a screen would pass its capture's pixels.
  const k = Math.max(...screens.map((s, i) => (shares[i] * s.size[1]) / s.size[0]));
  const rowMax = Math.min(...screens.map((s, i) => s.size[0] / shares[i]));
  const labelled = screens.some((s) => s.label);
  const hasVideo = screens.some((s) => s.kind === 'video');

  const vars = {
    '--k': k.toFixed(4),
    '--row-max': `${Math.floor(rowMax)}px`,
    '--gap': `${GAP * 100}%`,
    '--label-h': labelled ? '2.25rem' : '0rem',
  } as CSSProperties;

  return (
    <RevealOnScroll as="figure" className={[styles.figure, className ?? ''].join(' ').trim()}>
      <div
        ref={frameRef}
        className={[styles.board, board.tone && board.tone !== 'cloth' ? styles[board.tone] : '']
          .join(' ')
          .trim()}
        style={vars}
      >
        <div className={styles.inner}>
          <div className={styles.row}>
            {screens.map((s, i) => (
              <div
                key={s.src}
                className={[styles.slot, s.dropped ? styles.dropped : '', s.cutout ? styles.cutout : '']
                  .join(' ')
                  .trim()}
                style={{ '--share': `${(shares[i] * 100).toFixed(3)}%` } as CSSProperties}
              >
                {s.label && <p className={styles.stamp}>{s.label}</p>}
                {s.kind === 'video' && !video.failed ? (
                  <video
                    ref={videoRef}
                    className={styles.screen}
                    src={s.src}
                    poster={s.poster}
                    width={s.size[0]}
                    height={s.size[1]}
                    aria-label={s.alt}
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    onPlay={video.onPlay}
                    onPause={video.onPause}
                    onError={video.onError}
                  />
                ) : (
                  <img
                    className={styles.screen}
                    src={s.kind === 'video' ? s.poster : s.src}
                    alt={s.alt}
                    width={s.size[0]}
                    height={s.size[1]}
                    loading={eager ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <figcaption className={styles.caption}>
        <span className={styles.captionText}>{caption}</span>
        {hasVideo && !video.failed && (
          <button
            type="button"
            className={styles.toggle}
            aria-label={video.playing ? 'Pause the recording' : 'Play the recording'}
            onClick={video.toggle}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              {video.playing ? <path d="M6 4h4v16H6zM14 4h4v16h-4z" /> : <path d="M7 4.5 20 12 7 19.5z" />}
            </svg>
            {video.playing ? 'Pause' : 'Play'}
          </button>
        )}
      </figcaption>
    </RevealOnScroll>
  );
}
