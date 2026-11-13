import { clamp } from './motion';
import { PluckedLine, type StringFeel } from './pluckedLine';

/**
 * MonographIndex — the homepage's index (Works, Résumé, About, Email). It
 * answers the cursor the way the page around it does, and it runs inside
 * MonographPointer's frame loop:
 *
 *  - Strings. The index's hairlines are plucked lines, like the top bar's
 *    (PluckedLine). Crossing one plucks it where you cross, and a fast sweep
 *    down the index strums all five. A click pushes the row's own rule down.
 *  - Letters. Each label's letters swell in weight and softness under the
 *    cursor, like the name: the same Gaussian field, sized to the index. The
 *    row pointed at also gets a little heavier as a whole.
 *  - Ink. The row's rule draws in ink outward from where the cursor came in,
 *    and gathers back to where it left. By keyboard it draws in from the left
 *    and runs out to the right, toward the next row.
 *
 * Letter centres and row boxes are measured with the page (after the intro, on
 * resize), never in the write loop. Every part writes only when it changes.
 * Reduced motion: the lines stay still, the letters don't follow the cursor;
 * the row's rule fades to ink and its label gets heavier.
 */

const FEEL: StringFeel = { spread: 44, gain: 4.5, min: 1.4, max: 5, step: 3 };
const PRESS_AMP = 3.5;

/** The letters' field: horizontal and vertical radius in px (about two letters wide, one row tall). */
const RX = 26;
const RY = 22;
/** Label weight: at rest, + the row pointed at, + under the cursor. */
const W_REST = 350;
const W_ROW = 70;
const W_FIELD = 230;
/** Keyboard focus is the cursor everywhere along the word. */
const FOCUS_FIELD = 0.4;
/** The ink eases with a time constant, s, but never slower than this many rule lengths a second, so it finishes cleanly. */
const INK_TAU = 0.13;
const INK_MIN_SPEED = 1.4;

/** Ease toward the goal, at least `min` a frame, landing on it exactly. */
const approach = (x: number, goal: number, k: number, min: number) => {
  const d = goal - x, s = Math.max(Math.abs(d) * k, min);
  return Math.abs(d) <= s ? goal : x + Math.sign(d) * s;
};

interface Glyph { el: HTMLElement; cx: number; cy: number; w: number; soft: number; ww: number; ws: number }

interface Row {
  el: HTMLElement;
  top: number;
  bottom: number;
  book: boolean;
  glyphs: Glyph[];
  /** How much the row is pointed at, eased. */
  p: number;
  on: boolean;
  byKey: boolean;
  ink: SVGPathElement | null;
  /** The inked part of the rule, 0–1 along it, and where it is going. */
  a: number;
  b: number;
  ga: number;
  gb: number;
  dash: string;
  op: string;
}

export class MonographIndex {
  private root: HTMLElement;
  private lines: PluckedLine[] = [];
  private rows: Row[] = [];
  private left = 0;
  private width = 0;
  private pointed = -1;
  private focused = -1;
  private reduced = false;

  constructor(root: HTMLElement) {
    this.root = root;
    const svg = root.querySelector('svg[data-strings]');
    const path = (sel: string) => svg?.querySelector<SVGPathElement>(sel) ?? null;
    this.rows = Array.from(root.querySelectorAll<HTMLElement>('[data-index-row]')).map((el, i) => ({
      el,
      top: 0,
      bottom: 0,
      book: el.hasAttribute('data-opens-book'),
      glyphs: Array.from(el.querySelectorAll<HTMLElement>('[data-glyph]')).map((g) => ({
        el: g, cx: 0, cy: 0, w: W_REST, soft: 0, ww: W_REST, ws: 0,
      })),
      p: 0,
      on: false,
      byKey: false,
      ink: path(`[data-ink="${i}"]`),
      a: 0, b: 0, ga: 0, gb: 0,
      dash: '', op: '',
    }));
    // line 0 is the index's top rule; line i + 1 is the rule under row i, with its ink
    for (let j = 0; j <= this.rows.length; j++) {
      const ink = j > 0 ? this.rows[j - 1].ink : null;
      const paths = [path(`[data-line="${j}"]`), ink].filter((p): p is SVGPathElement => !!p);
      this.lines.push(new PluckedLine(paths, FEEL));
    }
    root.addEventListener('focusin', this.onFocusIn);
    root.addEventListener('focusout', this.onFocusOut);
    root.addEventListener('pointerdown', this.onDown);
  }

  destroy(): void {
    this.root.removeEventListener('focusin', this.onFocusIn);
    this.root.removeEventListener('focusout', this.onFocusOut);
    this.root.removeEventListener('pointerdown', this.onDown);
  }

  configure(opts: { reducedMotion: boolean }): void { this.reduced = opts.reducedMotion; }

  /** Rows, rules and letter centres, in viewport px. Lines sit on whole pixels. */
  measure(): void {
    const box = this.root.getBoundingClientRect();
    this.left = box.left;
    this.width = box.width;
    this.lines[0]?.place(box.left, box.top + 0.5, box.width, 0.5);
    this.rows.forEach((row, i) => {
      const r = row.el.getBoundingClientRect();
      row.top = r.top;
      row.bottom = r.bottom;
      const y = row.el.offsetTop + row.el.offsetHeight - 0.5;
      this.lines[i + 1]?.place(box.left, box.top + y, box.width, y);
      for (const g of row.glyphs) {
        const b = g.el.getBoundingClientRect();
        g.cx = b.left + b.width / 2;
        g.cy = b.top + b.height * 0.55;
      }
    });
  }

  /** The row under the pointer, or −1 (off the index, or the pointer has gone). */
  locate(x: number, y: number): void {
    const inX = x >= this.left && x <= this.left + this.width;
    this.pointed = inX ? this.rows.findIndex((r) => y >= r.top && y < r.bottom) : -1;
  }

  /** The pointer moved from (x0, y0) to (x1, y1) in `ms`: pluck every rule it crossed. */
  cross(x0: number, y0: number, x1: number, y1: number, ms: number, now: number): void {
    for (const line of this.lines) line.cross(x0, y0, x1, y1, ms, now);
  }

  /** The row pointed at or focused opens the notebook (Works). */
  get atBook(): boolean {
    const r = this.rows[this.pointed] ?? this.rows[this.focused];
    return !!r?.book;
  }

  frame(now: number, dt: number, mx: number, my: number, live: boolean): void {
    for (const line of this.lines) line.step(now);

    const k = this.reduced ? 1 : 1 - Math.pow(1 - 0.16, dt * 60);
    const inkK = this.reduced ? 1 : 1 - Math.exp(-dt / INK_TAU);
    const inkMin = INK_MIN_SPEED * dt;
    const px = this.width ? clamp((mx - this.left) / this.width, 0, 1) : 0;

    this.rows.forEach((row, i) => {
      const on = i === this.pointed || i === this.focused;
      if (on !== row.on) {
        row.on = on;
        if (on) {
          // ink starts as a point where the cursor came in (by keyboard: the left end)
          row.byKey = i !== this.pointed;
          const from = row.byKey ? 0 : px;
          if (row.b - row.a < 0.002) { row.a = from; row.b = from; }
          row.ga = 0; row.gb = 1;
        } else {
          // and gathers back to where it left (by keyboard: runs out to the right)
          const to = row.byKey ? 1 : px;
          row.ga = to; row.gb = to;
        }
      }
      row.a = approach(row.a, row.ga, inkK, inkMin);
      row.b = approach(row.b, row.gb, inkK, inkMin);
      this.writeInk(row);

      row.p += ((on ? 1 : 0) - row.p) * k;
      for (const g of row.glyphs) {
        let f = live ? Math.exp(-(((mx - g.cx) / RX) ** 2) - (((my - g.cy) / RY) ** 2)) : 0;
        if (i === this.focused) f = Math.max(f, FOCUS_FIELD);
        g.w += (W_REST + W_ROW * row.p + W_FIELD * f - g.w) * k;
        g.soft += (100 * f - g.soft) * k;
        if (Math.abs(g.w - g.ww) > 0.5 || Math.abs(g.soft - g.ws) > 0.5) {
          g.ww = g.w; g.ws = g.soft;
          g.el.style.fontWeight = g.w.toFixed(0);
          g.el.style.fontVariationSettings = `'opsz' 24, 'SOFT' ${g.soft.toFixed(0)}`;
        }
      }
    });
  }

  // ─── internals ───

  private writeInk(row: Row) {
    const ink = row.ink;
    if (!ink) return;
    let dash: string, op: string;
    if (this.reduced) {
      // the whole rule, cross-faded
      dash = '1 0';
      op = row.on ? '1' : '0';
    } else {
      const len = row.b - row.a;
      dash = len <= 0 ? '0 2' : `0 ${row.a.toFixed(4)} ${len.toFixed(4)} 2`;
      op = '1';
    }
    if (dash !== row.dash) { row.dash = dash; ink.style.strokeDasharray = dash; }
    if (op !== row.op) { row.op = op; ink.style.opacity = op; }
  }

  private rowOf(target: EventTarget | null): number {
    const li = target instanceof Element ? target.closest('[data-index-row]') : null;
    return li ? this.rows.findIndex((r) => r.el === li) : -1;
  }

  private onFocusIn = (e: FocusEvent) => {
    const t = e.target;
    this.focused = t instanceof Element && t.matches(':focus-visible') ? this.rowOf(t) : -1;
  };

  private onFocusOut = () => { this.focused = -1; };

  /** A click pushes the row's rule down where it lands, and it rings. */
  private onDown = (e: PointerEvent) => {
    if (this.reduced) return;
    const i = this.rowOf(e.target);
    if (i >= 0) this.lines[i + 1]?.pluck(e.clientX - this.left, PRESS_AMP);
  };
}
