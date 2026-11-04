import { useMemo } from 'react';
import RevealOnScroll from './RevealOnScroll';
import { SketchBox, SketchMark, SketchRule } from './Sketch';
import {
  randomFrom,
  sketchArrowhead,
  sketchLine,
  sketchPolyline,
  sketchRect,
  sketchRing,
  sketchThrough,
  type Point,
} from './sketchGeometry';
import styles from './PivotDiagram.module.css';

export interface PivotDiagramProps {
  dropped: { from: string; box: string; to: string };
  kept: { from: string; inputs: string; steps: string; to: string };
  checkLabel: string;
  caption: string;
}

/*
 * Slide 34's drawing, by hand. Wide screens get the slide itself: one
 * drawing where the kept line runs into the open box and dips under
 * "Inputs" and "Steps", with a check ring before, between and after them.
 * Phone width gets the same two models read top to bottom.
 */

// ── The wide drawing, in a 1200 × 400 view ──────────────────────────────
const VIEW_W = 1200;
const VIEW_H = 400;
const TOP = 80; // dropped row
const LOW = 290; // kept row
const BOX_X0 = 360;
const BOX_X1 = 840;
const DEPTH: Point = [14, -14];
const RINGS = [245, 600, 955];
const RING_R = 15;
const DIP = 22; // how far the line drops under a word
const LINE_END = 1078;

/** A soft S-shaped dip from y0 to y1 between x0 and x1. */
function bend(x0: number, x1: number, y0: number, y1: number): Point[] {
  return [0.2, 0.4, 0.6, 0.8, 1].map((t) => {
    const e = t * t * (3 - 2 * t);
    return [x0 + (x1 - x0) * t, y0 + (y1 - y0) * e];
  });
}

function useWideDrawing() {
  return useMemo(() => {
    const r = randomFrom('pivot · slide 34');
    const [dx, dy] = DEPTH;

    // Dropped: goal → closed box → outcome.
    const closedTop = TOP - 34;
    const closedH = 68;
    const closed = [
      sketchLine([96, TOP], [BOX_X0, TOP], r),
      sketchRect(BOX_X1 - BOX_X0, closedH, r, { radius: [1.5, 3], drift: 0.8 }),
      sketchPolyline(
        [
          [BOX_X0, closedTop],
          [BOX_X0 + dx, closedTop + dy],
          [BOX_X1 + dx, closedTop + dy],
          [BOX_X1, closedTop],
        ],
        r,
      ),
      sketchLine([BOX_X0 + dx / 2, closedTop + dy / 2], [BOX_X1 + dx / 2, closedTop + dy / 2], r, { amp: 0.4 }),
      sketchPolyline(
        [
          [BOX_X1 + dx, closedTop + dy],
          [BOX_X1 + dx, closedTop + closedH + dy],
          [BOX_X1, closedTop + closedH],
        ],
        r,
      ),
      sketchLine([BOX_X1 + dx + 2, TOP], [LINE_END, TOP], r),
      sketchArrowhead([LINE_END, TOP], 0, r, 9),
    ];

    // Down: from the closed box to the open one.
    const down = sketchLine([600, 136], [600, 204], r, { amp: 0.5 }) + sketchArrowhead([600, 204], Math.PI / 2, r, 9);

    // Kept: instruction → open box (lid off, flaps out, a wash) → review.
    const openTop = LOW - 40;
    const openH = 86;
    const open = [
      sketchRect(BOX_X1 - BOX_X0, openH, r, { radius: [1.5, 3], drift: 0.8 }),
      sketchPolyline(
        [
          [BOX_X0, openTop],
          [BOX_X0 + dx, openTop + dy],
          [BOX_X1 + dx, openTop + dy],
          [BOX_X1, openTop],
        ],
        r,
      ),
      sketchPolyline(
        [
          [BOX_X1 + dx, openTop + dy],
          [BOX_X1 + dx, openTop + openH + dy],
          [BOX_X1, openTop + openH],
        ],
        r,
      ),
      sketchPolyline(
        [
          [BOX_X0, openTop],
          [BOX_X0 - 40, openTop - 16],
          [BOX_X0 - 28, openTop - 31],
          [BOX_X0 + dx, openTop + dy],
        ],
        r,
      ),
      sketchPolyline(
        [
          [BOX_X1 + dx, openTop + dy],
          [BOX_X1 + 62, openTop + dy - 4],
          [BOX_X1 + 50, openTop + 4],
          [BOX_X1, openTop],
        ],
        r,
      ),
    ];
    const inside = sketchRect(BOX_X1 - BOX_X0, openH, r, { closed: true, inset: 7, amp: 1.4, drift: 2 });
    const shadow = sketchRect(BOX_X1 - BOX_X0 + 26, 15, r, { closed: true, amp: 1.2, drift: 2, radius: [5, 7] });

    // The line: through the box, dipping under each word, rings on top.
    const low = LOW + DIP;
    const weave = sketchThrough(
      [
        [140, LOW],
        [400, LOW],
        ...bend(400, 432, LOW, low),
        [528, low],
        ...bend(528, 560, low, LOW),
        [640, LOW],
        ...bend(640, 672, LOW, low),
        [768, low],
        ...bend(768, 800, low, LOW),
        [LINE_END, LOW],
      ],
      r,
      { amp: 0.6 },
    );
    const keptHead = sketchArrowhead([LINE_END, LOW], 0, r, 9);
    const rings = RINGS.map((x) => ({ x, d: sketchRing(x, LOW, RING_R, r) }));

    return { closed, closedTop, down, open, openTop, inside, shadow, weave, keptHead, rings };
  }, []);
}

function WideDrawing({ dropped, kept, checkLabel }: Omit<PivotDiagramProps, 'caption'>) {
  const d = useWideDrawing();
  const label = `Dropped: ${dropped.from}, then “${dropped.box}”, then ${dropped.to}. Kept: ${kept.from}, then ${kept.inputs} and ${kept.steps} in an open box, then ${kept.to}, with the admin checking before, between and after.`;

  return (
    <svg
      className={styles.svg}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      role="img"
      aria-label={label}
    >
      {/* Dropped, lighter */}
      <g className={styles.muted}>
        <text x="0" y={TOP + 8} className={styles.label}>{dropped.from}</text>
        <path d={d.closed[0]} className={styles.stroke} />
        <g transform={`translate(${BOX_X0} ${d.closedTop})`}>
          <path d={d.closed[1]} className={styles.stroke} />
        </g>
        {d.closed.slice(2).map((p, i) => (
          <path key={i} d={p} className={styles.stroke} />
        ))}
        <text x={(BOX_X0 + BOX_X1) / 2} y={TOP + 9} textAnchor="middle" className={styles.label}>
          {dropped.box}
        </text>
        <text x={VIEW_W} y={TOP + 8} textAnchor="end" className={styles.label}>{dropped.to}</text>
      </g>

      <path d={d.down} className={[styles.stroke, styles.downStroke].join(' ')} />

      {/* Kept, full ink */}
      <g transform={`translate(${BOX_X0 - 13} ${d.openTop + 86 + 9})`}>
        <path d={d.shadow} className={styles.wash} />
      </g>
      <g transform={`translate(${BOX_X0} ${d.openTop})`}>
        <path d={d.inside} className={styles.wash} />
        <path d={d.open[0]} className={styles.stroke} />
      </g>
      {d.open.slice(1).map((p, i) => (
        <path key={i} d={p} className={styles.stroke} />
      ))}
      <path d={d.weave + d.keptHead} className={styles.stroke} />
      {d.rings.map(({ x, d: ring }) => (
        <g key={x}>
          <circle cx={x} cy={LOW} r={RING_R - 0.5} className={styles.paper} />
          <path d={ring} className={styles.stroke} />
        </g>
      ))}

      <text x="0" y={LOW + 8} className={styles.label}>{kept.from}</text>
      <text x={480} y={LOW + 8} textAnchor="middle" className={styles.label}>{kept.inputs}</text>
      <text x={720} y={LOW + 8} textAnchor="middle" className={styles.label}>{kept.steps}</text>
      <text x={VIEW_W} y={LOW + 8} textAnchor="end" className={styles.label}>{kept.to}</text>
      <text x={RINGS[0]} y={LOW + 52} textAnchor="middle" className={styles.caps}>{checkLabel}</text>
    </svg>
  );
}

function NarrowDrawing({ dropped, kept, checkLabel }: Omit<PivotDiagramProps, 'caption'>) {
  return (
    <div className={styles.narrow}>
      <div className={[styles.row, styles.rowDropped].join(' ')}>
        <span className={styles.end}>{dropped.from}</span>
        <SketchRule seed="pivot · dropped in" className={styles.rule} />
        <SketchBox seed="pivot · closed box" className={styles.box}>
          <span className={styles.boxLabel}>{dropped.box}</span>
        </SketchBox>
        <SketchRule seed="pivot · dropped out" arrow className={styles.rule} />
        <span className={styles.end}>{dropped.to}</span>
      </div>

      <SketchRule seed="pivot · down" arrow className={styles.down} />

      <div className={[styles.row, styles.rowKept].join(' ')}>
        <span className={styles.end}>{kept.from}</span>
        <SketchRule seed="pivot · kept in" rings={[0.5]} className={styles.rule} />
        <SketchBox seed="pivot · open box" open className={styles.box}>
          <span className={styles.boxInner}>
            <span>{kept.inputs}</span>
            <SketchRule seed="pivot · inside" rings={[0.5]} className={styles.innerRule} />
            <span>{kept.steps}</span>
          </span>
        </SketchBox>
        <SketchRule seed="pivot · kept out" arrow rings={[0.45]} className={styles.rule} />
        <span className={styles.end}>{kept.to}</span>
      </div>

      <p className={styles.key}>
        <SketchMark seed="pivot · key" kind="ring" size={20} />
        {checkLabel}
      </p>
    </div>
  );
}

/**
 * The pivot: the agent that decides on its own, dropped; the steps the
 * admin can check, kept. Labels stay real text at every width.
 */
export default function PivotDiagram({ caption, ...drawing }: PivotDiagramProps) {
  return (
    <RevealOnScroll as="figure" className={styles.figure}>
      <div className={styles.wide}>
        <WideDrawing {...drawing} />
      </div>
      <NarrowDrawing {...drawing} />
      <figcaption className={styles.caption}>{caption}</figcaption>
    </RevealOnScroll>
  );
}
