var canCache = function (request) {
  if (request.method !== 'GET') {
    return false;
  }
  return (!request.url.includes('shopify') && !request.url.includes('google') && !request.url.includes('browser-sync') && !request.url.includes('chrome-extension'));
};

this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('app10k-v1').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/c/a.css',
        '/c/b.css',
        '/j/a.js',
        '/j/b.js',
        '/i/i.svg',
        '/i/poster.svg',
        '/i/jack-head.png',
        '/offline.html',
        '/j/offline.js'
      ]);
    })
  );
});

this.addEventListener('fetch', function(event) {
  event.respondWith(    
    caches.match(event.request).then(function(resp) {
      return resp || fetch(event.request).then(function(response) {
        if (canCache(event.request) && response.ok) {
          caches.open('app10k-v1').then(function(cache) {
            cache.put(event.request, response.clone());
          });
        }
        return response;
      });
    }).catch(function() {
      // We couldn't retrive the request and it's not cached 
      // so return somthing if it's an image, html or js
      if (/\.jpg$|.gif$|.png$/.test(event.request.url)) {
        return caches.match('/i/jack-head.png');
      } else if (/\.html$/.test(event.request.url)) {
        return caches.match('/offline.html');
      } else if (/\.js$/.test(event.request.url)) {
        return caches.match('/j/offline.js');
      }
    })
  );
});