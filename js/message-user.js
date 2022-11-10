import { isEscapeKey } from './utils.js';

// находим шаблон id="success" и в нём контейнер success
const patternSuccess = document.querySelector('#success').content.querySelector('.success');
const body = document.querySelector('body');

const onMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    // evt.preventDefault();
    closeOpenMessage();
    // console.log('1111111111');
  }
};

function closeOpenMessage () {
  body.removeChild('div.success');
  document.addEventListener('keydown', onMessageEscKeydown, {once:true});
}

const getSuccessfulDownloadForm = () => {
  // клонирую patternSuccess со всем содержимым
  const ticetElement = patternSuccess.cloneNode(true);

  body.append(ticetElement);
  return body;
};

export {
  getSuccessfulDownloadForm, // удачная загрузка
};
