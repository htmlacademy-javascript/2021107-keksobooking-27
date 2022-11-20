import { numDecline } from './utils.js';
import { getSuccessfulDownloadForm, getFailedDownloadForm } from './message-user.js';
import { makeRequest } from './api.js';
import { resetImages } from './avatar.js';
import { resettingSlider } from './slider-form.js';
import { onButtonResetClick } from './map.js';
onButtonResetClick();


// родитель форма
const adForm = document.querySelector('.ad-form'); // форма объявления
const mapForm = document.querySelector('.map__filters'); // форма фильтрации
const mapFilter = document.querySelector('.map__filters');
const resetButton = adForm.querySelector('.ad-form__reset');
const price = adForm.querySelector('#price'); // Цена за ночь
const roomNumber = adForm.querySelector('#room_number'); // Количество комнат
const capacity = adForm.querySelector('#capacity'); // Количество мест
const type = adForm.querySelector('#type'); // Тип жилья
const timein = adForm.querySelector('[name="timein"]'); // время заезда
const timeout = adForm.querySelector('[name="timeout"]'); // время выезда
const submitButton = adForm.querySelector('.ad-form__submit');


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

const {bungalow, flat, hotel, house, palace} = MIN_PRICE;

// Функция добавления/удаления disabled у элементов с классами fieldset, select.map__filter
const disablingEnablingForm = (form) => {
  form.querySelectorAll('fieldset, select.map__filter').forEach((fieldItem) => {
    // меняем состояние disabled на противоположное
    fieldItem.disabled = !fieldItem.disabled;
  });
};


// функция включения/выключения неактивного состояния у формы
const disablingAdForm = () => {
  // с помощью classList.toggle если нет/есть класс то добавляем/удаляем класс
  adForm.classList.toggle('ad-form--disabled');

  disablingEnablingForm(adForm);
};

const disablingFormMapFilter = () => {
  // с помощью classList.toggle если нет/есть класс то добавляем/удаляем класс
  mapFilter.classList.toggle('ad-form--disabled');

  disablingEnablingForm(mapFilter);
};

//****************************************Валидация пристин********************************** */


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

const onPlaceholderChange = () => {
  switch (type.value) {
    case 'bungalow': price.min = bungalow;
      break;
    case 'flat': price.min = flat;
      break;
    case 'hotel': price.min = hotel;
      break;
    case 'house': price.min = house;
      break;
    default:
      price.min = palace;
  }
  price.placeholder = price.min;
};

// функция проверки
const validateType = () => {
  const selectedOption = type.querySelector('option:checked');
  return +price.value >= MIN_PRICE[selectedOption.value];
};

// функция сообщения
// Если удалить min="1000" в index.html не будет выводится сообщение data-pristine-min-message
const getTypeErrorMessage = () => {
  const selectedOption = type.querySelector('option:checked');
  return `Не меньше ${MIN_PRICE[selectedOption.value]} за ночь в: "${selectedOption.textContent}".`;
};

// Кастомные функция проверки валидации «Тип жилья» - «Цена за ночь»
pristine.addValidator(price, validateType, getTypeErrorMessage);

const onTypeChange = () => {
  pristine.validate(price);
};

type.addEventListener('change', onPlaceholderChange); // подстановка в placeholder по нажатию
type.addEventListener('change', onTypeChange);


// **************************Валидация: «Время заезда» - «Время выезда»*********************

const onTimeInChange = () => {
  timeout.value = timein.value;
};

const onTimeOutChange = () => {
  timein.value = timeout.value;
};


timein.addEventListener('change', onTimeInChange); // подстановка timein в timeout
timeout.addEventListener('change', onTimeOutChange); // подстановка timeout в timein


//**************************************Общие вызовы, нажатия кнопок************************ */

const resettingForm = () => {
  adForm.reset(); // сброс формы объявления
  mapForm.reset(); // сброс формы фильрации
  price.placeholder = 0;
  pristine.reset();
};

// сброс (RESET)
const onResetClick = () => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault(); // отменяется нажатие кнопки
    resettingForm();
    resetImages(); // Сброс изображения
  });
};


const blockSubmitButton = () => { // Блокирует кнопку отправить
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => { // Разблокирует кнопку отправить
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};


// кнопка отправить
const onUserFormSubmit = (oneAction, twoAction) => { // oneAction-нужно для reset form, twoAction-нужно для reset пина
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault(); // отменяется нажатие кнопки
    const isValid = pristine.validate();
    if (isValid) {
      const formData = new FormData(evt.target); // если пользователь ввёл валидные данные, соберём их с помощью FormData
      blockSubmitButton();
      resettingSlider();
      // fetch для отправки данных
      makeRequest(() => { oneAction(); twoAction(); getSuccessfulDownloadForm(); unblockSubmitButton(); }, () => { getFailedDownloadForm(); unblockSubmitButton(); }, 'POST', formData);
    }
  });
};


export {
  disablingAdForm, // включения/выключения формы adForm
  disablingFormMapFilter, // включения/выключения формы mapFilter
  onUserFormSubmit, // Кнопка "отправить"
  resettingForm, // сброс форм
  onResetClick // Кнопка сбросить
};
