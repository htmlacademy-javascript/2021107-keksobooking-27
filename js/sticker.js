// Временный блок для вставки карточки
const mapBlock = document.querySelector('#map-canvas');
// находим шаблон id="card" и в нём контейнер <article class="popup">
const patternCardSticker = document.querySelector('#card').content.querySelector('.popup');

// клонирую <article class="popup"> со всем содержимым
const ticetElement = patternCardSticker.cloneNode(true);

mapBlock.append(ticetElement);


{/* <script>
  const mapBlock = document.querySelector('#map-canvas');
  const patternCardSticker = document.querySelector('#card').content.querySelector('.popup');
  const ticetElement = patternCardSticker.cloneNode(true);
  mapBlock.append(ticetElement);
</script> */}


// import { getTicets } from './data.js';

// // Временный блок для вставки карточки
// const mapBlock = document.querySelector('#map-canvas');
// console.log(mapBlock);
// // находим шаблон id="card" и в нём контейнер <article class="popup">
// const patternCardSticker = document.querySelector('#card').content.querySelector('.popup');

// // передаём импортированную функцию  в константу
// const similarTicets = getTicets();

// // Создаём "коробочку" что-бы сгруппировать однотипные или разнотипные элементы и вставить потом их все вместе
// const similarListFragment = document.createDocumentFragment();

// // функция создающая генерации разметки похожих объявлений на основе данных
// // для wizard потом надо будет используем деструктуризацию параметров
// similarTicets.forEach((wizard) => {
//   // клонирую <article class="popup"> со всем содержимым
//   const ticetElement = patternCardSticker.cloneNode(true);

//   // Выведите заголовок объявления offer.title в заголовок .popup__title.
//   ticetElement.querySelector('.popup__title').textContent = wizard.offer.title;
//   ticetElement.querySelector('.popup__text--address').textContent = wizard.offer.address;
//   ticetElement.querySelector('.popup__text--price').textContent = wizard.offer.price + ' ₽/ночь';
//   similarListFragment.append(ticetElement);
// });

// // используем append вместо appendChild
// mapBlock.append(similarListFragment);

// // Выведите заголовок объявления offer.title в заголовок .popup__title.
// // Выведите адрес offer.address в блок .popup__text--address.
// // Выведите цену offer.price в блок .popup__text--price строкой вида {{offer.price}} ₽/ночь. Например, «5200 ₽/ночь».
// В блок .popup__type выведите тип жилья offer.type, сопоставив с подписями:
// Квартира для flat
// Бунгало для bungalow
// Дом для house
// Дворец для palace
// Отель для hotel
// Выведите количество гостей и комнат offer.rooms и offer.guests в блок .popup__text--capacity строкой вида {{offer.rooms}} комнаты для {{offer.guests}} гостей. Например, «2 комнаты для 3 гостей».
// Время заезда и выезда offer.checkin и offer.checkout в блок .popup__text--time строкой вида Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}. Например, «Заезд после 14:00, выезд до 14:00».
// В список .popup__features выведите все доступные удобства в объявлении.
// В блок .popup__description выведите описание объекта недвижимости offer.description.
// В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как атрибут src соответствующего изображения.
// Замените значение атрибута src у аватарки пользователя .popup__avatar на значение поля author.avatar.
