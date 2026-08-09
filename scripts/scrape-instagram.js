import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.join(__dirname, '..');
const DATA_FILE = path.join(ROOT_DIR, 'src', 'content', 'instagram.json');
const IMAGES_DIR = path.join(ROOT_DIR, 'public', 'images', 'instagram');
const PROFILE_DIR = path.join(ROOT_DIR, '.instagram-profile');

const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36';

// Helper for delays
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function loadInstagramJson() {
  if (!fs.existsSync(DATA_FILE)) {
    return {
      sectionTitle: 'Follow Us on Instagram',
      handle: '@bestsolutionindore',
      profileUrl: 'https://instagram.com/bestsolutionindore',
      posts: [],
    };
  }
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  } catch {
    return {
      sectionTitle: 'Follow Us on Instagram',
      handle: '@bestsolutionindore',
      profileUrl: 'https://instagram.com/bestsolutionindore',
      posts: [],
    };
  }
}

function saveInstagramJson(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2) + '\n', 'utf-8');
}

async function downloadImage(url, destPath) {
  if (fs.existsSync(destPath)) {
    return true; // Already downloaded
  }
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': USER_AGENT,
        Referer: 'https://www.instagram.com/',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    fs.writeFileSync(destPath, Buffer.from(arrayBuffer));
    return true;
  } catch (err) {
    console.error(`[scraper] Failed to download image from ${url}:`, err.message);
    return false;
  }
}

async function launchBrowser(headless = false) {
  if (!fs.existsSync(PROFILE_DIR)) {
    fs.mkdirSync(PROFILE_DIR, { recursive: true });
  }

  const context = await chromium.launchPersistentContext(PROFILE_DIR, {
    headless,
    userAgent: USER_AGENT,
    viewport: { width: 1280, height: 900 },
    locale: 'en-US',
    timezoneId: 'Asia/Kolkata',
    args: [
      '--disable-blink-features=AutomationControlled',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-infobars',
    ],
  });

  return context;
}

export async function checkIsLoggedIn(page) {
  try {
    const cookies = await page.context().cookies('https://www.instagram.com');
    const hasSessionCookie = cookies.some((c) => c.name === 'sessionid' && c.value && c.value.length > 5);

    if (hasSessionCookie) {
      return true;
    }

    const loggedInElement = await page.$(
      'svg[aria-label="Home"], svg[aria-label="Search"], svg[aria-label="Direct messaging"], svg[aria-label="Activity Feed"], a[href*="/direct/inbox/"]'
    );
    return !!loggedInElement;
  } catch {
    return false;
  }
}

async function runInteractiveLogin() {
  console.log('\n======================================================');
  console.log('   📸 Instagram Interactive Login');
  console.log('======================================================');
  console.log('Opening a browser window for you to log into Instagram...\n');

  const context = await launchBrowser(false);
  const page = context.pages()[0] || (await context.newPage());

  await page.goto('https://www.instagram.com/accounts/login/', { waitUntil: 'domcontentloaded' });

  console.log('👉 Please log into your Instagram account in the browser window.');
  console.log('👉 You can enter your credentials, complete 2FA OTP, or accept cookies.');
  console.log('👉 Waiting for successful login...\n');

  let loggedIn = false;
  const maxWaitMs = 5 * 60 * 1000; // 5 minutes
  const startTime = Date.now();

  while (Date.now() - startTime < maxWaitMs) {
    await delay(3000);
    const cookies = await context.cookies('https://www.instagram.com');
    const hasSessionCookie = cookies.some((c) => c.name === 'sessionid' && c.value && c.value.length > 5);

    const currentUrl = page.url();
    const notOnLogin = !currentUrl.includes('/accounts/login') && !currentUrl.includes('/accounts/emailsignup');

    if (hasSessionCookie || (notOnLogin && !currentUrl.includes('instagram.com/login'))) {
      const loggedInIndicator = await page.$(
        'svg[aria-label="Home"], svg[aria-label="Search"], a[href*="/direct/inbox/"], svg[aria-label="Profile"]'
      );
      if (loggedInIndicator || hasSessionCookie) {
        loggedIn = true;
        break;
      }
    }
  }

  if (loggedIn) {
    console.log('✅ Successfully logged in! Your browser session is securely saved in .instagram-profile/\n');
  } else {
    console.log('⚠️ Login timed out or not detected. You can run `npm run scrape:login` again anytime.\n');
  }

  await context.close();
  return loggedIn;
}

async function scrapeProfile(options) {
  const { handle, limit = 12, markFeatured = true, headless = true } = options;
  const cleanHandle = handle.replace(/^@/, '').trim();
  const profileUrl = `https://www.instagram.com/${cleanHandle}/`;

  console.log('\n======================================================');
  console.log(`   📸 Scraping Instagram Profile: @${cleanHandle}`);
  console.log(`   🎯 Target Limit: ${limit} posts | Headless: ${headless}`);
  console.log('======================================================\n');

  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
  }

  const context = await launchBrowser(headless);
  const page = context.pages()[0] || (await context.newPage());

  const interceptedPosts = new Map();

  // Intercept Instagram API & GraphQL responses for exact media URLs & captions
  page.on('response', async (response) => {
    const url = response.url();
    try {
      if (
        url.includes('/graphql/query') ||
        url.includes('/api/v1/users/web_profile_info') ||
        url.includes('/api/v1/feed/user') ||
        url.includes('xdt_api__v1__feed')
      ) {
        const contentType = response.headers()['content-type'] || '';
        if (contentType.includes('application/json')) {
          const json = await response.json().catch(() => null);
          if (json) {
            parseApiPayload(json, interceptedPosts);
          }
        }
      }
    } catch {
      // Ignore parsing errors for non-matching responses
    }
  });

  console.log(`[scraper] Navigating to ${profileUrl}...`);
  let navigated = false;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      await page.goto(profileUrl, { waitUntil: 'domcontentloaded', timeout: 35000 });
      navigated = true;
      break;
    } catch (err) {
      console.log(`[scraper] Navigation attempt ${attempt} failed: ${err.message}`);
      if (attempt < 3) {
        console.log('[scraper] Retrying in 3 seconds...');
        await delay(3000);
      }
    }
  }

  if (!navigated) {
    console.error(`[scraper] Could not reach ${profileUrl}. Please check internet connection.`);
    await context.close();
    return;
  }

  await delay(4000);
  console.log(`[scraper] Current page URL: ${page.url()}`);

  // Automatically dismiss common Instagram modals ("Not Now", "Allow cookies", etc.)
  try {
    const dismissButtons = [
      'button:has-text("Not Now")',
      'button:has-text("Not now")',
      'button:has-text("Allow all cookies")',
      'button:has-text("Accept")',
      'button:has-text("Decline optional cookies")',
      'div[role="dialog"] button:has-text("Cancel")',
      'svg[aria-label="Close"]',
    ];
    for (const selector of dismissButtons) {
      const btn = await page.$(selector);
      if (btn) {
        console.log(`[scraper] Dismissing modal with selector: ${selector}`);
        await btn.click().catch(() => {});
        await delay(1000);
      }
    }
  } catch {
    // Non-critical
  }

  // Check if login is required or blocked
  const isLoginPage = page.url().includes('/accounts/login');
  if (isLoginPage) {
    console.log('\n⚠️ Instagram requires login to view this profile.');
    console.log('Closing headless browser and opening interactive login session...\n');
    await context.close();
    const loginOk = await runInteractiveLogin();
    if (!loginOk) {
      console.log('❌ Could not complete login. Aborting scraper.');
      return;
    }
    // Re-run scraper after login
    return scrapeProfile({ ...options, headless: false });
  }

  // Wait for post anchors or grid to load
  console.log('[scraper] Waiting for profile grid to render...');
  try {
    await page.waitForSelector('a[href*="/p/"], a[href*="/reel/"], article', { timeout: 12000 });
  } catch {
    console.log('[scraper] Notice: Timeline selector wait timed out, proceeding to scan page...');
  }

  // Scroll down smoothly to collect enough posts
  console.log(`[scraper] Scrolling through feed to collect up to ${limit} posts...`);
  let previousHeight = 0;
  let scrollAttempts = 0;
  let unchangedCount = 0;
  const maxScrollAttempts = Math.max(40, Math.ceil(limit * 1.5));

  while (interceptedPosts.size < limit && scrollAttempts < maxScrollAttempts) {
    scrollAttempts++;

    // Extract any post links currently visible in the DOM
    const domPosts = await page.$$eval('a[href*="/p/"], a[href*="/reel/"]', (anchors) => {
      return anchors.map((a) => {
        const href = a.href;
        const img = a.querySelector('img');
        return {
          href,
          imgSrc: img ? img.src : null,
          alt: img ? img.alt : '',
        };
      });
    });

    for (const dp of domPosts) {
      const match = dp.href.match(/\/(p|reel)\/([^/?#]+)/);
      if (match) {
        const shortcode = match[2];
        if (!interceptedPosts.has(shortcode)) {
          interceptedPosts.set(shortcode, {
            shortcode,
            instagramUrl: `https://www.instagram.com/p/${shortcode}/`,
            displayUrl: dp.imgSrc,
            caption: dp.alt || '',
            date: new Date().toISOString().split('T')[0],
            isVideo: dp.href.includes('/reel/'),
          });
        }
      }
    }

    if (scrollAttempts % 3 === 0 || interceptedPosts.size >= limit) {
      console.log(`[scraper] Collected ${interceptedPosts.size}/${limit} posts (scroll ${scrollAttempts}/${maxScrollAttempts})...`);
    }

    if (interceptedPosts.size >= limit) break;

    // Scroll down with smooth behavior
    previousHeight = await page.evaluate('document.body.scrollHeight');
    await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
    await delay(1600 + Math.random() * 1200);

    const newHeight = await page.evaluate('document.body.scrollHeight');
    if (newHeight === previousHeight) {
      unchangedCount++;
      // Give a tiny scroll up then down to trigger viewport listeners
      await page.evaluate('window.scrollBy(0, -300)');
      await delay(500);
      await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
      await delay(1500);

      if (unchangedCount >= 5) {
        console.log('[scraper] Feed reached end or no more posts available to scroll.');
        break;
      }
    } else {
      unchangedCount = 0;
    }
  }

  console.log(`[scraper] Discovered ${interceptedPosts.size} posts from profile.`);

  const scrapedItems = Array.from(interceptedPosts.values()).slice(0, limit);

  // If captions or display URLs are missing, open individual post modals to hydrate details
  for (let i = 0; i < scrapedItems.length; i++) {
    const item = scrapedItems[i];
    if (!item.displayUrl || !item.caption) {
      try {
        console.log(`[scraper] Fetching detailed info for post ${i + 1}/${scrapedItems.length} (${item.shortcode})...`);
        await page.goto(item.instagramUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
        await delay(1500);

        const details = await page.evaluate(() => {
          const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content');
          const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content');
          const ogDesc = document.querySelector('meta[property="og:description"]')?.getAttribute('content');
          const timeElem = document.querySelector('time');
          const timeDatetime = timeElem?.getAttribute('datetime');
          const mainImg = document.querySelector('article img');

          return {
            imageUrl: ogImage || mainImg?.src,
            caption: ogDesc || ogTitle || '',
            date: timeDatetime ? timeDatetime.split('T')[0] : null,
          };
        });

        if (details.imageUrl && !item.displayUrl) item.displayUrl = details.imageUrl;
        if (details.caption && !item.caption) {
          // Clean up "X likes, Y comments - Handle on Date: 'Caption'" prefixes from meta descriptions
          const cleanDesc = details.caption.replace(/^[^:]+:\s*"/, '').replace(/"$/, '');
          item.caption = cleanDesc;
        }
        if (details.date) item.date = details.date;
      } catch (err) {
        console.log(`[scraper] Notice: Could not hydrate post ${item.shortcode}: ${err.message}`);
      }
    }
  }

  await context.close();

  // Download media files to public/images/instagram/
  console.log('\n[scraper] Downloading images to public/images/instagram/...');
  let downloadedCount = 0;

  for (const item of scrapedItems) {
    const filename = `ig_${item.shortcode}.jpg`;
    const destPath = path.join(IMAGES_DIR, filename);
    item.localImagePath = `/images/instagram/${filename}`;

    if (item.displayUrl) {
      const ok = await downloadImage(item.displayUrl, destPath);
      if (ok) {
        downloadedCount++;
        console.log(`  ✓ Saved: ${filename}`);
      }
    }
  }

  // Update src/content/instagram.json
  console.log('\n[scraper] Updating src/content/instagram.json...');
  const currentData = loadInstagramJson();
  const existingPosts = currentData.posts || [];

  // Map of existing posts by shortcode or url
  const existingMap = new Map();
  for (const p of existingPosts) {
    const key = p.instagramUrl || p.image || p.fetchedImage;
    if (key) existingMap.set(key, p);
  }

  const updatedPosts = [];

  // Add scraped posts
  for (let i = 0; i < scrapedItems.length; i++) {
    const item = scrapedItems[i];
    const existing = existingMap.get(item.instagramUrl);

    if (existing) {
      // Update existing post keeping manual overrides if any
      updatedPosts.push({
        ...existing,
        image: existing.image || item.localImagePath,
        fetchedImage: item.localImagePath,
        caption: existing.caption || item.caption,
        fetchedCaption: item.caption,
        instagramUrl: item.instagramUrl,
        date: existing.date || item.date,
        featured: markFeatured ? i < 6 : existing.featured ?? false,
      });
      existingMap.delete(item.instagramUrl);
    } else {
      // New post
      updatedPosts.push({
        image: item.localImagePath,
        caption: item.caption,
        fetchedImage: item.localImagePath,
        fetchedCaption: item.caption,
        instagramUrl: item.instagramUrl,
        date: item.date,
        featured: markFeatured ? i < 6 : false,
      });
    }
  }

  // Append remaining older posts
  for (const leftover of existingMap.values()) {
    updatedPosts.push(leftover);
  }

  currentData.handle = `@${cleanHandle}`;
  currentData.profileUrl = profileUrl;
  currentData.posts = updatedPosts;

  saveInstagramJson(currentData);

  console.log('======================================================');
  console.log(`🎉 Done! Scraped ${scrapedItems.length} posts (${downloadedCount} images saved).`);
  console.log(`📁 Gallery data updated at src/content/instagram.json`);
  console.log('======================================================\n');
}

function parseApiPayload(json, postMap) {
  try {
    const parseNode = (node) => {
      if (!node || typeof node !== 'object') return;
      const shortcode = node.shortcode || node.code;
      if (!shortcode) return;

      const captionText =
        node.edge_media_to_caption?.edges?.[0]?.node?.text ||
        node.caption?.text ||
        node.accessibility_caption ||
        '';

      const displayUrl =
        node.display_url ||
        node.image_versions2?.candidates?.[0]?.url ||
        node.thumbnail_src ||
        node.display_resources?.[node.display_resources.length - 1]?.src;

      const timestamp = node.taken_at_timestamp || node.taken_at;
      const dateStr = timestamp
        ? new Date(timestamp * 1000).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0];

      if (!postMap.has(shortcode) || !postMap.get(shortcode).displayUrl) {
        postMap.set(shortcode, {
          shortcode,
          instagramUrl: `https://www.instagram.com/p/${shortcode}/`,
          displayUrl: displayUrl || null,
          caption: captionText,
          date: dateStr,
          isVideo: !!(node.is_video || node.media_type === 2),
        });
      }
    };

    // Helper recursive search
    const traverse = (obj) => {
      if (!obj || typeof obj !== 'object') return;
      if (Array.isArray(obj)) {
        for (const item of obj) traverse(item);
        return;
      }

      if (obj.shortcode || obj.code) {
        parseNode(obj);
      }
      if (obj.node) {
        parseNode(obj.node);
      }

      for (const key of Object.keys(obj)) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          traverse(obj[key]);
        }
      }
    };

    traverse(json);
  } catch {
    // Non-critical parsing failure
  }
}

// ─────────────────────────────────────────────────────────────
// Interactive CLI Wizard
// ─────────────────────────────────────────────────────────────
async function runCliWizard() {
  const existingData = loadInstagramJson();
  const defaultHandle = existingData.handle || '@bestsolutionindore';

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    console.log('\n======================================================');
    console.log('   📸 Best Solution — Instagram Scraper Wizard');
    console.log('======================================================\n');
    console.log('Select an action:');
    console.log('  [1] Scrape posts from Instagram profile (Recommended)');
    console.log('  [2] Log in to Instagram (Save/Update Browser Session)');
    console.log('  [3] Exit\n');

    const actionChoice = (await rl.question('Enter choice [1/2/3] (default: 1): ')).trim() || '1';

    if (actionChoice === '3') {
      console.log('Exiting.');
      return;
    }

    if (actionChoice === '2') {
      await runInteractiveLogin();
      return;
    }

    // Prompt for target profile handle
    const handleInput =
      (await rl.question(`Instagram profile handle (default: ${defaultHandle}): `)).trim() || defaultHandle;

    // Prompt for post count
    const limitInput = (await rl.question('Number of recent posts to scrape (default: 12): ')).trim() || '12';
    const limit = parseInt(limitInput, 10) || 12;

    // Prompt for featured flag
    const featuredInput =
      (await rl.question('Mark new posts as featured on homepage? [Y/n] (default: Y): ')).trim().toLowerCase() || 'y';
    const markFeatured = featuredInput !== 'n';

    // Prompt for browser visibility
    const modeInput =
      (await rl.question('Browser mode: [1] Headless (background), [2] Visible window (default: 1): ')).trim() || '1';
    const headless = modeInput !== '2';

    await scrapeProfile({
      handle: handleInput,
      limit,
      markFeatured,
      headless,
    });
  } finally {
    rl.close();
  }
}

// ─────────────────────────────────────────────────────────────
// Entry point handling CLI flags & non-interactive arguments
// ─────────────────────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Instagram Scraper for Best Solution Website

Usage:
  npm run scrape:instagram              Launch interactive wizard
  npm run scrape:login                  Open browser for one-time Instagram login

Options (non-interactive):
  --login                               Open visible browser to log in and save session
  --handle <username>                   Target profile handle (e.g. @bestsolutionindore)
  --limit <number>                      Number of posts to scrape (default: 12)
  --headful / --visible                 Run with visible browser window (default: headless)
  --no-featured                         Do not mark posts as featured
  --help, -h                            Show this help message
    `);
    return;
  }

  if (args.includes('--login')) {
    await runInteractiveLogin();
    return;
  }

  // Parse direct CLI flags if provided
  let customHandle = null;
  let customLimit = null;
  let customHeadless = true;
  let customFeatured = true;
  let isNonInteractive = false;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg.startsWith('--handle=')) {
      customHandle = arg.split('=')[1].replace(/['"]/g, '');
      isNonInteractive = true;
    } else if (arg === '--handle' && args[i + 1] && !args[i + 1].startsWith('--')) {
      customHandle = args[i + 1].replace(/['"]/g, '');
      i++;
      isNonInteractive = true;
    }

    if (arg.startsWith('--limit=')) {
      customLimit = parseInt(arg.split('=')[1], 10);
      isNonInteractive = true;
    } else if (arg === '--limit' && args[i + 1] && !args[i + 1].startsWith('--')) {
      customLimit = parseInt(args[i + 1], 10);
      i++;
      isNonInteractive = true;
    }

    if (arg === '--headful' || arg === '--visible') {
      customHeadless = false;
      isNonInteractive = true;
    }
    if (arg === '--headless') {
      customHeadless = true;
      isNonInteractive = true;
    }
    if (arg === '--no-featured') {
      customFeatured = false;
      isNonInteractive = true;
    }
  }

  if (isNonInteractive) {
    const existingData = loadInstagramJson();
    await scrapeProfile({
      handle: customHandle || existingData.handle || '@bestsolutionindore',
      limit: customLimit || 12,
      markFeatured: customFeatured,
      headless: customHeadless,
    });
  } else {
    // Run full interactive wizard
    await runCliWizard();
  }
}

main().catch((err) => {
  console.error('\n❌ Fatal error in scraper:', err);
  process.exit(1);
});
