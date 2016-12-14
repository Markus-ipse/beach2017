var CACHE_NAME = 'v1';
var urlsToCache = [
    '/',
    '/js/index.js',
    '/css/style.css'
];

this.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Cache opened');
                return cache.addAll(urlsToCache);
            })
    );
});

this.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(cacheResponse) {
                if (cacheResponse) {
                    return cacheResponse;
                }

                return fetch(event.request)
                    .then(function(response) {
                        return caches.open(CACHE_NAME)
                            .then(function(cache) {
                                cache.put(event.request, response.clone());
                                return response;
                            });
                    });
            })
    );
});

this.addEventListener('activate', function(event) {
    var cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (cacheWhitelist.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }));
        })
    );
});