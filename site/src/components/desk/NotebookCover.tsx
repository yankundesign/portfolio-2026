import FigCaption from '../shared/FigCaption';
import WatercolorWash from '../shared/WatercolorWash';
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
 * typographic (caption underline slides in) plus an ink wash that blooms
 * behind the cover after a 300ms dwell — the sole atmospheric effect on
 * the otherwise still plate. Trial run for extending the wash to other
 * desk objects.
 *
 * Click no longer navigates directly. Instead it requests the
 * `notebook:open` transition; the NotebookTransition overlay handles the
 * route change at the choreography midpoint. The `data-transition-source`
 * tag on the image lets the overlay measure the desk position to morph
 * from.
 */
export default function NotebookCover({ className }: NotebookCoverProps) {
  const { openNotebook } = useTransitionState();

  return (
    <figure className={`${styles.figure} ${className ?? ''}`}>
      <button
        type="button"
        className={styles.button}
        onClick={openNotebook}
        aria-label="Open notebook to view projects"
      >
        <WatercolorWash className={styles.wash} />
        <img
          src="/plate/notebook.webp"
          alt=""
          className={styles.image}
          draggable={false}
          data-transition-source="notebook"
        />
      </button>
      <FigCaption number={1} label="works" align="center" />
    </figure>
  );
}
