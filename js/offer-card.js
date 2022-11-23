import { declineNumber } from './utils.js';


const WORDS_FOR_DECLENSIONS = ['комната', 'комнаты', 'комнат', 'гость', 'гостя', 'гостей'];
const TYPES_OF_HOUSES = ['bungalow', 'flat', 'hotel', 'house', 'palace'];

const TypeOfHousing = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const { flat, bungalow, house, palace, hotel } = TypeOfHousing;

const getSortRooms = (typeHouse) => {
  switch (typeHouse) {
    case TYPES_OF_HOUSES[1]:
      return flat;
    case TYPES_OF_HOUSES[0]:
      return bungalow;
    case TYPES_OF_HOUSES[3]:
      return house;
    case TYPES_OF_HOUSES[4]:
      return palace;
    case TYPES_OF_HOUSES[2]:
      return hotel;
  }
};


const deleteUnnecessaryElements = (fullArray, needArray) => {
  fullArray.forEach((arrayItem) => {
    if (needArray.indexOf(arrayItem.classList[1].replace('popup__feature--', '')) === -1) { arrayItem.remove(); }
  });
};

const renderImage = (container, needArray) => {
  const element = container.querySelector('img');
  container.innerHTML = '';
  const fragmentPhoto = document.createDocumentFragment();

  needArray.forEach((item) => {
    const newPhoto = element.cloneNode(true);
    newPhoto.src = item;
    fragmentPhoto.append(newPhoto);
  });
  return fragmentPhoto;
};


const patternCardSticker = document.querySelector('#card').content.querySelector('.popup');


const renderCard = ({ author, offer }) => {
  const ticetElement = patternCardSticker.cloneNode(true);

  const word = WORDS_FOR_DECLENSIONS;

  const title = ticetElement.querySelector('.popup__title');
  if (offer.title) {
    title.textContent = offer.title;
  } else {
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
    type.textContent = getSortRooms(offer.type);
  } else {
    type.remove();
  }

  const capacity = ticetElement.querySelector('.popup__text--capacity');
  if (offer.rooms && offer.guests) {
    capacity.textContent =
      `${offer.rooms} ${declineNumber(offer.rooms, word[0], word[1], word[2])}
      для ${offer.guests} ${declineNumber(offer.guests, word[3], word[4], word[5])}`;
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
  const feature = features.querySelectorAll('.popup__feature');
  if (offer.features) {
    deleteUnnecessaryElements(feature, offer.features);
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

export {
  renderCard,
};
