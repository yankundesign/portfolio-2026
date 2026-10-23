import RevealOnScroll from './RevealOnScroll';
import styles from './AtAGlance.module.css';

export interface AtAGlanceRow {
  label: string;
  text: string;
}

export interface AtAGlanceProps {
  rows: readonly AtAGlanceRow[];
}

/**
 * The whole case in four rows, directly under the header.
 *
 * Written for the reader who stops here: the task, the call, where it
 * landed, and its status. Mono label left, one Fraunces line right,
 * hairline rules between — a museum label for the chapter.
 */
export default function AtAGlance({ rows }: AtAGlanceProps) {
  return (
    <RevealOnScroll as="div" className={styles.glance}>
      <dl className={styles.list}>
        {rows.map((row) => (
          <div key={row.label} className={styles.row}>
            <dt className={styles.label}>{row.label}</dt>
            <dd className={styles.text}>{row.text}</dd>
          </div>
        ))}
      </dl>
    </RevealOnScroll>
  );
}
