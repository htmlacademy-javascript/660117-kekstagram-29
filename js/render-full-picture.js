const pictureContainer = document.querySelector(".big-picture");
const loadCommentsButton = pictureContainer.querySelector(".comments-loader");
const commentTemplate = document.querySelector("#comment").content.querySelector(".social__comment");
const commentsList = document.querySelector(".social__comments");
const commentsCounter = document.querySelector(".comments-count-shown");
const body = document.querySelector("body");
const closePictureButton = document.querySelector("#picture-cancel");
let postObject = {};
let startElement = 0;
let finishElement = 5;

const closePicture = () => {
    pictureContainer.classList.add("hidden");
    body.classList.remove("modal-open");
    startElement = 0;
    finishElement = 5;
};

const loadComments = () => {
  startElement += 5;
  finishElement += 5;
  const comments = postObject.comments.slice(startElement, finishElement);
  comments.forEach((comment) => createCommentsList(comment));
  commentsCounter.textContent = Number(commentsCounter.textContent) + comments.length;
}

const removeComments = () => {
  const comment = document.querySelectorAll(".social__comment");
  comment.forEach((element) => element.remove());
};

const createCommentsList = (comment) => {
  const newComment = commentTemplate.cloneNode(true);
  newComment.querySelector(".social__picture").src = comment.avatar;
  newComment.querySelector(".social__picture").alt = comment.name;
  newComment.querySelector(".social__text").textContent = comment.message;
  commentsList.append(newComment);
};

const pushInfo = (post, comments) => {
  pictureContainer.querySelector("img").src = post.url;
  pictureContainer.querySelector(".social__caption").textContent = post.description;
  pictureContainer.querySelector(".likes-count").textContent = post.likes;
  pictureContainer.querySelector(".comments-count-all").textContent = post.comments.length;
  commentsCounter.textContent = comments.length;
};

const renderFullPicture = (post) => {
  removeComments();
  pictureContainer.classList.remove("hidden");
  body.classList.add("modal-open");
  postObject = post;
  const comments = post.comments.slice(startElement, finishElement);
  pushInfo(post, comments);
  comments.forEach((comment) => createCommentsList(comment));
  loadCommentsButton.addEventListener("click", loadComments);
  closePictureButton.addEventListener("click", closePicture, {once: true});
  document.addEventListener("keydown",  (evt) => {if (evt.keyCode === 27) {closePicture()}}, {once: true});
};

export { renderFullPicture };
