import { getData } from '../server/server.js';
import { renderThumbnails } from './render-thumbnails.js';
import { inItFilters } from '../thumbnails/thumbnails-filter.js';

const SERVER_URL = 'https://29.javascript.pages.academy/kekstagram/data';

const renderThumbnailsFromServer = (data) => {
  renderThumbnails(data);
  inItFilters(data);
};

const renderImages = () => {
  getData(SERVER_URL, renderThumbnailsFromServer);
};

export { renderImages };
