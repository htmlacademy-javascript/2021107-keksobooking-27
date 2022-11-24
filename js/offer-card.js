import { declineNumber } from './utils.js';


const TYPES_OF_HOUSES = ['bungalow', 'flat', 'hotel', 'house', 'palace'];

const TypeOfHousing = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const { flat, bungalow, house, palace, hotel } = TypeOfHousing;
const [комната, комнаты, комнат, гость, гостя, гостей] = ['комната', 'комнаты', 'комнат', 'гость', 'гостя', 'гостей'];


const patternCardSticker = document.querySelector('#card').content.querySelector('.popup');


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

const addTextHtmlElement = (htmlElement, data) => {
  if (data) {
    htmlElement.textContent = data;
  } else {
    htmlElement.remove();
  }
};

const addPrice = (htmlElement, data) => {
  if (data) {
    htmlElement.textContent = `${data}  ₽/ночь`;
  } else {
    htmlElement.remove();
  }
};

const addType = (htmlElement, data) => {
  if (data) {
    htmlElement.textContent = getSortRooms(data);
  } else {
    htmlElement.remove();
  }
};

const addCapacity = (htmlElement, data, secondData) => {
  if (data && secondData) {
    htmlElement.textContent =
      `${data} ${declineNumber(data, комната, комнаты, комнат)}
      для ${secondData} ${declineNumber(secondData, гостя, гостей, гость)}`;
  } else {
    htmlElement.remove();
  }
};

const addTime = (htmlElement, data, secondData) => {
  if (data && secondData) {
    htmlElement.textContent = `Заезд после ${data}, выезд до ${secondData}`;
  } else {
    htmlElement.remove();
  }
};

const chooseFeatures = (fieldset, htmlElement, data) => {
  if (data) {
    deleteUnnecessaryElements(htmlElement, data);
  } else {
    fieldset.remove();
  }
};

const addPhotos = (htmlElement, data) => {
  if (data) {
    htmlElement.append(renderImage(htmlElement, data));
  } else {
    htmlElement.remove();
  }
};

const addAvatar = (htmlElement, data) => {
  if (data) {
    htmlElement.src = data;
  } else {
    htmlElement.remove();
  }
};

const renderCard = ({ author, offer }) => {
  const ticetElement = patternCardSticker.cloneNode(true);


  const title = ticetElement.querySelector('.popup__title');
  addTextHtmlElement(title, offer.title);


  const address = ticetElement.querySelector('.popup__text--address');
  addTextHtmlElement(address, offer.address);


  const price = ticetElement.querySelector('.popup__text--price');
  addPrice(price, offer.price);


  const type = ticetElement.querySelector('.popup__type');
  addType(type, offer.type);


  const capacity = ticetElement.querySelector('.popup__text--capacity');
  addCapacity(capacity, offer.rooms, offer.guests);


  const time = ticetElement.querySelector('.popup__text--time');
  addTime(time, offer.checkin, offer.checkout);


  const features = ticetElement.querySelector('.popup__features');
  const feature = features.querySelectorAll('.popup__feature');
  chooseFeatures(features, feature, offer.features);


  const description = ticetElement.querySelector('.popup__description');
  addTextHtmlElement(description, offer.description);


  const photos = ticetElement.querySelector('.popup__photos');
  addPhotos(photos, offer.photos);


  const avatar = ticetElement.querySelector('.popup__avatar');
  addAvatar(avatar, author.avatar);

  return ticetElement;
};

export {
  renderCard,
};
