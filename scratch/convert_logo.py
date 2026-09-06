from PIL import Image
import numpy as np

src_path = r"C:\Users\CHITRANSH\.gemini\antigravity\brain\fe96e703-e968-4127-927b-305674dbdc32\.user_uploaded\media_1788686622113.jpg"
img = Image.open(src_path).convert("RGB")
arr = np.array(img, dtype=int)

r = arr[:, :, 0]
g = arr[:, :, 1]
b = arr[:, :, 2]

# Find green pixels (G > 100 and G > B + 30)
green_mask = (g > 100) & (g > b + 40)
coords = np.argwhere(green_mask)
print("Green pixel count:", len(coords))
if len(coords) > 0:
    y, x = coords[len(coords)//2]
    print("Sample green pixel at", (x, y), ":", arr[y, x])

# Find white pixels (R > 180, G > 180, B > 180)
white_mask = (r > 180) & (g > 180) & (b > 180)
print("White pixel count:", np.sum(white_mask))

# Find cap pixels (around the cap at x: 140..210, y: 0..45)
cap_crop = arr[0:45, 140:210]
print("Cap min RGB:", np.min(cap_crop, axis=(0,1)))
