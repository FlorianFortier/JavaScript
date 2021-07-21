let nbNote = prompt('entrez le nombre de note')
let somme = 0
for (let i = 1; i <= nbNote; i++) {
    prompt('entrez la note')
    somme += i
    if (i == nbNote) {
    const result = somme / nbNote
    alert('votre moyenne est de'+result)
    }
}