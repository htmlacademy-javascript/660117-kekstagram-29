const pictureContainer = document.querySelector('.big-picture');
const pictureImg = pictureContainer.querySelector('img');
const socialCaption = pictureContainer.querySelector('.social__caption');
const likesCount = pictureContainer.querySelector('.likes-count');
const loadCommentsButton = pictureContainer.querySelector('.comments-loader');
const commentTemplate = document.querySelector('.social__comment');
const commentsList = document.querySelector('.social__comments');
const socialCommentCount = document.querySelector('.social__comment-count');
const pictureCloseButton = document.querySelector('#picture-cancel');
let postObject = {};
let startElement = 0;
let finishElement = 5;

const fillCommentsList = (comment) => {
  const newComment = commentTemplate.cloneNode(true);
  newComment.querySelector('.social__picture').src = comment.avatar;
  newComment.querySelector('.social__picture').alt = comment.name;
  newComment.querySelector('.social__text').textContent = comment.message;
  commentsList.append(newComment);
};

const createCommentsList = () => {
  if (finishElement >= postObject.comments.length) {
    finishElement = postObject.comments.length;
    loadCommentsButton.classList.add('hidden');
  };
  const comments = postObject.comments.slice(startElement, finishElement);
  comments.forEach((comment) => fillCommentsList(comment));
  socialCommentCount.innerHTML =
  `${finishElement} из <span class='comments-count'>${postObject.comments.length}</span> комментариев`;
}

const loadCommentsButtonClickHandler = () => {
  startElement += 5;
  finishElement += 5;
  createCommentsList();
}

const fillPictureInfo = (post) => {
  pictureImg.src = post.url;
  socialCaption.textContent = post.description;
  likesCount.textContent = post.likes;
};

const closeModal = () => {
  pictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  loadCommentsButton.removeEventListener('click', loadCommentsButtonClickHandler);
  loadCommentsButton.classList.remove('hidden');
  startElement = 0;
  finishElement = 5;
};

const pictureCloseButtonClickHandler = (event) => {
  event.preventDefault();
  closeModal();
}

const documentKeydownHandler = (event) => {
  event.preventDefault();
  if (event.keyCode === 27 && !event.target.closest('.social__footer-text')) {
    closeModal();
  }
}

const openModal = () => {
  pictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  loadCommentsButton.addEventListener('click', loadCommentsButtonClickHandler);
  pictureCloseButton.addEventListener('click', pictureCloseButtonClickHandler, {once: true});
  document.addEventListener('keydown', documentKeydownHandler, {once: true});
  //Оставил {once: true}, проверял несколько раз оно срабатывает.
};

const renderBigPicture = (post) => {
  commentsList.innerHTML = '';
  openModal();
  postObject = post;
  fillPictureInfo(post);
  createCommentsList();
}

export { renderBigPicture };
