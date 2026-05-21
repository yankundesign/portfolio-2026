import FigCaption from '../shared/FigCaption';
import WatercolorWash from '../shared/WatercolorWash';
import { useObjectTilt } from '../../interactions/useObjectTilt';
import { useTransitionState } from '../../interactions/useTransitionState';
import styles from './NotebookCover.module.css';

export interface NotebookCoverProps {
  className?: string;
}

/**
 * Notebook — fig. 01 on the desk plate.
 *
 * An image of the real generated field-notebook asset, sized and placed
 * as the hero object on the homepage plate. The hover affordance is
 * typographic (caption underline slides in), an ink wash that blooms
 * behind the cover after a 300ms dwell, and a layered tilt object that
 * separates the cast shadow from the notebook body.
 *
 * Click no longer navigates directly. Instead it requests the
 * `notebook:open` transition; the NotebookTransition overlay handles the
 * route change at the choreography midpoint. The stable
 * `data-transition-source` frame lets the overlay measure the desk
 * position to morph from without inheriting pointer tilt.
 */
export default function NotebookCover({ className }: NotebookCoverProps) {
  const { openNotebook } = useTransitionState();
  const { ref, tiltHandlers } = useObjectTilt<HTMLButtonElement>();

  return (
    <figure className={`${styles.figure} ${className ?? ''}`}>
      <button
        ref={ref}
        type="button"
        className={styles.button}
        onClick={openNotebook}
        aria-label="Open notebook to view projects"
        {...tiltHandlers}
      >
        <span className={styles.sourceFrame} data-transition-source="notebook">
          <WatercolorWash className={styles.wash} />
          <span className={styles.castShadow} aria-hidden="true" />
          <span className={styles.notebookBody}>
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
