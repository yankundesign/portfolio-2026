import type { ReactNode } from 'react';
import type { ProjectGroup } from '../../data/projects';
import { SpotlightDotGrid } from './SpotlightDotGrid';
import styles from './Canvas.module.css';

interface CanvasProps {
  children: ReactNode;
  /** Editorial intro paragraph rendered top-left of the canvas grid. */
  intro?: string;
  /** Section captions that group paired works on the canvas surface. */
  groups?: ProjectGroup[];
  /** Whether the column-ruling background is visible. Used for entrance. */
  rulingsVisible?: boolean;
  /** Whether running header / footer are visible. Used for entrance. */
  furnitureVisible?: boolean;
  /** Whether the intro paragraph is visible. Used for entrance. */
  introVisible?: boolean;
  /** Whether the section captions are visible. Used for entrance. */
  groupsVisible?: boolean;
}

/**
 * Canvas v0.7 — 12-column editorial plate.
 *
 * Replaces the v0.6 viewport-fitted pinboard. Cards are placed via CSS Grid
 * column spans, axis-aligned at rest (no absolute positioning). The surface
 * is plain paper with very faint vertical column rulings; the graph-paper
 * background is retired. Intro paragraph and section captions live on the
 * canvas surface and do typographic grouping work. Rotation is reserved for
 * interaction states (e.g., hover enlarge) — never used as a static layout.
 */
export function Canvas({
  children,
  intro,
  groups = [],
  rulingsVisible = true,
  furnitureVisible = true,
  introVisible = true,
  groupsVisible = true,
}: CanvasProps) {
  const surfaceCls = [
    styles.surface,
    rulingsVisible ? styles.rulingsVisible : styles.rulingsHidden,
  ].join(' ');

  const furnitureCls = [
    styles.furniture,
    furnitureVisible ? styles.furnitureVisible : styles.furnitureHidden,
  ].join(' ');

  return (
    <div className={surfaceCls}>
      {/* Spotlight dot grid — ambient editorial texture that brightens under
       * the cursor. Sits behind the grid; honors prefers-reduced-motion and
       * suppresses on touch. */}
      <SpotlightDotGrid />

      {/* Running header — bookplate identity */}
      {/* <div className={`${styles.runningHeader} ${furnitureCls}`}>
        <span>YANKUN WANG · FIELD NOTES · VOL. V</span>
        <span>SAN FRANCISCO</span>
      </div> */}

      <div className={styles.grid}>
        {/* Editorial intro — sets the canvas as a curated set, not a feed.
         *  Replaces the 13% display-watermark thesis from v0.6. */}
        {intro && (
          <p
            className={[
              styles.intro,
              introVisible ? styles.introVisible : styles.introHidden,
            ].join(' ')}
          >
            <span className={styles.introPrefix}>§ Field Notes ·</span>{' '}
            {intro}
          </p>
        )}

        {/* Section captions — paired-works grouping. */}
        {groups.map((g, i) => (
          <span
            key={i}
            className={[
              styles.sectionCaption,
              groupsVisible ? styles.captionVisible : styles.captionHidden,
            ].join(' ')}
            style={{
              gridColumnStart: g.colStart,
              gridColumnEnd: `span ${g.colSpan}`,
              gridRowStart: `caption-${g.gridRow}`,
            }}
          >
            {g.text}
          </span>
        ))}

        {children}
      </div>

      {/* Running footer */}
      <div className={`${styles.runningFooter} ${furnitureCls}`}>
        <span>p. 03–04</span>
        <span>FIELD NOTES · VOL. V</span>
      </div>
    </div>
  );
}
