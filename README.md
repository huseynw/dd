# HUSEVN DOWNLOADER

Premium soft dizaynlı, çoxdilli və Netlify Functions dəstəkli multi-platform downloader.

## Platformalar

Layihə aşağıdakı platformalar üçün UI və `yt-dlp` əsaslı backend axını ilə hazırlanıb:

- YouTube: MP3 + thumbnail, video, keyfiyyət seçimi, səsli/səssiz video
- TikTok: video, MP3, analiz zamanı çıxan şəkil/post seçimi
- Instagram: reels, post və şəkil seçim axını
- Pinterest: video və şəkil
- Facebook: video və şəkil

## Fayl strukturu

```text
public/
  index.html
  styles.css
  app.js
netlify/functions/
  analyze.js
  download.js
cookies/
  youtube-cookies.txt
  tiktok-cookies.txt
  instagram-cookies.txt
  pinterest-cookies.txt
  facebook-cookies.txt
netlify.toml
requirements.txt
package.json
```

## Cookies

`cookies/` qovluğundakı fayllar placeholder-dır. Real işləmə üçün hər platformanın cookies faylını Netscape formatında export edib uyğun faylın içinə yazın.

Məsələn:

- YouTube cookies → `cookies/youtube-cookies.txt`
- TikTok cookies → `cookies/tiktok-cookies.txt`
- Instagram cookies → `cookies/instagram-cookies.txt`
- Pinterest cookies → `cookies/pinterest-cookies.txt`
- Facebook cookies → `cookies/facebook-cookies.txt`

## Netlify deploy

1. ZIP faylı açın.
2. Layihəni GitHub repoya yükləyin və ya Netlify-a drag/drop edin.
3. Netlify build ayarları:
   - Publish directory: `public`
   - Functions directory: `netlify/functions`
4. `requirements.txt` içində `yt-dlp` var. Netlify Python runtime dependency-ni build zamanı quraşdırmalıdır.

## Vacib qeyd

Netlify Functions serverless mühitdir və böyük video fayllarında timeout/body-size limitləri ola bilər. Kiçik və orta ölçülü yükləmələr üçün uyğundur. Böyük fayllar və uzun videolar üçün eyni kodu VPS, Railway, Render və ya Docker serverində işlətmək daha stabil nəticə verəcək.

Canlı progress frontend-də istifadəçi təcrübəsi üçün göstərilir. Serverless function faylı bir request cavabı kimi qaytardığı üçün real byte-level streaming progress Netlify standart function modelində məhduddur. Bunun üçün production səviyyəsində queue + object storage + SSE/WebSocket arxitekturası tövsiyə olunur.

## Lokal test

```bash
npm install
npm run dev
```

Sonra Netlify Dev URL-ni açın.
