function introduce(){
    console.log("je m'appel" + this.prenom + "et je suis le poste" + this.poste)
}
function workWith() {
    console.log("Je travailles avec " + this.collaborateurs.reduce((acc, cur) => { return { count: acc.count + 1, result: (acc.count > 1 ? (cur + ", " + acc.result) : (acc.count === 1 ? (cur + " et " + acc.result) : cur)) } }, { result: "", count: 0 }).result);
}
// let liste = [
//     {
//         nom1 : Florian,
//         age1 : 21,
//         poste1 : devFront,
//         language1 : [],
//     },
//     {
//         nom2 : Jérome,
//         age2 : 42,
//         poste2 : devback,
//         language2 : [],
//     },
//     {
//         nom3 : Léandro,
//         age3 : 44,
//         poste3 : chefProjet,
//         language3 : [],
//     },
//     {
//         nom4 : Ludivine,
//         age4 : 32,
//         poste4 : designer,
//         language4 : [],
//     },
//     {
//         nom5 : Edouard,
//         age5 : 52,
//         poste5 : commercial,
//         language5 : [],

//     }
// ]
const equipe = [
    {
        "prenom": "Nicolas",
        "age": 25,
        "poste": "développeur frontend",
        "langages": [
            "HTML",
            "CSS",
            "JavaScript",
            "SASS"
        ],
        "collaborateurs": [
            "le designer",
            "le développeur backend"
        ],
        "introduce": introduce,
        "workWith": workWith
    },
    {
        "prenom": "Julien",
        "age": 39,
        "poste": "développeur backend",
        "langages": [
            "JavaScript",
            "PHP",
            "Python",
            "java"
        ],
        "collaborateurs": [
            "le développeur frontend"
        ],
        "introduce": introduce,
        "workWith": workWith
    },
    {
        "prenom": "El-hadji",
        "age": 30,
        "poste": "chef de projet",
        "langages": [
            "HTML",
            "UML"
        ],
        "collaborateurs": [
            "le développeur frontend",
            "le développeur backend",
            "le designer",
            "le commercial"
        ],
        "introduce": introduce,
        "workWith": workWith
    },
    {
        "prenom": "Audrey",
        "age": 24,
        "poste": "designer",
        "langages": [
            "CSS",
            "SASS",
            "SCSS",
            "Processing"
        ],
        "collaborateurs": [
            "le développeur frontend",
            "le commercial"
        ],
        "introduce": introduce,
        "workWith": workWith
    },
    {
        "prenom": "Olivier",
        "age": 25,
        "poste": "commercial",
        "langages": [],
        "collaborateurs": [
            "le designer"
        ],
        "introduce": introduce,
        "workWith": workWith
    }
];
for (let x of equipe){
    x.introduce()
    x.workWith()
}
