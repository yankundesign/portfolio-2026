/**
 * ContentsStamp — on the works page, the row you point at becomes a solid
 * object: a band of the cover's navy, with the row's type stamped on it in
 * paper, lifted off the page by its shadow.
 *
 * One band travels between rows, the way a segmented control's thumb does; it
 * never lights each row on its own:
 *
 *   rise   from nothing, it rises out of the row's rule
 *   slide  to the next row, on the settle curve; pointing again mid-slide
 *          turns it around from where it is
 *   sink   when you leave, it sinks back into the rule
 *
 * The band is a second copy of the contents, paper on ink, laid exactly over
 * the first and clipped to the row (clip-path: inset). Where the band is, the
 * type is paper; nothing fades or swaps, so each letter turns as the band
 * crosses it. Its shadow is a drop-shadow on the copy's wrapper, so it follows
 * the clipped band exactly. (A separate shadow element, moved by transform,
 * ran a frame behind the clip on fast moves and showed as a second band.)
 *
 * State lives in data attributes on the wrapper, which React doesn't manage:
 * data-stamp picks the curve (rise | slide | sink); data-up is set while the
 * band is shown. Reduced motion: the band appears on the row and fades out.
 */
interface Band { top: number; height: number }

const SINK_MS = 300;

export class ContentsStamp {
  private wrap: HTMLElement | null = null;
  private stamp: HTMLElement | null = null;
  private rows: HTMLElement[] = [];
  private shown = -1;
  private up = false;
  private sinkEnd = 0;
  private reduced = false;

  attach(wrap: HTMLElement): void {
    this.wrap = wrap;
    this.stamp = wrap.querySelector('[data-stamp-copy]');
    this.rows = Array.from(wrap.querySelectorAll<HTMLElement>('[data-toc-row]'));
    this.write({ top: 0, height: 0 });
    window.addEventListener('resize', this.onResize);
  }

  detach(): void {
    window.removeEventListener('resize', this.onResize);
    this.wrap = null;
  }

  configure(opts: { reducedMotion: boolean }): void { this.reduced = opts.reducedMotion; }

  /** A row is pointed at (a title, or its plate on the sheet). */
  point(i: number): void {
    const wrap = this.wrap, band = this.band(i);
    if (!wrap || !band) return;
    const moving = this.up || performance.now() < this.sinkEnd;
    if (this.reduced) {
      this.mode(null);
      this.write(band);
    } else if (moving) {
      this.mode('slide');
      this.write(band);
    } else {
      // rise: start as a line on the row's rule, then grow up to the row
      this.mode(null);
      this.write({ top: band.top + band.height, height: 0 });
      void wrap.offsetHeight;
      this.mode('rise');
      this.write(band);
    }
    this.shown = i;
    this.up = true;
    this.sinkEnd = 0;
    wrap.dataset.up = 'true';
  }

  /** Nothing is pointed at (after the selection's own grace period). */
  release(): void {
    const wrap = this.wrap, band = this.band(this.shown);
    if (!wrap || !this.up) return;
    this.up = false;
    delete wrap.dataset.up;
    if (this.reduced || !band) return; // the band fades out where it is
    this.mode('sink');
    this.write({ top: band.top + band.height, height: 0 });
    this.sinkEnd = performance.now() + SINK_MS;
  }

  // ─── internals ───

  private mode(m: 'rise' | 'slide' | 'sink' | null) {
    const wrap = this.wrap;
    if (!wrap) return;
    if (m) wrap.dataset.stamp = m;
    else delete wrap.dataset.stamp;
  }

  /** The row's box in the wrapper, from the rule above it to its own rule. */
  private band(i: number): Band | null {
    const li = this.rows[i];
    if (!li) return null;
    return { top: li.offsetTop - 1, height: li.offsetHeight + 1 };
  }

  private write(b: Band) {
    const stamp = this.stamp;
    if (!stamp) return;
    const bottom = stamp.offsetHeight - b.top - b.height;
    stamp.style.clipPath = `inset(${b.top}px 0 ${bottom}px 0)`;
  }

  private onResize = () => {
    this.mode(null);
    const band = this.up ? this.band(this.shown) : null;
    this.write(band ?? { top: 0, height: 0 });
  };
}
