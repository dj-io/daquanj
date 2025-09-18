#!/bin/bash
# Simple, reliable in-place GIF compression with FFmpeg
set -euo pipefail
shopt -s nullglob

TARGET_DIR="${1:-./public/changelog/0.1.11}"
TARGET_WIDTH="${TARGET_WIDTH:-600}"
TARGET_FPS="${TARGET_FPS:-12}"
MAX_COLORS="${MAX_COLORS:-128}"

if [ ! -d "$TARGET_DIR" ]; then
  echo "Usage: bun run compress-gifs"
  exit 1
fi

echo "🚀 Compressing GIFs in $TARGET_DIR ..."
for gif in "$TARGET_DIR"/*.gif; do
  base="$(basename "$gif")"
  echo "⚡ compressing $base"

  pal="$(mktemp -t palette-XXXX)".png
  tmp="$(mktemp -t "${base%.gif}-XXXX")".gif

  # Size before
  original_size=$(du -h "$gif" | cut -f1)
  original_bytes=$(wc -c < "$gif")

  # 1) Generate palette
  ffmpeg -v error -y -i "$gif" \
    -f image2 -vcodec png \
    -vf "fps=${TARGET_FPS},scale=${TARGET_WIDTH}:-1:flags=lanczos,palettegen=max_colors=${MAX_COLORS}" \
    "$pal"

  # 2) Apply palette
  ffmpeg -v error -y -i "$gif" -i "$pal" \
    -filter_complex "[0:v]fps=${TARGET_FPS},scale=${TARGET_WIDTH}:-1:flags=lanczos[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=5" \
    "$tmp"

  # Size after (before replacing)
  compressed_size=$(du -h "$tmp" | cut -f1)
  compressed_bytes=$(wc -c < "$tmp")
  reduction=$(( (original_bytes - compressed_bytes) * 100 / original_bytes ))

  echo "  ✓ $base: $original_size → $compressed_size (${reduction}% smaller)"

  mv "$tmp" "$gif"
  rm -f "$pal"
done

echo "🎉 Done."
