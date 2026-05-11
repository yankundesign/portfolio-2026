import styles from './Credits.module.css';

export interface CreditsProps {
  design: string;
  partners: readonly string[];
}

/**
 * Credits block at the end of the case study.
 *
 * Role-only — no names. Site-wide rule (see .claude/rules/voice.md).
 * The design line acknowledges Yankun's role; the partners list
 * acknowledges the other disciplines that made the work possible.
 *
 * Visual treatment: a small dl with mono labels and body type. The
 * containing <section id="credits"> + SectionHeader in ChaiProject
 * provides the section anchor (vertical ink rule + "CREDITS" label),
 * so this component renders only the dl rows.
 */
export default function Credits({ design, partners }: CreditsProps) {
  return (
    <dl className={styles.list}>
      <div className={styles.row}>
        <dt className={styles.dt}>Design</dt>
        <dd className={styles.dd}>{design}</dd>
      </div>
      <div className={styles.row}>
        <dt className={styles.dt}>Made with</dt>
        <dd className={styles.dd}>
          {partners.map((p, i) => (
            <span key={p}>
              {p}
              {i < partners.length - 1 && <span className={styles.sep} aria-hidden="true">·</span>}
            </span>
          ))}
        </dd>
      </div>
    </dl>
  );
}
