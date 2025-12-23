const CACHE_NAME = 'kioku-no-kanata-v2';
const urlsToCache = [
  './',
  './memo.html',
  './manifest.json'
];

// インストール時に指定したファイルをキャッシュに保存
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// ネットワークリクエスト時にキャッシュがあればそれを返し、なければ通信する
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
