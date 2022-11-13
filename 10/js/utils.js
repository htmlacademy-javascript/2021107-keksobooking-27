const ALERT_SHOW_TIME = 5000;

// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random#получение_случайного_числа_в_заданном_интервале
const getRandomArbitrary = (min, max) => {
  // проверка на правильность исходных данных
  if (min < 0 || max < 0) { return NaN; }
  else if (min >= max) { [min, max] = [max, min]; }

  // округленное до ближайшего целого числа
  const result = Math.round(Math.random() * (max - min) + min);
  return result;
};


// Функция, возвращающая случайное число с плавающей точкой
// floatDigits = 1 - значение по умолчанию
const getRandomArbitraryFloat = (min, max, floatDigits = 1) => {
  // проверка на правильность исходных данных
  if (min < 0 || max < 0 || floatDigits < 0) { return NaN; }
  else if (min >= max) { [min, max] = [max, min]; }

  // .toFixed() обрезает знаки после запятой и возращает СТРОКУ!!!
  // Если нужно привести нечисловое значение к числовому типу, можно воспользоваться этой особенностью и применить к нему унарный оператор "+"
  const result = Math.random() * (max - min) + min;
  return +result.toFixed(floatDigits);
};

// Функция выбора случайного элемента из массива
const getRandomArrayElement = (array) => array[getRandomArbitrary(0, array.length - 1)];

// Функция выбирает прваильное склонени существительного после чмслительного
const numDecline = (num, nominative, genitiveSingular, genitivePlural) => {
  if(num > 10 && (Math.round((num % 100) / 10)) === 1) {
    return genitivePlural;
  }
  switch(num % 10){
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

export {
  getRandomArbitrary,// возвращающает случайное целое число из переданного диапазона включительно
  getRandomArbitraryFloat, // возвращающая случайное число с плавающей точкой из переданного диапазона включительно
  getRandomArrayElement, // Функция выбора случайного элемента из массива
  numDecline, // прваильное склонени существительного после чмслительного
  showAlert, // Сообщение об ошибке
  isEscapeKey,
  isEnterKey,
};
