import { useInView } from '../../interactions/useInView';
import { useCountUp } from '../../interactions/useCountUp';
import styles from './InlineMetric.module.css';

export interface InlineMetricProps {
  figure: number;
  suffix?: string;
  label: string;
}

/**
 * Inline proof-of-feature metric — used within proof sections (Smart
 * Search's 86% and 14%, etc.), not for the outcome moment.
 *
 * Typographic treatment is smaller than the outcome MetricDisplay:
 * ~56px figure, mono caption beneath. Counts up when it enters the
 * viewport.
 */
export default function InlineMetric({ figure, suffix, label }: InlineMetricProps) {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.5 });
  const value = useCountUp({ to: figure, active: inView });

  return (
    <aside ref={ref} className={styles.metric} aria-label={`${figure}${suffix ?? ''} — ${label}`}>
      <span className={styles.figure}>
        <span className={styles.value}>{value}</span>
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </span>
      <p className={styles.label}>{label}</p>
    </aside>
  );
}
