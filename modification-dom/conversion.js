const euroValue = prompt('Veuillez saisir votre prix en euros')
if (isNaN(euroValue)) {
    alert("Veuillez rentrer un nombre !")
} else if (euroValue < 0) {
    alert("Veillez saisir un nombre positif")
} else {
    const dollarsValue = euroValue * 1.1;
    alert("Le prix " + euroValue + "€ vaut " + dollarsValue.toFixed(1) + " $")
}
// exo 2 

let longueur = parseFloat(document.getElementById("longueur"))
let largeur = parseFloat(document.getElementById("largeur"))
const longueurUnit = document.querySelector("")
const largeurUnit = prompt("Veuillez saisir une unité de largeur")
if (isNaN(longueur) || isNaN(largeur)) {
    alert("Veuillez saisir un nombre ! ")
} else if (longueur <= 0 || largeur <= 0) {
    alert("Veuillez saisir un nombre positif")
} else if (!["m", "dm", "cm", "mm"].includes(longueurUnit) || !["m", "dm", "cm", "mm"].includes(largeurUnit)) {
    alert("Mauvaise unité")
} else {
    switch (longueurUnit) {
        case "mm": longueur /= 10
        case "cm": longueur /= 10
        case "dm": longueur /= 10
            break;
    }
    switch (largeurUnit) {
        case "mm": largeur /= 10
        case "cm": largeur /= 10
        case "dm": largeur /= 10
            break;
    }
    const perimetre = 2 * (longueur + largeur)
    document.querySelector("result-peri")
}
// exo 3

const temperatureInput = parseFloat(prompt("Veuillez saisir votre température"))
const unitInput = prompt("Veuillez saisrie votre unité de mesure (K, F, C)")
if (isNaN(temperatureInput)) {
    alert("Ceci n'est pas un nombre")
} else if (!unitInput) {
    alert("Vous avez annulé")
} else if (!["k", "f", "c"].includes(unitInput.toLowerCase())) {
    alert("Unit non valide")
} else {
    let temperatureCelcius = temperatureInput;
    let temperatureFarenheit = temperatureInput;
    let temperatureKelvin = temperatureInput;
    switch (unitInput.toLowerCase()) {
        case "c":
            temperatureFarenheit = temperatureInput * 9 / 5 + 32;
            temperatureKelvin = temperatureInput + 273.15;
            break;
        case "f":
            temperatureCelcius = (temperatureInput - 32) * 5 / 9;
            temperatureKelvin = temperatureCelcius + 273.15;
            break;
        case "k":
            temperatureCelcius = temperatureInput - 273.15;
            temperatureFarenheit = temperatureCelcius * 9 / 5 + 32;
            break;
    }
    alert(
        "== Liste de températures ==\n" +
        "\t♦ " + temperatureCelcius.toFixed(2) + "°C\n" +
        "\t♦ " + temperatureFarenheit.toFixed(2) + "°F\n" +
        "\t♦ " + temperatureKelvin.toFixed(2) + "K"
    );
}


