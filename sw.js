const CACHE_NAME = 'territory-io-v3.2.1'; // Incrementing version to trigger SW update
const ASSETS = [
  'index.html',
  'manifest.webmanifest',
  'assets/rocket.gif',
  'assets/warplane.gif',
  'assets/transport-airplane.gif',
  'assets/explosion.gif',
  'assets/warplane-explosion.gif',
  'assets/fx/launching-missile.mp3',
  'assets/fx/warplane-sound-effect.mp3',
  'assets/fx/warp_exp_sound.mp3',
  'assets/fx/explosion_sound.mp3'
];

const EXTERNAL_ASSETS = [
  'https://cdn.tailwindcss.com'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // 1. Cache internal assets
      const internalPromises = ASSETS.map((asset) => {
        // Use a cache-busting fetch during installation to ensure we get fresh files
        return fetch(`${asset}?t=${Date.now()}`).then(response => {
          if (!response.ok) throw new Error('Network response was not ok');
          return cache.put(asset, response);
        }).catch((err) => {
          console.error(`Failed to cache asset: ${asset}`, err);
          // Fallback to basic add if cache-busting fails
          return cache.add(asset);
        });
      });

      // 2. Cache external assets with no-cors to avoid CORS issues
      const externalPromises = EXTERNAL_ASSETS.map((url) => {
        return fetch(url, { mode: 'no-cors' }).then((response) => {
          return cache.put(url, response);
        }).catch((err) => {
          console.error(`Failed to cache external asset: ${url}`, err);
        });
      });

      return Promise.all([...internalPromises, ...externalPromises]);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Always fetch index.html from network first to check for updates
  if (event.request.mode === 'navigate' || event.request.url.endsWith('index.html')) {
    event.respondWith(
      // Use a cache-busting fetch for the navigation request to bypass browser internal cache
      fetch(`${event.request.url}${event.request.url.includes('?') ? '&' : '?'}t=${Date.now()}`, {
        cache: 'no-store'
      }).then((response) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      }).catch(() => caches.match('index.html'))
    );
    return;
  }

  // Stale-while-revalidate strategy for other assets
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
      return cachedResponse || fetchPromise;
    })
  );
});
