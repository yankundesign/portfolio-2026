// Vector rebuilds of the CHAI panel screens in 02-assets/chai-preview-motion/,
// drawn in each PNG's own pixel space so they overlay 1:1. Every position,
// colour, size and string is measured from the PNG — nothing is redesigned.
// Multi-word lines are anchored word by word at the ink positions measured in
// the PNG, so spacing differences between Inter builds don't accumulate.
// Usage: element.innerHTML = chaiP2Answer(assetBase) / chaiP3Report()

const INK = 'rgba(0,0,0,.95)';
const INK2 = 'rgba(0,0,0,.7)';
const _measure = document.createElement('canvas').getContext('2d');

const txt = (x, y, s, w, fill, t) =>
  `<text x="${x}" y="${y}" font-size="${s}" font-weight="${w}" fill="${fill}">${t}</text>`;

// One line of text. segs holds each word's measured ink span [left, right] in
// the PNG: the word starts there, and its letter spacing is fitted to the
// measured width (glyph shapes untouched).
function line(y, s, w, fill, text, segs) {
  _measure.font = `${w} ${s}px Inter`;
  const words = text.split(' ');
  if (words.length !== segs.length) throw new Error(`word count mismatch: ${text}`);
  const spans = words.map((word, i) => {
    const [a, b] = segs[i];
    const m = _measure.measureText(word);
    const ink = m.actualBoundingBoxLeft + m.actualBoundingBoxRight;
    // Fit only where the gap is spacing-sized (≤ 0.4px per letter gap) on
    // words of 4+ letters; a bigger gap is a glyph-width difference, and
    // spreading letters to cover it would open visible holes (e.g. "A I").
    const delta = Math.max(-0.4, Math.min(0.4, (b - a + 1 - ink) / (word.length - 1))) * (word.length - 1);
    const fit = word.length >= 4 && Math.abs(delta) > 0.5
      ? ` textLength="${(m.width + delta).toFixed(2)}" lengthAdjust="spacing"` : '';
    return `<tspan x="${(a + m.actualBoundingBoxLeft).toFixed(2)}"${fit}>${word}</tspan>`;
  });
  return `<text y="${y}" font-size="${s}" font-weight="${w}" fill="${fill}">${spans.join(' ')}</text>`;
}
const segs = str => str.trim().split(/\s+/).map(p => p.split('-').map(Number));

// p2.png (578×1264): the docked Cisco AI Assistant panel from its header down
// through the answer card (y 0–1030). The avatar is the photo from p2.png
// itself; the logo is p1.png's large mark scaled down.
function chaiP2Answer(base) {
  const S = 0.238; // p1.png logo (115px) → p2 logo (28px)
  const bars = [[190, 39.37, 609.13], [270, 39.37, 652.4], [350, 39.25, 637.88], [429.88, 39.37, 647.13]];
  const light = [525.14, 563.86, 602.49, 641.14, 679.86]; // tops, 1.3px tall
  const dark = [718.5, 757.12, 795.87];
  const yLabels = [['3000', 112.01, 542.43], ['125k', 116.75, 589.43], ['2000', 112.14, 637.43],
    ['75k', 123.89, 685.28], ['1000', 115.28, 732.43], ['25k', 123.06, 780.43], ['0', 141.15, 827.43]];
  const weeks = [['Week 1', 188.61, 868.24], ['Week 2', 252.61, 868.39], ['Week 3', 320.61, 868.39], ['Week 4', 388.61, 868.24]];
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="578" height="1264" viewBox="0 0 578 1264" font-family="Inter">
  <defs>
    <linearGradient id="p2rule" gradientUnits="userSpaceOnUse" x1="22.3" y1="1020.5" x2="34.5" y2="1020.38">
      <stop offset="0" stop-color="#2d86ea"/><stop offset="1" stop-color="#00c9ec"/>
    </linearGradient>
    <clipPath id="p2logo"><circle cx="64.5" cy="361" r="16"/></clipPath>
    <clipPath id="p2avatar"><circle cx="64" cy="168" r="13.5"/></clipPath>
  </defs>
  <path d="M0 24A24 24 0 0 1 24 0H578V1264H0Z" fill="#fff"/>
  <path d="M0.5 1264V24A23.5 23.5 0 0 1 24 0.5H578" fill="none" stroke="rgba(0,0,0,.18)"/>
  <rect x="1" y="24" width="1" height="1240" fill="#efefef"/>
  <g fill="${INK}">
    <rect x="20.3" y="23.9" width="14.3" height="1.24" rx=".6"/><rect x="20.3" y="29.1" width="14.3" height="1.24" rx=".6"/>
    <rect x="20.3" y="34.4" width="14.3" height="1.24" rx=".6"/>
  </g>
  ${line(37.28, 21.36, 600, INK, 'Cisco AI Assistant', segs('55-110 118-136 144-240'))}
  <g fill="none" stroke="${INK}" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round">
    <path d="M474.8 27.05A7.45 7.45 0 0 1 466.51 36.94L459.6 37.25L462.09 34.39A7.45 7.45 0 0 1 470.1 22.5"/>
    <path d="M471.3 23.6H476.5M473.9 21V26.2" stroke-linecap="butt"/>
    <path stroke-width="1.6" d="M502.4 22.4H505.2M502.4 22.4V25.2M502.4 22.4L505.8 25.8M517.1 22.4H514.3M517.1 22.4V25.2M517.1 22.4L513.7 25.8M502.4 37.1H505.2M502.4 37.1V34.3M502.4 37.1L505.8 33.7M517.1 37.1H514.3M517.1 37.1V34.3M517.1 37.1L513.7 33.7"/>
    <path d="M545.6 23.6L556.9 34.9M556.9 23.6L545.6 34.9"/>
  </g>
  <rect x="22.4" y="102.49" width="208.8" height="1.26" fill="#ccc"/>
  <rect x="347.6" y="102.49" width="209.4" height="1.26" fill="#ccc"/>
  ${txt(263.13, 110.18, 18.12, 400, INK2, 'Today')}
  <image href="${base}p2.png" x="0" y="0" width="578" height="1264" clip-path="url(#p2avatar)"/>
  ${txt(90.46, 176.5, 21.3, 400, INK, 'You')}
  <rect x="49.1" y="195.6" width="481.05" height="24.8" rx="4.5" fill="#e5f8ff" stroke="#0a78cc" stroke-width="1.3"/>
  <rect x="61.6" y="200.7" width="12.3" height="14.2" rx="2.5" fill="none" stroke="#0353a8" stroke-width="1.15"/>
  <g fill="#0353a8">
    <rect x="65" y="206.5" width="1.25" height="3.5"/><rect x="66.85" y="208" width="1.2" height="2"/>
    <rect x="69.5" y="205" width="1.3" height="5"/><rect x="65" y="211" width="6.5" height="1.15"/>
  </g>
  ${line(213.1, 15.7, 400, '#0353a8', 'Device Power Consumption Report | 08/18/2025 - 08/24...',
      segs('85-133 140-184 191-286 294-341 349-350 358-441 449-453 460-515'))}
  ${line(252.83, 18.4, 400, INK, 'What are the occupancy trends in my workspaces in',
      segs('49-92 100-125 132-158 166-258 266-319 327-339 348-370 378-479 488-499'))}
  ${line(280.57, 18.4, 400, INK, 'the past week?', segs('49-75 83-118 126-178'))}
  <path d="M28 323.5H554a3 3 0 0 1 3 3V1017.5a3 3 0 0 1-3 3H28Z" fill="#f7f7f7"/>
  <rect x="22.3" y="323.5" width="5.2" height="697" fill="url(#p2rule)"/>
  <image href="${base}p1.png" x="${(64.5 - 292 * S).toFixed(2)}" y="${(361 - 524.5 * S).toFixed(2)}"
         width="${(576 * S).toFixed(2)}" height="${(1264 * S).toFixed(2)}" clip-path="url(#p2logo)"
         style="mix-blend-mode:multiply"/>
  ${line(370.39, 22.1, 400, INK, 'AI Assistant', segs('91-111 121-212'))}
  ${txt(471.25, 359.85, 16.07, 400, INK, '11:05 am')}
  ${line(409.83, 18.4, 400, INK, 'Top 5 devices with the highest power consumption are',
      segs('49-79 88-95 103-167 175-209 217-243 251-313 321-372 379-488 497-521'))}
  ${line(437.83, 18.4, 400, INK, 'highlighted in the bar chart below. These devices are',
      segs('50-143 151-163 171-197 206-231 239-282 290-342 350-401 409-473 481-506'))}
  ${line(464.83, 18.4, 400, INK, 'the most energy-intensive among all those listed.',
      segs('49-75 83-123 131-274 282-338 347-363 371-417 425-474'))}
  <rect x="53.6" y="497.5" width="477.4" height="457.5" rx="8" fill="#ededed"/>
  <rect x="64.7" y="508" width="455.8" height="388" rx="8" fill="#fff"/>
  ${light.map(y => `<rect x="168" y="${y}" width="279.5" height="1.32" fill="#ccc"/>`).join('')}
  ${dark.map(y => `<rect x="168" y="${y}" width="279.5" height="1.32" fill="#8a8a8a"/>`).join('')}
  <rect x="167.75" y="525" width="1.38" height="310.4" fill="#8a8a8a"/>
  ${bars.map(([x, w, t]) => `<rect x="${x}" y="${t}" width="${w}" height="${(834.5 - t).toFixed(2)}" fill="#00a3b5"/>`).join('')}
  <rect x="168" y="834.5" width="279.5" height="1.25" fill="${INK2}"/>
  ${yLabels.map(([t, x, y]) => txt(x, y, 15.5, 400, INK2, t)).join('')}
  ${weeks.map(([t, x, y]) => txt(x, y, 15.45, 400, INK2, t)).join('')}
  <rect x="145.5" y="917.3" width="15.8" height="14.8" rx="1" fill="#00a3b5"/>
  ${line(929.76, 15.65, 400, INK, 'Meetings used VoIP audio', segs('173-239 246-279 286-317 324-363'))}
  <path d="M69.1 972.6V984.3M64.9 980.1L69.1 984.3L73.3 980.1M61.6 988.9H76.9" fill="none"
        stroke="${INK2}" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
}

// p3.png (2248×1264): the End-of-Life report pane — header, title, Key Insights,
// and the "Affected assets by product family" chart. The timeline and locations
// cards to the right are not drawn; the cover never shows them.
function chaiP3Report() {
  const T1 = '#23282e', T2 = '#373c42', T3 = '#5d646d';
  const title = 'End-of-Life analysis with product refresh recommendations';
  const tops = [735, 699, 812.25, 735, 772.5];
  const labels = [['Switch', 863.21, 869.52], ['Rack server', 924.77, 869.19], ['Firewall', 1017.77, 869.52],
    ['Product', 1095.77, 869.19], ['Product', 1187.77, 869.19]];
  const dashed = [655.5, 702.8, 749.8, 796.5];
  const bullets = [
    [443.23, '12 assets will reach Last Day of Support within the next 90 days.',
      segs('831-847 856-910 918-944 953-999 1008-1042 1051-1081 1090-1105 1113-1181 1189-1239 1248-1274 1282-1318 1326-1346 1354-1398')],
    [469.18, 'Firewall and rack server product families represent the highest refresh risk.',
      segs('831-895 903-933 942-977 986-1039 1047-1113 1120-1185 1194-1275 1283-1310 1318-1381 1389-1448 1457-1490')],
    [495.13, 'Estimated refresh investment is projected at $248K–$310K based on recommended replacement models.',
      segs('831-915 925-983 992-1087 1095-1106 1115-1195 1204-1218 1227-1348 1357-1407 1416-1435 1444-1568 1577-1684 1693-1758')],
    [521.08, 'Replacing aging assets may improve security compliance and operational reliability.',
      segs('831-914 922-968 976-1031 1039-1073 1081-1149 1157-1225 1233-1331 1339-1369 1378-1474 1483-1563')],
  ];
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="2248" height="1264" viewBox="0 0 2248 1264" font-family="Inter">
  <defs>
    <filter id="p3card" x="-5%" y="-10%" width="110%" height="130%">
      <feDropShadow dx="0" dy="3" stdDeviation="3.5" flood-color="#000" flood-opacity=".07"/>
    </filter>
  </defs>
  <rect x="590.5" y="60.5" width="1639" height="1185" rx="8" fill="#fff"/>
  <rect x="622" y="96.6" width="15.3" height="19.2" rx="3" fill="none" stroke="#121212" stroke-width="1.3"/>
  <g fill="#121212">
    <rect x="625.6" y="104" width="2" height="4.6"/><rect x="628.7" y="106.4" width="2" height="2.2"/>
    <rect x="631.8" y="101.8" width="2" height="6.8"/><rect x="624.9" y="110.8" width="9.5" height="1.1"/>
  </g>
  ${line(113.75, 19.35, 600, T2, title, segs('652-755 762-834 841-879 887-959 966-1031 1038-1207'))}
  <rect x="609" y="136.9" width="1601" height="1.1" fill="#c9cdd3"/>
  ${line(206.1, 29, 600, T1, title, segs('770-925 935-1043 1052-1111 1122-1232 1241-1339 1349-1602'))}
  <rect x="768.5" y="255" width="1282" height="293" rx="12" fill="#fff" filter="url(#p3card)"/>
  ${line(304.18, 21.23, 600, T2, 'Key Insights', segs('798-833 841-920'))}
  ${line(340.23, 18.68, 400, T1, 'Your organization has 32 assets approaching End of Life within the next 6 months. Several critical networking and security devices are',
      segs('797-835 842-948 957-985 994-1014 1022-1077 1085-1192 1201-1231 1239-1255 1263-1292 1300-1350 1358-1385 1393-1428 1437-1445 1454-1522 1530-1592 1601-1656 1665-1760 1769-1798 1807-1875 1883-1949 1957-1982'))}
  ${line(366.23, 18.68, 400, T1, 'nearing their last supported date and may require refresh planning to avoid operational risk.',
      segs('798-860 868-907 915-943 951-1039 1048-1085 1093-1123 1132-1165 1174-1233 1241-1300 1309-1381 1389-1404 1412-1456 1465-1561 1570-1603'))}
  ${line(418.04, 18.68, 400, T1, 'Suggested actions:', segs('798-889 898-964'))}
  ${bullets.map(([y, t, xs], i) => `<circle cx="809.6" cy="${(437.7 + 25.95 * i).toFixed(2)}" r="3.1" fill="${T1}"/>` +
      line(y, 18.68, 400, T1, t, xs)).join('')}
  <rect x="768.5" y="574" width="499" height="317.5" rx="12" fill="#fff" filter="url(#p3card)"/>
  ${line(621.75, 19.35, 600, T2, 'Affected assets by product family', segs('797-877 884-943 950-970 977-1050 1056-1110'))}
  ${[0, 1, 2, 3, 4].map(k => `<rect x="${(846.1 + 98 * k).toFixed(1)}" y="655" width="1.6" height="190" fill="#eceef0"/>`).join('')}
  ${dashed.map(y => `<line x1="849.8" x2="1240" y1="${y + 0.5}" y2="${y + 0.5}" stroke="#dfe2e6" stroke-dasharray="2.33 2.34"/>`).join('')}
  ${tops.map((t, k) => `<rect x="${(852.4 + 78.43 * k).toFixed(2)}" y="${t}" width="69.1" height="${(843.9 - t).toFixed(2)}" fill="#7e8bff"/>`).join('')}
  <line x1="849.8" x2="1240" y1="844" y2="844" stroke="#dfe2e6" stroke-dasharray="2.33 2.34"/>
  ${txt(797.2, 660.5, 12.85, 400, T3, '100%')}
  ${txt(810.5, 847.5, 12.85, 400, T3, '0%')}
  ${labels.map(([t, x, y]) => txt(x, y, 14, 400, T3, t)).join('')}
</svg>`;
}
