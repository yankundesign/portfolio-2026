import { useCallback, useEffect, useRef, useState } from 'react';
import { cats } from '../../data/cats';
import YogurtSVG from './YogurtSVG';
import FigCaption from '../shared/FigCaption';
import { useReducedMotion } from '../../interactions/useReducedMotion';
import { gsap } from '../../interactions/gsap';
import styles from './CatRoulette.module.css';

const SEGMENT_COUNT = cats.length;
const SEGMENT_ANGLE = 360 / SEGMENT_COUNT; // 60°
const SPIN_DURATION_SECONDS = 1.8;
const MIN_EXTRA_ROTATIONS = 3;
const MAX_EXTRA_ROTATIONS = 4;
const CARD_REVEAL_DELAY_MS = 180;

export interface CatRouletteProps {
  className?: string;
}

/**
 * Cat roulette — fig. 04.
 *
 * Deadpan plate interaction: click the disc, the wheel makes several clear
 * rotations before landing on a new pose, then a specimen image appears above
 * the wheel. The fig. caption stays compact so the desk object remains quiet.
 *
 * Z-layer order in the disc:
 *   1. Base paper disc (outer rule + inner ring)
 *   2. Rotating wheel (cats + radial dividers)
 *   3. Static center badge (SPIN IT + rivet)
 *   4. Static pointer triangle at 12 o'clock
 *
 */
export default function CatRoulette({ className }: CatRouletteProps) {
  const reducedMotion = useReducedMotion();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [cardPose, setCardPose] = useState(0);

  const wheelRef = useRef<HTMLDivElement | null>(null);
  const rotationRef = useRef(0);
  const cardRevealTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const wheel = wheelRef.current;
    return () => {
      if (wheel) gsap.killTweensOf(wheel);
      if (cardRevealTimeoutRef.current !== null) {
        window.clearTimeout(cardRevealTimeoutRef.current);
      }
    };
  }, []);

  const handleSpin = useCallback(() => {
    if (isSpinning) return;
    if (cardRevealTimeoutRef.current !== null) {
      window.clearTimeout(cardRevealTimeoutRef.current);
      cardRevealTimeoutRef.current = null;
    }
    setShowCard(false);

    // Pick a different cat than the current one.
    const offset = 1 + Math.floor(Math.random() * (SEGMENT_COUNT - 1));
    const nextIndex = (selectedIndex + offset) % SEGMENT_COUNT;
    const current = rotationRef.current;
    const currentMod = ((current % 360) + 360) % 360;
    const targetAtRest = (360 - nextIndex * SEGMENT_ANGLE) % 360;
    const landingDelta = ((targetAtRest - currentMod) + 360) % 360;
    const extraRotations =
      MIN_EXTRA_ROTATIONS +
      Math.floor(
        Math.random() * (MAX_EXTRA_ROTATIONS - MIN_EXTRA_ROTATIONS + 1),
      );
    const travel = extraRotations * 360 + landingDelta;
    const target = current + travel;
    const wheel = wheelRef.current;

    if (reducedMotion) {
      if (wheel) gsap.set(wheel, { rotation: target });
      rotationRef.current = target;
      setSelectedIndex(nextIndex);
      setCardPose(nextIndex);
      setShowCard(true);
      setHasSpun(true);
      return;
    }

    if (!wheel) return;
    setIsSpinning(true);
    setHasSpun(true);

    gsap.killTweensOf(wheel);
    gsap.to(wheel, {
      rotation: target,
      duration: SPIN_DURATION_SECONDS,
      ease: 'power3.out',
      overwrite: true,
      onComplete: () => {
        rotationRef.current = target;
        setSelectedIndex(nextIndex);
        setIsSpinning(false);
        cardRevealTimeoutRef.current = window.setTimeout(() => {
          setCardPose(nextIndex);
          setShowCard(true);
          cardRevealTimeoutRef.current = null;
        }, CARD_REVEAL_DELAY_MS);
      },
      onInterrupt: () => {
        rotationRef.current = Number(gsap.getProperty(wheel, 'rotation'));
        setIsSpinning(false);
      },
    });
  }, [isSpinning, reducedMotion, selectedIndex]);

  const selected = cats[selectedIndex];
  const cardCat = cats[cardPose];
  const specimenNumber = String(cardPose + 1).padStart(2, '0');

  const captionLabel = isSpinning
    ? 'yogurt roulette — spinning'
    : hasSpun
      ? `yogurt roulette — ${selected.id}`
      : 'yogurt roulette';

  return (
    <figure className={`${styles.figure} ${className ?? ''}`}>
      <div className={styles.discRegion}>
        <div
          className={`${styles.specimenCard} ${
            showCard ? styles.specimenVisible : styles.specimenHidden
          }`}
          aria-hidden={!showCard}
        >
          <div className={styles.specimenImage}>
            <YogurtSVG pose={cardCat.id} size={180} />
          </div>
          <div className={styles.specimenCaption}>
            fig. {specimenNumber} · yogurt — {cardCat.label}
          </div>
        </div>

        <button
          type="button"
          className={styles.disc}
          onClick={handleSpin}
          disabled={isSpinning}
          aria-label={
            isSpinning
              ? 'Yogurt roulette spinning'
              : hasSpun
                ? `Yogurt roulette. Showing: ${selected.ariaLabel}. Press to spin again.`
                : 'Yogurt roulette. Press to spin.'
          }
        >
          {/* Layer 1: base paper disc. */}
          <svg
            className={styles.baseDisc}
            viewBox="0 0 200 200"
            aria-hidden="true"
          >
            <circle
              cx="100"
              cy="100"
              r="96"
              fill="var(--paper)"
              stroke="var(--ink)"
              strokeWidth="1.2"
            />
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="0.5"
              opacity="0.3"
            />
          </svg>

          {/* Layer 2: rotating wheel of cats + radial dividers. */}
          <div ref={wheelRef} className={styles.wheel}>
          <svg
            className={styles.dividers}
            viewBox="0 0 200 200"
            aria-hidden="true"
          >
            {Array.from({ length: SEGMENT_COUNT }).map((_, i) => {
              const angleRad =
                (i * SEGMENT_ANGLE + SEGMENT_ANGLE / 2 - 90) *
                (Math.PI / 180);
              const xInner = 100 + 28 * Math.cos(angleRad);
              const yInner = 100 + 28 * Math.sin(angleRad);
              const xOuter = 100 + 90 * Math.cos(angleRad);
              const yOuter = 100 + 90 * Math.sin(angleRad);
              return (
                <line
                  key={i}
                  x1={xInner}
                  y1={yInner}
                  x2={xOuter}
                  y2={yOuter}
                  stroke="var(--ink)"
                  strokeWidth="0.6"
                  opacity="0.28"
                />
              );
            })}
          </svg>

            {cats.map((cat, i) => (
              <div
                key={cat.id}
                className={styles.segment}
                style={
                  {
                    ['--segment-angle' as string]: `${i * SEGMENT_ANGLE}deg`,
                  } as React.CSSProperties
                }
              >
                <div className={styles.catAnchor}>
                  <YogurtSVG pose={cat.id} size={54} />
                </div>
              </div>
            ))}
          </div>

          {/* Layer 3: static center badge. */}
          <div className={styles.centerBadge} aria-hidden="true">
            <svg className={styles.badgeBg} viewBox="0 0 60 60" aria-hidden="true">
              <circle
                cx="30"
                cy="30"
                r="28"
                fill="var(--paper)"
                stroke="var(--ink)"
                strokeWidth="0.8"
              />
            </svg>
            <span className={styles.badgeRivet} />
            <span className={styles.badgeSpin}>SPIN IT</span>
          </div>

          {/* Layer 4: pointer triangle at 12 o'clock. */}
          <svg
            className={styles.pointer}
            viewBox="0 0 200 200"
            aria-hidden="true"
          >
            <path d="M 100 2 L 94 14 L 106 14 Z" fill="var(--ink)" />
          </svg>
        </button>
      </div>

      <FigCaption number={4} label={captionLabel} align="left" />
    </figure>
  );
}
