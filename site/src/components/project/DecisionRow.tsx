import EditorialPlate from './EditorialPlate';
import VideoPlate from './VideoPlate';
import ProseBlock from './ProseBlock';
import type { Figure } from '../../data/chaiContent';
import type { VideoFigure } from '../../data/ebbContent';
import styles from './DecisionRow.module.css';

export interface DecisionRowProps {
  id: string;
  /** The decision, stated as what the admin gets. */
  title: string;
  paragraphs: readonly string[];
  /** Where the decision started — a recording, shown before where it landed. */
  started?: VideoFigure;
  /** My design — large. */
  chosen: Figure;
  /** The option it was weighed against — small and dashed beside it. */
  weighedAgainst?: Figure;
  /** Extra class for the section (a layout's nesting wrapper). */
  className?: string;
  /**
   * Set where it started and where it ended up side by side, 5 : 7, the
   * start smaller (instead of stacked). Only applies when `started` is set.
   */
  pairStarted?: boolean;
}

/**
 * One design decision in the deck's decision shape: the headline is the
 * decision, two or three sentences carry the trade-off, and the screen
 * that won sits large. When the deck shows where the idea started, that
 * comes first; when it shows an option that lost, that sits small beside.
 */
export default function DecisionRow({
  id,
  title,
  paragraphs,
  started,
  chosen,
  weighedAgainst,
  className,
  pairStarted = false,
}: DecisionRowProps) {
  const lead = Boolean(started) && pairStarted;
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={[styles.decision, className ?? ''].join(' ').trim()}>
      <h3 id={`${id}-title`} className={styles.title}>
        {title}
      </h3>
      <ProseBlock paragraphs={paragraphs} />
      {started && !lead && (
        <div className={styles.plates} data-measure="plate">
          <VideoPlate figure={started} className={styles.plate} />
        </div>
      )}
      <div
        className={[
          styles.plates,
          lead ? styles.lead : weighedAgainst ? styles.pair : '',
        ]
          .join(' ')
          .trim()}
        data-measure="plate"
      >
        {lead && started && <VideoPlate figure={started} className={styles.plate} />}
        <EditorialPlate figure={chosen} className={styles.plate} />
        {weighedAgainst && <EditorialPlate figure={weighedAgainst} className={styles.plate} />}
      </div>
    </section>
  );
}
