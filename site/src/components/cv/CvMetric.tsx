import { useInView } from '../../interactions/useInView';
import { useCountUp } from '../../interactions/useCountUp';
import type { CvMetric as CvMetricData } from '../../data/cv';
import styles from './CvMetric.module.css';

export interface CvMetricProps {
  metric: CvMetricData;
  /** "+" or "−" prefix, set by caller to color the meaning. */
  valence?: 'up' | 'down';
}

/**
 * Pull-quote metric moment. Breaks the column with a display-XL figure,
 * a mono caption, and a hairline rule above.
 *
 * On scroll into view, the number counts up from 0 (respecting
 * prefers-reduced-motion).
 */
export default function CvMetric({ metric, valence = 'up' }: CvMetricProps) {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.4 });
  const value = useCountUp({
    to: metric.countTo ?? Number(metric.figure),
    active: inView,
  });

  const arrow = valence === 'down' ? '↓' : '↑';

  return (
    <aside ref={ref} className={styles.metric} aria-label={`Metric: ${metric.figure}${metric.suffix ?? ''} — ${metric.caption}`}>
      <span className={styles.arrow} aria-hidden="true">
        {arrow}
      </span>
      <span className={styles.figure}>
        <span className={styles.value}>{value}</span>
        {metric.suffix && <span className={styles.suffix}>{metric.suffix}</span>}
      </span>
      <p className={styles.caption}>{metric.caption}</p>
    </aside>
  );
}
