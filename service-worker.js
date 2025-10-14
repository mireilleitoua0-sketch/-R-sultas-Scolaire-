const CACHE_NAME = 'resultats-eleves-cache-v1';
const urlsToCache = [
  '.',
  'index.html',
  'manifest.json',
  // ajoute ici les fichiers CSS, JS et images que tu utilises, par exemple :
  // 'style.css',
  // 'script.js',
  // 'icon-192.png',
  // 'icon-512.png',
];

// Installation du service worker et mise en cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => cache.addAll(urlsToCache))
  );
});

// Activation du service worker (nettoyage cache ancien)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
    .then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
});

// Interception des requêtes pour servir le cache en priorité
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
    .then(response => response || fetch(event.request))
  );
});
