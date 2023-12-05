"use strict";
function getAllItems(tableName) {
    const entities = JSON.parse(localStorage.getItem(tableName)) || [];
    return entities;
}
function deleteItemById(tableName, id) {
    try {
        const entities = JSON.parse(localStorage.getItem(tableName)) || [];
        let delIndex = -1;
        for (let i = 0; i < entities.length; i++) {
            const _entity = entities[i];
            if (_entity.id == id) {
                delIndex = i;
            }
        }
        if (delIndex != -1) {
            entities.splice(delIndex, 1);
            localStorage.setItem(tableName, JSON.stringify(entities));
        }
        return true;
    }
    catch (error) {
        return false;
    }
}
const post = [];
if (!JSON.parse(localStorage.getItem("Post"))) {
    localStorage.setItem("Post", JSON.stringify(post));
}
class postList {
    constructor(id, title, context, comment) {
        this.id = id;
        this.title = title;
        this.context = context;
        this.comment = comment;
    }
}
// class CommentList {
//   id: number;
//   context: string;
//   constructor(id: number, context: string) {
//     this.id = id;
//     this.context = context;
//   }
// }
// const comment: CommentList[] = [];
// if (!JSON.parse(localStorage.getItem("Comment") as string)) {
//   localStorage.setItem("Comment", JSON.stringify(comment));
// }
function onAdd() {
    const postData = getAllItems("Post");
    let id = postData.length > 0 ? postData[postData.length - 1].id + 1 : 1;
    let title = document.getElementById("postTitle");
    let context = document.getElementById("postText");
    let titleValue = title.value;
    let contextValue = context.value;
    let newPost = new postList(id, titleValue, contextValue, []);
    postData.push(newPost);
    localStorage.setItem("Post", JSON.stringify(postData));
    title.value = "";
    context.value = "";
    renderPost();
}
function renderPost() {
    let postList = getAllItems("Post");
    let renderPostList = document.getElementById("postMini");
    renderPostList.innerHTML = ``;
    // let renderComment: HTMLElement = document.getElementById(
    //   "userComment"
    // ) as HTMLElement;
    // renderComment.innerHTML = ``;
    postList.forEach((item) => {
        renderPostList.innerHTML += `<div class="postBox">
    <h3>${item.title}</h3>
    <p>
      ${item.context}
    </p>
    <div>
    <button onclick="onComment(${item.id})">
      <p>Bình luận</p>
    </button>
    </div>
    <div class="commentBox">
    <div class="commentCount" >
      <p><strong>${item.comment.length} bình luận</strong></p>
    </div>
    <div class="commentOfUser" id ="userComment">
    </div>
  </div>
  </div> `;
        // item.comment.forEach((item) => {
        //   renderComment.innerHTML += `<p>${item}</p>`;
        // });
    });
}
function onComment(id) {
    let modal = document.getElementById("modal");
    modal.style.display = "block";
    addComment(id);
}
function addComment(id) {
    const postData = getAllItems("Post");
    let postAfterFind = postData.find((item) => item.id == id);
    let comment = document.getElementById("commentText");
    let contextValue = comment.value;
    postAfterFind === null || postAfterFind === void 0 ? void 0 : postAfterFind.comment.push(contextValue);
    localStorage.setItem("Post", JSON.stringify(postData));
}
function closeModal() {
    window.location.reload();
}
