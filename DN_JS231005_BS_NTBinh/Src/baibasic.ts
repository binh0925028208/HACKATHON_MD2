function getAllItems(tableName: string) {
  const entities = JSON.parse(localStorage.getItem(tableName) as string) || [];
  return entities;
}

function deleteItemById(tableName: string, id: number) {
  try {
    const entities =
      JSON.parse(localStorage.getItem(tableName) as string) || [];

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
  } catch (error) {
    return false;
  }
}

interface Post {
  id: number;
  title: string;
  context: string;
  comment: string[];
}
const post: Post[] = [];
if (!JSON.parse(localStorage.getItem("Post") as string)) {
  localStorage.setItem("Post", JSON.stringify(post));
}
class postList implements Post {
  id: number;
  title: string;
  context: string;
  comment: string[];

  constructor(id: number, title: string, context: string, comment: string[]) {
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

function onAdd(): void {
  const postData: postList[] = getAllItems("Post");
  let id: number =
    postData.length > 0 ? postData[postData.length - 1].id + 1 : 1;
  let title: HTMLInputElement = document.getElementById(
    "postTitle"
  ) as HTMLInputElement;
  let context: HTMLTextAreaElement = document.getElementById(
    "postText"
  ) as HTMLTextAreaElement;
  let titleValue: string = title.value;
  let contextValue: string = context.value;
  let newPost: postList = new postList(id, titleValue, contextValue, []);
  postData.push(newPost);
  localStorage.setItem("Post", JSON.stringify(postData));
  title.value = "";
  context.value = "";
  renderPost();
}

function renderPost(): void {
  let postList: Post[] = getAllItems("Post");
  let renderPostList: HTMLElement = document.getElementById(
    "postMini"
  ) as HTMLElement;
  renderPostList.innerHTML = ``;
  // let renderComment: HTMLElement = document.getElementById(
  //   "userComment"
  // ) as HTMLElement;
  // renderComment.innerHTML = ``;
  postList.forEach((item: Post) => {
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

function onComment(id: number): void {
  let modal: HTMLElement = document.getElementById("modal") as HTMLElement;
  modal.style.display = "block";
  addComment(id);
}
function addComment(id: number): void {
  const postData: postList[] = getAllItems("Post");
  let postAfterFind: postList | undefined = postData.find(
    (item: postList) => item.id == id
  );
  let comment: HTMLTextAreaElement = document.getElementById(
    "commentText"
  ) as HTMLTextAreaElement;
  let contextValue: string = comment.value;
  postAfterFind?.comment.push(contextValue);
  localStorage.setItem("Post", JSON.stringify(postData));
}
function closeModal() {
  window.location.reload();
}
