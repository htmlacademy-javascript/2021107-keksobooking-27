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

// тип жилья сопоставляем с подписями offer.type
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


// находим шаблон id="card" и в нём контейнер <article class="popup">
const patternCardSticker = document.querySelector('#card').content.querySelector('.popup');


const renderCard = ({ author, offer }) => { //используем деструктуризацию вместо getTicets()[0].author пишем просто author и т.п.(важен порядок присваивания наименования)
  // клонирую <article class="popup"> со всем содержимым
  const ticetElement = patternCardSticker.cloneNode(true);

  // добавлена для удобства, для короче запись Слов для склонения
  const word = WORDS_FOR_DECLENSIONS;

  const title = ticetElement.querySelector('.popup__title');
  // Делаем проверку что есть данные для заполнения
  if (offer.title) {
    // Если данные есть вносим их
    title.textContent = offer.title;
  } else {
    // если данных нет удаляем элемент из DOOM
    title.remove();
  }

  const address = ticetElement.querySelector('.popup__text--address');
  if (offer.address) {
    address.textContent = offer.address;
  } else {
    address.remove();
  }

  const price = ticetElement.querySelector('.popup__text--price');
  if (offer.price) {
    price.textContent = `${offer.price}  ₽/ночь`;
  } else {
    price.remove();
  }

  const type = ticetElement.querySelector('.popup__type');
  if (offer.type) {
    type.textContent = sortingHousing(offer.type);
  } else {
    type.remove();
  }

  const capacity = ticetElement.querySelector('.popup__text--capacity');
  if (offer.rooms && offer.guests) {
    capacity.textContent =
      // происходит проверка на склонение слова
      `${offer.rooms} ${numDecline(offer.rooms, word[0], word[1], word[2])} для ${offer.guests} ${numDecline(offer.guests, word[3], word[4], word[5])}`;
  } else {
    capacity.remove();
  }

  const time = ticetElement.querySelector('.popup__text--time');
  if (offer.checkin && offer.checkout) {
    time.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  } else {
    time.remove();
  }

  const features = ticetElement.querySelector('.popup__features');
  // переменные для вывода список .popup__features
  const feature = features.querySelectorAll('.popup__feature');
  if (offer.features) {
    removingUnnecessaryElements(feature, offer.features); // добавление доступных удобства(features) в объявлении
  } else {
    features.remove();
  }

  const description = ticetElement.querySelector('.popup__description');
  if (offer.description) {
    description.textContent = offer.description;
  } else {
    description.remove();
  }

  const photos = ticetElement.querySelector('.popup__photos');
  if (offer.photos) {
    // надо к родителю добавить получившиеся элементы
    photos.append(renderImage(photos, offer.photos));
  } else {
    photos.remove();
  }

  const avatar = ticetElement.querySelector('.popup__avatar');
  if (author.avatar) {
    avatar.src = author.avatar;
  } else {
    avatar.remove();
  }

  return ticetElement;
};

// используем append вместо appendChild, выводим один элемент
// mapBlock.append(renderCard(getTicets()[0]));
export {
  renderCard, // функция заполняющая карточку
};

