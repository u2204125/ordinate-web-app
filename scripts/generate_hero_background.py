import math
import os
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

WIDTH = 1920
HEIGHT = 1080
FRAMES = 120
FPS = 30
OUTPUT_DIR = Path(__file__).resolve().parent / "hero_frames"
OUTPUT_DIR.mkdir(exist_ok=True)

BASE_TOP = np.array([15, 17, 21], dtype=np.float32)
BASE_BOTTOM = np.array([25, 30, 38], dtype=np.float32)
CYAN = np.array([0, 209, 255], dtype=np.float32)
ACCENT_PURPLE = np.array([63, 32, 112], dtype=np.float32)

rng = np.random.default_rng(seed=42)


def mix(a: np.ndarray, b: np.ndarray, t: np.ndarray) -> np.ndarray:
    if t.ndim == 2:
        t = t[..., None]
    return a + (b - a) * t


for frame in range(FRAMES):
    progress = frame / FRAMES
    gradient = np.linspace(0.0, 1.0, HEIGHT, dtype=np.float32)
    gradient = np.repeat(gradient[:, None], WIDTH, axis=1)

    base = mix(BASE_TOP, BASE_BOTTOM, gradient)

    phase = progress * 2 * math.pi
    x = np.linspace(0.0, 1.0, WIDTH, dtype=np.float32)
    x_grid = np.repeat(x[None, :], HEIGHT, axis=0)
    wave = 0.5 * (np.sin((x_grid * 6.0 + phase) * math.pi) + 1.0)
    wave_height = (0.35 + 0.25 * np.sin((gradient * 4.0 + progress * 2.0) * math.pi)).clip(0.0, 1.0)

    cyan_layer = mix(base, CYAN, (wave * wave_height) * 0.25)
    purple_layer = mix(cyan_layer, ACCENT_PURPLE, (1 - wave) * 0.2)

    # Add subtle noise texture.
    noise = rng.random((HEIGHT, WIDTH, 3), dtype=np.float32) - 0.5
    texture = purple_layer + noise * 12
    texture = np.clip(texture, 0, 255).astype(np.uint8)

    img = Image.fromarray(texture, mode="RGB")
    glow = img.filter(ImageFilter.GaussianBlur(radius=18))
    img = Image.blend(img, glow, alpha=0.25)

    draw = ImageDraw.Draw(img)
    line_y = HEIGHT * (0.35 + 0.25 * math.sin(progress * 2 * math.pi))
    for offset in (-30, 0, 30):
        alpha = 0.6 if offset == 0 else 0.35
        draw.line(
            [(0, line_y + offset), (WIDTH, line_y - offset * 0.2)],
            fill=(0, int(209 * alpha), int(255 * alpha)),
            width=3 if offset == 0 else 1,
        )

    file_path = OUTPUT_DIR / f"frame_{frame:04d}.png"
    img.save(file_path, quality=92)

poster_path = Path(__file__).resolve().parent.parent / "public" / "hero-bg.jpg"
poster_source = Image.open(OUTPUT_DIR / "frame_0000.png")
poster_source.save(poster_path, quality=92)

print(f"Generated {FRAMES} frames to {OUTPUT_DIR}")
print(f"Poster saved to {poster_path}")
