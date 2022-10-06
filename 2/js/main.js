// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random#получение_случайного_числа_в_заданном_интервале
function getRandomArbitrary(min, max) {

  // проверка на правильность исходных данных
  if (min < 0 || max < 0 || typeof min === !Number || typeof max === !Number) { return NaN; }
  else if (min >= max) { return 'Минимальное число (min) больше максимального (max)!!!'; }

  // округленное до ближайшего целого числа
  return Math.round(Math.random() * (max - min) + min);
}


// Функция, возвращающая случайное число с плавающей точкой


// floatDigits = 1 - значение по умолчанию
function getRandomArbitraryFloat(min, max, floatDigits = 1) {

  // проверка на правильность исходных данных
  if (min < 0 || max < 0 || floatDigits < 0 || typeof min === !Number || typeof max === !Number || typeof floatDigits === !Number) { return NaN; }
  else if (min >= max) { return 'Минимальное число (min) больше максимального (max)!!!'; }
  // else if (typeof floatDigits === !Number) { return 'Некорректный тип данных в функции-getRandomArbitraryFloat аргумент-floatDigits'; }

  // .toFixed() обрезает знаки после запятой и возращает СТРОКУ!!!
  // Если нужно привести нечисловое значение к числовому типу, можно воспользоваться этой особенностью и применить к нему унарный оператор "+"
  return +((Math.random() * (max - min) + min).toFixed(floatDigits));
}

// Чтобы ESLint не ругался на неиспользуемые функции, временно вызовите их по одному разу после объявления.
getRandomArbitrary(0, 7);
getRandomArbitraryFloat(0, 7, 4);


// 1) Функция, возвращающая случайное целое число из переданного диапазона включительно

// function getRandomArbitrary(min, max) {
//   return Math.random() * (max - min) + min;
// }

// 2) функции могут быть только положительные числа и ноль.Если функции пришли неправильные аргументы, она должна вернуть NaN

// if (min < 0 || max < 0 || typeof min === !Number || typeof max === !Number) { return NaN }

// // проверка на число не работает

// 3) передать значение «до» меньшее, чем значение «от», или равное ему

// if (min >= max) { return 'Минимальное число (min) больше максимального (max)!!!' }

// 4) округленное до ближайшего целого числа

// Math.round()

// 5) Функция, возвращающая случайное число с плавающей точкой

// Как отформатировать число с плавающей запятой в javascript? - https://stackoverflow.com/questions/661562/how-to-format-a-float-in-javascript
// использование toFixed

// (Math.random() * (max - min) + min).toFixed(floatDigits)

// 6) Если нужно привести нечисловое значение к числовому типу, можно воспользоваться этой особенностью и применить к нему унарный оператор +

// +((Math.random() * (max - min) + min).toFixed(floatDigits))
