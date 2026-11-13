import { type ReactNode } from 'react';
import RevealOnScroll from './RevealOnScroll';
import styles from './TaskPathDiagram.module.css';

export interface TaskPathDiagramProps {
  /** The admin's request, as they'd write the ticket. */
  request: string;
  /** The four stops along the manual path, in order. */
  stops: readonly string[];
  caption: string;
  /** The section's opening (header, prose), set in the text column above the request. */
  children?: ReactNode;
  /**
   * The drawing alone, with no text column and no request: for layouts that
   * set the request themselves (the v4 notebook page sets it as a statement).
   */
  bare?: boolean;
}

const COLS = [72, 232, 392, 552];
const ROWS = [44, 150, 256];
const PAGE_W = 96;
const PAGE_H = 60;

/* Twelve pages in reading order along the snake: row 1 left→right,
   row 2 right→left, row 3 left→right. */
const PAGES = [
  ...COLS.map((x) => ({ x, y: ROWS[0] })),
  ...[...COLS].reverse().map((x) => ({ x, y: ROWS[1] })),
  ...COLS.map((x) => ({ x, y: ROWS[2] })),
];

/* Page index → stop number. Matches the deck's drawing. */
const STOP_AT: Record<number, number> = { 0: 1, 3: 2, 6: 3, 11: 4 };
const PAGE_LABEL: Record<number, string> = { 0: 'ATA-1', 11: 'ATA-2' };

const PATH =
  'M 8 44 H 604 Q 624 44 624 64 V 130 Q 624 150 604 150 H 36 Q 16 150 16 170 V 236 Q 16 256 36 256 H 552';

/**
 * Slide 22's drawing: one request, then the twelve pages it takes by hand.
 *
 * Set as a spread: the section's opening (children) and the request in a
 * text column, the drawing beside it, so the section is as tall as the
 * taller of the two rather than both stacked. Narrow, they stack.
 *
 * The SVG carries the shape (the pile is the problem); the ordered list
 * beneath carries the four stops as real text, so the diagram stays
 * legible at phone width and to screen readers.
 */
export default function TaskPathDiagram({
  request,
  stops,
  caption,
  children,
  bare = false,
}: TaskPathDiagramProps) {
  const figure = (
      <RevealOnScroll as="figure" className={styles.figure}>
        <div className={styles.drawing}>
          <svg
            className={styles.svg}
            viewBox="0 0 640 300"
            aria-hidden="true"
            focusable="false"
          >
            <path d={PATH} className={styles.path} />
            {PAGES.map((page, i) => {
              const stop = STOP_AT[i];
              const label = PAGE_LABEL[i];
              return (
                <g
                  key={i}
                  transform={`translate(${page.x - PAGE_W / 2} ${page.y - PAGE_H / 2})`}
                  className={stop ? styles.stopPage : styles.page}
                >
                  <rect width={PAGE_W} height={PAGE_H} rx="2" className={styles.sheet} />
                  <rect width={PAGE_W} height="10" className={styles.bar} />
                  {label ? (
                    <text x={PAGE_W / 2} y="40" textAnchor="middle" className={styles.pageLabel}>
                      {label}
                    </text>
                  ) : (
                    <>
                      <line x1="14" y1="26" x2="82" y2="26" />
                      <line x1="14" y1="36" x2="82" y2="36" />
                      <line x1="14" y1="46" x2="60" y2="46" />
                    </>
                  )}
                  {stop && (
                    <>
                      <circle r="14" className={styles.badge} />
                      <text y="5" textAnchor="middle" className={styles.badgeText}>
                        {String(stop).padStart(2, '0')}
                      </text>
                    </>
                  )}
                </g>
              );
            })}
          </svg>
          <ol className={styles.stops}>
            {stops.map((stop, i) => (
              <li key={stop} className={styles.stop}>
                <span className={styles.stopNumber}>{String(i + 1).padStart(2, '0')}</span>
                {stop}
              </li>
            ))}
          </ol>
        </div>
        <figcaption className={styles.caption}>{caption}</figcaption>
      </RevealOnScroll>
  );

  if (bare) return figure;

  return (
    <div className={styles.spread} data-measure="plate">
      <div className={styles.text}>
        {children}
        <RevealOnScroll as="p" className={styles.request}>
          &ldquo;{request}&rdquo;
        </RevealOnScroll>
      </div>
      {figure}
    </div>
  );
}
