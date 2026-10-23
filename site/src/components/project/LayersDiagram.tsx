import RevealOnScroll from './RevealOnScroll';
import { SketchFrame, SketchRule } from './Sketch';
import styles from './LayersDiagram.module.css';

export interface LayersDiagramProps {
  task: { label: string; text: string };
  mine: { label: string; title: string; steps: readonly string[] };
  builtOn: string;
  platform: { title: string; label: string };
  notBuilt: { title: string; label: string; note: string };
  caption: string;
}

/**
 * Slide 40's drawing, by hand: the admin's task on top, my layer as the
 * ink block, the platform underneath as the ground it's built on. Agent
 * Builder sits beside the platform, faint and dashed — the work we chose
 * not to duplicate. Arrows run from our work down into theirs.
 */
export default function LayersDiagram({
  task,
  mine,
  builtOn,
  platform,
  notBuilt,
  caption,
}: LayersDiagramProps) {
  return (
    <RevealOnScroll as="figure" className={styles.figure}>
      <div className={styles.drawing}>
        <SketchFrame seed="layers · task" tone="soft" className={styles.block}>
          <div className={styles.task}>
            <p className={styles.label}>{task.label}</p>
            <p className={styles.quote}>&ldquo;{task.text}&rdquo;</p>
          </div>
        </SketchFrame>

        <SketchRule seed="layers · asks" arrow className={styles.connector} />

        <SketchFrame seed="layers · mine" tone="ink" className={styles.block}>
          <div className={styles.mine}>
            <div className={styles.mineHead}>
              <p className={styles.mineTitle}>{mine.title}</p>
              <p className={styles.mineLabel}>{mine.label}</p>
            </div>
            <ol className={styles.steps}>
              {mine.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </SketchFrame>

        <div className={styles.builtOn}>
          <SketchRule seed="layers · built on" arrow className={styles.connector} />
          <span className={styles.connectorLabel}>{builtOn}</span>
        </div>

        <SketchFrame seed="layers · workflows" tone="dashed" wash className={styles.block}>
          <div className={styles.platform}>
            <p className={styles.platformTitle}>{platform.title}</p>
            <p className={styles.label}>{platform.label}</p>
          </div>
        </SketchFrame>

        <div className={styles.aside}>
          <SketchFrame seed="layers · agent builder" tone="faint" className={styles.block}>
            <div className={[styles.platform, styles.notBuilt].join(' ')}>
              <p className={styles.platformTitle}>{notBuilt.title}</p>
              <p className={styles.label}>{notBuilt.label}</p>
            </div>
          </SketchFrame>
          <p className={styles.note}>{notBuilt.note}</p>
        </div>
      </div>
      <figcaption className={styles.caption}>{caption}</figcaption>
    </RevealOnScroll>
  );
}
