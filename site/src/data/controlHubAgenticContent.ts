import type { Figure, PlateHead } from './chaiContent';
import type { VideoFigure } from './ebbContent';

/**
 * Control Hub Agentic case study content — v2, the real story.
 *
 * Source: the Chrome Disco deck outline (~/google-interview/
 * google-chrome-disco-presentation-outline.md, slides 20–42, rev.
 * 2026-10-23). Headlines are the deck's slide titles. Prose is Yankun's
 * spoken deck notes, condensed into a first draft for Yankun to rewrite.
 * Brief: 00-brief/prd-agentic-case-study-v2.md, with v3 replacing the
 * Bridge chapter by Build (00-brief/prd-agentic-case-study-v3.md). The
 * page doesn't mention Cloud Control Workflows (Yankun, 2026-11-12).
 * v3 drafts, for Yankun to rewrite: glance (landed, status), prose.how,
 * prose.engine, prose.why, prose.p05, prose.outcome, lessons[1].
 *
 * Status rule: Agentic is never presented as shipped. Prototypes carry
 * their sequence number (01–05), never a month. Status reads “In progress”
 * (Yankun, 2026-11-12).
 */

export const header = {
  figNumber: 'fig. 02',
  title: 'Control Hub Agentic',
  subtitle: 'Five prototypes, two pivots, and the one interaction that survived both',
  yearRange: '2026',
  context: 'Cisco Webex · Control Hub',
  role: 'Design lead · prototype, in progress',
  heroVideo: {
    mp4: '/images/control-hub-agentic/run-loop.mp4',
    poster: '/images/control-hub-agentic/run-loop-poster.png',
    aspectRatio: '1846 / 1114',
    alt: 'Prototype 05: an admin picks “Clone device settings” in the Assistant, names two devices, reviews a four-step plan, runs it, and gets a summary of what changed.',
  },
} as const;

export const glance = [
  {
    label: 'The task',
    text: 'Clone one phone adapter’s setup to another. By hand, that’s twelve screens.',
  },
  {
    label: 'My call',
    text: 'Not an agent that decides on its own. Steps the admin can check, run from the Assistant they already use.',
  },
  {
    label: 'Where it landed',
    text: 'Workflows admins build in Control Hub and run from the Assistant. The run was tested at WebexOne; the team adopted the builder.',
  },
  {
    label: 'Status',
    text: 'Five prototypes, 01–05. In progress.',
  },
] as const;

export const prose = {
  ask: [
    'After CHAI, the team wanted a north star for agentic AI in Control Hub. My part was to make the idea concrete enough for the team to decide on.',
  ],
  task: [
    'Francis, a Firefighter in our research, gets a ticket. It sounds like one click. It isn’t. Where does each setting live? Copy it, field by field, tab by tab. What else depends on it? And on the new device: did I get everything? Twelve screens, four stops, done between interruptions.',
    'More than 60% of reported top-task time goes to upkeep like this. That figure is directional. And a miss doesn’t just cost time. It breaks a line for someone else. Every prototype that follows runs a version of this task.',
  ],
  answer: [
    'Francis picks the task in the Assistant he already uses and names the two devices. He reads a four-step plan. Nothing changes until he runs it. Each step reports as it goes, and the summary says what changed: ATA-2 matches ATA-1.',
    'Getting here took five prototypes, and two turns I didn’t plan for.',
  ],
  engine: [
    'Every step Francis sees comes from a workflow, built once in the workflow builder. Each step is a card, and each card’s settings are defined. The Assistant is what admins see. The builder is the engine behind it.',
    'Here’s its sibling, Clone user settings. It reads both users, checks they’re compatible, copies, verifies, and sums up. If the check fails, it stops and says why.',
  ],
  how: [
    'None of these shipped as they are. Each one answered a question the team could decide on. First I explored. Then a hard question made us turn. Then the work had to run the same way every time, so I built it as workflows.',
  ],
  p01: [
    '“Agentic AI in Control Hub” meant something different to everyone. So I built an agent studio in code, learning to prototype with Cursor as I went. The team could click through it and point at what was right and what was wrong. It turned the idea into something we could question. No live model: the responses were written into the prototype.',
  ],
  p02: [
    'I changed two things. I simplified an agent’s overview, so it’s easier for an admin to start. And I split the view, so the admin can watch the agent’s progress while it works. This is the version we took into research.',
  ],
  research: [
    'We tested prototype 02 with admins and looked closely at their use cases. Trust in AI builds over time. Like a new intern, it has to show its work before it gets more freedom. And the tasks worth doing first were high value and low risk. This finding turned the work.',
  ],
  p03: [
    'This is the research, applied. The agent runs inside the Assistant admins already have, shows its plan first, and waits for the admin’s yes. With the PM and the eng lead, we kept one assistant: no second chatbot in one product. I built it on Control Hub’s real front-end code, so it was ready for engineers to implement. This interaction lasted to the end.',
  ],
  pause: [
    'Cloud Control, the platform above Control Hub, was building its own Agent Builder. Our agent work looked redundant, and the PM asked whether we should stop. I didn’t argue in the abstract. I answered with a model.',
  ],
  call: [
    'Their Agent Builder makes fully autonomous agents: you give it a goal, and it uses the tools it’s allowed. Ours was different: step-by-step instructions the Assistant runs, with the admin’s input and approval at each checkpoint. The builder was Cloud Control’s to build. What was still ours was how an admin asks, checks and approves.',
    'The trade-off: admins give up full autonomy. That’s fine for now. They’re still learning what AI can do. The PM and engineering agreed it was the right direction, so we built our own instead of waiting.',
  ],
  p04: [
    'Here’s the model, built. Prototype 04 turns a task into instructions the Assistant follows step by step.',
  ],
  why: [
    'A skill is instructions the AI interprets. Run it twice and it can take two different paths. That’s fine for an answer. It isn’t fine for a change to someone’s phone line.',
    'Our brief from the research already asked for it: behave the same way every time. So I moved the tasks from skills to workflows. Fixed steps the admin can read, check and run again.',
  ],
  p05: [
    'Prototype 05 makes each task a workflow. An admin builds it once in the workflow builder and runs it from the Assistant. Before anything changes, the Assistant shows the steps: a print preview, for a workflow. It’s the run at the top of this page.',
    'I didn’t start the builder from scratch. Webex already had Flow Designer, so I built on its foundation. What I added is Control Hub: its activities, from users and devices to calling, and the settings each one takes, defined one by one. I redesigned some of the activity cards, so each says what its step does before it runs. I built it in code, in the same prototype as the Assistant.',
  ],
  decisions: [
    'The research line, turned into a brief: easy to find, shows the plan first, shows its work, behaves the same way every time. One decision at a time.',
  ],
  outcome: [
    'The output wasn’t my screens. It was a direction the team adopted: a workflow an admin builds once, reads, and runs from the Assistant. How an admin asks, sees the plan, approves, watches it run and gets the result: that’s the layer I designed, and the part that survived every pivot.',
    'We tested the run at WebexOne and got good feedback. Then the PM and engineering adopted the builder.',
  ],
} as const;

export const lessons = [
  {
    line: 'Prototype to decide.',
    text: 'Each prototype answered one question the team could decide on. It turned an idea that meant something different to everyone into something people could point at.',
  },
  {
    line: 'Know what not to build.',
    text: 'We didn’t build a second agent builder, and I didn’t start a workflow builder from scratch. I built the part only Control Hub needed: its activities and their settings. Knowing what not to build is part of the design.',
  },
] as const;

export const quotes = {
  research: {
    phrase: 'Admins treat AI like an intern. It has to prove it can do the work.',
    attribution: 'What the research said',
  },
  pause: {
    phrase: 'Should we pause?',
    attribution: 'The PM, after the Agent Builder news',
  },
} as const;

/** The four stops of the manual task — slide 22's diagram, as data. */
export const taskStops = [
  'Where does each setting live?',
  'Copy it, field by field',
  'What else depends on it?',
  'Did I get everything?',
] as const;

/* Non-breaking hyphens (U+2011) keep the device names whole when the line wraps. */
export const taskRequest =
  'Clone device ATA‑1 to ATA‑2, make sure all the ATA‑1’s configuration is copied over to ATA‑2.';

export type MapStopKind = 'prototype' | 'final' | 'tested' | 'tick';

export interface MapStop {
  label: string;
  kind: MapStopKind;
  /** In-page anchor this stop jumps to. */
  href: string;
}

export interface MapMove {
  move: string;
  stops: readonly MapStop[];
  /** The platform underneath the move, drawn as the ground. */
  ground?: { label: string; note: string; dashed: boolean };
}

/** Explore · turn · build — the deck's cut timeline map, as the spine of §3. */
export const prototypeMap: readonly MapMove[] = [
  {
    move: 'Explore',
    stops: [
      { label: '01', kind: 'prototype', href: '#p01' },
      { label: '02', kind: 'prototype', href: '#p02' },
      { label: 'Research', kind: 'tick', href: '#research' },
      { label: '03', kind: 'prototype', href: '#p03' },
    ],
  },
  {
    move: 'Turn',
    stops: [
      { label: 'Pause?', kind: 'tick', href: '#pause' },
      { label: '04', kind: 'prototype', href: '#p04' },
    ],
    ground: { label: 'Agent Builder', note: 'being built, never built on', dashed: true },
  },
  {
    move: 'Build',
    stops: [
      { label: 'Every time', kind: 'tick', href: '#why' },
      { label: '05', kind: 'final', href: '#p05' },
      { label: 'WebexOne', kind: 'tested', href: '#outcome' },
    ],
    ground: { label: 'Flow Designer', note: 'built on', dashed: false },
  },
] as const;

// Plate heads (adopted 2026-11-10). Builder → Assistant indexes the answer:
// the run admins see, and the builder behind it. Explore → Turn → Build
// indexes each prototype. Status comes only from the captions — Agentic is
// never presented as shipped.
const LAYERS = ['Builder', 'Assistant'] as const;
const MOVES = ['Explore', 'Turn', 'Build'] as const;

function layerHead(current: number, label: string, status: string): PlateHead {
  return { sequence: { name: 'Layer', items: LAYERS, current }, label, status };
}

function prototypeHead(move: number, n: string, status = 'My design'): PlateHead {
  return {
    sequence: { name: 'Move', items: MOVES, current: move },
    label: `Prototype ${n}`,
    status,
  };
}

export const runLoop: VideoFigure = {
  sources: [{ src: '/images/control-hub-agentic/run-full.mp4', type: 'video/mp4' }],
  poster: '/images/control-hub-agentic/run-full-poster.png',
  caption: 'Prototype 05 · my design — the full run, from the Assistant',
  alt: 'Silent recording of the full run: the admin opens the Assistant, picks the Clone device settings workflow, chooses ATA-1 and ATA-2, reviews the four-step plan, runs it, watches each step complete, and reads the summary.',
  width: 'plate',
  stage: { tone: 'ink', size: [1846, 1114] },
  head: layerHead(1, 'Prototype 05', 'In progress'),
};

export const figures = {
  p01: {
    src: '/images/control-hub-agentic/p01-run-view.png',
    caption: 'Prototype 01 · my design — the agent studio’s run view',
    alt: 'Prototype 01, the agent studio: a Calling Settings Transfer run with a control panel, a workflow pipeline, and an inspector comparing current and new settings, with Approve Transfer.',
    width: 'plate',
    stage: { sizes: [[2087, 1171]] },
    head: prototypeHead(0, '01'),
  },
  p04: {
    src: '/images/control-hub-agentic/p04-skills.png',
    caption: 'Prototype 04 · my design — tasks as instructions the Assistant runs',
    alt: 'AI for Control Hub, the Assistant skills page: usage charts for skill runs, and six task cards — Inventory explorer, Dependency mapper, Configuration compare, Clone user, Clone device and Clone workspace — each tagged read-only or write, with Run.',
    width: 'plate',
    stage: { sizes: [[2000, 1455]] },
    head: prototypeHead(1, '04'),
  },
  p05List: {
    src: '/images/control-hub-agentic/workflows-list.png',
    caption: 'Prototype 05 · workflows in Control Hub, Cisco-owned beside the admin’s own · sample data',
    alt: 'The Workflows page in Control Hub, under AI management: six draft workflows (clone device settings, clone user settings, compare configuration, list inactive devices, map out dependency), each with its scope, and an owner that is either Cisco-owned or an admin.',
    width: 'plate',
    stage: { sizes: [[1746, 1189]] },
    head: prototypeHead(2, '05', 'Sample data'),
  },
} as const satisfies Record<string, Figure>;

/** The engine behind the run: the workflow builder, shown under the run in the answer. */
export const engine = {
  canvas: {
    src: '/images/control-hub-agentic/designer-canvas.png',
    caption: 'The workflow builder · my Control Hub activities and settings, on the Webex Flow Designer foundation',
    alt: 'The workflow builder, editing Clone user settings: a library of Control Hub activities on the left; a canvas running Start flow, Get user settings, Check compatibility and a condition; and the Check compatibility settings on the right, with source user, destination user and a compatible output variable.',
    width: 'plate',
    stage: { sizes: [[2140, 1302]] },
    head: layerHead(0, 'Prototype 05', 'On Flow Designer'),
  },
  cards: {
    src: '/images/control-hub-agentic/designer-cards.png',
    caption: 'The workflow builder · my cards — each says what its step does, including the path where it stops',
    alt: 'The rest of the Clone user settings workflow: copy eight supported calling settings, verify them, and generate a summary; on the blocked path, a summary explains why the workflow stopped and ends with a Blocked outcome. The Assistant is open beside the canvas.',
    width: 'plate',
    stage: { sizes: [[1964, 1189]] },
    head: layerHead(0, 'Prototype 05', 'My design'),
  },
} as const satisfies Record<string, Figure>;

export const videos = {
  p02: {
    sources: [{ src: '/images/control-hub-agentic/p02-agent-studio.mp4', type: 'video/mp4' }],
    poster: '/images/control-hub-agentic/p02-agent-studio-poster.png',
    caption: 'Prototype 02 · my design — a simpler start, and a split view to watch the agent work',
    alt: 'Silent recording of prototype 02: the agents list, a simplified agent overview, then a split view with the agent’s chat on the left and its progress on the right, ending on Approve & apply.',
    width: 'plate',
    stage: { tone: 'ink', size: [1858, 1118] },
    head: prototypeHead(0, '02'),
  },
  p03: {
    sources: [{ src: '/images/control-hub-agentic/p03-plan-in-assistant.mp4', type: 'video/mp4' }],
    poster: '/images/control-hub-agentic/p03-plan-in-assistant-poster.png',
    caption: 'Prototype 03 · my design — the plan first, inside the Assistant',
    alt: 'Silent recording of prototype 03: in the Assistant, the agent prepares a six-step clone plan for a new user and asks “Do you want me to implement this plan?” before cloning, then summarizes what changed.',
    width: 'plate',
    stage: { tone: 'ink', size: [2400, 1470] },
    head: prototypeHead(0, '03'),
  },
} as const satisfies Record<string, VideoFigure>;

export interface Decision {
  id: string;
  title: string;
  paragraphs: readonly string[];
  /** Where the decision started — shown first, when the deck shows it. */
  started?: VideoFigure;
  chosen: Figure;
  weighedAgainst?: Figure;
}

export const decisions: readonly Decision[] = [
  {
    id: 'find',
    title: 'Show the tasks where admins start their day',
    paragraphs: [
      'In prototype 02, I explored an AI-first overview that surfaces insights. In testing, admins felt it was too big a change to the overview they’re used to. They still wanted the charts they pin there. So the final overview keeps those, and adds a direct way into the AI on the first page they see. What it can do is grouped by job, not by feature, with the workflows they can run.',
      'The trade-off: the AI section pushes the usual overview content down, for everyone. Admins can hide it. It’s worth it: the AI can do much more now, and this is where admins discover it.',
    ],
    started: {
      sources: [{ src: '/images/control-hub-agentic/p02-overview.mp4', type: 'video/mp4' }],
      poster: '/images/control-hub-agentic/p02-overview-poster.png',
      caption: 'Where it started · prototype 02 · my design',
      alt: 'Silent recording of prototype 02’s AI-first overview: a greeting and three insight cards; clicking the certificate warning opens the AI assistant, which explains what will break and for whom.',
      width: 'plate',
      stage: { tone: 'ink', size: [1858, 1118] },
      head: { label: 'Where it started · prototype 02', status: 'My design' },
    },
    chosen: {
      src: '/images/control-hub-agentic/overview-tasks.png',
      caption: 'Where it ended up · my design · sample data',
      alt: 'The final overview: a greeting, an Ask box, and four task groups above the usual pinned charts. Automate with Workflows is open: copy settings to a new user, set up a similar device, create a workflow for a recurring task, schedule a configuration check.',
      width: 'plate',
      stage: { sizes: [[1839, 1134]] },
      head: { label: 'Where it ended up', status: 'Sample data' },
    },
  },
  {
    id: 'plan',
    title: 'It shows the plan before it touches anything',
    paragraphs: [
      'In Report Analysis, the admin saw the scope before the AI answered. Here, the admin sees the plan before the AI acts. The earlier plan named what it found and the cost before the yes. Where it landed: four plain steps, what it copies from and to, and one button to run it.',
      'The trade-off: approval adds a step. It’s worth it: a pause to review and approve keeps the admin in control. That’s how trust gets built.',
    ],
    chosen: {
      src: '/images/control-hub-agentic/plan-current.png',
      caption: 'Workflow preview · current design · prototype 05',
      alt: 'The workflow preview: “I’ll copy supported settings from ATA-1 to ATA-2,” four numbered steps, the copy-from and copy-to devices, what the destination keeps, and Run workflow.',
      width: 'plate',
      stage: { sizes: [[921, 537]] },
      head: { label: 'Workflow preview · prototype 05', status: 'Current design' },
    },
    weighedAgainst: {
      src: '/images/control-hub-agentic/plan-earlier.png',
      caption: 'Weighed against · the earlier agent plan · sample data',
      alt: 'An earlier plan card: replace gateway SJ-GW-01 with a new Cisco VG400, in five steps, with a line warning of a brief calling interruption.',
      variant: 'dashed',
      // The option it lost to keeps its dashed, unstaged frame: quieter on purpose.
      width: 'plate',
      head: { label: 'Weighed against', status: 'Sample data' },
    },
  },
  {
    id: 'record',
    title: '…and keeps a record where admins already look',
    paragraphs: [
      'Trust also needs a record. Admins want to see the trace. I first explored a separate Agent Activity view. But one place to check is better. So agent events go into the audit log admins already use, next to the changes people make, with a mark that shows a change was made with AI. Every AI change is traceable.',
      'What’s lost is the full detail: the expected outcome, and what the agent did at each step. In the workflow, the admin can still open any step and read a summary of what the Assistant did.',
    ],
    chosen: {
      src: '/images/control-hub-agentic/audit-log.png',
      caption: 'Audit log · prototype — AI changes beside people’s, each marked as AI activity',
      alt: 'The Control Hub audit log with AI clients (Assistant, Copilot, ChatGPT, an agent) beside admin changes, and an event opened on the right: tagged AI activity, with the AI client, the change type, the configuration and its value change.',
      width: 'plate',
      stage: { sizes: [[1228, 728]] },
      head: { label: 'Audit log', status: 'Prototype' },
    },
  },
];

/** Slide 34's drawing: the agent model dropped, the checkable model kept. */
export const pivot = {
  dropped: { from: 'Goal', box: 'Agent decides', to: 'Outcome' },
  kept: { from: 'Instruction', inputs: 'Inputs', steps: 'Steps', to: 'Review' },
  checkLabel: 'Admin checks',
} as const;

/** Slide 40's drawing, v3: my layer between the admin's task and the workflows it runs. */
export const layers = {
  task: { label: 'The admin’s task', text: taskRequest },
  mine: {
    label: 'My design',
    title: 'How an admin runs it, in the Assistant',
    steps: ['Ask', 'Plan', 'Approve', 'Run', 'Report'],
  },
  builtOn: 'Built on',
  platform: { title: 'Workflow designer', label: 'Control Hub activities, my design · Flow Designer foundation' },
  notBuilt: { title: 'Agent Builder', label: 'Not built', note: 'the work we chose not to duplicate' },
} as const;

export const credits = {
  design: 'Design lead — interaction model, prototypes 01–05, the Control Hub workflow activities, widget studio and playbook',
  partners: ['Product management', 'Engineering', 'Research', 'Design leadership'],
} as const;

export const sections = [
  { id: 'task', label: 'The task' },
  { id: 'answer', label: 'The answer' },
  { id: 'how', label: 'Prototypes' },
  { id: 'decisions', label: 'Decisions' },
  { id: 'outcome', label: 'Outcome' },
  { id: 'lessons', label: 'Lessons' },
  { id: 'credits', label: 'Credits' },
] as const;
