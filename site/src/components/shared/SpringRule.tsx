import { useMemo } from 'react';
import { SPRING } from '../../interactions/pluckedLine';
import { useElementSize } from '../../interactions/useElementSize';
import { useInView } from '../../interactions/useInView';
import styles from './SpringRule.module.css';

/** The svg's height, and the baseline inside it. */
const HEIGHT = 72;
const BASE = 36;

/**
 * SpringRule — the cover's line, closing a case study.
 *
 * One construction rule, the cover's: a damped spring,
 * y = e^(−4.4u)·cos(2π·3.2u), plotted from the left until it lies flat, then
 * the flat line runs on as the rule across the measure. Energy spent, then
 * calm. It draws itself in when it comes on screen.
 *
 * The spring is 34% of the cover's width there; here it takes the first
 * `spring` px of the measure (capped at 30% of it) at `amp` px.
 */
export default function SpringRule({ spring = 240, amp = 26 }: { spring?: number; amp?: number }) {
  const { ref, width } = useElementSize<HTMLDivElement>();
  const [seenRef, seen] = useInView<SVGSVGElement>({ threshold: 0.6, rootMargin: '0px 0px -10% 0px' });

  const d = useMemo(() => {
    if (!width) return '';
    const len = Math.min(spring, width * 0.3);
    const a = amp * Math.min(1, len / spring);
    const pts: string[] = [];
    for (let x = 0; x < len; x += 1.5) {
      const u = x / len;
      const y = BASE - a * Math.exp(-SPRING.decay * u) * Math.cos(2 * Math.PI * SPRING.freq * u) * (1 - u * 0.02);
      pts.push(`${x.toFixed(1)} ${y.toFixed(2)}`);
    }
    pts.push(`${len.toFixed(1)} ${BASE}`, `${width} ${BASE}`);
    return `M${pts.join(' L')}`;
  }, [width, spring, amp]);

  return (
    <div ref={ref} className={styles.wrap} aria-hidden="true">
      <svg ref={seenRef} className={styles.line} height={HEIGHT} data-drawn={seen}>
        <path pathLength={1} d={d} />
      </svg>
    </div>
  );
}
