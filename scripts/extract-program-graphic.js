import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs/promises';

const SOURCE_IMG = 'C:/Users/CHITRANSH/.gemini/antigravity/brain/14fdd4f7-ccaf-4d29-96ef-93c38a7577b7/.user_uploaded/media_1789645507626.png';
const OUT_DIR = path.resolve('public/images/programs');

await fs.mkdir(OUT_DIR, { recursive: true });

// Extract the book & stethoscope graphic from the red banner
// Let's crop from left: 70, top: 350, width: 280, height: 110
await sharp(SOURCE_IMG)
  .extract({ left: 68, top: 355, width: 290, height: 105 })
  .webp({ quality: 95 })
  .toFile(path.join(OUT_DIR, 'medical-books.webp'));

console.log('Successfully saved medical-books.webp');
