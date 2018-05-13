var CACHE_FILES = [
    // '/whatever-i-want-to-precache.jpg',
    // '/more-precache.html',
    'http://localhost:8080/src/images/xmaskitty.jpg'
];
var EXCLUDED_FILES = [
    '/src/images/x'
]
var CACHE_VERSION = 'name-of-my-cache';
var preCacheFunc = function(){
    return caches.open(CACHE_VERSION)
        .then(function (cache) {
            return cache.addAll(CACHE_FILES);
        })
}
self.addEventListener('install', function (event) {
    event.waitUntil(preCacheFunc()) 
})
self.addEventListener('fetch', function (event) {
    event.respondWith(grabFromCacheOrAdd(event.request))
});
function grabFromCacheOrAdd(req) {
    return caches.open(CACHE_VERSION).then(function (cache) {
        return cache.match(req).then(function (matching) {
            if (matching) {
                console.log('matched!')
                return matching
            } else {
                console.log('missed!')
                // if(CACHEreq.url)
                return cache.add(req)
            }
        });
    });
}
