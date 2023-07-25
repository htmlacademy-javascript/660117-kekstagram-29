import { isEscKey } from './utils.js';

let message;
let isOpen;

const createTemplate = (type, messageText, buttonText) => (
  `<section class="${type}">
    <div class="${type}__inner">
      <h2 class="${type}__title">${messageText}</h2>
      ${buttonText ? `<button type="button" class="${type}__button">${buttonText}</button>` : ''}
    </div>
  </section>`
);

const createMessage = (template) => {
  message = document.createElement('div');
  message.innerHTML = template;
  return message.firstChild;
};

const closeMessage = () => {
  message.remove();
  document.body.removeEventListener('keydown', documentKeydownHandler);
  if (!isOpen) {
    document.body.classList.remove('modal-open');
  }
};

function documentKeydownHandler(event) {
  if(isEscKey(event)) {
    closeMessage();
  }
}

const showMessage = (type, messageText, buttonText) => {
  isOpen = false;
  message = createMessage(createTemplate(type, messageText, buttonText));
  message.addEventListener('click', ({target}) => {
    if (target.closest(`.${type}__button`) || !target.closest(`.${type}__inner`)) {
      closeMessage();
    }
  });
  document.body.append(message);
  document.body.addEventListener('keydown', documentKeydownHandler);
  if (!document.body.classList.contains('modal-open')) {
    document.body.classList.add('modal-open');
    return;
  }
  isOpen = true;
};

export { showMessage };
