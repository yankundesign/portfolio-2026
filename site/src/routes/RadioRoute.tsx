import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router';
import Grain from '../components/shared/Grain';
import styles from './RadioRoute.module.css';

interface WordTiming {
  word: string;
  start: number;
  end: number;
}

interface TimingPayload {
  words: WordTiming[];
  duration: number;
}

interface TranscriptTurn {
  start: number;
  end: number;
  words: WordTiming[];
}

interface SpotifyOEmbed {
  provider_name?: string;
}

const INTRO_AUDIO = '/radio/intro.mp3';
const INTRO_TIMINGS = '/radio/intro.json';
const TURN_GAP_SECONDS = 0.35;
const SPEAKER_COLUMNS = 32;
const SPEAKER_ROWS = 34;
const MINI_WAVE_BARS = 54;

const SPOTIFY_TRACK = {
  title: 'Aruarian Dance',
  artist: 'Nujabes',
  album: 'Departure: Samurai Champloo Soundtrack (Reissue)',
  duration: '4:09',
  url: 'https://open.spotify.com/track/1HTGI65VTN4odH0O8A319i',
} as const;

const SOURCE_MODES = ['FM', 'DAB', 'ONLINE'] as const;
type SourceMode = (typeof SOURCE_MODES)[number];

function formatTime(seconds: number) {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  return `${Math.floor(safeSeconds / 60)}:${String(safeSeconds % 60).padStart(2, '0')}`;
}

function groupTurns(payload: TimingPayload): TranscriptTurn[] {
  const groups: WordTiming[][] = [];
  let current: WordTiming[] = [];
  let lastEnd = 0;

  payload.words.forEach((word) => {
    if (current.length > 0 && word.start - lastEnd > TURN_GAP_SECONDS) {
      groups.push(current);
      current = [];
    }
    current.push(word);
    lastEnd = word.end;
  });

  if (current.length > 0) groups.push(current);

  return groups.map((words, index) => {
    const next = groups[index + 1];
    return {
      start: words[0].start,
      end: next ? next[0].start - 0.05 : payload.duration,
      words,
    };
  });
}

export default function RadioRoute() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const transcriptRef = useRef<HTMLDivElement | null>(null);
  const turnRefs = useRef<Array<HTMLLIElement | null>>([]);
  const animationRef = useRef<number | null>(null);
  const [timings, setTimings] = useState<TimingPayload | null>(null);
  const [apiState, setApiState] = useState<'loading' | 'connected' | 'fallback'>('loading');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadState, setLoadState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [volume, setVolume] = useState(0.72);
  const [sourceMode, setSourceMode] = useState<SourceMode>('FM');

  const turns = useMemo(() => (timings ? groupTurns(timings) : []), [timings]);
  const progress = duration > 0 ? Math.min(1, currentTime / duration) : 0;
  const activeTurnIndex = turns.findIndex((turn) => currentTime >= turn.start && currentTime < turn.end);

  const speakerDots = useMemo(
    () =>
      Array.from({ length: SPEAKER_COLUMNS * SPEAKER_ROWS }, (_, index) => {
        const col = index % SPEAKER_COLUMNS;
        const row = Math.floor(index / SPEAKER_COLUMNS);
        const x = col / (SPEAKER_COLUMNS - 1);
        const y = row / (SPEAKER_ROWS - 1);
        const center =
          0.5 +
          Math.sin(x * Math.PI * 4.6 + 0.4) * 0.11 +
          Math.sin(x * Math.PI * 13.5) * 0.035;
        const width = 0.055 + (Math.sin(x * Math.PI * 3.2) * 0.5 + 0.5) * 0.055;
        const inWave = Math.abs(y - center) < width;

        return {
          inWave,
          delay: `${(col * 18 + row * 5) % 520}ms`,
        };
      }),
    [],
  );

  const miniBars = useMemo(
    () =>
      Array.from({ length: MINI_WAVE_BARS }, (_, index) => {
        const wave = Math.sin(index * 0.76) * 0.5 + 0.5;
        const drift = Math.sin(index * 0.23 + 1.7) * 0.5 + 0.5;
        const envelope = 0.54 + 0.46 * Math.sin((index / (MINI_WAVE_BARS - 1)) * Math.PI);
        return {
          height: `${0.14 + (wave * 0.58 + drift * 0.42) * envelope * 1.1}rem`,
          delay: `${index * 22}ms`,
        };
      }),
    [],
  );

  const needlePosition = `${33 + progress * 35}%`;

  useEffect(() => {
    const prev = {
      htmlOverflow: document.documentElement.style.overflow,
      bodyOverflow: document.body.style.overflow,
    };

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = prev.htmlOverflow;
      document.body.style.overflow = prev.bodyOverflow;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetch(INTRO_TIMINGS, { cache: 'no-store' })
      .then((response) => {
        if (!response.ok) throw new Error('timings unavailable');
        return response.json() as Promise<TimingPayload>;
      })
      .then((payload) => {
        if (cancelled) return;
        setTimings(payload);
        setDuration(payload.duration);
        setLoadState('ready');
      })
      .catch(() => {
        if (cancelled) return;
        setLoadState('error');
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const endpoint = `https://open.spotify.com/oembed?url=${encodeURIComponent(SPOTIFY_TRACK.url)}`;

    fetch(endpoint, { headers: { Accept: 'application/json' } })
      .then((response) => {
        if (!response.ok) throw new Error('spotify unavailable');
        return response.json() as Promise<SpotifyOEmbed>;
      })
      .then((data) => {
        if (cancelled) return;
        setApiState(data.provider_name ? 'connected' : 'fallback');
      })
      .catch(() => {
        if (cancelled) return;
        setApiState('fallback');
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (activeTurnIndex < 0) return;
    const turn = turnRefs.current[activeTurnIndex];
    const scroller = transcriptRef.current;
    if (!turn || !scroller) return;

    scroller.scrollTo({
      top: Math.max(0, turn.offsetTop - 14),
      behavior: 'smooth',
    });
  }, [activeTurnIndex]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  const stopFrame = useCallback(() => {
    if (animationRef.current !== null) {
      window.cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  const syncFrame = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(audio.currentTime);
    animationRef.current = window.requestAnimationFrame(syncFrame);
  }, []);

  useEffect(() => stopFrame, [stopFrame]);

  const togglePlayback = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          stopFrame();
          animationRef.current = window.requestAnimationFrame(syncFrame);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    } else {
      audio.pause();
      setIsPlaying(false);
      stopFrame();
    }
  }, [stopFrame, syncFrame]);

  const seek = useCallback(
    (ratio: number) => {
      const audio = audioRef.current;
      if (!audio || !duration) return;
      const nextTime = Math.max(0, Math.min(duration, ratio * duration));
      audio.currentTime = nextTime;
      setCurrentTime(nextTime);
    },
    [duration],
  );

  const handleScrub = useCallback(
    (clientX: number) => {
      const scrubber = document.querySelector<HTMLElement>('[data-radio-scrubber]');
      if (!scrubber) return;
      const rect = scrubber.getBoundingClientRect();
      seek((clientX - rect.left) / rect.width);
    },
    [seek],
  );

  const adjustVolume = useCallback((nextVolume: number) => {
    setVolume(Math.max(0, Math.min(1, nextVolume)));
  }, []);

  return (
    <div className={styles.page}>
      <Grain />
      <Link to="/" className={styles.back}>
        <span aria-hidden="true">←</span>
        <span>desk</span>
      </Link>

      <main className={styles.stage}>
        <section
          className={[styles.radio, isPlaying ? styles.radioPlaying : ''].join(' ')}
          aria-label="My Radio"
          style={{
            ['--needle-x' as string]: needlePosition,
            ['--progress' as string]: progress,
            ['--volume-level' as string]: volume,
          }}
        >
          <h1 className={styles.srOnly}>My Radio</h1>

          <div className={styles.leftDeck}>
            <div className={styles.speaker} aria-hidden="true">
              {speakerDots.map((dot, index) => (
                <span
                  key={index}
                  className={dot.inWave ? styles.speakerWaveDot : undefined}
                  style={{ ['--dot-delay' as string]: dot.delay }}
                />
              ))}
            </div>

            <div className={styles.leftFooter}>
              <button
                type="button"
                className={styles.powerButton}
                onClick={togglePlayback}
                disabled={loadState !== 'ready'}
                role="switch"
                aria-checked={isPlaying}
                aria-label="Radio power"
              >
                <span className={styles.powerOn} aria-hidden="true">On</span>
                <span className={styles.powerOff} aria-hidden="true">Off</span>
                <span className={styles.powerKnob} aria-hidden="true" />
              </button>
              <div className={styles.sourceMark}>
                <a href={SPOTIFY_TRACK.url} target="_blank" rel="noreferrer">
                  Spotify
                </a>
                <span>{apiState === 'loading' ? 'syncing' : apiState === 'fallback' ? 'cached' : 'connected'}</span>
                <i aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className={styles.divider} aria-hidden="true" />

          <div className={styles.rightDeck}>
            <div className={styles.liveStatus} aria-live="polite">
              <i aria-hidden="true" />
              {isPlaying ? 'live' : loadState === 'ready' ? 'standby' : loadState}
            </div>

            <div
              className={styles.tuner}
              data-radio-scrubber
              role="slider"
              aria-label="DJ intro progress"
              aria-valuemin={0}
              aria-valuemax={Math.round(duration)}
              aria-valuenow={Math.round(currentTime)}
              tabIndex={0}
              onPointerDown={(event) => {
                event.currentTarget.setPointerCapture(event.pointerId);
                handleScrub(event.clientX);
              }}
              onPointerMove={(event) => {
                if (event.buttons) handleScrub(event.clientX);
              }}
              onKeyDown={(event) => {
                if (event.key === 'ArrowRight') seek((currentTime + 1) / duration);
                if (event.key === 'ArrowLeft') seek((currentTime - 1) / duration);
              }}
            >
              <span className={styles.bandLabel}>FM</span>
              <div className={styles.tunerRail}>
                {['88', '92', '96', '100', '104', '108'].map((label) => (
                  <span key={label} className={styles.majorTick}>
                    {label}
                  </span>
                ))}
                {Array.from({ length: 25 }, (_, index) => (
                  <i key={index} />
                ))}
                <b aria-hidden="true" />
              </div>
              <span className={styles.bandUnit}>MHz</span>
            </div>

            <div className={styles.display}>
              <div className={styles.nowPlaying}>
                <p className={styles.panelLabel}>Now playing</p>
                <h2>{SPOTIFY_TRACK.title}</h2>
                <p className={styles.artist}>{SPOTIFY_TRACK.artist}</p>
                <p className={styles.time}>
                  {formatTime(currentTime)} / {formatTime(duration || 19)}
                </p>
                <div className={styles.miniWave} aria-hidden="true">
                  {miniBars.map((bar, index) => (
                    <span
                      key={index}
                      className={index / MINI_WAVE_BARS <= progress ? styles.miniBarPlayed : undefined}
                      style={{
                        ['--bar-height' as string]: bar.height,
                        ['--bar-delay' as string]: bar.delay,
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className={styles.transcriptWrap}>
                <p className={styles.panelLabel}>Transcript</p>
                <div className={styles.transcript} ref={transcriptRef}>
                  <ol>
                    {turns.map((turn, turnIndex) => (
                      <li
                        key={`${turn.start}-${turnIndex}`}
                        ref={(node) => {
                          turnRefs.current[turnIndex] = node;
                        }}
                        className={turnIndex === activeTurnIndex ? styles.turnActive : undefined}
                      >
                        <span className={styles.turnArrow} aria-hidden="true" />
                        <p>
                          {turn.words.map((word, wordIndex) => {
                            const state =
                              currentTime >= word.start && currentTime <= word.end
                                ? styles.wordCurrent
                                : currentTime > word.end
                                  ? styles.wordSaid
                                  : styles.wordFuture;
                            return (
                              <span key={`${word.word}-${word.start}`} className={state}>
                                {wordIndex === 0 ? word.word : ` ${word.word}`}
                              </span>
                            );
                          })}
                        </p>
                      </li>
                    ))}
                    {loadState === 'error' && (
                      <li className={styles.turnActive}>
                        <span className={styles.turnArrow} aria-hidden="true" />
                        <p>Intro transcript could not be loaded.</p>
                      </li>
                    )}
                  </ol>
                </div>
              </div>
            </div>

            <div className={styles.controls}>
              <button
                type="button"
                className={styles.playDial}
                onClick={togglePlayback}
                disabled={loadState !== 'ready'}
                aria-label={isPlaying ? 'Pause DJ intro' : 'Play DJ intro'}
              >
                <span className={isPlaying ? styles.playGlyphPause : styles.playGlyphPlay} aria-hidden="true">
                  {isPlaying ? 'II' : '▶'}
                </span>
              </button>

              <div className={styles.volumeControl}>
                <div className={styles.volumeHeader}>
                  <span>Min</span>
                  <p>Volume</p>
                  <span>Max</span>
                </div>
                <input
                  className={styles.volumeSlider}
                  type="range"
                  min="0"
                  max="100"
                  value={Math.round(volume * 100)}
                  aria-label="Volume"
                  onChange={(event) => adjustVolume(Number(event.currentTarget.value) / 100)}
                />
              </div>

              <div className={styles.modeList} aria-label="Radio sources">
                {SOURCE_MODES.map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    aria-pressed={sourceMode === mode}
                    onClick={() => setSourceMode(mode)}
                  >
                    <span>{mode === 'ONLINE' ? 'Online' : mode}</span>
                    <i aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <audio
            ref={audioRef}
            src={INTRO_AUDIO}
            preload="metadata"
            onLoadedMetadata={(event) => {
              const nextDuration = event.currentTarget.duration;
              if (Number.isFinite(nextDuration)) setDuration(nextDuration);
            }}
            onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
            onEnded={() => {
              setIsPlaying(false);
              setCurrentTime(0);
              stopFrame();
            }}
          />
        </section>
      </main>
    </div>
  );
}
