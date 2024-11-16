const CACHE_NAME = 'portfolio-cache-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/css/style.css',
    '/css/utilities.css',
    '/css/animations.css',
    '/css/sections.css',
    '/css/dark-theme.css',
    '/css/notifications.css',
    '/css/preloader.css',
    '/js/main.js',
    '/js/animations.js',
    '/js/typing.js',
    '/js/content-loader.js',
    '/js/services.js',
    '/js/contact.js',
    '/js/theme.js',
    '/js/navigation.js',
    '/js/scroll-top.js',
    '/js/init.js',
    '/js/image-optimization.js',
    '/js/performance.js',
    '/assets/images/hero.png',
    '/assets/favicon/favicon-32x32.png',
    '/assets/favicon/favicon-16x16.png'
];

// Install Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch Event Strategy: Cache First, Network Fallback
self.addEventListener('fetch', (event) => {
    // Skip cross-origin requests
    if (!event.request.url.startsWith(self.location.origin)) return;

    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return cached response if found
                if (response) {
                    // Update cache in background (stale-while-revalidate)
                    fetch(event.request)
                        .then((freshResponse) => {
                            if (freshResponse) {
                                caches.open(CACHE_NAME)
                                    .then((cache) => cache.put(event.request, freshResponse));
                            }
                        });
                    return response;
                }

                // If not in cache, fetch from network
                return fetch(event.request)
                    .then((response) => {
                        // Cache successful responses
                        if (response && response.status === 200) {
                            const responseToCache = response.clone();
                            caches.open(CACHE_NAME)
                                .then((cache) => {
                                    cache.put(event.request, responseToCache);
                                });
                        }
                        return response;
                    })
                    .catch(() => {
                        // Return offline fallback for HTML requests
                        if (event.request.headers.get('accept').includes('text/html')) {
                            return caches.match('/offline.html');
                        }
                    });
            })
    );
});

// Background Sync for Contact Form
self.addEventListener('sync', (event) => {
    if (event.tag === 'contact-form-sync') {
        event.waitUntil(
            syncContactForm()
        );
    }
});

// Handle Push Notifications
self.addEventListener('push', (event) => {
    const options = {
        body: event.data.text(),
        icon: '/assets/favicon/favicon-32x32.png',
        badge: '/assets/favicon/favicon-16x16.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(
        self.registration.showNotification('Portfolio Update', options)
    );
});
