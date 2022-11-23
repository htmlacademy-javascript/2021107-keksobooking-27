import { disablingAdForm, disablingFormMapFilter } from './form.js';
import { makeRequest } from './api.js';
import { showAlert, debounce } from './utils.js';
import { renderCard } from './offer-card.js';
import { filteringData } from './sort-points.js';

const LAT = 35.6895;
const LNG = 139.752465;
const PIN_LATITUDE = 35.66399;
const PIN_LOMGITUDE = 139.73785;
const SCALE = 11;
const FINISH_ELEMNT = 10;
const TEXT_ALLERT_MESSAGE = 'Данные не загрузились. Попробуйте ещё раз.';

const address = document.querySelector('#address');
const mapFilters = document.querySelector('.map__filters');

let adverts = [];


const map = L.map('map-canvas');
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: PIN_LATITUDE,
    lng: PIN_LOMGITUDE,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);


mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const temporaryAddress = evt.target.getLatLng();
  address.value = `${temporaryAddress.lat.toFixed(5)}, ${temporaryAddress.lng.toFixed(5)}`;
});


const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const pointsGroup = L.layerGroup().addTo(map);

const creatingPoints = (data, card) => {
  data.forEach((point) => {
    const { lat, lng } = point.location;
    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon,
      },
    );

    marker.addTo(pointsGroup)
      .bindPopup(card(point));
  });
};


const removePoints = () => {
  pointsGroup.clearLayers();
};

const onMapFilterChange = () => {
  removePoints();

  creatingPoints(filteringData(adverts), renderCard);
};

const onSuccess = (data) => {
  adverts = data.slice();

  disablingFormMapFilter();
  creatingPoints(adverts.slice(0, FINISH_ELEMNT), renderCard);

  mapFilters.addEventListener('change', debounce(onMapFilterChange));
};

const onError = () => {
  showAlert(TEXT_ALLERT_MESSAGE);
};

map.on('load', () => {
  disablingAdForm();
  makeRequest(onSuccess, onError, 'GET');
})
  .setView({
    lat: LAT,
    lng: LNG,
  }, SCALE);


const onButtonResetClick = () => {
  mainPinMarker.setLatLng({
    lat: PIN_LATITUDE,
    lng: PIN_LOMGITUDE,
  });

  map.setView({
    lat: LAT,
    lng: LNG,
  }, SCALE);

  removePoints();

  creatingPoints(adverts.slice(0, FINISH_ELEMNT), renderCard);

};


export {
  onButtonResetClick,
};

