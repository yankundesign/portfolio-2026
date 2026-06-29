# Indigo FM

A late-night lo-fi radio web app — a single static page with a live waveform, an
animated gradient background, a karaoke-style synced transcript, and a 30s song
preview from Apple Music. Inspired by [Claudio FM](https://mmguo.dev/claudio-fm/).

## What's in here

```
my-radio/
├── index.html          ← the page
├── intro.mp3           ← DJ voiceover (generated)
├── intro.json          ← word-level timings (generated)
├── dj.svg              ← avatar
└── scripts/
    ├── script.txt      ← the DJ's lines (edit this!)
    ├── generate_dj.py  ← edge-tts → intro.mp3 + intro.json
    └── find_song.py    ← iTunes search helper
```

## Run locally

The page must be served over HTTP (not opened with `file://`) because it
`fetch()`es `intro.json`.

```bash
cd my-radio
python3 -m http.server 8000
# then open http://localhost:8000
```

## Customize the DJ's monologue

1. Edit `scripts/script.txt`.
2. Regenerate the audio:
   ```bash
   pip install edge-tts --break-system-packages
   cd scripts
   python3 generate_dj.py
   ```
   This produces `intro.mp3` (audio) and `intro.json` (word timings).
3. Reload the page. The transcript syncs to the new timings automatically.

To swap the DJ's voice, change `DJ_VOICE` near the top of `generate_dj.py`.
Browse the catalog with `edge-tts --list-voices`. Recommended:

| Voice | Vibe |
|---|---|
| `en-US-AvaMultilingualNeural` | warm, breathy (current) |
| `en-US-EmmaMultilingualNeural` | brighter, friendly |
| `en-GB-SoniaNeural` | British, late-night BBC |
| `en-US-AndrewNeural` | low, masculine |

## Swap the song

```bash
cd scripts
python3 find_song.py "bonobo black sands"
```

It prints a snippet you paste into the `SONG` config block at the top of the
`<script>` in `index.html`. Anything in the iTunes catalog with a public preview
will work.

> The 30s preview is streamed straight from Apple's CDN. That's the licensed
> path — keep the **Listen on Apple Music** link and don't mirror the audio.

## Deploy

This is a fully static site. Pick any of:

### Cloudflare Pages
1. Push the folder to a GitHub repo.
2. In Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git.
3. Build command: *(blank)*. Build output: `/`. Done.

### Netlify
```bash
npm i -g netlify-cli
netlify deploy --dir=. --prod
```

### Vercel
```bash
npm i -g vercel
vercel --prod
```

Or just drag the folder into Netlify Drop / Vercel's web UI.

## Notes & gotchas

- **Autoplay** is blocked on most browsers until the user clicks somewhere on
  the page. The first click anywhere starts both audio tracks.
- **CORS**: Apple's preview CDN sends permissive CORS headers, so the Web Audio
  analyser (which drives the live waveform) works. If you swap to a different
  audio host, the analyser may silently fall back to procedural-only mode.
- **Word timings** come from edge-tts's `WordBoundary` events — passed via
  the `boundary='WordBoundary'` parameter. Different voices emit slightly
  different boundary granularity.
- **Reduced motion**: gradient animations slow to 240s when
  `prefers-reduced-motion: reduce` is set.

## Credits

UI concept and architecture are adapted from
[mmguo.dev/claudio-fm](https://mmguo.dev/claudio-fm/). The original site's
tag-by-tag look has been re-styled here (palette, persona, copy) for an
original lo-fi station; reuse, fork, remix.
