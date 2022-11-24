import { isEscapeKey, isEnterKey } from './utils.js';

const body = document.querySelector('body');
const patternSuccess = document.querySelector('#success').content.querySelector('.success');
const patternFailed = document.querySelector('#error').content.querySelector('.error');


const onMessageClick = () => {
  let htmlClass;
  if (document.querySelector('.error')) {
    htmlClass = '.error';
  } else {
    htmlClass = '.success';
  }
  body.removeChild(body.querySelector(htmlClass));
};

const onMessageEscKeydown = (evt) => {
  let htmlClass;

  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.querySelector('.error')) {
      htmlClass = '.error';
    } else {
      htmlClass = '.success';
    }
    body.removeChild(body.querySelector(htmlClass));
  }
};

const onFailedMessageEnterKeydown = (evt) => {
  if (isEnterKey(evt)) {
    evt.preventDefault();
    body.removeChild(body.querySelector('.error'));

  }
};


const removeEscKeydown = () => {
  document.removeEventListener('keydown', onMessageEscKeydown);
};

const closeOpenMessage = (message) => {
  document.addEventListener('keydown', onMessageEscKeydown, { once: true });
  message.addEventListener('click', onMessageClick, { once: true });
  message.addEventListener('click', removeEscKeydown, { once: true });


  if (message === document.querySelector('.error')) {
    const messageWindow = document.querySelector('.error__button');
    messageWindow.addEventListener('keydown', onFailedMessageEnterKeydown, { once: true });
  }

};

const getSuccessfulDownloadForm = () => {
  const ticetElement = patternSuccess.cloneNode(true);
  body.append(ticetElement);

  closeOpenMessage(document.querySelector('.success'));
};


const getFailedDownloadForm = () => {
  const ticetElement = patternFailed.cloneNode(true);
  body.append(ticetElement);

  closeOpenMessage(document.querySelector('.error'));
};


export {
  getSuccessfulDownloadForm,
  getFailedDownloadForm,
};


