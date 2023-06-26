import { createPosts } from "./posts-creator.js";

const template = document.querySelector("#picture").content.querySelector(".picture");
const pictureContainer = document.querySelector(".pictures");
const fragment = document.createDocumentFragment();
const posts = createPosts();

const createPicture = (post) => {
  const newPicture = template.cloneNode(true);
  newPicture.querySelector(".picture__img").src = post.url;
  newPicture.querySelector(".picture__img").alt = post.description;
  newPicture.querySelector(".picture__likes").textContent = post.likes;
  newPicture.querySelector(".picture__comments").textContent = post.comments.length;
  fragment.append(newPicture);
}

const renderImages = () => {
  posts.forEach((post) => createPicture(post));
  pictureContainer.append(fragment)
}

export {renderImages}


