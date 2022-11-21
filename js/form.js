import { numDecline } from './utils.js';
import { getSuccessfulDownloadForm, getFailedDownloadForm } from './message-user.js';
import { makeRequest } from './api.js';
import { resetImages } from './avatar.js';
import { resettingSlider } from './slider-form.js';
import { onButtonResetClick } from './map.js';


const adForm = document.querySelector('.ad-form');
const mapForm = document.querySelector('.map__filters');
const mapFilter = document.querySelector('.map__filters');
const resetButton = adForm.querySelector('.ad-form__reset');
const price = adForm.querySelector('#price');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const type = adForm.querySelector('#type');
const timein = adForm.querySelector('[name="timein"]');
const timeout = adForm.querySelector('[name="timeout"]');
const submitButton = adForm.querySelector('.ad-form__submit');


const WORDS = ['комната', 'комнаты', 'комнат', 'гость', 'гостя', 'гостей'];

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

const disablingEnablingForm = (form) => {
  form.querySelectorAll('fieldset, select.map__filter').forEach((fieldItem) => {
    fieldItem.disabled = !fieldItem.disabled;
  });
};


const disablingAdForm = () => {
  adForm.classList.toggle('ad-form--disabled');

  disablingEnablingForm(adForm);
};

const disablingFormMapFilter = () => {
  mapFilter.classList.toggle('ad-form--disabled');

  disablingEnablingForm(mapFilter);
};


const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
}, true
);


const validateCapacity = () => ROOMS_TO_GUEST[roomNumber.value].includes(capacity.value);

const getCapacityErrorMessage = () => `Указанное количество комнат вмещает ${ROOMS_TO_GUEST[roomNumber.value].join(' или ')}  ${numDecline(+ROOMS_TO_GUEST[roomNumber.value], WORDS[3], WORDS[4], WORDS[5])}.`;
const getRoomNumberErrorMessage = () => `Для указанного количества гостей требуется ${GUESTS_IN_ROOM[capacity.value].join(' или ')}  ${numDecline(+GUESTS_IN_ROOM[capacity.value], WORDS[0], WORDS[1], WORDS[2])}.`;

const onCapacityChange = () => {
  pristine.validate(capacity);
  pristine.validate(roomNumber);
};

const onRoomNumberChange = () => {
  pristine.validate(capacity);
  pristine.validate(roomNumber);
};


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


capacity.addEventListener('change', onCapacityChange);
roomNumber.addEventListener('change', onRoomNumberChange);


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

const validateType = () => {
  const selectedOption = type.querySelector('option:checked');
  return +price.value >= MIN_PRICE[selectedOption.value];
};

const getTypeErrorMessage = () => {
  const selectedOption = type.querySelector('option:checked');
  return `Не меньше ${MIN_PRICE[selectedOption.value]} за ночь в: "${selectedOption.textContent}".`;
};

pristine.addValidator(price, validateType, getTypeErrorMessage);

const onTypeChange = () => {
  pristine.validate(price);
};

type.addEventListener('change', onPlaceholderChange);
type.addEventListener('change', onTypeChange);


const onTimeInChange = () => {
  timeout.value = timein.value;
};

const onTimeOutChange = () => {
  timein.value = timeout.value;
};


timein.addEventListener('change', onTimeInChange);
timeout.addEventListener('change', onTimeOutChange);


const resettingForm = () => {
  adForm.reset();
  mapForm.reset();
  price.placeholder = 0;
  pristine.reset();
};

const onResetClick = () => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    resettingForm();
    resetImages();
    onButtonResetClick();
  });
};

onResetClick();

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};


const onUserFormSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      const formData = new FormData(evt.target);
      blockSubmitButton();
      resettingSlider();
      makeRequest(() => { resettingForm(); onButtonResetClick(); resetImages(); getSuccessfulDownloadForm(); unblockSubmitButton(); }, () => { getFailedDownloadForm(); unblockSubmitButton(); }, 'POST', formData);
    }
  });
};


onUserFormSubmit();

export {
  disablingAdForm,
  disablingFormMapFilter,
};
