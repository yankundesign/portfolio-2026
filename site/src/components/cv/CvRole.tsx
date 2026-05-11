import { useState, useId } from 'react';
import type { CvRole as CvRoleData } from '../../data/cv';
import styles from './CvRole.module.css';

export interface CvRoleProps {
  role: CvRoleData;
  /** Controls whether the role starts expanded. The first role defaults open. */
  defaultOpen?: boolean;
  /** 01, 02, 03 — shown in the margin. */
  index: number;
}

/**
 * Single role block. Expand/collapse via click or Enter/Space.
 *
 * Layout mimics a zine spread: year range hugs the left margin (mono caps),
 * display title block sits in the main column, bullets unfold below.
 * Company name is italic Fraunces — an italic-roman pairing, per the guideline.
 */
export default function CvRole({ role, defaultOpen = false, index }: CvRoleProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <article className={`${styles.role} ${open ? styles.open : ''}`}>
      <aside className={styles.margin} aria-hidden="true">
        <span className={styles.index}>{String(index).padStart(2, '0')}</span>
        <span className={styles.rangeVertical}>{role.range}</span>
      </aside>

      <div className={styles.body}>
        <button
          type="button"
          className={styles.header}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          <h2 className={styles.heading}>
            <span className={styles.title}>{role.title}</span>
            <span className={styles.at}>at</span>
            <em className={styles.company}>{role.company}</em>
          </h2>
          <span className={styles.toggleMark} aria-hidden="true">
            {open ? '—' : '+'}
          </span>
        </button>

        <p className={styles.metaLine}>
          <span>{role.location}</span>
          <span className={styles.metaDot}>·</span>
          <span>{role.range}</span>
        </p>

        <p className={styles.summary}>{role.summary}</p>

        <div
          id={panelId}
          className={styles.panel}
          hidden={!open}
          role="region"
          aria-label={`${role.title} at ${role.company} — details`}
        >
          <ul className={styles.bullets}>
            {role.bullets.map((bullet, i) => (
              <li
                key={i}
                className={styles.bullet}
                style={{ ['--bullet-delay' as string]: `${i * 60}ms` }}
              >
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
