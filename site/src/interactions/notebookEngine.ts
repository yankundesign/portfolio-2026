import { COVER_FACE, SPREAD_ASPECT } from '../data/notebook';
import { clamp, ease, lerp, tween, type Tween } from './motion';

/**
 * NotebookEngine — the homepage notebook, outside React.
 *
 * One book, two numbers. `t` is the camera: 0 is the closed notebook in its
 * slot on the homepage, 1 is the open spread centred in the viewport. `p` is
 * the cover: 0 closed, 1 lying flat on the left. The engine writes transforms
 * and light straight to the DOM (no React render per frame) and reports state
 * changes so the route can step the rest of the page aside.
 *
 * Pointer-driven extras (tilt, lift, the lamp shadow) are targets the page
 * sets with `aim()`; the engine eases toward them every frame. While closed,
 * it also cracks the cover on request (`peek`, a critically damped spring) and
 * lets the ribbon tail swing as a damped pendulum when the book tilts.
 *
 * Lighting variables are written on the elements that read them (the two
 * shadows), not on the book: a custom property set on the book restyles
 * everything inside it, every frame.
 */

export type NotebookState = 'closed' | 'opening' | 'open' | 'closing';
export type NotebookPart = 'layer' | 'book' | 'pages' | 'cover' | 'frontShade' | 'backShade' | 'cast' | 'edge' | 'ribbon' | 'shadowL' | 'shadowR';

export interface NotebookExtras {
  tiltX: number;
  tiltY: number;
  lift: number;
  /** Shadow offset and softness, in book-local px. */
  lx: number;
  ly: number;
  blur: number;
  shadow: number;
}

interface Pose { tx: number; ty: number; sx: number; sy: number }

export const REST_EXTRAS: NotebookExtras = { tiltX: 0, tiltY: 0, lift: 0, lx: 0, ly: 16, blur: 22, shadow: 0.55 };

export class NotebookEngine {
  private el: Partial<Record<NotebookPart, HTMLElement>> = {};
  private refFns: Partial<Record<NotebookPart, (node: HTMLElement | null) => void>> = {};
  private slot: HTMLElement | null = null;
  private t = 0;
  private p = 0;
  private W = 0;
  private H = 0;
  private state: NotebookState = 'closed';
  private openPose: Pose = { tx: 0, ty: 0, sx: 1, sy: 1 };
  private closedPose: Pose = { tx: 0, ty: 0, sx: 1, sy: 1 };
  private cur: NotebookExtras = { ...REST_EXTRAS };
  private tgt: NotebookExtras = { ...REST_EXTRAS };
  private run: Tween | null = null;
  private raf = 0;
  private reduced = false;
  private onState: (s: NotebookState) => void = () => {};
  /** Cover crack while closed: target and velocity of p. */
  private peekTo = 0;
  private peekV = 0;
  /** The ribbon tail: angle, angular velocity, last tilt, last written angle. */
  private rib = { a: 3, v: 0, last: 0, shown: NaN };

  /** A stable callback ref for one part of the book. */
  ref(part: NotebookPart): (node: HTMLElement | null) => void {
    if (!this.refFns[part]) {
      this.refFns[part] = (node) => {
        if (node) this.el[part] = node;
        else delete this.el[part];
      };
    }
    return this.refFns[part]!;
  }

  configure(opts: { reducedMotion: boolean; onStateChange: (s: NotebookState) => void }): void {
    this.reduced = opts.reducedMotion;
    this.onState = opts.onStateChange;
  }

  getState(): NotebookState { return this.state; }

  /** Point the pointer extras somewhere; the frame loop eases toward them. */
  aim(extras: Partial<NotebookExtras>): void { Object.assign(this.tgt, extras); }

  /** Start from a lifted, shadowless pose so the book settles in on load. */
  settleFrom(extras: Partial<NotebookExtras>): void { Object.assign(this.cur, extras); }

  /** Lift the closed cover part-way (0 = shut). Eases there without bouncing. */
  peek(p: number): void { if (!this.reduced) this.peekTo = p; }

  attach(slot: HTMLElement | null): void {
    this.slot = slot;
    this.measure();
    this.setCover(this.p);
    this.render();
    window.addEventListener('resize', this.onResize);
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      let moving = false;
      const cur = this.cur as unknown as Record<string, number>;
      const tgt = this.tgt as unknown as Record<string, number>;
      for (const key in tgt) {
        const d = tgt[key] - cur[key];
        if (Math.abs(d) > 0.001) { cur[key] += d * 0.12; moving = true; } else cur[key] = tgt[key];
      }
      if (moving) this.render();
      if (this.state === 'closed' && !this.reduced) {
        this.stepPeek(dt);
        this.stepRibbon(dt);
      }
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  detach(): void {
    window.removeEventListener('resize', this.onResize);
    cancelAnimationFrame(this.raf);
    this.run?.cancel();
  }

  private onResize = () => { this.measure(); this.render(); };

  /** Critically damped spring (k 120, c 22): the cover eases open a few degrees, no bounce. */
  private stepPeek(dt: number) {
    const x = this.p, v = this.peekV;
    if (Math.abs(this.peekTo - x) < 1e-4 && Math.abs(v) < 1e-4) {
      if (x !== this.peekTo) this.setCover(this.peekTo);
      this.peekV = 0;
      return;
    }
    this.peekV = v + (-120 * (x - this.peekTo) - 22 * v) * dt;
    this.setCover(Math.max(0, x + this.peekV * dt));
  }

  /** The ribbon hangs from the spine: a damped pendulum whose pivot the tilt moves. */
  private stepRibbon(dt: number) {
    const ribbon = this.el.ribbon;
    if (!ribbon) return;
    const r = this.rib, tilt = this.cur.tiltY;
    const rest = 3 - tilt * 1.3;
    const swing = -((tilt - r.last) / dt) * 5.5; // the pivot's motion pushes the tail the other way
    r.last = tilt;
    r.v += (-38 * (r.a - rest) - 2.4 * r.v + swing) * dt;
    r.a += r.v * dt;
    if (!(Math.abs(r.a - r.shown) <= 0.02)) {
      r.shown = r.a;
      ribbon.style.transform = `rotate(${r.a.toFixed(2)}deg)`;
    }
  }

  remeasure(): void { this.measure(); this.render(); }

  private setState(s: NotebookState) {
    this.state = s;
    this.onState(s);
  }

  /** Spread size and the two poses (book-local px → viewport px). */
  private measure() {
    const book = this.el.book;
    if (!book) return;
    const vw = window.innerWidth, vh = window.innerHeight;
    const H = Math.min(vh * 0.84, (vw * 0.9) / SPREAD_ASPECT);
    const W = H * SPREAD_ASPECT;
    this.W = W; this.H = H;
    book.style.width = `${W}px`;
    book.style.height = `${H}px`;
    this.openPose = { tx: (vw - W) / 2, ty: (vh - H) / 2 + 8, sx: 1, sy: 1 };
    if (this.slot) {
      const r = this.slot.getBoundingClientRect();
      const f = COVER_FACE;
      const cw = (f.w * W) / 2, ch = f.h * H, cx0 = W / 2 + (f.x * W) / 2, cy0 = f.y * H;
      const sx = r.width / cw, sy = r.height / ch;
      this.closedPose = { tx: r.left - cx0 * sx, ty: r.top - cy0 * sy, sx, sy };
    } else {
      this.closedPose = { ...this.openPose };
    }
  }

  private render() {
    const book = this.el.book;
    if (!book) return;
    const c = this.closedPose, o = this.openPose, t = this.t, k = 1 - t, u = this.cur;
    const tx = lerp(c.tx, o.tx, t), ty = lerp(c.ty, o.ty, t);
    const sx = lerp(c.sx, o.sx, t), sy = lerp(c.sy, o.sy, t), sz = (sx + sy) / 2;
    const px = lerp(0.748, 0.5, t) * this.W, py = 0.5 * this.H;
    const s = 1 + u.lift * k;
    book.style.transform =
      `translate3d(${tx}px, ${ty}px, 0) scale3d(${sx}, ${sy}, ${sz}) translate(${px}px, ${py}px) ` +
      `rotateX(${u.tiltX * k}deg) rotateY(${u.tiltY * k}deg) scale(${s}) translate(${-px}px, ${-py}px)`;
    // The shadows keep one blur radius (CSS); lifting changes only their offset and opacity,
    // so they are never re-rasterised. `blur` stays in the extras for callers but isn't drawn.
    const lx = `${u.lx * k}px`, ly = `${lerp(u.ly, 18, t)}px`, so = `${lerp(u.shadow, 0.5, t)}`;
    for (const sh of [this.el.shadowL, this.el.shadowR]) {
      if (!sh) continue;
      sh.style.setProperty('--lx', lx);
      sh.style.setProperty('--ly', ly);
      sh.style.setProperty('--shadow-o', so);
    }
  }

  /** Cover angle and every light that depends on it. */
  private setCover(p: number) {
    this.p = p;
    const { cover, edge, ribbon, frontShade, backShade, cast, book, pages } = this.el;
    if (!cover || !edge || !frontShade || !backShade || !cast || !book || !pages) return;
    const a = 180 * p, r = (a * Math.PI) / 180;
    const s = Math.max(0, Math.sin(r)), c = Math.cos(r);
    cover.style.transform = `rotateY(${-a}deg)`;
    // board thickness only reads once the board lifts; edge-on it is a hairline
    edge.style.opacity = String(Math.min(1, s * 5));
    if (ribbon) ribbon.style.opacity = String(clamp(1 - p * 6));
    frontShade.style.opacity = String(a <= 90 ? 0.45 * s : 0);
    backShade.style.opacity = String(a >= 90 ? 0.32 * s : 0);
    cast.style.opacity = String(0.34 * s);
    cast.style.transform = `scaleX(${clamp(c + 0.35 * s)})`;
    this.el.shadowL?.style.setProperty('--left-shadow', String(Math.max(0, -c)));
    pages.style.opacity = p > 0.0005 || this.state !== 'closed' ? '1' : '0';
  }

  private land() {
    if (this.el.pages) this.el.pages.style.clipPath = 'inset(0 0 0 0)';
    if (this.el.cover) this.el.cover.style.visibility = 'hidden';
    this.setState('open');
  }

  private fade(from: number, to: number, ms: number) {
    const layer = this.el.layer;
    return tween(ms, (k) => { if (layer) layer.style.opacity = String(lerp(from, to, k)); }).promise;
  }

  async open(): Promise<void> {
    if (this.state !== 'closed') return;
    this.measure();
    this.peekTo = 0; this.peekV = 0;
    this.setState('opening');
    if (this.el.pages) { this.el.pages.style.opacity = '1'; this.el.pages.style.clipPath = 'inset(0 0 0 50%)'; }
    if (this.reduced) {
      await this.fade(1, 0, 180);
      this.t = 1; this.setCover(1); this.render(); this.land();
      await this.fade(0, 1, 240);
      return;
    }
    const t0 = this.t, p0 = this.p;
    this.run = tween(1500, (k) => {
      this.t = lerp(t0, 1, ease.push(k));
      this.setCover(lerp(p0, 1, ease.swing(clamp((k - 0.1) / 0.75))));
      this.render();
    });
    await this.run.promise;
    this.run = null;
    this.land();
  }

  async close(): Promise<void> {
    if (this.state !== 'open') return;
    this.measure();
    this.setState('closing');
    await new Promise((r) => setTimeout(r, this.reduced ? 0 : 200));
    if (this.el.cover) this.el.cover.style.visibility = 'visible';
    if (this.el.pages) this.el.pages.style.clipPath = 'inset(0 0 0 50%)';
    if (this.reduced) {
      await this.fade(1, 0, 180);
      this.t = 0; this.setCover(0); this.render();
    } else {
      this.run = tween(1300, (k) => {
        this.setCover(1 - ease.closeSwing(clamp(k / 0.78)));
        this.t = 1 - ease.paper(clamp((k - 0.08) / 0.92));
        this.render();
      });
      await this.run.promise;
      this.run = null;
    }
    this.state = 'closed';
    this.setCover(0);
    this.setState('closed');
    if (this.reduced) await this.fade(0, 1, 240);
  }

  /** Jump straight to the open spread (direct /works visits, returns from a case study). */
  showOpen(): void {
    this.measure();
    this.t = 1;
    this.state = 'opening';
    if (this.el.pages) this.el.pages.style.opacity = '1';
    this.setCover(1);
    this.render();
    this.land();
  }
}
