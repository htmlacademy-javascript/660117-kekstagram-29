const HASHTAG_REG = /^#[a-zа-яё0-9]{1,19}$/i;
const DESCRIPTION_MAX_LENGTH = 140;
const HASHTAG_MAX_COUNTER = 5;
const DESCRIPTION_ERROR_MESSAGE = 'Не более 140 символов';
const VALIDATE_HASHTAGS_MESSAGE = 'Хэш-тег должен начинается с символа # и не может содержать спецсимволы. Максимальная длина хэш-тега 20 символов, включая решётку.';
const COUNT_HASHTAGS_MESSAGE = 'Можно указать не больше пяти хэш-тегов';
const COMPARE_HASHTAGS_VALUE = 'Хеш-теги не должны повторяться';


const imgUploadForm = document.querySelector('.img-upload__form');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'error-text'
});

const createHashtags = (value) => value.trimEnd().split(' ');

const compareHashtagsValue = (value) => {
  const hashtags = createHashtags(value);
  const setHashtags = new Set(hashtags);
  return setHashtags.size === hashtags.length;
}

const validateDescription = (value) => value.length <= DESCRIPTION_MAX_LENGTH;

const validateHashtags = (value) => {
  if (value) {
    const hashtags = createHashtags(value);
    return hashtags.every(hashtag => HASHTAG_REG.test(hashtag) === true);
  }
  return true;
}

const countHashtags = (value) => {
  const hashtags = createHashtags(value);
  return hashtags.length < HASHTAG_MAX_COUNTER;
}

const addValidators = () => {
  pristine.addValidator(textDescription, validateDescription, DESCRIPTION_ERROR_MESSAGE, 1, true);
  pristine.addValidator(textHashtags, countHashtags, COUNT_HASHTAGS_MESSAGE, 1, true);
  pristine.addValidator(textHashtags, validateHashtags, VALIDATE_HASHTAGS_MESSAGE, 1, true);
  pristine.addValidator(textHashtags, compareHashtagsValue, COMPARE_HASHTAGS_VALUE, 1, true);
}

const pristineValidate = () => pristine.validate();

const pristineReset = () => pristine.reset();

export {addValidators, pristineValidate, pristineReset};
