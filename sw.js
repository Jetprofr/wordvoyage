
self.addEventListener('install', event => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open('wordvoyage-cache-v2').then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './manifest.json',
        './splash_screen.png',
        './css/style.css',
        './js/script.js',
        './images/flags/thai.png',
        './pages/thai/index_thai.html'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
