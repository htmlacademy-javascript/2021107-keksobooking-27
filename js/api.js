const Urls = {
  GET: 'https://27.javascript.pages.academy/keksobooking/data', // AJAX-запрос на получение данных
  POST: 'https://27.javascript.pages.academy/keksobooking', // fetch для отправки данных
};

const makeRequest = (onSuccess, onFail, method, readyData) => {
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

export { makeRequest };
