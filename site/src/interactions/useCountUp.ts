import { useEffect, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface CountUpOptions {
  /** Target value to count to. */
  to: number;
  /** Whether the animation should be running. */
  active: boolean;
  /** Duration in ms. Default 900ms — weighted, not snappy. */
  duration?: number;
  /** Starting value. Default 0. */
  from?: number;
}

/**
 * Weighted count-up animation — eases to the target once `active` flips true.
 * Respects prefers-reduced-motion: snaps straight to `to`.
 *
 * Intended for the CV metric display ("3 → 18%").
 */
export function useCountUp({
  to,
  active,
  duration = 900,
  from = 0,
}: CountUpOptions): number {
  const reducedMotion = useReducedMotion();
  const [value, setValue] = useState(active ? (reducedMotion ? to : from) : from);

  useEffect(() => {
    if (!active) return;

    if (reducedMotion) {
      setValue(to);
      return;
    }

    let rafId = 0;
    const startTime = performance.now();
    const delta = to - from;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      // ease-out cubic — lines up with the rest of the motion system.
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(from + delta * eased));
      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [to, from, duration, active, reducedMotion]);

  return value;
}
