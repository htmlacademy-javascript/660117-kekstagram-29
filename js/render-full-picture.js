import { renderImages } from "./render-images.js";
import { posts } from "./render-images.js";

renderImages();
const pictureContainer = document.querySelector(".big-picture");
const commentTemplate = document.querySelector("#comment").content.querySelector(".social__comment");
const commentsList = document.querySelector(".social__comments");
const commentsCounter = document.querySelector(".comments-count-shown");
const body = document.querySelector("body");
const closePictureButton = document.querySelector("#picture-cancel");
let post = {};
let comments = [];
let startElement = 0;
let finishElement = 5;

const closePicture = () => {
  closePictureButton.addEventListener("click", () => {
    pictureContainer.classList.add("hidden");
    body.classList.remove("modal-open");
    startElement = 0;
    finishElement = 5;
  });
  document.addEventListener("keydown", (evt) => {
    if (evt.keyCode === 27) {
      pictureContainer.classList.add("hidden");
      body.classList.remove("modal-open");
      startElement = 0;
      finishElement = 5;
    }
  });
};

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
  startElement++;
  finishElement++;
};

const pushInfo = (post) => {
  pictureContainer.querySelector("img").src = post.url;
  pictureContainer.querySelector(".social__caption").textContent = post.description;
  pictureContainer.querySelector(".likes-count").textContent = post.likes;
  pictureContainer.querySelector(".comments-count-all").textContent = post.comments.length;
  commentsCounter.textContent = comments.length;
};

const renderFullPicture = () => {
  document.addEventListener("click", (evt) => {
    if (evt.target.matches(".picture__img")) {
      removeComments();
      evt.preventDefault();
      pictureContainer.classList.remove("hidden");
      body.classList.add("modal-open");
      closePicture();
      post = posts.find((element) => element.id == evt.target.id);
      comments = post.comments.slice(startElement, finishElement);
      pushInfo(post);
      comments.forEach((comment) => createCommentsList(comment));
    }
    if (evt.target.matches(".social__comments-loader")) {
      comments = post.comments.slice(startElement, finishElement);
      comments.forEach((comment) => createCommentsList(comment));
      commentsCounter.textContent = Number(commentsCounter.textContent) + comments.length;
    }
  });
};

export { renderFullPicture };
