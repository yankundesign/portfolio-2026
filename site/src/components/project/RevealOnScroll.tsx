import { type ReactNode, useEffect, useRef, useState } from 'react';
import { useInView } from '../../interactions/useInView';
import { useReducedMotion } from '../../interactions/useReducedMotion';
import styles from './RevealOnScroll.module.css';

export interface RevealOnScrollProps {
  children: ReactNode;
  /** Delay in ms before revealing (stagger effect when siblings share a trigger). */
  delay?: number;
  /** Amount the element translates up as it reveals. Default 20px. */
  translate?: number;
  /** Fraction of element that must be visible to trigger. */
  threshold?: number;
  /**
   * How it arrives. 'rise' (default): fades in, moving up. 'set': set down on
   * the page, as the notebook is on the homepage (it comes down a little and
   * settles with the cover's spring). 'ink': fades in where it is.
   */
  variant?: 'rise' | 'set' | 'ink';
  /** Already in place: shown at once, with no arrival of its own (a plate is landing on it). */
  shown?: boolean;
  /** Wrapper element tag. */
  as?: 'div' | 'figure' | 'section' | 'aside' | 'blockquote' | 'p' | 'header' | 'li';
  className?: string;
}

/**
 * Brings an element in when it enters the viewport (see `variant`).
 *
 * Respects `prefers-reduced-motion` — revealed immediately, no transform.
 * Each element animates once.
 */
export default function RevealOnScroll({
  children,
  delay = 0,
  translate = 20,
  threshold = 0.2,
  variant = 'rise',
  shown = false,
  as: Tag = 'div',
  className,
}: RevealOnScrollProps) {
  const [ref, inView] = useInView<HTMLElement>({ threshold, rootMargin: '0px 0px -8% 0px' });
  const reducedMotion = useReducedMotion();
  const [delayedIn, setDelayedIn] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!inView) return;
    timeoutRef.current = window.setTimeout(() => setDelayedIn(true), Math.max(delay, 0));
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [inView, delay]);

  const revealed = reducedMotion || shown || delayedIn;

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={[styles.reveal, variant === 'rise' ? '' : styles[variant], revealed ? styles.revealed : '', shown ? styles.shown : '', className ?? '']
        .filter(Boolean)
        .join(' ')}
      style={
        reducedMotion
          ? undefined
          : ({ '--reveal-translate': `${translate}px` } as React.CSSProperties)
      }
    >
      {children}
    </Tag>
  );
}
