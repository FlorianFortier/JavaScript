

// 2806-2574-6082-8538
// 6730-2632-0376-0262
// 2223-2554-3222-2001
// 2415-5994-5142-6449
// 4212-4868-2124-8796
// 0441-0080-1440-8039

// const checkBtn = document.querySelector("#check")
// function condition() {
//     const message = document.querySelector("#message")
//     const serialNumber = document.querySelector("#serial-number").value
//     console.log(serialNumber)
//     let isValid = true;
//     if (serialNumber.length !== 19) {
//         isValid = false;
//         checkBtn.setAttribute("disabled", "")
//         message.textContent = ("Mauvais format (longueur)")
//     } else if (serialNumber[4] !== '-' || serialNumber[9] !== '-' || serialNumber[14] !== '-') {
//         isValid = false;
//         checkBtn.setAttribute("disabled", "")
//         message.textContent = ("Mauvais format (tiret)")
//     } else if (isNaN(serialNumber.split('-').join(''))) {
//         isValid = false;
//         checkBtn.setAttribute("disabled", "")
//         message.textContent = ("Mauvais format (chiffres) ")
//     } else {
//         const groups = serialNumber.split('-')
//         // Etape 2 
//         if (groups[0] !== groups[2].split('').reverse().join('')) {
//             isValid = false;
//             checkBtn.setAttribute("disabled", "")
//             message.textContent = ("Regle 2 non respectée")
//         }
//         // ÉTAPE 3
//         const numGroup1 = parseInt(groups[0])
//         const numGroup2 = parseInt(groups[1])
//         const numGroup3 = parseInt(groups[2]);
//         const numGroup4 = parseInt(groups[3])
//         // console.log(numGroup3)
//         if (groups[1] !== (numGroup3 * 7).toString().slice(-4)) {
//             isValid = false;
//             checkBtn.setAttribute("disabled", "")
//             message.textContent = ("Regle numéro 3")
//         }
//         if ((numGroup1 + numGroup2 + numGroup3 + numGroup4) % 10000 !== 0) {
//             isValid = false;
//             checkBtn.setAttribute("disabled", "")
//             message.textContent = ("Regle 4")
//         }
//         if (isValid) {
//             message.textContent = ("Le numero de série est valide")
//         } else {
//             message.textContent = ("Le numéro de série est invalide")
//         }
//     }
// }
checkBtn.addEventListener("click", condition)

const serialInput = document.querySelector("#serial-input");
const checkButton = document.querySelector("#check-button");
const messageOutput = document.querySelector("#message-output");
const serialForm = document.querySelector("form");

const serialRegex = /^\d{4}(?:-\d{4}){3}$/;

serialInput.value = "";

serialInput.addEventListener("input", function () {
    // 1. Filtrage
    serialInput.value = serialInput.value
        .split("")                              // Séparation
        .filter(c => c.match(/\d/))     // Filtrage des nombres
        .join("")                               // Reconstruction
        .slice(0, 16);                          // Limitation de la longueur

    // 2. Formattage
    for (let i = 12; i > 0; i -= 4) {
        if (serialInput.value.length > i) {
            serialInput.value = serialInput.value.slice(0, i) + "-" + serialInput.value.slice(i);
        }
    }

    checkButton.disabled = !serialRegex.test(serialInput.value);
});

serialForm.addEventListener("submit", function (ev) {
    ev.preventDefault();

    const serialNumber = serialInput.value;
    let isValid = true;

    if (serialNumber.length !== 19) {
        isValid = false;
    } else if (serialNumber[4] !== '-' || serialNumber[9] !== '-' || serialNumber[14] !== '-') {
        isValid = false;
    } else if (isNaN(serialNumber.split('-').join(''))) {
        isValid = false;
    } else {
        const groups = serialNumber.split('-');
        // Etape 2
        if (groups[0] !== groups[2].split('').reverse().join('')) {
            isValid = false;
        }
        // ÉTAPE 3
        const numGroups = groups.map(g => parseInt(g));
        if (groups[1] !== (numGroups[2] * 7).toString().slice(-4)) {
            isValid = false;
        }
        if (numGroups.reduce((acc, value) => acc + value) % 10000 !== 0) {
            isValid = false;
        }
    }

    if (isValid) {
        messageOutput.textContent = "Le numero de série est valide";
    } else {
        messageOutput.textContent = "Le numéro de série est invalide";
    }
});