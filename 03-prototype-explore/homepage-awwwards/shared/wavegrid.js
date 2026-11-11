// [classic] Loaded with a plain <script>, not as a module, so the prototypes
// also work when opened straight from disk (file://), where browsers block modules.
(() => {
// Plain-JS port of site/src/interactions/useWaveGrid.ts (prototype only).
// Same model and constants as the live desk: the pointer drops ripple
// sources; each sends out a cosine ring in a Gaussian envelope; the plate's
// columns are cut into near-square paper tiles whose heights are drawn as a
// blind emboss lit from the upper left. A flat field draws nothing.

const DESK_WAVE = {
  density: 1, gain: 1.4, lift: 6, shadow: 0.1, light: 0.8, tone: 0.04,
  speed: 360, wavelength: 360, ringWidth: 180, fade: 1.4, idleDrops: false,
};

const MAX_SOURCES = 96, SOURCE_SPACING = 10, STRENGTH_TRAVEL = 48, MAX_STRENGTH = 1.5;
const ATTENUATION = 450, EDGE_REACH = 80, JITTER = 0.2;
const LIGHT_SHARE = 0.35, EDGE_RAMP = 0.12, MIN_STEP = 0.004, MAX_STEP_SECONDS = 1 / 20, MAX_DPR = 2;

const hash = (i, j, seed) => { const n = Math.sin(i * 127.1 + j * 311.7 + seed * 74.7) * 43758.5453; return n - Math.floor(n) - 0.5; };
const snapEdges = (count, size, dpr) => { const e = new Float32Array(count + 1); for (let i = 0; i <= count; i++) e[i] = Math.round(i * size * dpr); return e; };

function createWaveGrid(canvas, params = DESK_WAVE, columns = 12) {
  const ctx = canvas.getContext('2d');
  const tokens = getComputedStyle(canvas);
  const ink = tokens.getPropertyValue('--ink').trim() || '#16265e';
  const paper = tokens.getPropertyValue('--paper').trim() || '#f4f1ea';
  const sources = [];
  let heights = new Float32Array(0), width = 0, height = 0, dpr = 1, raf = 0, lastTime = 0, lastPointer = null;
  let enabled = true;

  const addSource = (x, y, strength, speed = params.speed) => {
    if (sources.length >= MAX_SOURCES) sources.shift();
    sources.push({ x, y, age: 0, strength, speed, front: 0, weight: 0 });
  };

  const drawEdge = (p, step, x, y, w, th, vertical) => {
    const size = Math.abs(step);
    if (size <= MIN_STEP) return;
    const strength = Math.min(size / EDGE_RAMP, 1);
    const lift = p.lift * dpr;
    const span = vertical ? w : th;
    if (step > 0) {
      const len = Math.min(Math.max(size * lift * LIGHT_SHARE, 1), span);
      ctx.fillStyle = paper; ctx.globalAlpha = p.light * strength;
      if (vertical) ctx.fillRect(x, y, len, th); else ctx.fillRect(x, y, w, len);
      return;
    }
    const len = Math.min(Math.max(size * lift, 1), span);
    ctx.fillStyle = ink; ctx.globalAlpha = p.shadow * strength * 0.5;
    if (vertical) { ctx.fillRect(x, y, len, th); ctx.fillRect(x, y, len * 0.5, th); }
    else { ctx.fillRect(x, y, w, len); ctx.fillRect(x, y, w, len * 0.5); }
  };

  const render = (p) => {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!sources.length || !width || !height) return;
    const cols = Math.max(1, Math.round(columns * p.density));
    const tileW = width / cols;
    const rows = Math.max(1, Math.round(height / tileW));
    const tileH = height / rows;
    if (heights.length !== cols * rows) heights = new Float32Array(cols * rows);
    const k = (Math.PI * 2) / p.wavelength, ring2 = p.ringWidth * p.ringWidth, reach = p.ringWidth * 3, jitter = JITTER * tileW;
    for (const s of sources) { s.front = s.speed * s.age; s.weight = s.strength * Math.exp(-s.age / p.fade); }
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const cx = (i + 0.5) * tileW + hash(i, j, 1) * jitter, cy = (j + 0.5) * tileH + hash(i, j, 2) * jitter;
      let sum = 0, total = 0;
      for (const s of sources) {
        const dx = cx - s.x, dy = cy - s.y, dist = Math.sqrt(dx * dx + dy * dy), rel = dist - s.front;
        if (rel > reach || rel < -reach) continue;
        const w = (s.weight * Math.exp(-(rel * rel) / ring2)) / (1 + dist / ATTENUATION);
        sum += w * Math.cos(k * rel); total += w;
      }
      const h = (sum / Math.max(total, 1)) * p.gain;
      heights[j * cols + i] = h > 1 ? 1 : h < -1 ? -1 : h;
    }
    const xs = snapEdges(cols, tileW, dpr), ys = snapEdges(rows, tileH, dpr);
    if (p.tone > 0) for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const h = heights[j * cols + i];
      if (Math.abs(h) <= MIN_STEP) continue;
      ctx.fillStyle = h > 0 ? paper : ink; ctx.globalAlpha = Math.abs(h) * p.tone;
      ctx.fillRect(xs[i], ys[j], xs[i + 1] - xs[i], ys[j + 1] - ys[j]);
    }
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const index = j * cols + i, h = heights[index];
      const x = xs[i], y = ys[j], w = xs[i + 1] - x, th = ys[j + 1] - y;
      drawEdge(p, h - (i > 0 ? heights[index - 1] : 0), x, y, w, th, true);
      drawEdge(p, h - (j > 0 ? heights[index - cols] : 0), x, y, w, th, false);
    }
    ctx.globalAlpha = 1;
  };

  const frame = (now) => {
    const dt = Math.min((now - lastTime) / 1000, MAX_STEP_SECONDS);
    lastTime = now;
    for (let i = sources.length - 1; i >= 0; i--) { sources[i].age += dt; if (sources[i].age > params.fade * 4) sources.splice(i, 1); }
    render(params);
    raf = sources.length ? requestAnimationFrame(frame) : 0;
  };
  const wake = () => { if (raf || !enabled) return; lastTime = performance.now(); raf = requestAnimationFrame(frame); };

  const resize = () => {
    const r = canvas.getBoundingClientRect();
    dpr = Math.min(devicePixelRatio || 1, MAX_DPR);
    width = r.width; height = r.height;
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    render(params);
  };

  const onPointerMove = (e) => {
    if (!enabled) return;
    const r = canvas.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const outside = x < -EDGE_REACH || y < -EDGE_REACH || x > r.width + EDGE_REACH || y > r.height + EDGE_REACH;
    if (outside || !lastPointer) { lastPointer = outside ? null : { x, y }; return; }
    const travel = Math.hypot(x - lastPointer.x, y - lastPointer.y);
    if (travel < SOURCE_SPACING) return;
    lastPointer = { x, y };
    addSource(x, y, Math.min(travel / STRENGTH_TRAVEL, MAX_STRENGTH));
    wake();
  };

  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  addEventListener('pointermove', onPointerMove, { passive: true });

  return {
    // Drop a ripple at a point given as fractions of the field (0–1).
    drop(x, y, ripple) { const r = canvas.getBoundingClientRect(); addSource(x * r.width, y * r.height, ripple.strength, ripple.speed); wake(); },
    // Drop a ripple at viewport coordinates.
    dropAt(clientX, clientY, ripple) { const r = canvas.getBoundingClientRect(); addSource(clientX - r.left, clientY - r.top, ripple.strength, ripple.speed); wake(); },
    setEnabled(on) { enabled = on; if (!on) lastPointer = null; },
    destroy() { cancelAnimationFrame(raf); ro.disconnect(); removeEventListener('pointermove', onPointerMove); },
  };
}

window.NBWave = { DESK_WAVE, createWaveGrid };
})();
