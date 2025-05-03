const hamburgerMenu = document.getElementById('hamburger-menu');
const navMenu = document.querySelector('.nav-menu');

hamburgerMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
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

// Taulukko väreistä
const colors = [
    { name: "Amber", hex: "#ffbf00" },
    { name: "Lemon", hex: "#fff700" },
    { name: "Yellow", hex: "#ffff00" },
    { name: "Pastel Yellow", hex: "#fdfd96" },
    { name: "Flax", hex: "#eedc82" },
    { name: "Corn", hex: "#fbec5d" },
    { name: "Chartreuse", hex: "#dfff00" },
    { name: "Citrine", hex: "#e4d00a" },
    { name: "Naples Yellow", hex: "#fada5e" },
    { name: "Saffron", hex: "#f4c430" },
    { name: "Goldenrod", hex: "#daa520" },
    { name: "Light Khaki", hex: "#f0e68c" }
];

// Funktio väriyhdistelmien näyttämiseen
function displayColors() {
    const container = document.querySelector('.swatch-container-savy');
    container.innerHTML = '';

    let openInfo = null;

    colors.forEach((color) => {
        const swatch = document.createElement('div');
        swatch.classList.add('swatch-savy');

        swatch.innerHTML = `
            <div class="color-box-savy" style="background-color: ${color.hex}; cursor: pointer;"></div>
            <div class="label-savy">
                <h4>${color.name}</h4>
                <p>${color.hex}</p>
            </div>
        `;

        const colorBox = swatch.querySelector('.color-box-savy');

        colorBox.addEventListener('click', () => {
            // Poista vanha info
            if (openInfo) {
                openInfo.remove();
                openInfo = null;
            }

            // Selvitä mikä on viimeinen elementti samalla rivillä
            const swatches = [...container.querySelectorAll('.swatch-savy')];
            const clickedTop = swatch.offsetTop;

            const sameRow = swatches.filter(el => el.offsetTop === clickedTop);
            const lastInRow = sameRow[sameRow.length - 1];

            // Luo info-div
            const info = document.createElement('div');
            info.classList.add('extra-info');
            // Apufunktio: HEX → HSL
            function hexToHSL(H) {
                let r = 0, g = 0, b = 0;
                if (H.length === 4) {
                    r = "0x" + H[1] + H[1];
                    g = "0x" + H[2] + H[2];
                    b = "0x" + H[3] + H[3];
                } else {
                    r = "0x" + H[1] + H[2];
                    g = "0x" + H[3] + H[4];
                    b = "0x" + H[5] + H[6];
                }
                r /= 255;
                g /= 255;
                b /= 255;
                const cmin = Math.min(r, g, b),
                    cmax = Math.max(r, g, b),
                    delta = cmax - cmin;
                let h = 0, s = 0, l = 0;

                if (delta === 0)
                    h = 0;
                else if (cmax === r)
                    h = ((g - b) / delta) % 6;
                else if (cmax === g)
                    h = (b - r) / delta + 2;
                else
                    h = (r - g) / delta + 4;

                h = Math.round(h * 60);
                if (h < 0) h += 360;

                l = (cmax + cmin) / 2;
                s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
                s = +(s * 100).toFixed(1);
                l = +(l * 100).toFixed(1);

                return { h, s, l };
            }

            // Apufunktio: HSL → HEX
            function hslToHex(h, s, l) {
                s /= 100;
                l /= 100;

                const c = (1 - Math.abs(2 * l - 1)) * s,
                    x = c * (1 - Math.abs((h / 60) % 2 - 1)),
                    m = l - c / 2;
                let r = 0, g = 0, b = 0;

                if (0 <= h && h < 60) { r = c; g = x; b = 0; }
                else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
                else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
                else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
                else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
                else if (300 <= h && h < 360) { r = c; g = 0; b = x; }

                r = Math.round((r + m) * 255).toString(16).padStart(2, '0');
                g = Math.round((g + m) * 255).toString(16).padStart(2, '0');
                b = Math.round((b + m) * 255).toString(16).padStart(2, '0');

                return "#" + r + g + b;
            }

            // Muunna väri HSL:ksi
            const hsl = hexToHSL(color.hex);

            // Satunnaisvärien generointifunktio
            function getRandomHexColor() {
                const r = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
                const g = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
                const b = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
                return `#${r}${g}${b}`;
            }

            const randomHex1 = getRandomHexColor();
            const randomHex2 = getRandomHexColor();

            info.innerHTML = `
    <h3 style="margin-left: 10px; margin-top: 10px;">Väriyhdistelmiä</h3>
    <p style="margin-left: 10px; margin-top: 10px;">Tässä muutama väriehdotus valitsemallesi värille:</p>
    <div class="color-row">
        <div class="swatch-savy">
            <div class="color-box-savy" style="background-color: ${color.hex};"></div>
            <div class="label-savy">
                <h4>${color.name}</h4>
                <p>${color.hex}</p>
            </div>
        </div>
        <div class="swatch-savy">
            <div class="color-box-savy" style="background-color: ${randomHex1};"></div>
            <div class="label-savy">
                <h4>2</h4>
                <p>${randomHex1}</p>
            </div>
        </div>
        <div class="swatch-savy">
            <div class="color-box-savy" style="background-color: ${randomHex2};"></div>
            <div class="label-savy">
                <h4>3</h4>
                <p>${randomHex2}</p>
            </div>
        </div>
    </div>
`;

            // Lisää info rivin viimeisen värin jälkeen
            lastInRow.after(info);
            openInfo = info;
        });

        container.appendChild(swatch);
    });
}

// Näytetään värit sivulla
displayColors();

document.addEventListener('DOMContentLoaded', function () {
    // Varmistetaan, että hamburgerMenu on olemassa
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    displayColors(); // Näytetään värit vasta kun DOM on valmis
});