import { aboutParagraphs } from '../../data/about';
import styles from './AboutText.module.css';

export default function AboutText() {
  return (
    <div className={styles.copy} aria-label="About Yankun">
      {aboutParagraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}
