import os
from PIL import Image

src = 'photos/Best Soluiton Icon.png'
img = Image.open(src).convert('RGBA')

# Crop to content bounding box if any transparent padding exists
bbox = img.getbbox()
if bbox:
    # ensure it's square
    w = bbox[2] - bbox[0]
    h = bbox[3] - bbox[1]
    dim = max(w, h)
    square = Image.new('RGBA', (dim, dim), (0, 0, 0, 0))
    cropped = img.crop(bbox)
    square.paste(cropped, ((dim - w) // 2, (dim - h) // 2))
    img = square

# 1. 32x32 favicon.png
favicon_32 = img.resize((32, 32), Image.Resampling.LANCZOS)
favicon_32.save('public/favicon.png', 'PNG')

# 2. 192x192 favicon-192x192.png
favicon_192 = img.resize((192, 192), Image.Resampling.LANCZOS)
favicon_192.save('public/favicon-192x192.png', 'PNG')

# 3. 180x180 apple-touch-icon.png
apple_touch = img.resize((180, 180), Image.Resampling.LANCZOS)
apple_touch.save('public/apple-touch-icon.png', 'PNG')

# 4. Multi-resolution favicon.ico (16, 32, 48)
img.resize((48, 48), Image.Resampling.LANCZOS).save(
    'public/favicon.ico', 
    format='ICO', 
    sizes=[(16, 16), (32, 32), (48, 48)]
)

print('All favicon formats generated successfully in public/')
