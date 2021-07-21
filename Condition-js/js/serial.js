// 2806-2574-6082-8538
// 6730-2632-0376-0262
// 2223-2554-3222-2001
// 2415-5994-5142-6449
// 4212-4868-2124-8796
// 0441-0080-1440-8039

//Mon essaie

const serialNumber = window.prompt('Veuillez entrez votre clé série ')

const groups = serialNumber.split("-")
console.log(groups)

const Grp1 = groups[0]
const Grp2 = groups[1]
const Grp3 = groups[2]
const Grp4 = groups[3]
const times =  Grp2 == Grp3 * 7
let reverse = Grp3.reverse().join('')
function serialFn() {
    if (Number(Grp1) != reverse) {  
        alert('la serial nest pas bonne')
    }
    else if (times) {
        let lastC = times.charAt(str.length-4);
    }
    console.log(Grp1)
    console.log(lastC)
}

// Correction

// 2806-2574-6082-8538
// 6730-2632-0376-0262
// 2223-2554-3222-2001
// 2415-5994-5142-6449
// 4212-4868-2124-8796
// 0441-0080-1440-8039
const serialNumber = "2224-2554-3222-2001"
// Instancier une variable temoin = flag
let isValid = true;
if (serialNumber.length !== 19) {
    isValid = false;
    console.error("Mauvais format (longueur)")
} else if (serialNumber[4] !== '-' || serialNumber[9] !== '-' || serialNumber[14] !== '-') {
    isValid = false;
    console.error("Mauvais format (tiret)")
} else if (isNaN(serialNumber.split('-').join(''))) {
    isValid = false;
    console.error("Mauvais format (chiffres) ")
} else {
    const groups = serialNumber.split('-')
    // Etape 2 
    if (groups[0] !== groups[2].split('').reverse().join('')) {
        isValid = false;
        console.error("Regle 2 non respectée")
    }
    // ÉTAPE 3
    const numGroup1 = parseInt(groups[0])
    const numGroup2 = parseInt(groups[1])
    const numGroup3 = parseInt(groups[2]);
    const numGroup4 = parseInt(groups[3])
    // console.log(numGroup3)
    console.log((numGroup3 * 7).toString().slice(-4))
    if (groups[1] !== (numGroup3 * 7).toString().slice(-4)) {
        isValid = false;
        console.error("Regle numéro 3")
    }
    if ((numGroup1 + numGroup2 + numGroup3 + numGroup4) % 10000 !== 0) {
        isValid = false;
        console.error("Regle 4")
    }
    if (isValid) {
        alert("Le numero de série est valide")
    } else {
        alert("Le numéro de série est invalide")
    }
}