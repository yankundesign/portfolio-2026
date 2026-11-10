import type { Figure, ProseSlot } from './chaiContent';

/**
 * Ebb case study content.
 *
 * Product facts are source-locked to the iOS project in
 * /Users/yankunwang/screen-time: v0-product-brief.md, design.md, and README.md.
 *
 * November 2026 refresh: current screens, plus the Breath patterns and Setup
 * guide chapters, assembled from Yankun's deck speaker notes (slides 40, 47,
 * 48) and the design docs. Sentence sources:
 * `Claude outputs/ebb-copy-draft-2026-11-10.md`. Screens were captured from the
 * submitted build; provenance in 02-assets/ebb-captures-2026-11-10/.
 */

export const header = {
  figNumber: 'fig. 05',
  title: 'Ebb',
  subtitle: 'A pause between the tap and the feed — that knows when you\'re in a loop.',
  yearRange: 'July – November 2026',
  context: 'Independent iOS app',
  role: 'Designed & built by me',
  primaryAction: {
    label: 'Download on the  App Store',
    statusLabel: 'App Store release',
    statusMessage: 'Ebb went to App Review on November 9. It isn\'t on the App Store yet.',
  },
  heroImage: {
    src: '/images/ebb/hero.png',
    alt: 'Ebb on iPhone: Home, with a record of 15 turned back and 9 went in, beside the pause screen reading “Three breaths, then in.”',
  },
} as const;

export const sections = [
  { id: 'why', label: 'Why Ebb exists' },
  { id: 'what', label: 'What Ebb is' },
  { id: 'works', label: 'How it works' },
  { id: 'visual-system', label: 'Visual system' },
  { id: 'patterns', label: 'Breath patterns' },
  { id: 'setup', label: 'Setup guide' },
  { id: 'build', label: 'How I built it' },
] as const;

type ProseKey =
  | 'why'
  | 'what'
  | 'works'
  | 'visualSystem'
  | 'patterns'
  | 'setupProblem'
  | 'setupDrawn'
  | 'setupRecovery'
  | 'build';

export const prose: Record<ProseKey, ProseSlot> = {
  why: [
    "Opening TikTok is not a decision, it's a motor sequence. By the time you notice, you're 30 minutes in.",
    'The strongest evidence in this space (Grüning et al., PNAS 2023) shows a few seconds of friction at the moment of the tap causes people to abandon roughly one in three app openings. A larger follow-up (CHI 2024, N=1,039) saw the same shape: most of the change comes in the first three weeks, then it levels off, and users rebound after breaks.',
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
    'A progress bar frames the pause as a toll: you owe me twelve seconds. That framing guarantees the pause is endured, and endurance habituates faster than anything. In Tide, the same seconds are spent drawing your mark onto a line that already holds every pause you have taken. Identical duration, opposite meaning — waiting becomes depositing.',
    'Ebb is not a wellness app. It does not praise, shame, moralize, or promise outcomes. It invites a specific, bounded action — three breaths — and then gets out of the way.',
    'Turn back is live from millisecond zero, one tap. Continue is visible from the first frame in muted, in its final position, but is not tappable until the three breaths complete. Turning back must always be the cheapest action on screen.',
  ],
  // Source: deck slide 47 notes and credit notes, cut to two paragraphs (2026-11-10).
  patterns: [
    'After a few weeks, I’d stopped seeing the breath. So I set rules first: same three breaths, same haptics, and it has to look drawn on paper. My reference was a radio drawn in typed characters. I wanted its idea, tone made from many marks, not its look.',
    'An agent drafted options. I set aside typed characters, ribbons and moiré, and cut two more after prototyping. I’d ruled out breathing circles; the agent brought three back, and I kept them because they’re made only of strokes. Six held up.',
  ],
  // Source: deck slide 48 notes and "if asked" answers.
  setupProblem: [
    'It works for me. But for anyone else, setup comes first. Setup used to be three lines of text. They hide about ten taps in another app, and that’s where I’d expect people to get stuck: Automation → App → Run Immediately.',
    'So I drew each tap. A ring finds the button, a finger presses it, and you see what changes.',
  ],
  // Source: deck "if asked why drawings"; design.md Rev 11 and v0 brief §13.
  setupDrawn: [
    'Drawings, not screenshots. They fit the app’s look, ink on paper, and screenshots need reshooting for every language. Apple updates hit both: when iOS 27 moved automations inside shortcuts, I redrew the guide as two steps and six pictures, and Ebb picks the path by the running iOS version.',
    'I also prototyped a floating guide that followed you into Shortcuts, and cut it from v1.0: picture in picture needs an audio session, and I chose not to add one.',
  ],
  // Source: deck "if asked what happens when setup fails"; slide 48 notes.
  setupRecovery: [
    'When setup fails, Ebb asks what happened: a notification asked first, the app opened as usual, or I got lost in Shortcuts. Then it shows the one fix. If the automation points at the wrong app, it says which.',
  ],
  build: [
    'I designed and built Ebb in two weeks. I started by testing the hardest constraint first: could an iPhone intercept a feed opening early enough to create a designed pause, without a server or Screen Time entitlement? The answer was a Shortcuts automation, an on-device App Intent, and a deliberately narrow product boundary. That technical constraint became the shape of the experience.',
    'Claude and Codex compressed the path from product brief to working software. I used them to pressure-test the concept, turn the architecture into small verifiable steps, build the SwiftUI app, and run parallel reviews across logic, accessibility, copy, and visual QA. I owned the thesis, the interaction rules, the visual direction, and every decision about what the app should refuse to become.',
    'Fourteen days later, Ebb had a real gate, loop detection, three-breath timing, an honest event record, haptics, onboarding, and a debug QA harness. Over the next three months I added the breath patterns and the setup guide, and on November 9 I submitted it to App Review. That is how I design with AI — not by handing over the problem, but by making decisions precise enough that people and agents can carry them all the way into code.',
  ],
};

export const figures = {
  productFrames: {
    src: '/images/ebb/02-product-four-frames.png',
    caption: 'Open → pause → choose → see the mark land',
    alt: 'Three phones: TikTok launching, Ebb’s pause reading “Three breaths, then in.”, and “Turned back.” with the new mark on the record.',
    width: 'column',
  },
  record: {
    src: '/images/ebb/06-toll-vs-mark.png',
    caption: 'Armed, turned back, and the record it joins — a mark, not a score',
    alt: 'Three Ebb screens: “TikTok is armed.”, “Turned back.” with the newest mark at the end of the trace, and Home showing 15 turned back, 9 went in.',
    width: 'column',
  },
  interceptScreen: {
    src: '/images/ebb/07-intercept-screen.png',
    caption: 'The intercept screen — three breaths, one live mark, two asymmetric choices',
    alt: 'Full Ebb intercept screen: “Three breaths, then in.”, the breath drawn as a heavy ink wave over faint history ticks, Turn back underlined, Continue muted.',
    width: 'wide',
  },
  setupPictures: {
    src: '/images/ebb/setup-pictures-ios26.png',
    caption: 'Ten taps, ten pictures — the iOS 26 path at rest',
    alt: 'All ten iOS 26 setup pictures in order: each a line drawing of one Shortcuts screen with a red ring around the control to tap, and one caption in Shortcuts’ own words.',
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
  /** Still shown before playback and to reduced-motion visitors. */
  poster?: string;
  backgroundSrc?: string;
  width?: 'column' | 'medium' | 'wide';
}

export const interceptLoop: VideoFigure = {
  sources: [
    { src: '/images/ebb/video.MP4', type: 'video/mp4' },
  ],
  caption: 'The real loop — gate, foreground, three breaths, choice',
  alt: 'Silent recording of Ebb intercepting a feed opening and drawing a wave across three breaths.',
  backgroundSrc: '/images/ebb/video_bg.png',
  width: 'column',
};

export const breathPatterns: VideoFigure = {
  sources: [
    { src: '/images/ebb/breath-patterns-six.webm', type: 'video/webm' },
    { src: '/images/ebb/breath-patterns-six.mp4', type: 'video/mp4' },
  ],
  caption: 'Six patterns, one pause — Tide, Ruling, Comb; Bezel, Hatch, Ripple',
  alt: 'Six breath patterns drawing the same twelve-second pause in step: three line patterns above, three circle patterns below, each with one red seal at its live edge.',
  poster: '/images/ebb/breath-patterns-six-poster.png',
  width: 'wide',
};

export const setupFlow: VideoFigure = {
  sources: [
    { src: '/images/ebb/setup-taps-loop.webm', type: 'video/webm' },
    { src: '/images/ebb/setup-taps-loop.mp4', type: 'video/mp4' },
  ],
  caption: 'Each tap, drawn: a ring finds it, a finger presses, the result appears',
  alt: 'Ebb’s setup screen, “Three steps in Shortcuts.”, playing three drawn taps in turn: a red ring finds Run Immediately and the checkmark moves to it, then Next, then New Blank Automation.',
  poster: '/images/ebb/setup-taps-loop-poster.png',
  backgroundSrc: '/images/ebb/video_bg.png',
  width: 'column',
};
