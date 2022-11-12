import { isEscapeKey } from './utils.js';

// находим шаблон id="success" и в нём контейнер success
const patternSuccess = document.querySelector('#success').content.querySelector('.success');
const body = document.querySelector('body');


//**********************Удачная отправка формы************************* */


// Удаление окна по ESC
const onMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    console.log('111111111111111111111111111111');
    body.removeChild(body.querySelector('.success'));

  }
};


// Удаление окна по click мышки
const onMessageClick = () => {
  console.log('222222222222222222222222222222');
  body.removeChild(body.querySelector('.success'));
};

const closeOpenMessage = () => {
  document.addEventListener('keydown', onMessageEscKeydown, { once: true });
  document.addEventListener('click', onMessageClick, { once: true });

};


const getSuccessfulDownloadForm = () => {
  // клонирую patternSuccess со всем содержимым
  const ticetElement = patternSuccess.cloneNode(true);
  body.append(ticetElement);

  closeOpenMessage(); // добавил удаление по ESC и click мышки
};


//**********************Неудачная отправка формы************************* */


//**********************Общие вызовы************************* */

export {
  getSuccessfulDownloadForm, // удачная загрузка
};

