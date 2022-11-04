import { numDecline } from './utils.js';

const WORDS = ['комната', 'комнаты', 'комнат', 'гость', 'гостя', 'гостей']; // Слова для склонения

const ROOMS_TO_GUEST = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};

const GUESTS_IN_ROOM = {
  0: ['100'],
  1: ['1', '2', '3'],
  2: ['1', '2'],
  3: ['3']
};

const MIN_PRICE = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

const adForm = document.querySelector('.ad-form'); // родитель форма form class="ad-form"
const roomNumber = adForm.querySelector('#room_number'); // Количество комнат
const capacity = adForm.querySelector('#capacity'); // Количество мест
// const type = adForm.querySelector('#type option:checked'); // Тип жилья
const type = adForm.querySelector('#type'); // Тип жилья
const price = adForm.querySelector('#price'); // Цена за ночь


// Функция простой валидации
const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element', // Элемент, на который будут добавляться классы !!! Внимательно смотри CSS куда вешается класс
  errorClass: 'ad-form__element--invalid', // Класс, обозначающий невалидное поле
  errorTextParent: 'ad-form__element', // Элемент, куда будет выводиться текст с ошибкой (если повесить на label то ломается вёрстка)
}, true // чтобы Pristine валидировала форму по мере ввода
);

// **************************Валидация: Количество комнат - Количество мест*********************


// проверяем массив[Количество комнат] совпадает Количество мест (если совпадение то true)
const validateCapacity = () => ROOMS_TO_GUEST[roomNumber.value].includes(capacity.value);

// Сообщения о неправильной валидации
const getCapacityErrorMessage = () => `Указанное количество комнат вмещает ${ROOMS_TO_GUEST[roomNumber.value].join(' или ')}  ${numDecline(+ROOMS_TO_GUEST[roomNumber.value], WORDS[3], WORDS[4], WORDS[5])}.`;
const getRoomNumberErrorMessage = () => `Для указанного количества гостей требуется ${GUESTS_IN_ROOM[capacity.value].join(' или ')}  ${numDecline(+GUESTS_IN_ROOM[capacity.value], WORDS[0], WORDS[1], WORDS[2])}.`;

// Функции: что нужно делать при изменении полей "Количество комнат" и "Количество мест"
const onCapacityChange = () => {
  pristine.validate(capacity); // валидация Количество мест; pristine.validate() метод возвращает булево значение: true, если форма валидна
  pristine.validate(roomNumber); // валидация Количество комнат
};

const onRoomNumberChange = () => {
  pristine.validate(capacity);
  pristine.validate(roomNumber);
};


// Кастомные функции проверки валидации
pristine.addValidator(
  capacity,
  validateCapacity,
  getCapacityErrorMessage
);

pristine.addValidator(
  roomNumber,
  validateCapacity,
  getRoomNumberErrorMessage
);


// выбор пункта из списка
capacity.addEventListener('change', onCapacityChange);
roomNumber.addEventListener('change', onRoomNumberChange);

// **************************Валидация: цена за ночь - тип Жилья*********************

const chekingTypeValue = () => {
  switch (type.value) {
    case 'bungalow': price.min = 0;
      break;
    case 'flat': price.min = 1000;
      break;
    case 'hotel': price.min = 3000;
      break;
    case 'house': price.min = 5000;
      break;
    default:
      price.min = 10000;
  }
  price.placeholder = price.min;
};

// функция проверки
const validateType = () => {
  const selectedOption = type.querySelector('option:checked');
  return +price.value >= MIN_PRICE[selectedOption.value];
};

// функция сообщения
// Усли удалить min="1000" в index.html не будет выводится сообщение data-pristine-min-message
const getTypeErrorMessage = () => {
  const selectedOption = type.querySelector('option:checked');
  return `Не меньше ${MIN_PRICE[selectedOption.value]} за ночь в: "${selectedOption.textContent}".`;
};

// Кастомные функция проверки валидации «Тип жилья» - «Цена за ночь»
pristine.addValidator(price, validateType, getTypeErrorMessage);

const onTypeChange = () => {
  pristine.validate(price);
};

type.addEventListener('change', chekingTypeValue); // подстановка в placeholder по нажатию
type.addEventListener('change', onTypeChange);

// **************************Валидация: «Время заезда» - «Время выезда»*********************

const timein = adForm.querySelector('[name="timein"]');
const timeout = adForm.querySelector('[name="timeout"]');
const timeOption = {
  '12:00': '12:00',
  '13:00': '13:00',
  '14:00': '14:00'
};

//  если по выбранному Время заезда совпадает Время выезда — то true
const validateTime = () => timeOption[timein.value].includes(timeout.value);

// функция сообщения Заезд должно быть до Время заезда
const getTimeInErrorMessage = () => `Время заезда должно быть позже ${timeout.value}.`;
const getTimeOutErrorMessage = () => `Время выезда должно быть раньше ${timein.value}.`;

//  ошибку нужно показать на обоих выпадающих списках; не важно, что первым выбрал пользователь
pristine.addValidator(timein, validateTime, getTimeInErrorMessage);
pristine.addValidator(timeout, validateTime, getTimeOutErrorMessage);

// const chekingTime = (standartTime, replacementTime) => {
//   Object.keys(timeOption).forEach((item) => {
//     if (standartTime.value === item && standartTime.value !== replacementTime.value) {
//       const select = timeout.getElementsByTagName('option');
//       for (let i = 0; i < select.length; i++) {
//         if (select[i].value === item) { select[i].selected = true; }
//       }
//     }
//   });
// };

// const chekingTimeIn = chekingTime(timein, timeout);
// const chekingTimeOut = chekingTime(timeout, timein);

const chekingTimeIn = () => {
  Object.keys(timeOption).forEach((item) => {
    if (timein.value === item && timein.value !== timeout.value) {
      const select = timeout.getElementsByTagName('option');
      for (let i = 0; i < select.length; i++) {
        if (select[i].value === item) { select[i].selected = true; }
      }
    }
  });
};

const chekingTimeOut = () => {
  Object.keys(timeOption).forEach((item) => {
    if (timeout.value === item && timeout.value !== timein.value) {
      const select = timeout.getElementsByTagName('option');
      for (let i = 0; i < select.length; i++) {
        if (select[i].value === item) { select[i].selected = true; }
      }
    }
  });
};


timein.addEventListener('change', chekingTimeIn); // подстановка timein в timeout
timeout.addEventListener('change', chekingTimeOut); // подстановка timeout в timein


// ******* ******************************общий вызов*************************************
adForm.addEventListener('submit', (evt) => {
  evt.preventDefault(); // отменяется нажатие кнопки
  pristine.validate();
});
