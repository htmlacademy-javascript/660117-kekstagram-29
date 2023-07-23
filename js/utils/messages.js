import { isEscKey } from './utils.js';

const ERROR_RENDER_MESSAGE = 'Что-то пошло не так =( Попробуйте перезагрузить страницу.';
const ERROR_RENDER_MESSAGE_TIMEOUT = 4000;

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const closeMessage = () => {
  const message = document.querySelector('.success') || document.querySelector('.error');
  message.remove();
  document.body.removeEventListener('click', messageClickHandler);
  document.body.removeEventListener('keydown', messageKeydownHandler);
};

function messageClickHandler (event) {
  if(!event.target.closest('.success__inner') || event.target.closest('.success__button')){
    closeMessage();
    return;
  }
  if(!event.target.closest('.error__inner') || event.target.closest('.error__button')){
    closeMessage();
  }
}

function messageKeydownHandler (event) {
  if(isEscKey(event)) {
    closeMessage();
  }
}

const createUploadSuccessMessage = () => {
  const message = successMessageTemplate.cloneNode(true);
  document.body.addEventListener('click', messageClickHandler);
  document.body.addEventListener('keydown', messageKeydownHandler);
  return message;
};

const createUploadErrorMessage = () => {
  const message = errorMessageTemplate.cloneNode(true);
  document.body.addEventListener('click', messageClickHandler);
  document.body.addEventListener('keydown', messageKeydownHandler);
  return message;
};

const showErrorMessage = () => {
  const message = document.createElement('div');
  message.classList.add('error-upload-message');
  message.textContent = ERROR_RENDER_MESSAGE;
  document.body.append(message);
  setTimeout(() => document.querySelector('.error-upload-message').remove(), ERROR_RENDER_MESSAGE_TIMEOUT);
};

export { showErrorMessage, createUploadErrorMessage, createUploadSuccessMessage };
