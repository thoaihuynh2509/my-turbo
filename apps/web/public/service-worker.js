// public/service-worker.js
const CACHE_NAME = 'site-cache-v1';
const ASSETS = [
  '/',
  '/offline.html',
  '/favicon.ico'
];

self.addEventListener('install', (e) => {
  console.log('[sw] install');
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .catch((err) => console.warn('[sw] cache addAll failed', err))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  console.log('[sw] activate');
  e.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names.map((name) =>
          name !== CACHE_NAME ? caches.delete(name) : Promise.resolve()
        )
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // Bỏ qua các request không phải GET
  if (e.request.method !== 'GET') return;

  // Bỏ qua các request đặc biệt
  if (
    e.request.url.includes('/_next/') ||
    e.request.url.includes('/__nextjs_') ||
    e.request.url.includes('/service-worker.js') ||
    e.request.url.includes('chrome-extension') ||
    e.request.url.startsWith('chrome-extension:')
  ) {
    return;
  }

  e.respondWith(
    caches.match(e.request).then((cached) => {
      // Trả về cache nếu có
      if (cached) {
        console.log('[sw] cache hit:', e.request.url);
        return cached;
      }

      // Nếu không có cache, fetch từ network
      return fetch(e.request)
        .then((response) => {
          // Kiểm tra response hợp lệ
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone response để cache
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(e.request, responseToCache);
            })
            .catch((err) => console.warn('[sw] cache put failed:', err));

          return response;
        })
        .catch(() => {
          console.log('[sw] fetch failed, offline fallback:', e.request.url);

          // Nếu là navigation request và offline, trả về offline.html
          if (e.request.mode === 'navigate') {
            return caches.match('/offline.html');
          }

          return new Response('Network error happened', {
            status: 408,
            headers: { 'Content-Type': 'text/plain' },
          });
        });
    })
  );
});