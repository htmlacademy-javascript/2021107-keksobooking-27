const ROOMS_VS_GUEST = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};


const adForm = document.querySelector('.ad-form'); // родитель форма form class="ad-form"
const roomNumber = adForm.querySelector('#room_number'); // Количество комнат
const capacity = adForm.querySelector('#capacity'); // Количество мест

// const type = adForm.querySelector('#type'); // Тип жилья
// const price = adForm.querySelector('#price'); // Цена за ночь, руб.
// const formTime = adForm.querySelector('.ad-form__element--time'); // Время заезда и выезда
// const timeIn = adForm.querySelector('#timein'); // Время заезда
// const timeOut = adForm.querySelector('#timeout'); // Время выезда
// const guestNumber = capacity.querySelectorAll('option'); // тип жилья потом переименовать housing-type

// const NumberOfGuests = {

// };

// // родитель форма
// const adForm = document.querySelector('.ad-form'); // form class="ad-form"

// Функция простой валидации
const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element', // Элемент, на который будут добавляться классы !!! Внимательно смотри CSS куда вешается класс
  errorClass: 'ad-form__element--invalid', // Класс, обозначающий невалидное поле
  errorTextParent: 'ad-form__element', // Элемент, куда будет выводиться текст с ошибкой (если повесить на label то ломается вёрстка)
}, true // чтобы Pristine валидировала форму по мере ввода
);

// простая проверка полей заголовок объявления и цена за ночь
adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

/*
1 комната — «для 1 гостя»;
2 комнаты — «для 2 гостей» или «для 1 гостя»;
3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»;
100 комнат — «не для гостей».
*/
const validateCapacity = () => {
  ROOMS_VS_GUEST[roomNumber.value].includes(capacity.value);
  // console.log(roomNumber);
};


