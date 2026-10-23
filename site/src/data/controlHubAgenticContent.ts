import type { Figure } from './chaiContent';
import type { VideoFigure } from './ebbContent';

/**
 * Control Hub Agentic case study content — v2, the real story.
 *
 * Source: the Chrome Disco deck outline (~/google-interview/
 * google-chrome-disco-presentation-outline.md, slides 20–42, rev.
 * 2026-10-23). Headlines are the deck's slide titles. Prose is Yankun's
 * spoken deck notes, condensed into a first draft for Yankun to rewrite.
 * Brief: 00-brief/prd-agentic-case-study-v2.md.
 *
 * Status rule: Agentic is never presented as shipped. Prototypes carry
 * their sequence number (01–05), never a month.
 */

export const header = {
  figNumber: 'fig. 02',
  title: 'Control Hub Agentic',
  subtitle: 'Five prototypes, two platform shifts, and the one interaction that survived both',
  yearRange: '2026',
  context: 'Cisco Webex · Control Hub',
  role: 'Design lead · prototype, never shipped',
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
    text: 'Control Hub’s tasks on Cloud Control Workflows: a direction two teams agreed on, tested at WebexOne.',
  },
  {
    label: 'Status',
    text: 'Five prototypes, 01–05. Never shipped.',
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
  how: [
    'None of these shipped as they are. Each one answered a question the team could decide on. First I explored. Then a hard question made us turn. Then I found a team that already had the engine we needed.',
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
    'Not an agent that decides on its own, but step-by-step instructions the Assistant runs, with the admin at each checkpoint. Two things decided it. Admins need to check each step, so the steps have to be visible. That’s the intern. And the builder was Cloud Control’s to build. What was still ours was how an admin asks, checks and approves.',
    'Automation the admin can check, not autonomy. We start with tasks that are high value, low risk and pre-built.',
  ],
  p04: [
    'Here’s the model, built. Prototype 04 turns a task into instructions the Assistant follows step by step. I showed it to the wider Cisco design team, and showing it is what found us the next step.',
  ],
  bridge: [
    'The Meraki team built it, and it was on its way into Cloud Control. I asked for a login and built our use case on it before asking anyone to bet on it. Then I brought it back to my team and connected the two teams, so each could learn the other’s concepts. With the PM and the eng lead, we adopted Workflows.',
  ],
  p05: [
    'I brought Control Hub’s use cases and worked with both teams to make Workflows usable for us. I added the Webex and Control Hub APIs, so a workflow can act on Control Hub. And I helped design the preview before a workflow runs: a print preview, for a workflow.',
  ],
  decisions: [
    'The research line, turned into a brief: easy to find, shows the plan first, shows its work, behaves the same way every time. One decision at a time.',
  ],
  craft: [
    'The AI generates the screen, so I didn’t design one screen at a time. I designed the states and the rules: 49 surfaces in a widget studio, reviewed across every use case and lifecycle state. It shares one codebase with the prototypes.',
    'The PM reviews flows in it. Engineering uses the playbook to guide how the Assistant and workflows behave, and the reusable rules are written for agents too. Four designers have since branched the codebase to explore how workflows apply to their own areas.',
  ],
  outcome: [
    'The output wasn’t my screens. It was a direction two teams agreed on. Workflows is the engine. How an admin asks, sees the plan, approves, watches it run and gets the result: that’s the layer I designed, and the part that survived every pivot.',
    'We tested it at WebexOne and got good feedback.',
  ],
} as const;

export const lessons = [
  {
    line: 'Prototype to decide.',
    text: 'Each prototype answered one question the team could decide on. It turned an idea that meant something different to everyone into something people could point at.',
  },
  {
    line: 'Know what not to build.',
    text: 'We didn’t build a second agent builder. The engine was already there. Knowing what not to build is part of the design.',
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

/** Slide 32's spread: the quote on ink, their screen beside it. */
export const bridgeSpread = {
  label: 'A Meraki designer',
  phrase: 'We have something similar.',
  subline: 'Workflows, built for network automation.',
  figure: {
    src: '/images/control-hub-agentic/workflows-canvas.png',
    caption: 'Cloud Control Workflows · not our design',
    alt: 'The Cloud Control Workflows editor: an activity list, a no-code canvas of logic blocks for a Meraki wireless report, and workflow properties.',
  },
} as const;

/** Slide 33: what I added, standing on Workflows. */
export const onWorkflows = {
  panels: [
    {
      label: '01 · Webex and Control Hub APIs',
      src: '/images/control-hub-agentic/workflows-apis.png',
      alt: 'The Workflows activity list with a Webex Control Hub group: Access, Audit, Groups, Organization, and People, with actions such as Create a Person and Delete a Person.',
    },
    {
      label: '02 · The preview before it runs',
      src: '/images/control-hub-agentic/plan-current.png',
      alt: 'The workflow preview in the Assistant: Clone device settings in four steps, copy from ATA-1 to ATA-2, and Run workflow.',
    },
  ],
  ground: 'Workflows · the engine · not our design',
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
  /** Cloud Control, drawn underneath as the ground. */
  ground?: { label: string; note: string; dashed: boolean };
}

/** Explore · turn · bridge — the deck's cut timeline map, as the spine of §3. */
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
    move: 'Bridge',
    stops: [
      { label: '05', kind: 'final', href: '#p05' },
      { label: 'WebexOne', kind: 'tested', href: '#outcome' },
    ],
    ground: { label: 'Workflows', note: 'built on', dashed: false },
  },
] as const;

export const runLoop: VideoFigure = {
  sources: [{ src: '/images/control-hub-agentic/run-full.mp4', type: 'video/mp4' }],
  poster: '/images/control-hub-agentic/run-full-poster.png',
  caption: 'Prototype 05 · my design — the full run, on Cloud Control Workflows',
  alt: 'Silent recording of the full run: the admin opens the Assistant, picks the Clone device settings workflow, chooses ATA-1 and ATA-2, reviews the four-step plan, runs it, watches each step complete, and reads the summary.',
};

export const runSteps: readonly Figure[] = [
  {
    src: '/images/control-hub-agentic/run-step-ask.png',
    caption: '01 · Ask — pick the task, name the devices',
    alt: 'The Assistant asks for the source and destination devices; the admin picks ATA-1 and is choosing ATA-2.',
  },
  {
    src: '/images/control-hub-agentic/run-step-plan.png',
    caption: '02 · Plan — four steps, nothing changed yet',
    alt: 'A Clone device settings preview with four steps (read, check compatibility, copy, verify), workflow details and a Run workflow button.',
  },
  {
    src: '/images/control-hub-agentic/run-step-run.png',
    caption: '03 · Run — each step reports as it goes',
    alt: 'The four steps running: step one complete, step two in progress, steps three and four not started, with a Stop workflow button.',
  },
  {
    src: '/images/control-hub-agentic/run-step-result.png',
    caption: '04 · Result — what changed, setting by setting',
    alt: 'A summary card for ATA-2: six settings applied and verified, with the fax, signaling and audio changes listed as previous and applied values.',
  },
];

export const figures = {
  p01: {
    src: '/images/control-hub-agentic/p01-run-view.png',
    caption: 'Prototype 01 · my design — the agent studio’s run view',
    alt: 'Prototype 01, the agent studio: a Calling Settings Transfer run with a control panel, a workflow pipeline, and an inspector comparing current and new settings, with Approve Transfer.',
  },
  p04: {
    src: '/images/control-hub-agentic/p04-skills.png',
    caption: 'Prototype 04 · my design — tasks as instructions the Assistant runs',
    alt: 'AI for Control Hub, the Assistant skills page: usage charts for skill runs, and six task cards — Inventory explorer, Dependency mapper, Configuration compare, Clone user, Clone device and Clone workspace — each tagged read-only or write, with Run.',
  },
  studio: {
    src: '/images/control-hub-agentic/widget-studio.png',
    caption: 'Widget studio · my review tool — 49 surfaces, one component source',
    alt: 'The widget studio’s Plan tab: one component source, reviewed across every use case and lifecycle state, showing a sample gateway-swap plan.',
  },
  studioGuide: {
    src: '/images/control-hub-agentic/widget-studio-guide.png',
    caption: 'The playbook · one use case, Clone & Copy, written as rules',
    alt: 'The Clone & Copy guide: a use case at a glance table, the experience promise and flow, and an experience-flow sequence from request to validation.',
  },
} as const satisfies Record<string, Figure>;

export const videos = {
  p02: {
    sources: [{ src: '/images/control-hub-agentic/p02-agent-studio.mp4', type: 'video/mp4' }],
    poster: '/images/control-hub-agentic/p02-agent-studio-poster.png',
    caption: 'Prototype 02 · my design — a simpler start, and a split view to watch the agent work',
    alt: 'Silent recording of prototype 02: the agents list, a simplified agent overview, then a split view with the agent’s chat on the left and its progress on the right, ending on Approve & apply.',
  },
  p03: {
    sources: [{ src: '/images/control-hub-agentic/p03-plan-in-assistant.mp4', type: 'video/mp4' }],
    poster: '/images/control-hub-agentic/p03-plan-in-assistant-poster.png',
    caption: 'Prototype 03 · my design — the plan first, inside the Assistant',
    alt: 'Silent recording of prototype 03: in the Assistant, the agent prepares a six-step clone plan for a new user and asks “Do you want me to implement this plan?” before cloning, then summarizes what changed.',
  },
} as const satisfies Record<string, VideoFigure>;

export interface Decision {
  id: string;
  title: string;
  paragraphs: readonly string[];
  chosen: Figure;
  weighedAgainst?: Figure;
}

export const decisions: readonly Decision[] = [
  {
    id: 'find',
    title: 'Show the tasks where admins start their day',
    paragraphs: [
      'CHAI v1 sat beside the product. Admins tried it once and never came back. So the AI moves to the first page admins see, and what it can do is grouped by job, not by feature. “Set up a similar device” is Francis’s ticket, in the admin’s own words.',
    ],
    chosen: {
      src: '/images/control-hub-agentic/overview-tasks.png',
      caption: 'AI-first overview · my design · sample data',
      alt: 'The AI-first overview: a greeting, an Ask box, and four task groups above the usual metrics. Automate with Workflows is open: copy settings to a new user, set up a similar device, create a workflow for a recurring task, schedule a configuration check.',
    },
    weighedAgainst: {
      src: '/images/chai/chai-1-0.png',
      caption: 'Weighed against · v1’s chat beside the product · not my design',
      alt: 'CHAI v1.0: a chat panel beside Control Hub with three canned prompts.',
      variant: 'dashed',
    },
  },
  {
    id: 'plan',
    title: 'It shows the plan before it touches anything',
    paragraphs: [
      'In Report Analysis, the admin saw the scope before the AI answered. Here, the admin sees the plan before the AI acts. The earlier plan named what it found and the cost before the yes. Where it landed: four plain steps, what it copies from and to, and one button to run it.',
      'The trade-off: approval adds a step. A miss breaks a line for someone else, so one approval costs less than one undo.',
    ],
    chosen: {
      src: '/images/control-hub-agentic/plan-current.png',
      caption: 'Workflow preview · current design · prototype 05',
      alt: 'The workflow preview: “I’ll copy supported settings from ATA-1 to ATA-2,” four numbered steps, the copy-from and copy-to devices, what the destination keeps, and Run workflow.',
    },
    weighedAgainst: {
      src: '/images/control-hub-agentic/plan-earlier.png',
      caption: 'Weighed against · the earlier agent plan · sample data',
      alt: 'An earlier plan card: replace gateway SJ-GW-01 with a new Cisco VG400, in five steps, with a line warning of a brief calling interruption.',
      variant: 'dashed',
    },
  },
  {
    id: 'work',
    title: 'It shows its work…',
    paragraphs: [
      'Every step is shown as it runs, checked against the same steps the plan promised. The outcome is predictable, and the admin can see where it is. It answers the last stop of the task: did I get everything?',
    ],
    chosen: {
      src: '/images/control-hub-agentic/run-step-steps.png',
      caption: 'Execution · prototype 05 · my design',
      alt: 'The four steps of the clone running in the Assistant: three complete, verify settings on ATA-2 in progress.',
    },
  },
  {
    id: 'record',
    title: '…and keeps a record where admins already look',
    paragraphs: [
      'I first proposed a separate Agent Activity view. The PM’s concern was that two audit systems would fragment Control Hub. We landed on agent events inside the existing audit log, next to the changes people make. One place to check is better for the admin.',
    ],
    chosen: {
      src: '/images/control-hub-agentic/audit-log.png',
      caption: 'Audit log · prototype — the Assistant’s and agents’ changes beside people’s',
      alt: 'The Control Hub audit log, with Assistant and agent entries listed alongside admin changes and logins.',
    },
    weighedAgainst: {
      src: '/images/control-hub-agentic/framework-activity.png',
      caption: 'Weighed against · a separate Agent Activity view',
      alt: 'A separate AI agents audit log page listing agent runs, the agent, time, user and trigger.',
      variant: 'dashed',
    },
  },
];

/** Slide 30's drawing: the agent model dropped, the checkable model kept. */
export const pivot = {
  dropped: { from: 'Goal', box: 'Agent decides', to: 'Outcome' },
  kept: { from: 'Instruction', inputs: 'Inputs', steps: 'Steps', to: 'Review' },
  checkLabel: 'The admin checks',
} as const;

/** Slide 40's drawing: my layer between the admin's task and the platform. */
export const layers = {
  task: { label: 'The admin’s task', text: taskRequest },
  mine: {
    label: 'My design',
    title: 'How an admin runs it, in the Assistant',
    steps: ['Ask', 'Plan', 'Approve', 'Run', 'Report'],
  },
  builtOn: 'Built on',
  platform: { title: 'Workflows', label: 'Cloud Control · not our design' },
  notBuilt: { title: 'Agent Builder', label: 'Not built', note: 'the work we chose not to duplicate' },
} as const;

export const credits = {
  design: 'Design lead — interaction model, prototypes 01–05, widget studio and playbook',
  partners: ['Product management', 'Engineering', 'Research', 'The Meraki Workflows team', 'Design leadership'],
} as const;

export const sections = [
  { id: 'task', label: 'The task' },
  { id: 'answer', label: 'The answer' },
  { id: 'how', label: 'Prototypes' },
  { id: 'decisions', label: 'Decisions' },
  { id: 'craft', label: 'How I worked' },
  { id: 'outcome', label: 'Outcome' },
  { id: 'lessons', label: 'Lessons' },
  { id: 'credits', label: 'Credits' },
] as const;
