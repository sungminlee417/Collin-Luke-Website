const CACHE_NAME = 'muse-duo-v1';
const STATIC_CACHE_URLS = [
  '/',
  '/manifest.json',
  '/fonts/Candu-Condensed.otf',
  '/images/landing-logo.png',
  '/images/icon.png'
];

// Install service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_CACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// Activate service worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch strategy: Cache First for static assets, Network First for API calls
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // Skip cross-origin requests
  if (!request.url.startsWith(self.location.origin)) {
    return;
  }

  // Cache strategy for different resource types
  if (request.destination === 'image') {
    // Cache First for images
    event.respondWith(
      caches.match(request)
        .then((response) => {
          if (response) {
            return response;
          }
          return fetch(request)
            .then((response) => {
              const responseClone = response.clone();
              caches.open(CACHE_NAME)
                .then((cache) => cache.put(request, responseClone));
              return response;
            });
        })
    );
  } else if (request.destination === 'font' || 
             request.url.includes('/fonts/') || 
             request.url.includes('/_next/static/')) {
    // Cache First for fonts and static assets
    event.respondWith(
      caches.match(request)
        .then((response) => response || fetch(request))
    );
  } else {
    // Network First for everything else
    event.respondWith(
      fetch(request)
        .catch(() => caches.match(request))
    );
  }
});