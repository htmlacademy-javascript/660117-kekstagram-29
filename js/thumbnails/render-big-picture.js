const COMMENTS_COUNTER = 5;

const pictureContainer = document.querySelector('.big-picture');
const pictureImg = pictureContainer.querySelector('img');
const socialCaption = pictureContainer.querySelector('.social__caption');
const likesCount = pictureContainer.querySelector('.likes-count');
const loadCommentsButton = pictureContainer.querySelector('.comments-loader');
const commentTemplate = document.querySelector('.social__comment');
const commentsList = document.querySelector('.social__comments');
const socialCommentCount = document.querySelector('.social__comment-count');
const pictureCloseButton = document.querySelector('#picture-cancel');
let comments = [];
let shownElements = 0;

const createComment = (comment) => {
  const newComment = commentTemplate.cloneNode(true);
  newComment.querySelector('.social__picture').src = comment.avatar;
  newComment.querySelector('.social__picture').alt = comment.name;
  newComment.querySelector('.social__text').textContent = comment.message;
  return newComment;
};

const setloadCommentsButtonState = () => {
  if (shownElements >= comments.length) {
    loadCommentsButton.classList.add('hidden');
    return;
  }
  loadCommentsButton.classList.remove('hidden');
};

const fillCommentCounter = () => {
  socialCommentCount.innerHTML =
  `${shownElements} из <span class='comments-count'>${comments.length}</span> комментариев`;
};

const createCommentsList = () => {
  const currentComments = comments.slice(shownElements, shownElements + COMMENTS_COUNTER);
  currentComments.forEach((comment) => commentsList.append(createComment(comment)));
  shownElements = Math.min(comments.length, shownElements + COMMENTS_COUNTER);
  setloadCommentsButtonState();
  fillCommentCounter();
};

const loadCommentsButtonClickHandler = () => {
  createCommentsList();
};

const fillPictureInfo = (post) => {
  pictureImg.src = post.url;
  socialCaption.textContent = post.description;
  likesCount.textContent = post.likes;
};

const closeModal = () => {
  pictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  loadCommentsButton.removeEventListener('click', loadCommentsButtonClickHandler);
  shownElements = 0;
};

const pictureCloseButtonClickHandler = (event) => {
  event.preventDefault();
  closeModal();
};

const documentKeydownHandler = (event) => {
  event.preventDefault();
  if (event.keyCode === 27 && !event.target.closest('.social__footer-text')) {
    closeModal();
  }
};

const openModal = () => {
  pictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  loadCommentsButton.addEventListener('click', loadCommentsButtonClickHandler);
  pictureCloseButton.addEventListener('click', pictureCloseButtonClickHandler, {once: true});
  document.addEventListener('keydown', documentKeydownHandler, {once: true});
};

const renderBigPicture = (post) => {
  commentsList.innerHTML = '';
  openModal();
  comments = post.comments;
  fillPictureInfo(post);
  createCommentsList();
};

export { renderBigPicture };
