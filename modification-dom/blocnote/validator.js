const btn = document.querySelector("#add-button")
const newDiv = document.querySelector(".new-div")
const inputText = document.querySelector("#story")

function addNote() {
    let addDiv = document.createElement("div")
    addDiv.className = "new-divD"
    let addContent= document.createElement("p")
    addContent.textContent = inputText.value
    addDiv.appendChild(addContent);
    
    let btnDelete = document.createElement("button");        
    addDiv.appendChild(btnDelete)
    btnDelete.textContent = "Click Me"
    newDiv.prepend(addDiv);
    function deleteNote() {
        addDiv.remove()
    }
    btnDelete.addEventListener("click", deleteNote)

}
btn.addEventListener("click", addNote)