const CACHE = 'meetup-cache';
URLArr = ['./plugin/zoom-js/zoom.js']
addURLsToCache = (URLs) =>{
    console.log('addurls')
    return caches.open(CACHE)
    .then((cache) =>{
        console.log('adda alls')
        return cache.addAll(URLs)
    })
    .catch((err) =>{
        console.log('There was an error pre caching')
        return Promise.reject('issue')
    })
}
var CACHE_FILES = [
    // '/sw.html',
    '/',
    // 'http://localhost:8080/src/images/*kitty.jpg',
    'http://localhost:8080/src/images/xmaskitty.jpg',
    '/lib/css/zenburn.css',
    // '/lib/js/head.min.js',
    // '/lib/JOHN.jpg'
];
var CACHE_VERSION = 'app-v1';
var someFunc = function (){
    console.log("waiting huntil")
    return caches.open(CACHE_VERSION)
        .then(function (cache) {
            console.log('Opened cache');
            return cache.addAll(CACHE_FILES);
        })
}

self.addEventListener('activate', function(event){
    // event.waitUntil(addURLsToCache(URLArr))
    console.log('install service workers')

    event.waitUntil(
        (() => {
            console.log("waiting huntil")
            return caches.open(CACHE_VERSION)
                .then(function (cache) {
                    console.log('Opened cache');
                    return cache.addAll(CACHE_FILES);
                })
        })()
     )
    })
self.addEventListener('activate', function(event){
    console.log('waited')
    event.waitUntil(addURLsToCache(URLArr))
    console.log('waited2')

});
self.addEventListener('fetch', function(event){
    URLArr.push(event.request.url)
    // return something for each interception
    console.log('fetching')
    let whatIgotFromCache = grabFromCache(event.request)
    console.log('from cache', whatIgotFromCache)
    event.respondWith(whatIgotFromCache)
    // event.respondWith(new Response('whwate i want'))
});
function grabFromCache(req) {
    return caches.open(CACHE_VERSION).then(function (cache) {
        // console.log(cache)
        return cache.match(req).then(function (matching) {
            console.log(matching)
            if (matching){
                console.log('match', req.url)
                return matching
            }else{
                console.log('no match',req.url)
                // ret
                return cache.add(req)
                // response = fetch(req)
                // response.then((resp) =>{
                //     cache.add(req)

                // })
                // return response
                // return matching || Promise.reject('no-match');

            }
         });
    });
}
