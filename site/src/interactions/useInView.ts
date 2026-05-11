import { useEffect, useRef, useState } from 'react';

interface InViewOptions {
  /** Fraction of the element that must be visible to trigger. 0–1. */
  threshold?: number;
  /** rootMargin passed to the IntersectionObserver. */
  rootMargin?: string;
  /** If true (default), stop observing after the first intersection. */
  once?: boolean;
}

/**
 * Observe when an element enters the viewport.
 * Returns a ref to attach and a boolean flag.
 *
 * Used for one-shot animations like the metric count-up.
 */
export function useInView<T extends Element>({
  threshold = 0.25,
  rootMargin = '0px 0px -10% 0px',
  once = true,
}: InViewOptions = {}): [React.MutableRefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Fallback for environments without IntersectionObserver.
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView];
}
