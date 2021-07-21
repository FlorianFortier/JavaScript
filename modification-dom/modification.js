function conversion() {
const euroValue = document.getElementById("euro").value
if (isNaN(euroValue)) {
    alert("Veuillez rentrer un nombre !")
} else if (euroValue < 0) {
    alert("Veillez saisir un nombre positif")
} else {
    const dollarsValue = euroValue * 1.10;
    document.getElementById("dollars").value = dollarsValue.toFixed(1) + " $"
}
}

// fonction pour le périmètre

const longueur = document.getElementById("longueur");
const largeur = document.getElementById("largeur");
const longueurUnit = document.querySelector(".select-one");
const largeurUnit = document.querySelector(".select-two");
const perimeterResult = document.querySelector(".result-peri")

function perimetre() {

let longueurD = parseFloat(longueur.value);
let largeurD = parseFloat(largeur.value);
const longueurUnitD = longueurUnit.value;
const largeurUnitD = largeurUnit.value;

if (isNaN(longueurD) || isNaN(largeurD)) {
    perimeterResult.textContent = "Veuillez saisir un nombre ! ";
} else if (longueurD <= 0 || largeurD <= 0) {
    perimeterResult.textContent = "Veuillez saisir un nombre positif";
} else if (!["m", "cm", "mm"].includes(longueurUnitD) || !["m",  "cm", "mm"].includes(largeurUnitD)) {
    perimeterResult.textContent = "Mauvaise unité";
} else {
    switch (longueurUnitD) {
        case "mm": longueurD /= 10
        case "cm": longueurD /= 10
            break;
    }
    switch (largeurUnitD) {
        case "mm": largeurD /= 10
        case "cm": largeurD /= 10
            break;
    }
    perimeterResult.textContent = 2 * (longueurD + largeurD).toFixed(4)+ "m";
    }
}
longueur.addEventListener("input", perimetre)  
largeur.addEventListener("input", perimetre)
longueurUnit.addEventListener("change", perimetre)
largeurUnit.addEventListener("change", perimetre)


// correction euro
// const euroInput = document.querySelector("#euro-input");
// const roubleOutput = document.querySelector("#rouble-output");

// euroInput.addEventListener("input", function() {
//     const euroValue = parseFloat(euroInput.value);
//     if (isNaN(euroValue)) {
//         alert("Veuillez rentrer un nombre !");
//     } else if (euroValue < 0) {
//         alert("Veillez saisir un nombre positif");
//     } else {
//         roubleOutput.value = (euroValue * 1.1).toFixed(2);
//     }
// });

// fonction sur la temperature

const temperatureInput = document.querySelector("#temperature-input");
const [cButton, fButton, kButton] = document.querySelectorAll("#temperature-buttons > button");
const [cResult, fResult, kResult] = document.querySelectorAll("#temperature-results > li");

function evalTemperature(ev) {
    if (isNaN(temperatureInput.value)) {
        alert("Ceci n'est pas un nombre");
    } else if (!["k", "f", "c"].includes(ev.target.value.toLowerCase())) {
        alert("Unit non valide");
    } else {
        let temperatureCelcius = parseFloat(temperatureInput.value);
        let temperatureFarenheit = parseFloat(temperatureInput.value);
        let temperatureKelvin = parseFloat(temperatureInput.value);
        switch (ev.target.value.toLowerCase()) {
            case "c":
                temperatureFarenheit = temperatureInput.value * 9 / 5 + 32;
                temperatureKelvin = parseFloat(temperatureInput.value) + 273.15;
                break;
            case "f":
                temperatureCelcius = (temperatureInput.value - 32) * 5 / 9;
                temperatureKelvin = temperatureCelcius + 273.15;
                break;
            case "k":
                temperatureCelcius = temperatureInput.value - 273.15;
                temperatureFarenheit = temperatureCelcius * 9 / 5 + 32;
                break;
        }
        cResult.textContent = temperatureCelcius.toFixed(2) + "°C";
        fResult.textContent = temperatureFarenheit.toFixed(2) + "°F";
        kResult.textContent = temperatureKelvin.toFixed(2) + "K";
    }
}

cButton.addEventListener("click", evalTemperature);
fButton.addEventListener("click", evalTemperature);
kButton.addEventListener("click", evalTemperature);