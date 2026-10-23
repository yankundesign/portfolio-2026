import { useEffect } from 'react';
import type { RefObject } from 'react';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)';
/** Matches the .preview opacity transition in ProjectPlate.module.css. */
const FADE_MS = 320;
/** Quiet background fetch so the first hover starts without a wait. */
const WARM_DELAY_MS = 1200;

/**
 * Plays a project plate's preview loop while the plate is hovered (fine
 * pointer) or keyboard-focused, and returns it to the still on leave.
 *
 * The loop's first frame is the plate mockup, so the 320ms opacity fade is
 * a still that starts moving. While usePaperBend has the print lifted, the
 * visible surface is its 16 cloned strips; each strip holds a canvas mirror
 * of the video, and this hook paints only the band a strip actually shows
 * from the single real <video>. One decoder, one fetch.
 *
 * Touch and prefers-reduced-motion never play; the still stays.
 */
export function usePlatePreview(
  plateRef: RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  useEffect(() => {
    const plate = plateRef.current;
    if (!plate || !enabled) return;

    const button = plate.querySelector<HTMLElement>('[data-paper-button]');
    const video = plate.querySelector<HTMLVideoElement>('[data-plate-preview]');
    const sleeve = video?.parentElement;
    if (!button || !video || !sleeve) return;

    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);
    const finePointer = window.matchMedia(FINE_POINTER_QUERY);
    video.muted = true;

    let active = false;
    let running = false;
    let disposed = false;
    let frameHandle = 0;
    let frameFromVideo = false;
    let resetTimer = 0;
    let warmTimer = 0;

    const mirrors = () =>
      plate.querySelectorAll<HTMLCanvasElement>('canvas[data-paper-video-mirror]');

    function paintMirrors() {
      if (!video || !sleeve || !button) return;
      const list = mirrors();
      if (!list.length || video.readyState < 2 || !video.videoWidth) return;

      const face = sleeve.offsetParent as HTMLElement | null;
      const width = sleeve.clientWidth;
      const height = sleeve.clientHeight;
      if (!face || !width || !height) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const band = button.offsetHeight / list.length;
      // Top of the video box, in the face's border-box coordinates.
      const videoTop = face.clientTop + sleeve.offsetTop + sleeve.clientTop;
      const canvasWidth = Math.round(width * dpr);
      const canvasHeight = Math.round(height * dpr);
      const scaleY = video.videoHeight / height;

      list.forEach((canvas) => {
        const index = Number(canvas.dataset.paperVideoMirror);
        if (canvas.width !== canvasWidth || canvas.height !== canvasHeight) {
          canvas.width = canvasWidth;
          canvas.height = canvasHeight;
        }
        // The strip shows face rows [index * band, (index + 1) * band];
        // one pixel of slack each side covers the strips' overlap.
        const from = Math.max(0, index * band - videoTop - 1);
        const to = Math.min(height, (index + 1) * band - videoTop + 2);
        if (to <= from) return;

        const context = canvas.getContext('2d');
        if (!context) return;
        context.drawImage(
          video,
          0,
          from * scaleY,
          video.videoWidth,
          (to - from) * scaleY,
          0,
          from * dpr,
          canvasWidth,
          (to - from) * dpr,
        );
      });
    }

    function schedule() {
      if (!running || !video) return;
      if ('requestVideoFrameCallback' in video) {
        frameFromVideo = true;
        frameHandle = video.requestVideoFrameCallback(tick);
      } else {
        frameFromVideo = false;
        frameHandle = window.requestAnimationFrame(tick);
      }
    }

    function tick() {
      frameHandle = 0;
      paintMirrors();
      schedule();
    }

    function cancelFrames() {
      if (!frameHandle || !video) return;
      if (frameFromVideo) video.cancelVideoFrameCallback(frameHandle);
      else window.cancelAnimationFrame(frameHandle);
      frameHandle = 0;
    }

    function start() {
      if (!video || !plate) return;
      window.clearTimeout(resetTimer);
      video.preload = 'auto';
      if (!running) {
        running = true;
        schedule();
      }
      video
        .play()
        .then(() => {
          if (!active || disposed) return;
          paintMirrors();
          plate.setAttribute('data-previewing', '');
        })
        // Blocked or interrupted by a quick leave: the still simply stays.
        .catch(() => {});
    }

    function stop() {
      plate?.removeAttribute('data-previewing');
      window.clearTimeout(resetTimer);
      // Keep frames flowing through the fade, then rewind to the still.
      resetTimer = window.setTimeout(() => {
        if (!video || active) return;
        running = false;
        cancelFrames();
        video.pause();
        if (video.readyState > 0) video.currentTime = 0;
        mirrors().forEach((canvas) =>
          canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height),
        );
      }, FADE_MS);
    }

    function sync() {
      if (!plate || !button || disposed) return;
      const wanted =
        !reducedMotion.matches &&
        (button.matches(':focus-visible') ||
          (finePointer.matches && plate.matches(':hover')));
      if (wanted === active) return;
      active = wanted;
      if (active) start();
      else stop();
    }

    if (finePointer.matches && !reducedMotion.matches) {
      warmTimer = window.setTimeout(() => {
        if (!disposed && video.preload === 'none') video.preload = 'auto';
      }, WARM_DELAY_MS);
    }

    const syncAfterFocus = () => queueMicrotask(sync);
    plate.addEventListener('pointerenter', sync);
    plate.addEventListener('pointerleave', sync);
    button.addEventListener('focusin', syncAfterFocus);
    button.addEventListener('focusout', syncAfterFocus);
    reducedMotion.addEventListener('change', sync);
    finePointer.addEventListener('change', sync);

    return () => {
      disposed = true;
      running = false;
      cancelFrames();
      window.clearTimeout(resetTimer);
      window.clearTimeout(warmTimer);
      video.pause();
      plate.removeAttribute('data-previewing');
      plate.removeEventListener('pointerenter', sync);
      plate.removeEventListener('pointerleave', sync);
      button.removeEventListener('focusin', syncAfterFocus);
      button.removeEventListener('focusout', syncAfterFocus);
      reducedMotion.removeEventListener('change', sync);
      finePointer.removeEventListener('change', sync);
    };
  }, [plateRef, enabled]);
}
