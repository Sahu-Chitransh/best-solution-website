import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, '..', 'src', 'content', 'instagram.json');
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images', 'instagram');

const TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;

function httpsGet(url, maxRedirects = 3) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        if (maxRedirects === 0) return reject(new Error('Too many redirects'));
        return resolve(httpsGet(res.headers.location, maxRedirects - 1));
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode}`));
      }

      let data = [];
      res.on('data', chunk => data.push(chunk));
      res.on('end', () => resolve(Buffer.concat(data)));
    }).on('error', reject);
  });
}

function httpsGetJson(url) {
  return httpsGet(url).then(buffer => JSON.parse(buffer.toString('utf-8')));
}

async function downloadImage(url, dest) {
  const buffer = await httpsGet(url);
  fs.writeFileSync(dest, buffer);
}

async function main() {
  if (!TOKEN) {
    console.log('[instagram-fetch] WARNING: INSTAGRAM_ACCESS_TOKEN not found. Skipping Instagram fetch.');
    return;
  }

  if (!fs.existsSync(DATA_FILE)) {
    console.log('[instagram-fetch] WARNING: Data file not found:', DATA_FILE);
    return;
  }

  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
  }

  let data;
  try {
    data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  } catch (err) {
    console.log('[instagram-fetch] WARNING: Could not parse instagram.json', err.message);
    return;
  }

  const posts = data.posts || [];
  let newImages = 0;
  let skipped = 0;
  let errors = 0;

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];

    // Skip if manual image exists
    if (post.image) {
      skipped++;
      continue;
    }

    // Skip if already fetched and file exists on disk
    if (post.fetchedImage) {
      const fetchedPath = path.join(__dirname, '..', 'public', post.fetchedImage);
      if (fs.existsSync(fetchedPath)) {
        skipped++;
        continue;
      }
    }

    // Need the Instagram URL to fetch from
    const instagramUrl = post.instagramUrl;
    if (!instagramUrl) {
      console.log(`[instagram-fetch] WARNING: Post ${i} has no instagramUrl. Skipping.`);
      skipped++;
      continue;
    }

    try {
      const match = instagramUrl.match(/\/p\/([^/?#]+)/) || instagramUrl.match(/\/reel\/([^/?#]+)/);
      if (!match) {
        throw new Error(`Could not extract shortcode from ${instagramUrl}`);
      }
      const shortcode = match[1];

      console.log(`[instagram-fetch] Fetching post: ${shortcode}...`);

      const apiUrl = `https://graph.facebook.com/v21.0/instagram_oembed?url=${encodeURIComponent(instagramUrl)}&access_token=${TOKEN}`;
      const oembed = await httpsGetJson(apiUrl);

      if (!oembed.thumbnail_url) {
        throw new Error('No thumbnail_url in response');
      }

      const filename = `ig_${shortcode}.jpg`;
      const destPath = path.join(IMAGES_DIR, filename);

      await downloadImage(oembed.thumbnail_url, destPath);

      post.fetchedImage = `/images/instagram/${filename}`;
      if (!post.caption && oembed.title) {
        post.fetchedCaption = oembed.title;
      }

      newImages++;
      console.log(`[instagram-fetch] ✓ Saved: ${filename}`);
    } catch (err) {
      console.log(`[instagram-fetch] ERROR fetching post ${i}: ${err.message}`);
      errors++;
    }
  }

  // Write back updated data
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2) + '\n');
  } catch (err) {
    console.log('[instagram-fetch] WARNING: Could not write instagram.json', err.message);
  }

  console.log(`[instagram-fetch] Done. Fetched ${newImages} new images, ${skipped} skipped, ${errors} errors.`);
}

main().catch(err => {
  console.log(`[instagram-fetch] FATAL ERROR: ${err.message}`);
  // Exit 0 even on fatal error — don't break the build
});
