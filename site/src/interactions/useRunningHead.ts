import { useEffect, useState } from 'react';

/**
 * The running head: which chapter the reader is in, the way a book's running
 * head names the chapter on every page.
 *
 * The current chapter is the last one whose top has passed a line 40% down
 * the viewport. Between two chapters the earlier one stays current; above the
 * first, there is none (the opener names the project itself).
 *
 * An observer watches each chapter cross a thin band at that line, and on
 * every crossing the head is worked out again from where all the chapters
 * are, so a long jump (a link, Home / End) lands on the right chapter too.
 *
 * `ids` must be a stable array (a module constant), or the observer restarts.
 */
export function useRunningHead(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const locate = () => {
      const line = window.innerHeight * 0.4;
      let current: string | null = null;
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
        else break;
      }
      setActive(current);
    };

    const observer = new IntersectionObserver(locate, { rootMargin: '-40% 0px -59% 0px' });
    elements.forEach((el) => observer.observe(el));
    window.addEventListener('resize', locate);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', locate);
    };
  }, [ids]);

  return active;
}
