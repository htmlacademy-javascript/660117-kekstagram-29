import { createFilters, resetScale } from './upload-image-filters.js';
import { addValidators, pristineValidate, pristineReset } from './validators.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');


const closeForm = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgUploadForm.reset();
  resetScale();
  pristineReset();
}

const imgUploadCancelClickHandler = () => closeForm();

const documentKeydownHandler = (event) => {
  if (event.keyCode === 27 && !event.target.closest('.img-upload__field-wrapper')) {
    closeForm();
  }
}

const openForm = () => {
  addValidators();
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  imgUploadCancel.addEventListener('click', imgUploadCancelClickHandler), {once: true};
  document.body.addEventListener('keydown', documentKeydownHandler), {once: true};
  imgUploadForm.addEventListener('submit', (event) => {
    if (!pristineValidate()){
      event.preventDefault();
    }
  })
}

const imgUploadInputChangeHandler = () => {
  openForm();
  createFilters();
}

const setFormState = () => {
  imgUploadInput.addEventListener('change', imgUploadInputChangeHandler);
}

export {setFormState};

