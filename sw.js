const CACHE_NAME = 'calculadora-sv-cache-v1';
const urlsToCache = [
    '/',
    'index.html',
    'style.css',
    'app.js'
];

// Instala el Service Worker y guarda los archivos base en la caché
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache abierta');
                return cache.addAll(urlsToCache);
            })
    );
});

// Intercepta las peticiones y responde desde la caché si es posible
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Si el archivo está en caché, lo devuelve. Si no, lo busca en la red.
                return response || fetch(event.request);
            })
    );
});