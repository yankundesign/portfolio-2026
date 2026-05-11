import { education } from '../../data/cv';
import styles from './CvEducation.module.css';

export default function CvEducation() {
  return (
    <section className={styles.education} aria-labelledby="cv-education-heading">
      <header className={styles.sectionHeader}>
        <span className={styles.sectionNumber}>§ 03</span>
        <h2 id="cv-education-heading" className={styles.sectionTitle}>
          Education
        </h2>
      </header>

      <ul className={styles.list}>
        {education.map((entry, i) => (
          <li key={i} className={styles.entry}>
            <span className={styles.year}>{entry.year}</span>
            <div className={styles.detail}>
              <h3 className={styles.institution}>{entry.institution}</h3>
              <p className={styles.line}>
                <em>{entry.degree}</em>
                <span className={styles.sep}>·</span>
                {entry.field}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
