import EditorialPlate from './EditorialPlate';
import ProseBlock from './ProseBlock';
import type { Figure } from '../../data/chaiContent';
import styles from './DecisionRow.module.css';

export interface DecisionRowProps {
  id: string;
  /** The decision, stated as what the admin gets. */
  title: string;
  paragraphs: readonly string[];
  /** My design — large. */
  chosen: Figure;
  /** The option it was weighed against — small and dashed beside it. */
  weighedAgainst?: Figure;
}

/**
 * One design decision in the deck's decision shape: the headline is the
 * decision, two or three sentences carry the trade-off, and the screen
 * that won sits large beside the one it beat. Size shows the call.
 */
export default function DecisionRow({ id, title, paragraphs, chosen, weighedAgainst }: DecisionRowProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={styles.decision}>
      <h3 id={`${id}-title`} className={styles.title}>
        {title}
      </h3>
      <ProseBlock paragraphs={paragraphs} />
      <div className={[styles.plates, weighedAgainst ? styles.pair : ''].join(' ').trim()}>
        <EditorialPlate figure={chosen} className={styles.plate} />
        {weighedAgainst && <EditorialPlate figure={weighedAgainst} className={styles.plate} />}
      </div>
    </section>
  );
}
