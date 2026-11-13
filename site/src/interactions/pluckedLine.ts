import { clamp } from './motion';

/**
 * PluckedLine — a hairline that behaves like a string. The homepage's rules are
 * all built this way: the top bar's, and the four under the index.
 *
 * One construction rule:
 *  - The cursor crossing the line plucks it where it crosses, in the direction
 *    it was moving, harder the faster it crossed.
 *  - It rings with the cover line's spring, played in time: e^(−4.4t)·cos(2π·3.2t).
 *  - The displacement falls off as a Gaussian around the pluck, and the string
 *    is pinned at both ends: it can't move at its ends and is free `PIN` px in.
 *
 * Several plucks add up, so sweeping across a set of lines strums them. The
 * same `d` goes to every path given (a line and, under the index, its ink).
 * Idle, it writes nothing.
 */

export const SPRING = { decay: 4.4, freq: 3.2 };
const LIFE_MS = 1400;
const PIN = 48;

/** How a line answers a pluck: the Gaussian's width, and the amplitude per px/ms of crossing speed. */
export interface StringFeel { spread: number; gain: number; min: number; max: number; step: number }

interface Pluck { x: number; amp: number; t0: number }

const smooth = (t: number) => { const u = clamp(t, 0, 1); return u * u * (3 - 2 * u); };

export class PluckedLine {
  /** The line's start and its y, in viewport px; its length; its y inside its own svg. */
  private left = 0;
  private vy = 0;
  private width = 0;
  private y = 0;
  private plucks: Pluck[] = [];
  private flat = false;
  /** While something else writes the path (the top rule drawing itself in). */
  hold = false;

  private paths: SVGPathElement[];
  private feel: StringFeel;

  constructor(paths: SVGPathElement[], feel: StringFeel) {
    this.paths = paths;
    this.feel = feel;
  }

  place(left: number, vy: number, width: number, y: number): void {
    this.left = left; this.vy = vy; this.width = width; this.y = y;
    this.flat = false;
  }

  get length(): number { return this.width; }
  get line(): number { return this.y; }

  /** The pointer moved from (x0, y0) to (x1, y1) in `ms`: pluck the line if it crossed it. */
  cross(x0: number, y0: number, x1: number, y1: number, ms: number, now: number): boolean {
    if ((y0 - this.vy) * (y1 - this.vy) >= 0) return false;
    const x = x0 + ((x1 - x0) * (this.vy - y0)) / (y1 - y0) - this.left;
    if (x <= 0 || x >= this.width) return false;
    const v = Math.abs(y1 - y0) / Math.max(1, ms); // px per ms
    const { gain, min, max } = this.feel;
    this.pluck(x, Math.sign(y1 - y0) * clamp(v * gain, min, max), now);
    return true;
  }

  pluck(x: number, amp: number, now = performance.now()): void {
    this.plucks.push({ x, amp, t0: now });
    if (this.plucks.length > 6) this.plucks.shift();
  }

  /** Writes this frame's shape, or the flat line once, when it has stopped. */
  step(now: number): void {
    if (this.hold || !this.width) return;
    for (let i = this.plucks.length - 1; i >= 0; i--) if (now - this.plucks[i].t0 > LIFE_MS) this.plucks.splice(i, 1);
    const W = this.width, y0 = this.y;
    if (this.plucks.length) {
      const { spread, step } = this.feel;
      let d = '';
      for (let x = 0; ; x = Math.min(W, x + step)) {
        let y = 0;
        for (const p of this.plucks) {
          const s = Math.max(0, now - p.t0) / 1000;
          y += p.amp * Math.exp(-SPRING.decay * s) * Math.cos(2 * Math.PI * SPRING.freq * s) * Math.exp(-(((x - p.x) / spread) ** 2));
        }
        y *= smooth(x / PIN) * smooth((W - x) / PIN);
        d += `${d ? ' L' : 'M'}${+x.toFixed(1)} ${(y0 + y).toFixed(2)}`;
        if (x >= W) break;
      }
      this.write(d);
      this.flat = false;
    } else if (!this.flat) {
      this.write(`M0 ${y0} L${+W.toFixed(1)} ${y0}`);
      this.flat = true;
    }
  }

  private write(d: string) {
    for (const p of this.paths) p.setAttribute('d', d);
  }
}
