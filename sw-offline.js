
var EXCLUDED_FILES = [
    '/src/images/x'
]
var SAFETY_TMP = 'src/safety.html'
var CACHE_VERSION = 'name-of-my-cache';
var preCacheFunc = function(){
    return caches.open(CACHE_VERSION)
        .then(function (cache) {
            return cache.add(SAFETY_TMP);
        })
}
self.addEventListener('install', function (event) {
    event.waitUntil(preCacheFunc()) 
})
self.addEventListener('fetch', function (event) {
    return event.respondWith(fetch(event.request)
        .then(resp => {
            if (!resp.ok) {
                return grabFromCacheOrAdd(SAFETY_TMP)
            }
            return resp
        })
        .catch(error => {
            return grabFromCacheOrAdd(SAFETY_TMP)
        })
    )}
);
function grabFromCacheOrAdd(req) {
    return caches.open(CACHE_VERSION).then(function (cache) {
        return cache.match(req).then(function (matching) {
            if (matching) {
                return matching
            } else {
                return cache.add(req)
            }
        });
    });
}