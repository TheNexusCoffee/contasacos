// service-worker.js
// Simple cache‑first strategy for a static PWA.
const CACHE_NAME = 'contasacos-v1';
const URLS_TO_CACHE = [
  '/',
  './index.html',
  './manifest.json',
  './icon_512.jpg',
  './script.js',
  // external assets – we cache the CDN versions for offline use
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js',
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(keyList.map(key => {
        if (!cacheWhitelist.includes(key)) {
          return caches.delete(key);
        }
      }))
    )
  );
});

self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      // Fallback to network and cache the result
      return fetch(event.request).then(networkResponse => {
        // Clone the response because response streams can only be consumed once
        const responseClone = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseClone);
        });
        return networkResponse;
      }).catch(() => {
        // Optional: return a fallback page for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
