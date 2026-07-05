#!/usr/bin/env python3
"""
BuildspaceLabs imagery generator (Gemini image models via Vertex AI ADC or the
Developer API). Adapted from the organikally-landing pipeline.

Produces the art-directed source set in assets/media-work/gen-*.png, then run
scripts/build-media.py to crop + optimise into public/media/<slot>.webp.

Backends (auto-detected, in this order):
  1. Vertex AI (ADC)      — set GOOGLE_CLOUD_PROJECT (+ optional GOOGLE_CLOUD_LOCATION,
     default "global") and have working Application Default Credentials. This is the
     "ADC setup". Pass the project via --project, GOOGLE_CLOUD_PROJECT in the env, or
     a KEY=VALUE line in labs/.env.local.
  2. Gemini Developer API — needs a *billed* GEMINI_API_KEY (image models are not on
     the free tier). Read from the env or labs/.env.local.

Run with a venv that has google-genai + pillow (reuse the organikally one):
  PY=/Users/dissu/Documents/PP/Organikally/.venv-imagegen/bin/python
  $PY scripts/gen-images.py --list
  $PY scripts/gen-images.py --project MY_GCP_PROJECT           # generate missing only
  $PY scripts/gen-images.py --only home-hero,model-slm360
  $PY scripts/gen-images.py --force                            # regenerate everything
  $PY scripts/gen-images.py --model pro                        # gemini-3-pro-image-preview
"""
import argparse
import json
import os
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "media-work"
MANIFEST = Path(__file__).resolve().parent / "image-manifest.json"

MODELS = {"flash": "gemini-2.5-flash-image", "pro": "gemini-3-pro-image-preview"}

# One art direction for the whole set, so every page reads like one system, not a
# stock grab-bag. Appended to every prompt unless a slot overrides it via "style".
# Tuned to the site's dark-first, single-hue electric-blue "blueprint" design language.
STYLE = (
    "Dark, near-black studio background (#09090b deepening to #0d0d14), premium and "
    "cinematic. A single electric royal-blue accent — #3b82f6 with brighter #60a5fa "
    "highlights — and NOTHING else saturated: no purple, no cyan, no teal, no orange. "
    "A faint blueprint / graph-paper grid glowing softly in the darkness. Clean, precise, "
    "dimensional 3D product-render quality: matte-dark and frosted-glass surfaces, thin "
    "glowing wireframe edges, soft volumetric blue light, gentle bloom and fine film grain. "
    "Isometric or elegant three-quarter camera, calm and architectural, generous negative "
    "space, high-end AI-infrastructure brand aesthetic. Absolutely NO text, no words, no "
    "letters, no numbers, no logos, no watermark, no readable UI labels, no human faces."
)


def load_env(root: Path):
    """Best-effort load of labs/.env.local then .env into os.environ (no override)."""
    for name in (".env.local", ".env"):
        p = root / name
        if not p.exists():
            continue
        for line in p.read_text().splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            k, v = line.split("=", 1)
            os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))


def make_client(project_arg):
    from google import genai

    project = project_arg or os.environ.get("GOOGLE_CLOUD_PROJECT")
    api_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
    # Prefer Vertex whenever a project is supplied — a project signals Vertex intent
    # even if a stray Developer-API key is also present.
    if project:
        loc = os.environ.get("GOOGLE_CLOUD_LOCATION", "global")
        print(f"· backend: Vertex AI (ADC)  project={project}  location={loc}")
        return genai.Client(vertexai=True, project=project, location=loc)
    if api_key:
        print(f"· backend: Gemini Developer API (key {api_key[:6]}…)")
        return genai.Client(api_key=api_key)
    sys.exit(
        "No credentials. Pass --project <GCP_PROJECT> for Vertex (ADC), set "
        "GOOGLE_CLOUD_PROJECT, or put a billed GEMINI_API_KEY in labs/.env.local."
    )


def extract_image(resp):
    for cand in getattr(resp, "candidates", None) or []:
        content = getattr(cand, "content", None)
        for part in (getattr(content, "parts", None) or []):
            inline = getattr(part, "inline_data", None)
            if inline and getattr(inline, "data", None):
                return inline.data
    return None


def generate(client, model, item, force):
    from google.genai import types

    out = OUT / f"gen-{item['slot']}.png"
    if out.exists() and not force:
        print(f"  = gen-{item['slot']} exists (skip; --force to redo)")
        return True

    prompt = f"{item['prompt']}\n\n{item.get('style', STYLE)}"

    resp = None
    for attempt in range(6):
        try:
            resp = client.models.generate_content(
                model=model,
                contents=[prompt],
                config=types.GenerateContentConfig(response_modalities=["IMAGE"]),
            )
            break
        except Exception as e:  # noqa: BLE001 — surface any API/quota/perm error verbatim
            msg = str(e)
            if ("429" in msg or "RESOURCE_EXHAUSTED" in msg) and attempt < 5:
                wait = 20 + attempt * 15
                print(f"  … gen-{item['slot']} rate-limited, retry in {wait}s ({attempt + 1}/5)")
                time.sleep(wait)
                continue
            print(f"  x gen-{item['slot']} FAILED: {msg[:300]}")
            return False

    data = extract_image(resp)
    if not data:
        print(f"  x gen-{item['slot']}: no image in response")
        return False
    out.write_bytes(data)
    print(f"  + gen-{item['slot']}.png  ({len(data)//1024} KB)")
    return True


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--only", help="comma-separated slot names")
    ap.add_argument("--force", action="store_true", help="regenerate even if output exists")
    ap.add_argument("--model", choices=list(MODELS), default="flash")
    ap.add_argument("--project", help="GCP project id for Vertex AI (ADC)")
    ap.add_argument("--delay", type=float, default=8.0, help="seconds between requests (pacing)")
    ap.add_argument("--list", action="store_true", help="list slots and exit")
    args = ap.parse_args()

    items = json.loads(MANIFEST.read_text())["images"]
    if args.only:
        want = {s.strip() for s in args.only.split(",")}
        items = [i for i in items if i["slot"] in want]

    if args.list:
        for i in items:
            print(f"  {i['slot']:26} {i.get('aspect',''):6}  {i['prompt'][:64]}...")
        print(f"\n{len(items)} slots. Build after: python scripts/build-media.py")
        return

    load_env(ROOT)
    OUT.mkdir(parents=True, exist_ok=True)
    client = make_client(args.project)
    model = MODELS[args.model]
    print(f"· model: {model}   out: {OUT}\n")

    ok = 0
    for idx, item in enumerate(items):
        if idx:
            time.sleep(args.delay)
        ok += generate(client, model, item, args.force)
    print(f"\n✓ {ok}/{len(items)} generated. Next: python scripts/build-media.py")


if __name__ == "__main__":
    main()
