import {getRandomArbitrary, getRandomArbitraryFloat} from './utils.js';

const START_ELEMNT = 1;
const FINISH_ELEMNT = 10;
const locations = {
  MINIMAL_LATS: 35.65000,
  MAXIMUM_LATS: 35.70000,
  MINIMAL_LNGS: 139.70000,
  MAXIMUM_LNGS: 139.80000,
  DECIMAL_PLACE: 5
};

const author = [];



const offer = [
  title,
  address,
  price,
  type: [palace, flat, house,  hotel],
  rooms,
  guests,
  checkin,
  checkout,
  features: [wifi, dishwasher, parking, washer, elevator, conditioner],
  description,
  photos
];



const sozdanieMassiva = () => {
  //описывает автора
  const avatar = `img/avatars/user${getRandomArbitrary(START_ELEMNT, FINISH_ELEMNT)}.png`;

  // местоположение в виде географических координат
  const opredelenieCoordinat = (location) => {
    const lat = getRandomArbitraryFloat(locations.MINIMAL_LATS, locations.MAXIMUM_LATS, DECIMAL_PLACE);
    const lng = getRandomArbitraryFloat(locations.MINIMAL_LNGS, locations.MAXIMUM_LNGS, DECIMAL_PLACE);
    location.push(lat, lng);
  }


  return {
    author: avatar,
    offer: '',
    location: location,
  };
};

console.log(sozdanieMassiva());
