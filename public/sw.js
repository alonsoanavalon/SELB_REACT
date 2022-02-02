let cacheData = "app-v1";
this.addEventListener("install", evt => {
    evt.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([
                '/logo192.png',
                '/manifest.json',
                '/static/js/bundle.js',
                '/login',
                '/index.html',
                '/',
                '/users',
                '/about',
                '/images/daughter.png',
                '/images/son.png',
                '/students',
                '/menu.png',
                'https://cdnjs.cloudflare.com/ajax/libs/hamburgers/1.1.3/hamburgers.min.css'

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

