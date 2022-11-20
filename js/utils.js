const ALERT_SHOW_TIME = 5000;

// Функция выбирает прваильное склонени существительного после чмслительного
const numDecline = (num, nominative, genitiveSingular, genitivePlural) => {
  if (num > 10 && (Math.round((num % 100) / 10)) === 1) {
    return genitivePlural;
  }
  switch (num % 10) {
    case 1: return nominative;
    case 2:
    case 3:
    case 4: return genitiveSingular;
  }
  return genitivePlural;
};

// Сообщение об ошибке
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const isEscapeKey = (evt) => evt.key === 'Escape'; // нажатие Escape
const isEnterKey = (evt) => evt.key === 'Enter'; // // нажатие Enter


// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example
const debounce = (callback, timeoutDelay = 500) => {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
};


export {
  numDecline, // прваильное склонени существительного после чмслительного
  showAlert, // Сообщение об ошибке
  isEscapeKey,
  isEnterKey,
  debounce, // Задержка на частое выполнение функции
};
