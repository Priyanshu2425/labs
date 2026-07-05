#!/usr/bin/env python3
"""
Crop + optimise the raw generated set (assets/media-work/gen-<slot>.png) into the
committed deploy artifact public/media/<slot>.webp. Reproducible — safe to re-run.

Each slot's target aspect + output width come straight from scripts/image-manifest.json,
so there is one source of truth. Images are centre-cropped to the aspect, resized with
Lanczos, given a whisper-light grade, and written as high-quality WebP.

  PY=/Users/dissu/Documents/PP/Organikally/.venv-imagegen/bin/python
  $PY scripts/build-media.py                    # rebuild all that have a raw source
  $PY scripts/build-media.py home-hero model-slm360   # rebuild just these slots
"""
import json
import sys
from pathlib import Path

from PIL import Image, ImageEnhance

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "media-work"
OUT = ROOT / "public" / "media"
MANIFEST = Path(__file__).resolve().parent / "image-manifest.json"


def parse_aspect(a: str):
    if not a or ":" not in a:
        return None
    w, h = a.split(":")
    return int(w) / int(h)


def center_crop(img: Image.Image, target_ratio: float) -> Image.Image:
    w, h = img.size
    ratio = w / h
    if abs(ratio - target_ratio) < 1e-3:
        return img
    if ratio > target_ratio:  # too wide -> trim width
        new_w = int(round(h * target_ratio))
        x0 = (w - new_w) // 2
        return img.crop((x0, 0, x0 + new_w, h))
    new_h = int(round(w / target_ratio))  # too tall -> trim height
    y0 = (h - new_h) // 2
    return img.crop((0, y0, w, y0 + new_h))


def build(item) -> bool:
    slot = item["slot"]
    src = SRC / f"gen-{slot}.png"
    if not src.exists():
        return False
    ratio = parse_aspect(item.get("aspect", "")) or None
    out_w = int(item.get("width", 1200))

    img = Image.open(src).convert("RGB")
    if ratio:
        img = center_crop(img, ratio)
    if img.width > out_w:
        out_h = int(round(out_w * img.height / img.width))
        img = img.resize((out_w, out_h), Image.LANCZOS)

    # Whisper-light grade so the whole set reads as one shoot.
    img = ImageEnhance.Color(img).enhance(1.04)
    img = ImageEnhance.Contrast(img).enhance(1.02)

    OUT.mkdir(parents=True, exist_ok=True)
    dst = OUT / f"{slot}.webp"
    img.save(dst, "WEBP", quality=88, method=6)
    print(f"  + media/{slot}.webp  {img.width}x{img.height}  ({dst.stat().st_size//1024} KB)")
    return True


def main():
    items = json.loads(MANIFEST.read_text())["images"]
    want = set(sys.argv[1:])
    if want:
        items = [i for i in items if i["slot"] in want]
    built = sum(build(i) for i in items)
    print(f"\n✓ {built} image(s) written to {OUT}")


if __name__ == "__main__":
    main()
