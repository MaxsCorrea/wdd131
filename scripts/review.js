let reviewCount = Number(localStorage.getItem("reviewCount")) || 0;

reviewCount += 1;

localStorage.setItem("reviewCount", reviewCount);

document.querySelector("#reviewCount").textContent = reviewCount;


// Footer year
document.querySelector("#currentyear").textContent =
    new Date().getFullYear();


// Last modified
document.querySelector("#lastModified").textContent =
    `Last Modification: ${document.lastModified}`;