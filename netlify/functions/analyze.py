import json, subprocess, sys, os
from pathlib import Path

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

def handler(event, context):
    if event.get('httpMethod') != 'POST':
        return {'statusCode': 405, 'body': 'Method Not Allowed'}

    try:
        body = json.loads(event.get('body', '{}'))
        url = body.get('url', '').strip()
        platform = body.get('platform', 'youtube').lower()
        if not url:
            return {'statusCode': 400, 'body': json.dumps({'error': 'URL required'})}

        cmd = [
            sys.executable, '-m', 'yt_dlp',
            '--dump-single-json',
            '--no-warnings',
            '--no-call-home',
            '--cookies', str(cookies_path(platform)),
            url
        ]
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        info = json.loads(result.stdout)

        safe = {
            'id': info.get('id'),
            'title': info.get('title'),
            'extractor': info.get('extractor'),
            'uploader': info.get('uploader'),
            'duration': info.get('duration'),
            'duration_string': info.get('duration_string'),
            'thumbnail': info.get('thumbnail'),
            'webpage_url': info.get('webpage_url'),
            'formats': [{
                'format_id': f.get('format_id'),
                'ext': f.get('ext'),
                'height': f.get('height'),
                'width': f.get('width'),
                'fps': f.get('fps'),
                'acodec': f.get('acodec'),
                'vcodec': f.get('vcodec'),
                'filesize': f.get('filesize'),
                'filesize_approx': f.get('filesize_approx'),
                'format_note': f.get('format_note')
            } for f in info.get('formats', [])],
            'entries': [{
                'id': e.get('id'),
                'title': e.get('title'),
                'thumbnail': e.get('thumbnail'),
                'url': e.get('url'),
                'webpage_url': e.get('webpage_url'),
                'original_url': e.get('original_url')
            } for e in info.get('entries', [])[:60]]
        }
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps(safe)
        }
    except subprocess.CalledProcessError as e:
        return {'statusCode': 500, 'body': json.dumps({'error': e.stderr})}
    except Exception as e:
        return {'statusCode': 500, 'body': json.dumps({'error': str(e)})}
