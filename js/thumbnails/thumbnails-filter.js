const RANDOM_COUNTER = 10;
const TIME_OUT = 500;

import { shuffleArray, debounce } from '../utils/utils.js';

const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');
const pictureContainer = document.querySelector('.pictures');

let defaultThumbnails;

const removeActiveClass = () => {
  const active = document.querySelector('.img-filters__button--active');
  active.classList.remove('img-filters__button--active');
};

const addActiveClass = (button) => {
  button.classList.add('img-filters__button--active');
};

const removeThumbnails = () => {
  const thumbnails = document.querySelectorAll('.picture');
  thumbnails.forEach((picture) => picture.remove());
};

const renderRandomThumbnails = () => {
  removeThumbnails();
  const newThumbnails = Array.from(defaultThumbnails);
  shuffleArray(newThumbnails).slice(0, RANDOM_COUNTER).forEach((thumbnail) => pictureContainer.append(thumbnail));
};

const pullCommentCounter = (element) => Number(element.querySelector('.picture__comments').textContent);

const sortArray = (a, b) => pullCommentCounter(b) - pullCommentCounter(a);

const renderDiscussedThumbnails = () => {
  removeThumbnails();
  const newThumbnails = Array.from(defaultThumbnails);
  newThumbnails.sort(sortArray).forEach((thumbnail) => pictureContainer.append(thumbnail));
};

const renderDefaultThumbnails = () => {
  console.log(1);
  removeThumbnails();
  defaultThumbnails.forEach((thumbnail) => pictureContainer.append(thumbnail));
};

const filterDiscussedClickHandler = ({target}) => {
  removeActiveClass();
  addActiveClass(target);
  renderDiscussedThumbnails();
};

const filterRandomClickHandler = ({target}) => {
  removeActiveClass();
  addActiveClass(target);
  renderRandomThumbnails();
};

const filterDefaultClickHandler = ({target}) => {
  removeActiveClass();
  addActiveClass(target);
  renderDefaultThumbnails();
};

const inItFilters = () => {
  defaultThumbnails = document.querySelectorAll('.picture');
  filterDefault.addEventListener('click', debounce(filterDefaultClickHandler, TIME_OUT));
  filterRandom.addEventListener('click', debounce(filterRandomClickHandler, TIME_OUT));
  filterDiscussed.addEventListener('click', debounce(filterDiscussedClickHandler, TIME_OUT));
};

export {inItFilters};
