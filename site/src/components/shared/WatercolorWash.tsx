import { FILTER_ID, GRADIENT_ID, LAYER_NAMES, useWashTune } from './WashTuneContext';
import styles from './WatercolorWash.module.css';

export interface WatercolorWashProps {
  /**
   * Class applied to the wash root. Use this from the consuming component to
   * position the wash (typically `position: absolute; inset: -30%`) and to
   * trigger per-layer fade-in via the `[data-wash-layer]` selectors.
   *
   * Each of the three layers (mist / primary / core) carries a
   * `data-wash-layer` attribute so the consumer's CSS can stagger the fade
   * with attribute selectors (CSS Modules don't scope attribute selectors,
   * which is what makes this cross-module styling possible).
   */
  className?: string;
}

/**
 * WatercolorWash — a 水墨画-influenced ink wash with three layered shapes.
 *
 * Three SVG groups, each with its own filter, gradient, and drift animation:
 *   • mist     — atmospheric outer halo. Heavy blur, large displacement.
 *                Reads as ink dissipating into wet paper.
 *   • primary  — the body of the wash. Multi-stop gradient with a darker
 *                shoulder, off-center weight.
 *   • core     — small dense pool. Sharp, off-center. Reads as the deepest
 *                pigment where the brush rested longest.
 *
 * Each layer is `pointer-events: none` and `opacity: 0` by default. The
 * consumer's CSS triggers a cascade: outside-in on hover (mist first,
 * core last) and inside-out on hover-out (core first, mist last).
 *
 * Path d-strings come from WashTuneContext (defaulting to the production
 * hardcoded values). The WashTunePanel can override per-layer paths live.
 */
export default function WatercolorWash({ className }: WatercolorWashProps) {
  const { svg } = useWashTune();
  return (
    <div className={`${styles.wash} ${className ?? ''}`} aria-hidden="true">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className={styles.svg}
      >
        {LAYER_NAMES.map((name) => (
          <g
            key={name}
            data-wash-layer={name}
            filter={`url(#${FILTER_ID[name]})`}
          >
            <path d={svg[name].path} fill={`url(#${GRADIENT_ID[name]})`} />
          </g>
        ))}
      </svg>
    </div>
  );
}
