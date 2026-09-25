const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },

    // Three additional temples
    {
        templeName: "Córdoba Argentina",
        location: "Córdoba, Argentina",
        dedicated: "2015, May, 17",
        area: 34369,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/cordoba-argentina-temple/cordoba-argentina-temple-12744.jpg"
    },
    {
        templeName: "Buenos Aires Argentina",
        location: "Ciudad Evita, Buenos Aires, Argentina",
        dedicated: "1986, January, 17",
        area: 30659,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/buenos-aires-argentina-temple/buenos-aires-argentina-temple-1272.jpg"
    },
    {
        templeName: "Rome Italy",
        location: "Rome, Italy",
        dedicated: "2019, March, 10",
        area: 41010,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-3029.jpg"
    }
];

const templeCards = document.querySelector("#temple-cards");
const pageTitle = document.querySelector("#page-title");

const navigation = document.querySelector("#navigation");
const filterButtons = document.querySelectorAll("#navigation button");

const menuButton = document.querySelector("#menu");

function displayTemples(templeList) {
    templeCards.innerHTML = "";

    templeList.forEach((temple) => {
        const card = document.createElement("article");
        card.classList.add("temple-card");

        const templeName = document.createElement("h2");
        templeName.textContent = temple.templeName;

        const templeInfo = document.createElement("div");
        templeInfo.classList.add("temple-info");

        const location = document.createElement("p");
        location.innerHTML =
            `<span class="label">Location:</span> ${temple.location}`;

        const dedicated = document.createElement("p");
        dedicated.innerHTML =
            `<span class="label">Dedicated:</span> ${temple.dedicated}`;

        const area = document.createElement("p");
        area.innerHTML =
            `<span class="label">Size:</span> ${temple.area.toLocaleString()} sq ft`;

        const image = document.createElement("img");
        image.src = temple.imageUrl;
        image.alt = `${temple.templeName} Temple`;
        image.loading = "lazy";
        image.width = 400;
        image.height = 250;

        templeInfo.appendChild(location);
        templeInfo.appendChild(dedicated);
        templeInfo.appendChild(area);

        card.appendChild(templeName);
        card.appendChild(templeInfo);
        card.appendChild(image);

        templeCards.appendChild(card);
    });
}

function getDedicatedYear(temple) {
    return Number.parseInt(temple.dedicated.split(",")[0], 10);
}

function filterTemples(filter) {
    let filteredTemples = temples;
    let title = "Home";

    switch (filter) {
        case "old":
            filteredTemples = temples.filter(
                (temple) => getDedicatedYear(temple) < 1900
            );
            title = "Old Temples";
            break;

        case "new":
            filteredTemples = temples.filter(
                (temple) => getDedicatedYear(temple) > 2000
            );
            title = "New Temples";
            break;

        case "large":
            filteredTemples = temples.filter(
                (temple) => temple.area > 90000
            );
            title = "Large Temples";
            break;

        case "small":
            filteredTemples = temples.filter(
                (temple) => temple.area < 10000
            );
            title = "Small Temples";
            break;

        default:
            filteredTemples = temples;
            title = "Home";
    }

    pageTitle.textContent = title;
    displayTemples(filteredTemples);
}

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        filterButtons.forEach((navButton) => {
            navButton.classList.remove("active");
        });

        button.classList.add("active");

        filterTemples(filter);

        navigation.classList.remove("open");
        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation menu");
    });
});

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");

    const isOpen = navigation.classList.contains("open");

    menuButton.textContent = isOpen ? "✕" : "☰";

    menuButton.setAttribute(
        "aria-expanded",
        isOpen.toString()
    );

    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});

const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

currentYear.textContent = new Date().getFullYear();

lastModified.textContent =
    `Last Modification: ${document.lastModified}`;

displayTemples(temples);