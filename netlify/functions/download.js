const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');

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

function sanitizeName(name) {
  return String(name || 'husevn-download').replace(/[\\/:*?"<>|]+/g, '-').slice(0, 120);
}

function buildFormat({ platform, mode, quality, audio }) {
  if (mode === 'mp3') return ['-x', '--audio-format', 'mp3', '--audio-quality', '0', '--embed-thumbnail', '--add-metadata'];

  if (platform === 'youtube') {
    if (audio === 'no-audio') {
      if (quality && quality !== 'best') return ['-f', `bestvideo[height<=${quality}]/bestvideo/best`];
      return ['-f', 'bestvideo/best'];
    }
    if (quality && quality !== 'best') return ['-f', `bestvideo[height<=${quality}]+bestaudio/best[height<=${quality}]/best`, '--merge-output-format', 'mp4'];
    return ['-f', 'bestvideo+bestaudio/best', '--merge-output-format', 'mp4'];
  }

  return ['-f', 'bestvideo+bestaudio/best', '--merge-output-format', 'mp4'];
}

function runYtDlp(args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn('python3', ['-m', 'yt_dlp', ...args], {
      cwd,
      env: { ...process.env, PYTHONUNBUFFERED: '1' }
    });
    let stderr = '';
    child.stderr.on('data', (chunk) => { stderr += chunk.toString(); });
    child.stdout.on('data', () => {});
    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(stderr || `yt-dlp exited with code ${code}`));
    });
  });
}

exports.handler = async (event) => {
  try {
    const query = event.queryStringParameters || {};
    const url = String(query.url || '').trim();
    const platform = String(query.platform || 'youtube').toLowerCase();
    const mode = String(query.mode || 'video').toLowerCase();
    const quality = String(query.quality || 'best');
    const audio = String(query.audio || 'with-audio');

    if (!url) return { statusCode: 400, body: 'URL is required' };

    const workDir = fs.mkdtempSync(path.join(os.tmpdir(), 'husevn-'));
    const baseName = sanitizeName(`husevn-${platform}-${crypto.randomBytes(4).toString('hex')}`);
    const outputTemplate = path.join(workDir, `${baseName}.%(ext)s`);

    const args = [
      '--no-warnings',
      '--no-call-home',
      '--cookies', cookiesPath(platform),
      ...buildFormat({ platform, mode, quality, audio }),
      '-o', outputTemplate,
      url
    ];

    await runYtDlp(args, process.cwd());
    const files = fs.readdirSync(workDir).map((file) => path.join(workDir, file));
    if (!files.length) throw new Error('No output file was created');
    const file = files.sort((a, b) => fs.statSync(b).size - fs.statSync(a).size)[0];
    const data = fs.readFileSync(file);
    const filename = path.basename(file);
    const ext = path.extname(file).slice(1).toLowerCase();
    const contentType = ext === 'mp3' ? 'audio/mpeg' : ext === 'webp' ? 'image/webp' : ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : ext === 'png' ? 'image/png' : 'video/mp4';

    return {
      statusCode: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store'
      },
      body: data.toString('base64'),
      isBase64Encoded: true
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      body: `Download error: ${error.message}`
    };
  }
};
