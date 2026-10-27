import { Link } from 'react-router';
import { projects } from '../../data/cv';
import styles from './CvProjects.module.css';

/**
 * Independent projects — things built outside the day job.
 *
 * Same margin-year list as Education, with a one-line description and a
 * mono link. Internal hrefs route through React Router; external ones
 * open in a new tab.
 */
export default function CvProjects() {
  return (
    <section className={styles.projects} aria-labelledby="cv-projects-heading">
      <header className={styles.sectionHeader}>
        <span className={styles.sectionNumber}>§ 02</span>
        <h2 id="cv-projects-heading" className={styles.sectionTitle}>
          <em>Independent</em> projects
        </h2>
      </header>

      <ul className={styles.list}>
        {projects.map((project) => {
          const external = /^https?:\/\//.test(project.href);
          return (
            <li key={project.id} className={styles.entry}>
              <span className={styles.year}>{project.year}</span>
              <div className={styles.detail}>
                <h3 className={styles.heading}>
                  <span className={styles.name}>{project.name}</span>
                  <em className={styles.kind}>{project.kind}</em>
                </h3>
                <p className={styles.description}>{project.description}</p>
                <p className={styles.metaLine}>
                  <span>{project.range}</span>
                  <span className={styles.metaDot}>·</span>
                  {external ? (
                    <a href={project.href} target="_blank" rel="noopener noreferrer" className={styles.link}>
                      {project.linkLabel} ↗
                    </a>
                  ) : (
                    <Link to={project.href} className={styles.link}>
                      {project.linkLabel} →
                    </Link>
                  )}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
