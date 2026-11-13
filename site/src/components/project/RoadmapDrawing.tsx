import { Link } from 'react-router';
import RevealOnScroll from './RevealOnScroll';
import styles from './RoadmapDrawing.module.css';

export interface RoadmapStage {
  word: string;
  /** In-page anchor: each job is a chapter of the case study. */
  href: string;
  items: readonly string[];
}

export interface RoadmapDrawingProps {
  stages: readonly RoadmapStage[];
  /** Where the roadmap leads: another case study. */
  next: { word: string; slug: string; label: string; number: string };
  caption: string;
}

/**
 * CHAI's roadmap as a drawing, replacing the coloured roadmap image.
 *
 * Construction: one ink rule runs under the whole sequence, with a tick
 * where each job starts. The three jobs sit on the solid rule; the rule
 * turns dashed for what came after (agentic AI), and ends in an arrow.
 * Each job links to its chapter on the page; the last links to the case
 * study it became.
 */
export default function RoadmapDrawing({ stages, next, caption }: RoadmapDrawingProps) {
  return (
    <RevealOnScroll as="figure" className={styles.figure}>
      <ol className={styles.stages}>
        {stages.map((stage) => (
          <li key={stage.word} className={styles.stage}>
            <a href={stage.href} className={styles.word}>
              {stage.word}
            </a>
            <ul className={styles.items}>
              {stage.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
        <li className={`${styles.stage} ${styles.stageNext}`}>
          <Link to={`/works/${next.slug}`} className={styles.word}>
            {next.word}
          </Link>
          <ul className={styles.items}>
            <li>
              <Link to={`/works/${next.slug}`} className={styles.nextLink}>
                <span className={styles.nextNumber}>{next.number}</span> {next.label}{' '}
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          </ul>
        </li>
      </ol>
      <figcaption className={styles.caption}>{caption}</figcaption>
    </RevealOnScroll>
  );
}
