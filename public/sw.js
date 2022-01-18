let cacheData = "app-v1";
this.addEventListener("install", evt => {
    evt.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([
                '/logo192.png',
                '/manifest.json',
                '/static/js/bundle.js',
                '/index.html',
                '/'

            ])
        })
    )
})


this.addEventListener("fetch", evt => {
    evt.respondWith(
        caches.match(evt.request).then((res => {
            if(res) {
                return res
            }
        }))
    )
})