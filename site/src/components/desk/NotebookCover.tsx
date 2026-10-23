import { useCallback, useLayoutEffect, useRef } from 'react';
import FigCaption from '../shared/FigCaption';
import { gsap } from '../../interactions/gsap';
import { useObjectTilt } from '../../interactions/useObjectTilt';
import { useReducedMotion } from '../../interactions/useReducedMotion';
import { TRANSITION_EVENTS, useTransitionState } from '../../interactions/useTransitionState';
import type { TransitionState } from '../../interactions/useTransitionState';
import styles from './NotebookCover.module.css';

export interface NotebookCoverProps {
  className?: string;
}

/**
 * Notebook — fig. 01 on the desk plate.
 *
 * An image of the real generated field-notebook asset, sized and placed
 * as the hero object on the homepage plate. The hover affordance combines
 * the fig. caption underline with a restrained 3D lift/tilt, so the
 * notebook still feels like the primary physical portal.
 *
 * Click no longer navigates directly. Instead it requests the
 * `notebook:open` transition; the NotebookTransition overlay handles the
 * route change at the choreography midpoint. The stable
 * `data-transition-source` frame preserves the stable layout footprint;
 * `data-transition-visual-source` lets the overlay match the visible
 * hover/click state frame-for-frame.
 */
export default function NotebookCover({ className }: NotebookCoverProps) {
  const { state, openNotebook } = useTransitionState();
  const { ref, suspend, resume, tiltHandlers } = useObjectTilt<HTMLButtonElement>();
  const reducedMotion = useReducedMotion();
  const openingRef = useRef(false);
  const landingOnMount = useRef(
    state === 'closing' &&
      !reducedMotion &&
      typeof window !== 'undefined' &&
      window.matchMedia('(min-width: 768px)').matches,
  );

  useLayoutEffect(() => {
    const button = ref.current;
    if (!landingOnMount.current || !button) return;
    const body = button.querySelector<HTMLElement>(
      '[data-transition-visual-source="notebook"]',
    );
    if (!body) return;

    // The overlay measures this lifted, hidden body after the desk mounts.
    // Layout effect runs before its first paint, so there is no second cover.
    const previousVisibility = body.style.visibility;
    suspend();
    button.classList.add(styles.landing);
    body.style.visibility = 'hidden';
    gsap.set(button, {
      '--object-tilt-x': '0deg',
      '--object-tilt-y': '0deg',
      '--object-lift-y': '-14px',
      '--object-scale': 1.025,
      '--object-shadow-x': '0px',
      '--object-shadow-y': '24px',
      '--object-shadow-scale': 1.08,
      '--object-edge-opacity': 0,
    });

    let setDown: gsap.core.Tween | null = null;
    const onState = (event: Event) => {
      const next = (event as CustomEvent<{ state: TransitionState }>).detail?.state;
      if (next !== 'idle' || setDown) return;

      // The overlay hides its book and broadcasts idle in the same tick.
      // Reveal the real notebook at the lifted pose, then let it settle.
      body.style.visibility = previousVisibility;
      setDown = gsap.to(button, {
        '--object-lift-y': '0px',
        '--object-scale': 1,
        '--object-shadow-y': '14px',
        '--object-shadow-scale': 1.03,
        '--object-edge-opacity': 0.78,
        duration: 0.2,
        ease: 'power2.out',
        onComplete: () => {
          button.classList.remove(styles.landing);
          for (const property of [
            '--object-tilt-x',
            '--object-tilt-y',
            '--object-lift-y',
            '--object-scale',
            '--object-shadow-x',
            '--object-shadow-y',
            '--object-shadow-scale',
            '--object-edge-opacity',
          ]) {
            button.style.removeProperty(property);
          }
          resume();
        },
      });
    };

    window.addEventListener(TRANSITION_EVENTS.state, onState);
    return () => {
      window.removeEventListener(TRANSITION_EVENTS.state, onState);
      setDown?.kill();
      body.style.visibility = previousVisibility;
      button.classList.remove(styles.landing);
      resume();
    };
  }, [ref, resume, suspend]);

  const handleOpen = useCallback(() => {
    if (openingRef.current) return;
    openingRef.current = true;
    suspend();

    const button = ref.current;
    if (reducedMotion || !button) {
      openNotebook();
      return;
    }

    gsap.killTweensOf(button);
    button.classList.add(styles.opening);
    gsap.to(button, {
      '--object-tilt-x': '0deg',
      '--object-tilt-y': '0deg',
      '--object-lift-y': '-14px',
      '--object-scale': 1.025,
      '--object-shadow-x': '0px',
      '--object-shadow-y': '24px',
      '--object-edge-opacity': 0,
      duration: 0.16,
      ease: 'power2.out',
      onComplete: openNotebook,
    });
  }, [openNotebook, reducedMotion, ref, suspend]);

  return (
    <figure className={`${styles.figure} ${className ?? ''}`}>
      <button
        ref={ref}
        type="button"
        className={styles.button}
        onClick={handleOpen}
        aria-label="Open notebook to view projects"
        {...tiltHandlers}
      >
        <span className={styles.sourceFrame} data-transition-source="notebook">
          <span className={styles.castShadow} aria-hidden="true" />
          <span
            className={styles.notebookBody}
            data-transition-visual-source="notebook"
          >
            <img
              src="/plate/notebook.webp"
              alt=""
              className={styles.image}
              draggable={false}
            />
          </span>
        </span>
      </button>
      <FigCaption number={1} label="works" align="center" />
    </figure>
  );
}
