const nbVerres = parseInt(prompt("Combien de verres ce soir"));
for (let index = 1; index <= nbVerres; index++) {
    let verre;
    if (index % 5 === 0) {
        verre = "Eau"
    } else if (index % 3 === 0) {
        verre = "Rhum"
    } else if (index % 7 === 0) {
        verre = "Tequila"
    } else {
        verre = "Bières"
    }
    document.write(index + ": Verre de " + verre + "<br/>")
}
function drawRectTriangle(side) {
    for (let i = 0; i <= side; i++) {
        document.write("*".repeat(i) + "<br/>")
    }
}