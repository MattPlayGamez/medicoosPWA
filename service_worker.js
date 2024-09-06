self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('my-cache').then((cache) => {
      return cache.addAll([
        '/', 
        '/index.html', 
        '/style.css', 
        '/app.js',
        // Add any other default files you want to cache during install
      ]);
    }),
  );
});

// Cache everything (all requests)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // If the resource is in the cache, return it, otherwise fetch and cache it
      return response || fetch(event.request).then((networkResponse) => {
        return caches.open('my-cache').then((cache) => {
          cache.put(event.request, networkResponse.clone()); // Cache the fetched response
          return networkResponse; // Return the network response to the user
        });
      });
    }),
  );
});
