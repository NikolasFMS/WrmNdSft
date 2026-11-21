// Strictly isolated Service Worker for «Тёплое с мягким» (Vanilka)
// Safe for multi-app GitHub Pages hosting: only touches its own cache prefix and own scope.
const CACHE_PREFIX = 'teploe-s-myagkim-vanilka-';
const CACHE_NAME = CACHE_PREFIX + 'v2';

const PRECACHE_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './data.js',
  './app.js',
  './manifest.webmanifest',
  './icons/icon.svg',
  './icons/pwa-192x192.png',
  './icons/pwa-512x512.png',
  './icons/pwa-maskable-512x512.png',
  './icons/apple-touch-icon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const scopeUrl = self.registration.scope;
  if (!req.url.startsWith(scopeUrl)) {
    return; // Never intercept other apps hosted on the same GitHub Pages origin
  }

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) =>
      cache.match(req).then((cached) => {
        if (cached) {
          // Stale-while-revalidate in background when online
          fetch(req)
            .then((res) => {
              if (res && res.status === 200 && res.type === 'basic') {
                cache.put(req, res.clone());
              }
            })
            .catch(() => {});
          return cached;
        }

        return fetch(req)
          .then((res) => {
            if (res && res.status === 200 && res.type === 'basic') {
              cache.put(req, res.clone());
            }
            return res;
          })
          .catch(() => {
            if (req.mode === 'navigate') {
              return cache.match('./index.html');
            }
            return new Response('Offline', { status: 503, statusText: 'Offline' });
          });
      })
    )
  );
});
