import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import EditorialPlate from '../components/shared/EditorialPlate';
import NotebookCover from '../components/desk/NotebookCover';
import ResumePaper from '../components/desk/ResumePaper';
import AboutObject from '../components/desk/AboutObject';
import Pen from '../components/desk/Pen';
import CatRoulette from '../components/desk/CatRoulette';
import DeskLight from '../components/desk/DeskLight';
import DeskWayfinder from '../components/desk/DeskWayfinder';
import Ephemera from '../components/desk/Ephemera';
import Grain from '../components/shared/Grain';
import styles from './DeskRoute.module.css';

/**
 * DeskRoute — v0.4 Swiss editorial plate register.
 *
 * The homepage is `EDITORIAL PLATE — 01 · DESK OBJECTS`. Five real-asset
 * specimens (notebook, cv, about, pen, roulette) sit on an 8-column grid
 * inside the plate chrome. No composing animation, no ambient light,
 * no parallax — the plate is still and information-forward, per v0.4.
 */
export default function DeskRoute() {
  const navigate = useNavigate();

  // Report the live viewport in the top-right chrome. Quiet technical
  // touch that matches the real behavior of a specimen sheet.
  const [format, setFormat] = useState(() => formatViewport());
  useEffect(() => {
    const onResize = () => setFormat(formatViewport());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      <EditorialPlate
        plateNumber={1}
        plateTitle="DESK OBJECTS"
        system="12 COLUMN GRID"
        metaLines={['Yankun Wang', 'Portfolio']}
        format={format}
        columns={12}
        grid={{ columns: 12, gutter: 24, margin: 60 }}
        currentlyLine="CURRENTLY — Building something fun."
        siteBuildLine="THIS SITE · DESIGNED AND SHIPPED IN 2 WEEKS WITH CLAUDE CODE."
      >
        <DeskLight />

        <div className={styles.scene}>
          {/* Ephemera mounted first so navigation objects paint on top —
           * architectural sketch and blueprint peek out from behind the
           * notebook; postage stamp doesn't overlap any object. */}
          <Ephemera />

          <div className={`${styles.slot} ${styles.slotRoulette}`}>
            <CatRoulette />
          </div>

          <div className={`${styles.slot} ${styles.slotNotebook}`}>
            {/* No onClick — NotebookCover dispatches the transition event;
             * the NotebookTransition overlay owns the route change. */}
            <NotebookCover />
          </div>

          <div className={`${styles.slot} ${styles.slotCv}`}>
            <ResumePaper onClick={() => navigate('/cv')} />
          </div>

          <div className={`${styles.slot} ${styles.slotAbout}`}>
            <AboutObject onClick={() => navigate('/about')} />
          </div>

          <div className={`${styles.slot} ${styles.slotPen}`}>
            <Pen />
          </div>

          <DeskWayfinder />
        </div>
      </EditorialPlate>

      <Grain />
    </>
  );
}

function formatViewport(): string {
  if (typeof window === 'undefined') return '1280 × 720 PX';
  return `${window.innerWidth} × ${window.innerHeight} PX`;
}
