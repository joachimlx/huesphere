document.addEventListener("DOMContentLoaded", function () {
    let container = document.querySelector(".etusivu-container");
    let position = window.innerWidth;

    function moveText() {
        position -= 3; // Vieritysnopeus
        container.style.left = position + "px";

        if (position < -container.clientWidth) {
            position = window.innerWidth;
        }

        requestAnimationFrame(moveText); // Toistaa animaation jatkuvasti
    }

    container.style.position = "absolute"; // Varmistaa, että elementti voi liikkua
    moveText(); // Käynnistää animaation

    // Hamburger menu logic (moved here)
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburgerMenu && navMenu) {
        hamburgerMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

});


function toggleMenu() {
    const menu = document.getElementById('mobileMenu');

    if (menu.classList.contains('show')) {
        menu.classList.remove('show'); // Poistetaan animaatio
        setTimeout(() => {
            menu.style.display = 'none'; // Poistetaan kokonaan
        }, 300); // Odota animaation verran ennen poistoa
    } else {
        menu.style.display = 'flex'; // Näytä valikko
        setTimeout(() => {
            menu.classList.add('show'); // Lisää animaatio
        }, 10); // Odota hetki ennen animaatiota
    }
}


//HAKUPALKIN TOIMINNALLISUUS

const colorPages = {
    punainen: "punainen.html",
    oranssi: "oranssi.html",
    keltainen: "keltainen.html",
    vihreä: "vihrea.html",
    sininen: "sininen.html",
    violetti: "violetti.html",
    pinkki: "pinkki.html",
    ruskea: "ruskea.html",
    red: "punainen-en.html",
    orange: "oranssi-en.html",
    yellow: "keltainen-en.html",
    green: "vihrea-en.html",
    blue: "sininen-en.html",
    purple: "violetti-en.html",
    pink: "pinkki-en.html",
    brown: "ruskea-en.html"
};

function searchColor() {
    const input = document.getElementById("searchInput").value.toLowerCase().trim();
    
    if (colorPages[input]) {
        window.location.href = colorPages[input]; // ohjaa värin omaan sivuun
    } else {
        alert("Väriä ei löytynyt. Syötä jonkin perusvärin nimi.");
    }
}

function handleKey(event) {
    if (event.key === "Enter") {
        searchColor();
    }
}



function generateColors() {
    const container = document.getElementById('color-container');
    container.innerHTML = ''; // Tyhjennetään vanhat värit

    for (let i = 0; i < 7; i++) {
        const color = getRandomColor();
        const colorItem = document.createElement('div');
        colorItem.className = 'color-item';

        const colorBlock = document.createElement('div');
        colorBlock.className = 'color-block';
        colorBlock.style.backgroundColor = color;

        colorBlock.addEventListener('click', () => {
            showSuggestions(color);
        });

        const infoBox = document.createElement('div');
        infoBox.className = 'info-box';

        const hexCode = document.createElement('p');
        hexCode.innerText = color;

        infoBox.appendChild(hexCode);
        colorItem.appendChild(colorBlock);
        colorItem.appendChild(infoBox);

        container.appendChild(colorItem);
    }
}

function getRandomColor() {
    const letters = '0123456789abcdef';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function showSuggestions(baseColor) {

    const suggestionInfo = document.querySelector('.suggestion-info');
    suggestionInfo.style.display = 'block';  // Muuttaa display: block:ksi ja tekee sen näkyväksi

    const suggestionTitle = document.getElementById('suggestion-title');
    const suggestionContainer = document.getElementById('suggestion-container');

    suggestionTitle.style.display = 'block';
    suggestionContainer.style.display = 'flex';

    suggestionContainer.innerHTML = '';

    // Klikattu väri
    const mainColor = baseColor;

    // Komplementti
    const complementary = getComplementaryColor(mainColor);

    // Kolmas väri: analoginen
    const thirdColor = getAnalogousColor(mainColor);

    const suggestions = [
        { color: mainColor, label: "1" },
        { color: complementary, label: "2" },
        { color: thirdColor, label: "3" }
    ];

    suggestions.forEach(s => {
        const item = document.createElement('div');
        item.className = 'color-item';

        const block = document.createElement('div');
        block.className = 'color-block';
        block.style.backgroundColor = s.color;

        const info = document.createElement('div');
        info.className = 'info-box';

        // Lisää label (esim. Valittu väri) strong-elementin sisään
        const label = document.createElement('strong');
        label.innerText = s.label;

        // Luo p-elementti värikoodille ja lisää se
        const hexCode = document.createElement('p');
        hexCode.innerText = s.color;

        // Lisää strong ja p-info boxiin
        info.appendChild(label);
        info.appendChild(hexCode);

        item.appendChild(block);
        item.appendChild(info);
        suggestionContainer.appendChild(item);
    });
}

// KOMPLEMENTTIVÄRIN HAKU
function getComplementaryColor(hex) {
    const r = 255 - parseInt(hex.slice(1, 3), 16);
    const g = 255 - parseInt(hex.slice(3, 5), 16);
    const b = 255 - parseInt(hex.slice(5, 7), 16);
    return rgbToHex(r, g, b);
}

// ANALOGISEN VÄRIN HAKU
function getAnalogousColor(hex) {
    const hsl = hexToHSL(hex);
    hsl.h = (hsl.h + 200) % 360; // Siirtyy 30 astetta
    return hslToHex(hsl);
}

// RGB → HEX
function rgbToHex(r, g, b) {
    return "#" + [r, g, b].map(x =>
        x.toString(16).padStart(2, '0')
    ).join('');
}

// HEX → HSL
function hexToHSL(hex) {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h *= 60;
    }

    return { h, s, l };
}

// HSL → HEX
function hslToHex({ h, s, l }) {
    let c = (1 - Math.abs(2 * l - 1)) * s;
    let x = c * (1 - Math.abs((h / 60) % 2 - 1));
    let m = l - c / 2;
    let r, g, b;

    if (0 <= h && h < 60) [r, g, b] = [c, x, 0];
    else if (60 <= h && h < 120) [r, g, b] = [x, c, 0];
    else if (120 <= h && h < 180) [r, g, b] = [0, c, x];
    else if (180 <= h && h < 240) [r, g, b] = [0, x, c];
    else if (240 <= h && h < 300) [r, g, b] = [x, 0, c];
    else[r, g, b] = [c, 0, x];

    const toHex = val => Math.round((val + m) * 255).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}