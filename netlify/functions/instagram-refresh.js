import https from 'node:https';

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

export const handler = async function (event) {
  if (!TOKEN) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'INSTAGRAM_ACCESS_TOKEN not configured' }),
    };
  }

  // Accept URL(s) from query string or request body, or test with a known public post
  let testPosts = [];
  
  try {
    const body = event.body ? JSON.parse(event.body) : {};
    if (body.urls && Array.isArray(body.urls)) {
      testPosts = body.urls.map(url => ({ instagramUrl: url }));
    }
  } catch {
    // ignore parse errors
  }

  // If no URLs provided, just validate the token with a simple API call
  if (testPosts.length === 0) {
    testPosts = [{ instagramUrl: 'https://www.instagram.com/p/CrBvnQ8MFMG/' }];
  }

  const results = [];
  let successCount = 0;
  let errorCount = 0;

  for (const post of testPosts) {
    const instagramUrl = post.instagramUrl;
    if (!instagramUrl) continue;

    try {
      const match =
        instagramUrl.match(/\/p\/([^/?#]+)/) ||
        instagramUrl.match(/\/reel\/([^/?#]+)/);
      const shortcode = match ? match[1] : 'unknown';

      const apiUrl = `https://graph.facebook.com/v21.0/instagram_oembed?url=${encodeURIComponent(instagramUrl)}&access_token=${TOKEN}`;
      const oembed = await httpsGetJson(apiUrl);

      results.push({
        instagramUrl,
        shortcode,
        status: 'success',
        thumbnail_url: oembed.thumbnail_url,
        title: oembed.title,
      });
      successCount++;
    } catch (err) {
      results.push({
        instagramUrl,
        status: 'error',
        error: err.message,
      });
      errorCount++;
    }
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      tokenStatus: errorCount === 0 ? 'valid' : 'invalid_or_expired',
      message: `Checked ${testPosts.length} posts. ${successCount} successful, ${errorCount} failed.`,
      details: results,
    }),
  };
};
