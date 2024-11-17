const CACHE_NAME = 'portfolio-cache-v1';
const BASE_URL = '/va-rb-portfolio';

const STATIC_ASSETS = [
  `${BASE_URL}/`,
  `${BASE_URL}/index.html`,
  `${BASE_URL}/manifest.json`,
  `${BASE_URL}/favicon.ico`,
  `${BASE_URL}/assets/css/index.css`,
  `${BASE_URL}/assets/js/react-vendor.js`,
  `${BASE_URL}/assets/js/ui-vendor.js`
];

const CACHE_STRATEGIES = {
  images: {
    cacheName: 'image-cache-v1',
    maxEntries: 50,
    maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
  },
  static: {
    cacheName: 'static-cache-v1',
    maxEntries: 100,
    maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
  },
  fonts: {
    cacheName: 'font-cache-v1',
    maxEntries: 10,
    maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
  }
};

// Helper function to determine cache strategy based on request
const getCacheStrategy = (request) => {
  const url = new URL(request.url);
  
  if (request.destination === 'image') {
    return CACHE_STRATEGIES.images;
  }
  if (request.destination === 'font') {
    return CACHE_STRATEGIES.fonts;
  }
  if (url.pathname.endsWith('.css') || url.pathname.endsWith('.js')) {
    return CACHE_STRATEGIES.static;
  }
  return null;
};

// Helper function to clean old caches
const cleanOldCaches = async () => {
  const cacheNames = await caches.keys();
  const validCacheSet = new Set([
    CACHE_NAME,
    CACHE_STRATEGIES.images.cacheName,
    CACHE_STRATEGIES.static.cacheName,
    CACHE_STRATEGIES.fonts.cacheName
  ]);

  return Promise.all(
    cacheNames
      .filter(name => !validCacheSet.has(name))
      .map(name => caches.delete(name))
  );
};

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(cleanOldCaches());
});

self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  const strategy = getCacheStrategy(event.request);
  
  if (strategy) {
    event.respondWith(
      caches.open(strategy.cacheName).then(async (cache) => {
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
          // Return cached response and update cache in background
          event.waitUntil(
            fetch(event.request)
              .then(response => cache.put(event.request, response.clone()))
              .catch(() => {/* Ignore errors */})
          );
          return cachedResponse;
        }

        try {
          const response = await fetch(event.request);
          cache.put(event.request, response.clone());
          return response;
        } catch (error) {
          console.error('Fetch failed:', error);
          throw error;
        }
      })
    );
  } else {
    // Network-first strategy for other requests
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match(event.request))
    );
  }
});
