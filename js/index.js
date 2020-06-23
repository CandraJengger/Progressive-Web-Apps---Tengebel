document.addEventListener('DOMContentLoaded', function() {
    const elems = document.querySelector('.sidenav')
    M.Sidenav.init(elems, {
        edge: 'left',
        inDuration: '300ms',
        outDuration: '250ms',
        draggable: true
    })
    loadNav()

    function loadNav() {
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status != 200) return

                // Muat Daftar tautan menu
                document.querySelectorAll('.topnav, .sidenav').forEach(elm => elm.innerHTML = xhr.responseText)


                //Daftarkan event listener untuk setiap tautan menu
                document.querySelectorAll('.sidenav a, .topnav a').forEach(function(elm) {
                    elm.addEventListener('click', function(event) {
                        //Tutup sidenav
                        const sidenav = document.querySelector('.sidenav')
                        M.Sidenav.getInstance(sidenav).close()

                        //Muat konten halaman yang dipanggil
                        page = event.target.getAttribute('href').substr(1)
                        loadedPage(page)
                    })
                })


                //sidenav
                document.querySelectorAll('.sidenav a').forEach(function(elm) {
                    elm.classList.add('waves-effect')
                    elm.classList.add('waves-teal')
                })

                //topnav
                document.querySelectorAll('.topnav a').forEach(function(elm) {
                    elm.addEventListener('click', function(event) {
                        document.querySelectorAll('.topnav a').forEach(function(elm) {
                            elm.children[0].classList.remove('active')
                        })

                        if (event.target.children[0].classList.contains('active') === false) {
                            event.target.children[0].classList.add('active')
                        } 
                        
                        
                    })
                })
            }
        }
        xhr.open('GET', 'nav.html', true)
        xhr.send()
    }

    //Loaded page
    let page = window.location.hash.substr(1)
    if (page === '') page = 'home'
    loadedPage(page)

    function loadedPage(page) {
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {
            if (this.readyState === 4) {
                var content = document.querySelector('#body-content')
                if (this.status === 200) {
                    content.innerHTML = xhr.responseText

                    //Modal
                    var elems = document.querySelectorAll('.modal')
                    var instances = M.Modal.init(elems)

                    // Button get started
                    if(document.querySelector('.btn-get')) {
                        document.querySelector('.btn-get').addEventListener('click', function(event) {
                            loadedPage(event.target.getAttribute('href').substr(1))
                        })
                    }

                    // Tour
                    const tourImg = document.querySelector('.tour-img')
                    const tourHeading = document.querySelector('#tour-head')
                    const tourText = document.querySelector('#tour-text')
                    const tourItems = document.querySelectorAll('.tour-wrapp')

                    tourItems.forEach(item => {
                        item.addEventListener('click', function(event) {
                            tourImg.src = event.target.parentElement.children[0].src
                            tourHeading.innerText = event.target.parentElement.children[0].alt
                            tourText.innerText = event.target.parentElement.children[1].textContent
                        })
                    })
                    
                } else if (this.status === 404) {
                    content.innerHTML = '<h3>Halaman tidak ditemukan</h3>'
                } else {
                    content.innerHTML = '<h3>Ups.. Halaman tidak ditemukan</h3>'
                }
            }        
        }
        xhr.open('GET', 'pages/' + page + '.html', true)
        xhr.send()
    }
})


