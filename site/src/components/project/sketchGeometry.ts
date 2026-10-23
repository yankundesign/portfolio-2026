/**
 * Hand-drawn geometry for the case-study diagrams.
 *
 * Matches the deck's drawings: single ink strokes with a slow wobble
 * (about ±1px on a 1920 slide, so under a pixel here), soft uneven
 * corners, rings that overshoot where the pen lifts. Everything is seeded,
 * so a shape draws the same way on every render and every visit.
 *
 * Pure functions: sizes in, SVG path data out.
 */

export type Point = readonly [number, number];
export type Rand = () => number;

/** FNV-1a — a stable numeric seed from a readable key. */
export function seedFrom(key: string): number {
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** mulberry32 — small, fast, deterministic. */
export function randomFrom(key: string): Rand {
  let a = seedFrom(key);
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const between = (rand: Rand, min: number, max: number) => min + rand() * (max - min);
const f = (n: number) => Math.round(n * 100) / 100;

/** A slow wobble along arc length: two long sines, random phase. */
function makeWobble(rand: Rand, amp: number) {
  const l1 = between(rand, 150, 280);
  const l2 = between(rand, 45, 80);
  const p1 = rand() * Math.PI * 2;
  const p2 = rand() * Math.PI * 2;
  return (s: number) =>
    amp * (0.75 * Math.sin((s / l1) * Math.PI * 2 + p1) + 0.25 * Math.sin((s / l2) * Math.PI * 2 + p2));
}

/** Catmull-Rom through the points, written as cubic Béziers. */
export function smoothPath(points: readonly Point[], closed = false): string {
  const n = points.length;
  if (n < 2) return '';
  const at = (i: number): Point =>
    closed ? points[((i % n) + n) % n] : points[Math.min(Math.max(i, 0), n - 1)];
  let d = `M${f(points[0][0])} ${f(points[0][1])}`;
  const segments = closed ? n : n - 1;
  for (let i = 0; i < segments; i++) {
    const p0 = at(i - 1);
    const p1 = at(i);
    const p2 = at(i + 1);
    const p3 = at(i + 2);
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C${f(c1x)} ${f(c1y)} ${f(c2x)} ${f(c2y)} ${f(p2[0])} ${f(p2[1])}`;
  }
  return closed ? `${d}Z` : d;
}

export interface LineOptions {
  /** Wobble amplitude in px. */
  amp?: number;
  /** Distance between sampled points in px. */
  step?: number;
}

/** A straight line, drawn by hand. Ends stay put so it meets what it joins. */
export function sketchLine(a: Point, b: Point, rand: Rand, { amp = 0.8, step = 10 }: LineOptions = {}) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy);
  if (len === 0) return '';
  const nx = -dy / len;
  const ny = dx / len;
  const wobble = makeWobble(rand, amp);
  const n = Math.max(2, Math.ceil(len / step));
  const points: Point[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const s = len * t;
    const taper = Math.min(1, t * 5, (1 - t) * 5);
    const off = wobble(s) * taper;
    points.push([a[0] + dx * t + nx * off, a[1] + dy * t + ny * off]);
  }
  return smoothPath(points);
}

/** An open arrowhead (a V) at `tip`, pointing along `angle` radians. */
export function sketchArrowhead(tip: Point, angle: number, rand: Rand, size = 7) {
  const spread = between(rand, 0.48, 0.58);
  const back = (side: number): Point => [
    tip[0] - Math.cos(angle + side * spread) * size,
    tip[1] - Math.sin(angle + side * spread) * size,
  ];
  const l = back(-1);
  const r = back(1);
  return `M${f(l[0])} ${f(l[1])}L${f(tip[0])} ${f(tip[1])}L${f(r[0])} ${f(r[1])}`;
}

export interface RectOptions {
  amp?: number;
  /** Corner radius range in px. */
  radius?: readonly [number, number];
  /** How far each corner drifts from true, in px. */
  drift?: number;
  /** Closed outline (for fills) vs. an open stroke that overlaps where it started. */
  closed?: boolean;
  /** Outset (+) or inset (−) from the box edge, in px. */
  inset?: number;
}

/** A box outline with soft, uneven corners — the deck's hand-drawn frame. */
export function sketchRect(
  width: number,
  height: number,
  rand: Rand,
  { amp = 0.8, radius = [4, 9], drift = 1.2, closed = false, inset = 0 }: RectOptions = {},
) {
  const x0 = inset;
  const y0 = inset;
  const x1 = width - inset;
  const y1 = height - inset;
  const maxR = Math.max(1, Math.min(x1 - x0, y1 - y0) / 3);
  const r = () => Math.min(maxR, between(rand, radius[0], radius[1]));
  const d = () => between(rand, -drift, drift);

  // Corners clockwise from top-left, each nudged and with its own radius.
  const corners = [
    { x: x0 + d(), y: y0 + d(), r: r(), a0: Math.PI, a1: Math.PI * 1.5 },
    { x: x1 + d(), y: y0 + d(), r: r(), a0: Math.PI * 1.5, a1: Math.PI * 2 },
    { x: x1 + d(), y: y1 + d(), r: r(), a0: 0, a1: Math.PI * 0.5 },
    { x: x0 + d(), y: y1 + d(), r: r(), a0: Math.PI * 0.5, a1: Math.PI },
  ];

  // Each corner's arc centre sits r inside the box, toward the middle.
  const centre = (i: number): Point => {
    const c = corners[i];
    const sx = i === 0 || i === 3 ? 1 : -1;
    const sy = i === 0 || i === 1 ? 1 : -1;
    return [c.x + sx * c.r, c.y + sy * c.r];
  };

  // Base perimeter: each corner arc, then the straight run to the next.
  const base: { p: Point; n: Point }[] = [];
  corners.forEach((c, i) => {
    const [cx, cy] = centre(i);
    for (let k = 0; k <= 3; k++) {
      const a = c.a0 + ((c.a1 - c.a0) * k) / 3;
      base.push({ p: [cx + Math.cos(a) * c.r, cy + Math.sin(a) * c.r], n: [Math.cos(a), Math.sin(a)] });
    }
    const j = (i + 1) % 4;
    const next = corners[j];
    const [ncx, ncy] = centre(j);
    const end: Point = [ncx + Math.cos(next.a0) * next.r, ncy + Math.sin(next.a0) * next.r];
    const start = base[base.length - 1].p;
    const len = Math.hypot(end[0] - start[0], end[1] - start[1]);
    const steps = Math.max(1, Math.floor(len / 12));
    const normal: Point = [Math.cos(c.a1), Math.sin(c.a1)];
    for (let k = 1; k < steps; k++) {
      const t = k / steps;
      base.push({ p: [start[0] + (end[0] - start[0]) * t, start[1] + (end[1] - start[1]) * t], n: normal });
    }
  });

  const wobble = makeWobble(rand, amp);
  let s = 0;
  const points: Point[] = base.map((b, i) => {
    if (i > 0) s += Math.hypot(b.p[0] - base[i - 1].p[0], b.p[1] - base[i - 1].p[1]);
    const off = wobble(s);
    return [b.p[0] + b.n[0] * off, b.p[1] + b.n[1] * off];
  });

  if (closed) return smoothPath(points, true);

  // Open stroke: start somewhere along the top, go all the way round, and
  // run a little past the start — where a pen would lift.
  const start = Math.floor(between(rand, 4, Math.max(5, points.length / 4)));
  const overlap = 1;
  const run: Point[] = [];
  for (let k = 0; k <= points.length + overlap; k++) run.push(points[(start + k) % points.length]);
  const last = run[run.length - 1];
  run[run.length - 1] = [last[0], last[1] + between(rand, -1.2, 1.2)];
  return smoothPath(run);
}

/** A ring, drawn in one stroke that overshoots its start. */
export function sketchRing(cx: number, cy: number, r: number, rand: Rand, closed = false) {
  const a0 = rand() * Math.PI * 2;
  const p1 = rand() * Math.PI * 2;
  const p2 = rand() * Math.PI * 2;
  const sweep = closed ? Math.PI * 2 : Math.PI * 2 * between(rand, 1.06, 1.12);
  const n = closed ? 24 : 28;
  const points: Point[] = [];
  for (let i = 0; i < (closed ? n : n + 1); i++) {
    const t = i / n;
    const a = a0 + sweep * t;
    const rr =
      r * (1 + 0.045 * Math.sin(a * 2 + p1) + 0.025 * Math.sin(a * 3 + p2)) + (closed ? 0 : t * r * 0.05);
    points.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]);
  }
  return smoothPath(points, closed);
}

/** A straight polyline with every segment drawn by hand — for box faces. */
export function sketchPolyline(points: readonly Point[], rand: Rand, opts: LineOptions = {}) {
  const parts: string[] = [];
  for (let i = 0; i < points.length - 1; i++) parts.push(sketchLine(points[i], points[i + 1], rand, opts));
  return parts.join('');
}
