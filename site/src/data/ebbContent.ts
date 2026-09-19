import type { Figure, ProseSlot } from './chaiContent';

/**
 * Ebb case study content.
 *
 * Product facts and quoted prose are source-locked to the current iOS
 * project in /Users/yankunwang/screen-time: v0-product-brief.md, design.md,
 * and README.md.
 */

export const header = {
  figNumber: 'fig. 05',
  title: 'Ebb',
  subtitle: 'A pause between the tap and the feed — that knows when you\'re in a loop.',
  yearRange: 'July 2026',
  context: 'Independent iOS app',
  role: 'Designed & built by me',
  primaryAction: {
    label: 'Download on the  App Store',
    statusLabel: 'App Store release',
    statusMessage: 'Ebb is built. Its App Store release is still in progress, so it is not available to download yet.',
  },
  heroImage: {
    src: '/images/ebb/hero.png',
    alt: 'Ebb iOS product overview showing the intercept, home record, and calm-room states.',
  },
} as const;

export const sections = [
  { id: 'why', label: 'Why Ebb exists' },
  { id: 'what', label: 'What Ebb is' },
  { id: 'works', label: 'How it works' },
  { id: 'visual-system', label: 'Visual system' },
  { id: 'build', label: 'How I built it' },
] as const;

export const prose: Record<'why' | 'what' | 'works' | 'visualSystem' | 'build', ProseSlot> = {
  why: [
    "Opening TikTok is not a decision, it's a motor sequence. By the time you notice, you're 30 minutes in.",
    'The strongest evidence in this space (Grüning et al., PNAS 2023) shows a few seconds of friction at the moment of the tap causes people to abandon roughly one in three app openings. But the same team\'s longitudinal follow-up (CHI 2024, N=1,039) found the effect habituates — the pause screen becomes wallpaper, and users rebound after breaks.',
  ],
  what: [
    'Ebb is a personal iOS app that inserts three breaths between opening TikTok or Instagram and entering the feed.',
    'Every choice is recorded honestly, without streaks, guilt, or fabricated “time saved.”',
  ],
  works: [
    'A Shortcuts automation calls an on-device gate, the gate decides whether to intervene, and Ebb offers two choices after the pause: turn back or continue. The gate runs before Ebb foregrounds. Suppressed opens end silently, preventing the re-trigger loop that can happen when an automation opens another app.',
    'Three breaths every time: 12 seconds normally and 18 seconds when a cross-app loop is detected.',
  ],
  visualSystem: [
    'A progress bar frames the pause as a toll: you owe me eight seconds. That framing guarantees the pause is endured, and endurance habituates faster than anything. In Tide, the same seconds are spent drawing your mark onto a line that already holds every pause you have taken. Identical duration, opposite meaning — waiting becomes depositing.',
    'Ebb is not a wellness app. It does not praise, shame, moralize, or promise outcomes. It invites a specific, bounded action — three breaths — and then gets out of the way.',
    'Turn back is live from millisecond zero, one tap. Continue is visible from the first frame in muted, in its final position, but is not tappable until the three breaths complete. Turning back must always be the cheapest action on screen.',
  ],
  build: [
    'I designed and built Ebb in two weeks. I started by testing the hardest constraint first: could an iPhone intercept a feed opening early enough to create a designed pause, without a server or Screen Time entitlement? The answer was a Shortcuts automation, an on-device App Intent, and a deliberately narrow product boundary. That technical constraint became the shape of the experience.',
    'Claude and Codex compressed the path from product brief to working software. I used them to pressure-test the concept, turn the architecture into small verifiable steps, build the SwiftUI app, and run parallel reviews across logic, accessibility, copy, and visual QA. I owned the thesis, the interaction rules, the visual direction, and every decision about what the app should refuse to become.',
    'Fourteen days later, Ebb had a real gate, loop detection, three-breath timing, an honest event record, haptics, onboarding, and a debug QA harness. The result is more than a prototype: it is a working app and a demonstration of how I design with AI — not by handing over the problem, but by making decisions precise enough that people and agents can carry them all the way into code.',
  ],
};

export const figures = {
  productFrames: {
    src: '/images/ebb/02-product-four-frames.png',
    caption: 'fig. 02 · Open → pause → choose → see the mark land',
    alt: 'Four Ebb screens showing the complete product loop from opening a feed to recording the choice.',
    width: 'column',
  },
  tollVsMark: {
    src: '/images/ebb/06-toll-vs-mark.png',
    caption: 'fig. 06 · Identical duration, opposite meaning: waiting versus depositing a mark',
    alt: 'Comparison of a conventional countdown progress bar with Ebb drawing a personal mark into the record.',
    width: 'column',
  },
  interceptScreen: {
    src: '/images/ebb/07-intercept-screen.png',
    caption: 'fig. 07 · The intercept screen — three breaths, one live mark, two asymmetric choices',
    alt: 'Full Ebb intercept screen with a breathing wave, Turn back action, and muted Continue action.',
    width: 'wide',
  },
} satisfies Record<string, Figure>;

export interface VideoFigure {
  sources: readonly {
    src: string;
    type: 'video/webm' | 'video/mp4';
  }[];
  caption: string;
  alt: string;
  backgroundSrc?: string;
  width?: 'column' | 'medium' | 'wide';
}

export const interceptLoop: VideoFigure = {
  sources: [
    { src: '/images/ebb/video.MP4', type: 'video/mp4' },
  ],
  caption: 'fig. 03 · The real loop — gate, foreground, three breaths, choice',
  alt: 'Silent recording of Ebb intercepting a feed opening and drawing a wave across three breaths.',
  backgroundSrc: '/images/ebb/video_bg.png',
  width: 'column',
};
