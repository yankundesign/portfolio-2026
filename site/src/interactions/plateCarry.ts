import { openingStill } from '../data/caseOpeners';
import { mockupThumb, projects } from '../data/projects';
import { ease, lerp, tween, type Tween } from './motion';

/**
 * PlateCarry — the works page's plate, carried into its case study and back.
 *
 * One rule, the works page's own: the frame moves, the picture changes inside
 * it. On the works page the frame grows out of a thumbnail (PlateFlight); a
 * click carries the same frame on, across the change of page, to the case
 * study's opening board. "← Works" carries it home to its thumbnail.
 *
 * Out, from the works page:
 *   take   the plate is picked up: a copy of its frame (the carrier, which
 *          lives outside the pages) takes its exact place and comes up a
 *          little; the notebook lets go of it and fades. Then the page changes.
 *   land   the case study has its opening board in place. The board starts
 *          at the carrier's box and both fly to where the board belongs, the
 *          carrier by its box in px (its hairline stays 1px), the board under
 *          it by transform. One frame loop writes both, so they can't drift
 *          apart (a compositor animation runs ahead of a layout one whenever
 *          the page is busy, and a page that has just mounted is). On the way
 *          the carrier's picture gives way to the board, once the board's own
 *          picture is ready to show.
 *
 * Back, from the top of a case study (the opening board still on screen):
 *   bring  the board is picked up: the carrier takes its place holding a copy
 *          of the board, and the page fades. Then the page changes.
 *   home   the open notebook is back, nothing selected. The carrier flies to
 *          the project's thumbnail on the contact sheet while the plate's
 *          picture comes back over the board's; the thumbnail takes over in
 *          the frame it lands.
 *
 * Interruptions: a resize, a scroll or the wheel sets everything down at once.
 * If nothing comes for the carrier, it fades. Reduced motion, phones and case
 * studies without an opening board never start a carry.
 */
interface Box { left: number; top: number; width: number; height: number }

export interface PlateSource {
  /** Where the plate's frame is on screen right now. */
  from: Box;
  /** The preview loop, if it is playing in the plate: its current frame is carried. */
  loop: HTMLVideoElement | null;
}

/** Picked up: how long, and how much larger (about its centre). */
const LIFT_MS = 180;
const LIFT = 0.025;
/** The flight: the notebook's camera curve. It leaves from rest and lands softly. */
const FLY_MS = 780;
const FLY_EASE = ease.push;
/** The picture starts to change this far into the flight, and takes this long. */
const TURN_AT = 0.34;
const TURN_MS = 340;
/** Flying home is a shorter trip to a small target: the picture changes sooner. */
const HOME_MS = 680;
const HOME_TURN_AT = 0.16;
/** How long the carrier waits for somewhere to land, and for a board's picture. */
const LOST_MS = 900;
const PICTURE_MS = 1400;
/** To be carried back, the board's top edge must be on screen, at least this far above the window's foot. */
const SEEN_PX = 120;

const wait = (ms: number) => new Promise<void>((r) => { window.setTimeout(r, ms); });
const boxOf = (r: DOMRect): Box => ({ left: r.left, top: r.top, width: r.width, height: r.height });
const px = (b: Box) => ({ left: `${b.left}px`, top: `${b.top}px`, width: `${b.width}px`, height: `${b.height}px` });
const mix = (a: Box, b: Box, e: number): Box => ({
  left: lerp(a.left, b.left, e),
  top: lerp(a.top, b.top, e),
  width: lerp(a.width, b.width, e),
  height: lerp(a.height, b.height, e),
});
const lifted = (b: Box): Box => ({
  left: b.left - (b.width * LIFT) / 2,
  top: b.top - (b.height * LIFT) / 2,
  width: b.width * (1 + LIFT),
  height: b.height * (1 + LIFT),
});

class PlateCarry {
  private el: HTMLElement | null = null;
  /** The project being carried, and which way. */
  private slug: string | null = null;
  private way: 'out' | 'back' = 'out';
  /** Where it lands: the case study's board (out) or the sheet's thumbnail frame (back). */
  private target: HTMLElement | null = null;
  private gone = false;
  private anims: Animation[] = [];
  private flight: Tween | null = null;
  private lost = 0;
  private run = 0;
  private fetched = new Set<string>();

  /** The carrier element (PlateCarrier), mounted once for the whole app. */
  attach(el: HTMLElement | null): void {
    if (!el) this.clear();
    this.el = el;
  }

  /** Does this project's case study open on a board a plate can land on? */
  lands(slug: string): boolean { return slug in openingStill; }

  /** A plate is in the air, or being picked up. */
  get carrying(): boolean { return this.slug !== null; }

  /** Is a plate on its way to this case study? Read once, as its opener mounts. */
  arriving(slug: string): boolean { return this.way === 'out' && this.slug === slug; }

  /** The project whose board is on its way back to the works page, if one is. */
  get returning(): string | null { return this.way === 'back' ? this.slug : null; }

  /** A title is pointed at: fetch its case study's opening still, so the board is ready to land on. */
  expect(slug: string): void {
    const src = openingStill[slug];
    if (!src || this.fetched.has(src)) return;
    this.fetched.add(src);
    new Image().src = src;
  }

  // ─── out: works page → case study ───

  /**
   * Pick the plate up. `onUp` runs when the carrier has taken the plate's
   * place (the page may let go of it); the promise resolves when the page may
   * change.
   */
  async take(slug: string, plate: PlateSource, onUp: () => void): Promise<void> {
    const el = this.el;
    if (!el) return;
    this.clear();
    const run = ++this.run;
    this.slug = slug;
    this.way = 'out';

    await this.fill(slug, plate.loop);
    if (run !== this.run) return;
    Object.assign(el.style, px(plate.from));
    el.dataset.on = 'plate';
    onUp();
    await this.lift(plate.from);
    if (run !== this.run) return;
    // If no board comes for it, the plate fades where it is.
    this.lost = window.setTimeout(() => this.fade(), LOST_MS);
  }

  /** The case study's opening board is in place: fly the plate onto it. */
  land(board: HTMLElement): void {
    if (this.target === board) { this.gone = false; return; }
    const el = this.el;
    if (!el || this.way !== 'out' || !this.slug || !el.dataset.on) return;
    window.clearTimeout(this.lost);
    const run = this.run;
    this.target = board;
    this.gone = false;

    const from = boxOf(el.getBoundingClientRect()); // read before the lift is let go
    const to = boxOf(board.getBoundingClientRect());
    if (!to.width || !to.height) { this.clear(); return; }
    const radius = parseFloat(getComputedStyle(board).borderTopLeftRadius) || 0;

    // The carrier's box and the board's transform, from one number.
    const write = (k: number) => {
      const e = FLY_EASE(k);
      const box = mix(from, to, e);
      Object.assign(el.style, px(box));
      el.style.borderRadius = `${(radius * e).toFixed(2)}px`;
      board.style.transformOrigin = '0 0';
      board.style.transform = k >= 1
        ? ''
        : `translate(${box.left - to.left}px, ${box.top - to.top}px) scale(${box.width / to.width}, ${box.height / to.height})`;
    };
    this.anims.forEach((a) => a.cancel());
    this.anims = [];
    write(0); // before the first paint: the board starts where the plate is
    const flight = tween(FLY_MS, write);
    this.flight = flight;
    this.listen(true, true);

    // The picture changes once the board has one to show, and not before the flight is under way.
    const turned = Promise.all([wait(FLY_MS * TURN_AT), Promise.race([this.picture(board), wait(PICTURE_MS)])]).then(() => {
      if (run !== this.run) return;
      const turn = el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: TURN_MS, easing: 'cubic-bezier(0.4, 0, 0.6, 1)', fill: 'forwards' });
      this.anims.push(turn);
      return turn.finished;
    });
    Promise.all([flight.promise, turned]).then(() => { if (run === this.run) this.clear(); }, () => undefined);
  }

  // ─── back: case study → works page ───

  /**
   * Can this case study's opening board be carried back? Only while its top
   * edge is on screen below the running head (`under`, the head's foot), on a
   * wide screen, with motion allowed.
   */
  canBring(slug: string, page: HTMLElement, under: number): boolean {
    if (this.carrying || !this.el || !this.mockup(slug)) return false;
    if (!window.matchMedia('(min-width: 901px)').matches) return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    const board = page.querySelector<HTMLElement>('[data-opening-board]');
    if (!board) return false;
    const top = board.getBoundingClientRect().top;
    return top >= under && top <= window.innerHeight - SEEN_PX;
  }

  /**
   * Pick the opening board up: the carrier takes its place with a copy of it,
   * and the page fades. The promise resolves when the page may change.
   */
  async bring(slug: string, page: HTMLElement): Promise<void> {
    const el = this.el;
    const board = page.querySelector<HTMLElement>('[data-opening-board]');
    const holder = el?.querySelector<HTMLElement>('[data-copy]');
    if (!el || !board || !holder) return;
    this.clear();
    const run = ++this.run;
    this.slug = slug;
    this.way = 'back';

    const from = boxOf(board.getBoundingClientRect());
    this.copy(board, holder, from);
    await this.fill(slug, null);
    if (run !== this.run) return;
    Object.assign(el.style, px(from));
    el.style.borderRadius = getComputedStyle(board).borderTopLeftRadius;
    el.dataset.on = 'board';
    page.dataset.leaving = 'true';
    await this.lift(from);
    if (run !== this.run) return;
    this.lost = window.setTimeout(() => this.fade(), LOST_MS);
  }

  /** The open notebook is back: fly the board home to this thumbnail's frame. */
  home(frame: HTMLElement): void {
    if (this.target === frame) { this.gone = false; return; }
    const el = this.el;
    const plate = el?.querySelector<HTMLElement>('[data-plate]');
    const holder = el?.querySelector<HTMLElement>('[data-copy]');
    if (!el || !plate || !holder || this.way !== 'back' || !this.slug || !el.dataset.on) return;
    window.clearTimeout(this.lost);
    const run = this.run;
    this.target = frame;
    this.gone = false;
    // The thumbnail's own frame waits, hidden, for the carrier to land on it.
    frame.dataset.carried = 'true';
    // The works page doesn't scroll, and the page that just left may still report one: only a resize counts.
    this.listen(true, false);

    // The notebook is placed by the page's own effects, after this call: measure on the next frame.
    requestAnimationFrame(() => {
      if (run !== this.run) return;
      const from = boxOf(el.getBoundingClientRect());
      const to = boxOf(frame.getBoundingClientRect());
      if (!to.width || !to.height) { this.clear(); return; }
      const radius = parseFloat(el.style.borderRadius) || 0;
      const w = parseFloat(holder.style.width) || from.width;
      const h = parseFloat(holder.style.height) || from.height;
      const write = (k: number) => {
        const e = FLY_EASE(k);
        const box = mix(from, to, e);
        Object.assign(el.style, px(box));
        el.style.borderRadius = `${(radius * (1 - e)).toFixed(2)}px`;
        holder.style.transform = `scale(${box.width / w}, ${box.height / h})`;
      };
      this.anims.forEach((a) => a.cancel());
      this.anims = [];
      write(0);
      const flight = tween(HOME_MS, write);
      this.flight = flight;
      // The plate's picture comes back over the board's as it shrinks.
      const turn = plate.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: TURN_MS, delay: HOME_MS * HOME_TURN_AT, easing: 'cubic-bezier(0.4, 0, 0.6, 1)', fill: 'both',
      });
      this.anims.push(turn);
      Promise.all([flight.promise, turn.finished]).then(() => { if (run === this.run) this.clear(); }, () => undefined);
    });
  }

  /** Where the carrier was going went away. If it isn't back by the next frame, set everything down. */
  leave(target: HTMLElement): void {
    if (this.target !== target) return;
    this.gone = true;
    requestAnimationFrame(() => { if (this.gone && this.target === target) this.clear(); });
  }

  // ─── internals ───

  private mockup(slug: string): string | undefined {
    return projects.find((p) => p.slug === slug)?.mockup;
  }

  /**
   * The plate's picture: its light copy, the full PNG over it, and the preview
   * loop's frame if the loop was playing (so the plate doesn't jump back to
   * its still). Both copies are in the cache; resolves when they can paint, so
   * the hand-over can't blink.
   */
  private async fill(slug: string, loop: HTMLVideoElement | null): Promise<void> {
    const el = this.el;
    const mockup = this.mockup(slug);
    if (!el) return;
    const sources = mockup ? [mockupThumb(mockup), mockup] : [];
    const imgs = Array.from(el.querySelectorAll<HTMLImageElement>('[data-plate] img'));
    imgs.forEach((img, i) => {
      const src = sources[i];
      if (src) img.src = src;
      else img.removeAttribute('src');
    });
    const canvas = el.querySelector<HTMLCanvasElement>('[data-plate] canvas');
    if (canvas) {
      delete canvas.dataset.on;
      if (loop && loop.videoWidth && loop.readyState >= 2) {
        try {
          canvas.width = loop.videoWidth;
          canvas.height = loop.videoHeight;
          canvas.getContext('2d')?.drawImage(loop, 0, 0);
          canvas.dataset.on = 'true';
        } catch {
          delete canvas.dataset.on;
        }
      }
    }
    await Promise.race([
      Promise.all(imgs.filter((img) => img.getAttribute('src')).map((img) => img.decode().catch(() => undefined))),
      wait(160),
    ]);
  }

  /**
   * A copy of the board, at the board's own size, for the carrier to hold. A
   * recording is copied as the frame it is showing (or its poster), never as a
   * second player.
   */
  private copy(board: HTMLElement, holder: HTMLElement, box: Box) {
    const clone = board.cloneNode(true) as HTMLElement;
    clone.removeAttribute('data-opening-board');
    clone.style.transform = '';
    clone.style.transformOrigin = '';
    const playing = board.querySelector('video');
    const copied = clone.querySelector('video');
    if (playing && copied) {
      let still: HTMLElement | null = null;
      if (playing.videoWidth && playing.readyState >= 2) {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = playing.videoWidth;
          canvas.height = playing.videoHeight;
          canvas.getContext('2d')?.drawImage(playing, 0, 0);
          still = canvas;
        } catch {
          still = null;
        }
      }
      if (!still && playing.poster) {
        const img = new Image();
        img.src = playing.poster;
        img.width = playing.width;
        img.height = playing.height;
        still = img;
      }
      if (still) {
        still.className = copied.className;
        copied.replaceWith(still);
      } else {
        copied.remove();
      }
    }
    clone.querySelectorAll('button').forEach((b) => { b.tabIndex = -1; });
    holder.replaceChildren(clone);
    holder.style.width = `${box.width}px`;
    holder.style.height = `${box.height}px`;
    holder.style.transform = '';
  }

  /** Picked up: it comes a little toward the reader. */
  private lift(from: Box): Promise<unknown> {
    const el = this.el;
    if (!el) return Promise.resolve();
    const up = lifted(from);
    const holder = el.querySelector<HTMLElement>('[data-copy]');
    const anim = el.animate([px(from), px(up)], { duration: LIFT_MS, easing: 'cubic-bezier(0.2, 0, 0, 1)', fill: 'forwards' });
    this.anims.push(anim);
    if (holder?.firstChild) {
      // the board's copy grows with the box
      this.anims.push(holder.animate(
        [{ transform: 'scale(1)' }, { transform: `scale(${1 + LIFT})` }],
        { duration: LIFT_MS, easing: 'cubic-bezier(0.2, 0, 0, 1)', fill: 'forwards' },
      ));
    }
    return anim.finished.catch(() => undefined);
  }

  /** The board's own picture, ready to paint: its image, or its recording's poster. */
  private picture(board: HTMLElement): Promise<void> {
    const video = board.querySelector('video');
    const img = board.querySelector('img');
    const src = video?.poster || img?.currentSrc || img?.src;
    if (!src) return Promise.resolve();
    const probe = new Image();
    probe.src = src;
    return probe.decode().then(() => undefined, () => undefined);
  }

  private fade() {
    const el = this.el;
    if (!el || !el.dataset.on) { this.clear(); return; }
    const run = this.run;
    const out = el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 220, easing: 'ease-out', fill: 'forwards' });
    this.anims.push(out);
    out.finished.then(() => { if (run === this.run) this.clear(); }, () => undefined);
  }

  /** Everything is set down: the board and the thumbnail are themselves, the carrier is put away. */
  private clear = () => {
    this.run += 1;
    window.clearTimeout(this.lost);
    this.listen(false, true);
    this.anims.forEach((a) => a.cancel());
    this.anims = [];
    this.flight?.cancel();
    this.flight = null;
    if (this.target) {
      this.target.style.transform = '';
      this.target.style.transformOrigin = '';
      delete this.target.dataset.carried;
    }
    this.slug = null;
    this.way = 'out';
    this.target = null;
    this.gone = false;
    const el = this.el;
    if (!el) return;
    delete el.dataset.on;
    el.style.borderRadius = '';
    const canvas = el.querySelector<HTMLCanvasElement>('[data-plate] canvas');
    if (canvas) { delete canvas.dataset.on; canvas.width = 0; canvas.height = 0; }
    const holder = el.querySelector<HTMLElement>('[data-copy]');
    if (holder) { holder.replaceChildren(); holder.style.transform = ''; }
  };

  /** While something flies: a resize, and (where the page scrolls) a scroll or the wheel, sets it down. */
  private listen(on: boolean, scrolls: boolean) {
    const passive = { passive: true };
    const capture = { capture: true, passive: true };
    if (on) {
      window.addEventListener('resize', this.clear);
      if (!scrolls) return;
      window.addEventListener('wheel', this.clear, passive);
      window.addEventListener('touchmove', this.clear, passive);
      document.addEventListener('scroll', this.clear, capture);
    } else {
      window.removeEventListener('resize', this.clear);
      window.removeEventListener('wheel', this.clear);
      window.removeEventListener('touchmove', this.clear);
      document.removeEventListener('scroll', this.clear, capture);
    }
  }
}

/** The one carry for the app: it outlives the page that starts it. */
export const plateCarry = new PlateCarry();
