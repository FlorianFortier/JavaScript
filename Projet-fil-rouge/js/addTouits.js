const btn = document.querySelector(".submit-btn");
const trendingZone = document.querySelector("#trending-zone");
let likes = 0
let id = 0

// let influencersCount = 5;
// let influencers = [];

function addCommentZone(id, name, message, likes, comments_count) {
    setModalContent(
        "Commentaires du touit N°" + id,
        root => {
            const touit = document.createElement("article");
            touit.className = "touit";

            const messageElement = document.createElement("p");
            messageElement.className = "msg";
            messageElement.textContent = message;

            const authorElement = document.createElement("p");
            authorElement.className = "name";
            authorElement.textContent = name;

            const infosGroup = document.createElement("div");
            infosGroup.className = "comments-touit-infos";

            const likesInfo = document.createElement("p");
            likesInfo.textContent = likes + " like" + (likes > 1 ? "s" : "");

            const commentsInfo = document.createElement("p");
            commentsInfo.textContent = comments_count + " comment" + (comments_count > 1 ? "s" : "");

            const commentsZone = document.createElement("div");
            commentsZone.className = "comments-zone";

            // update();

            // const sendForm = document.createElement("form");
            // sendForm.addEventListener("submit", ev => {
            //     ev.preventDefault();

            //     apiSendComment(
            //         id,
            //         ev.target["nickname"].value,
            //         ev.target["comment"].value,
            //         () => {
            //             ev.target["comment"].value = "";
            //             update();
            //         },
            //         console.error
            //     );
            // });

            const nicknameControl = document.createElement("div");
            nicknameControl.className = "form-control";

            const nicknameLabel = document.createElement("label");
            nicknameLabel.htmlFor = "cmt-nickname";
            nicknameLabel.textContent = "Votre pseudo :";

            const nicknameInput = document.createElement("input");
            nicknameInput.type = "text";
            nicknameInput.id = "cmt-nickname";
            nicknameInput.name = "nickname";
            nicknameInput.placeholder = "xXx_B0g0ssDu37_xXx";
            nicknameInput.maxLength = 16;

            const commentControl = document.createElement("div");
            commentControl.className = "form-control";

            const commentLabel = document.createElement("label");
            commentLabel.htmlFor = "cmt-comment";
            commentLabel.textContent = "Votre commentaire :";

            const commentInput = document.createElement("input");
            commentInput.type = "text";
            commentInput.id = "cmt-comment";
            commentInput.name = "comment";
            commentInput.placeholder = "Blah blah blah blah blah blah blah blah...";
            commentInput.maxLength = 256;

            const submitButton = document.createElement("input");
            submitButton.type = "submit";

            // function update() {
            //     commentsZone.textContent = "Loading...";

            //     apiGetComments(
            //         id,
            //         resp => {
            //             commentsZone.textContent = "";
            //             resp.comments.forEach(({name, comment}) => {
            //                 const commentElement = document.createElement("p");

            //                 const nameContent = document.createElement("strong");
            //                 nameContent.textContent = name + " : ";

            //                 const commentContent = document.createElement("span");
            //                 commentContent.textContent = comment;

            //                 commentElement.appendChild(nameContent);
            //                 commentElement.appendChild(commentContent);
            //                 commentsZone.appendChild(commentElement);
            //             });
            //         },
            //         console.error
            //     );
            // }

            touit.appendChild(messageElement);
            touit.appendChild(authorElement);
            root.appendChild(touit);
            infosGroup.appendChild(likesInfo);
            infosGroup.appendChild(commentsInfo);
            root.appendChild(infosGroup);
            root.appendChild(document.createElement("hr"));
            root.appendChild(commentsZone);
            root.appendChild(document.createElement("hr"));
            nicknameControl.appendChild(nicknameLabel);
            nicknameControl.appendChild(nicknameInput);
            sendForm.appendChild(nicknameControl);
            commentControl.appendChild(commentLabel);
            commentControl.appendChild(commentInput);
            sendForm.appendChild(commentControl);
            sendForm.appendChild(submitButton);
            root.appendChild(sendForm);
        }
    );
    showModal();
}

function tarkovTouits(name, message, likes, message_id) {

    // création des éléments

    const newDiv = document.querySelector(".new-div");
    let addDiv = document.createElement("div");
    let addContent = document.createElement("p");
    let addName = document.createElement("p");
    let likeCount = document.createElement("p");
    let addBtnLike = document.createElement("button");
    let addBtnDislike = document.createElement("button");
    let addBtnComments = document.createElement("button")


    // ajoutez des classes au éléments nouvellement crées

    addDiv.className = "new-divD column full";
    likeCount.className = "like-count";
    addBtnLike.className = "like-btn";
    addBtnDislike.className = "like-btn";
    addName.className = "name-style";
    addContent.className = "content-style";
    addBtnComments.className = "comment-button";

    // ajoutez du text dans un des éléments créé 

    likeCount.textContent = "Likes = " + likes;
    addBtnLike.textContent = "♥";
    addBtnDislike.textContent = "Dislike";
    addName.textContent = name;
    addContent.textContent = message;
    addBtnComments.textContent = "💬";

    // les ajoutez en tant qu'enfant a une div 

    addDiv.appendChild(addName);
    addDiv.appendChild(addContent);
    addDiv.appendChild(addBtnLike);
    addDiv.appendChild(likeCount);
    addDiv.appendChild(addBtnDislike);
    addDiv.appendChild(addBtnComments);

    // Boutton Delete 

    let btnDelete = document.createElement("button");
    addDiv.appendChild(btnDelete);
    btnDelete.textContent = "Delete";
    btnDelete.className = "delete-btn";
    newDiv.prepend(addDiv);

    function deleteNote() {
        addDiv.remove();
    }
    btnDelete.addEventListener("click", deleteNote);

    // like a twit
    addBtnLike.addEventListener("click", function () {
        const addLike = new XMLHttpRequest
        addLike.open("PUT", "http://touiteur.cefim-formation.org/likes/send", true)
        addLike.setRequestHeader("content-type", "application/x-www-form-urlencoded")
        addLike.addEventListener("readystatechange", function () {
            if (addLike.readyState === XMLHttpRequest.DONE) {
                if (addLike.status === 200) {
                    likes++
                } else {
                    alert("Error")
                }

            }
        })
        addLike.send("message_id=" + message_id);
    })

    // dislike a twit

    addBtnDislike.addEventListener("click", function () {
        const deleteLike = new XMLHttpRequest();
        deleteLike.open("DELETE", "http://touiteur.cefim-formation.org/likes/remove", true)
        deleteLike.setRequestHeader("content-type", "application/x-www-form-urlencoded")
        deleteLike.addEventListener("readystatechange", function () {
            if (deleteLike.readyState === XMLHttpRequest.DONE) {
                if (deleteLike.status === 200) {
                    likes--
                } else {
                    alert("Error");
                }
            }
        })
        deleteLike.send("message_id=" + message_id);
    })
    // add comment 
    // addBtnComments.addEventListener("click", () => {
    //     addCommentZone(id, name, message, likes, comments_count);
    // });

    // window.addEventListener("scroll", function () {
    //     if (
    //         addDiv.offsetTop - window.scrollY > 0
    //         && addDiv.offsetTop + addDiv.offsetHeight - (window.scrollY + Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)) < 0
    //     ) {
    //         update();
    //     }
    // }); addEventListener("click", () => {
    //     addCommentZone(id, name, message, likes, comments_count);
    // });

    // window.addEventListener("scroll", function () {
    //     if (
    //         addDiv.offsetTop - window.scrollY > 0
    //         && addDiv.offsetTop + addDiv.offsetHeight - (window.scrollY + Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)) < 0
    //     ) {
    //         update();
    //     }
    // });
    // function update() {
    //     if (influencers.includes(name)) {
    //         addDiv.classList.add("important");
    //     } else {
    //         addDiv.classList.remove("important");
    //     }
    //     apiGetTouit(
    //         id,
    //         resp => {
    //             likesInfo.textContent = resp.data.likes + " like" + (resp.data.likes > 1 ? "s" : "");
    //             commentsInfo.textContent = resp.data.comments_count + " comment" + (resp.data.comments_count > 1 ? "s" : "");
    //         },
    //         console.error
    //     );
    // }
    // addDiv.appendChild(messageElement);
    // addDiv.appendChild(authorElement);
    // addDiv.appendChild(likeCount);
    // addDiv.appendChild(commentsInfo);
    // addDiv.appendChild(infosGroup);
    // addDiv.appendChild(likeButton);
    // addDiv.appendChild(commentButton);
    // addDiv.appendChild(addDiv);
}



function trendings(hotTwit) {
    const boxTrends = document.querySelector(".trends")
    let addTrends = document.createElement("p")
    let addDivTrends = document.createElement("div")

    addDivTrends.className = "layout-trends"
    addTrends.className = "trends-style"
    addTrends.textContent = hotTwit
    addDivTrends.appendChild(addTrends)

    boxTrends.prepend(addDivTrends)

}