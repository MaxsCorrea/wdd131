/* ------------------------------
   Footer Dates
------------------------------ */

const currentYear = new Date().getFullYear();

document.getElementById("currentyear").textContent = currentYear;

document.getElementById("lastModified").textContent =
    document.lastModified;


/* ------------------------------
   Responsive Navigation
------------------------------ */

const menuButton = document.getElementById("menu-button");
const navigation = document.getElementById("navigation");

menuButton.addEventListener("click", () => {

    const isOpen = navigation.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", isOpen);

    menuButton.setAttribute(
        "aria-label",
        isOpen
            ? "Close navigation menu"
            : "Open navigation menu"
    );

    menuButton.querySelector("span").textContent =
        isOpen ? "✕" : "☰";
});