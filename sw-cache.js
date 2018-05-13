var CACHE_FILES = [
    // '/whatever-i-want-to-precache.jpg',
    // '/more-precache.html',
    'http://localhost:8080/src/images/xmaskitty.jpg',
    // 'src/safety.html',
    'safety.html'
];
var EXCLUDED_FILES = [
    '/src/images/x'
]
var SAFETY_TMP = 'src/safety.html'
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
    let somesafe = getSomeSafeResp(event.request)
    console.log('somesage', somesafe)
    event.respondWith(somesafe)
});
function getSomeSafeResp(req) {
    return caches.open(CACHE_VERSION).then(function (cache) {
        return cache.match(req).then(function (matching) {
            if (matching) {
                console.log('matched!')
                return matching
            } else {
                console.log('missed!')
                return fetch(req.url)
                .then( (response) =>{
                    if(!response.ok) throw new Error('asdasd')
                    console.log('success in populating the cache with tth response:', response)

                    cache.add(req)
                    
                    return response
                })
                .catch(() => {
                    console.log('askjdaksjd errro!!')
                    t= cache.match(SAFETY_TMP)
                    console.log('templ', t)
                    return t
                })
            }
        });
    });
}
