import { useEffect, useState, type RefObject } from 'react';
import { PlateFlight } from './plateFlight';
import { useReducedMotion } from './useReducedMotion';

/**
 * usePlateFlight — the works page's plate grows out of its thumbnail (see
 * PlateFlight). Raises the plate for `index` (a title pointed at), or flies it
 * home when `index` is −1.
 */
export function usePlateFlight(pageRef: RefObject<HTMLElement | null>, index: number): void {
  const reducedMotion = useReducedMotion();
  const [flight] = useState(() => new PlateFlight());

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;
    flight.attach(page);
    return () => flight.detach();
  }, [flight, pageRef]);

  useEffect(() => { flight.configure({ reducedMotion }); }, [flight, reducedMotion]);

  useEffect(() => {
    if (index >= 0) flight.point(index);
    else flight.release();
  }, [flight, index]);
}
