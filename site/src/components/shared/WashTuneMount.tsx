import { lazy, Suspense, useState } from 'react';

const WashTunePanel = lazy(() => import('./WashTunePanel'));

/**
 * WashTuneMount — gate that decides once on first render whether to mount
 * the WashTunePanel based on the URL.
 *
 * Reads ?tune=wash on first render only (per spec — not reactive to URL
 * changes). When absent, returns null so the panel module is never even
 * fetched, and zero overhead is added in production.
 *
 * Lazy-loading the panel keeps its bundle out of the main chunk for
 * everyone who doesn't pass ?tune=wash.
 */
export default function WashTuneMount() {
  const [shouldMount] = useState(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    return params.get('tune') === 'wash';
  });
  if (!shouldMount) return null;
  return (
    <Suspense fallback={null}>
      <WashTunePanel />
    </Suspense>
  );
}
