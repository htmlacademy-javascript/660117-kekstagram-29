import { createFilters } from './upload-image-filters.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const hashtagRegEx = /^#[a-zа-яё0-9]{1,19}$/i;
let pristine;

const compareHashtagsValue = (value) => {
  const hashtags = value.trimEnd().split(' ');
  for (let i = 0; i < hashtags.length; i++) {
    let hashtagValue = hashtags[i];
    for (let j = i + 1; j <= hashtags.length; j++) {
      return (hashtagValue === hashtags[j]) ? false : true;
    }
  }
}

const validateDescription = (value) => (value.length <= 140) ? true : false;

const validateHashtags = (value) => {
  const hashtags = value.trimEnd().split(' ');
  let mark = true;
  hashtags.forEach((hashtag) => {
    if(hashtagRegEx.test(hashtag) === false){
      mark = false;
    }
  });
  return mark;
}

const countHashtags = (value) => {
  const hashtags = value.trimEnd().split(' ');
  return (hashtags.length > 5) ? false : true;
}

const addValidators = () => {
  pristine.addValidator(textDescription, validateDescription, 'Не более 140 символов');
  pristine.addValidator(textHashtags, countHashtags, 'Можно указать не больше пяти хэш-тегов');
  pristine.addValidator(textHashtags, validateHashtags, 'Хэш-тег должен начинается с символа # и не может содержать спецсимволы. Максимальная длина одного хэш-тега 20 символов, включая решётку.');
  pristine.addValidator(textHashtags, compareHashtagsValue, 'Хеш-теги не должны повторяться');
}

const addPristine = () => {
  pristine = new Pristine(imgUploadForm, {
    classTo: 'img-upload__text',
    errorTextParent: 'img-upload__text',
    errorTextTag: 'span',
    errorTextClass: 'error-text'
  });
  addValidators();
}

const openForm = () => {
  addPristine();
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  imgUploadCancel.addEventListener('click', imgUploadCancelClickHandler), {once: true};
  document.body.addEventListener('keydown', documentKeydownHandler), {once: true};
  imgUploadForm.addEventListener('submit', (event) => {
    event.preventDefault();
    pristine.validate();
  })
}

const closeForm = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  textHashtags.textContent = '';
  textDescription.textContent = '';
  imgUploadInput.value = '';
  document.querySelector('.error-text').remove();
}

const imgUploadInputChangeHandler = () => {
  openForm();
  createFilters();
}

function imgUploadCancelClickHandler() {
  closeForm();
}

function documentKeydownHandler(event) {
  if (event.keyCode === 27 && !event.target.closest('.img-upload__field-wrapper')) {
    closeForm();
  }
}

imgUploadInput.addEventListener('change', imgUploadInputChangeHandler);
