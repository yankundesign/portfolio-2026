import type { ReactNode } from 'react';
import styles from './NotebookPage.module.css';

export interface NotebookPageHeader {
  /** Mono caps section label, e.g. `NOTE / 001 — WORKS`. */
  label: string;
  /** Optional one-line description in italic Fraunces below the label. */
  description?: string;
}

export interface NotebookPageProps {
  header?: NotebookPageHeader;
  /** Project rows (or any other page content). */
  children: ReactNode;
}

/**
 * NotebookPage — single notebook page slot.
 *
 * Holds an optional editorial header (mono caps label + optional Fraunces
 * description) and a vertical stack of project rows beneath it. Used for
 * both the left (verso) and right (recto) pages of the spread.
 */
export default function NotebookPage({ header, children }: NotebookPageProps) {
  return (
    <div className={styles.page}>
      {header && (
        <header className={styles.header}>
          <span className={styles.label}>{header.label}</span>
          {header.description && (
            <p className={styles.description}>{header.description}</p>
          )}
        </header>
      )}
      <div className={styles.rows}>{children}</div>
    </div>
  );
}
