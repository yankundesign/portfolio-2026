import type { CSSProperties } from 'react';
import FigCaption from '../shared/FigCaption';
import type { AboutCodaItem } from '../../data/about';
import { useObjectTilt } from '../../interactions/useObjectTilt';
import styles from './AboutPolaroid.module.css';

export interface AboutPolaroidCodaProps {
  item: AboutCodaItem;
  className?: string;
}

export default function AboutPolaroidCoda({ item, className }: AboutPolaroidCodaProps) {
  const { ref, tiltHandlers } = useObjectTilt<HTMLDivElement>({
    maxDegrees: 9,
    liftY: -8,
    scale: 1.025,
  });

  return (
    <figure
      className={`${styles.figure} ${styles.codaFigure} ${className ?? ''}`}
      style={{ '--rest-rotation': item.rotation } as CSSProperties}
      aria-hidden="true"
    >
      <div ref={ref} className={`${styles.polaroidButton} ${styles.codaButton}`} {...tiltHandlers}>
        <span className={styles.polaroidShadow} aria-hidden="true" />
        <div className={styles.polaroidObject}>
          <div className={`${styles.polaroid} ${styles.coda}`}>
            <span className={styles.imageWindow}>
              <img src={item.image} alt="" className={styles.imageWindowPhoto} loading="lazy" decoding="async" />
            </span>
            <span className={styles.printCaption}>{item.caption}</span>
          </div>
        </div>
      </div>
      <FigCaption number={item.fig} label="" align="left" />
    </figure>
  );
}
