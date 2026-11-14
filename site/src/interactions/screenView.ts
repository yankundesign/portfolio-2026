/**
 * ScreenView — a screen from a case-study board, brought up to the glass.
 *
 * One construction rule:
 *  - The screen grows out of its own place on the board to twice its size on
 *    the page, never past its capture's own pixels, and never smaller than the
 *    window allows.
 *  - Where that is larger than the window, the screen moves under the pointer:
 *    the pointer's place in the window is the reader's place on the screen. On
 *    touch it scrolls instead.
 *  - Leaving sends it back to where it came from: a click, Esc, the wheel, or
 *    the page scrolling under it.
 *
 * The React side (ScreenInspector) renders the field, the image and the label;
 * this class measures, animates and listens. Nothing here re-renders React.
 */

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';
const OPEN_MS = 520;
const CLOSE_MS = 400;
/** The share of the window, at each side, where the screen has already reached its edge. */
const EDGE = 0.14;

const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export interface ScreenViewParts {
  field: HTMLElement;
  scrim: HTMLElement;
  img: HTMLElement;
  label: HTMLElement;
}

export interface ScreenViewOptions {
  /** The screen on the board: where the view comes from and goes back to. */
  from: HTMLElement;
  /** The capture's own pixels. */
  size: readonly [number, number];
  /** Where the reader clicked, in the window; null when opened by keyboard. */
  at: { x: number; y: number } | null;
  reducedMotion: boolean;
  onClosed: () => void;
}

export class ScreenView {
  private parts: ScreenViewParts;
  private opts: ScreenViewOptions;
  private fine: boolean;
  private W = 0;
  private H = 0;
  private m = 24;
  private cur = { x: 0, y: 0 };
  private tgt = { x: 0, y: 0 };
  private raf = 0;
  private settled = false;
  private closing = false;
  private done = false;

  constructor(parts: ScreenViewParts, opts: ScreenViewOptions) {
    this.parts = parts;
    this.opts = opts;
    this.fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    this.open();
  }

  private open() {
    const { field, scrim, img, label } = this.parts;
    const { from, size, at, reducedMotion } = this.opts;
    const r = from.getBoundingClientRect();
    const vw = window.innerWidth, vh = window.innerHeight;
    const m = this.m = this.fine ? 24 : 16;
    const aspect = size[1] / size[0];
    const fit = Math.min(vw - 2 * m, (vh - 2 * m) / aspect);
    const W = this.W = Math.max(r.width, Math.min(size[0], Math.max(2 * r.width, fit)));
    const H = this.H = W * aspect;
    img.style.width = `${W}px`;
    img.style.height = `${H}px`;
    field.dataset.pan = W > vw - 2 * m || H > vh - 2 * m ? 'true' : 'false';

    // the reader's place on the screen: the point they clicked
    const u = at ? clamp((at.x - r.left) / r.width) : 0.5;
    const v = at ? clamp((at.y - r.top) / r.height) : 0.5;

    if (this.fine) {
      field.dataset.mode = 'pointer';
      this.aim(at ? at.x : vw / 2, at ? at.y : vh / 2);
      this.cur = { ...this.tgt };
      this.write();
      if (at) this.moveLabel(at.x, at.y);
      label.dataset.on = at ? 'true' : 'parked';
    } else {
      field.dataset.mode = 'scroll';
      label.dataset.on = 'parked';
      field.scrollLeft = u * W + m - vw / 2;
      field.scrollTop = v * H + m - vh / 2;
    }

    from.style.visibility = 'hidden';
    field.focus({ preventScroll: true });

    if (reducedMotion || !this.fine) {
      field.animate([{ opacity: 0 }, { opacity: 1 }], { duration: reducedMotion ? 180 : 240, easing: 'ease-out' });
      this.settled = true;
    } else {
      scrim.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 260, easing: 'ease-out' });
      const grow = img.animate(
        [
          { transform: `translate3d(${r.left}px, ${r.top}px, 0) scale(${r.width / W})` },
          { transform: `translate3d(${this.cur.x}px, ${this.cur.y}px, 0) scale(1)` },
        ],
        { duration: OPEN_MS, easing: EASE },
      );
      grow.finished.then(() => { this.settled = true; this.loop(); }).catch(() => {});
    }

    window.addEventListener('keydown', this.onKey);
    window.addEventListener('resize', this.close);
    document.body.addEventListener('scroll', this.close, { passive: true });
    window.addEventListener('scroll', this.close, { passive: true });
    field.addEventListener('click', this.close);
    if (this.fine) {
      field.addEventListener('pointermove', this.onMove);
      field.addEventListener('wheel', this.close, { passive: true });
    }
  }

  /** The pointer's place in the window sets where the screen sits. */
  private aim(px: number, py: number) {
    const vw = window.innerWidth, vh = window.innerHeight, m = this.m;
    const along = (p: number, view: number, len: number) =>
      len <= view - 2 * m
        ? (view - len) / 2
        : lerp(m, view - len - m, clamp((p - EDGE * view) / ((1 - 2 * EDGE) * view)));
    this.tgt = { x: along(px, vw, this.W), y: along(py, vh, this.H) };
  }

  private write() {
    this.parts.img.style.transform = `translate3d(${this.cur.x.toFixed(1)}px, ${this.cur.y.toFixed(1)}px, 0)`;
  }

  private moveLabel(x: number, y: number) {
    this.parts.label.style.translate = `${x}px ${y}px`;
  }

  private onMove = (e: PointerEvent) => {
    if (this.closing) return;
    this.aim(e.clientX, e.clientY);
    this.moveLabel(e.clientX, e.clientY);
    this.parts.label.dataset.on = 'true';
    if (this.settled) this.loop();
  };

  private loop() {
    if (this.raf || this.closing) return;
    const frame = () => {
      this.raf = 0;
      const dx = this.tgt.x - this.cur.x, dy = this.tgt.y - this.cur.y;
      if (Math.abs(dx) < 0.2 && Math.abs(dy) < 0.2) {
        this.cur = { ...this.tgt };
        this.write();
        return;
      }
      this.cur.x += dx * 0.16;
      this.cur.y += dy * 0.16;
      this.write();
      this.raf = requestAnimationFrame(frame);
    };
    this.raf = requestAnimationFrame(frame);
  }

  private onKey = (e: KeyboardEvent) => {
    if (e.repeat) return;
    if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.close();
    }
  };

  /** Send the screen back to its place on the board. */
  close = (): void => {
    if (this.closing) return;
    this.closing = true;
    cancelAnimationFrame(this.raf);
    this.raf = 0;
    const { field, scrim, img, label } = this.parts;
    const { from, reducedMotion } = this.opts;
    label.dataset.on = 'false';
    field.style.pointerEvents = 'none';

    const finish = () => this.finish();
    if (reducedMotion || !this.fine) {
      field.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 180, easing: 'ease-out', fill: 'forwards' })
        .finished.then(finish).catch(finish);
      return;
    }
    const r = from.getBoundingClientRect();
    scrim.animate([{ opacity: 1 }, { opacity: 0 }], { duration: CLOSE_MS, easing: 'ease-out', fill: 'forwards' });
    img.animate(
      [
        { transform: getComputedStyle(img).transform },
        { transform: `translate3d(${r.left}px, ${r.top}px, 0) scale(${r.width / this.W})` },
      ],
      { duration: CLOSE_MS, easing: EASE, fill: 'forwards' },
    ).finished.then(finish).catch(finish);
  };

  private finish() {
    if (this.done) return;
    this.done = true;
    const { from, onClosed } = this.opts;
    from.style.visibility = '';
    from.closest('button')?.focus({ preventScroll: true });
    onClosed();
  }

  destroy(): void {
    const { field } = this.parts;
    cancelAnimationFrame(this.raf);
    window.removeEventListener('keydown', this.onKey);
    window.removeEventListener('resize', this.close);
    document.body.removeEventListener('scroll', this.close);
    window.removeEventListener('scroll', this.close);
    field.removeEventListener('click', this.close);
    field.removeEventListener('pointermove', this.onMove);
    field.removeEventListener('wheel', this.close);
    this.opts.from.style.visibility = '';
  }
}
