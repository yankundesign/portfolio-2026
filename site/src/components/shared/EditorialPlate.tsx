import type { ReactNode } from 'react';
import styles from './EditorialPlate.module.css';

/**
 * EditorialPlate — the site-wide chrome wrapper (v0.4, Swiss register).
 *
 * Wraps a page's content in editorial-plate chrome: plate metadata in the
 * corners (inside the bleed frame), column numbers at the top, register
 * marks at the frame edges, blueprint ruling (horizontal top/bottom rules
 * + vertical rules between column boundaries), and page-specific annotation
 * at the bottom (plus optional Currently + site-build lines on the homepage).
 */

export interface GridSystem {
  columns: number;
  gutter: number;
  margin: number;
}

export interface EditorialPlateProps {
  plateNumber: number | string;
  plateTitle: string;
  system?: string;
  /** When set, replaces the default plate-number / title / system lines. */
  metaLines?: string[];

  format?: string;
  date?: string;

  columns?: number;
  showColumnNumbers?: boolean;

  showRegisterMarks?: boolean;

  grid?: GridSystem;

  annotation?: string;
  currentlyLine?: string;
  siteBuildLine?: string;

  showBleedFrame?: boolean;
  showGridLines?: boolean;

  children?: ReactNode;
}

function formatToday(): string {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd} / ${mm} / ${yyyy}`;
}

export default function EditorialPlate({
  plateNumber,
  plateTitle,
  system,
  metaLines,
  format,
  date,
  columns = 8,
  showColumnNumbers = true,
  showRegisterMarks = true,
  grid,
  annotation,
  currentlyLine,
  siteBuildLine,
  showBleedFrame = true,
  showGridLines = true,
  children,
}: EditorialPlateProps) {
  const plateNumberStr =
    typeof plateNumber === 'number'
      ? String(plateNumber).padStart(2, '0')
      : plateNumber;

  const resolvedDate = date ?? formatToday();

  return (
    <div className={styles.plate}>
      {showBleedFrame && (
        <div className={styles.bleedFrame} aria-hidden="true" />
      )}

      {/* Blueprint grid ruling — top rule, bottom rule, vertical column rules. */}
      {showGridLines && columns > 0 && (
        <div className={styles.gridLines} aria-hidden="true">
          <GridRuling columns={columns} />
        </div>
      )}

      {/* Top-left plate meta */}
      <div
        className={`${styles.meta} ${styles.metaTopLeft}`}
        aria-hidden="true"
      >
        {metaLines ? (
          metaLines.map((line, i) => (
            <span key={i} className={styles.metaLine}>{line}</span>
          ))
        ) : (
          <>
            <span className={styles.metaLine}>
              EDITORIAL PLATE — {plateNumberStr}
            </span>
            <span className={styles.metaLine}>{plateTitle}</span>
            {system && <span className={styles.metaLine}>SYSTEM: {system}</span>}
          </>
        )}
      </div>

      {/* Top-right plate meta */}
      <div
        className={`${styles.meta} ${styles.metaTopRight}`}
        aria-hidden="true"
      >
        {format && (
          <span className={`${styles.metaLine} ${styles.metaData}`}>
            FORMAT: {format}
          </span>
        )}
        <span className={`${styles.metaLine} ${styles.metaData}`}>
          DATE: {resolvedDate}
        </span>
      </div>

      {/* Column number row */}
      {showColumnNumbers && columns > 0 && (
        <div
          className={styles.columnRow}
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
          aria-hidden="true"
        >
          {Array.from({ length: columns }, (_, i) => (
            <span key={i} className={styles.columnNumber}>
              {i + 1}
            </span>
          ))}
        </div>
      )}

      {/* Register marks */}
      {showRegisterMarks && (
        <>
          <RegisterMark className={`${styles.registerMark} ${styles.regTopLeft}`} />
          <RegisterMark
            className={`${styles.registerMark} ${styles.regTopCenter}`}
          />
          <RegisterMark
            className={`${styles.registerMark} ${styles.regTopRight}`}
          />
          <RegisterMark
            className={`${styles.registerMark} ${styles.regBottomLeft}`}
          />
          <RegisterMark
            className={`${styles.registerMark} ${styles.regBottomCenter}`}
          />
          <RegisterMark
            className={`${styles.registerMark} ${styles.regBottomRight}`}
          />
        </>
      )}

      {/* Content slot */}
      <div className={styles.content}>{children}</div>

      {/* Bottom-left grid system meta */}
      {grid && (
        <div
          className={`${styles.meta} ${styles.metaBottomLeft}`}
          aria-hidden="true"
        >
          <span className={styles.metaLine}>GRID SYSTEM</span>
          <span className={styles.metaLine}>COLUMNS: {grid.columns}</span>
          <span className={styles.metaLine}>GUTTER: {grid.gutter} PX</span>
          <span className={styles.metaLine}>MARGIN: {grid.margin} PX</span>
        </div>
      )}

      {/* Bottom-right annotation + optional Currently + site-build */}
      {(annotation || currentlyLine || siteBuildLine) && (
        <div
          className={`${styles.meta} ${styles.metaBottomRight}`}
          aria-hidden="true"
        >
          {siteBuildLine && (
            <span className={`${styles.metaLine} ${styles.metaData}`}>
              {siteBuildLine}
            </span>
          )}
          {currentlyLine && (
            <span className={`${styles.metaLine} ${styles.metaData}`}>
              {currentlyLine}
            </span>
          )}
          {annotation && (
            <span className={styles.metaLine}>{annotation}</span>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * GridRuling — the blueprint grid lines.
 *
 * Renders: one horizontal rule at the top of the content area, one at the
 * bottom, (columns - 1) vertical rules between column boundaries that
 * overshoot the horizontal rules at both ends, and four small register
 * crosses at the outer corner intersections — the print-specimen vocabulary.
 *
 * Uses preserveAspectRatio="none" + vectorEffect="non-scaling-stroke" so
 * lines stretch to fill the container but render at exact pixel widths.
 */
function GridRuling({ columns }: { columns: number }) {
  const verticals: number[] = [];
  for (let i = 1; i < columns; i++) {
    verticals.push((i / columns) * 100);
  }
  // Overshoot: vertical rules extend slightly past the horizontal rules.
  // Expressed in viewBox y-units (0-100); small visual hairs.
  const OVERSHOOT = 1.4;

  return (
    <svg
      className={styles.gridLineSvg}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Top + bottom horizontal rules. */}
      <line
        x1="0"
        y1="0"
        x2="100"
        y2="0"
        stroke="var(--rule-plate)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="0"
        y1="100"
        x2="100"
        y2="100"
        stroke="var(--rule-plate)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />

      {/* Vertical column rules — extend slightly past top + bottom rules. */}
      {verticals.map((x) => (
        <line
          key={x}
          x1={x}
          y1={-OVERSHOOT}
          x2={x}
          y2={100 + OVERSHOOT}
          stroke="var(--rule-plate)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      ))}

      {/* Outer-edge vertical rules at left + right (frame the content). */}
      <line
        x1="0"
        y1={-OVERSHOOT}
        x2="0"
        y2={100 + OVERSHOOT}
        stroke="var(--rule-plate)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="100"
        y1={-OVERSHOOT}
        x2="100"
        y2={100 + OVERSHOOT}
        stroke="var(--rule-plate)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/**
 * Register mark — crosshair inside a circle, the offset-printing
 * registration vocabulary. Decorative, but mean it.
 */
function RegisterMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="7"
        cy="7"
        r="5.5"
        stroke="currentColor"
        strokeWidth="0.75"
        fill="none"
      />
      <line x1="7" y1="0" x2="7" y2="14" stroke="currentColor" strokeWidth="0.75" />
      <line x1="0" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  );
}
