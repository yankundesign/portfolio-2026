import type { PlateHead as PlateHeadData } from '../../data/chaiContent';
import styles from './PlateHead.module.css';

export interface PlateHeadProps {
  head: PlateHeadData;
}

const ROAD_MAP = ['Find', 'Understand', 'Fix'] as const;
const ROAD_MAP_KEYS = ['find', 'understand', 'fix'] as const;

/**
 * Ruled plate head — one mono line under an ink rule, above the frame.
 *
 * Left: a fixed-position sequence (CHAI's Find → Understand → Fix, the
 * Agentic run's Ask → Plan → Run → Result, Explore → Turn → Bridge), every
 * item in the same place on every plate with this plate's marked; and / or
 * a version or surface label. Right: a date, and a status only where a
 * source states one. Wraps rather than collides when the line runs out.
 */
export default function PlateHead({ head }: PlateHeadProps) {
  const { stage, label, meta, status } = head;
  const sequence =
    head.sequence ??
    (stage
      ? { name: 'Road map stage', items: ROAD_MAP, current: ROAD_MAP_KEYS.indexOf(stage) }
      : undefined);

  return (
    <div className={styles.head}>
      <div className={styles.lead}>
        {sequence && (
          <ol
            className={styles.stages}
            aria-label={`${sequence.name}: ${sequence.items[sequence.current]}`}
          >
            {sequence.items.map((item, i) => (
              <li
                key={item}
                className={i === sequence.current ? styles.current : undefined}
                aria-current={i === sequence.current ? 'step' : undefined}
              >
                {item}
              </li>
            ))}
          </ol>
        )}
        {label && <span className={styles.label}>{label}</span>}
      </div>
      {(meta || status) && (
        <div className={styles.trail}>
          {meta && <span>{meta}</span>}
          {status && <span className={styles.status}>{status}</span>}
        </div>
      )}
    </div>
  );
}
