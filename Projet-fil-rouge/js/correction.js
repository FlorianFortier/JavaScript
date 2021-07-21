const sendMessageForm = document.querySelector("#send-message-form");
const mainTouits = document.querySelector("#main-touits");
const trendingZone = document.querySelector("#trending-zone");

let influencersCount = 5;
let influencers = [];

function addTouit({id, name, message, likes, comments_count}) {
    const touit = document.createElement("article");
    touit.className = "touit";
    if (influencers.includes(name)) {
        touit.classList.add("important");
    }
    touit.addEventListener("mouseenter", update);

    const messageElement = document.createElement("p");
    messageElement.className = "msg";
    messageElement.textContent = message;

    const authorElement = document.createElement("p");
    authorElement.className = "name";
    authorElement.textContent = name;

    const infosGroup = document.createElement("div");
    infosGroup.className = "infos";

    const likesInfo = document.createElement("p");
    likesInfo.textContent = likes + " like" + (likes > 1 ? "s" : "");

    const commentsInfo = document.createElement("p");
    commentsInfo.textContent = comments_count + " comment" + (comments_count > 1 ? "s" : "");

    const toolbarGroup = document.createElement("div");
    toolbarGroup.className = "toolbar";

    const likeButton = document.createElement("button");
    likeButton.className = "like-button";
    likeButton.textContent = "♥";
    likeButton.addEventListener("click", () => {
        apiLikeTouit(
            id,
            update,
            msg => {
                setModalContent("Erreur !", function(root) {
                    const para1 = document.createElement("p");
                    para1.textContent = "Une erreur a eu lieu !";
                    const para2 = document.createElement("p");
                    para2.textContent = msg;
                    root.appendChild(para1);
                    root.appendChild(para2);
                });
                showModal();
            }
        );
    });

    window.addEventListener("scroll", function() {
        if (
            touit.offsetTop - window.scrollY > 0
            && touit.offsetTop + touit.offsetHeight - (window.scrollY + Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)) < 0
        ) {
            update();
        }
    });

    function update() {
        if (influencers.includes(name)) {
            touit.classList.add("important");
        } else {
            touit.classList.remove("important");
        }
        apiGetTouit(
            id,
            resp => {
                likesInfo.textContent = resp.data.likes + " like" + (resp.data.likes > 1 ? "s" : "");
                commentsInfo.textContent = resp.data.comments_count + " commento" + (resp.data.comments_count > 1 ? "s" : "");
            },
            console.error
        );
    }

    touit.appendChild(messageElement);
    touit.appendChild(authorElement);
    infosGroup.appendChild(likesInfo);
    infosGroup.appendChild(commentsInfo);
    touit.appendChild(infosGroup);
    toolbarGroup.appendChild(likeButton);
    touit.appendChild(toolbarGroup);
    mainTouits.appendChild(touit);
}

sendMessageForm.addEventListener("submit", function (ev) {
    ev.preventDefault();

    apiSendTouit(
        ev.target["nickname"].value,
        ev.target["message"].value,
        function(resp) {
            ev.target["message"].value = "";
            setModalContent("Cool",function(root) {
                const para = document.createElement("p");
                para.textContent = "Votre touit a bien été envoyé !";
                root.appendChild(para);
            });
            showModal();
        },
        function(msg) {
            setModalContent("Erreur !", function(root) {
                const para1 = document.createElement("p");
                para1.textContent = "Une erreur a eu lieu !";
                const para2 = document.createElement("p");
                para2.textContent = msg;
                root.appendChild(para1);
                root.appendChild(para2);
            });
            showModal();
        }
    );
});

// let lastTimestamp = 0;
// setInterval(function() {
//     apiGetTouits(
//         lastTimestamp,
//         function (resp) {
//             lastTimestamp = resp.ts;
//             resp.messages.forEach(touit => addTouit(touit.name, touit.message));
//         }
//     );
// }, 1000);

let lastTimestamp = 0;
function refresh() {
    apiGetTouits(
        lastTimestamp,
        ({ts, messages}) => {
            lastTimestamp = ts;
            messages.forEach(touit => addTouit(touit));

            setTimeout(refresh, 250);
        }
    );

    apiGetTrending(
        resp => {
            trendingZone.textContent = "";
            Object.entries(resp)
                .sort((a, b) => b[1] - a[1])
                .forEach(([word]) => {
                    const wordElem = document.createElement("span");
                    wordElem.textContent = "#" + word;
                    trendingZone.appendChild(wordElem);
                })
        },
        console.error
    );

    apiGetInfluencers(
        influencersCount,
        resp => {
            influencers = Object.keys(resp.influencers);
        },
        console.error
    );

}

refresh();






// Autre .js  suite correction

function apiGetTouits(timestamp, callback) {
    const request = new XMLHttpRequest();
    request.open("GET", "http://touiteur.cefim-formation.org/list?ts=" + encodeURIComponent(timestamp), true);
    request.addEventListener("readystatechange", function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                const response = JSON.parse(request.responseText);
                callback(response);
            } else {
                alert("Error " + request.state + " :(");
            }
        }
    });
    request.send();
}

function apiSendTouit(name, message, onSuccess, onError) {
    const request = new XMLHttpRequest();
    request.open("POST", "http://touiteur.cefim-formation.org/send", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.addEventListener("readystatechange", function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                const response = JSON.parse(request.responseText);
                if (response.hasOwnProperty("success")) {
                    onSuccess(response);
                } else if (response.hasOwnProperty("error")) {
                    onError("Une erreur est survenue : " + response.error);
                } else {
                    onError("Une erreur inconnue est survenue : veuillez contacter l'administrateur !");
                }
            } else {
                onError("Une erreur réseau est survenue : veuillez contacter l'administrateur !")
            }
        }
    });
    request.send("name=" + encodeURIComponent(name) + "&message=" + encodeURIComponent(message));
}

function apiLikeTouit(id, onSuccess, onError) {
    const request = new XMLHttpRequest();
    request.open("PUT", "http://touiteur.cefim-formation.org/likes/send", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.addEventListener("readystatechange", function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                const response = JSON.parse(request.responseText);
                if (response.hasOwnProperty("success")) {
                    onSuccess(response);
                } else if (response.hasOwnProperty("error")) {
                    onError("Une erreur est survenue : " + response.error);
                } else {
                    onError("Une erreur inconnue est survenue : veuillez contacter l'administrateur !");
                }
            } else {
                onError("Une erreur réseau est survenue : veuillez contacter l'administrateur !")
            }
        }
    });
    request.send("message_id=" + encodeURIComponent(id));
}

function apiGetTouit(id, onSuccess, onError) {
    const request = new XMLHttpRequest();
    request.open("GET", "http://touiteur.cefim-formation.org/get?id=" + encodeURIComponent(id), true);
    request.addEventListener("readystatechange", function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                const response = JSON.parse(request.responseText);
                if (response.hasOwnProperty("success")) {
                    onSuccess(response);
                } else if (response.hasOwnProperty("error")) {
                    onError("Une erreur est survenue : " + response.error);
                } else {
                    onError("Une erreur inconnue est survenue : veuillez contacter l'administrateur !");
                }
            } else {
                onError("Une erreur réseau est survenue : veuillez contacter l'administrateur !")
            }
        }
    });
    request.send();
}

function apiGetTrending(onSuccess, onError) {
    const request = new XMLHttpRequest();
    request.open("GET", "http://touiteur.cefim-formation.org/trending", true);
    request.addEventListener("readystatechange", function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                const response = JSON.parse(request.responseText);
                onSuccess(response);
            } else {
                onError("Erreur HTTP !");
            }
        }
    });
    request.send();
}

function apiGetInfluencers(count, onSuccess, onError) {
    const request = new XMLHttpRequest();
    request.open("GET", "http://touiteur.cefim-formation.org/influencers?count=" + encodeURIComponent(count), true);
    request.addEventListener("readystatechange", function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                const response = JSON.parse(request.responseText);
                onSuccess(response);
            } else {
                onError("Erreur HTTP !");
            }
        }
    });
    request.send();
}