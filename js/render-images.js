import { createPosts } from "./create-posts.js";
import { renderFullPicture } from './render-full-picture.js';

const template = document.querySelector("#picture").content.querySelector(".picture");
const pictureContainer = document.querySelector(".pictures");
const fragment = document.createDocumentFragment();
const posts = createPosts();


const createPicture = (post) => {
  const newPicture = template.cloneNode(true);
  const img = newPicture.querySelector(".picture__img");
  img.src = post.url;
  img.alt = post.description;
  newPicture.querySelector(".picture__likes").textContent = post.likes;
  newPicture.querySelector(".picture__comments").textContent = post.comments.length;
  newPicture.addEventListener("click", () => renderFullPicture(post));
  fragment.append(newPicture);
}

const renderImages = () => {
  posts.forEach((post) => createPicture(post));
  pictureContainer.append(fragment)
}

export { renderImages }
