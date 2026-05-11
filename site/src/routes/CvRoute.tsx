import { useEffect } from 'react';
import { Link } from 'react-router';
import CvCover from '../components/cv/CvCover';
import CvRole from '../components/cv/CvRole';
import CvMetric from '../components/cv/CvMetric';
import CvSkills from '../components/cv/CvSkills';
import CvEducation from '../components/cv/CvEducation';
import CvDownload from '../components/cv/CvDownload';
import Grain from '../components/shared/Grain';
import { roles, metrics, intro } from '../data/cv';
import styles from './CvRoute.module.css';

/**
 * /cv — the experience page.
 *
 * Composition (top to bottom, vertical scroll):
 *   Cover     → display-XL name block with italic intrusion
 *   Intro     → short first-person paragraph
 *   § 01      → Experience: stacked roles, margin year-ranges, expandable bullets
 *   Metric    → pull-out metric moments that anchor to a role
 *   § 02      → Skills specimen grid
 *   § 03      → Education
 *   Colophon  → tiny mono footer line, download echo
 *
 * Scroll is enabled on this route only; global body has overflow hidden for
 * the desk scene.
 */
export default function CvRoute() {
  // Global html/body has overflow:hidden for the desk scene.
  // Enable scrolling only while this route is mounted.
  useEffect(() => {
    const prev = {
      htmlOverflow: document.documentElement.style.overflow,
      bodyOverflow: document.body.style.overflow,
    };
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';

    return () => {
      document.documentElement.style.overflow = prev.htmlOverflow;
      document.body.style.overflow = prev.bodyOverflow;
    };
  }, []);

  return (
    <div className={styles.page}>
      <Grain />

      <nav className={styles.topNav} aria-label="Primary">
        <Link to="/" className={styles.back}>
          <span aria-hidden="true">←</span> back to desk
        </Link>
      </nav>

      <main className={styles.main}>
        <div className={styles.contentCol}>
          <CvCover />

          <div className={styles.pinnedSlot}>
            <CvDownload variant="pinned" />
          </div>

          <p className={styles.intro}>{intro}</p>

          <section aria-labelledby="cv-experience-heading" className={styles.experience}>
            <header className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>§ 01</span>
              <h2 id="cv-experience-heading" className={styles.sectionTitle}>
                What I've been <em>doing</em>
              </h2>
            </header>

            {roles.map((role, i) => {
              const anchoredMetrics = metrics.filter((m) => m.anchor === role.id);
              return (
                <div key={role.id}>
                  <CvRole role={role} index={i + 1} defaultOpen={i === 0} />
                  {anchoredMetrics.length > 0 && (
                    <div className={styles.metricsRow}>
                      {anchoredMetrics.map((metric) => (
                        <CvMetric
                          key={metric.id}
                          metric={metric}
                          valence={metric.id === 'search' ? 'down' : 'up'}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </section>

          <CvSkills />
          <CvEducation />

          <footer className={styles.colophon}>
            <p className={styles.colophonLine}>
              Typeset in <em>Fraunces</em> &amp; JetBrains Mono · last updated 2026&ndash;04&ndash;22
            </p>
            <CvDownload variant="inline" label="Download the PDF version" />
          </footer>
        </div>
      </main>
    </div>
  );
}
