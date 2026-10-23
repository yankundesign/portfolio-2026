import RevealOnScroll from './RevealOnScroll';
import styles from './TaskPathDiagram.module.css';

export interface TaskPathDiagramProps {
  /** The admin's request, as they'd write the ticket. */
  request: string;
  /** The four stops along the manual path, in order. */
  stops: readonly string[];
  caption: string;
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
 * The SVG carries the shape (the pile is the problem); the ordered list
 * beneath carries the four stops as real text, so the diagram stays
 * legible at phone width and to screen readers.
 */
export default function TaskPathDiagram({ request, stops, caption }: TaskPathDiagramProps) {
  return (
    <RevealOnScroll as="figure" className={styles.figure}>
      <div className={styles.layout}>
        <p className={styles.request}>&ldquo;{request}&rdquo;</p>
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
                      <circle r="13" className={styles.badge} />
                      <text y="4.5" textAnchor="middle" className={styles.badgeText}>
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
      </div>
      <figcaption className={styles.caption}>{caption}</figcaption>
    </RevealOnScroll>
  );
}
