let ts = 0


function get() {
    const storeTwit = new XMLHttpRequest();
    storeTwit.open("GET", "http://touiteur.cefim-formation.org/list?ts=" + ts, true)


    storeTwit.addEventListener('readystatechange', function () {
        if (storeTwit.readyState === XMLHttpRequest.DONE) {
            if (storeTwit.status === 200) {
                const parse = JSON.parse(storeTwit.responseText);
                ts = JSON.parse(storeTwit.responseText).ts;
                for (i of parse.messages) {
                    tarkovTouits(i.name, i.message, i.likes, i.id);
                }
            } else {
                alert("error")
            }
        }
    })
    storeTwit.send();
}
// post a twit 


const form = document.querySelector(".form")
const nameInput = document.querySelector("#name")
const messageInput = document.querySelector("#text-area")


form.addEventListener("submit", function (ev) {
    ev.preventDefault();

    const sendTwit = new XMLHttpRequest();
    sendTwit.open("POST", "http://touiteur.cefim-formation.org/send", true);
    sendTwit.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    sendTwit.addEventListener("readystatechange", function () {
        if (sendTwit.readyState === XMLHttpRequest.DONE) {
            if (sendTwit.status === 200) {
                const response = JSON.parse(sendTwit.responseText)
                if (response.hasOwnProperty('success')) {
                    setModalContent("Cool", function (root) {
                        const para = document.createElement("p");
                        para.className = "erreur"
                        para.textContent = "Davai davai your twit has been sent";
                        root.appendChild(para);
                    });
                    showModal();
                } else if (response.hasOwnProperty('error')) {
                    setModalContent("Erreur !", function (root) {
                        const para1 = document.createElement("p");
                        para1.className = "erreur"
                        para1.textContent = "Go drink so vodka before posting your twit!";
                        const para2 = document.createElement("p");
                        para2.className = "erreur"
                        para2.textContent = "Message : " + resp.error;
                        root.appendChild(para1);
                        root.appendChild(para2);
                    });
                    showModal();
                } else {
                    alert("Une erreur inconnue est survenue : veuillez contacter l'administrateur !");
                }
            }
        }
    })
sendTwit.send("name=" + nameInput.value + "&" + "message=" + messageInput.value);

});

//refresh 

setInterval(get, 1500);

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



// trending 
const trends = new XMLHttpRequest();

trends.open("GET", "http://touiteur.cefim-formation.org/trending", true)
trends.addEventListener("readystatechange", function () {
    if (trends.readyState === XMLHttpRequest.DONE) {
        if (trends.status === 200) {
            let parseTrends = JSON.parse(trends.responseText)
            for (i in parseTrends) {
                if (parseTrends[i] > 100) {
                    trendings(i);
                }
            }
        }
    }
})
trends.send();

// get id twit

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

// influencers

// function apiGetInfluencers(count, onSuccess, onError) {
//     const request = new XMLHttpRequest();
//     request.open("GET", "http://touiteur.cefim-formation.org/influencers?count=" + encodeURIComponent(count), true);
//     request.addEventListener("readystatechange", function() {
//         if (request.readyState === XMLHttpRequest.DONE) {
//             if (request.status === 200) {
//                 const response = JSON.parse(request.responseText);
//                 onSuccess(response);
//             } else {
//                 onError("Erreur HTTP !");
//             }
//         }
//     });
//     request.send();
// }
// function apiGetComments(id, onSuccess, onError) {
//     const request = new XMLHttpRequest();
//     request.open("GET", "http://touiteur.cefim-formation.org/comments/list?message_id=" + encodeURIComponent(id), true);
//     request.addEventListener("readystatechange", function() {
//         if (request.readyState === XMLHttpRequest.DONE) {
//             if (request.status === 200) {
//                 const response = JSON.parse(request.responseText);
//                 if (response.hasOwnProperty("comments")) {
//                     onSuccess(response);
//                 } else if (response.hasOwnProperty("error")) {
//                     onError("Une erreur est survenue : " + response.error);
//                 } else {
//                     onError("Une erreur inconnue est survenue : veuillez contacter l'administrateur !");
//                 }
//             } else {
//                 onError("Une erreur réseau est survenue : veuillez contacter l'administrateur !")
//             }
//         }
//     });
//     request.send();
    
// }

// let lastTimestamp = 0;
// function refresh() {
//     apiGetTouit(
//         lastTimestamp,
//         ({ts, messages}) => {
//             lastTimestamp = ts;
//             messages.forEach(touit => tarkovTouits(touit));

//             setTimeout(refresh, 250);
//         }
//     );

//     trendings(
//         resp => {
//             trendingZone.textContent = "";
//             Object.entries(resp)
//                 .sort((a, b) => b[1] - a[1])
//                 .forEach(([word]) => {
//                     const wordElem = document.createElement("span");
//                     wordElem.textContent = "#" + word;
//                     trendingZone.appendChild(wordElem);
//                 })
//         },
//         console.error
//     );

//     apiGetInfluencers(
//         influencersCount,
//         resp => {
//             influencers = Object.keys(resp.influencers);
//         },
//         console.error
//     );

// }

// refresh();