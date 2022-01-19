let cacheData = "app-v1";
this.addEventListener("install", evt => {
    evt.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([
                '/logo192.png',
                '/manifest.json',
                '/static/js/bundle.js',
                '/index.html',
                '/',
                '/users',
                '/about'

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