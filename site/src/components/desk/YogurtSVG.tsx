/**
 * Yogurt — renders one of six hand-drawn cat poses as an <img>.
 *
 * Each pose id maps to a WebP at /cats/{id}.webp (public assets). The file
 * name kept from the placeholder version for minimal churn; the drawings are
 * now raster, not inline SVG. Mix-blend-mode lets the drawing's white background
 * drop out cleanly against the roulette's paper fill so only ink lines
 * remain.
 */
import type { YogurtPose } from '../../data/cats';
import styles from './YogurtSVG.module.css';

export interface YogurtSVGProps {
  pose: YogurtPose;
  size?: number;
}

export default function YogurtSVG({ pose, size = 60 }: YogurtSVGProps) {
  return (
    <img
      src={`/cats/${pose}.webp`}
      className={styles.cat}
      width={size}
      height={size}
      alt=""
      aria-hidden
      draggable={false}
    />
  );
}
