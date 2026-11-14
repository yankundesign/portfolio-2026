import { plateCarry } from '../../interactions/plateCarry';
import styles from './PlateCarrier.module.css';

const hold = (el: HTMLDivElement | null) => plateCarry.attach(el);

/**
 * PlateCarrier — the frame that carries a works-page plate into its case
 * study, and the case study's opening board back to the works page. It sits
 * outside the pages (App mounts it once), so it is still there while one page
 * gives way to the other. Empty and hidden until something is picked up;
 * PlateCarry places it, fills it and moves it.
 *
 * Two layers. The copy holds the opening board on the way back. The plate is
 * the works page's frame: the plate's light copy, its full PNG, and a canvas
 * for the preview loop's frame when the loop was playing.
 */
export default function PlateCarrier() {
  return (
    <div ref={hold} className={styles.carry} aria-hidden="true">
      <div className={styles.copy} data-copy />
      <div className={styles.plate} data-plate>
        <img alt="" draggable={false} />
        <img alt="" draggable={false} />
        <canvas />
      </div>
    </div>
  );
}
