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

const sendData = (onSuccess, onFail, readyData) => { // (сбрасываем форму, сбрасываем пин, хорошее сообщение, плохое сообщение, данные собранные с форм)
  // fetch для отправки данных
  fetch(
    'https://27.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: readyData,
    },)
    .then((response) => {
      if (response.ok) {
        onSuccess(); // в форме при успешной отправке, первый then у fetch, вызвать переданный колбэк
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};


export { getData, sendData };

//********************************************************************************* */
console.log(11111111111);

const Urls = {
  GET: 'https://27.javascript.pages.academy/keksobooking/data',
  POST: 'https://27.javascript.pages.academy/keksobooking',
};

const request = (onSuccess, onFail, method, readyData) => {
  fetch(
    Urls[method],
    {
      method: method,
      body: readyData,
    },
  )
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onFail();
    });
};

export { request };
