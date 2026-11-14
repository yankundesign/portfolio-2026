import { PluckedLine, type StringFeel } from './pluckedLine';

/**
 * RuleStrings — the case studies' full-measure rules are strings, like the
 * homepage's top rule and index rules (PluckedLine).
 *
 * One construction rule, the homepage's:
 *  - A rule draws itself in from the left the first time it comes on screen.
 *  - The cursor crossing it plucks it where it crosses, harder the faster it
 *    crossed, and it rings with the cover line's spring.
 *
 * One listener and one frame loop serve every rule on the page. The loop runs
 * only while a string is ringing; a rule that is off screen is never measured.
 * Touch and reduced motion get the rule drawn, and nothing more.
 */

/** The top rule's feel on the homepage (monographPointer). */
const FEEL: StringFeel = { spread: 90, gain: 8, min: 2.5, max: 12, step: 4 };
/** The line's y inside its svg: room above and below for the ring. */
export const RULE_Y = 15;
const RING_MS = 1500;

interface Rule {
  svg: SVGSVGElement;
  line: PluckedLine;
  visible: boolean;
  left: number;
  top: number;
  width: number;
}

class RuleStrings {
  private rules = new Set<Rule>();
  private io: IntersectionObserver | null = null;
  private last: { x: number; y: number; t: number } | null = null;
  private ringUntil = 0;
  private raf = 0;
  private live = false;

  /** Register a rule's svg (it holds one path). Returns the way to remove it. */
  add(svg: SVGSVGElement): () => void {
    const path = svg.querySelector('path');
    if (!path) return () => {};
    const rule: Rule = { svg, line: new PluckedLine([path], FEEL), visible: false, left: NaN, top: NaN, width: NaN };
    this.rules.add(rule);
    this.place(rule);
    rule.line.step(performance.now());

    const still =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (typeof IntersectionObserver === 'undefined') {
      svg.dataset.drawn = 'true';
    } else {
      this.io ??= new IntersectionObserver(this.onSee, { rootMargin: '0px 0px -12% 0px' });
      this.io.observe(svg);
    }
    if (!still && !this.live) {
      this.live = true;
      window.addEventListener('pointermove', this.onMove, { passive: true });
      window.addEventListener('resize', this.onResize);
    }
    return () => {
      this.io?.unobserve(svg);
      this.rules.delete(rule);
      if (!this.rules.size) this.stop();
    };
  }

  private stop() {
    window.removeEventListener('pointermove', this.onMove);
    window.removeEventListener('resize', this.onResize);
    cancelAnimationFrame(this.raf);
    this.raf = 0;
    this.live = false;
    this.last = null;
    this.io?.disconnect();
    this.io = null;
  }

  private onSee = (entries: IntersectionObserverEntry[]) => {
    for (const entry of entries) {
      for (const rule of this.rules) {
        if (rule.svg !== entry.target) continue;
        rule.visible = entry.isIntersecting;
        if (entry.isIntersecting) {
          this.place(rule);
          rule.line.step(performance.now());
          rule.svg.dataset.drawn = 'true';
        }
      }
    }
  };

  /** Where the rule is in the window now. The line sits on a whole pixel row. */
  private place(rule: Rule) {
    const box = rule.svg.getBoundingClientRect();
    if (box.left === rule.left && box.top === rule.top && box.width === rule.width) return;
    rule.left = box.left; rule.top = box.top; rule.width = box.width;
    const vy = Math.floor(box.top + RULE_Y) + 0.5;
    rule.line.place(box.left, vy, box.width, vy - box.top);
  }

  private onResize = () => {
    for (const rule of this.rules) {
      this.place(rule);
      rule.line.step(performance.now());
    }
  };

  private onMove = (e: PointerEvent) => {
    const now = performance.now();
    const prev = this.last;
    this.last = { x: e.clientX, y: e.clientY, t: now };
    if (!prev || e.pointerType !== 'mouse') return;
    let plucked = false;
    for (const rule of this.rules) {
      if (!rule.visible) continue;
      this.place(rule);
      if (rule.line.cross(prev.x, prev.y, e.clientX, e.clientY, now - prev.t, now)) plucked = true;
    }
    if (plucked) {
      this.ringUntil = now + RING_MS;
      if (!this.raf) this.raf = requestAnimationFrame(this.frame);
    }
  };

  private frame = (now: number) => {
    for (const rule of this.rules) if (rule.visible) rule.line.step(now);
    this.raf = now < this.ringUntil ? requestAnimationFrame(this.frame) : 0;
  };
}

/** The page's rules. One instance: one pointer listener, one loop. */
export const ruleStrings = new RuleStrings();
