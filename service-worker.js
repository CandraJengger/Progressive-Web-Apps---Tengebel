const CACHE_NAME = 'tengebel-v2.4' //nama cache
var urlsToCache = [
    '/',
    '/manifest.json',
    '/registrasi.js',
    '/nav.html',
    '/index.html',
    '/pages/home.html',
    '/pages/culture.html',
    '/pages/foods.html',
    '/pages/tour.html',
    '/pages/stories.html',
    '/css/materialize.min.css',
    '/css/main.css',
    '/js/materialize.min.js',
    '/js/index.js',
    '/images/aloon.jpg',
    '/images/cumbri.jpg',
    '/images/dawet.jpeg',
    '/images/icon-side.png',
    '/images/kirab.jpg',
    '/images/larung.jpeg',
    '/images/logo.png',
    '/images/masjid.jpg',
    '/images/reog.jpg',
    '/images/sate.png',
    '/images/sunggah.jpg',
    '/images/tiwul.png',
    '/images/ngebel.jpg',
    '/images/icons/icon-72x72.png',
    '/images/icons/icon-96x96.png',
    '/images/icons/icon-128x128.png',
    '/images/icons/icon-144x144.png',
    '/images/icons/icon-152x152.png',
    '/images/icons/icon-192x192.png',
    '/images/icons/icon-384x384.png',
    '/images/icons/icon-512x512.png'
]

self.addEventListener('install', function(event) { //dipanggil setelah regis service worker berhasil
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache)
        })
    )
})

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches
            .match(event.request, { cacheName: CACHE_NAME })
            .then(function(response) {
                if (response) {
                    console.log('ServiceWorker: Gunakan aset dari cache: ', response.url)
                    return response
                }

                console.log('ServiceWorker: Memuat aset dari server: ', event.request.url)
                return fetch(event.request)
            })
    )
})

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log('ServiceWorker: cache ' + cacheName + ' dihapus')
                        return caches.delete(cacheName)
                    }
                })
            )
        })
    )
})