import { isEscapeKey, isEnterKey } from './utils.js';

const body = document.querySelector('body');
// находим шаблон id="success" и в нём контейнер success
const patternSuccess = document.querySelector('#success').content.querySelector('.success');
const patternFailed = document.querySelector('#error').content.querySelector('.error');


//**********************Удачная отправка формы************************* */

// Удаление окна по ESC
const onSuccessMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    body.removeChild(body.querySelector('.success'));

  }
};


// Удаление окна по click мышки
const onSuccessMessageClick = () => {
  body.removeChild(body.querySelector('.success'));

};

const closeOpenSuccessMessage = () => {
  document.addEventListener('keydown', onSuccessMessageEscKeydown, { once: true });
  document.addEventListener('click', onSuccessMessageClick, { once: true });

};

const getSuccessfulDownloadForm = () => {
  // клонирую patternSuccess со всем содержимым
  const ticetElement = patternSuccess.cloneNode(true);
  body.append(ticetElement);

  closeOpenSuccessMessage(); // добавил удаление по ESC и click мышки
};


//**********************Неудачная отправка формы************************* */

// Удаление окна по ESC
const onFailedMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    body.removeChild(body.querySelector('.error'));

  }
};


// Удаление окна по click мышки
const onFailedMessageClick = () => {
  body.removeChild(body.querySelector('.error'));

};

// Удаление окна по Enter
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
  // клонирую patternSuccess со всем содержимым
  const ticetElement = patternFailed.cloneNode(true);
  body.append(ticetElement);

  closeOpenFailedMessage(document.querySelector('.error__button')); // добавил удаление по ESC, click мышки; Enter(можно впринципе не добавлять, работает и так)
};


//**********************Общие вызовы************************* */

export {
  getSuccessfulDownloadForm, // удачная загрузка
  getFailedDownloadForm, // неудачная загрузка
};

