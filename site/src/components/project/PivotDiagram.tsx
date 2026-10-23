import RevealOnScroll from './RevealOnScroll';
import { SketchBox, SketchMark, SketchRule } from './Sketch';
import styles from './PivotDiagram.module.css';

export interface PivotDiagramProps {
  dropped: { from: string; box: string; to: string };
  kept: { from: string; inputs: string; steps: string; to: string };
  checkLabel: string;
  caption: string;
}

/**
 * Slide 30's drawing, by hand: the closed box the team dropped (an agent
 * that decides) and the same box opened (inputs and steps, with a ring at
 * every point the admin checks). Labels are real text; the rows turn
 * vertical at phone width and the rules redraw themselves to match.
 */
export default function PivotDiagram({ dropped, kept, checkLabel, caption }: PivotDiagramProps) {
  return (
    <RevealOnScroll as="figure" className={styles.figure}>
      <div className={styles.drawing}>
        <p className={styles.tag}>Dropped</p>
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

        <p className={[styles.tag, styles.tagKept].join(' ')}>My call</p>
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
      <figcaption className={styles.caption}>{caption}</figcaption>
    </RevealOnScroll>
  );
}
