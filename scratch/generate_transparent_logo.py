from PIL import Image
import numpy as np

src_path = r"C:\Users\CHITRANSH\.gemini\antigravity\brain\fe96e703-e968-4127-927b-305674dbdc32\.user_uploaded\media_1788686622113.jpg"
img = Image.open(src_path).convert("RGBA")
w, h = img.size

arr = np.array(img, dtype=float)
r = arr[:, :, 0]
g = arr[:, :, 1]
b = arr[:, :, 2]

BRAND_RED = [211, 47, 47]
out = np.zeros((h, w, 4), dtype=np.uint8)

for y in range(h):
    for x in range(w):
        pr, pg, pb = r[y, x], g[y, x], b[y, x]
        
        is_bg_red = (pr > 110 and pg < 55 and pb < 55)
        
        # 1. Graduation Cap region (extends down to y < 62 to cover bottom border and tassel)
        if y < 62 and 130 <= x <= 220:
            if is_bg_red:
                out[y, x] = [0, 0, 0, 0]
                continue
            # White cap border (all around the cap and tassel outline)
            if pr > 165 and pg > 165 and pb > 165:
                out[y, x] = [255, 255, 255, 255]
                continue
            # Black mortarboard body
            if pr < 55 and pg < 55 and pb < 55:
                out[y, x] = [24, 24, 27, 255]
                continue
            # Grey skullcap side panels
            if abs(pr - pg) < 30 and abs(pg - pb) < 30 and 55 <= pr <= 140:
                out[y, x] = [80, 80, 80, 255]
                continue
            # Gold tassel/button
            if pr > 125 and pg > 85 and pb < 70:
                out[y, x] = [217, 130, 43, 255]
                continue
            # Green edge if top of 'e' starts in this box
            if pg > 95 and (pg - pb > 35):
                alpha = min(255, max(0, int((pg - 30) / 100 * 255)))
                out[y, x] = [min(255, int(pr * 0.95)), min(255, int(pg * 1.05)), min(255, int(pb * 0.7)), alpha]
                continue
            if pr > 90 and pg < 65 and pb < 65:
                out[y, x] = [0, 0, 0, 0]
                continue
                
        # 2. Green "e" and sweeping swoosh
        if pg > 95 and (pg - pb > 35):
            alpha = min(255, max(0, int((pg - 30) / 100 * 255)))
            out[y, x] = [min(255, int(pr * 0.95)), min(255, int(pg * 1.05)), min(255, int(pb * 0.7)), alpha]
            continue
            
        # 3. White letters ("B", "s", "t", "solution", "•", "SM")
        whiteness = max(0.0, (pb - 32) / 175.0)
        whiteness = min(1.0, whiteness)
        
        if whiteness > 0.08:
            alpha = min(255, max(0, int(pow(whiteness, 0.75) * 255)))
            out[y, x] = [BRAND_RED[0], BRAND_RED[1], BRAND_RED[2], alpha]
        else:
            out[y, x] = [0, 0, 0, 0]

result_img = Image.fromarray(out, "RGBA")

bbox = result_img.getbbox()
if bbox:
    pad = 4
    crop_box = (max(0, bbox[0]-pad), max(0, bbox[1]-pad), min(w, bbox[2]+pad), min(h, bbox[3]+pad))
    cropped = result_img.crop(crop_box)
else:
    cropped = result_img

cropped.save("public/images/best_solution_logo_horizontal.png", "PNG")
print("Saved public/images/best_solution_logo_horizontal.png with size:", cropped.size)

# Also generate test on white
bg = Image.new("RGBA", (cropped.width + 40, cropped.height + 40), (255, 255, 255, 255))
bg.paste(cropped, (20, 20), cropped)
bg.save("scratch/test_logo_on_white.png")
print("Saved test_logo_on_white.png")
