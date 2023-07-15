import { createFilters, setSliderState } from './upload-image-filters.js';
import { addValidators, pristineValidate, pristineReset } from './validators.js';
import { initScaleControl, resetScale } from './upload-image-scale.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const inputChecked = document.querySelector('.img-upload__form input:checked');

const closeForm = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgUploadForm.reset();
  resetScale();
  pristineReset();
};

const imgUploadCancelClickHandler = () => closeForm();

const documentKeydownHandler = (event) => {
  if (event.keyCode === 27 && !event.target.closest('.img-upload__field-wrapper')) {
    closeForm();
  }
};

const openForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  setSliderState(inputChecked.value);
};

const imgUploadInputChangeHandler = () => {
  openForm();
};

const imgUploadFormSubmitHandler = (event) => {
  if (!pristineValidate()){
    event.preventDefault();
  }
};

const initFormState = () => {
  addValidators();
  createFilters();
  initScaleControl();
  imgUploadForm.addEventListener('submit', imgUploadFormSubmitHandler);
  imgUploadInput.addEventListener('change', imgUploadInputChangeHandler);
  imgUploadCancel.addEventListener('click', imgUploadCancelClickHandler);
  document.body.addEventListener('keydown', documentKeydownHandler);
};

export {initFormState};

