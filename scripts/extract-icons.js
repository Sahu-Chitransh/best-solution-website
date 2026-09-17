import sharp from 'sharp';
import path from 'node:path';

const SOURCE_IMG = 'C:/Users/CHITRANSH/.gemini/antigravity/brain/14fdd4f7-ccaf-4d29-96ef-93c38a7577b7/.user_uploaded/media_1789644389149.png';
const OUT_DIR = path.resolve('public/images/goals');

const size = 180;
const half = Math.floor(size / 2);

const icons = [
  { name: 'medical-3d', cx: 203, cy: 265 },
  { name: 'engineering-3d', cx: 510, cy: 262 },
  { name: 'foundation-3d', cx: 820, cy: 256 },
];

const maskSvg = Buffer.from(`
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="grad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="1" />
      <stop offset="78%" stop-color="#ffffff" stop-opacity="1" />
      <stop offset="92%" stop-color="#ffffff" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#grad)" />
</svg>
`);

const maskBuffer = await sharp(maskSvg)
  .png()
  .toBuffer();

for (const { name, cx, cy } of icons) {
  const left = cx - half;
  const top = cy - half;

  const cropped = await sharp(SOURCE_IMG)
    .extract({ left, top, width: size, height: size })
    .ensureAlpha()
    .toBuffer();

  await sharp(cropped)
    .composite([
      {
        input: maskBuffer,
        blend: 'dest-in'
      }
    ])
    .webp({ quality: 95 })
    .toFile(path.join(OUT_DIR, `${name}.webp`));

  console.log(`Successfully generated ${name}.webp`);
}
