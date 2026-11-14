import { NOTEBOOK_ASSETS } from '../../data/notebook';
import styles from './SettleCover.module.css';

/**
 * SettleCover — the Field Notebook's front board.
 *
 * The generated cloth board (photo) with the type stamped live on top in
 * paper-coloured pigment, and one line: a damped spring,
 * y = e^(−4.4u)·cos(2π·3.2u), plotted from the left until it lies flat as the
 * baseline the title sits on. The curve motion designers tune, drawn as a
 * still: energy spent, then calm. It draws itself in when the cover mounts.
 *
 * Board units: 100 × 135.2 (the board's 0.7395 aspect). Baseline y = 112.
 */
const SPRING_PATH = (() => {
  const pts: string[] = [];
  for (let x = 15; x <= 92.001; x += 0.4) {
    const u = (x - 15) / 34; // the spring lives in the first 34 units
    const y = u <= 1 ? 112 - 17 * Math.exp(-4.4 * u) * Math.cos(2 * Math.PI * 3.2 * u) * (1 - u * 0.02) : 112;
    pts.push(`${+x.toFixed(2)} ${+y.toFixed(2)}`);
  }
  return `M${pts.join(' L')}`;
})();

export default function SettleCover() {
  return (
    <div className={styles.board}>
      <img className={styles.photo} src={NOTEBOOK_ASSETS.cover} alt="" draggable={false} />
      <span className={styles.label}>Field Notebook</span>
      <svg className={styles.line} viewBox="0 0 100 135.2" preserveAspectRatio="none" aria-hidden="true">
        <path pathLength={1} d={SPRING_PATH} />
      </svg>
      <span className={styles.title}>Selected work</span>
      <span className={styles.years}>2024–2026</span>
    </div>
  );
}
