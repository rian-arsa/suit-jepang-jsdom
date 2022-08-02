const myPilihans = [
    "gunting.png",
    "batu.png",
    "kertas.png"
]
let playerPilihan = []

const RENDER_PAGE = 'render_page'

addEventListener('load', function () {
    document.dispatchEvent(new Event(RENDER_PAGE))
})

function makePilihan(img) {
    const divPilihan = document.createElement('div')
    divPilihan.classList.add('pilihan')

    const imgPilihan = document.createElement('img')
    imgPilihan.setAttribute('src', `./img/${img}`)

    divPilihan.append(imgPilihan)

    if (playerPilihan.length === 0) {
        divPilihan.classList.add('cobaHover')

        divPilihan.addEventListener('click', function() {
            mainGame(img)
            playerPilihan.push(img)
            document.dispatchEvent(new Event(RENDER_PAGE))
        })
    }
    
    return divPilihan
}

document.addEventListener(RENDER_PAGE, function() {

    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''

    if (playerPilihan.length == 1) {
        // mainContent.append(makePilihan(playerPilihan[0]))
        const kamu = playerPilihan[0]
        
        showPilihanKamu(kamu)
        return
    } else {
        for (const pilihan of myPilihans) {
            mainContent.append(makePilihan(pilihan))
        }
    }
    
})

function lawanPilih() {
    const theRandomNumber = Math.floor(Math.random() * 9) + 1;
    if (theRandomNumber >= 7) {
        return 'gunting'
    } else if (theRandomNumber >= 4) {
        return 'batu'
    }
    return 'kertas'
}

function logikaGame(player, lawan) {
    if (player == 'gunting.png') {
        if (lawan == 'gunting') {
            return "SERI"
        } else if (lawan == 'kertas') {
            return "MENANG"
        } else {
            return "KALAH"
        }
    } else if (player == 'batu.png') {
        if (lawan == 'gunting') {
            return "MENANG"
        } else if (lawan == 'kertas') {
            return "KALAH"
        } else {
            return "SERI"
        }
    } else {
        if (lawan == 'gunting') {
            return "KALAH"
        } else if (lawan == 'kertas') {
            return "SERI"
        } else {
            return "MENANG"
        }
    }
}

function showPilihanLawan(pilihanLawan) {
    const lawanContent = document.getElementById('pilihan-lawan')
    lawanContent.classList.add('pil-lawan')

    lawanContent.setAttribute('src', `./img/${pilihanLawan}.png`)
}

function showPilihanKamu(pilihanKamu) {
    const lawanContent = document.getElementById('pilihan-kamu')
    lawanContent.classList.add('pil-kamu')

    lawanContent.setAttribute('src', `./img/${pilihanKamu}`)
}

function reset() {
    const lawanContent = document.getElementById('pilihan-lawan')
    const kamuContent = document.getElementById('pilihan-kamu')
    const hasilPertandingan = document.querySelector('h5')
    const button = document.querySelector('button')
    const titleMain = document.getElementById('title-main-content')
    playerPilihan = []

    lawanContent.setAttribute('src', `./img/thinking.gif`)
    lawanContent.classList.remove('pil-lawan')
    kamuContent.setAttribute('src', `./img/thinking.gif`)
    kamuContent.classList.remove('pil-kamu')

    titleMain.innerText = 'Pilih salah satu'

    hasilPertandingan.remove()
    button.remove()
    document.dispatchEvent(new Event(RENDER_PAGE))
}

function hasilPertandingan(hasil) {
    const content = document.getElementsByClassName('content')[0]
    const h4 = document.createElement('h5')
    const button = document.createElement('button')
    button.textContent = "Main Lagi"

    button.addEventListener('click', function () {
        reset()
    })

    if (hasil == 'MENANG') {
        h4.innerText = "SELAMAT ANDA MENANG"
        return content.append(h4, button)
    } else if (hasil == 'KALAH') {
        h4.innerText = "MASA GITU AJA KALAH, CUPU"
        return content.append(h4, button)
    } else {
        h4.innerText = "SAMA KUAT"
        return content.append(h4, button)
    }
}

function mainGame(img) {
    const lawan = lawanPilih();
    showPilihanLawan(lawan)

    const titleMain = document.getElementById('title-main-content')
    titleMain.innerText = 'Hasil Pertandingan'

    const hasil = logikaGame(img, lawan)
    hasilPertandingan(hasil)
}

