import os
from PIL import Image, ImageFilter

TARGET_WIDTH = 2400
TARGET_HEIGHT = 1000

# Input files in photos/hero/
inputs = [
    ("photos/hero/Website slide.jpg.jpeg", "public/images/hero/slide-1.jpg"),
    ("photos/hero/Website slide_02.jpg.jpeg", "public/images/hero/slide-2.jpg"),
    ("photos/hero/Website slide_03.jpg.jpeg", "public/images/hero/slide-3.jpg"),
]

for src_path, dest_path in inputs:
    print(f"Processing {src_path} -> {dest_path}")
    orig = Image.open(src_path)
    orig_w, orig_h = orig.size
    
    # We want the original image height to scale to TARGET_HEIGHT (1000px)
    # The scaled width will be round(1000 * orig_w / orig_h)
    scaled_h = TARGET_HEIGHT
    scaled_w = round(scaled_h * orig_w / orig_h)
    
    scaled = orig.resize((scaled_w, scaled_h), Image.Resampling.LANCZOS)
    
    # Target canvas
    canvas = Image.new("RGB", (TARGET_WIDTH, TARGET_HEIGHT))
    
    # Position scaled in center
    offset_x = (TARGET_WIDTH - scaled_w) // 2
    offset_y = 0
    
    # To make the left and right sides seamlessly extend the background:
    # We sample a narrow vertical strip from the left edge of the scaled image
    # and stretch it smoothly across the left gap (from 0 to offset_x),
    # and sample from the right edge and stretch across the right gap.
    
    # Left strip (sample 8px from left edge)
    left_strip = scaled.crop((0, 0, 8, scaled_h))
    left_ext = left_strip.resize((offset_x + 1, scaled_h), Image.Resampling.BILINEAR)
    canvas.paste(left_ext, (0, 0))
    
    # Right strip (sample 8px from right edge)
    right_strip = scaled.crop((scaled_w - 8, 0, scaled_w, scaled_h))
    right_ext = right_strip.resize((TARGET_WIDTH - (offset_x + scaled_w) + 1, scaled_h), Image.Resampling.BILINEAR)
    canvas.paste(right_ext, (offset_x + scaled_w, 0))
    
    # Now paste the original scaled image in the center
    canvas.paste(scaled, (offset_x, offset_y))
    
    # Save with high quality JPEG
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    canvas.save(dest_path, "JPEG", quality=92, optimize=True)
    print(f"Saved {dest_path} ({TARGET_WIDTH}x{TARGET_HEIGHT})")

print("All hero slides processed successfully!")
