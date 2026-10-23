import { useReducedMotion } from '../../interactions/useReducedMotion';
import { useWaveGrid, type WaveGridParams } from '../../interactions/useWaveGrid';
import styles from './DeskWaveGrid.module.css';

/**
 * Tuned on the live desk. One tile per plate column: the vertical seams are
 * the column rules themselves, so the ripple lifts the plate's own grid and
 * only the row seams are new — and those exist only while a wave passes.
 */
const DESK_WAVE: WaveGridParams = {
  density: 1,
  gain: 1.4,
  lift: 6,
  shadow: 0.1,
  light: 0.8,
  tone: 0.04,
  speed: 360,
  wavelength: 360,
  ringWidth: 180,
  fade: 1.4,
  idleDrops: false,
};

export interface DeskWaveGridProps {
  /** Plate column count; tiles subdivide these. */
  columns: number;
  /** False while the plate proof is still revealing. */
  active: boolean;
}

/**
 * DeskWaveGrid — paper tiles under the plate ruling that ripple as the
 * pointer crosses the desk. Sits above DeskLight and below the grid rules,
 * so the column rules stay crisp on top of the shading. Off entirely under
 * reduced motion.
 */
export default function DeskWaveGrid({ columns, active }: DeskWaveGridProps) {
  const reducedMotion = useReducedMotion();
  const canvasRef = useWaveGrid(DESK_WAVE, columns, active && !reducedMotion);

  return (
    <div className={styles.field} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
