import { useRef } from 'react';
import { gsap, useGSAP } from '../../interactions/gsap';
import { useReducedMotion } from '../../interactions/useReducedMotion';
import type { PlateProofPhase } from '../../interactions/usePlateProofReveal';
import type { TransitionState } from '../../interactions/useTransitionState';
import styles from './DeskIdentity.module.css';

export interface DeskIdentityProps {
  phase: PlateProofPhase;
  transitionState: TransitionState;
}

function supportsInkGradient(): boolean {
  return typeof CSS !== 'undefined' && (
    CSS.supports('background-clip', 'text') ||
    CSS.supports('-webkit-background-clip', 'text')
  ) && CSS.supports('color', 'color-mix(in srgb, #16265e 56%, #f4f1ea)');
}

function displayFontIsReady(): boolean {
  const fonts = document.fonts;
  if (!fonts?.check('200 48px Fraunces')) return false;

  // check() also succeeds when a missing webfont silently uses fallback text.
  // Require a registered, loaded face before animating the display typography.
  return Array.from(fonts).some((face) => {
    const [minimum, maximum = minimum] = face.weight.split(/\s+/).map(Number);
    return face.family.replace(/['"]/g, '') === 'Fraunces' &&
      face.status === 'loaded' && face.style === 'normal' &&
      minimum <= 200 && maximum >= 200;
  });
}

/** A gentle variation in ink flow, with continuous forward movement. */
function inkFlowEase(progress: number): number {
  return progress + 0.004 * Math.sin(Math.PI * progress) * Math.sin(Math.PI * 12 * progress);
}

/** Native identity text with occasional ink passes in reading order. */
export default function DeskIdentity({ phase, transitionState }: DeskIdentityProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const reducedMotion = useReducedMotion();
  const gradientSupported = supportsInkGradient();
  // Keep the word sequence active when the plate advances to `ready`.
  const revealStarted = phase === 'objects' || phase === 'ready';

  useGSAP(
    (_context, contextSafe) => {
      if (
        !revealStarted ||
        reducedMotion ||
        transitionState !== 'idle' ||
        !gradientSupported
      ) {
        return;
      }

      const designer = headingRef.current?.querySelector<HTMLElement>('[data-identity-word="designer"]');
      const builder = headingRef.current?.querySelector<HTMLElement>('[data-identity-word="builder"]');
      if (!designer || !builder || !contextSafe) return;

      let disposed = false;
      let sequence: gsap.core.Timeline | null = null;
      const startSequence = contextSafe(() => {
        if (disposed || sequence || !displayFontIsReady()) return;
        // Reset beyond the letters, then follow the words across either one
        // or two lines. Both ends are solid ink throughout the quiet interval.
        sequence = gsap.timeline({
          repeat: -1,
          repeatDelay: 9,
          paused: document.hidden,
          defaults: { ease: inkFlowEase },
        })
          .fromTo(designer, { backgroundPosition: '116% 50%' }, {
            backgroundPosition: '-16% 50%',
            duration: 3.5,
          })
          .fromTo(builder, { backgroundPosition: '116% 50%' }, {
            backgroundPosition: '-16% 50%',
            duration: 4,
          }, '+=0.25');
      });
      const onVisibilityChange = () => {
        sequence?.paused(document.hidden);
      };

      startSequence();
      // A font that arrives after the entrance can still start the effect.
      document.fonts.addEventListener('loadingdone', startSequence);
      void document.fonts.ready.then(startSequence);
      document.addEventListener('visibilitychange', onVisibilityChange);

      return () => {
        disposed = true;
        document.fonts.removeEventListener('loadingdone', startSequence);
        document.removeEventListener('visibilitychange', onVisibilityChange);
        sequence?.kill();
      };
    },
    {
      scope: headingRef,
      dependencies: [revealStarted, reducedMotion, gradientSupported, transitionState],
      // A portal or reduced-motion change restores the resting ink.
      revertOnUpdate: true,
    },
  );

  return (
    <div className={styles.identity} data-proof-phase={phase}>
      <h1 ref={headingRef} className={styles.heading}>
        <span className={styles.ink} data-identity-ink>
          <span className={`${styles.phrase} ${styles.word}`} data-identity-word="designer">Designer</span>{' '}
          <span className={styles.phrase}>
            &amp;{' '}<span className={styles.word} data-identity-word="builder">Builder</span>
          </span>
        </span>
      </h1>
    </div>
  );
}
