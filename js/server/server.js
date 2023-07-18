import { renderImages} from '../thumbnails/render-images.js';
import { createRenderErrorMessage, createUploadErrorMessage, createUploadSuccessMessage } from './messages.js';

const submitButton = document.querySelector('.img-upload__submit');

const renderImagesFromServer = () => {
  fetch('https://29.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((data) => renderImages(data))
    .catch(() => document.body.append(createRenderErrorMessage()));
};

const uploadImage = (data, closeForm) => {
  fetch('https://29.javascript.pages.academy/kekstagram', {
    method: 'POST',
    body: data,
  }).then ((response) => {
    if (response.ok) {
      submitButton.disabled = true;
      closeForm();
      document.body.append(createUploadSuccessMessage());
    } else {
      throw Error;
    }
  })
    .catch(() => document.body.append(createUploadErrorMessage()))
    .finally(() => {
      submitButton.disabled = false;
    });
};

export { renderImagesFromServer, uploadImage };
