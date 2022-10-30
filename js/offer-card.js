import { getTicets } from './data.js';
import { numDecline } from './utils.js';


// тип жилья
const typeOfHousing = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

// деструктуризация см. вышу константу
const { flat, bungalow, house, palace, hotel } = typeOfHousing;

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

// Слова для склонения
const WORDS_FOR_DECLENSIONS = ['комната', 'комнаты', 'комнат', 'гость', 'гостя', 'гостей'];

// функция удаления ненужных удобств(features) в объявлении
const removingUnnecessaryElements = (fullArray, needArray) => {
  fullArray.forEach((arrayItem) => {
    // У второго класса(classList[1]) заменяем(popup__feature--) на пустоту('') и сравниваем с нужным массивом, если нет совпадения удаляем сам элемент
    if (needArray.indexOf(arrayItem.classList[1].replace('popup__feature--', '')) === -1) { arrayItem.remove(); }
  });
};

// функция добавления фотографий в объявлении
const renderImage = (container, needArray) => {
  const element = container.querySelector('img');
  container.innerHTML = '';
  // Создаём "коробочку" что-бы сгруппировать однотипные или разнотипные элементы и вставить потом их все вместе
  const fragmentPhoto = document.createDocumentFragment();

  needArray.forEach((item) => {
    const newPhoto = element.cloneNode(true);
    newPhoto.src = item;
    fragmentPhoto.append(newPhoto);
  });
  return fragmentPhoto;
};


// Временный блок для вставки карточки
const mapBlock = document.querySelector('#map-canvas');
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

  // добавлена для удобства, для короче запись
  const word = WORDS_FOR_DECLENSIONS;

  // клонирую <article class="popup"> со всем содержимым
  const ticetElement = patternCardSticker.cloneNode(true);

  // переменные для вывода список .popup__features
  const features = ticetElement.querySelector('.popup__features');
  const feature = features.querySelectorAll('.popup__feature');
  // массив features котрый нужен нам
  const listFeature = wizard.offer.features;

  // родитель для фотографий помещения
  const containerPhoto = ticetElement.querySelector('.popup__photos');


  // Выведите заголовок объявления offer.title в заголовок .popup__title.
  ticetElement.querySelector('.popup__title').textContent = wizard.offer.title;
  ticetElement.querySelector('.popup__text--address').textContent = wizard.offer.address;
  ticetElement.querySelector('.popup__text--price').textContent = `${wizard.offer.price}  ₽/ночь`;
  ticetElement.querySelector('.popup__type').textContent = sortingHousing(wizard.offer.type);
  // происходит проверка на склонение слова
  ticetElement.querySelector('.popup__text--capacity').textContent = `${wizard.offer.rooms} ${numDecline(wizard.offer.rooms, word[0], word[1], word[2])} для ${wizard.offer.guests} ${numDecline(wizard.offer.guests, word[3], word[4], word[5])}`;
  ticetElement.querySelector('.popup__text--time').textContent = `Заезд после ${wizard.offer.checkin}, выезд до ${wizard.offer.checkout}`;
  removingUnnecessaryElements(feature, listFeature); // добавление доступные удобства(features) в объявлении
  ticetElement.querySelector('.popup__description').textContent = wizard.offer.description;
  // надо к родителю добавить получившиеся элементы
  containerPhoto.append(renderImage(containerPhoto, wizard.offer.photos));
  ticetElement.querySelector('.popup__avatar').src = wizard.author.avatar;

  similarListFragment.append(ticetElement);
});

// используем append вместо appendChild
mapBlock.append(similarListFragment);

// вывод только первой карточки
const deletedElement = mapBlock.querySelectorAll('.popup');
for (let i = 0; i < deletedElement.length; i++) {
  if (i > 0) {
    mapBlock.removeChild(deletedElement[i]);
  }
}
