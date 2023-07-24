import { showMessage } from './messages.js';

const ERROR_TYPE = 'error';
const ERROR_MESSAGE_TEXT = 'Ошибка загрузки файла';
const ERROR_BUTTON_TEXT = 'Попробовать ещё раз';
const SUCCESS_TYPE = 'success';
const SUCCESS_MESSAGE_TEXT = 'Изображение успешно загружено';
const SUCCESS_BUTTON_TEXT = 'Круто!';
const ERROR_RENDER_TEXT = 'Что-то пошло не так =(';
const ERROR_RENDER_TIMEOUT = 4000;

const getData = (url, onSuccess) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch(() => {
      showMessage(ERROR_TYPE, ERROR_RENDER_TEXT);
      setTimeout(() => document.querySelector('.error').remove(), ERROR_RENDER_TIMEOUT);
    });
};

const sendData = (url, data, onSuccess, setSubmitButtonState) => {
  fetch(url, {
    method: 'POST',
    body: data,
  }).then ((response) => {
    if (response.ok) {
      onSuccess();
      showMessage(SUCCESS_TYPE, SUCCESS_MESSAGE_TEXT, SUCCESS_BUTTON_TEXT);
    } else {
      throw Error;
    }
  })
    .catch(() => showMessage(ERROR_TYPE, ERROR_MESSAGE_TEXT, ERROR_BUTTON_TEXT))
    .finally(() => setSubmitButtonState(false));
};

export { getData, sendData };
