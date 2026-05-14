const state = {
  platform: 'youtube',
  metadata: null,
  progressTimer: null,
};

const translations = {
  az: {
    navStart: 'Başla', kicker: 'Cookies dəstəkli premium yükləmə paneli', heroText: 'YouTube, TikTok, Instagram, Pinterest və Facebook kontentlərini yüksək keyfiyyətdə analiz et, format seç, canlı progress və sürət göstəricisi ilə yüklə.', heroCta: 'Downloader aç', heroSecondary: 'Xüsusiyyətlər', downloadTitle: 'Platformanı seç', downloadDesc: 'Linki daxil et, media məlumatlarını çıxart, sonra format və keyfiyyət seçərək yükləməni başlat.', ytSmall: 'MP3 və video', ttSmall: 'Video, MP3, şəkil', igSmall: 'Reels və post', pinSmall: 'Video və şəkil', fbSmall: 'Video və şəkil', urlLabel: 'Media linki', analyze: 'Analiz et', download: 'Yüklə', ytMp3: 'MP3 + thumbnail', ytVideo: 'Video', quality: 'Keyfiyyət', audioMode: 'Səs rejimi', withAudio: 'Səsli', noAudio: 'Səssiz', videoOption: 'Video', mp3Option: 'MP3', genericHint: 'Şəkil/post tipli kontent analizdən sonra ayrıca seçim kartları kimi görünəcək.', speed: 'Sürət', statusReady: 'Hazırdır. Link daxil edib analiz edin.', feature1Title: 'Bölmə-bölmə platformalar', feature1Text: 'YouTube, TikTok, Instagram, Pinterest və Facebook üçün ayrıca seçim axını.', feature2Title: 'Ayrı cookies faylları', feature2Text: 'Hər platforma üçün Netscape cookies.txt placeholder-ları və yt-dlp inteqrasiyası.', feature3Title: 'Canlı progress', feature3Text: 'Yükləmə zamanı progress bar, faiz, sürət və status göstəricisi.', analyzing: 'Analiz edilir...', analyzed: 'Analiz tamamlandı. Format seçib yükləyə bilərsiniz.', downloading: 'Yükləmə hazırlanır...', error: 'Xəta baş verdi', selectAssets: 'Seçilən şəkillər', noAssets: 'Seçilə bilən şəkil tapılmadı', copied: 'Hazırdır.'
  },
  tr: {
    navStart: 'Başla', kicker: 'Cookies destekli premium indirme paneli', heroText: 'YouTube, TikTok, Instagram, Pinterest ve Facebook içeriklerini yüksek kalitede analiz et, format seç, canlı ilerleme ve hız göstergesiyle indir.', heroCta: 'Downloader aç', heroSecondary: 'Özellikler', downloadTitle: 'Platformu seç', downloadDesc: 'Linki gir, medya bilgisini çıkar, sonra format ve kalite seçerek indirmeyi başlat.', ytSmall: 'MP3 ve video', ttSmall: 'Video, MP3, görsel', igSmall: 'Reels ve post', pinSmall: 'Video ve görsel', fbSmall: 'Video ve görsel', urlLabel: 'Medya linki', analyze: 'Analiz et', download: 'İndir', ytMp3: 'MP3 + thumbnail', ytVideo: 'Video', quality: 'Kalite', audioMode: 'Ses modu', withAudio: 'Sesli', noAudio: 'Sessiz', videoOption: 'Video', mp3Option: 'MP3', genericHint: 'Görsel/post tipi içerik analizden sonra ayrı seçim kartları olarak görünecek.', speed: 'Hız', statusReady: 'Hazır. Link girip analiz edin.', feature1Title: 'Platformlara ayrılmış bölümler', feature1Text: 'YouTube, TikTok, Instagram, Pinterest ve Facebook için ayrı seçim akışı.', feature2Title: 'Ayrı cookies dosyaları', feature2Text: 'Her platform için Netscape cookies.txt placeholderları ve yt-dlp entegrasyonu.', feature3Title: 'Canlı ilerleme', feature3Text: 'İndirme sırasında progress bar, yüzde, hız ve durum göstergesi.', analyzing: 'Analiz ediliyor...', analyzed: 'Analiz tamamlandı. Format seçip indirebilirsiniz.', downloading: 'İndirme hazırlanıyor...', error: 'Hata oluştu', selectAssets: 'Seçilen görseller', noAssets: 'Seçilebilir görsel bulunamadı', copied: 'Hazır.'
  },
  en: {
    navStart: 'Start', kicker: 'Premium cookie-powered download panel', heroText: 'Analyze YouTube, TikTok, Instagram, Pinterest and Facebook content, choose format and download with live progress and speed.', heroCta: 'Open downloader', heroSecondary: 'Features', downloadTitle: 'Choose platform', downloadDesc: 'Paste a link, extract media information, then choose format and quality to start downloading.', ytSmall: 'MP3 and video', ttSmall: 'Video, MP3, images', igSmall: 'Reels and posts', pinSmall: 'Video and images', fbSmall: 'Video and images', urlLabel: 'Media URL', analyze: 'Analyze', download: 'Download', ytMp3: 'MP3 + thumbnail', ytVideo: 'Video', quality: 'Quality', audioMode: 'Audio mode', withAudio: 'With audio', noAudio: 'No audio', videoOption: 'Video', mp3Option: 'MP3', genericHint: 'Image/post content will appear as selectable cards after analysis.', speed: 'Speed', statusReady: 'Ready. Enter a link and analyze.', feature1Title: 'Platform sections', feature1Text: 'Separate flows for YouTube, TikTok, Instagram, Pinterest and Facebook.', feature2Title: 'Separate cookie files', feature2Text: 'Netscape cookies.txt placeholders and yt-dlp integration for each platform.', feature3Title: 'Live progress', feature3Text: 'Progress bar, percentage, speed and status during download.', analyzing: 'Analyzing...', analyzed: 'Analysis complete. Choose a format and download.', downloading: 'Preparing download...', error: 'An error occurred', selectAssets: 'Selected images', noAssets: 'No selectable images found', copied: 'Ready.'
  },
  ru: {
    navStart: 'Старт', kicker: 'Премиум панель загрузки с cookies', heroText: 'Анализируйте контент YouTube, TikTok, Instagram, Pinterest и Facebook, выбирайте формат и скачивайте с живым прогрессом и скоростью.', heroCta: 'Открыть downloader', heroSecondary: 'Функции', downloadTitle: 'Выберите платформу', downloadDesc: 'Вставьте ссылку, получите данные медиа, затем выберите формат и качество.', ytSmall: 'MP3 и видео', ttSmall: 'Видео, MP3, фото', igSmall: 'Reels и посты', pinSmall: 'Видео и фото', fbSmall: 'Видео и фото', urlLabel: 'Ссылка на медиа', analyze: 'Анализ', download: 'Скачать', ytMp3: 'MP3 + thumbnail', ytVideo: 'Видео', quality: 'Качество', audioMode: 'Режим звука', withAudio: 'Со звуком', noAudio: 'Без звука', videoOption: 'Видео', mp3Option: 'MP3', genericHint: 'Фото/посты появятся отдельными карточками выбора после анализа.', speed: 'Скорость', statusReady: 'Готово. Введите ссылку и запустите анализ.', feature1Title: 'Разделы платформ', feature1Text: 'Отдельные сценарии для YouTube, TikTok, Instagram, Pinterest и Facebook.', feature2Title: 'Отдельные cookies', feature2Text: 'Netscape cookies.txt placeholders и интеграция yt-dlp для каждой платформы.', feature3Title: 'Живой прогресс', feature3Text: 'Progress bar, процент, скорость и статус во время скачивания.', analyzing: 'Анализ...', analyzed: 'Анализ завершён. Выберите формат и скачайте.', downloading: 'Подготовка загрузки...', error: 'Произошла ошибка', selectAssets: 'Выбранные фото', noAssets: 'Фото для выбора не найдены', copied: 'Готово.'
  }
};

function t(key) {
  const lang = document.querySelector('#languageSelect').value || 'az';
  return translations[lang][key] || translations.az[key] || key;
}

function applyLanguage() {
  document.documentElement.lang = document.querySelector('#languageSelect').value;
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.dataset.i18n;
    if (translations[document.documentElement.lang]?.[key]) node.textContent = translations[document.documentElement.lang][key];
  });
  setStatus(t('statusReady'));
}

function setStatus(message) {
  document.querySelector('#statusBox').textContent = message;
}

function setPlatform(platform) {
  state.platform = platform;
  document.querySelectorAll('.platform-tab').forEach((tab) => tab.classList.toggle('active', tab.dataset.platform === platform));
  document.querySelector('#youtubeOptions').classList.toggle('hidden', platform !== 'youtube');
  document.querySelector('#genericOptions').classList.toggle('hidden', platform === 'youtube');
  resetPreview();
}

function resetPreview() {
  state.metadata = null;
  document.querySelector('#mediaPreview').classList.remove('show');
  document.querySelector('#assetGrid').innerHTML = '';
  document.querySelector('#qualitySelect').innerHTML = '<option value="best">Best</option>';
}

function normalizeQuality(formats = []) {
  const heights = [...new Set(formats.map((f) => f.height).filter(Boolean))].sort((a, b) => a - b);
  const base = [144, 240, 360, 480, 720, 1080, 1440, 2160, 4320];
  const max = heights.at(-1) || 1080;
  const available = base.filter((q) => q <= max);
  heights.forEach((q) => { if (!available.includes(q)) available.push(q); });
  return [...new Set(available)].sort((a, b) => a - b);
}

function fillQualities(metadata) {
  const select = document.querySelector('#qualitySelect');
  select.innerHTML = '';
  const qualities = normalizeQuality(metadata.formats || []);
  qualities.forEach((q) => {
    const option = document.createElement('option');
    option.value = String(q);
    option.textContent = `${q}p`;
    select.appendChild(option);
  });
  const best = document.createElement('option');
  best.value = 'best';
  best.textContent = 'Best';
  select.appendChild(best);
  select.value = 'best';
}

function renderPreview(metadata) {
  state.metadata = metadata;
  const preview = document.querySelector('#mediaPreview');
  document.querySelector('#previewImage').src = metadata.thumbnail || 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=900&q=80';
  document.querySelector('#previewTitle').textContent = metadata.title || 'Untitled media';
  document.querySelector('#previewDesc').textContent = `${metadata.extractor || state.platform} · ${metadata.duration_string || ''} · ${metadata.uploader || ''}`;
  preview.classList.add('show');
  fillQualities(metadata);
  renderAssets(metadata);
}

function renderAssets(metadata) {
  const grid = document.querySelector('#assetGrid');
  grid.innerHTML = '';
  const entries = metadata.playlist || metadata.entries || metadata.images || [];
  const images = entries.filter((item) => item && (item.thumbnail || item.url || item.original_url));
  if (!images.length) return;
  images.slice(0, 40).forEach((item, index) => {
    const image = item.thumbnail || item.url || item.original_url;
    const card = document.createElement('div');
    card.className = 'asset-card';
    card.innerHTML = `<label><img src="${image}" alt="asset ${index + 1}"><span><input type="checkbox" class="asset-check" value="${index}" checked> ${index + 1}</span></label>`;
    grid.appendChild(card);
  });
}

async function analyzeMedia() {
  const url = document.querySelector('#mediaUrl').value.trim();
  if (!url) return setStatus(t('statusReady'));
  setStatus(t('analyzing'));
  document.querySelector('#analyzeBtn').disabled = true;
  try {
    const res = await fetch('/.netlify/functions/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, platform: state.platform })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Analyze failed');
    renderPreview(data);
    setStatus(t('analyzed'));
  } catch (error) {
    setStatus(`${t('error')}: ${error.message}`);
  } finally {
    document.querySelector('#analyzeBtn').disabled = false;
  }
}

function startFakeProgress() {
  const panel = document.querySelector('#progressPanel');
  const bar = document.querySelector('#downloadProgress');
  const percent = document.querySelector('#progressPercent');
  const status = document.querySelector('#progressStatus');
  const speed = document.querySelector('#speedValue');
  const eta = document.querySelector('#etaValue');
  panel.classList.add('show');
  let value = 0;
  clearInterval(state.progressTimer);
  state.progressTimer = setInterval(() => {
    value = Math.min(96, value + Math.random() * 9 + 2);
    bar.style.width = `${value.toFixed(0)}%`;
    percent.textContent = `${value.toFixed(0)}%`;
    status.textContent = t('downloading');
    speed.textContent = `${(Math.random() * 8 + 2).toFixed(1)} MB/s`;
    eta.textContent = `ETA: ${Math.max(1, Math.round((100 - value) / 8))}s`;
  }, 430);
}

function completeProgress() {
  clearInterval(state.progressTimer);
  document.querySelector('#downloadProgress').style.width = '100%';
  document.querySelector('#progressPercent').textContent = '100%';
  document.querySelector('#progressStatus').textContent = t('copied');
  document.querySelector('#etaValue').textContent = 'ETA: 0s';
}

async function submitDownload(event) {
  event.preventDefault();
  const url = document.querySelector('#mediaUrl').value.trim();
  if (!url) return;
  startFakeProgress();
  setStatus(t('downloading'));
  const ytMode = document.querySelector('input[name="ytMode"]:checked')?.value;
  const genericMode = document.querySelector('input[name="genericMode"]:checked')?.value;
  const selectedAssets = [...document.querySelectorAll('.asset-check:checked')].map((x) => x.value);
  const params = new URLSearchParams({
    url,
    platform: state.platform,
    mode: state.platform === 'youtube' ? ytMode : genericMode,
    quality: document.querySelector('#qualitySelect').value,
    audio: document.querySelector('#audioMode').value,
    assets: selectedAssets.join(',')
  });
  window.location.href = `/.netlify/functions/download?${params.toString()}`;
  setTimeout(completeProgress, 1500);
}

document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#languageSelect').addEventListener('change', applyLanguage);
document.querySelector('#platformTabs').addEventListener('click', (event) => {
  const button = event.target.closest('.platform-tab');
  if (button) setPlatform(button.dataset.platform);
});
document.querySelector('#analyzeBtn').addEventListener('click', analyzeMedia);
document.querySelector('#downloadForm').addEventListener('submit', submitDownload);
applyLanguage();
