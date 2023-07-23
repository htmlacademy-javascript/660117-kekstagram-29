const RANDOM_COUNTER = 10;
const TIME_OUT = 500;

import { shuffleArray, debounce } from '../utils/utils.js';
import { renderThumbnails } from './render-thumbnails.js';

const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');
const imgFilter = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');

const createNewData = (data, target) => {
  if (target === filterDefault) {
    return data;
  }
  if (target === filterDiscussed) {
    const newThumbnails = Array.from(data);
    newThumbnails.sort((a, b) => b.comments.length - a.comments.length);
    return newThumbnails;
  }
  if (target === filterRandom) {
    const newThumbnails = Array.from(data);
    shuffleArray(newThumbnails);
    return newThumbnails.slice(0, RANDOM_COUNTER);
  }
};

const changeThumbnails = debounce((data, target) => {
  document.querySelectorAll('.picture')
    .forEach((picture) => picture.remove());
  renderThumbnails(createNewData(data, target));
}, TIME_OUT);

const inItFilters = (data) => {
  imgFilter.classList.remove('img-filters--inactive');
  filterForm.addEventListener('click', ({target}) => {
    const active = document.querySelector('.img-filters__button--active');
    if (target !== active && target.closest('.img-filters__button')) {
      active.classList.remove('img-filters__button--active');
      target.classList.add('img-filters__button--active');
      changeThumbnails(data, target);
    }
  });
};

export { inItFilters, createNewData };
