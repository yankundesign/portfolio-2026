import { useInView } from '../../interactions/useInView';
import { useCountUp } from '../../interactions/useCountUp';
import RevealOnScroll from './RevealOnScroll';
import styles from './MetricDisplay.module.css';

export interface MetricDisplayProps {
  before: number;
  after: number;
  suffix?: string;
  label: string;
  context?: string;
  /**
   * 'field' — for an ink outcome field: the figures lead, and the label and
   * scope follow as one ruled row beneath them, so the claim and its scope
   * read together before any prose. Default keeps the label above.
   */
  layout?: 'default' | 'field';
}

/**
 * The outcome moment.
 *
 * Display-XL numbers with an arrow between them. Breaks the reading
 * rhythm deliberately: the page has been vertical prose up to now; the
 * outcome arrives as visual punctuation, takes the full page width,
 * then returns to prose for the reflection.
 *
 * Counts up on scroll into view (respects reduced motion).
 */
export default function MetricDisplay({
  before,
  after,
  suffix = '%',
  label,
  context,
  layout = 'default',
}: MetricDisplayProps) {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.35 });
  const beforeVal = useCountUp({ to: before, active: inView, duration: 900 });
  const afterVal = useCountUp({ to: after, active: inView, duration: 1400 });
  const isField = layout === 'field';

  return (
    <RevealOnScroll
      as="section"
      className={[styles.wrap, isField ? styles.field : ''].join(' ').trim()}
      translate={32}
    >
      <div ref={ref as React.Ref<HTMLDivElement>} className={styles.inner}>
        {!isField && <p className={styles.label}>{label}</p>}
        <div className={styles.figures} aria-label={`from ${before}${suffix} to ${after}${suffix}`}>
          <span className={styles.figure}>
            <span className={styles.value}>{beforeVal}</span>
            <span className={styles.suffix}>{suffix}</span>
          </span>
          <span className={styles.arrow} aria-hidden="true">→</span>
          <span className={[styles.figure, styles.figureAfter].join(' ')}>
            <span className={styles.value}>{afterVal}</span>
            <span className={styles.suffix}>{suffix}</span>
          </span>
        </div>
        {isField ? (
          <p className={styles.scopeRow}>
            <span className={styles.label}>{label}</span>
            {context && <span className={styles.context}>{context}</span>}
          </p>
        ) : (
          context && <p className={styles.context}>{context}</p>
        )}
      </div>
    </RevealOnScroll>
  );
}
