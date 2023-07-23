import { getData } from '../utils/api.js';
import { renderThumbnails } from './render-thumbnails.js';
import { inItFilters, createNewData } from './init-filters.js';

const SERVER_URL = 'https://29.javascript.pages.academy/kekstagram/data';

const currentFilter = document.querySelector('.img-filters__button--active');

const renderThumbnailsFromServer = (data) => {
  renderThumbnails(createNewData(data, currentFilter));
  inItFilters(data);
};

const initThumbnails = () => {
  getData(SERVER_URL, renderThumbnailsFromServer);
};

export { initThumbnails };
