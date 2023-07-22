import { createRenderErrorMessage, createUploadErrorMessage, createUploadSuccessMessage } from './messages.js';

const getData = (url, onSuccess, showFilter) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .then(() => showFilter())
    .catch(() => document.body.append(createRenderErrorMessage()));
};

const sendData = (url, data, onSuccess, setSubmitButton) => {
  fetch(url, {
    method: 'POST',
    body: data,
  }).then ((response) => {
    if (response.ok) {
      onSuccess();
      document.body.append(createUploadSuccessMessage());
    } else {
      throw Error;
    }
  })
    .catch(() => document.body.append(createUploadErrorMessage()))
    .finally(() => setSubmitButton(false));
};

export { getData, sendData };
