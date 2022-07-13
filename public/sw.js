let cacheData = "app-v100";
this.addEventListener("install", evt => {
    console.log("installing")
    caches.delete("app-v9")
    caches.delete("app-v1")
    caches.delete("app-v2")
    caches.delete("app-v11")
    evt.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([
                '/logo192.png',
                '/manifest.json',
                '/static/js/bundle.js'
            ])
        })
    )
})


this.addEventListener("fetch", evt => {

    if (!navigator.onLine) {
        evt.respondWith(
            caches.match(evt.request).then((res => {
                if(res) {
                    return res
                }
                let requestUrl = evt.request.clone();
                fetch(requestUrl)
            }))
        )
    }

})

this.addEventListener('activate', function(event) {
    console.log('activando')
  })

