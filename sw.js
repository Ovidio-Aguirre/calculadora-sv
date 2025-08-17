// 1. Damos un nuevo número de versión a nuestra caché.
const CACHE_NAME = 'calculadora-sv-cache-v3'; 

const urlsToCache = [
    '/',
    'index.html',
    'style.css',
    'app.js',
    'manifest.json'
];

// El evento 'install' guarda los archivos nuevos en la nueva caché.
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache abierta y archivos guardados en la nueva versión.');
                return cache.addAll(urlsToCache);
            })
    );
});

// El evento 'fetch' sigue sirviendo los archivos rápidamente.
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});

// 2. (ESTA ES LA PARTE NUEVA Y MÁS IMPORTANTE)
// El evento 'activate' se dispara cuando el nuevo Service Worker toma el control.
self.addEventListener('activate', event => {
  // Creamos una "lista blanca" con el único nombre de caché que queremos conservar.
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        // Buscamos en todas las cachés guardadas...
        cacheNames.map(cacheName => {
          // ...y si encontramos una que NO está en nuestra lista blanca...
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // ...la borramos. ¡Esta es la limpieza automática!
            console.log('Borrando caché antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

