import json, subprocess, os, tempfile, shutil, base64, sys
from pathlib import Path
import uuid

COOKIES_MAP = {
    'youtube': 'youtube-cookies.txt',
    'tiktok': 'tiktok-cookies.txt',
    'instagram': 'instagram-cookies.txt',
    'pinterest': 'pinterest-cookies.txt',
    'facebook': 'facebook-cookies.txt'
}

def cookies_path(platform):
    base = Path(__file__).parent / 'cookies'
    return base / COOKIES_MAP.get(platform, 'youtube-cookies.txt')

def build_format_args(platform, mode, quality, audio):
    if mode == 'mp3':
        return ['-x', '--audio-format', 'mp3', '--audio-quality', '0', '--embed-thumbnail', '--add-metadata']
    if platform == 'youtube':
        if audio == 'no-audio':
            if quality and quality != 'best':
                return ['-f', f'bestvideo[height<={quality}]/bestvideo/best']
            return ['-f', 'bestvideo/best']
        if quality and quality != 'best':
            return ['-f', f'bestvideo[height<={quality}]+bestaudio/best[height<={quality}]/best', '--merge-output-format', 'mp4']
        return ['-f', 'bestvideo+bestaudio/best', '--merge-output-format', 'mp4']
    return ['-f', 'bestvideo+bestaudio/best', '--merge-output-format', 'mp4']

def handler(event, context):
    try:
        params = event.get('queryStringParameters', {}) or {}
        url = params.get('url', '').strip()
        platform = params.get('platform', 'youtube').lower()
        mode = params.get('mode', 'video').lower()
        quality = params.get('quality', 'best')
        audio = params.get('audio', 'with-audio')

        if not url:
            return {'statusCode': 400, 'body': 'URL required'}

        work_dir = tempfile.mkdtemp(prefix='husevn_')
        try:
            out_template = os.path.join(work_dir, f'husevn_{uuid.uuid4().hex}.%(ext)s')
            cmd = [
                sys.executable, '-m', 'yt_dlp',
                '--no-warnings', '--no-call-home',
                '--cookies', str(cookies_path(platform)),
                *build_format_args(platform, mode, quality, audio),
                '-o', out_template,
                url
            ]
            subprocess.run(cmd, capture_output=True, check=True)

            files = [f for f in Path(work_dir).iterdir() if f.is_file()]
            if not files:
                raise Exception('No output file created')
            file = max(files, key=lambda f: f.stat().st_size)
            data = file.read_bytes()
            ext = file.suffix[1:].lower()
            content_type = {
                'mp3': 'audio/mpeg',
                'webp': 'image/webp',
                'jpg': 'image/jpeg',
                'jpeg': 'image/jpeg',
                'png': 'image/png'
            }.get(ext, 'video/mp4')

            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': content_type,
                    'Content-Disposition': f'attachment; filename="{file.name}"',
                    'Cache-Control': 'no-store'
                },
                'body': base64.b64encode(data).decode('utf-8'),
                'isBase64Encoded': True
            }
        finally:
            shutil.rmtree(work_dir, ignore_errors=True)
    except subprocess.CalledProcessError as e:
        return {'statusCode': 500, 'body': f'Download error: {e.stderr.decode()}'}
    except Exception as e:
        return {'statusCode': 500, 'body': f'Download error: {str(e)}'}
