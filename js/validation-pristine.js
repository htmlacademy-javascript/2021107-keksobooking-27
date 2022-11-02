// родитель форма
const adForm = document.querySelector('.ad-form'); // form class="ad-form"
const type = adForm.querySelector('#type'); // Тип жилья
const price = adForm.querySelector('#price'); // Цена за ночь, руб.
const formTime = adForm.querySelector('.ad-form__element--time'); // Время заезда и выезда
const timeIn = adForm.querySelector('#timein'); // Время заезда
const timeOut = adForm.querySelector('#timeout'); // Время выезда
const roomNumber = adForm.querySelector('#room_number'); // Количество комнат

const capacity = adForm.querySelector('#capacity'); // Количество мест
const guestNumber = capacity.querySelectorAll('option'); // тип жилья потом переименовать housing-type


const prestine = new Pristine(adForm, {
  classTo: 'ad-form__label', // Элемент, на который будут добавляться классы
});

/*
const orderForm = document.querySelector('.form');


const pristine = new Pristine(orderForm, {
  classTo: 'form__item', // Элемент, на который будут добавляться классы
  errorClass: 'form__item--invalid', // Класс, обозначающий невалидное поле
  successClass: 'form__item--valid', // Класс, обозначающий валидное поле
  errorTextParent: 'form__item', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'span', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'form__error' // Класс для элемента с текстом ошибки
});


orderForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

*/
