import { getRandomArbitrary, getRandomArbitraryFloat, getRandomArrayElement } from './utils.js';

const START_ELEMNT = 1;
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
const descriptions = ['Большое опмещение', 'Красивое помещение', 'Уютоне помещение', 'классное помещение', 'Дешёвое помещение'];
const listPhotos = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
                    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
                    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];


// описывает автора
const getAuthorCreating = () => ({
  avatar: `img/avatars/user${getRandomArbitrary(START_ELEMNT, FINISH_ELEMNT).toString().padStart(2, 0)}.png`,
});

// местоположение в виде географических координат
const getLocationCreating = () => ({
  lat: getRandomArbitraryFloat(locations.MINIMAL_LATITUDE, locations.MAXIMUM_LATITUDE, locations.DECIMAL_PLACE),
  lng: getRandomArbitraryFloat(locations.MINIMAL_LONGITUDE, locations.MAXIMUM_LONGITUDE, locations.DECIMAL_PLACE),
});

// объект — содержит информацию об объявлении
const getInformationMessage = () => ({
  title: getRandomArrayElement(titles),
  address: `${getLocationCreating.lat}, ${getLocationCreating.lng}`,
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
  photos: Array.from({length: getRandomArbitrary(0, 10)}, () => getRandomArrayElement(listPhotos)),
})

// Итоговый элемент со всеми значениями
const createTicket = () => ({
  author: getAuthorCreating(),
  offer: getInformationMessage(),
  location: getLocationCreating(),
});

// Генерация нужного количества элементов
const createTicets = () =>
  Array.from({ length: FINISH_ELEMNT},);


// const sozdanieMassiva = () => {
//   //описывает автора
//   const avatar = `img/avatars/user${getRandomArbitrary(START_ELEMNT, FINISH_ELEMNT)}.png`;

//   // местоположение в виде географических координат
//   const opredelenieCoordinat = (location) => {
//     const lat = getRandomArbitraryFloat(locations.MINIMAL_LATS, locations.MAXIMUM_LATS, DECIMAL_PLACE);
//     const lng = getRandomArbitraryFloat(locations.MINIMAL_LNGS, locations.MAXIMUM_LNGS, DECIMAL_PLACE);
//     return locations1.push(lat, lng);
//   }


//   return {
//     author: avatar,
//     offer: '',
//     location: locations1,
//   };
// };

// console.log(sozdanieMassiva());
