import { useEffect, useState, type RefObject } from 'react';
import { MonographPointer } from './monographPointer';
import type { NotebookEngine } from './notebookEngine';

/**
 * useMonographPointer — creates the homepage's pointer layer once (see
 * MonographPointer), attaches it to the page's parts, and keeps it in step with
 * the book state and reduced motion. Returns the instance, so the route can
 * draw the rule and land the name when its intro reaches those beats.
 */
export function useMonographPointer({
  engine,
  slotRef,
  nameRef,
  lampRef,
  ruleRef,
  openLabelRef,
  indexRef,
  active,
  reducedMotion,
}: {
  engine: NotebookEngine;
  slotRef: RefObject<HTMLElement | null>;
  nameRef: RefObject<HTMLElement | null>;
  lampRef: RefObject<HTMLElement | null>;
  ruleRef: RefObject<SVGSVGElement | null>;
  openLabelRef: RefObject<HTMLElement | null>;
  indexRef: RefObject<HTMLElement | null>;
  active: boolean;
  reducedMotion: boolean;
}): MonographPointer {
  const [pointer] = useState(() => new MonographPointer(engine));

  useEffect(() => {
    const slot = slotRef.current, name = nameRef.current, lamp = lampRef.current, rule = ruleRef.current;
    const openLabel = openLabelRef.current, index = indexRef.current;
    if (!slot || !name || !lamp || !rule || !openLabel || !index) return;
    pointer.attach({ slot, name, lamp, rule, openLabel, index });
    return () => pointer.detach();
  }, [pointer, slotRef, nameRef, lampRef, ruleRef, openLabelRef, indexRef]);

  useEffect(() => {
    pointer.configure({ active, reducedMotion });
  }, [pointer, active, reducedMotion]);

  return pointer;
}
