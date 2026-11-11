/**
 * PlateFlight — on the works page, the plate grows out of its own thumbnail.
 *
 * One element moves: the plate's frame. It flies between a thumbnail's frame on
 * the contact sheet and the plate's resting box, by animating its box in px
 * (left, top, width, height), not a scale, so its hairline stays 1px. Every
 * flight starts from wherever the frame is on screen right now, so pointing
 * again mid-flight turns it around instead of jumping.
 *
 *   lift    the thumbnail's frame becomes the plate; the other plates step back
 *   open    it lands on the settle curve; the caption follows it in
 *   swap    pointing at another title changes the picture, not the frame
 *   return  the caption leaves first; the frame flies home; the sheet comes back
 *           as it lands, and the thumbnail takes over in the same frame
 *
 * State lives in data attributes on the right page, which React doesn't manage:
 * data-fly (the frame is shown), data-back (the sheet steps back), data-cap
 * (the caption is shown), data-returning; data-lifted on the thumbnail's frame.
 * Reduced motion: the same states, without the flights.
 */
interface Box { left: number; top: number; width: number; height: number }

export class PlateFlight {
  private page: HTMLElement | null = null;
  private slot: HTMLElement | null = null;
  private frame: HTMLElement | null = null;
  private sheet: HTMLElement | null = null;
  private thumbs: HTMLElement[] = [];
  private frames: HTMLElement[] = [];
  private anim: Animation | null = null;
  private dir: 'in' | 'out' | null = null;
  private shown = -1;
  private reduced = false;

  attach(page: HTMLElement): void {
    this.page = page;
    this.slot = page.querySelector('[data-plate-slot]');
    this.frame = page.querySelector('[data-plate-frame]');
    this.sheet = page.querySelector('[data-sheet]');
    this.thumbs = Array.from(page.querySelectorAll<HTMLElement>('[data-thumb]'));
    this.frames = Array.from(page.querySelectorAll<HTMLElement>('[data-thumb-frame]'));
    window.addEventListener('resize', this.onResize);
  }

  detach(): void {
    window.removeEventListener('resize', this.onResize);
    this.land();
    this.page = null;
  }

  configure(opts: { reducedMotion: boolean }): void { this.reduced = opts.reducedMotion; }

  /** A title is pointed at. */
  point(i: number): void {
    const page = this.page;
    if (!page || i < 0 || i >= this.frames.length) return;
    if (!page.dataset.fly) {
      // lift: the thumbnail's own frame becomes the plate
      const from = this.restBox(i);
      this.shown = i;
      this.lift(i);
      delete page.dataset.returning;
      page.dataset.fly = page.dataset.back = page.dataset.cap = 'true';
      if (this.reduced || !from) return;
      this.dir = 'in';
      this.fly(from, this.homeBox(), 620, this.settle(), () => { this.dir = null; });
      return;
    }
    // swap, or turn around mid-return: keep the frame, change the picture (React)
    this.shown = i;
    this.lift(i);
    delete page.dataset.returning;
    page.dataset.back = page.dataset.cap = 'true';
    if (this.dir === 'out' && !this.reduced) {
      this.dir = 'in';
      this.fly(null, this.homeBox(), 480, this.settle(), () => { this.dir = null; });
    }
  }

  /** Nothing is pointed at (after the selection's own grace period). */
  release(): void {
    const page = this.page;
    if (!page || !page.dataset.fly) return;
    const to = this.shown >= 0 ? this.restBox(this.shown) : null;
    if (this.reduced || !to) { this.land(); return; }
    delete page.dataset.back;
    delete page.dataset.cap;
    page.dataset.returning = 'true';
    this.dir = 'out';
    this.fly(null, to, 460, 'cubic-bezier(0.4, 0, 0.2, 1)', () => this.land());
  }

  // ─── internals ───

  /** The frame is home: the thumbnail takes over in the same frame; nothing fades on top. */
  private land() {
    this.anim?.cancel();
    this.anim = null;
    this.dir = null;
    this.lift(-1);
    const page = this.page;
    if (page) {
      delete page.dataset.fly;
      delete page.dataset.back;
      delete page.dataset.cap;
      delete page.dataset.returning;
    }
    this.shown = -1;
  }

  private onResize = () => { if (this.anim) this.land(); };

  private lift(i: number) { this.frames.forEach((f, k) => { if (k === i) f.dataset.lifted = 'true'; else delete f.dataset.lifted; }); }

  private settle(): string {
    const v = getComputedStyle(document.documentElement).getPropertyValue('--ease-settle').trim();
    return v && CSS.supports('transition-timing-function', v) ? v : 'cubic-bezier(0.16, 1, 0.3, 1)';
  }

  private homeBox(): Box | null {
    const r = this.slot?.getBoundingClientRect();
    return r ? { left: r.left, top: r.top, width: r.width, height: r.height } : null;
  }

  /**
   * A thumbnail's frame where it rests, ignoring the step-back scale. Measured
   * from the thumbnail's offset in the sheet: while a thumbnail is scaled, it
   * becomes its frame's offsetParent, so the frame's own offsets read 0, 0. The
   * frame sits at the thumbnail's top-left corner.
   */
  private restBox(i: number): Box | null {
    const sheet = this.sheet, t = this.thumbs[i], f = this.frames[i];
    if (!sheet || !t || !f) return null;
    const s = sheet.getBoundingClientRect();
    return { left: s.left + t.offsetLeft, top: s.top + t.offsetTop, width: f.offsetWidth, height: f.offsetHeight };
  }

  private fly(fromBox: Box | null, to: Box | null, duration: number, easing: string, done: () => void) {
    const frame = this.frame, home = this.homeBox();
    if (!frame || !home || !to) { done(); return; }
    const now = frame.getBoundingClientRect(); // read before cancelling the flight in progress
    const from = fromBox ?? { left: now.left, top: now.top, width: now.width, height: now.height };
    const px = (b: Box) => ({ left: `${b.left - home.left}px`, top: `${b.top - home.top}px`, width: `${b.width}px`, height: `${b.height}px` });
    this.anim?.cancel();
    const a = frame.animate([px(from), px(to)], { duration, easing, fill: 'forwards' });
    this.anim = a;
    a.finished.then(() => {
      if (this.anim !== a) return;
      done();
      a.cancel();
      if (this.anim === a) this.anim = null;
    }, () => {});
  }
}
