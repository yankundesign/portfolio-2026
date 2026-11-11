import { useCallback } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * usePlateLoop — plays a project's preview loop in the works page's single
 * plate while its title is pointed at.
 *
 * The loop's first frame is the still mockup, so the video stays invisible
 * until frames are actually moving (`data-playing`), then CSS fades it in:
 * the still begins to move rather than being swapped. Key the <video> by
 * project so each selection mounts fresh and starts from that first frame;
 * unmounting it on release pauses it.
 *
 * Reduced motion keeps the still.
 */
export function usePlateLoop() {
  const reducedMotion = useReducedMotion();
  const videoRef = useCallback((video: HTMLVideoElement | null) => {
    if (!video) return;
    // React sets `muted` as a property only; autoplay rules read it at play().
    video.muted = true;
    video.addEventListener('playing', () => { video.dataset.playing = 'true'; }, { once: true });
    // Blocked, or interrupted by a quick move to another row: the still stays.
    video.play().catch(() => {});
  }, []);
  return { playLoop: !reducedMotion, videoRef };
}
