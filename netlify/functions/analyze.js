const { spawn } = require('child_process');
const path = require('path');

const PLATFORM_COOKIES = {
  youtube: 'youtube-cookies.txt',
  tiktok: 'tiktok-cookies.txt',
  instagram: 'instagram-cookies.txt',
  pinterest: 'pinterest-cookies.txt',
  facebook: 'facebook-cookies.txt'
};

function cookiesPath(platform) {
  return path.join(process.cwd(), 'cookies', PLATFORM_COOKIES[platform] || 'youtube-cookies.txt');
}

function runYtDlp(args) {
  return new Promise((resolve, reject) => {
    const child = spawn('python3', ['-m', 'yt_dlp', ...args], {
      cwd: process.cwd(),
      env: { ...process.env, PYTHONUNBUFFERED: '1' }
    });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (chunk) => { stdout += chunk.toString(); });
    child.stderr.on('data', (chunk) => { stderr += chunk.toString(); });
    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) resolve(stdout);
      else reject(new Error(stderr || `yt-dlp exited with code ${code}`));
    });
  });
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const url = String(body.url || '').trim();
    const platform = String(body.platform || 'youtube').toLowerCase();
    if (!url) return { statusCode: 400, body: JSON.stringify({ error: 'URL is required' }) };

    const args = [
      '--dump-single-json',
      '--no-warnings',
      '--no-call-home',
      '--cookies', cookiesPath(platform),
      url
    ];

    const output = await runYtDlp(args);
    const info = JSON.parse(output);

    const safe = {
      id: info.id,
      title: info.title,
      extractor: info.extractor,
      uploader: info.uploader,
      duration: info.duration,
      duration_string: info.duration_string,
      thumbnail: info.thumbnail,
      webpage_url: info.webpage_url,
      formats: (info.formats || []).map((format) => ({
        format_id: format.format_id,
        ext: format.ext,
        height: format.height,
        width: format.width,
        fps: format.fps,
        acodec: format.acodec,
        vcodec: format.vcodec,
        filesize: format.filesize,
        filesize_approx: format.filesize_approx,
        format_note: format.format_note
      })),
      entries: Array.isArray(info.entries) ? info.entries.slice(0, 60).map((entry) => ({
        id: entry.id,
        title: entry.title,
        thumbnail: entry.thumbnail,
        url: entry.url,
        webpage_url: entry.webpage_url,
        original_url: entry.original_url
      })) : []
    };

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      body: JSON.stringify(safe)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: error.message })
    };
  }
};
