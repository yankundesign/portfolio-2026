import { pdfHref, pdfDownloadName } from '../../data/cv';
import styles from './CvDownload.module.css';

export interface CvDownloadProps {
  /** "pinned" = sticky top-right; "inline" = flows in content. */
  variant?: 'pinned' | 'inline';
  /** Override the default label. */
  label?: string;
}

/**
 * Download button — typographic, not icon-driven (per design-tokens rule).
 * A small arrow mark is inline SVG; the label does the heavy lifting.
 */
export default function CvDownload({ variant = 'pinned', label = 'Download PDF' }: CvDownloadProps) {
  return (
    <a
      href={pdfHref}
      download={pdfDownloadName}
      className={`${styles.link} ${variant === 'pinned' ? styles.pinned : styles.inline}`}
      aria-label="Download Yankun Wang CV as PDF"
    >
      <span className={styles.hint}>pdf</span>
      <span className={styles.label}>{label}</span>
      <svg
        className={styles.arrow}
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <line x1="10" y1="3" x2="10" y2="15" />
        <polyline points="5,10 10,15 15,10" />
        <line x1="4" y1="18" x2="16" y2="18" />
      </svg>
    </a>
  );
}
