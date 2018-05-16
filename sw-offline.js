
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
    // return event.respondWith(fetch(SAFETY_TMP))
    let g =  fetch(event.request)
        .then(resp => {
            if (!resp.ok) {
                console.log('serving safe')
                t = getSomeSafeResp(SAFETY_TMP)
                console.log(t)
                return t
            }
            return resp
        })
        .catch(error => {
            console.log(error)
            console.log("Serving safe page")
             return getSomeSafeResp(SAFETY_TMP)
        })
    console.log('resp', g)
    event.respondWith(g)
    // let somesafe = getSomeSafeResp(event.request)
    // console.log('somesage', somesafe)
    // event.respondWith(somesafe)
});
function getSomeSafeResp(req) {
    return caches.open(CACHE_VERSION).then(function (cache) {
        
        return cache.match(req)//.then(function (matching) {
        // })
    })
}
        // return cache.match(req).then(function (matching) {
        //     if (matching) {
        //         console.log('matched!')
        //         return matching
        //     } else {
        //         console.log('missed!')
        //         return fetch(req.url)
                // .then( (response) =>{
                //     if(!response.ok) throw new Error('asdasd')
                //     console.log('success in populating the cache with tth response:', response)

                //     cache.add(req)
                    
                //     return response
                // })
                // .catch(() => {
                //     console.log('askjdaksjd errro!!')
                //     t= cache.match(SAFETY_TMP)
                //     console.log('templ', t)
                //     return t
                // })
//             }
//         });
//     });
// }
