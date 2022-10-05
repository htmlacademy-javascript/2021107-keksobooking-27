// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random#получение_случайного_числа_в_заданном_интервале
function getRandomArbitrary(min, max) {
  if (min < 0 || max < 0) {return NaN}
    return Math.random() * (max - min) + min;
  }
