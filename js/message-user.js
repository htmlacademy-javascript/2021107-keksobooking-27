import { isEscapeKey, isEnterKey } from './utils.js';

const body = document.querySelector('body');
const patternSuccess = document.querySelector('#success').content.querySelector('.success');
const patternFailed = document.querySelector('#error').content.querySelector('.error');


const onSuccessMessageClick = () => {
  body.removeChild(body.querySelector('.success'));
};

const onSuccessMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    body.removeChild(body.querySelector('.success'));
    document.removeEventListener('click', onSuccessMessageClick);
  }
};

const removeEscKeydown = () => {
  document.removeEventListener('keydown', onSuccessMessageEscKeydown);
};

const closeOpenSuccessMessage = () => {
  const successfulMessage = document.querySelector('.success');
  document.addEventListener('keydown', onSuccessMessageEscKeydown, { once: true });
  successfulMessage.addEventListener('click', onSuccessMessageClick, { once: true });
  successfulMessage.addEventListener('click', removeEscKeydown, { once: true });
};

const getSuccessfulDownloadForm = () => {
  const ticetElement = patternSuccess.cloneNode(true);
  body.append(ticetElement);

  closeOpenSuccessMessage();
};


const onFailedMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    body.removeChild(body.querySelector('.error'));

  }
};


const onFailedMessageClick = () => {
  body.removeChild(body.querySelector('.error'));

};

const onFailedMessageEnterKeydown = (evt) => {
  if (isEnterKey(evt)) {
    evt.preventDefault();
    body.removeChild(body.querySelector('.error'));

  }
};

const closeOpenFailedMessage = (buttonErrorForm) => {
  document.addEventListener('keydown', onFailedMessageEscKeydown, { once: true });
  document.addEventListener('click', onFailedMessageClick, { once: true });
  buttonErrorForm.addEventListener('keydown', onFailedMessageEnterKeydown, { once: true });
};


const getFailedDownloadForm = () => {
  const ticetElement = patternFailed.cloneNode(true);
  body.append(ticetElement);

  closeOpenFailedMessage(document.querySelector('.error__button'));
};


export {
  getSuccessfulDownloadForm,
  getFailedDownloadForm,
};

