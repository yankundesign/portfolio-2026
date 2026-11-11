import styles from './EditorialPlate.module.css';
import type { PlateStage } from '../../data/chaiContent';

/**
 * Shared by EditorialPlate (stills) and VideoPlate (recordings) so a staged
 * still and a staged recording are built from the same classes.
 */

/** Class list for the stage itself: the mat, its tone and its shape. */
export function stageClass(stage: Pick<PlateStage, 'tone'>): string {
  return [styles.stage, stage.tone === 'ink' ? styles.stageInk : ''].join(' ').trim();
}

/** Class list for a stage's screen row: alignment and surface. */
export function stageScreensClass(stage: Pick<PlateStage, 'align' | 'surface'>): string {
  return [
    styles.screens,
    stage.align === 'center' ? styles.screensCenter : '',
    stage.surface === 'cutout' ? styles.screensCutout : '',
  ]
    .join(' ')
    .trim();
}
