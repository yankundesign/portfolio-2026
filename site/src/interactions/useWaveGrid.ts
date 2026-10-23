import { useEffect, useRef, type RefObject } from 'react';

/**
 * useWaveGrid — ripple field under the desk plate's column ruling.
 *
 * After franky-adl/3d-wave-grid: every few pixels of pointer travel drops a
 * ripple source. Each source sends out a ring — a Gaussian envelope riding an
 * expanding wavefront, cosine-modulated — that fades with age and distance.
 * Overlapping rings are averaged rather than stacked, so a fast sweep reads as
 * one swell instead of noise.
 *
 * The plate columns are cut into near-square paper tiles. Heights are solved
 * per tile on the CPU (a few hundred tiles; no WebGL) and drawn as a blind
 * emboss, lit from the upper-left like DeskLight's lamp: a tile standing
 * above its left or upper neighbour catches light on that edge; a tile sitting
 * below one falls into its shadow. Faces take a whisper of tone — troughs
 * in ink, crests in paper. Light is painted with --paper, which only reads
 * because it lifts DeskLight's ink wash underneath; no third colour enters.
 * A flat field draws nothing, so at rest the plate is untouched.
 */

export interface WaveGridParams {
  /** Tiles per plate column. */
  density: number;
  /** Height multiplier before clamping to ±1. */
  gain: number;
  /** Shadow length at a full height step, px. */
  lift: number;
  /** Ink alpha of a full-strength cast shadow. */
  shadow: number;
  /** Paper alpha on a full-strength lit edge. */
  light: number;
  /** Face tone at full height: paper on crests, ink in troughs. */
  tone: number;
  /** Ring expansion speed, px / s. */
  speed: number;
  /** Distance between crests, px. */
  wavelength: number;
  /** Gaussian half-width of the travelling ring, px. */
  ringWidth: number;
  /** Seconds for a ring to fall to ~37%. */
  fade: number;
  /** Drop a ripple every so often once the pointer has rested. */
  idleDrops: boolean;
}

interface RippleSource {
  x: number;
  y: number;
  age: number;
  strength: number;
  /** Per-frame cache: wavefront radius, px. */
  front: number;
  /** Per-frame cache: strength × time fade. */
  weight: number;
}

const MAX_SOURCES = 96;
/** Pointer travel between ripple sources, px. */
const SOURCE_SPACING = 10;
/** Pointer travel that earns a full-strength source, px. */
const STRENGTH_TRAVEL = 48;
const MAX_STRENGTH = 1.5;
/** Distance at which a ring has lost half its height, px. */
const ATTENUATION = 450;
/** Sources keep landing this far outside the field, px. */
const EDGE_REACH = 80;
/** Fraction of a tile each tile centre is nudged by, so rings break up. */
const JITTER = 0.2;
const IDLE_DELAY = 3;
const IDLE_INTERVAL = 1.6;
const IDLE_STRENGTH = 0.8;
/** A lit edge is this share of the shadow's length — light reads as a line. */
const LIGHT_SHARE = 0.35;
/** Height step at which an edge reaches full strength. */
const EDGE_RAMP = 0.12;
/** Height steps below this draw nothing. */
const MIN_STEP = 0.004;
const MAX_STEP_SECONDS = 1 / 20;
const MAX_DPR = 2;

export function useWaveGrid(
  params: WaveGridParams,
  columns: number,
  active: boolean,
): RefObject<HTMLCanvasElement | null> {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const paramsRef = useRef(params);
  const wakeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    paramsRef.current = params;
    wakeRef.current?.();
  }, [params]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!active || !canvas || !ctx) return;

    // Both inks come straight from the tokens the canvas inherits.
    const tokens = getComputedStyle(canvas);
    const ink = tokens.getPropertyValue('--ink').trim();
    const paper = tokens.getPropertyValue('--paper').trim();
    const sources: RippleSource[] = [];
    let heights = new Float32Array(0);
    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let lastTime = 0;
    let restingFor = 0;
    let sinceDrop = 0;
    let lastPointer: { x: number; y: number } | null = null;

    const addSource = (x: number, y: number, strength: number) => {
      if (sources.length >= MAX_SOURCES) sources.shift();
      sources.push({ x, y, age: 0, strength, front: 0, weight: 0 });
    };

    const render = (p: WaveGridParams) => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (sources.length === 0 || width === 0 || height === 0) return;

      const cols = Math.max(1, Math.round(columns * p.density));
      const tileW = width / cols;
      const rows = Math.max(1, Math.round(height / tileW));
      const tileH = height / rows;
      if (heights.length !== cols * rows) heights = new Float32Array(cols * rows);

      const k = (Math.PI * 2) / p.wavelength;
      const ring2 = p.ringWidth * p.ringWidth;
      const reach = p.ringWidth * 3;
      const jitter = JITTER * tileW;
      for (const s of sources) {
        s.front = p.speed * s.age;
        s.weight = s.strength * Math.exp(-s.age / p.fade);
      }

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const cx = (i + 0.5) * tileW + hash(i, j, 1) * jitter;
          const cy = (j + 0.5) * tileH + hash(i, j, 2) * jitter;
          let sum = 0;
          let total = 0;
          for (const s of sources) {
            const dx = cx - s.x;
            const dy = cy - s.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const rel = dist - s.front;
            if (rel > reach || rel < -reach) continue;
            const w =
              (s.weight * Math.exp(-(rel * rel) / ring2)) /
              (1 + dist / ATTENUATION);
            sum += w * Math.cos(k * rel);
            total += w;
          }
          const h = (sum / Math.max(total, 1)) * p.gain;
          heights[j * cols + i] = h > 1 ? 1 : h < -1 ? -1 : h;
        }
      }

      // Tile edges snap to device pixels so neighbouring fills never seam.
      const xs = snapEdges(cols, tileW, dpr);
      const ys = snapEdges(rows, tileH, dpr);

      // Faces: troughs darken toward ink, crests lift toward paper.
      if (p.tone > 0) {
        for (let j = 0; j < rows; j++) {
          for (let i = 0; i < cols; i++) {
            const h = heights[j * cols + i];
            if (Math.abs(h) <= MIN_STEP) continue;
            ctx.fillStyle = h > 0 ? paper : ink;
            ctx.globalAlpha = Math.abs(h) * p.tone;
            ctx.fillRect(xs[i], ys[j], xs[i + 1] - xs[i], ys[j + 1] - ys[j]);
          }
        }
      }

      // Edges: each tile settles its left and upper boundary. Standing above
      // the neighbour, the edge faces the lamp and catches a thin light;
      // sitting below, the neighbour's wall casts a soft two-step shadow.
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const index = j * cols + i;
          const h = heights[index];
          const x = xs[i];
          const y = ys[j];
          const w = xs[i + 1] - x;
          const th = ys[j + 1] - y;

          const stepLeft = h - (i > 0 ? heights[index - 1] : 0);
          const stepUp = h - (j > 0 ? heights[index - cols] : 0);
          drawEdge(p, stepLeft, x, y, w, th, true);
          drawEdge(p, stepUp, x, y, w, th, false);
        }
      }
      ctx.globalAlpha = 1;
    };

    const drawEdge = (
      p: WaveGridParams,
      step: number,
      x: number,
      y: number,
      w: number,
      th: number,
      vertical: boolean,
    ) => {
      const size = Math.abs(step);
      if (size <= MIN_STEP) return;
      // Like a real cast shadow, an edge's darkness barely depends on the
      // step — only its length does. Strength saturates early so shallow
      // steps still draw a crisp hairline instead of fading out twice.
      const strength = Math.min(size / EDGE_RAMP, 1);
      const lift = p.lift * dpr;
      const span = vertical ? w : th;

      if (step > 0) {
        const len = Math.min(Math.max(size * lift * LIGHT_SHARE, 1), span);
        ctx.fillStyle = paper;
        ctx.globalAlpha = p.light * strength;
        if (vertical) ctx.fillRect(x, y, len, th);
        else ctx.fillRect(x, y, w, len);
        return;
      }

      const len = Math.min(Math.max(size * lift, 1), span);
      ctx.fillStyle = ink;
      ctx.globalAlpha = p.shadow * strength * 0.5;
      if (vertical) {
        ctx.fillRect(x, y, len, th);
        ctx.fillRect(x, y, len * 0.5, th);
      } else {
        ctx.fillRect(x, y, w, len);
        ctx.fillRect(x, y, w, len * 0.5);
      }
    };

    const frame = (now: number) => {
      const p = paramsRef.current;
      const dt = Math.min((now - lastTime) / 1000, MAX_STEP_SECONDS);
      lastTime = now;

      const expiry = p.fade * 4;
      for (let i = sources.length - 1; i >= 0; i--) {
        sources[i].age += dt;
        if (sources[i].age > expiry) sources.splice(i, 1);
      }

      restingFor += dt;
      if (p.idleDrops && restingFor > IDLE_DELAY) {
        sinceDrop += dt;
        if (sinceDrop > IDLE_INTERVAL) {
          sinceDrop = 0;
          addSource(
            width * (0.25 + Math.random() * 0.5),
            height * (0.25 + Math.random() * 0.5),
            IDLE_STRENGTH + Math.random() * 0.2,
          );
        }
      }

      render(p);
      raf =
        sources.length > 0 || p.idleDrops ? requestAnimationFrame(frame) : 0;
    };

    const wake = () => {
      if (raf) return;
      lastTime = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      render(paramsRef.current);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      restingFor = 0;
      sinceDrop = 0;

      const outside =
        x < -EDGE_REACH ||
        y < -EDGE_REACH ||
        x > rect.width + EDGE_REACH ||
        y > rect.height + EDGE_REACH;
      if (outside || !lastPointer) {
        lastPointer = outside ? null : { x, y };
        return;
      }

      const travel = Math.sqrt(
        (x - lastPointer.x) ** 2 + (y - lastPointer.y) ** 2,
      );
      if (travel < SOURCE_SPACING) return;
      lastPointer = { x, y };
      addSource(x, y, Math.min(travel / STRENGTH_TRAVEL, MAX_STRENGTH));
      wake();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    wakeRef.current = wake;
    wake();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      wakeRef.current = null;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [active, columns]);

  return canvasRef;
}

/** Stable per-tile offset in [-0.5, 0.5]. */
function hash(i: number, j: number, seed: number): number {
  const n = Math.sin(i * 127.1 + j * 311.7 + seed * 74.7) * 43758.5453;
  return n - Math.floor(n) - 0.5;
}

function snapEdges(count: number, size: number, dpr: number): Float32Array {
  const edges = new Float32Array(count + 1);
  for (let i = 0; i <= count; i++) edges[i] = Math.round(i * size * dpr);
  return edges;
}
