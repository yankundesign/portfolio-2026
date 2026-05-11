import styles from './ProjectHeader.module.css';

export interface ProjectHeaderHeroImage {
  src: string;
  alt: string;
}

export interface ProjectHeaderProps {
  figNumber: string;
  title: string;
  subtitle: string;
  yearRange: string;
  context: string;
  role: string;
  /**
   * Optional hero image. Sits between the italic subtitle and the meta
   * strip — a single uncaptioned plate that opens the chapter visually.
   * Treated as plate chrome (1px ink rule, paper-soft fill) so it stays
   * inside the editorial language; it is not a numbered figure.
   */
  heroImage?: ProjectHeaderHeroImage;
}

/**
 * Project detail header.
 *
 * Structured like a chapter opening:
 *   fig. 01
 *   Control Hub AI
 *   — subtitle, italic
 *   [optional hero image]
 *   Cisco Webex · Control Hub · 2024–present · Product Designer
 *
 * The fig number ties this detail page back to its card on the canvas —
 * both carry the same figure numeral in JetBrains Mono. The optional
 * hero image is a plain, uncaptioned plate; numbered figures begin
 * inside the body beats below.
 */
export default function ProjectHeader({
  figNumber,
  title,
  subtitle,
  yearRange,
  context,
  role,
  heroImage,
}: ProjectHeaderProps) {
  return (
    <header className={styles.header}>
      <p className={styles.figNumber} aria-hidden="true">
        {figNumber}
      </p>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>
        <em>{subtitle}</em>
      </p>
      {heroImage && (
        <figure className={styles.hero}>
          <img
            src={heroImage.src}
            alt={heroImage.alt}
            className={styles.heroImage}
            loading="eager"
          />
        </figure>
      )}
      <p className={styles.metaStrip}>
        <span>{context}</span>
        <span className={styles.sep} aria-hidden="true">·</span>
        <span>{yearRange}</span>
        <span className={styles.sep} aria-hidden="true">·</span>
        <span>{role}</span>
      </p>
    </header>
  );
}
