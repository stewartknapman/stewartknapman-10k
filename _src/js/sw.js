/*
this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('app10k').then(function(cache) {
      return cache.addAll([
        '/c/a.css',
        '/c/b.css',
        '/i/i.svg',
        '/j/a.js'
      ]);
    })
  );
});
*/

/*
this.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );

//   if (/\.jpg$|.gif$|.png$/.test(event.request.url)) {
//     return caches.open('app10k').then(function(cache) {
//       cache.put(event.request.url);
//       return response;
//     });
//   } else {    
//   }
});
*/