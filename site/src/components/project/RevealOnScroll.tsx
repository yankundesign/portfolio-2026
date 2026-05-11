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
  /** Wrapper element tag. */
  as?: 'div' | 'figure' | 'section' | 'aside' | 'blockquote' | 'p' | 'header';
  className?: string;
}

/**
 * Gentle fade + translate-up when the element enters the viewport.
 *
 * Respects `prefers-reduced-motion` — revealed immediately, no transform.
 * Each element animates once.
 */
export default function RevealOnScroll({
  children,
  delay = 0,
  translate = 20,
  threshold = 0.2,
  as: Tag = 'div',
  className,
}: RevealOnScrollProps) {
  const [ref, inView] = useInView<HTMLElement>({ threshold, rootMargin: '0px 0px -8% 0px' });
  const reducedMotion = useReducedMotion();
  const [delayedIn, setDelayedIn] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!inView) return;
    if (delay <= 0) {
      setDelayedIn(true);
      return;
    }
    timeoutRef.current = window.setTimeout(() => setDelayedIn(true), delay);
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [inView, delay]);

  const revealed = reducedMotion || delayedIn;

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={[styles.reveal, revealed ? styles.revealed : '', className ?? ''].join(' ').trim()}
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
