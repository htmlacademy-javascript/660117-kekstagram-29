import { createPosts } from "./posts-creator.js";

const template = document.querySelector("#picture").content;
const templateLink = template.querySelector(".picture");
export const fragment = document.createDocumentFragment();
const posts = createPosts();


for (let post of posts) {
  const newPicture = templateLink.cloneNode(true);
  const searchSelector = (selector) => newPicture.querySelector(selector);
  searchSelector(".picture__img").src = post.url;
  searchSelector(".picture__img").alt = post.description;
  searchSelector(".picture__likes").textContent = post.likes;
  searchSelector(".picture__comments").textContent = post.comments.length;
  fragment.append(newPicture);
}


