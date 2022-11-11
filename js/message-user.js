import { isEscapeKey } from './utils.js';

// находим шаблон id="success" и в нём контейнер success
const patternSuccess = document.querySelector('#success').content.querySelector('.success');
const body = document.querySelector('body');


// // const onMessageEscKeydown = (evt) => {
// //   if (isEscapeKey(evt)) {
// //     evt.preventDefault();
// //     // closeOpenMessage();
// //     console.log('1111111111');
// //   }
// // };
// // document.addEventListener('keydown', onMessageEscKeydown, {once:true});

const onMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    // closeOpenMessage();
    console.log('1111111111');
    body.removeChild(body.querySelector('.success'));

  }
};
document.addEventListener('keydown', onMessageEscKeydown,);


// function closeOpenMessage() {
//   document.addEventListener('keydown', onMessageEscKeydown, { once: true });
//   // body.querySelector('.success').remove();
// }


// // let modal = document.querySelector('.success');
// // console.log(modal);


//
const getSuccessfulDownloadForm = () => {
  // клонирую patternSuccess со всем содержимым
  const ticetElement = patternSuccess.cloneNode(true);

  body.append(ticetElement);
};

export {
  getSuccessfulDownloadForm, // удачная загрузка
};

