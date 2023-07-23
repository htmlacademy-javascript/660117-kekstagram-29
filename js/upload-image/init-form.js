import { createFilters, setSliderState } from './init-filters.js';
import { addValidators, pristineValidate, pristineReset } from './init-validators.js';
import { initScaleControl, resetScale } from './init-scale.js';
import { sendData } from '../utils/api.js';
import { insertPhoto } from './insert-photo.js';
import { isEscKey } from '../utils/utils.js';

const SERVER_URL = 'https://29.javascript.pages.academy/kekstagram';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const inputChecked = document.querySelector('.img-upload__form input:checked');
const submitButton = document.querySelector('.img-upload__submit');

const setSubmitButton = (state) => {
  submitButton.disabled = state;
};

const closeForm = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgUploadForm.reset();
  resetScale();
  pristineReset();
};

const imgUploadCancelClickHandler = () => closeForm();

const documentKeydownHandler = (event) => {
  if (isEscKey(event) && !event.target.closest('.img-upload__field-wrapper')) {
    closeForm();
  }
};

const openForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  setSliderState(inputChecked.value);
};

const imgUploadInputChangeHandler = () => {
  document.body.addEventListener('keydown', documentKeydownHandler);
  openForm();
  insertPhoto();
};

const imgUploadFormSubmitHandler = (event) => {
  event.preventDefault();
  if (pristineValidate()) {
    setSubmitButton(true);
    document.body.removeEventListener('keydown', documentKeydownHandler);
    const formData = new FormData(event.target);
    sendData(SERVER_URL, formData, closeForm, setSubmitButton);
  }
};

const initForm = () => {
  addValidators();
  createFilters();
  initScaleControl();
  imgUploadForm.addEventListener('submit', imgUploadFormSubmitHandler);
  imgUploadInput.addEventListener('change', imgUploadInputChangeHandler);
  imgUploadCancel.addEventListener('click', imgUploadCancelClickHandler);
};

export {initForm, insertPhoto};

