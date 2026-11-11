// [classic] Loaded with a plain <script>, not as a module, so the prototypes
// also work when opened straight from disk (file://), where browsers block modules.
(() => {
// Prototype chrome: switch between the directions and read each one's
// references and moves. Not part of any design.

const DIRECTIONS = [
  { id: '01', file: '01-monograph.html', name: 'Monograph' },
  { id: '1.1', file: '01-1-monograph-grid.html', name: 'Monograph · grid' },
  { id: '02', file: '02-index.html', name: 'Index' },
  { id: '03', file: '03-drawing.html', name: 'Drawing' },
  { id: '04', file: '04-peel.html', name: 'Peel' },
  { id: '05', file: '05-sentence.html', name: 'Sentence' },
];

// Accepts the old numeric form (n: 1–5) or an id string ('1.1').
function protoChrome({ n, id, job, refs, look, changed }) {
  const key = id ?? String(n).padStart(2, '0');
  const me = DIRECTIONS.find((d) => d.id === key) ?? DIRECTIONS[0];
  const bar = document.createElement('nav');
  bar.className = 'proto-bar';
  bar.setAttribute('aria-label', 'Prototype navigation');
  bar.innerHTML = `
    <a href="index.html" title="All">All</a>
    <span class="sep"></span>
    ${DIRECTIONS.map((d) => `<a href="${d.file}" ${d === me ? 'aria-current="page"' : ''} title="${d.name}">${d.id}</a>`).join('')}
    <span class="sep"></span>
    <span class="pname">${me.name}</span>
    <button type="button" data-notes title="N">Notes</button>`;
  document.body.appendChild(bar);

  const notes = document.createElement('aside');
  notes.className = 'proto-notes';
  notes.setAttribute('aria-label', 'Prototype notes');
  notes.innerHTML = `
    <h2>${me.id} · ${me.name}</h2>
    <p class="job">${job}</p>
    <h3>References → one move each</h3>
    <ul>${refs.map((r) => `<li><b>${r[0]}</b> — ${r[1]}</li>`).join('')}</ul>
    <h3>Try</h3>
    <ul>${look.map((l) => `<li>${l}</li>`).join('')}</ul>
    ${changed ? `<h3>CV and about</h3><p>${changed}</p>` : ''}`;
  document.body.appendChild(notes);

  const root = document.documentElement;
  if (new URLSearchParams(location.search).get('notes')) root.classList.add('show-notes');
  const toggle = () => root.classList.toggle('show-notes');
  bar.querySelector('[data-notes]').addEventListener('click', toggle);
  const byKey = { 1: '01', 2: '02', 3: '03', 4: '04', 5: '05', g: '1.1', G: '1.1' };
  addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey || e.target.closest?.('input, textarea')) return;
    const go = DIRECTIONS.find((d) => d.id === byKey[e.key]);
    if (go) location.href = go.file;
    if (e.key === 'n' || e.key === 'N') toggle();
  });
  // Hide the chrome inside the comparison page's iframes.
  if (new URLSearchParams(location.search).get('embed')) { bar.remove(); notes.remove(); }
}

window.NBProto = { DIRECTIONS, protoChrome };
})();
