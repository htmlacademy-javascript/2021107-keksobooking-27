// AJAX-запрос на получение данных
const getData = (onSuccess, card, quantity, message, textMessage) => { // (создание пинов, форма для карточки пинов, количество пинов, сообщени об шибке)
  fetch('https://27.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json()) //  объект ответа Response;  превратить ответ в понятный нам вид, нужно вызвать метод json
    .then((rooms) => {
      onSuccess(rooms.slice(0, quantity), card); // полученные данные
    })
    .catch(() => {
      message(textMessage); // Ошибка при загрузке
    });
};

const sendData = (resetForm, callback, onSuccess, onFail, readyData) => { // (сбрасываем форму, сбрасываем пин, хорошее сообщение, плохое сообщение, данные собранные с форм)
  // fetch для отправки данных
  fetch(
    'https://27.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: readyData,
    },)
    .then((response) => {
      if (response.ok) {
        resetForm(); // в форме при успешной отправке, первый then у fetch, вызвать переданный колбэк
        callback(); // нужно для reset пина
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export { getData, sendData };


// const sendData = (onSuccess, onFail, readyData) => { // (сбрасываем форму, сбрасываем пин, хорошее сообщение, плохое сообщение, данные собранные с форм)
//   // fetch для отправки данных
//   fetch(
//     'https://27.javascript.pages.academy/keksobooking',
//     {
//       method: 'POST',
//       body: readyData,
//     },)
//     .then((response) => {
//       if (response.ok) {
//         onSuccess();
//       } else {
//         onFail();
//       }
//     })
//     .catch(() => {
//       onFail();
//     });
// };
