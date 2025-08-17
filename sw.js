// Define un nombre y versión para tu caché
const CACHE_NAME = 'ventas-sv-cache-v1'; 

const urlsToCache = [
    '/',
    'index.html',
    'style.css',
    'app.js',
    'manifest.json'
];

// Durante la fase de instalación, abre la caché y añade los archivos base
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache abierta y archivos guardados.');
                return cache.addAll(urlsToCache);
            })
    );
});

// Este es el manejador de peticiones. Es CRÍTICO para que la PWA sea instalable.
// Intercepta cada petición y responde desde la caché si es posible.
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Si encuentra el archivo en caché, lo devuelve. Si no, va a la red.
                return response || fetch(event.request);
            })
    );
});

// Durante la activación, elimina las cachés viejas para mantener todo limpio
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});



