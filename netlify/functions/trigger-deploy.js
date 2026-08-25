/**
 * Netlify Serverless Function: trigger-deploy
 * Securely triggers a Netlify build hook on demand from the CMS admin dashboard.
 */

import https from 'https';

function httpsPost(url, payload) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const data = JSON.stringify(payload);

    const options = {
      hostname: parsed.hostname,
      port: 443,
      path: parsed.pathname + (parsed.search || ''),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
      },
    };

    const req = https.request(options, (res) => {
      let body = [];
      res.on('data', (chunk) => body.push(chunk));
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          body: Buffer.concat(body).toString('utf-8'),
        });
      });
    });

    req.on('error', (err) => reject(err));
    req.write(data);
    req.end();
  });
}

export const handler = async function (event) {
  const BUILD_HOOK_URL = process.env.NETLIFY_BUILD_HOOK_URL;
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method Not Allowed. Use POST.' }),
    };
  }

  if (!BUILD_HOOK_URL) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error:
          'NETLIFY_BUILD_HOOK_URL is not configured in Netlify environment variables. Please add it under Site Configuration > Environment variables.',
      }),
    };
  }

  try {
    let customTitle = 'Triggered from Best Solution CMS Admin';
    try {
      const parsedBody = event.body ? JSON.parse(event.body) : {};
      if (parsedBody.title) customTitle = parsedBody.title;
    } catch {
      // ignore JSON parse failure and use default title
    }

    const result = await httpsPost(BUILD_HOOK_URL, {
      title: customTitle,
    });

    if (result.statusCode >= 200 && result.statusCode < 300) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          success: true,
          message: 'Build successfully triggered on Netlify!',
          timestamp: new Date().toISOString(),
        }),
      };
    } else {
      return {
        statusCode: result.statusCode,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          error: `Netlify build hook returned status ${result.statusCode}`,
          details: result.body,
        }),
      };
    }
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: 'Failed to contact Netlify build hook',
        details: err.message,
      }),
    };
  }
};
