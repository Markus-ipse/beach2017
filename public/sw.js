var CACHE_NAME = 'v3';
var urlsToCache = [
    '/',
    '/js/index.js',
    '/css/style.css'
];

function withFirstArg(fn, firstArg) {
    return function(secondArg) {
        return fn(firstArg, secondArg);
    }
}

function addUrlsToCache(cache) {
    return cache.addAll(urlsToCache);
}

function onInstall(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(addUrlsToCache)
    );
}

function onCacheOpened(request, cache) {
    function serveFromThenUpdateCache(cacheResponse) {
        var fetchPromise = fetch(request).then(function(networkResponse) {
            cache.put(request, networkResponse.clone());
            return networkResponse;
        });

        return cacheResponse || fetchPromise;
    }

    return cache.match(request).then(serveFromThenUpdateCache);
}

function onFetch(event) {
    event.respondWith(
        caches.open(CACHE_NAME).then(withFirstArg(onCacheOpened, event.request))
    )
}

function removeKeyFromCache(key) {
    var cacheWhitelist = [CACHE_NAME];

    if (cacheWhitelist.indexOf(key) === -1) {
        console.info('Deleting', key, 'from cache');
        return caches.delete(key);
    }
}

function onActive(event) {
    event.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(removeKeyFromCache));
        })
    );
}

self.addEventListener('install', onInstall);

self.addEventListener('fetch', onFetch);

self.addEventListener('activate', onActive);