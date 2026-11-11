// [classic] Loaded with a plain <script>, not as a module, so the prototypes
// also work when opened straight from disk (file://), where browsers block modules.
(() => {
// Shared notebook for the five homepage prototypes. Prototype only.
//
// One book, one gesture. The book box is the open spread; the closed
// notebook is its right half with the cover on top. A page places the
// closed book by giving it a "slot" element (an untransformed box with the
// notebook's aspect ratio). Opening interpolates two things:
//   t — camera: from the slot pose to the centred spread pose
//   p — cover:  0 (closed) → 1 (lying flat on the left)
// Pages choreograph t and p differently; the book only draws them.

const ASSET = '../../site/public';
const SPREAD_ASPECT = 2600 / 1812;      // matches the live transition

// Generated Archive set (assets/README.md). Same geometry as the live spread:
// right board x 1617–3221 of 3234; the cover is that board, 1604 × 2170.
const ARCHIVE = {
  cover: 'assets/cover-archive.webp',
  spread: 'assets/open-notebook-v2.webp',
  ribbon: 'assets/ribbon.webp',
};
const COVER_ASPECT = 947 / 1380;        // plate/notebook.webp

const PROJECTS = [
  { slug: 'chai', title: 'Control Hub AI Assistant', year: '2024–26', sub: 'An AI assistant for IT admins', img: '/canvas/mockups/chai-v6.png' },
  { slug: 'control-hub-agentic', title: 'Control Hub Agentic', year: '2026', sub: 'Five prototypes, two platform shifts, and the one interaction that survived both', img: '/canvas/mockups/control-hub-agentic-stack.png' },
  { slug: 'ebb', title: 'Ebb', year: '2026', sub: 'A pause between the tap and the feed — that knows when you’re in a loop.', img: '/canvas/mockups/ebb.png' },
  { slug: 'zao', title: 'ZAO', year: '2026', sub: 'Learning design systems by building one with AI.', img: '/canvas/mockups/zao.png' },
  { slug: 'sap-fieldglass', title: 'SAP Fieldglass', year: '2020–24', sub: 'Making a complex system handleable — earlier work', img: '/canvas/mockups/sap-fieldglass.png' },
  { slug: 'build-with-ai', title: 'Build with AI', year: '2025–26', sub: 'A working shelf of AI builds.', img: '/canvas/mockups/build-with-ai.png' },
];

/* ─── Archive cover variants ───
 * Same board photo, five ways to answer "what is this book?". All type is
 * paper-coloured on the navy cloth (≥ 8:1); pressed lines are decoration.
 * No name on the cover: the homepage already says it at poster size. */
const COVER_VARIANTS = [
  // Round 3 — lines with a rule. Same type and placement on all five; only the
  // line changes, and each one is constructed, never scribbled. It draws in.
  { id: 'k', round: 3, name: 'Loop', device: 'One deliberate loop, then a straight run',
    rule: 'A single cursive loop: four tangent-continuous curves, crossing itself once, entering and leaving along the baseline.',
    idea: 'The single hard problem, handled once and well, then the work runs clear. The quietest of the five.',
    risk: 'So calm it can read as decoration unless the draw-in plays.' },
  { id: 'l', round: 3, name: 'Knot', device: 'An exact 3:2 Lissajous knot that becomes the line',
    rule: 'x = cos 3t, y = sin 2t: one closed figure, symmetric, every crossing at the same angle. The last strand leaves along its own tangent into the baseline.',
    idea: 'The tangle replaced by order: complexity with a structure you can read.',
    risk: 'It is mathematical; it may feel cooler and less personal than the hand-drawn line.' },
  { id: 'm', round: 3, name: 'Settle', device: 'A spring curve that comes to rest as the line',
    rule: 'A damped spring, y = e^(−4.4u)·cos(2π·3.2u): the curve you tune in a motion spec, plotted until it lies flat. The title moves right to sit on the calm part.',
    idea: 'A motion curve: the craft of easing and springs, drawn as a still. Energy spent, then calm.',
    risk: 'It reads as a chart to engineers, and that may be a feature.' },
  { id: 'n', round: 3, name: 'Iterations', device: 'Six lines, each simpler than the last',
    rule: 'One wave shape, scaled down by the same curve each step: noisy at the top, straight at the bottom. The title sits on the last line.',
    idea: 'Design as iteration: you can see the work getting clearer, in the same rhythm each time.',
    risk: 'Six lines quietly count the six projects; people may read it as a chart.' },
  { id: 'o', round: 3, name: 'Route', device: 'A routed path through six stations',
    rule: 'Orthogonal path, one corner radius, three rows each 8 units shorter than the last, six station rings; it ends in one long straight run.',
    idea: 'Systems thinking as wayfinding: the complicated part is routed, not hidden, then it opens into a clear line.',
    risk: 'Transit-map and circuit associations; it reads more “engineered” than “written”.' },
  // Round 2 — brand-led: the object is named Field Notebook. One ownable device each.
  { id: 'f', round: 2, name: 'Plate', device: 'An exploded drawing of the work',
    ref: 'Blueprint Notebook (ruler on the spine edge, a measured grid, a patent-style figure); Kajecik (the cover shows the subject)',
    idea: 'An architect’s drawing of the work: six projects as six stacked planes, keyed a–f. It shows complexity taken apart.',
    title: 'SELECTED WORK', content: 'Six systems, drawn to scale. Fig. 1, planes a–f', tags: 'Plate I · a cm ruler',
    risk: 'The busiest of the five; it carries the most explaining.' },
  { id: 'g', round: 2, name: 'Library', device: 'A monogram and a section index',
    ref: 'Atlas Garden (a serif monogram, a section index, giant cropped serif lines)',
    idea: 'The portfolio as a publication with sections. “F.N” is a mark the site can reuse: favicon, case-study folios, the about page.',
    title: 'Selected work & ways', content: 'F.N monogram; sections I–IV', tags: 'AI products · Enterprise · Systems · Tools',
    risk: 'The big type competes with the homepage name; it suits a quieter homepage.' },
  { id: 'h', round: 2, name: 'Line', device: 'One line, from tangle to straight',
    ref: 'Fulget (one drawn gesture, small neutral type, form that doesn’t compete with content)',
    idea: 'The thesis without the words: a tangle that resolves into the line the title sits on. It draws itself when the cover appears.',
    title: 'Selected work', content: 'The line', tags: 'Field Notebook · 2020–2026',
    risk: 'Abstract. It relies on the motion and the homepage to explain it.' },
  { id: 'i', round: 2, name: 'Monolith', device: 'One word at full height',
    ref: 'Frame (one oversized word as the structure; metadata at the corners)',
    idea: 'Gives the object a name: “Field”, set at the scale of the homepage’s own name, so the notebook reads as a branded thing.',
    title: 'Field (Notebook)', content: 'Selected work', tags: '2020–2026',
    risk: 'The loudest. On 01 it is a second poster next to the name.' },
  { id: 'j', round: 2, name: 'Module', device: 'A tile that becomes a pattern',
    ref: 'The patterned notebook (a mark tiled as the hero); Kajecik (a subject line of tags)',
    idea: 'One rule, a square with two quarter-arcs randomly turned, makes paths that wander yet always connect: simple rules, a handleable complexity. The tile is the logo.',
    title: 'Selected Work', content: 'The tile as mark; the pattern', tags: 'AI · Enterprise · Systems · Tools',
    risk: 'The most “brand”, the least “notebook”. The pattern needs restraint elsewhere.' },
  // Round 1 — typographic variations on the stamped cover

  { round: 1, id: 'a', name: 'Stamp', title: 'Selected Work', content: 'Six projects', tags: '2020–2026',
    visual: 'The current recessed panel, retitled. A label that says what is inside instead of a metaphor.' },
  { round: 1, id: 'b', name: 'Index', title: 'Selected work', content: 'All six project titles', tags: '01–06, 2020–2026',
    visual: 'The contents on the cover, ruled like the page inside. Readers see the range before they open it.' },
  { round: 1, id: 'c', name: 'Numeral', title: 'Selected work', content: 'One number: 06', tags: 'AI products · Enterprise · Design systems',
    visual: 'A large outlined “06” runs off the bottom edge. One bold mark; the disciplines as tags.' },
  { round: 1, id: 'd', name: 'Tooled', title: 'Selected Work', content: 'Nothing else', tags: '2020 – 2026 in old-style figures',
    visual: 'A bookbinder’s double frame pressed into the cloth, letterspaced capitals, one small ornament. Quietest of the five.' },
  { round: 1, id: 'e', name: 'Ruled', title: 'Work', content: 'Six pressed columns, one per project', tags: '01–06 at the column heads',
    visual: 'The site’s column grid pressed into the cloth. A large italic “Work” sits on a pressed baseline.' },
];


// Board in SVG units: 100 × 135.2 (the board's 0.7395 aspect).
const cvSvg = (inner, cls) => `<svg class="cv-svg ${cls}" viewBox="0 0 100 135.2" preserveAspectRatio="none" aria-hidden="true">${inner}</svg>`;

function coverPlate() {
  const cx = 64.5, a = 20.5, h = 11.8, ys = [60, 70.4, 80.8, 91.2, 101.6, 112], last = ys[ys.length - 1];
  const rh = (y, k = 1, dy = 0) => `${cx},${y + dy - h * k} ${cx + a * k},${y + dy} ${cx},${y + dy + h * k} ${cx - a * k},${y + dy}`;
  let g = '';
  // exploded-view alignment lines, drawn first so the planes cover them
  for (const [x, y] of [[cx - a, ys[0]], [cx + a, ys[0]], [cx, ys[0] + h]]) g += `<line class="dash" x1="${x}" y1="${y}" x2="${x}" y2="${last + (y - ys[0])}"/>`;
  for (let i = ys.length - 1; i >= 0; i--) {
    const y = ys[i];
    g += `<polygon class="pl" points="${rh(y)}"/><polygon class="pi" points="${rh(y, 0.68, -0.4)}"/>`;
    g += `<line class="pi" x1="${cx - a * 0.42}" y1="${y - 0.4}" x2="${cx - a * 0.08}" y2="${y + h * 0.16}"/>`;
  }
  ys.forEach((y, i) => { g += `<line class="lead" x1="${cx + a + 1}" y1="${y}" x2="${89.6}" y2="${y}"/><text class="key" x="${90.8}" y="${y + 1.25}">${'abcdef'[i]}</text>`; });
  g += `<text class="fig" x="15.5" y="127">Fig. 1.</text>`;
  const nums = Array.from({ length: 10 }, (_, k) => `<span style="top:${(2 * (k + 1) * 4.76).toFixed(2)}cqh">${2 * (k + 1)}</span>`).join('');
  return `<div class="cv cv-f"><div class="ruler">${nums}</div><div class="grid"></div>${cvSvg(g, 'pf')}
    <div class="tb"><span class="t">Selected<br>Work</span><span class="r"></span><span class="s">Six systems,<br>drawn to scale.</span></div>
    <div class="tw">PLATE I.<br>Exploded.</div></div>`;
}

function coverLine() {
  // A loose knot of three crossing loops, each a little lower and further
  // right, like a pen working something out; then the line leaves the knot and
  // runs straight under the title. Hand-placed points, Catmull-Rom smoothed,
  // drawn from the knot outward so the motion reads tangle → straight.
  const pts = [
    [44, 68], [50, 52], [64, 45], [76, 54], [72, 69], [57, 72], [50, 62], [58, 51],
    [74, 47], [85, 58], [81, 75], [66, 81], [55, 74], [59, 62], [72, 60],
    [81, 67], [77, 85], [62, 91], [51, 85], [53, 73], [66, 70],
    [79, 78], [87, 94], [85, 106], [77, 111.4], [68, 112],
  ];
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(2)} ${c1[1].toFixed(2)} ${c2[0].toFixed(2)} ${c2[1].toFixed(2)} ${p2[0]} ${p2[1]}`;
  }
  d += ' L 15 112';
  return `<div class="cv cv-h"><span class="tl">Field Notebook</span>${cvSvg(`<path class="ln" pathLength="1" d="${d}"/>`, 'ph')}
    <span class="t">Selected work</span><div class="ft"><span>2020–2026</span></div></div>`;
}

const TILE = (x, y, c, turn) => {
  const h = c / 2;
  return turn
    ? `<path d="M${x + h} ${y} A${h} ${h} 0 0 0 ${x + c} ${y + h} M${x} ${y + h} A${h} ${h} 0 0 1 ${x + h} ${y + c}"/>`
    : `<path d="M${x + h} ${y} A${h} ${h} 0 0 1 ${x} ${y + h} M${x + c} ${y + h} A${h} ${h} 0 0 0 ${x + h} ${y + c}"/>`;
};
function coverModule() {
  let seed = 11;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  const c = 11, x0 = 6.5, y0 = 54;
  let g = '';
  for (let r = 0; y0 + r * c < 136; r++) for (let q = 0; x0 + q * c < 100; q++) g += TILE(x0 + q * c, y0 + r * c, c, rnd() < 0.5);
  const mark = `<svg class="mark" viewBox="-1 -1 13 13" aria-hidden="true"><rect x="0" y="0" width="11" height="11"/>${TILE(0, 0, 11, false)}</svg>`;
  return `<div class="cv cv-j">${mark}<span class="t">Selected Work</span><span class="m">2020–2026</span>
    <span class="tags">AI · Enterprise · Systems · Tools</span>${cvSvg(g, 'pj')}</div>`;
}


// ─── Round 3 · line covers ───
// One frame for all five, so only the line differs. The line is drawn in
// board units (100 × 135.2) and resolves into the baseline at y = 112,
// where the title sits.
function lineCover(inner, cls = '') {
  return `<div class="cv cv-line ${cls}"><span class="tl">Field Notebook</span>${cvSvg(inner, 'pl3')}
    <span class="t">Selected work</span><span class="dt">2020–2026</span></div>`;
}
const ln = (d, delay = 0) => `<path class="ln" pathLength="1" d="${d}"${delay ? ` style="animation-delay:${delay}s"` : ''}/>`;
const f2 = (n) => +n.toFixed(2);

function coverLoop() {
  // drawn from the loop outward, so it ends at the left under the title
  return lineCover(ln('M96 112 C90 112 86 111.2 82 110 C74 107.6 67.6 102 66 94 C64.2 85.6 69.4 79 77 79 C85 79 92 86 92 96 C92 106 82.5 112 72 112 L15 112'), 'ln-k');
}

function coverKnot() {
  const cx = 56, cy = 74, A = 20, B = 13, N = 720, t0 = (5 * Math.PI) / 4;
  const P = [];
  for (let k = 0; k <= N; k++) { const t = t0 + (k / N) * Math.PI * 2; P.push([cx + A * Math.cos(3 * t), cy + B * Math.sin(2 * t)]); }
  const [ex, ey] = P[N];          // bottom-right of the figure, heading right
  let d = `M${P.map(([x, y]) => `${f2(x)} ${f2(y)}`).join(' L')}`;
  d += ` C${f2(ex + 8)} ${f2(ey)} 86 ${f2(ey + 5)} 86 103 C86 108.6 81 112 74 112 L15 112`;
  return lineCover(ln(d), 'ln-l');
}

function coverSettle() {
  // A spring settling: the damped curve motion designers tune, plotted from
  // the left until it lies flat under the title (set right on this cover).
  const pts = [];
  for (let x = 15; x <= 92.001; x += 0.4) {
    const u = (x - 15) / 34;      // the spring lives in the first 34 units
    const yv = u <= 1 ? 112 - 17 * Math.exp(-4.4 * u) * Math.cos(2 * Math.PI * 3.2 * u) * (1 - u * 0.02) : 112;
    pts.push(`${f2(x)} ${f2(yv)}`);
  }
  return lineCover(ln(`M${pts.join(' L')}`), 'ln-m');
}

function coverIterations() {
  // one gentle wave, scaled down by the same curve each step; the last is straight
  const wave = (x) => 0.72 * Math.sin(0.17 * x + 0.4) + 0.28 * Math.sin(0.46 * x + 2.1);
  let g = '';
  for (let i = 0; i < 6; i++) {
    const yb = 30 + i * 16.4, amp = 6 * Math.pow((5 - i) / 5, 1.5);
    const pts = [];
    for (let x = 15; x <= 86.001; x += 0.5) pts.push(`${f2(x)} ${f2(yb - amp * wave(x))}`);
    g += ln(`M${pts.join(' L')}`, 0.5 + i * 0.22);
  }
  return lineCover(g, 'ln-n');
}

function coverRoute() {
  // orthogonal waypoints, one corner radius; each row is 8 units shorter
  const W = [[24, 30], [86, 30], [86, 52], [32, 52], [32, 74], [78, 74], [78, 112], [16, 112]];
  const r = 6;
  let d = `M${W[0][0]} ${W[0][1]}`;
  for (let i = 1; i < W.length - 1; i++) {
    const [px, py] = W[i - 1], [cx, cy] = W[i], [nx, ny] = W[i + 1];
    const ix = Math.sign(cx - px), iy = Math.sign(cy - py), ox = Math.sign(nx - cx), oy = Math.sign(ny - cy);
    d += ` L${cx - ix * r} ${cy - iy * r} Q${cx} ${cy} ${cx + ox * r} ${cy + oy * r}`;
  }
  d += ` L${W[W.length - 1][0]} ${W[W.length - 1][1]}`;
  const stations = [[24, 30], [55, 30], [59, 52], [55, 74], [78, 93], [16, 112]]
    .map(([x, y]) => `<circle class="st" cx="${x}" cy="${y}" r="1.7"/>`).join('');
  return lineCover(ln(d) + stations, 'ln-o');
}

function archiveFrontHTML(v = 'a') {
  const nn = (i) => String(i + 1).padStart(2, '0');
  const photo = `<img class="ar-photo" src="${ARCHIVE.cover}" alt="" draggable="false">`;
  const body = {
    a: `<div class="cv cv-a"><div class="panel"><span class="t">Selected Work</span><span class="r"></span><span class="m">Six projects · 2020–2026</span></div></div>`,
    b: `<div class="cv cv-b"><div class="hd"><span>Selected work</span><span>2020–2026</span></div>
          <ol>${PROJECTS.map((p, i) => `<li><span class="n">${nn(i)}</span><span class="t">${p.title}</span></li>`).join('')}</ol></div>`,
    c: `<div class="cv cv-c"><div class="hd"><span class="t">Selected work</span><span class="m">2020–2026</span></div>
          <ul class="tags"><li>AI products</li><li>Enterprise</li><li>Design systems</li></ul><span class="big">06</span></div>`,
    d: `<div class="cv cv-d"><span class="fr"></span><span class="fr in"></span>
          <div class="mid"><span class="t">Selected Work</span><span class="orn"></span><span class="m">2020 – 2026</span></div></div>`,
    e: `<div class="cv cv-e"><div class="cols">${'<span></span>'.repeat(6)}</div>
          <div class="nums">${Array.from({ length: 6 }, (_, i) => `<span>${nn(i)}</span>`).join('')}</div>
          <span class="base"></span><span class="t">Work</span><span class="m">Selected · 2020–2026</span></div>`,
  };
  const drawn = {
    f: coverPlate,
    g: () => `<div class="cv cv-g"><span class="mk">F.N</span>
      <ol class="sec"><li>I. AI products</li><li>II. Enterprise</li><li>III. Systems</li><li>IV. Tools</li></ol>
      <p class="big">Selected<br>work<br><i>&amp; ways</i></p>
      <div class="ft"><span>Field Notebook</span><span>2020–2026</span></div></div>`,
    h: coverLine,
    i: () => `<div class="cv cv-i"><span class="w">Field</span><span class="c tl">Notebook</span>
      <span class="c ml">Selected work</span><span class="c bl">2020–2026</span></div>`,
    j: coverModule,
    k: coverLoop,
    l: coverKnot,
    m: coverSettle,
    n: coverIterations,
    o: coverRoute,
  };
  if (drawn[v]) return photo + drawn[v]();
  return photo + (body[v] || body.a);
}

/* ─── Motion helpers ─── */
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const lerp = (a, b, t) => a + (b - a) * t;
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

function bezier(x1, y1, x2, y2) {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  const sx = (t) => ((ax * t + bx) * t + cx) * t;
  const sy = (t) => ((ay * t + by) * t + cy) * t;
  const dx = (t) => (3 * ax * t + 2 * bx) * t + cx;
  return (x) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 8; i++) {
      const e = sx(t) - x;
      if (Math.abs(e) < 1e-5) return sy(t);
      const d = dx(t);
      if (Math.abs(d) < 1e-6) break;
      t -= e / d;
    }
    let lo = 0, hi = 1; t = x;
    for (let i = 0; i < 24; i++) { if (sx(t) < x) lo = t; else hi = t; t = (lo + hi) / 2; }
    return sy(t);
  };
}

const ease = {
  push: bezier(0.5, 0, 0.1, 1),       // live: notebook-push
  swing: bezier(0.45, 0, 0.4, 1),     // live: notebook-swing
  closeSwing: bezier(0.45, 0, 0.65, 1),
  out: bezier(0.16, 1, 0.3, 1),
  paper: bezier(0.4, 0, 0.2, 1),
  unfold: bezier(0.34, 1.2, 0.64, 1), // tokens: cover unfold
  linear: (x) => x,
};

function tween({ duration, delay = 0, ease: e = ease.linear, onUpdate }) {
  return new Promise((resolve) => {
    const start = performance.now() + delay;
    const frame = (now) => {
      const k = clamp((now - start) / duration);
      onUpdate(e(k), k);
      if (k < 1) requestAnimationFrame(frame); else resolve();
    };
    requestAnimationFrame(frame);
  });
}

// A value that chases a target with a damped spring. Retargeting keeps velocity.
class Spring {
  constructor(value, { stiffness = 180, damping = 24, onUpdate } = {}) {
    Object.assign(this, { x: value, v: 0, to: value, stiffness, damping, onUpdate, running: false });
    this.tick = this.tick.bind(this);
  }
  set(to, velocity) {
    this.to = to;
    if (velocity !== undefined) this.v = velocity;
    if (!this.running) { this.running = true; this.last = performance.now(); requestAnimationFrame(this.tick); }
    return new Promise((r) => { this.done = r; });
  }
  jump(x) { this.x = this.to = x; this.v = 0; this.onUpdate?.(x); }
  tick(now) {
    const dt = Math.min(0.032, (now - this.last) / 1000);
    this.last = now;
    const f = -this.stiffness * (this.x - this.to) - this.damping * this.v;
    this.v += f * dt;
    this.x += this.v * dt;
    if (Math.abs(this.v) < 0.002 && Math.abs(this.x - this.to) < 0.0008) {
      this.x = this.to; this.v = 0; this.running = false; this.onUpdate?.(this.x); this.done?.();
      return;
    }
    this.onUpdate?.(this.x);
    requestAnimationFrame(this.tick);
  }
}

/* ─── The book ─── */
class Book extends EventTarget {
  /**
   * cover: 'photo'   — plate/notebook.webp (paper label + elastic band)
   *        'archive' — the generated Archive set (assets/): board photo with
   *                    the title stamped live on top, a ribbon tail, and the
   *                    v2 spread whose left half is the lining paper. Sized to
   *                    the spread's right-hand board (1604 × 2170 px), so it
   *                    never stretches as it opens.
   */
  constructor({ slot, restRotate = 0, label = 'Open the notebook', cover = 'photo', coverVariant = 'a' } = {}) {
    super();
    this.slot = slot;
    this.restRotate = restRotate;
    this.coverKind = cover;
    this.coverVariant = coverVariant;
    // Front face box, as fractions of the cover half (x, y from its top-left).
    this.face = cover === 'archive'
      ? { x: 0, y: 0.0315, w: 0.992, h: 0.9625 }
      : { x: -0.082, y: -0.0123, w: 1.142, h: 1.0475 };
    // Slots size themselves from this. The photo keeps its own aspect and is
    // squared up anisotropically; the archive board is exactly the page's.
    const aspect = cover === 'archive' ? (this.face.w * SPREAD_ASPECT) / 2 / this.face.h : COVER_ASPECT;
    document.documentElement.style.setProperty('--nb-aspect', aspect.toFixed(4));
    this.t = 0;
    this.p = 0;
    this.state = 'closed';
    this.active = -1;
    this.kbd = false;
    // Smoothed, page-controlled extras (lerped every frame)
    this.target = { tiltX: 0, tiltY: 0, lift: 0, rz: 0, lx: 0, ly: 16, blur: 22, shadow: 0.55 };
    this.cur = { ...this.target };
    if (reduced()) document.documentElement.classList.add('rm');

    this.build();
    this.measure();
    this.setCover(0);
    this.render();

    addEventListener('resize', () => { this.measure(); this.render(); });
    addEventListener('keydown', (e) => {
      this.kbd = true;
      if (e.key === 'Escape' && this.state === 'open') this.close();
    });
    addEventListener('pointerdown', () => { this.kbd = false; });
    this.loop = this.loop.bind(this);
    requestAnimationFrame(this.loop);
    if (slot && !slot.getAttribute('aria-label')) slot.setAttribute('aria-label', label);
    window.__book = this; // for inspection in devtools
  }

  build() {
    const layer = document.createElement('div');
    layer.className = 'book-layer';
    const nn = (i) => String(i + 1).padStart(2, '0');
    const archive = this.coverKind === 'archive';
    const spread = archive ? ARCHIVE.spread : `${ASSET}/canvas/open-notebook.webp`;
    this.spreadSrc = spread;
    const front = archive
      ? `<div class="bk-front">
           <div class="ar-board">${archiveFrontHTML(this.coverVariant)}</div>
           <div class="bk-fshade"></div>
         </div>`
      : `<div class="bk-front"><img src="${ASSET}/plate/notebook.webp" alt="" draggable="false"><div class="bk-fshade"></div></div>`;
    layer.innerHTML = `
      <div class="bk-backdrop"></div>
      <div class="bk${archive ? ' archive' : ''}">
        <div class="bk-shadow l"></div>
        <div class="bk-shadow r"></div>
        ${archive ? `<img class="bk-ribbon" src="${ARCHIVE.ribbon}" alt="" draggable="false">` : ''}
        <button class="bk-tab" type="button" aria-label="Close the notebook" tabindex="-1"><span>Close</span><i aria-hidden="true">×</i></button>
        <div class="bk-pages">
          <img src="${spread}" alt="" draggable="false">
          <div class="bk-inside" tabindex="-1" role="dialog" aria-label="Field notebook: contents">
            <div class="bk-page l">
              <div class="toc-kicker reveal">Field notebook · Vol. V</div>
              <h2 class="toc-title reveal">Contents</h2>
              <ol class="toc">
                ${PROJECTS.map((p, i) => `<li class="reveal" style="transition-delay:${120 + i * 45}ms"><a href="https://yankun.design/works/${p.slug}" target="_blank" rel="noopener" data-i="${i}"><span class="n">${nn(i)}</span><span class="t">${p.title}</span><span class="y">${p.year}</span><span class="go" aria-hidden="true">Read →</span></a></li>`).join('')}
              </ol>
              <div class="toc-foot reveal" style="transition-delay:420ms"><span>Yankun Wang</span><span>2020–2026</span></div>
            </div>
            <div class="bk-page r">
              <div class="plate-kicker reveal" data-kicker>Plates · 01–06</div>
              <div class="sheet-wrap reveal" style="transition-delay:160ms">
                <div class="sheet">
                  ${PROJECTS.map((p, i) => `<a class="thumb" href="https://yankun.design/works/${p.slug}" target="_blank" rel="noopener" tabindex="-1" data-i="${i}"><span class="thumb-f"><img src="${ASSET}${p.img}" alt=""></span><span class="thumb-c"><b>${nn(i)}</b>${p.title}</span></a>`).join('')}
                </div>
              </div>
              <div class="solo-wrap reveal">
                <div class="plate solo">
                  <div class="plate-frame"><img data-plate alt=""></div>
                  <div class="plate-cap"><span data-cap-title></span><span data-cap-year></span></div>
                  <p class="plate-sub" data-cap-sub></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bk-cast"></div>
        <div class="bk-cover" aria-hidden="true">
          ${front}
          <div class="bk-back"><div class="bk-bshade"></div></div>
          <div class="bk-edge"></div>
        </div>
      </div>
      <div class="bk-cursor mono" aria-hidden="true">Close ×</div>`;
    document.body.appendChild(layer);
    this.layer = layer;
    const q = (s) => layer.querySelector(s);
    this.el = q('.bk');
    this.pages = q('.bk-pages');
    this.cover = q('.bk-cover');
    this.fshade = q('.bk-fshade');
    this.bshade = q('.bk-bshade');
    this.cast = q('.bk-cast');
    this.edge = q('.bk-edge');
    this.ribbon = q('.bk-ribbon');
    this.inside = q('.bk-inside');
    this.plateImg = q('[data-plate]');
    const url = (u) => `url("${new URL(u, location.href).href}")`;
    // The back of the cover is the spread's left half: the old spread's blank
    // page, or (archive) the new lining paper, which is an exact crop of it.
    q('.bk-back').style.backgroundImage = url(this.spreadSrc);
    // Shade the turning cover. The archive board is a rounded rectangle, so a
    // matching border-radius does it (base.css). The photo cover needs an image
    // mask, which browsers refuse from file://, so there it simply goes unshaded.
    if (this.coverKind !== 'archive') {
      if (location.protocol === 'file:') this.el.classList.add('no-mask');
      else this.fshade.style.webkitMaskImage = this.fshade.style.maskImage = url(`${ASSET}/plate/notebook.webp`);
    }

    /* Closing lives on the book: a tab at the fore-edge, and the paper
     * around the book (the cursor says so when it's there). Esc too. */
    this.tab = q('.bk-tab');
    this.tab.addEventListener('click', () => this.close());
    const backdrop = q('.bk-backdrop'), cursor = q('.bk-cursor');
    backdrop.addEventListener('click', () => this.close());
    backdrop.addEventListener('pointermove', (e) => {
      cursor.style.transform = `translate(${e.clientX + 14}px, ${e.clientY + 14}px)`;
      cursor.classList.add('on');
    });
    backdrop.addEventListener('pointerleave', () => cursor.classList.remove('on'));
    this.backdrop = backdrop;
    this.cursorLabel = cursor;

    /* Nothing is selected until the reader points at something. */
    const rows = [...layer.querySelectorAll('.toc a')];
    rows.forEach((a) => {
      a.addEventListener('pointerenter', () => { clearTimeout(this.leaveT); this.setActive(+a.dataset.i); });
      a.addEventListener('focus', () => this.setActive(+a.dataset.i));
    });
    q('.toc').addEventListener('pointerleave', () => { this.leaveT = setTimeout(() => this.clearActive(), 180); });
    layer.querySelectorAll('.thumb').forEach((t) => {
      const row = rows[+t.dataset.i];
      t.addEventListener('pointerenter', () => row.classList.add('is-hint'));
      t.addEventListener('pointerleave', () => row.classList.remove('is-hint'));
    });
    this.rows = rows;
    // Warm the decoder so the first frame of the swing never stalls.
    [this.spreadSrc, archive ? ARCHIVE.cover : `${ASSET}/plate/notebook.webp`, ...PROJECTS.map((p) => ASSET + p.img)]
      .forEach((src) => { const i = new Image(); i.src = src; i.decode?.().catch(() => {}); });
  }

  // Swap the Archive cover's typography without rebuilding the book.
  setCoverVariant(v) {
    const board = this.el.querySelector('.ar-board');
    if (!board || v === this.coverVariant) return;
    this.coverVariant = v;
    board.innerHTML = archiveFrontHTML(v);
  }

  // Point at a title: the right page turns from the six-plate sheet to that one plate.
  setActive(i, instant = false) {
    clearTimeout(this.leaveT);
    const wasSolo = this.inside.classList.contains('is-solo');
    if (i === this.active && wasSolo && !instant) return;
    this.active = i;
    const p = PROJECTS[i];
    const swap = () => {
      this.plateImg.src = ASSET + p.img;
      this.layer.querySelector('[data-cap-title]').textContent = `fig. ${String(i + 1).padStart(2, '0')} · ${p.title}`;
      this.layer.querySelector('[data-cap-year]').textContent = p.year;
      this.layer.querySelector('[data-cap-sub]').textContent = p.sub;
      this.layer.querySelector('[data-kicker]').textContent = `Fig. ${String(i + 1).padStart(2, '0')} — Selected work`;
      this.plateImg.style.opacity = 1;
    };
    this.rows.forEach((a) => a.classList.toggle('is-active', +a.dataset.i === i));
    this.inside.classList.add('is-solo');
    clearTimeout(this.swapT);
    if (instant || !wasSolo) return swap();
    this.plateImg.style.opacity = 0;
    this.swapT = setTimeout(swap, 140);
  }

  // Back to the overview: no row reads as chosen.
  clearActive() {
    clearTimeout(this.leaveT);
    this.active = -1;
    this.rows.forEach((a) => a.classList.remove('is-active'));
    this.inside.classList.remove('is-solo');
    this.layer.querySelector('[data-kicker]').textContent = 'Plates · 01–06';
  }

  // Spread size and the two poses (book-local px → viewport px).
  measure() {
    const vw = innerWidth, vh = innerHeight;
    const H = Math.min(vh * 0.84, (vw * 0.9) / SPREAD_ASPECT);
    const W = H * SPREAD_ASPECT;
    this.W = W; this.H = H;
    this.el.style.width = `${W}px`;
    this.el.style.height = `${H}px`;
    this.openPose = { tx: (vw - W) / 2, ty: (vh - H) / 2 + 8, sx: 1, sy: 1 };
    if (this.slot) {
      // offset* ignores transforms on ancestors we don't use; rect is fine for untransformed slots
      const r = this.slot.getBoundingClientRect();
      const f = this.face;
      const cw = (f.w * W) / 2, ch = f.h * H, cx0 = W / 2 + (f.x * W) / 2, cy0 = f.y * H;
      const sx = r.width / cw, sy = r.height / ch;
      this.closedPose = { tx: r.left - cx0 * sx, ty: r.top - cy0 * sy, sx, sy };
    } else {
      this.closedPose = { ...this.openPose };
    }
  }

  render() {
    const c = this.closedPose, o = this.openPose, t = this.t, k = 1 - t, u = this.cur;
    const tx = lerp(c.tx, o.tx, t), ty = lerp(c.ty, o.ty, t);
    const sx = lerp(c.sx, o.sx, t), sy = lerp(c.sy, o.sy, t), sz = (sx + sy) / 2;
    const px = lerp(0.745, 0.5, t) * this.W, py = 0.5 * this.H;
    const rz = (this.restRotate + u.rz) * k;
    const s = 1 + u.lift * k;
    this.el.style.transform =
      `translate3d(${tx}px, ${ty}px, 0) scale3d(${sx}, ${sy}, ${sz}) translate(${px}px, ${py}px) ` +
      `rotateZ(${rz}deg) rotateX(${u.tiltX * k}deg) rotateY(${u.tiltY * k}deg) scale(${s}) translate(${-px}px, ${-py}px)`;
    const st = this.el.style;
    st.setProperty('--lx', `${u.lx * k}px`);
    st.setProperty('--ly', `${lerp(u.ly, 18, t)}px`);
    st.setProperty('--shadow-blur', `${lerp(u.blur, 30, t)}px`);
    st.setProperty('--shadow-o', `${lerp(u.shadow, 0.5, t)}`);
    // the ribbon hangs from the spine and swings against the tilt
    st.setProperty('--rib', `${3 - u.tiltY * 1.3 + u.rz * 0.5}deg`);
  }

  // Smooth page-driven extras toward their targets.
  loop() {
    let moving = false;
    for (const key in this.target) {
      const d = this.target[key] - this.cur[key];
      if (Math.abs(d) > 0.001) { this.cur[key] += d * 0.12; moving = true; } else this.cur[key] = this.target[key];
    }
    if (moving) this.render();
    requestAnimationFrame(this.loop);
  }

  setCover(p) {
    this.p = p;
    const a = 180 * p, r = (a * Math.PI) / 180;
    const s = Math.max(0, Math.sin(r)), c = Math.cos(r);
    this.cover.style.transform = `rotateY(${-a}deg)`;
    // Thickness only reads once the board has lifted; edge-on it is a stray hairline.
    this.edge.style.opacity = Math.min(1, s * 5);
    // The ribbon tail belongs to the closed book; the spread has its own.
    if (this.ribbon) this.ribbon.style.opacity = clamp(1 - p * 6);
    this.fshade.style.opacity = a <= 90 ? 0.45 * s : 0;
    this.bshade.style.opacity = a >= 90 ? 0.32 * s : 0;
    this.cast.style.opacity = 0.34 * s;
    this.cast.style.transform = `scaleX(${clamp(c + 0.35 * s)})`;
    this.el.style.setProperty('--left-shadow', Math.max(0, -c));
    this.pages.style.opacity = p > 0.0005 || this.state !== 'closed' ? 1 : 0;
  }

  setCamera(t) { this.t = t; this.render(); }

  emit(name, detail) { this.dispatchEvent(new CustomEvent(name, { detail })); }

  land() {
    this.pages.style.clipPath = 'inset(0 0 0 0)';
    this.cover.style.visibility = 'hidden';
    this.el.classList.add('is-open');
    requestAnimationFrame(() => this.el.classList.add('show-inside'));
    this.layer.classList.add('is-open');
    this.tab.tabIndex = 0;
    this.state = 'open';
    this.emit('open');
    // Keyboard readers land on the first title; pointer readers land on the
    // contents without anything looking chosen.
    setTimeout(() => {
      if (this.kbd) this.rows[0]?.focus({ preventScroll: true });
      else this.inside.focus({ preventScroll: true });
    }, 500);
  }

  /**
   * Open the book. Pages may pass their own choreography:
   *   camera(k) → t, cover(k) → p, for k in 0..1 over `duration`.
   */
  async open({ duration = 1500, camera, cover, from } = {}) {
    if (this.state !== 'closed') return;
    this.state = 'opening';
    document.documentElement.classList.add('nb-open');
    this.slot?.setAttribute('aria-expanded', 'true');
    this.emit('open-start');
    this.pages.style.opacity = 1;
    this.pages.style.clipPath = 'inset(0 0 0 50%)';
    this.el.classList.remove('peek-inside');

    if (reduced()) {
      await tween({ duration: 180, onUpdate: (e) => { this.layer.style.opacity = 1 - e; } });
      this.t = 1; this.setCover(1); this.render(); this.land();
      this.emit('progress', { k: 1, t: 1, p: 1 });
      await tween({ duration: 240, onUpdate: (e) => { this.layer.style.opacity = e; } });
      return;
    }
    const t0 = from?.t ?? this.t, p0 = from?.p ?? this.p;
    const cam = camera || ((k) => ease.push(k));
    const cov = cover || ((k) => ease.swing(clamp((k - 0.1) / 0.75)));
    await tween({
      duration,
      onUpdate: (_, k) => {
        this.t = lerp(t0, 1, cam(k));
        this.setCover(lerp(p0, 1, cov(k)));
        this.render();
        this.emit('progress', { k, t: this.t, p: this.p });
      },
    });
    this.land();
  }

  async close({ duration = 1300 } = {}) {
    if (this.state !== 'open') return;
    this.state = 'closing';
    this.emit('close-start');
    this.el.classList.remove('show-inside');
    this.layer.classList.remove('is-open');
    this.cursorLabel.classList.remove('on');
    this.tab.tabIndex = -1;
    await wait(reduced() ? 0 : 200);
    this.clearActive();
    this.el.classList.remove('is-open');
    this.cover.style.visibility = 'visible';
    this.pages.style.clipPath = 'inset(0 0 0 50%)';

    if (reduced()) {
      await tween({ duration: 180, onUpdate: (e) => { this.layer.style.opacity = 1 - e; } });
      this.t = 0; this.setCover(0); this.render();
    } else {
      await tween({
        duration,
        onUpdate: (_, k) => {
          this.setCover(1 - ease.closeSwing(clamp(k / 0.78)));
          this.t = 1 - ease.paper(clamp((k - 0.08) / 0.92));
          this.render();
          this.emit('progress', { k: 1 - k, t: this.t, p: this.p });
        },
      });
    }
    this.state = 'closed';
    this.setCover(0);
    document.documentElement.classList.remove('nb-open');
    this.slot?.setAttribute('aria-expanded', 'false');
    this.emit('close');
    if (reduced()) await tween({ duration: 240, onUpdate: (e) => { this.layer.style.opacity = e; } });
    this.slot?.focus({ preventScroll: true });
  }

  // Lift the cover part-way and show the right page (used by hover peeks).
  peek(p, { stiffness = 140, damping = 18 } = {}) {
    if (this.state !== 'closed') return;
    if (!this.peekSpring) {
      this.peekSpring = new Spring(this.p, {
        stiffness, damping,
        onUpdate: (x) => {
          if (this.state !== 'closed') return;
          this.setCover(Math.max(0, x));
          this.pages.style.opacity = x > 0.002 ? 1 : 0;
        },
      });
    }
    // Start from wherever the cover really is (a drag may have moved it).
    if (!this.peekSpring.running) { this.peekSpring.x = this.p; this.peekSpring.v = 0; }
    this.el.classList.toggle('peek-inside', p > 0);
    return this.peekSpring.set(p);
  }

  stopPeek() { if (this.peekSpring) { this.peekSpring.to = this.peekSpring.x = this.p; this.peekSpring.v = 0; } }
}

window.NB = { ASSET, SPREAD_ASPECT, ARCHIVE, COVER_ASPECT, PROJECTS, COVER_VARIANTS, archiveFrontHTML, clamp, lerp, reduced, wait, bezier, ease, tween, Spring, Book };
})();
