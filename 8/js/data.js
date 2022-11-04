import { getRandomArbitrary, getRandomArbitraryFloat, getRandomArrayElement } from './utils.js';

const FINISH_ELEMNT = 10;
const RANDOM_NUMBER = 99;

const locations = {
  MINIMAL_LATITUDE: 35.65000,
  MAXIMUM_LATITUDE: 35.70000,
  MINIMAL_LONGITUDE: 139.70000,
  MAXIMUM_LONGITUDE: 139.80000,
  DECIMAL_PLACE: 5
};

const titles = ['Квартира на час', 'Квартира на неделю', 'Квартира на месяц', 'Квартира на год', 'Домик на час', 'Домик на день', 'Домик на неделю', 'Домик на месяц'];
const types = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const checkins = ['12:00', '13:00', '14:00'];
const checkouts = ['12:00', '13:00', '14:00'];
const listFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const descriptions = ['Большое помещение', 'Красивое помещение', 'Уютоне помещение', 'классное помещение', 'Дешёвое помещение'];
const listPhotos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];


// описывает автора
const getAuthorCreating = (index) => ({
  avatar: `img/avatars/user${index.toString().padStart(2, 0)}.png`,
});


// местоположение в виде географических координат
// При закоментированной реализации координаты всёравно не совпадают в getLocationCreating и getInformationMessage -> address
const getLocationCreating = () => ({
  lat: getRandomArbitraryFloat(locations.MINIMAL_LATITUDE, locations.MAXIMUM_LATITUDE, locations.DECIMAL_PLACE),
  lng: getRandomArbitraryFloat(locations.MINIMAL_LONGITUDE, locations.MAXIMUM_LONGITUDE, locations.DECIMAL_PLACE),
});

// объект — содержит информацию об объявлении
const getInformationMessage = () => ({
  title: getRandomArrayElement(titles),
  address: `${getLocationCreating().lat}, ${getLocationCreating().lng}`,
  price: getRandomArbitrary(1, RANDOM_NUMBER),
  type: getRandomArrayElement(types),
  rooms: getRandomArbitrary(1, RANDOM_NUMBER),
  guests: getRandomArbitrary(1, RANDOM_NUMBER),
  checkin: getRandomArrayElement(checkins),
  checkout: getRandomArrayElement(checkouts),
  // .slice(0, ххх) - создаёт масссив из listFeatures; 0 - начальный эл-т, ххх - конечный эл-т (не включая его)
  features: listFeatures.slice(0, getRandomArbitrary(0, listFeatures.length)),
  description: getRandomArrayElement(descriptions),
  // {length: getRandomArbitrary(0, 10)} - длинна массива (количество элемнтов в массиве)
  // () => getRandomArrayElement(listPhotos) - подставляем каждый раз случайный элемент из массива listPhotos
  photos: Array.from({ length: getRandomArbitrary(0, 10) }, () => getRandomArrayElement(listPhotos)),
});

// Итоговый элемент со всеми значениями
const createTicket = (index) => ({
  author: getAuthorCreating(index),
  offer: getInformationMessage(),
  location: getLocationCreating(),
});

// Генерация нужного количества элементов
const getTicets = () =>
  // _ - нижнее подчёркивание показывает что мы не используем элемент
  Array.from({ length: FINISH_ELEMNT }, (_, ticetsIndex) => createTicket(ticetsIndex + 1));

export {
  getTicets,// функции для создания массива из 10 сгенерированных JS-объектов
};

