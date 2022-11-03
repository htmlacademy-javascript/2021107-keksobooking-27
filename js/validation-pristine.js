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


const adForm = document.querySelector('.ad-form'); // родитель форма form class="ad-form"
const roomNumber = adForm.querySelector('#room_number'); // Количество комнат
const capacity = adForm.querySelector('#capacity'); // Количество мест

// Функция простой валидации
const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element', // Элемент, на который будут добавляться классы !!! Внимательно смотри CSS куда вешается класс
  errorClass: 'ad-form__element--invalid', // Класс, обозначающий невалидное поле
  errorTextParent: 'ad-form__element', // Элемент, куда будет выводиться текст с ошибкой (если повесить на label то ломается вёрстка)
}, true // чтобы Pristine валидировала форму по мере ввода
);

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

// простая проверка полей заголовок объявления и цена за ночь
adForm.addEventListener('submit', (evt) => {
  evt.preventDefault(); // отменяется нажатие кнопки
  pristine.validate();
});
