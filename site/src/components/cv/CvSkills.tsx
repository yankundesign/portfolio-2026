import { skillGroups } from '../../data/cv';
import styles from './CvSkills.module.css';

/**
 * Skills specimen block — directly inspired by Mary Kim's typographic grids.
 *
 * Category labels hang in mono caps on the left column. Skill tokens are
 * laid out as small Fraunces caps with hairline separators. Hover on a
 * token gives it weight — feels like underlining in pencil.
 */
export default function CvSkills() {
  return (
    <section className={styles.skills} aria-labelledby="cv-skills-heading">
      <header className={styles.sectionHeader}>
        <span className={styles.sectionNumber}>§ 02</span>
        <h2 id="cv-skills-heading" className={styles.sectionTitle}>
          A <em>working</em> vocabulary
        </h2>
      </header>

      <dl className={styles.grid}>
        {skillGroups.map((group) => (
          <div key={group.label} className={styles.group}>
            <dt className={styles.groupLabel}>{group.label}</dt>
            <dd className={styles.groupTokens}>
              <ul>
                {group.skills.map((skill) => (
                  <li key={skill} className={styles.token}>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
