import { useEffect, useRef, type ReactNode } from 'react';
import { NOTEBOOK_ASSETS } from '../../data/notebook';
import type { NotebookEngine, NotebookState } from '../../interactions/notebookEngine';
import { useFollowLabel } from '../../interactions/useFollowLabel';
import SettleCover from './SettleCover';
import styles from './Notebook.module.css';

export interface NotebookProps {
  engine: NotebookEngine;
  state: NotebookState;
  onClose: () => void;
  /** True when the last interaction was the keyboard: focus the first entry on open. */
  keyboardOpen: boolean;
  /** The open spread's contents (sized in container units of the spread). */
  children: ReactNode;
}

/**
 * Notebook — the homepage's one object, drawn in 3D.
 *
 * The book box is the open spread; the cover is its right half, hinged at the
 * spine. Every moving part registers with the engine through `engine.ref()`;
 * React only renders structure and state, never per-frame motion.
 *
 * Closing lives on the book: a tab slides out from under the fore-edge, the
 * paper around the book closes it (there the cursor becomes “Close ×”), and Esc.
 */
export default function Notebook({ engine, state, onClose, keyboardOpen, children }: NotebookProps) {
  const insideRef = useRef<HTMLDivElement>(null);
  const { labelRef, onPointerMove, onPointerLeave, onPointerDown, hide } = useFollowLabel();
  const open = state === 'open';

  // The label belongs to the open book only.
  useEffect(() => { if (!open) hide(); }, [open, hide]);

  // Land focus inside the book when it opens: on the first title for
  // keyboard readers, on the contents (nothing highlighted) for pointers.
  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => {
      const inside = insideRef.current;
      if (!inside) return;
      const first = inside.querySelector<HTMLElement>('[data-toc-link]');
      if (keyboardOpen && first) first.focus({ preventScroll: true });
      else inside.focus({ preventScroll: true });
    }, 450);
    return () => window.clearTimeout(id);
  }, [open, keyboardOpen]);

  return (
    <div className={styles.layer} ref={engine.ref('layer')} data-state={state}>
      <div
        className={styles.backdrop}
        onClick={onClose}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerDown={onPointerDown}
        aria-hidden="true"
      />
      <div className={styles.book} ref={engine.ref('book')}>
        <div className={`${styles.shadow} ${styles.shadowLeft}`} ref={engine.ref('shadowL')} />
        <div className={`${styles.shadow} ${styles.shadowRight}`} ref={engine.ref('shadowR')} />
        <img className={styles.ribbon} ref={engine.ref('ribbon')} src={NOTEBOOK_ASSETS.ribbon} alt="" draggable={false} />
        <button
          type="button"
          className={styles.tab}
          onClick={onClose}
          tabIndex={open ? 0 : -1}
          aria-label="Close the notebook"
        >
          <span>Close</span>
          <i aria-hidden="true">×</i>
        </button>
        <div className={styles.pages} ref={engine.ref('pages')}>
          <img className={styles.spread} src={NOTEBOOK_ASSETS.spread} alt="" draggable={false} />
          <div
            ref={insideRef}
            className={styles.inside}
            tabIndex={-1}
            inert={!open}
            data-shown={open}
            data-printed={state !== 'closed'}
          >
            {children}
          </div>
        </div>
        <div className={styles.cast} ref={engine.ref('cast')} />
        <div className={styles.cover} ref={engine.ref('cover')} aria-hidden="true">
          <div className={styles.front}>
            <SettleCover />
            <div className={styles.frontShade} ref={engine.ref('frontShade')} />
          </div>
          <div className={styles.back} style={{ backgroundImage: `url(${NOTEBOOK_ASSETS.spread})` }}>
            <div className={styles.backShade} ref={engine.ref('backShade')} />
          </div>
          <div className={styles.edge} ref={engine.ref('edge')} />
        </div>
      </div>
      <div className={styles.cursor} ref={labelRef} aria-hidden="true"><span>Close ×</span></div>
    </div>
  );
}
