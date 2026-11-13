import type { Board, Chapter } from './notebookCase';
import { credits as v3Credits, layers as v3Layers, pivot as v3Pivot, taskRequest, taskStops } from './controlHubAgenticContent';

/**
 * Control Hub Workflows (was Control Hub Agentic; renamed 2026-11-12) — v4
 * content, for the notebook layout
 * (ControlHubAgenticNotebook.tsx; references and moves in
 * 00-brief/references/agentic-case-study-v4/README.md).
 *
 * The same story as v3 (controlHubAgenticContent.ts, kept for the v3 page at
 * ?v=3), with about a third less prose and no paragraph over ~50 words.
 * Every line is Yankun's v3 text, shortened; nothing new is claimed. Lines a
 * drawing or a heading already says were cut. Lines condensed from v3's drafted copy
 * (engine, p05, outcome, lessons[1]) still need Yankun's rewrite before ship.
 *
 * Status rule (unchanged): Agentic is never presented as shipped. Status
 * reads "In progress".
 */

export { taskRequest, taskStops };
export type { Board, BoardScreen, Chapter } from './notebookCase';

const IMG = '/images/control-hub-agentic';

export const header = {
  title: { roman: 'Control Hub', italic: 'Workflows' },
  subtitle: 'Five prototypes, two pivots, and the one interaction that survived both',
  facts: [
    { label: 'Role', value: 'Design lead' },
    { label: 'Product', value: 'Cisco Webex · Control Hub' },
    { label: 'Year', value: '2026' },
    { label: 'Status', value: 'In progress' },
  ],
  hero: {
    screens: [
      {
        kind: 'video',
        src: `${IMG}/run-full.mp4`,
        poster: `${IMG}/run-full-poster.png`,
        size: [1846, 1114],
        alt: 'Silent recording of the full run: the admin opens the Assistant, picks the Clone device settings workflow, chooses ATA-1 and ATA-2, reviews the four-step plan, runs it, watches each step complete, and reads the summary.',
      },
    ],
    caption: 'Prototype 05 · the full run, from the Assistant · my design, in progress',
  } satisfies Board,
} as const;

export const glance = [
  { label: 'The task', text: 'Clone one phone adapter’s setup to another. By hand, that’s twelve screens.' },
  { label: 'My call', text: 'Not an agent that decides on its own. Steps the admin can check, run from the Assistant they already use.' },
  { label: 'Where it landed', text: 'Workflows admins build in Control Hub and run from the Assistant. Tested at WebexOne; the team adopted the builder.' },
] as const;

export const chapters: readonly Chapter[] = [
  { id: 'task', n: '01', word: 'The task', claim: 'Admins think in tasks. Control Hub is built around settings.' },
  { id: 'answer', n: '02', word: 'The answer', claim: 'One request. A plan to approve. Every step shown.' },
  { id: 'prototypes', n: '03', word: 'Five prototypes', claim: 'Getting here took five prototypes, and two turns I didn’t plan for.' },
  { id: 'decisions', n: '04', word: 'Decisions', claim: 'If admins treat AI like an intern, design it like a good one.' },
  { id: 'outcome', n: '05', word: 'Outcome', claim: 'The output wasn’t my screens. It was a direction the team adopted.' },
  { id: 'lessons', n: '06', word: 'Lessons' },
];

export const task = {
  lede: 'After CHAI, the team wanted a north star for agentic AI in Control Hub. My part was to make it concrete enough to decide on.',
  ticketFrom: 'The ticket · Francis, a Firefighter in our research',
  cost: 'It sounds like one click. It isn’t: twelve screens, four stops, done between interruptions. More than 60% of reported top-task time goes to upkeep like this (a directional figure), and a miss breaks a line for someone else.',
  diagramCaption: 'One task, then every page and tab: the manual path',
} as const;

export const answer = {
  lede: 'It’s the run at the top of this page. Francis picks the task in the Assistant he already uses and names the two devices. He reads a four-step plan. Nothing changes until he runs it. The summary says what changed: ATA-2 matches ATA-1.',
  engineLabel: 'The engine',
  engine: 'Every step the Assistant runs is built here, in the workflow builder, once per task. The Assistant is what admins see. The builder is the engine behind it.',
  board: {
    screens: [
      {
        kind: 'image',
        src: `${IMG}/designer-canvas.png`,
        size: [2140, 1302],
        alt: 'The workflow builder, editing Clone user settings: a library of Control Hub activities on the left; a canvas running Start flow, Get user settings, Check compatibility and a condition; and the Check compatibility settings on the right, with source user, destination user and a compatible output variable.',
      },
    ],
    caption: 'The workflow builder · my Control Hub activities and their settings, on the Webex Flow Designer foundation',
  } satisfies Board,
} as const;

export interface Prototype {
  id: string;
  n: string;
  move: 'Explore' | 'Turn' | 'Build';
  title: string;
  text: readonly string[];
  board: Board;
  /** More of the prototype: text, then more boards in sequence. */
  more?: { text: readonly string[]; boards: readonly Board[] };
}

export const prototypesLede =
  'None of these shipped as they are. Each one answered a question the team could decide on.';

export const prototypes: readonly Prototype[] = [
  {
    id: 'p01',
    n: '01',
    move: 'Explore',
    title: 'What could agentic AI do for admins?',
    text: [
      '“Agentic AI in Control Hub” meant something different to everyone. So I built an agent studio in code, learning to prototype with Cursor as I went, for the team to click through and point at. No live model: the responses were written in.',
    ],
    board: {
      screens: [
        {
          kind: 'image',
          src: `${IMG}/p01-run-view.png`,
          size: [2087, 1171],
          alt: 'Prototype 01, the agent studio: a Calling Settings Transfer run with a control panel, a workflow pipeline, and an inspector comparing current and new settings, with Approve Transfer.',
        },
      ],
      caption: 'Prototype 01 · the agent studio’s run view · my design',
    },
  },
  {
    id: 'p02',
    n: '02',
    move: 'Explore',
    title: 'Easy to start, easy to watch',
    text: [
      'I simplified the agent’s overview and split the view, so the admin can watch the agent work. We took this version into research.',
    ],
    board: {
      screens: [
        {
          kind: 'video',
          src: `${IMG}/p02-agent-studio.mp4`,
          poster: `${IMG}/p02-agent-studio-poster.png`,
          size: [1858, 1118],
          alt: 'Silent recording of prototype 02: the agents list, a simplified agent overview, then a split view with the agent’s chat on the left and its progress on the right, ending on Approve & apply.',
        },
      ],
      caption: 'Prototype 02 · a simpler start, and a split view to watch the agent work · my design',
    },
  },
  {
    id: 'p03',
    n: '03',
    move: 'Explore',
    title: 'The plan first, inside the Assistant',
    text: [
      'The research, applied: the agent runs inside the Assistant admins already have, shows its plan first, and waits for a yes. We kept one assistant, not a second chatbot. I built it on Control Hub’s real front-end code. This interaction lasted to the end.',
    ],
    board: {
      screens: [
        {
          kind: 'video',
          src: `${IMG}/p03-plan-in-assistant.mp4`,
          poster: `${IMG}/p03-plan-in-assistant-poster.png`,
          size: [2400, 1470],
          alt: 'Silent recording of prototype 03: in the Assistant, the agent prepares a six-step clone plan for a new user and asks “Do you want me to implement this plan?” before cloning, then summarizes what changed.',
        },
      ],
      caption: 'Prototype 03 · the plan first, inside the Assistant · my design',
    },
  },
  {
    id: 'p04',
    n: '04',
    move: 'Turn',
    title: 'Instructions the AI follows, step by step',
    text: ['Here’s the model, built: a task turned into instructions the Assistant follows step by step.'],
    board: {
      screens: [
        {
          kind: 'image',
          src: `${IMG}/p04-skills.png`,
          size: [2000, 1455],
          alt: 'AI for Control Hub, the Assistant skills page: usage charts for skill runs, and six task cards — Inventory explorer, Dependency mapper, Configuration compare, Clone user, Clone device and Clone workspace — each tagged read-only or write, with Run.',
        },
      ],
      caption: 'Prototype 04 · tasks as instructions the Assistant runs · my design',
    },
  },
  {
    id: 'p05',
    n: '05',
    move: 'Build',
    title: 'Workflows: built once, run from the Assistant',
    text: [
      'A skill is instructions the AI interprets. Run it twice and it can take two different paths. That’s fine for an answer. It isn’t fine for a change to someone’s phone line. So I moved the tasks to workflows: fixed steps the admin can read, check and run again.',
    ],
    board: {
      screens: [
        {
          kind: 'image',
          src: `${IMG}/workflows-list.png`,
          size: [1746, 1189],
          alt: 'The Workflows page in Control Hub, under AI management: six draft workflows (clone device settings, clone user settings, compare configuration, list inactive devices, map out dependency), each with its scope, and an owner that is either Cisco-owned or an admin.',
        },
      ],
      caption: 'Prototype 05 · the Workflows page: Cisco-owned workflows beside the admin’s own · sample data',
    },
    more: {
      text: [
        'I didn’t start the builder from scratch. On Webex’s Flow Designer, I added Control Hub’s activities and the settings each one takes, and redesigned the cards so each says what its step does before it runs.',
      ],
      boards: [
        {
          screens: [
            {
              kind: 'image',
              src: `${IMG}/designer-inactive-devices.png`,
              size: [2000, 1147],
              alt: 'The workflow builder editing List inactive devices: the Control Hub activity library on the left (users, devices, workspaces, calling), a canvas with Start Flow connected to Get device configurations, and that activity’s settings on the right: device ID, a configuration key filter, and an output variable.',
            },
          ],
          caption: 'Prototype 05 · List inactive devices: one Control Hub activity, Get device configurations, and its settings · my activities on Flow Designer',
        },
        {
          screens: [
            {
              kind: 'image',
              src: `${IMG}/designer-cards.png`,
              size: [1964, 1189],
              alt: 'The rest of the Clone user settings workflow: copy eight supported calling settings, verify them, and generate a summary; on the blocked path, a summary explains why the workflow stopped and ends with a Blocked outcome. The Assistant is open beside the canvas.',
            },
          ],
          caption: 'Prototype 05 · my activity cards, down to the path where the workflow stops and says why',
        },
      ],
    },
  },
];

export const research = {
  phrase: 'Admins treat AI like an intern. It has to prove it can do the work.',
  from: 'What the research said, testing prototype 02',
  text: 'Trust builds over time, and the tasks worth doing first were high value and low risk. This finding turned the work.',
} as const;

export const turn = {
  phrase: 'Should we pause?',
  from: 'The PM, after the Agent Builder news',
  text: 'Cloud Control, the platform above Control Hub, was building its own Agent Builder. Our agent work looked redundant. I didn’t argue in the abstract. I answered with a model.',
  call: 'Their builder was Cloud Control’s to build. How an admin asks, checks and approves was still ours. The PM and engineering agreed, so we built our own instead of waiting.',
  tradeoff: 'Admins give up full autonomy. Fine for now: they’re still learning what AI can do.',
  diagramCaption: 'The agent that decides, dropped · the steps the admin checks, kept',
} as const;

export const pivot = v3Pivot;

export interface Decision {
  id: string;
  title: string;
  why: string;
  tradeoff: string;
  board: Board;
}

export const decisions: readonly Decision[] = [
  {
    id: 'find',
    title: 'Show the tasks where admins start their day',
    why: 'Prototype 02’s AI-first overview was too big a change: admins still wanted their pinned charts. The final overview keeps them, with the AI’s tasks on top, grouped by job.',
    tradeoff: 'The AI section pushes the usual overview down. Admins can hide it.',
    board: {
      screens: [
        {
          kind: 'video',
          src: `${IMG}/p02-overview.mp4`,
          poster: `${IMG}/p02-overview-poster.png`,
          size: [1858, 1118],
          alt: 'Silent recording of prototype 02’s AI-first overview: a greeting and three insight cards; clicking the certificate warning opens the AI assistant, which explains what will break and for whom.',
          label: 'Where it started · prototype 02',
          weight: 5,
        },
        {
          kind: 'image',
          src: `${IMG}/overview-tasks.png`,
          size: [1839, 1134],
          alt: 'The final overview: a greeting, an Ask box, and four task groups above the usual pinned charts. Automate with Workflows is open: copy settings to a new user, set up a similar device, create a workflow for a recurring task, schedule a configuration check.',
          label: 'Where it ended up',
          weight: 7,
        },
      ],
      caption: 'The AI-first overview, then the one admins kept: their charts, with the tasks on top · my design · sample data',
    },
  },
  {
    id: 'plan',
    title: 'It shows the plan before it touches anything',
    why: 'In Report Analysis, the admin saw the scope before the AI answered. Here, the admin sees the plan before the AI acts: four plain steps, one button to run.',
    tradeoff: 'Approval adds a step. That pause is how trust gets built.',
    board: {
      screens: [
        {
          kind: 'image',
          src: `${IMG}/plan-current.png`,
          size: [921, 537],
          alt: 'The workflow preview: “I’ll copy supported settings from ATA-1 to ATA-2,” four numbered steps, the copy-from and copy-to devices, what the destination keeps, and Run workflow.',
          label: 'Where it landed · prototype 05',
          weight: 7,
        },
        {
          kind: 'image',
          src: `${IMG}/plan-earlier.png`,
          size: [1155, 925],
          alt: 'An earlier plan card: replace gateway SJ-GW-01 with a new Cisco VG400, in five steps, with a line warning of a brief calling interruption.',
          label: 'Weighed against · the earlier plan',
          weight: 5,
          dropped: true,
        },
      ],
      caption: 'Four plain steps and one button to run, beside the earlier plan that led with what it found and the cost · sample data',
    },
  },
  {
    id: 'record',
    title: '…and keeps a record where admins already look',
    why: 'Trust also needs a record. I dropped a separate Agent Activity view: AI changes go into the audit log admins already use, each marked as AI.',
    tradeoff: 'The log loses each step’s detail. The workflow keeps it.',
    board: {
      screens: [
        {
          kind: 'image',
          src: `${IMG}/audit-log.png`,
          size: [1228, 728],
          alt: 'The Control Hub audit log with AI clients (Assistant, Copilot, ChatGPT, an agent) beside admin changes, and an event opened on the right: tagged AI activity, with the AI client, the change type, the configuration and its value change.',
        },
      ],
      caption: 'Audit log · AI changes beside people’s, each marked as AI activity · prototype',
    },
  },
];

export const outcome = {
  lede: 'A workflow an admin builds once, reads, and runs from the Assistant. How an admin asks, sees the plan, approves, watches it run and gets the result: that’s the layer I designed, and the part that survived every pivot.',
  facts: [
    { big: 'WebexOne', text: 'We tested the run in the Assistant there, and got good feedback.' },
    { big: 'Adopted', text: 'Then the PM and engineering adopted the workflow builder. In progress.' },
  ],
  diagramCaption: 'My layer, between the admin’s task and the workflows it runs',
} as const;

export const layers = v3Layers;

export const lessons = [
  {
    line: 'Prototype to decide.',
    text: 'An idea that meant something different to everyone became something the team could point at, and decide on.',
  },
  {
    line: 'Know what not to build.',
    text: 'We didn’t build a second agent builder, and I didn’t start a workflow builder from scratch. I built the part only Control Hub needed.',
  },
] as const;

export const credits = v3Credits;
