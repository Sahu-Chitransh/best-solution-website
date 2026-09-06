import os
from PIL import Image

TARGET_WIDTH = 2400
TARGET_HEIGHT = 900  # 24:9 / 8:3 ratio gives perfect height clearance for ticker above the fold

inputs = [
    ("photos/hero/Website slide.jpg.jpeg", "public/images/hero/slide-1.jpg"),
    ("photos/hero/Website slide_02.jpg.jpeg", "public/images/hero/slide-2.jpg"),
    ("photos/hero/Website slide_03.jpg.jpeg", "public/images/hero/slide-3.jpg"),
]

for src_path, dest_path in inputs:
    print(f"Processing {src_path} -> {dest_path}")
    orig = Image.open(src_path)
    orig_w, orig_h = orig.size
    
    # 1. Trim 4px off left and right to eliminate the 1-2px dark border export artifact
    trimmed = orig.crop((4, 0, orig_w - 4, orig_h))
    trim_w, trim_h = trimmed.size
    
    # 2. Scale cleanly so height is TARGET_HEIGHT (900px)
    scaled_h = TARGET_HEIGHT
    scaled_w = round(scaled_h * trim_w / trim_h)
    scaled = trimmed.resize((scaled_w, scaled_h), Image.Resampling.LANCZOS)
    
    # 3. Sample the clean solid background color from left and right edges
    left_color = scaled.crop((2, 50, 10, 200)).resize((1, 1)).getpixel((0, 0))
    right_color = scaled.crop((scaled_w - 10, 50, scaled_w - 2, 200)).resize((1, 1)).getpixel((0, 0))
    
    print(f"  Scaled: {scaled_w}x{scaled_h} | Left fill: {left_color}, Right fill: {right_color}")
    
    # 4. Create target canvas
    canvas = Image.new("RGB", (TARGET_WIDTH, TARGET_HEIGHT), left_color)
    offset_x = (TARGET_WIDTH - scaled_w) // 2
    offset_y = 0
    
    # Fill the right side with right_color if different, or left_color
    if right_color != left_color:
        right_box = Image.new("RGB", (TARGET_WIDTH - (offset_x + scaled_w), TARGET_HEIGHT), right_color)
        canvas.paste(right_box, (offset_x + scaled_w, 0))
        
    # 5. Paste the center artwork seamlessly
    canvas.paste(scaled, (offset_x, offset_y))
    
    # Save as high-quality JPEG
    canvas.save(dest_path, "JPEG", quality=95, optimize=True)
    print(f"  Saved {dest_path} ({TARGET_WIDTH}x{TARGET_HEIGHT})")

print("All slides processed with 2400x900 resolution!")
