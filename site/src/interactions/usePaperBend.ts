import { useEffect, useRef } from 'react';

const SEGMENT_COUNT = 16;
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)';

interface PaperStrip {
  strip: HTMLElement;
  face: HTMLElement;
}

/**
 * Bends one tipped-in project print from a fixed top edge. The original face
 * remains in the button for sizing, semantics, and reduced-motion rendering.
 * Visual strips are created only when a fine pointer or keyboard focus needs
 * them, so the scrolling mobile list never mounts a mesh for every card.
 */
export function usePaperBend() {
  const plateRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const plate = plateRef.current;
    if (!plate) return;

    const button = plate.querySelector<HTMLButtonElement>('[data-paper-button]');
    const source = plate.querySelector<HTMLElement>('[data-paper-source]');
    const mesh = plate.querySelector<HTMLElement>('[data-paper-mesh]');
    if (!button || !source || !mesh) return;
    const sourceImage = source.querySelector('img');

    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);
    const finePointer = window.matchMedia(FINE_POINTER_QUERY);
    const strips: PaperStrip[] = [];
    const spring = {
      bend: 0,
      bendVelocity: 0,
      edge: 0,
      edgeVelocity: 0,
      target: 0,
      height: 0,
    };
    let frameId = 0;
    let lastFrameTime = 0;
    let disposed = false;

    const clamp = (value: number, min: number, max: number) =>
      Math.min(max, Math.max(min, value));

    function paint() {
      if (!plate || !spring.height) return;
      const band = spring.height / SEGMENT_COUNT;
      let y = 0;
      let z = 0;

      strips.forEach(({ strip }, index) => {
        const u = (index + 0.5) / SEGMENT_COUNT;
        const freeLength = clamp((u - 0.08) / 0.92, 0, 1);
        const curve = Math.pow(freeLength, 1.6);
        const angle =
          0.27 * curve *
          (0.58 * spring.bend + 0.42 * spring.edge * freeLength);

        strip.style.transform =
          `translate3d(0, ${y.toFixed(3)}px, ${z.toFixed(3)}px) ` +
          `rotateX(${angle.toFixed(5)}rad)`;
        y += Math.cos(angle) * band;
        z += Math.sin(angle) * band;
      });

      const depth = clamp(z / 30, 0, 1);
      plate.style.setProperty('--shadow-shift', `${(depth * 12).toFixed(2)}px`);
      plate.style.setProperty('--shadow-scale', `${(1 + depth * 0.11).toFixed(3)}`);
      plate.style.setProperty('--shadow-opacity', `${(0.18 + depth * 0.16).toFixed(3)}`);
      plate.style.setProperty('--ambient-opacity', `${(0.42 + depth * 0.26).toFixed(3)}`);
      plate.style.setProperty('--ambient-shift', `${(depth * 7).toFixed(2)}px`);
      plate.style.setProperty('--ambient-scale', `${(0.98 + depth * 0.055).toFixed(3)}`);
    }

    function measure() {
      if (!button || strips.length === 0) return;
      const height = button.offsetHeight;
      if (!height) return;
      spring.height = height;
      const band = height / SEGMENT_COUNT;

      strips.forEach(({ strip, face }, index) => {
        // A small overlap hides subpixel gaps between neighboring tilted bands.
        strip.style.height = `${(band + 0.9).toFixed(3)}px`;
        face.style.transform = `translateY(${(-index * band).toFixed(3)}px)`;
      });
      paint();
    }

    const resizeObserver = new ResizeObserver(measure);

    function ensureMesh() {
      if (!source || !mesh || !button || strips.length) return;
      const fragment = document.createDocumentFragment();

      for (let index = 0; index < SEGMENT_COUNT; index += 1) {
        const strip = document.createElement('span');
        strip.dataset.paperStrip = '';
        const face = source.cloneNode(true) as HTMLElement;
        face.removeAttribute('data-paper-source');
        face.setAttribute('aria-hidden', 'true');
        face.querySelectorAll('img').forEach((image) => {
          image.loading = 'eager';
        });
        strip.append(face);
        fragment.append(strip);
        strips.push({ strip, face });
      }

      mesh.append(fragment);
      resizeObserver.observe(button);
      measure();
    }

    function step(now: number) {
      const dt = lastFrameTime
        ? Math.min((now - lastFrameTime) / 1000, 0.032)
        : 0;
      lastFrameTime = now;

      spring.bendVelocity +=
        ((spring.target - spring.bend) * 82 - spring.bendVelocity * 17) * dt;
      spring.bend += spring.bendVelocity * dt;
      spring.edgeVelocity +=
        ((spring.target - spring.edge) * 50 - spring.edgeVelocity * 13.5) * dt;
      spring.edge += spring.edgeVelocity * dt;

      const bendSettled =
        Math.abs(spring.target - spring.bend) < 0.002 &&
        Math.abs(spring.bendVelocity) < 0.01;
      const edgeSettled =
        Math.abs(spring.target - spring.edge) < 0.002 &&
        Math.abs(spring.edgeVelocity) < 0.01;

      if (bendSettled) {
        spring.bend = spring.target;
        spring.bendVelocity = 0;
      }
      if (edgeSettled) {
        spring.edge = spring.target;
        spring.edgeVelocity = 0;
      }

      paint();
      if (!spring.target && bendSettled && edgeSettled) {
        plate?.removeAttribute('data-paper-bending');
      }

      if (!bendSettled || !edgeSettled) {
        frameId = window.requestAnimationFrame(step);
      } else {
        frameId = 0;
        lastFrameTime = 0;
      }
    }

    function sync() {
      if (!plate || !button || disposed) return;
      const active =
        button.matches(':focus-visible') ||
        (finePointer.matches && plate.matches(':hover'));

      if (reducedMotion.matches) {
        if (frameId) window.cancelAnimationFrame(frameId);
        frameId = 0;
        lastFrameTime = 0;
        spring.bend = spring.bendVelocity = 0;
        spring.edge = spring.edgeVelocity = spring.target = 0;
        plate.removeAttribute('data-paper-bending');
        paint();
        return;
      }

      // Keep the original print visible until its mockup can be reused by the
      // cloned strips. This matters on a quick hover during a lazy image load.
      if (active && sourceImage && !sourceImage.complete) return;

      if (active) {
        ensureMesh();
        plate.setAttribute('data-paper-bending', '');
      }
      spring.target = active ? 1 : 0;
      if (strips.length && !frameId) frameId = window.requestAnimationFrame(step);
    }

    const syncAfterFocus = () => queueMicrotask(sync);
    plate.addEventListener('pointerenter', sync);
    plate.addEventListener('pointerleave', sync);
    button.addEventListener('focusin', syncAfterFocus);
    button.addEventListener('focusout', syncAfterFocus);
    reducedMotion.addEventListener('change', sync);
    finePointer.addEventListener('change', sync);
    sourceImage?.addEventListener('load', sync);
    sourceImage?.addEventListener('error', sync);
    document.fonts.ready.then(() => {
      if (!disposed && strips.length) measure();
    });
    sync();

    return () => {
      disposed = true;
      if (frameId) window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      plate.removeEventListener('pointerenter', sync);
      plate.removeEventListener('pointerleave', sync);
      button.removeEventListener('focusin', syncAfterFocus);
      button.removeEventListener('focusout', syncAfterFocus);
      reducedMotion.removeEventListener('change', sync);
      finePointer.removeEventListener('change', sync);
      sourceImage?.removeEventListener('load', sync);
      sourceImage?.removeEventListener('error', sync);
      mesh.replaceChildren();
    };
  }, []);

  return plateRef;
}
