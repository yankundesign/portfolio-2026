import { useCallback, useEffect, useState } from 'react';
import styles from './SectionRail.module.css';

export interface SectionRailItem {
  id: string;
  label: string;
}

export interface SectionRailProps {
  /** Ordered list of section ids + labels. Each id must match a DOM element on the page. */
  sections: readonly SectionRailItem[];
  /** Optional outer class — used to position the rail in a parent grid. */
  className?: string;
}

/**
 * Sticky left-side section rail.
 *
 * Lists each case-study section as a small mono-caps label hung off a
 * 1px ink-muted spine. Active state slides a 1px ink rule onto the
 * matching item as the reader scrolls. Clicking any item smooth-scrolls
 * to that section and updates the URL hash without a page jump.
 *
 * Hidden below 960px — mobile case studies are read top to bottom; the
 * rail only earns its space on desktop. The hide is enforced by the
 * parent grid (see ChaiProject.module.css) collapsing this column.
 *
 * Active-section detection uses IntersectionObserver with a band that
 * sits ~25% from the top of the viewport — a section becomes "active"
 * when its top edge passes that line, which feels natural while reading.
 *
 * Respects `prefers-reduced-motion`: smooth scroll falls back to
 * instant jump, transitions disabled.
 */
export default function SectionRail({ sections, className }: SectionRailProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? '');

  // Track which section is in the active band as the user scrolls.
  useEffect(() => {
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the topmost intersecting section. If multiple are in the band,
        // the one with the smallest (most negative or least positive) top
        // wins — that's the section the reader is currently in.
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;

        const topMost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
        );
        setActiveId(topMost.target.id);
      },
      {
        // Active band: top 25% to top 35%. Section becomes active when its
        // top edge crosses that band.
        rootMargin: '-25% 0px -65% 0px',
        threshold: 0,
      },
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const el = document.getElementById(id);
      if (!el) return;

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      el.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'start',
      });
      window.history.replaceState(null, '', `#${id}`);
      setActiveId(id);
    },
    [],
  );

  return (
    <nav className={[styles.rail, className ?? ''].join(' ').trim()} aria-label="Case study sections">
      <ol className={styles.list}>
        {sections.map(({ id, label }) => {
          const isActive = id === activeId;
          return (
            <li key={id} className={styles.item}>
              <a
                href={`#${id}`}
                onClick={(e) => handleClick(e, id)}
                className={[styles.link, isActive ? styles.linkActive : ''].join(' ').trim()}
                aria-current={isActive ? 'true' : undefined}
              >
                <span className={styles.label}>{label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
