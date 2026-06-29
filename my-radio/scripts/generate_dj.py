"""
generate_dj.py — turn script.txt into intro.mp3 + intro.json (word timings) using edge-tts.

Usage:
    pip install edge-tts --break-system-packages
    python3 generate_dj.py

Outputs (sibling of index.html):
    intro.mp3   — narrated audio
    intro.json  — { words: [{word, start, end}, ...], duration }

To browse voices:    edge-tts --list-voices | grep en-US
To swap the voice:   change DJ_VOICE below.
"""
import asyncio
import json
import pathlib
import sys

import edge_tts

# en-US-AvaMultilingualNeural — warm, breathy. Late-night-radio fit.
# Other picks: en-US-EmmaMultilingualNeural, en-GB-SoniaNeural, en-US-AndrewNeural.
DJ_VOICE = "en-US-AvaMultilingualNeural"
DJ_RATE = "-8%"     # slightly slower for that intimate cadence
DJ_PITCH = "-2Hz"

ROOT = pathlib.Path(__file__).resolve().parent
SCRIPT_PATH = ROOT / "script.txt"
OUT_DIR = ROOT.parent
MP3_PATH = OUT_DIR / "intro.mp3"
JSON_PATH = OUT_DIR / "intro.json"


async def main() -> None:
    if not SCRIPT_PATH.exists():
        sys.exit(f"missing {SCRIPT_PATH}")

    text = SCRIPT_PATH.read_text(encoding="utf-8").strip()
    if not text:
        sys.exit("script.txt is empty")

    print(f"voice:  {DJ_VOICE}")
    print(f"rate:   {DJ_RATE}")
    print(f"pitch:  {DJ_PITCH}")
    print(f"output: {MP3_PATH}")

    communicate = edge_tts.Communicate(
        text, DJ_VOICE, rate=DJ_RATE, pitch=DJ_PITCH, boundary="WordBoundary"
    )

    audio_chunks: list[bytes] = []
    words: list[dict] = []
    last_end = 0.0

    async for chunk in communicate.stream():
        kind = chunk.get("type")
        if kind == "audio":
            audio_chunks.append(chunk["data"])
        elif kind == "WordBoundary":
            # offset/duration are in 100-ns ticks (edge-tts inherits this from MS speech SDK)
            start = chunk["offset"] / 1e7
            duration = chunk["duration"] / 1e7
            end = start + duration
            words.append({"word": chunk["text"], "start": round(start, 3), "end": round(end, 3)})
            last_end = max(last_end, end)

    MP3_PATH.write_bytes(b"".join(audio_chunks))

    JSON_PATH.write_text(
        json.dumps({"words": words, "duration": round(last_end + 0.4, 3)}, indent=2),
        encoding="utf-8",
    )

    size_kb = MP3_PATH.stat().st_size / 1024
    print(f"done — {size_kb:.1f} KB, {len(words)} words, {last_end:.2f}s")


if __name__ == "__main__":
    asyncio.run(main())
