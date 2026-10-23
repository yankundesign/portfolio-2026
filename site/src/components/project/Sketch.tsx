import { useMemo, type ReactNode } from 'react';
import { useElementSize } from '../../interactions/useElementSize';
import {
  randomFrom,
  sketchArrowhead,
  sketchLine,
  sketchPolyline,
  sketchRect,
  sketchRing,
  type Point,
} from './sketchGeometry';
import styles from './Sketch.module.css';

/*
 * Hand-drawn chrome for diagrams, drawn at each element's measured size so
 * labels stay real text and layouts can reflow. Seeds are readable keys
 * ("pivot · open box") — the same key always draws the same hand.
 */

const RING_R = 8;
const NO_RINGS: readonly number[] = [];

export type SketchTone = 'line' | 'soft' | 'dashed' | 'faint' | 'ink';

export interface SketchFrameProps {
  seed: string;
  /** line: ink outline · soft: lighter outline · dashed: theirs · faint: not built · ink: filled block. */
  tone?: SketchTone;
  /** A thinned-ink wash inside the frame. */
  wash?: boolean;
  className?: string;
  children?: ReactNode;
}

/** A box with a hand-drawn outline (or fill) behind its content. */
export function SketchFrame({ seed, tone = 'line', wash = false, className, children }: SketchFrameProps) {
  const { ref, width, height } = useElementSize<HTMLDivElement>();
  const paths = useMemo(() => {
    if (!width || !height) return null;
    const rand = randomFrom(seed);
    return {
      outline: sketchRect(width, height, rand, { closed: tone === 'ink' }),
      wash: wash ? sketchRect(width, height, rand, { closed: true, inset: 3, amp: 1.4, drift: 2.5 }) : null,
    };
  }, [seed, tone, wash, width, height]);

  return (
    <div ref={ref} className={[styles.frame, tone === 'ink' ? styles.frameInk : '', className ?? ''].join(' ').trim()}>
      {paths && (
        <svg className={styles.overlay} width={width} height={height} aria-hidden="true" focusable="false">
          {paths.wash && <path d={paths.wash} className={styles.wash} />}
          <path d={paths.outline} className={styles[tone]} />
        </svg>
      )}
      <div className={styles.content}>{children}</div>
    </div>
  );
}

export interface SketchRuleProps {
  seed: string;
  /** Arrowhead at the far end (right, or bottom when vertical). */
  arrow?: boolean;
  /** Rings sitting on the line, as fractions of its length — where the admin checks. */
  rings?: readonly number[];
  weight?: 'light' | 'regular' | 'heavy';
  /** Short end ticks, turned down — a bracket. */
  ticks?: boolean;
  className?: string;
}

/**
 * A hand-drawn rule. Horizontal when its box is wider than tall, vertical
 * otherwise — so a CSS breakpoint can turn a row of connectors into a
 * column without touching the markup.
 */
export function SketchRule({
  seed,
  arrow = false,
  rings = NO_RINGS,
  weight = 'regular',
  ticks = false,
  className,
}: SketchRuleProps) {
  const { ref, width, height } = useElementSize<HTMLSpanElement>();
  const drawn = useMemo(() => {
    if (!width || !height) return null;
    const rand = randomFrom(seed);
    const horizontal = width >= height;
    const len = horizontal ? width : height;
    const mid = horizontal ? height / 2 : width / 2;
    const pt = (s: number): Point => (horizontal ? [s, mid] : [mid, s]);
    const inset = arrow ? 1.5 : 0;
    const line = sketchLine(pt(0), pt(len - inset), rand);
    const head = arrow ? sketchArrowhead(pt(len - inset), horizontal ? 0 : Math.PI / 2, rand) : '';
    const tickPaths = ticks
      ? [0.75, len - 0.75]
          .map((s) => {
            const a = pt(s);
            const b: Point = horizontal ? [a[0], a[1] + 6] : [a[0] + 6, a[1]];
            return sketchLine(a, b, rand, { amp: 0.3 });
          })
          .join('')
      : '';
    const ringPaths = rings.map((t) => {
      const c = pt(len * t);
      return { c, d: sketchRing(c[0], c[1], RING_R, rand) };
    });
    return { line: line + head + tickPaths, ringPaths };
  }, [seed, arrow, rings, ticks, width, height]);

  return (
    <span ref={ref} className={[styles.rule, className ?? ''].join(' ').trim()} aria-hidden="true">
      {drawn && (
        <svg className={styles.overlay} width={width} height={height} focusable="false">
          <path d={drawn.line} className={[styles.line, styles[weight]].join(' ')} />
          {drawn.ringPaths.map(({ c, d }) => (
            <g key={`${c[0]}-${c[1]}`}>
              <circle cx={c[0]} cy={c[1]} r={RING_R - 0.5} className={styles.ringPaper} />
              <path d={d} className={styles.line} />
            </g>
          ))}
        </svg>
      )}
    </span>
  );
}

export type SketchMarkKind = 'ring' | 'disc' | 'ringDot' | 'tick';

export interface SketchMarkProps {
  seed: string;
  kind: SketchMarkKind;
  size?: number;
  className?: string;
}

/** A single hand-drawn mark: hollow ring, solid disc, ring with a dot, or tick. */
export function SketchMark({ seed, kind, size = 22, className }: SketchMarkProps) {
  const d = useMemo(() => {
    const rand = randomFrom(seed);
    const c = size / 2;
    const r = c - 2.5;
    if (kind === 'tick') return { stroke: sketchLine([c, 3], [c, size - 3], rand, { amp: 0.3 }) };
    if (kind === 'disc') return { fill: sketchRing(c, c, r + 0.5, rand, true) };
    return {
      stroke: sketchRing(c, c, r, rand),
      dot: kind === 'ringDot' ? sketchRing(c, c, 2.6, rand, true) : undefined,
    };
  }, [seed, kind, size]);

  return (
    <svg
      className={[styles.mark, className ?? ''].join(' ').trim()}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
      focusable="false"
    >
      {kind !== 'disc' && kind !== 'tick' && <circle cx={size / 2} cy={size / 2} r={size / 2 - 3} className={styles.ringPaper} />}
      {d.fill && <path d={d.fill} className={styles.inkFill} />}
      {d.stroke && <path d={d.stroke} className={styles.line} />}
      {d.dot && <path d={d.dot} className={styles.inkFill} />}
    </svg>
  );
}

export interface SketchBoxProps {
  seed: string;
  /** Open: lid off, flaps folded out, a wash inside. Closed: lid on, seam across. */
  open?: boolean;
  className?: string;
  children?: ReactNode;
}

const DEPTH: Point = [10, -10];

/** Slide 30's box: a front face with a lid and a side, drawn by hand. */
export function SketchBox({ seed, open = false, className, children }: SketchBoxProps) {
  const { ref, width: w, height: h } = useElementSize<HTMLDivElement>();
  const paths = useMemo(() => {
    if (!w || !h) return null;
    const rand = randomFrom(seed);
    const [dx, dy] = DEPTH;
    const front = sketchRect(w, h, rand, { radius: [1, 2.5], drift: 0.8 });
    const lid = sketchPolyline([[0, 0], [dx, dy], [w + dx, dy], [w, 0]], rand);
    const side = sketchPolyline([[w + dx, dy], [w + dx, h + dy], [w, h]], rand);
    if (!open) {
      const seam = sketchLine([dx / 2, dy / 2], [w + dx / 2, dy / 2], rand, { amp: 0.4 });
      return { strokes: [front, lid, side, seam], inside: null, shadow: null };
    }
    const leftFlap = sketchPolyline([[0, 0], [-30, -12], [-18, -26], [dx, dy]], rand);
    const rightFlap = sketchPolyline([[w, 0], [w + 46, -8], [w + 38, -16], [w + dx, dy]], rand);
    const inside = sketchRect(w, h, rand, { closed: true, inset: 4, amp: 1.4, drift: 2 });
    const shadow = sketchRect(w + 16, 12, rand, { closed: true, amp: 1.2, drift: 2, radius: [4, 6] });
    return { strokes: [front, lid, side, leftFlap, rightFlap], inside, shadow };
  }, [seed, open, w, h]);

  return (
    <div ref={ref} className={[styles.box, className ?? ''].join(' ').trim()}>
      {paths && (
        <svg className={styles.overlay} width={w} height={h} aria-hidden="true" focusable="false">
          {paths.shadow && <path d={paths.shadow} transform={`translate(-6 ${h + 7})`} className={styles.wash} />}
          {paths.inside && <path d={paths.inside} className={styles.wash} />}
          {paths.strokes.map((d, i) => (
            <path key={i} d={d} className={styles.line} />
          ))}
        </svg>
      )}
      <div className={styles.content}>{children}</div>
    </div>
  );
}
