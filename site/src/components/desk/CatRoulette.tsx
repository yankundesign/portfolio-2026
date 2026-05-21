import { useCallback, useRef, useState } from 'react';
import { cats } from '../../data/cats';
import YogurtSVG from './YogurtSVG';
import FigCaption from '../shared/FigCaption';
import { useReducedMotion } from '../../interactions/useReducedMotion';
import styles from './CatRoulette.module.css';

const SEGMENT_COUNT = cats.length;
const SEGMENT_ANGLE = 360 / SEGMENT_COUNT; // 60°
const SPIN_DURATION_MS = 2800;
const MIN_EXTRA_ROTATIONS = 3;
const MAX_EXTRA_ROTATIONS = 5;
const CARD_REVEAL_DELAY_MS = 180;

export interface CatRouletteProps {
  className?: string;
}

/**
 * Cat roulette — fig. 05.
 *
 * Restored experience: click the disc → it scales up 1.1×, the wheel spins
 * 3–5 full rotations over ~2.8s with overshoot ease, lands on a new pose,
 * then a specimen card pops up above the disc showing the selected pose at
 * a larger size with a mono caption. Selected segment dims to 25% in the
 * wheel while the card is visible. Next click dismisses the card and spins
 * again.
 *
 * Z-layer order in the disc:
 *   1. Base paper disc (outer rule + inner ring)
 *   2. Rotating wheel (cats + radial dividers)
 *   3. Static center badge (SPIN IT + rivet)
 *   4. Static pointer triangle at 12 o'clock
 *
 * The specimen card is absolutely positioned above the disc so the card
 * reveal does not shift surrounding layout.
 */
export default function CatRoulette({ className }: CatRouletteProps) {
  const reducedMotion = useReducedMotion();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [cardPose, setCardPose] = useState(0);
  const [dimmedIndex, setDimmedIndex] = useState<number | null>(null);
  const [discScaled, setDiscScaled] = useState(false);

  const rotationRef = useRef(0);
  const spinTimeoutRef = useRef<number | null>(null);
  const cardTimeoutRef = useRef<number | null>(null);

  const handleSpin = useCallback(() => {
    if (isSpinning) return;

    // If a card is showing, fade it out before the new spin.
    if (showCard) setShowCard(false);
    // Restore segment opacities.
    setDimmedIndex(null);

    // Pick a different cat than the current one.
    const offset = 1 + Math.floor(Math.random() * (SEGMENT_COUNT - 1));
    const nextIndex = (selectedIndex + offset) % SEGMENT_COUNT;

    if (reducedMotion) {
      // Snap, no animation; card cross-fades.
      setSelectedIndex(nextIndex);
      setHasSpun(true);
      setCardPose(nextIndex);
      setShowCard(true);
      setDimmedIndex(nextIndex);
      return;
    }

    // Disc scales up while spinning.
    setDiscScaled(true);

    // Compute target rotation: align the next pose's segment to 12 o'clock,
    // plus N extra full rotations + a small jitter for character.
    const current = rotationRef.current;
    const currentMod = ((current % 360) + 360) % 360;
    const targetAtRest = (360 - nextIndex * SEGMENT_ANGLE) % 360;
    const delta = ((targetAtRest - currentMod) + 360) % 360;
    const extra =
      MIN_EXTRA_ROTATIONS +
      Math.floor(
        Math.random() * (MAX_EXTRA_ROTATIONS - MIN_EXTRA_ROTATIONS + 1)
      );
    const jitter = (Math.random() - 0.5) * (SEGMENT_ANGLE * 0.3);
    const target = current + extra * 360 + delta + jitter;

    rotationRef.current = target;
    setRotation(target);
    setIsSpinning(true);
    setHasSpun(true);

    if (spinTimeoutRef.current !== null) {
      window.clearTimeout(spinTimeoutRef.current);
    }
    if (cardTimeoutRef.current !== null) {
      window.clearTimeout(cardTimeoutRef.current);
    }

    // On land: scale disc back, lock selected pose.
    spinTimeoutRef.current = window.setTimeout(() => {
      setSelectedIndex(nextIndex);
      setIsSpinning(false);
      setDiscScaled(false);
      spinTimeoutRef.current = null;

      // After a short beat, reveal the specimen card.
      cardTimeoutRef.current = window.setTimeout(() => {
        setCardPose(nextIndex);
        setShowCard(true);
        setDimmedIndex(nextIndex);
        cardTimeoutRef.current = null;
      }, CARD_REVEAL_DELAY_MS);
    }, SPIN_DURATION_MS);
  }, [isSpinning, reducedMotion, selectedIndex, showCard]);

  const selected = cats[selectedIndex];
  const cardCat = cats[cardPose];
  const figNumber = String(cardPose + 1).padStart(2, '0');

  // Keep the figcaption short — the specimen card carries the pose label.
  // Long caption was widening the figure and pulling the card off-center.
  const captionLabel = isSpinning
    ? 'yogurt roulette — spinning'
    : 'yogurt roulette';

  return (
    <figure className={`${styles.figure} ${className ?? ''}`}>
      {/* Disc region — exactly disc-width so the specimen card centers on
       * the disc, not on the figure (which can be wider when caption wraps). */}
      <div className={styles.discRegion}>
        {/* Specimen card — absolutely positioned above the disc, only takes
         * pointer events when visible. Slides up + fades in on reveal. */}
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
            fig. {figNumber} · yogurt — {cardCat.label}
          </div>
        </div>

        <button
        type="button"
        className={`${styles.disc} ${discScaled ? styles.discScaled : ''}`}
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
        <div
          className={styles.wheel}
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning
              ? `transform ${SPIN_DURATION_MS}ms cubic-bezier(0.17, 0.67, 0.12, 0.99)`
              : 'none',
          }}
        >
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

          {cats.map((cat, i) => {
            const isDimmed = dimmedIndex === i;
            return (
              <div
                key={cat.id}
                className={`${styles.segment} ${
                  isDimmed ? styles.segmentDimmed : ''
                }`}
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
            );
          })}
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

      <FigCaption number={5} label={captionLabel} align="left" />
    </figure>
  );
}
