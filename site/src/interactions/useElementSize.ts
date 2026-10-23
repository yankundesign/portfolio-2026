import { useLayoutEffect, useRef, useState } from 'react';

/**
 * Measures an element's layout box and keeps it current.
 *
 * Returns `{ ref, width, height }` in whole CSS pixels. Uses offset sizes,
 * so transforms (reveal-on-scroll translates) don't distort the reading.
 * Width and height are 0 until the first layout.
 */
export function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const width = el.offsetWidth;
      const height = el.offsetHeight;
      setSize((s) => (s.width === width && s.height === height ? s : { width, height }));
    };

    measure();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, ...size };
}
