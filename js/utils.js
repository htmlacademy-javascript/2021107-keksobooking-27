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

// получить десятичные разряды числа с плавающей запятой в Javascript
// toString последние 0 удаляет, в нашем случае не подходит
// const getPrecision = (value) => {
//   const firstVariable = value.toString();
//   const secondVariable = firstVariable.split('.');
//   return secondVariable[1].length;
// };


export {
  getRandomArbitrary,  // возвращающает случайное целое число из переданного диапазона включительно
  getRandomArbitraryFloat,  // возвращающая случайное число с плавающей точкой из переданного диапазона включительно
  getPrecision  // количество знаков после запятой

};
