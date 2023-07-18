const ERROR_RENDER_MESSAGE = 'Что-то пошло не так =( Попробуйте перезагрузить страницу.';
const ERROR_RENDER_MESSAGE_STYLE = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  height: '40px',
  paddingTop: '10px',
  width: '100%',
  textAlign: 'center',
  backgroundColor: 'red',
};

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
};

function messageKeydownHandler (event) {
  if(event.keyCode === 27) {
    closeMessage();
  }
};

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

const fillRenderErrorMessage = (message) => {
  const {position, bottom, left, height, paddingTop, width, textAlign, backgroundColor} = ERROR_RENDER_MESSAGE_STYLE;
  message.textContent = ERROR_RENDER_MESSAGE;
  message.style.position = position;
  message.style.bottom = bottom;
  message.style.left = left;
  message.style.height = height;
  message.style.paddingTop = paddingTop;
  message.style.width = width;
  message.style.textAlign = textAlign;
  message.style.backgroundColor = backgroundColor;
};

const createRenderErrorMessage = () => {
  const message = document.createElement('div');
  fillRenderErrorMessage(message);
  return message;
};

export { createRenderErrorMessage, createUploadErrorMessage, createUploadSuccessMessage };
