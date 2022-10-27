import { getTicets } from './data.js';

// тип жилья
const typeOfHousing = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

// деструктуризация см. вышу константу
const {flat, bungalow, house, palace, hotel} = typeOfHousing;

// тип жилья сопоставив с подписями
const sortingHousing = (typeHouse) => {
  switch (typeHouse) {
    case 'flat':
      return flat;
    case 'bungalow':
      return bungalow;
    case 'house':
      return house;
    case 'palace':
      return palace;
    case 'hotel':
      return hotel;
  }
};

// Временный блок для вставки карточки
const mapBlock = document.querySelector('#map-canvas');
// console.log(mapBlock);
// находим шаблон id="card" и в нём контейнер <article class="popup">
const patternCardSticker = document.querySelector('#card').content.querySelector('.popup');

// передаём импортированную функцию  в константу
const similarTicets = getTicets();
// console.log(getTicets()[0]);

// Создаём "коробочку" что-бы сгруппировать однотипные или разнотипные элементы и вставить потом их все вместе
const similarListFragment = document.createDocumentFragment();

// функция создающая генерации разметки похожих объявлений на основе данных
// для wizard потом надо будет используем деструктуризацию параметров
similarTicets.forEach((wizard) => {
  // клонирую <article class="popup"> со всем содержимым
  const ticetElement = patternCardSticker.cloneNode(true);

  // Выведите заголовок объявления offer.title в заголовок .popup__title.
  ticetElement.querySelector('.popup__title').textContent = wizard.offer.title;
  ticetElement.querySelector('.popup__text--address').textContent = wizard.offer.address;
  ticetElement.querySelector('.popup__text--price').textContent = `${wizard.offer.price}  ₽/ночь`;
  ticetElement.querySelector('.popup__type').textContent = sortingHousing(wizard.offer.type);
  // необходимо добавить проверку на слова
  ticetElement.querySelector('.popup__text--capacity').textContent = `${wizard.offer.rooms} комнаты для ${wizard.offer.guests} гостей`;
  ticetElement.querySelector('.popup__text--time').textContent = `Заезд после ${wizard.offer.checkin}, выезд до ${wizard.offer.checkout}`;
  // ticetElement.querySelector('.popup__features').textContent = sortingHousing(wizard.offer.type);
  ticetElement.querySelector('.popup__description').textContent = wizard.offer.description;
  // ticetElement.querySelector('.popup__photos').textContent = wizard.offer.description;
  ticetElement.querySelector('.popup__avatar').src = wizard.author.avatar;
  similarListFragment.append(ticetElement);
});

// используем append вместо appendChild
mapBlock.append(similarListFragment);

// В список .popup__features выведите все доступные удобства в объявлении.

// В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как атрибут src соответствующего изображения.
