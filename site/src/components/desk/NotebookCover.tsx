import { useCallback } from 'react';
import FigCaption from '../shared/FigCaption';
import { gsap } from '../../interactions/gsap';
import { useObjectTilt } from '../../interactions/useObjectTilt';
import { useReducedMotion } from '../../interactions/useReducedMotion';
import { useTransitionState } from '../../interactions/useTransitionState';
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
  const { openNotebook } = useTransitionState();
  const { ref, tiltHandlers } = useObjectTilt<HTMLButtonElement>();
  const reducedMotion = useReducedMotion();

  const handleOpen = useCallback(() => {
    const button = ref.current;
    if (reducedMotion || !button) {
      openNotebook();
      return;
    }

    gsap.killTweensOf(button);
    gsap
      .timeline({ onComplete: openNotebook })
      .to(button, {
        '--object-scale': 1.025,
        '--object-lift-y': '-8px',
        '--object-shadow-y': '18px',
        duration: 0.06,
        ease: 'power2.out',
      })
      .to(button, {
        '--object-scale': 1.025,
        '--object-lift-y': '-14px',
        '--object-shadow-y': '24px',
        duration: 0.12,
        ease: 'power3.out',
      });
  }, [openNotebook, reducedMotion, ref]);

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
