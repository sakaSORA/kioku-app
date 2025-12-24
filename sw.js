const CACHE_NAME = 'kioku-v11-pro';
const ASSETS = [
    './',
    './memo.html', // ファイル名が異なる場合は修正してください
];

// インストール時にファイルをキャッシュ
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

// 通信失敗時にキャッシュを返す
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).catch(() => {
                // サーバーが止まっていてもキャッシュがあれば表示を維持
                return caches.match('./index.html');
            });
        })
    );
});
