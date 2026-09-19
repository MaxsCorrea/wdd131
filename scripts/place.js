// Static weather data
const temperature = 10;
const windSpeed = 5;


// Calculate wind chill using Celsius and km/h
function calculateWindChill(temperature, windSpeed) {
    return 13.12 + 0.6215 * temperature - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temperature * Math.pow(windSpeed, 0.16);
}


// Select the wind chill element
const windChillElement = document.querySelector("#wind-chill");


// Calculate wind chill only when conditions are valid
if (temperature <= 10 && windSpeed > 4.8) {
    const windChill = calculateWindChill(temperature, windSpeed);

    windChillElement.textContent = `${windChill.toFixed(1)} °C`;
} else {
    windChillElement.textContent = "N/A";
}


// Display the current year
const currentYear = new Date().getFullYear();

document.querySelector("#currentyear").textContent = currentYear;


// Display the date the document was last modified
document.querySelector("#lastModified").textContent = document.lastModified;