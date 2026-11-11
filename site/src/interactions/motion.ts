/**
 * Small motion utilities for the homepage notebook: cubic-bezier easing,
 * a cancellable rAF tween, and clamp / lerp. No library: the choreography is
 * two numbers (camera t, cover p) driven from one clock.
 */

export const clamp = (x: number, a = 0, b = 1): number => Math.min(b, Math.max(a, x));
export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

export type Easing = (x: number) => number;

export function bezier(x1: number, y1: number, x2: number, y2: number): Easing {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  const sx = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sy = (t: number) => ((ay * t + by) * t + cy) * t;
  const dx = (t: number) => (3 * ax * t + 2 * bx) * t + cx;
  return (x) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 8; i++) {
      const e = sx(t) - x;
      if (Math.abs(e) < 1e-5) return sy(t);
      const d = dx(t);
      if (Math.abs(d) < 1e-6) break;
      t -= e / d;
    }
    let lo = 0, hi = 1;
    t = x;
    for (let i = 0; i < 24; i++) {
      if (sx(t) < x) lo = t; else hi = t;
      t = (lo + hi) / 2;
    }
    return sy(t);
  };
}

export const ease = {
  /** Camera push — matches the earlier live transition. */
  push: bezier(0.5, 0, 0.1, 1),
  /** Cover swing. */
  swing: bezier(0.45, 0, 0.4, 1),
  closeSwing: bezier(0.45, 0, 0.65, 1),
  paper: bezier(0.4, 0, 0.2, 1),
  linear: (x: number) => x,
};

export interface Tween {
  promise: Promise<void>;
  cancel: () => void;
}

/** Runs onUpdate(k) for k in 0..1 over `duration` ms. Cancel stops it where it is. */
export function tween(duration: number, onUpdate: (k: number) => void): Tween {
  let raf = 0;
  let done: () => void = () => {};
  const promise = new Promise<void>((resolve) => { done = resolve; });
  const start = performance.now();
  const frame = (now: number) => {
    const k = clamp((now - start) / duration);
    onUpdate(k);
    if (k < 1) raf = requestAnimationFrame(frame);
    else done();
  };
  raf = requestAnimationFrame(frame);
  return { promise, cancel: () => { cancelAnimationFrame(raf); done(); } };
}
