// Example code from: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers

this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('app10k').then(function(cache) {
      return cache.addAll([
        '/c/a.css',
        '/c/b.css',
        '/j/a.js',
        '/j/b.js',
        '/i/i.svg',
        '/i/poster.svg',
        '/i/jack-head.png'
      ]);
    })
  );
});

this.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(resp) {
      return resp || fetch(event.request).then(function(response) {
        caches.open('app10k').then(function(cache) {
          cache.put(event.request, response.clone());
        });
        return response;
      });
    }).catch(function() {
      return caches.match('/i/jack-head.png');
    })
  );
});