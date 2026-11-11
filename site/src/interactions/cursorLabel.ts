/**
 * CursorLabel — a label that is the cursor over one surface: “Open →” on the
 * closed notebook, “Close ×” on the paper around the open one.
 *
 * Its position lives in `translate` (written here); its size in `transform:
 * scale()` with `transform-origin: 0 0`, so it scales about the pointer; its
 * centring on an inner span. The label grows and shrinks about its own centre,
 * which stays on the pointer. (With the position inside `transform`, the scale
 * multiplied it, and the label flew in from the top-left corner as it grew.)
 *
 * It follows the pointer with a 30 ms smoothing and snaps to it when it
 * appears. While it leaves, it keeps following, so it shrinks into the arrow
 * where the pointer is instead of staying behind at the surface's edge. The
 * frame loop runs only while it is moving or leaving.
 */
export class CursorLabel {
  private el: HTMLElement;
  private exitMs: number;
  private x = 0;
  private y = 0;
  private tx = 0;
  private ty = 0;
  private on = false;
  private offAt = -Infinity;
  private raf = 0;
  private last = 0;

  constructor(el: HTMLElement, exitMs = 260) {
    this.el = el;
    this.exitMs = exitMs;
    window.addEventListener('pointermove', this.onMove, { passive: true });
    window.addEventListener('pointerup', this.onUp);
  }

  get shown(): boolean { return this.on; }

  /** Appear under the pointer (or keep following if already shown). */
  show(x: number, y: number): void {
    this.tx = x; this.ty = y;
    if (!this.on) {
      this.x = x; this.y = y;
      this.write();
      this.on = true;
      this.el.dataset.on = 'true';
    }
    this.kick();
  }

  hide(): void {
    if (!this.on) return;
    this.on = false;
    this.offAt = performance.now();
    this.el.dataset.on = 'false';
    this.el.dataset.press = 'false';
    this.kick();
  }

  press(down: boolean): void { this.el.dataset.press = String(down && this.on); }

  destroy(): void {
    window.removeEventListener('pointermove', this.onMove);
    window.removeEventListener('pointerup', this.onUp);
    cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  private onMove = (e: PointerEvent) => {
    this.tx = e.clientX; this.ty = e.clientY;
    if (this.on || this.leaving()) this.kick();
  };

  private onUp = () => { this.el.dataset.press = 'false'; };

  private leaving(): boolean { return performance.now() - this.offAt < this.exitMs; }

  private kick() {
    if (this.raf) return;
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.frame);
  }

  private frame = (now: number) => {
    this.raf = 0;
    const dt = Math.min(0.05, Math.max(0.001, (now - this.last) / 1000));
    this.last = now;
    const k = 1 - Math.exp(-dt / 0.03);
    this.x += (this.tx - this.x) * k;
    this.y += (this.ty - this.y) * k;
    this.write();
    const settled = Math.abs(this.tx - this.x) < 0.05 && Math.abs(this.ty - this.y) < 0.05;
    if ((this.on && !settled) || (!this.on && this.leaving())) this.raf = requestAnimationFrame(this.frame);
  };

  private write() { this.el.style.translate = `${this.x.toFixed(1)}px ${this.y.toFixed(1)}px`; }
}
