import { useEffect, useState, type RefObject } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * Playback for a recording on a cloth board (ClothBoard).
 *
 * The recording plays, silent, while at least 40% of its board is on screen,
 * and pauses when it leaves. A pause the reader chose holds: the board does
 * not restart itself when it scrolls back into view. Reduced motion never
 * starts a recording on its own; the reader can still press Play.
 */
export function useBoardVideo(
  frameRef: RefObject<HTMLElement | null>,
  videoRef: RefObject<HTMLVideoElement | null>,
) {
  const reducedMotion = useReducedMotion();
  const [inView, setInView] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio >= 0.4),
      { threshold: [0, 0.4] },
    );
    observer.observe(frame);
    return () => observer.disconnect();
  }, [frameRef]);

  // Safari starts a video unprompted only when `muted` is an attribute too.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.setAttribute('muted', '');
  }, [videoRef]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || failed) return;
    if (reducedMotion || !inView || userPaused) {
      video.pause();
      return;
    }
    void video.play().catch(() => setPlaying(false));
  }, [videoRef, failed, inView, reducedMotion, userPaused]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      setUserPaused(true);
      video.pause();
    } else {
      setUserPaused(false);
      void video.play().catch(() => setPlaying(false));
    }
  };

  return {
    playing,
    failed,
    toggle,
    onPlay: () => setPlaying(true),
    onPause: () => setPlaying(false),
    onError: () => setFailed(true),
  };
}
