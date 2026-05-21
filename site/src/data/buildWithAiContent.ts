import type { Figure } from './chaiContent';

export const header = {
  figNumber: 'fig. 03',
  title: 'Build with AI',
  subtitle: 'AI-native design practice, internal tools, and team influence.',
  yearRange: '2025 - present',
  context: 'Cisco Webex · self-initiated tools',
  role: 'Product Designer + builder',
  heroImage: {
    src: '/canvas/mockups/build-with-ai.png',
    alt: 'Build with AI project preview on the portfolio canvas.',
  },
} as const;

export const sections = [
  { id: 'opening', label: 'Opening' },
  { id: 'tools', label: 'Tools' },
  { id: 'team-impact', label: 'Team Impact' },
  { id: 'method', label: 'Method' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'closing', label: 'Bring' },
] as const;

export const openingProse = [
  'I use AI as a design material: to prototype faster, clarify systems, build internal tools, and help teams learn new ways of making.',
  'The important part is not that AI is in the process. The important part is judgment: knowing when to generate, when to constrain, when to build, and when to slow down because trust is the product.',
] as const;

export const evidenceIndex = [
  {
    label: 'Product AI',
    text: 'Designing assistant and agentic experiences inside Webex Control Hub.',
  },
  {
    label: 'Internal Tools',
    text: 'Building Figma plugins and small apps around real team bottlenecks.',
  },
  {
    label: 'Team Practice',
    text: 'Sharing vibe-coding patterns so other designers can move from idea to prototype.',
  },
  {
    label: 'Craft Proof',
    text: 'Building this portfolio with AI-assisted implementation under a strict visual system.',
  },
] as const;

export const figures = {
  wlwIntro: {
    src: '/images/build-with-ai/wlw-intro.png',
    caption: 'Write Like Webex - Figma plugin for Webex voice and tone',
    alt: 'Write Like Webex project mockup showing the Figma plugin in context.',
    width: 'column',
  },
  wlwFlow: {
    src: '/images/build-with-ai/wlw-flow.gif',
    caption: 'Write Like Webex - generating and comparing variants in the design workflow',
    alt: 'Animated walkthrough of Write Like Webex generating and comparing UI copy variants from a selected Figma text layer.',
    width: 'column',
  },
  wlwSolution: {
    src: '/images/build-with-ai/wlw-solution.png',
    caption: 'Solution - select a layer, set intent, compare variants, and apply',
    alt: 'Write Like Webex solution screen showing intent, tone, audience, generated variants, and apply controls.',
    width: 'column',
  },
  wlwGuidelineSystem: {
    src: '/images/build-with-ai/wlw-guideline-system.png',
    caption: 'Guideline system - PDFs distilled into versioned voice-and-tone rules',
    alt: 'Write Like Webex guideline system showing source documents distilled into a structured guideline specification.',
    width: 'column',
  },
  studioSyncOne: {
    src: '/images/build-with-ai/studio-sync-1.png',
    caption: 'Studio Sync - decision tracker opening surface',
    alt: 'Studio Sync opening surface for tracking design decisions.',
    width: 'column',
  },
  studioSyncTwo: {
    src: '/images/build-with-ai/studio-sync-2.png',
    caption: 'Studio Sync - decision detail and context',
    alt: 'Studio Sync detail screen showing a design decision and surrounding context.',
    width: 'column',
  },
  testimonialOne: {
    src: '/images/build-with-ai/testimonial-1.png',
    caption: 'Team feedback - vibe coding shareout',
    alt: 'Screenshot of team feedback about Yankun sharing vibe coding insights.',
    width: 'column',
  },
  testimonialTwo: {
    src: '/images/build-with-ai/testimonial-2.png',
    caption: 'Team feedback - AI exploration',
    alt: 'Screenshot of team feedback about Yankun exploring AI approaches and sharing learnings.',
    width: 'column',
  },
  testimonialThree: {
    src: '/images/build-with-ai/testimonial-3.png',
    caption: 'Team feedback - admin AI impact',
    alt: 'Screenshot of team recognition for Yankun enabling admins to use AI confidently.',
    width: 'column',
  },
  testimonialFour: {
    src: '/images/build-with-ai/testimonial-4.png',
    caption: 'Team feedback - AI-first team contribution',
    alt: 'Screenshot of team feedback about Yankun contributing to AI-first team practice.',
    width: 'column',
  },
  testimonialFive: {
    src: '/images/build-with-ai/testimonial-5.png',
    caption: 'Team feedback - building practice',
    alt: 'Screenshot of team feedback about Yankun helping teammates approach AI-assisted building.',
    width: 'column',
  },
  testimonialSix: {
    src: '/images/build-with-ai/testimonial-6.png',
    caption: 'Team feedback - AI momentum',
    alt: 'Screenshot of team feedback about Yankun creating AI momentum for the team.',
    width: 'column',
  },
} as const satisfies Record<string, Figure>;

export const writeLikeWebex = {
  eyebrow: 'Focus tool',
  title: 'Write Like Webex',
  intro:
    'A Figma plugin that rewrites UI copy to match Webex voice and tone directly inside the design workflow.',
  info: [
    {
      label: 'Role',
      body: 'Designer + builder',
    },
    {
      label: 'Medium',
      body: 'Figma plugin',
    },
    {
      label: 'Practice',
      body: 'Vibe-building',
    },
  ],
  problem: [
    {
      label: 'Problem',
      body: 'Webex design team lost dedicated content design support.',
    },
    {
      label: 'Rework',
      body: 'Copy inconsistencies caused late content-review edits and layout rework.',
    },
    {
      label: 'Need',
      body: 'Designers needed a fast way to explore variants while respecting UI constraints.',
    },
  ],
  solution:
    'Select a text layer → choose intent/tone/audience → generate 2–3 variants → compare → apply.',
  guidelineSystem: {
    title: 'Guideline system',
    body: '50 PDFs → distilled into versioned guidelines-v1.json',
  },
  next:
    'Next: turn the guideline system into an agent skill for Cursor, Codex, and Claude Code.',
  learnings: [
    {
      label: 'Impact',
      body: '56 designers tried it.',
    },
    {
      label: 'Learning',
      body: 'A structured guideline spec beats a giant prompt for consistency.',
    },
  ] as const,
} as const;

export const studioSync = {
  title: 'Studio Sync',
  description:
    'A design documentation app for tracking decisions in a warmer, editorial mode instead of the usual clinical SaaS shell.',
  note:
    'The useful signal is not the app size. It is the habit: find a team workflow with friction, make a working artifact, and use it to change the conversation.',
  figures: ['studioSyncOne', 'studioSyncTwo'] as const,
} as const;

export const teamImpactProse = [
  'The work also became a team contribution. I shared what I was learning, helped teammates understand vibe coding, and turned AI experiments into examples the team could react to.',
  'For hiring managers, this is the signal I would pay attention to: AI work is most valuable when it changes how a team learns together.',
] as const;

export const testimonialFigures = [
  'testimonialOne',
  'testimonialTwo',
  'testimonialThree',
  'testimonialFour',
  'testimonialFive',
  'testimonialSix',
] as const;

export const teamContributions = [
  'Made AI prototyping approachable for designers who were curious but unsure where to start.',
  'Shared working examples instead of abstract AI opinions.',
  'Helped the team connect AI exploration back to enterprise trust, workflow clarity, and user value.',
] as const;

export const methodSteps = [
  {
    title: 'Start with a workflow bottleneck',
    body:
      'The strongest AI ideas begin with a real repeated pain: copy cleanup, decision tracking, QA review, or admin troubleshooting.',
  },
  {
    title: 'Write the constraints first',
    body:
      'I define voice, system rules, data boundaries, and failure modes before asking AI or code to produce anything.',
  },
  {
    title: 'Prototype until the conversation changes',
    body:
      'A working artifact lets partners react to behavior, not speculation. That is where useful feedback starts.',
  },
  {
    title: 'Turn the learning into team practice',
    body:
      'The output is not only a tool. It is a reusable pattern, prompt structure, critique standard, or new way of collaborating.',
  },
  {
    title: 'Keep human judgment in the loop',
    body:
      'AI can accelerate the material work. It does not replace product judgment, design taste, or the responsibility to know what should ship.',
  },
] as const;

export const portfolioProse = [
  'This portfolio is also part of the evidence. I built it as a working demonstration of AI-assisted craft: faster implementation, but with strict art direction, plain CSS, and a locked editorial system.',
  'I used AI to move through code, layout iteration, and debugging. I did not use it to choose the projects, define the visual language, or lower the quality bar for what counts as finished.',
] as const;

export const portfolioStack = [
  {
    label: 'Stack',
    body: 'Vite, React, TypeScript, CSS Modules, self-hosted fonts, Cloudflare Pages.',
  },
  {
    label: 'Visual contract',
    body: 'Two colors, Fraunces and JetBrains Mono, editorial plates, paper grain, no CSS framework.',
  },
  {
    label: 'AI role',
    body: 'Implementation partner for building, testing, comparing, and tightening interaction details.',
  },
  {
    label: 'Human role',
    body: 'Project judgment, writing standards, composition, final taste, and what not to automate.',
  },
] as const;

export const closingPillars = [
  {
    title: 'AI product judgment',
    body: 'I can design assistant and agentic experiences that earn trust in enterprise workflows.',
  },
  {
    title: 'Builder fluency',
    body: 'I can prototype beyond static screens and make technical ideas concrete before a full engineering cycle.',
  },
  {
    title: 'Internal toolmaking',
    body: 'I can spot team friction and build small, useful systems that reduce repeated work.',
  },
  {
    title: 'Team enablement',
    body: 'I can help a design team develop AI habits without turning craft into automation theater.',
  },
] as const;
