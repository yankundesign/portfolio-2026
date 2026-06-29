"""
find_song.py — search iTunes for a song with a 30s preview, print the snippet
you can paste into index.html's SONG config.

Usage:
    python3 find_song.py "nujabes aruarian dance"

No API key required. The iTunes Search API is public and rate-limited to ~20 req/min.
"""
import json
import sys
import urllib.parse
import urllib.request


def search(term: str, limit: int = 5):
    qs = urllib.parse.urlencode({"term": term, "entity": "song", "limit": str(limit)})
    url = f"https://itunes.apple.com/search?{qs}"
    with urllib.request.urlopen(url, timeout=10) as r:
        return json.loads(r.read())["results"]


def main():
    if len(sys.argv) < 2:
        sys.exit('usage: python3 find_song.py "artist song"')
    term = " ".join(sys.argv[1:])
    results = search(term)
    if not results:
        sys.exit("no matches")

    print(f"\nTop {len(results)} matches for: {term}\n")
    for i, r in enumerate(results, 1):
        print(f"  [{i}] {r.get('trackName')} — {r.get('artistName')}")
        print(f"      preview: {r.get('previewUrl')}")
        print(f"      apple:   {r.get('trackViewUrl')}\n")

    pick = input("Pick a number (1): ").strip() or "1"
    r = results[int(pick) - 1]
    print("\n=== Paste into index.html SONG config ===\n")
    print(f"  title: {r.get('trackName')!r},")
    print(f"  subtitle: {r.get('trackName')} — {r.get('artistName')!r},")
    print(f"  previewUrl: {r.get('previewUrl')!r},")
    apple = r.get("trackViewUrl", "").split("&uo=")[0]  # trim tracking param
    print(f"  appleMusicUrl: {apple!r},\n")


if __name__ == "__main__":
    main()
