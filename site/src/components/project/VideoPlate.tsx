import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../interactions/useReducedMotion';
import type { VideoFigure } from '../../data/ebbContent';
import RevealOnScroll from './RevealOnScroll';
import styles from './EditorialPlate.module.css';

export interface VideoPlateProps {
  figure: VideoFigure;
  className?: string;
}

/**
 * Silent motion counterpart to EditorialPlate.
 *
 * The same plate chrome and missing-file state are preserved. Motion starts
 * only once the plate enters the viewport and pauses when it leaves. Visitors
 * can always start paused media manually; reduced-motion visitors never get
 * scroll-triggered playback.
 */
export default function VideoPlate({ figure, className }: VideoPlateProps) {
  const reducedMotion = useReducedMotion();
  const [loadState, setLoadState] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [isInView, setIsInView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const widthClass = styles[`width-${figure.width ?? 'column'}`];
  const sourcePaths = figure.sources.map(({ src }) => src);
  const hasBackground = Boolean(figure.backgroundSrc);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting && entry.intersectionRatio >= 0.4),
      { threshold: [0, 0.4] },
    );

    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || loadState !== 'loaded') return;

    if (reducedMotion || !isInView) {
      video.pause();
      return;
    }

    void video.play().catch(() => setIsPlaying(false));
  }, [isInView, loadState, reducedMotion]);

  const playVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    void video.play().catch(() => setIsPlaying(false));
  };

  return (
    <RevealOnScroll
      as="figure"
      className={[styles.plate, widthClass, className ?? ''].join(' ').trim()}
    >
      <div
        ref={frameRef}
        className={[
          styles.frame,
          hasBackground ? styles.videoCompositeFrame : '',
          loadState === 'error' ? styles.framePlaceholder : '',
          loadState === 'loaded' ? styles.frameLoaded : '',
        ]
          .join(' ')
          .trim()}
      >
        {figure.backgroundSrc && (
          <img
            src={figure.backgroundSrc}
            alt=""
            aria-hidden="true"
            className={styles.videoBackground}
          />
        )}

        {loadState !== 'error' && (
          <video
            ref={videoRef}
            className={hasBackground ? styles.compositeVideo : styles.image}
            aria-label={figure.alt}
            controls
            loop
            muted
            playsInline
            preload="metadata"
            onLoadedData={() => setLoadState('loaded')}
            onError={() => setLoadState('error')}
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
          >
            {figure.sources.map(({ src, type }) => (
              <source key={src} src={src} type={type} />
            ))}
          </video>
        )}

        {loadState === 'loaded' && !isPlaying && (
          <button
            type="button"
            className={styles.videoPlayButton}
            aria-label="Play video"
            onClick={playVideo}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.25 5.5 18 12l-9.75 6.5z" />
            </svg>
          </button>
        )}

        {loadState === 'error' && (
          <div className={styles.placeholder} role="img" aria-label={figure.alt}>
            <span className={styles.placeholderLabel}>Video pending</span>
            <code className={styles.placeholderPath}>{sourcePaths.join(' or ')}</code>
          </div>
        )}
      </div>

      <figcaption className={styles.caption}>{figure.caption}</figcaption>
    </RevealOnScroll>
  );
}
