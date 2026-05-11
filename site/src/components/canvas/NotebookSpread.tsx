import type { ReactNode } from 'react';
import styles from './NotebookSpread.module.css';

export interface NotebookSpreadProps {
  /** Content overlaid on the left (verso) page. */
  leftPage: ReactNode;
  /** Content overlaid on the right (recto) page. */
  rightPage: ReactNode;
}

/**
 * NotebookSpread — Canvas v0.8.1 surface.
 *
 * A single open-notebook PNG (`/canvas/open-notebook.png`) provides all the
 * material chrome: cloth cover edges, brass binder clip, washi tape strip,
 * blue elastic strap, binding crease, paper texture, and page-edge stack on
 * the right. Content is overlaid via two absolutely-positioned page slots
 * sized to the actual page areas of the asset.
 *
 * Page boundaries are exposed as CSS variables on `:root` so they can be
 * tuned in DevTools to match the asset exactly without rebuilding.
 *
 * The spread uses `aspect-ratio` matching the PNG so it scales as a single
 * unit; content overlays use percentage positioning relative to the spread,
 * which means percentages map to consistent positions within the asset
 * across viewport widths.
 */
export default function NotebookSpread({
  leftPage,
  rightPage,
}: NotebookSpreadProps) {
  return (
    // `data-transition-source` exposes this element to NotebookTransition,
    // which measures it on close to know where to morph the overlay back to.
    <div className={styles.spread} data-transition-source="spread">
      <img
        src="/canvas/open-notebook.png"
        alt=""
        className={styles.notebook}
        draggable={false}
      />
      <div className={styles.overlay} aria-hidden="false">
        <div className={`${styles.page} ${styles.pageLeft}`}>{leftPage}</div>
        <div className={`${styles.page} ${styles.pageRight}`}>{rightPage}</div>
      </div>
    </div>
  );
}
