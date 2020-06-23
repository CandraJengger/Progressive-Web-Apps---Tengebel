// Register Servcie Worker
if ('serviceWorker' in navigator) { // mengecek apakah navigator sudah ada di browser
    window.addEventListener('load', function() {
        navigator.serviceWorker
            .register('/service-worker.js')//mendafatarkan service worker
            .then(function() {
                console.log('Pendaftaran ServiceWorker berhasil')
            })
            .catch(function() {
                console.log('Pendaftaran ServiceWorker gagal')
            })
    })
} else { //jika tidak ada, browser yang digunakan, belum mendukung fitur service worker
    console.log('ServiceWorker belum didukung browser ini')
}