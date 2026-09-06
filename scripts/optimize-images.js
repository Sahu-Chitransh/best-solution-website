import { readdir, stat } from 'node:fs/promises';
import { join, extname, basename, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// Dynamically import sharp (needs to be installed)
let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.error('\n❌ sharp is not installed. Run: npm install --save-dev sharp\n');
  process.exit(1);
}

const DIRS = [
  join(ROOT, 'public', 'images'),
  join(ROOT, 'public', 'blog-images'),
  join(ROOT, 'public', 'news-images'),
];

const SUPPORTED_EXTS = new Set(['.png', '.jpg', '.jpeg']);
const QUALITY = 80;
const MAX_WIDTH = 1920;
const THUMB_WIDTH = 400;
const RESULTS_MAX_WIDTH = 800; // Result posters don't need to be massive

async function getAllImages(dir) {
  const results = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return results;
  }
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...await getAllImages(fullPath));
    } else if (SUPPORTED_EXTS.has(extname(entry.name).toLowerCase())) {
      results.push(fullPath);
    }
  }
  return results;
}

async function optimizeImage(filePath) {
  const ext = extname(filePath).toLowerCase();
  const name = basename(filePath, ext);
  const dir = dirname(filePath);
  const webpPath = join(dir, `${name}.webp`);
  const thumbPath = join(dir, `${name}-thumb.webp`);
  
  // Determine max width based on path
  const relPath = relative(ROOT, filePath).toLowerCase();
  const isResult = relPath.includes('results') || relPath.includes('jee') || relPath.includes('neet');
  const maxWidth = isResult ? RESULTS_MAX_WIDTH : MAX_WIDTH;

  try {
    const metadata = await sharp(filePath).metadata();
    const originalSize = (await stat(filePath)).size;

    // Generate WebP
    const pipeline = sharp(filePath);
    if (metadata.width > maxWidth) {
      pipeline.resize(maxWidth, null, { withoutEnlargement: true });
    }
    await pipeline.webp({ quality: QUALITY }).toFile(webpPath);
    const webpSize = (await stat(webpPath)).size;

    // Generate thumbnail WebP
    await sharp(filePath)
      .resize(THUMB_WIDTH, null, { withoutEnlargement: true })
      .webp({ quality: QUALITY - 10 })
      .toFile(thumbPath);
    const thumbSize = (await stat(thumbPath)).size;

    const savings = ((1 - webpSize / originalSize) * 100).toFixed(1);
    console.log(
      `  ✅ ${relative(ROOT, filePath)}` +
      `  ${(originalSize / 1024).toFixed(0)}KB → ${(webpSize / 1024).toFixed(0)}KB (${savings}% smaller)` +
      `  thumb: ${(thumbSize / 1024).toFixed(0)}KB`
    );

    return { originalSize, webpSize, thumbSize };
  } catch (err) {
    console.error(`  ❌ Failed: ${relative(ROOT, filePath)} — ${err.message}`);
    return { originalSize: 0, webpSize: 0, thumbSize: 0 };
  }
}

async function main() {
  console.log('\n🖼️  Best Solution Image Optimizer\n');
  console.log('Scanning directories...');

  let allImages = [];
  for (const dir of DIRS) {
    const images = await getAllImages(dir);
    allImages.push(...images);
    console.log(`  📁 ${relative(ROOT, dir)}: ${images.length} images`);
  }

  // Filter out already-processed webp files
  allImages = allImages.filter(f => !f.endsWith('.webp'));

  console.log(`\nOptimizing ${allImages.length} images...\n`);

  let totalOriginal = 0;
  let totalWebp = 0;
  let totalThumb = 0;
  let processed = 0;

  for (const img of allImages) {
    const result = await optimizeImage(img);
    totalOriginal += result.originalSize;
    totalWebp += result.webpSize;
    totalThumb += result.thumbSize;
    processed++;
  }

  console.log('\n' + '═'.repeat(60));
  console.log(`\n📊 Summary:`);
  console.log(`   Processed:    ${processed} images`);
  console.log(`   Original:     ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   WebP:         ${(totalWebp / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Thumbnails:   ${(totalThumb / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Savings:      ${((1 - totalWebp / totalOriginal) * 100).toFixed(1)}%`);
  console.log('');
}

main().catch(console.error);
