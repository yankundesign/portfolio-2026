import { CursorLabel } from './cursorLabel';
import { clamp } from './motion';
import { MonographIndex } from './monographIndex';
import type { NotebookEngine } from './notebookEngine';
import { PluckedLine, type StringFeel } from './pluckedLine';

/**
 * MonographPointer — the homepage's response to the cursor, in one frame loop.
 *
 *  - The lamp: a fixed-size light moved by transform (the GPU moves it; nothing
 *    repaints, and nothing is written on the page root).
 *  - The notebook: tilts toward the cursor, its shadow falls away from it. How
 *    much it is “being pointed at” eases in and out (~400 ms) instead of
 *    switching at its edge.
 *  - “Open →”: over the notebook the label is the cursor (CursorLabel); the
 *    cover cracks a few degrees.
 *  - The name: each letter's weight and softness swell under the cursor. Letter
 *    centres are measured once (after the intro, on resize), never inside the
 *    write loop: reading a box after writing a weight forced ~9 layouts a frame.
 *    Off until the intro has landed and the real pointer has moved; then it
 *    fades in over 400 ms.
 *  - The rule under the top bar rings where the cursor crosses it, with the
 *    cover line's own spring, played in time: e^(−4.4t)·cos(2π·3.2t)
 *    (PluckedLine).
 *  - The index (MonographIndex): its rules are strings too, its labels swell
 *    like the name, and pointing at Works cracks the cover as the book does.
 *
 * Every part writes only when its value changes; idle frames do nothing.
 * Reduced motion: no lamp, tilt, name or rule; the label still replaces the cursor.
 */

const RULE_LINE_Y = 15; // the top rule's y inside its svg (the svg sits at 48.5px: the 64px bar's border row)
const RULE_FEEL: StringFeel = { spread: 90, gain: 8, min: 2.5, max: 12, step: 4 };
const PEEK = 0.026;

interface Letter { el: HTMLElement; w: number; soft: number; ww: number; ws: number; cx: number; cy: number }

export interface MonographParts {
  slot: HTMLElement;
  name: HTMLElement;
  lamp: HTMLElement;
  rule: SVGSVGElement;
  openLabel: HTMLElement;
  index: HTMLElement;
}

export class MonographPointer {
  private engine: NotebookEngine;
  private parts: MonographParts | null = null;
  private label: CursorLabel | null = null;
  private active = false;
  private reduced = false;
  private landed = false;
  private raf = 0;
  private last = 0;

  private mx = 0;
  private my = 0;
  private lastX = 0;
  private lastY = 0;
  private lastT = 0;
  private dirty = true;
  private seen = false;
  private inside = false;
  private hover = 0;
  private nameGain = 0;
  private peeking = 0;

  private slotBox: DOMRect | null = null;
  private ruleBox: DOMRect | null = null;
  private rulePath: SVGPathElement | null = null;
  private rule: PluckedLine | null = null;
  private index: MonographIndex | null = null;
  private letters: Letter[] = [];
  private resizeT = 0;

  constructor(engine: NotebookEngine) {
    this.engine = engine;
  }

  attach(parts: MonographParts): void {
    this.parts = parts;
    this.mx = window.innerWidth / 2;
    this.my = window.innerHeight * 0.4;
    this.lastX = this.mx;
    this.lastY = this.my;
    this.rulePath = parts.rule.querySelector('path');
    this.rule = this.rulePath ? new PluckedLine([this.rulePath], RULE_FEEL) : null;
    this.index = new MonographIndex(parts.index);
    this.index.configure({ reducedMotion: this.reduced });
    this.letters = Array.from(parts.name.querySelectorAll<HTMLElement>('[data-letter]')).map((el) => ({
      el, w: 300, soft: 0, ww: 300, ws: 0, cx: 0, cy: 0,
    }));
    this.label = new CursorLabel(parts.openLabel);
    this.measure();
    window.addEventListener('pointermove', this.onMove, { passive: true });
    window.addEventListener('resize', this.onResize);
    parts.slot.addEventListener('pointerdown', this.onDown);
    document.documentElement.addEventListener('pointerleave', this.onLeaveWindow);
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.frame);
  }

  detach(): void {
    const parts = this.parts;
    window.removeEventListener('pointermove', this.onMove);
    window.removeEventListener('resize', this.onResize);
    parts?.slot.removeEventListener('pointerdown', this.onDown);
    document.documentElement.removeEventListener('pointerleave', this.onLeaveWindow);
    cancelAnimationFrame(this.raf);
    window.clearTimeout(this.resizeT);
    this.label?.destroy();
    this.label = null;
    this.index?.destroy();
    this.index = null;
    this.parts = null;
  }

  /** active: the book is closed and the screen is wide. */
  configure(opts: { active: boolean; reducedMotion: boolean }): void {
    const wasActive = this.active;
    this.active = opts.active;
    this.reduced = opts.reducedMotion;
    this.index?.configure({ reducedMotion: this.reduced });
    if (!this.active) {
      this.setInside(false);
      this.index?.locate(-1, -1);
    } else if (!wasActive) {
      // back from the open book under a pointer that may not move: re-check where it is
      this.measure();
      this.dirty = true;
      // (only a real pointer: the default position, the screen's centre, is on the book)
      if (this.seen) {
        this.setInside(this.pointInSlot(this.mx, this.my));
        this.index?.locate(this.mx, this.my);
      }
    }
  }

  /** The intro has landed: measure the letters at rest and let the name respond. */
  land(): void {
    this.landed = true;
    this.measure();
  }

  /** H3: the rule draws itself across, then rings once from the middle. */
  drawRule(ms: number): void {
    this.measure(); // the faces are in now: the index has its real height
    const path = this.rulePath, box = this.ruleBox, rule = this.rule;
    if (!path || !box || !rule || this.reduced) return;
    rule.hold = true;
    path.setAttribute('d', `M0 ${RULE_LINE_Y} L${box.width.toFixed(1)} ${RULE_LINE_Y}`);
    path.setAttribute('pathLength', '1');
    const draw = path.animate(
      [{ strokeDasharray: '1 1', strokeDashoffset: 1 }, { strokeDasharray: '1 1', strokeDashoffset: 0 }],
      { duration: ms, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
    );
    const done = () => {
      path.removeAttribute('pathLength');
      rule.hold = false;
    };
    draw.finished.then(() => {
      done();
      rule.pluck(box.width / 2, 5);
    }, done);
  }

  // ─── measurement (never inside the frame loop's writes) ───

  private measure() {
    const parts = this.parts;
    if (!parts) return;
    this.slotBox = parts.slot.getBoundingClientRect();
    const box = (this.ruleBox = parts.rule.getBoundingClientRect());
    this.rule?.place(box.left, box.top + RULE_LINE_Y, box.width, RULE_LINE_Y);
    this.index?.measure();
    if (this.landed) this.measureLetters();
  }

  /**
   * Letter centres at rest, from layout offsets: they ignore transforms, so the
   * letters can be measured mid-rise or while their line is slid aside for the
   * open book. (.frame is fixed at 0,0; .name and .line are positioned.)
   */
  private measureLetters() {
    this.letters.forEach((L) => {
      const line = L.el.offsetParent as HTMLElement | null;
      const name = line?.offsetParent as HTMLElement | null;
      const ox = (name?.offsetLeft ?? 0) + (line?.offsetLeft ?? 0);
      const oy = (name?.offsetTop ?? 0) + (line?.offsetTop ?? 0);
      L.cx = ox + L.el.offsetLeft + L.el.offsetWidth / 2;
      L.cy = oy + L.el.offsetTop + L.el.offsetHeight * 0.55;
    });
  }

  private onResize = () => {
    window.clearTimeout(this.resizeT);
    this.resizeT = window.setTimeout(() => this.measure(), 120);
  };

  // ─── input ───

  private pointInSlot(x: number, y: number) {
    const r = this.slotBox;
    return !!r && x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
  }

  private onMove = (e: PointerEvent) => {
    const now = performance.now(), x = e.clientX, y = e.clientY;
    if (this.active && !this.reduced && this.seen) {
      // every rule the pointer crossed since the last event is plucked where it crossed
      const ms = now - this.lastT;
      this.rule?.cross(this.lastX, this.lastY, x, y, ms, now);
      this.index?.cross(this.lastX, this.lastY, x, y, ms, now);
    }
    this.mx = x; this.my = y;
    this.lastX = x; this.lastY = y; this.lastT = now;
    this.dirty = true;
    this.seen = true;
    if (this.active) {
      this.setInside(this.pointInSlot(x, y));
      this.index?.locate(x, y);
    }
  };

  private onDown = () => { if (this.inside) this.label?.press(true); };
  private onLeaveWindow = () => {
    this.setInside(false);
    this.index?.locate(-1, -1);
  };

  private setInside(inside: boolean) {
    if (inside === this.inside) return;
    this.inside = inside;
    if (inside) this.label?.show(this.mx, this.my);
    else this.label?.hide();
  }

  /** The cover cracks while the book is pointed at, or the index's Works row is. */
  private syncPeek() {
    const p = this.active && (this.inside || this.index?.atBook) ? PEEK : 0;
    if (p === this.peeking) return;
    this.peeking = p;
    this.engine.peek(p);
  }

  // ─── the frame ───

  private frame = (now: number) => {
    const parts = this.parts;
    if (!parts) return;
    const dt = Math.min(0.05, Math.max(0.001, (now - this.last) / 1000));
    this.last = now;
    const live = this.active && !this.reduced;

    // how much the book is being pointed at, eased (time constant 130 ms)
    const goal = this.inside && live ? 1 : 0;
    const hoverMoving = Math.abs(goal - this.hover) > 0.001;
    this.hover = hoverMoving ? this.hover + (goal - this.hover) * (1 - Math.exp(-dt / 0.13)) : goal;

    if (live && this.dirty) parts.lamp.style.transform = `translate3d(${this.mx}px, ${this.my}px, 0)`;

    if (live && (this.dirty || hoverMoving) && this.slotBox) {
      const r = this.slotBox, vw = window.innerWidth, vh = window.innerHeight, h = this.hover;
      const dx = (this.mx - (r.left + r.width / 2)) / vw;
      const dy = (this.my - (r.top + r.height / 2)) / vh;
      this.engine.aim({
        lx: clamp(-dx * 70, -40, 40),
        ly: clamp(18 - dy * 30, 6, 34),
        tiltY: (3 + 6 * h) * clamp(dx * 2, -1, 1),
        tiltX: (-2 - 5 * h) * clamp(dy * 2, -1, 1),
        lift: 0.025 * h,
        blur: 22 + 8 * h,
        shadow: 0.55 - 0.1 * h,
      });
    }

    if (live && this.landed && this.seen) {
      this.nameGain = Math.min(1, this.nameGain + dt / 0.4);
      const R = window.innerWidth * 0.2, k = 1 - Math.pow(1 - 0.14, dt * 60);
      for (const L of this.letters) {
        const f = Math.exp(-((Math.hypot(this.mx - L.cx, this.my - L.cy) / R) ** 2)) * this.nameGain;
        L.w += (300 + 330 * f - L.w) * k;
        L.soft += (100 * f - L.soft) * k;
        if (Math.abs(L.w - L.ww) > 0.5 || Math.abs(L.soft - L.ws) > 0.5) {
          L.ww = L.w; L.ws = L.soft;
          L.el.style.fontWeight = L.w.toFixed(0);
          L.el.style.fontVariationSettings = `'opsz' 144, 'SOFT' ${L.soft.toFixed(0)}, 'WONK' 1`;
        }
      }
    }

    this.rule?.step(now);
    this.index?.frame(now, dt, this.mx, this.my, live && this.seen);
    this.syncPeek();
    this.dirty = false;
    this.raf = requestAnimationFrame(this.frame);
  };
}
