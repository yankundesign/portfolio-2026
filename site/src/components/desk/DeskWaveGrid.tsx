import { useEffect } from 'react';
import { useReducedMotion } from '../../interactions/useReducedMotion';
import {
  useWaveGrid,
  type WaveDrop,
  type WaveGridParams,
} from '../../interactions/useWaveGrid';
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

/** How the empty plate moves during the opening's rulings beat. */
export type DeskIntroStyle = 'ring' | 'scatter';

interface ScheduledDrop {
  /** ms after the rulings beat begins. */
  at: number;
  x: number;
  y: number;
  ripple: WaveDrop;
}

/*
 * Both openings fit inside the rulings beat that usePlateProofReveal holds
 * before the objects arrive (~1.4s).
 *
 * ring — one drop at the centre once the rulings settle. Strong enough to
 * hold full height to the corners, and about twice pointer speed so it
 * crosses the plate in ~1s.
 *
 * scatter — eight lighter drops at random points and moments, like the first
 * rain on paper. Points come from a shuffled 4×2 grid, jittered within each
 * cell, so they land everywhere without clumping; each ring dies out within
 * a few columns and the overlaps interfere.
 */
function introDrops(style: DeskIntroStyle): ScheduledDrop[] {
  if (style === 'ring') {
    return [{ at: 360, x: 0.5, y: 0.5, ripple: { strength: 6, speed: 700 } }];
  }

  const cells = Array.from({ length: 8 }, (_, i) => ({ col: i % 4, row: i >> 2 }));
  const times = cells
    .map(() => 280 + Math.random() * 680)
    .sort((a, b) => a - b);
  return shuffle(cells).map((cell, i) => ({
    at: times[i],
    x: (cell.col + 0.15 + Math.random() * 0.7) / 4,
    y: (cell.row + 0.15 + Math.random() * 0.7) / 2,
    ripple: {
      strength: 1.6 + Math.random() * 1.2,
      speed: 420 + Math.random() * 120,
    },
  }));
}

function shuffle<T>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export interface DeskWaveGridProps {
  /** Plate column count; tiles subdivide these. */
  columns: number;
  /** False until the plate's surface is showing. */
  active: boolean;
  /** True for the rulings beat of the opening reveal; plays the intro drops. */
  intro: boolean;
  introStyle: DeskIntroStyle;
}

/**
 * DeskWaveGrid — paper tiles under the plate ruling that ripple as the
 * pointer crosses the desk, and on their own as the plate opens.
 * Mounted in the plate underlay: above DeskLight, under the column rules.
 * Off entirely under reduced motion.
 */
export default function DeskWaveGrid({
  columns,
  active,
  intro,
  introStyle,
}: DeskWaveGridProps) {
  const reducedMotion = useReducedMotion();
  const enabled = active && !reducedMotion;
  const { canvasRef, drop } = useWaveGrid(DESK_WAVE, columns, enabled);

  useEffect(() => {
    if (!intro || !enabled) return;
    const timers = introDrops(introStyle).map((d) =>
      window.setTimeout(() => drop(d.x, d.y, d.ripple), d.at),
    );
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [intro, enabled, introStyle, drop]);

  return (
    <div className={styles.field} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
