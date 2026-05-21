import { useState } from 'react';
import FigCaption from '../shared/FigCaption';
import { heroAnnotation } from '../../data/about';
import { useObjectTilt } from '../../interactions/useObjectTilt';
import styles from './AboutPolaroid.module.css';

export default function AboutPolaroidHero() {
  const [flipped, setFlipped] = useState(false);
  const { ref, tiltHandlers } = useObjectTilt<HTMLButtonElement>({
    maxDegrees: 10,
    liftY: -10,
    scale: 1.025,
  });

  return (
    <figure className={`${styles.figure} ${styles.heroFigure}`}>
      <button
        ref={ref}
        type="button"
        className={`${styles.polaroidButton} ${styles.heroButton} ${
          flipped ? styles.isFlipped : ''
        }`}
        aria-pressed={flipped}
        aria-label={flipped ? 'Show the front of the About polaroid' : 'Turn the About polaroid for notes'}
        onClick={() => setFlipped((value) => !value)}
        {...tiltHandlers}
      >
        <span className={styles.polaroidShadow} aria-hidden="true" />
        <span className={styles.polaroidObject}>
          <span className={styles.flipStack}>
            <span className={`${styles.polaroid} ${styles.front}`} aria-hidden={flipped}>
              <span className={styles.imageWindow}>
                <img
                  src="/images/about/me.png"
                  alt="Yankun, photographed for the About page."
                  className={styles.imageWindowPhoto}
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span className={styles.printCaption}>NICE TO MEET YOU</span>
            </span>

            <span className={`${styles.polaroid} ${styles.back}`} aria-hidden={!flipped}>
              <span className={styles.backStamp}>
                <span>
                  <b>LOC.</b> {heroAnnotation.location}
                </span>
                <span>
                  <b>DATE</b> {heroAnnotation.date}
                </span>
                <span>
                  <b>NOTE</b> {heroAnnotation.note}
                </span>
              </span>
            </span>
          </span>
        </span>
      </button>

      <FigCaption number={6} label="about" align="left" />
    </figure>
  );
}
