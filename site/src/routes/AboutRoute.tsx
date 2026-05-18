import { useEffect } from 'react';
import Grain from '../components/shared/Grain';
import BackToDeskLink from '../components/shared/BackToDeskLink';
import AboutPolaroidHero from '../components/about/AboutPolaroidHero';
import AboutPolaroidCoda from '../components/about/AboutPolaroidCoda';
import AboutText from '../components/about/AboutText';
import { aboutCoda } from '../data/about';
import styles from './AboutRoute.module.css';

/**
 * /about — short editorial profile page.
 *
 * Follows the /cv route shell: paper page, top-left back navigation,
 * centered content column, no plate grid. The polaroid remains the tactile
 * object that carries the page's interaction.
 */
export default function AboutRoute() {
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
      <BackToDeskLink />

      <main className={styles.main} aria-labelledby="about-heading">
        <div className={styles.contentCol}>
          <header className={styles.header}>
            <span className={styles.sectionNumber}>About / 03</span>
            <h1 id="about-heading" className={styles.title}>
              Yankun Wang
            </h1>
          </header>

          <section className={styles.heroSection} aria-label="About Yankun">
            <div className={styles.heroSlot}>
              <AboutPolaroidHero />
            </div>

            <div className={styles.copySlot}>
              <AboutText />
            </div>
          </section>

          <section className={styles.codaSection} aria-label="Photo notes">
            <div className={styles.codaHeader}>
              <span className={styles.sectionNumber}>Photo notes</span>
              <p className={styles.hint}>
                Turn the large polaroid for notes.
              </p>
            </div>

            <div className={styles.codaLayer} aria-hidden="true">
              {aboutCoda.map((item, index) => (
                <AboutPolaroidCoda
                  key={item.id}
                  item={item}
                  className={styles[`coda${index + 1}`]}
                />
              ))}
            </div>
          </section>

          <footer className={styles.footer}>
            <a href="mailto:yankunux@gmail.com" className={styles.email}>
              yankunux@gmail.com
            </a>
            <span>self-portrait / 2026</span>
          </footer>
        </div>
      </main>
    </div>
  );
}
