// Example code mostly from: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers

var canCache = function (request) {
  return (!request.url.includes('shopify') && !request.url.includes('google') && !request.url.includes('browser-sync') && !request.url.includes('chrome-extension'));
};

this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('app10k-v1').then(function(cache) {
      return cache.addAll([
        '/c/a.css',
        '/c/b.css',
        '/j/a.js',
        '/j/b.js',
        '/i/i.svg',
        '/i/poster.svg',
        '/i/jack-head.png',
        '/offline.html'
      ]);
    })
  );
});

this.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(resp) {
      return resp || fetch(event.request).then(function(response) {
        if (canCache(event.request)) {
          caches.open('app10k-v1').then(function(cache) {
            cache.put(event.request, response.clone());
          });
        }
        return response;
      });
    }).catch(function() {
      // We couldn't retrive the request and it's not cached 
      // so only return somthing if it's an image or html
      if (/\.jpg$|.gif$|.png$/.test(event.request.url)) {
        return caches.match('/i/jack-head.png');
      } else if (/\.html$/.test(event.request.url)) {
        return caches.match('/offline.html');
      }
    })
  );
});