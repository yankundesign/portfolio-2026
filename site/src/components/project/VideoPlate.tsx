import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { useReducedMotion } from '../../interactions/useReducedMotion';
import type { VideoFigure } from '../../data/ebbContent';
import RevealOnScroll from './RevealOnScroll';
import PlateHead from './PlateHead';
import { stageClass, stageScreensClass } from './plateStage';
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
 *
 * A staged recording (`figure.stage`) sits on the same stage as a staged
 * still, so a video and a screenshot are the same object until one moves.
 * It drops the browser's control bar (which would sit over the product) for
 * one Pause / Play toggle in the mat. A pause the visitor chose holds: the
 * plate does not restart itself when it scrolls back into view.
 */
export default function VideoPlate({ figure, className }: VideoPlateProps) {
  const reducedMotion = useReducedMotion();
  const [loadState, setLoadState] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [isInView, setIsInView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const widthClass = styles[`width-${figure.width ?? 'column'}`];
  const sourcePaths = figure.sources.map(({ src }) => src);
  const { stage } = figure;
  const hasBackground = Boolean(figure.backgroundSrc) && !stage;
  const markLoaded = () => setLoadState((state) => (state === 'loading' ? 'loaded' : state));

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

  // React sets `muted` only as a property. Safari lets a page start a video
  // unprompted only when it is muted as an attribute too. And on a cached
  // load the metadata can already be in before the listeners below exist.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.setAttribute('muted', '');
    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) markLoaded();
  }, []);

  // Playback follows visibility alone. It must not wait for the first frame:
  // with a poster and preload="metadata", Safari (and Chrome at times) never
  // decodes that frame until play() is called, so waiting for it meant the
  // plate never started.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || loadState === 'error') return;

    if (reducedMotion || !isInView || userPaused) {
      video.pause();
      return;
    }

    void video.play().catch(() => setIsPlaying(false));
  }, [isInView, loadState, reducedMotion, userPaused]);

  const playVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    setUserPaused(false);
    void video.play().catch(() => setIsPlaying(false));
  };

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      setUserPaused(true);
      video.pause();
    } else {
      playVideo();
    }
  };

  const video =
    loadState !== 'error' ? (
      <video
        ref={videoRef}
        className={stage ? styles.screen : hasBackground ? styles.compositeVideo : styles.image}
        style={
          stage
            ? ({ '--r': stage.size[0] / stage.size[1], '--native': stage.size[0] } as CSSProperties)
            : undefined
        }
        width={stage?.size[0]}
        height={stage?.size[1]}
        aria-label={figure.alt}
        poster={figure.poster}
        controls={!stage}
        loop
        muted
        playsInline
        preload="metadata"
        onLoadedMetadata={markLoaded}
        onLoadedData={markLoaded}
        onError={() => setLoadState('error')}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      >
        {figure.sources.map(({ src, type }) => (
          <source key={src} src={src} type={type} />
        ))}
      </video>
    ) : null;

  const placeholder = (
    <div className={styles.placeholder} role="img" aria-label={figure.alt}>
      <span className={styles.placeholderLabel}>Video pending</span>
      <code className={styles.placeholderPath}>{sourcePaths.join(' or ')}</code>
    </div>
  );

  return (
    <RevealOnScroll
      as="figure"
      className={[styles.plate, widthClass, className ?? ''].join(' ').trim()}
    >
      {figure.head && <PlateHead head={figure.head} />}
      {stage ? (
        <div ref={frameRef} className={stageClass(stage)}>
          {loadState === 'error' ? (
            <div className={styles.stagePlaceholder}>{placeholder}</div>
          ) : (
            <div className={stageScreensClass({})} style={{ '--n': 1 } as CSSProperties}>
              {video}
            </div>
          )}

          {loadState === 'loaded' && (
            <button
              type="button"
              className={styles.stageToggle}
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
              onClick={togglePlayback}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                {isPlaying ? (
                  <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
                ) : (
                  <path d="M7 4.5 20 12 7 19.5z" />
                )}
              </svg>
              {isPlaying ? 'Pause' : 'Play'}
            </button>
          )}
        </div>
      ) : (
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
          {hasBackground && (
            <img
              src={figure.backgroundSrc}
              alt=""
              aria-hidden="true"
              className={styles.videoBackground}
            />
          )}

          {video}

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

          {loadState === 'error' && placeholder}
        </div>
      )}

      <figcaption className={styles.caption}>{figure.caption}</figcaption>
    </RevealOnScroll>
  );
}
