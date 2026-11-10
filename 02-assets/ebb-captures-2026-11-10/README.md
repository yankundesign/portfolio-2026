# Ebb captures — 2026-11-10

Raw screens behind the November 2026 case-study refresh. Every screen was rendered by
Ebb's own code at the submitted source (`screen-time` HEAD, no app-source change since
`752b68a` "Build 1.0 (2)"), in the iOS Simulator on an iPhone 16 Pro (1206 × 2622),
status bar overridden to 9:41 with full battery and no charging glyph.

## How they were made

- **Build.** Debug build from a scratch copy of the repo. One capture-only change, never
  committed: `InterceptSession` reads `EBB_CAPTURE_PATTERN` so a recording can name the
  breath pattern instead of drawing it at random. Drawing, timing, copy and haptics are untouched.
- **Simulators.** iOS 27.0 (two-step guide, six pictures) and iOS 26.4 (three-step guide,
  ten pictures). Ebb picks the path from the running iOS version.
- **Installed apps.** The simulator has no TikTok or Instagram. Two stub apps that claim the
  `tiktok` and `instagram` URL schemes make `canOpenURL` true, so S1 lists both and Home
  shows "Add an app" as it does on a real phone.
- **Record.** 23 events, 60% turned back, over 14 days, written with the same spacing as the
  Debug QA harness's "Seed events", with the newest event 11 minutes old so the pause gets
  rule 5, "Three breaths, then in."
- **Intercepts** were triggered with `com.yankunwang.ebb://intervene?target=tiktok`, the same
  path the App Intent's gate hands to the app.
- **Setup-picture stills** were taken with Reduce Motion on, which shows each picture's
  designed still frame: the ring and the result at rest, no fingertip (design.md §7).
- **Video frames** came out of the simulator in Display P3 and were converted to sRGB.

## Contents

- `screens/` — S0, S1, S3, S3 armed, S3a and both iOS 27 fixes, Home (15 / 9), S5 Tide
  mid-pause and unlocked, S6 Turned back.
- `setup-pictures-ios26/`, `setup-pictures-ios27/` — every S2 picture, in order.
- `breath-patterns-seven/` — all seven patterns (Wind included) from the submitted build, one
  pause in step, 1920 × 1200. Replaced on the page by the six-pattern Marketing cut; kept here.
- `plates-not-used/` — plates built for the refresh and then dropped from the page: the
  setup before/after video, the single-phone setup flow, the recovery screens, S2 before the guide, the
  iOS 27 pictures, and S0 before/after.
- `before-setup-guide/` — S0 and S2 from `5dc9bba`, the commit before the drawn guide
  landed (`39ccda8`), built and captured the same way.
- `canvas-mockup-ebb-staged.png` — the canvas tile with current screens. Promoted to
  `site/public/canvas/mockups/ebb.png` on 2026-11-10, with the rebuilt hover preview
  (`02-assets/ebb-preview-motion/next/`).

Not captured here: the real-device intercept loop (fig. 03, `video.MP4`). It shows the
Home Screen, TikTok's launch and the gate on a phone, which the simulator can't reproduce.
