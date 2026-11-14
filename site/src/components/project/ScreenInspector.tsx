import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { InspectContext, type InspectRequest } from '../../interactions/useInspect';
import { ScreenView } from '../../interactions/screenView';
import { useReducedMotion } from '../../interactions/useReducedMotion';
import styles from './ScreenInspector.module.css';

/**
 * ScreenInspector — lets a reader look at a board's screen at full size.
 *
 * Wrap a case study in it; every image on a ClothBoard then enlarges on click
 * (or Enter). The screen grows out of its place on the board onto a field of
 * the board's own material (cloth for dark screens, paper for light artwork),
 * to twice its size on the page, and moves under the pointer where it is
 * larger than the window. A click, Esc, the wheel or scrolling sends it back.
 * Over the field the cursor is “Close ×”, as around the open notebook.
 *
 * Measuring, motion and listeners live in ScreenView (interactions/).
 */
export default function ScreenInspector({ children }: { children: ReactNode }) {
  const [request, setRequest] = useState<InspectRequest | null>(null);
  const closed = useCallback(() => setRequest(null), []);

  return (
    <InspectContext.Provider value={setRequest}>
      {children}
      {request && <Enlarged key={request.src} request={request} onClosed={closed} />}
    </InspectContext.Provider>
  );
}

function Enlarged({ request, onClosed }: { request: InspectRequest; onClosed: () => void }) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const field = fieldRef.current, scrim = scrimRef.current, img = imgRef.current, label = labelRef.current;
    if (!field || !scrim || !img || !label) return;
    const view = new ScreenView(
      { field, scrim, img, label },
      { from: request.from, size: request.size, at: request.at, reducedMotion, onClosed },
    );
    return () => view.destroy();
  }, [request, reducedMotion, onClosed]);

  return createPortal(
    <div
      ref={fieldRef}
      className={styles.field}
      data-tone={request.tone}
      role="dialog"
      aria-modal="true"
      aria-label={`Enlarged screen. ${request.alt}`}
      tabIndex={-1}
    >
      <div ref={scrimRef} className={styles.scrim} aria-hidden="true" />
      <img
        ref={imgRef}
        className={`${styles.screen} ${request.cutout ? styles.cutout : ''}`}
        src={request.src}
        alt=""
        draggable={false}
      />
      <div ref={labelRef} className={styles.close} aria-hidden="true"><span>Close ×</span></div>
    </div>,
    document.body,
  );
}
