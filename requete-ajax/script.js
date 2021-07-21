const joke = document.querySelector("#joke");
// on ouvre une request et on écoute pour la longeur du tableau, on ajoute un btn
const request = new XMLHttpRequest();

request.open("GET", "https://api.chucknorris.io/jokes/categories", true);
request.addEventListener("readystatechange", function() {
    const table  = (JSON.parse(request.responseText))
    for (let i = 0; i < table.length; i++) {
        const randomBtn = document.createElement("button");
        randomBtn.textContent = table[i] 
        document.body.appendChild(randomBtn)

        randomBtn.addEventListener("click", function () {
        // pour chaque btn on execute cette function pour appelez une blague aléatoire dans la bonne catégorie.
        const category = new XMLHttpRequest();
        category.open("GET", "https://api.chucknorris.io/jokes/random?category=" + table[i], true);
    
        category.addEventListener("readystatechange", function () {
        
            if (category.readyState === XMLHttpRequest.DONE) {
                if (category.status === 200) {
                    const response = JSON.parse(category.responseText);
                    joke.textContent = response.value;

                } else {
                    alert("Error !");
                }
            }
        });
        joke.textContent = "Loading...";
        category.send();
});

    }
})
request.send();
