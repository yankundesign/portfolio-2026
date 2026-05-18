import type { CSSProperties } from 'react';
import FigCaption from '../shared/FigCaption';
import type { AboutCodaItem } from '../../data/about';
import { usePolaroidTilt } from '../../interactions/usePolaroidTilt';
import styles from './AboutPolaroid.module.css';

export interface AboutPolaroidCodaProps {
  item: AboutCodaItem;
  className?: string;
}

export default function AboutPolaroidCoda({ item, className }: AboutPolaroidCodaProps) {
  const { ref, tiltHandlers } = usePolaroidTilt<HTMLDivElement>(4);
  const tapeClass =
    item.tape === 'center'
      ? styles.tapeCenter
      : item.tape === 'right'
        ? styles.tapeRight
        : styles.tapeLeft;

  return (
    <figure
      className={`${styles.figure} ${styles.codaFigure} ${className ?? ''}`}
      style={{ '--rest-rotation': item.rotation } as CSSProperties}
      aria-hidden="true"
    >
      <div ref={ref} className={`${styles.polaroidButton} ${styles.codaButton}`} {...tiltHandlers}>
        <div className={`${styles.polaroid} ${styles.coda}`}>
          <span className={`${styles.tape} ${tapeClass}`} aria-hidden="true" />
          <span className={styles.imageWindow} aria-hidden="true" />
          <span className={styles.printCaption}>{item.caption}</span>
        </div>
      </div>
      <FigCaption number={item.fig} label="" align="left" />
    </figure>
  );
}
