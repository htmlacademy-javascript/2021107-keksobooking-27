import { disablingAdForm, disablingFormMapFilter } from './form.js';
import { makeRequest } from './api.js';
import { showAlert } from './utils.js';
import { renderCard } from './offer-card.js';
import { filterData } from './sort-points.js';


const resetButton = document.querySelector('.ad-form__reset');
const address = document.querySelector('#address');
const mapFilters = document.querySelector('.map__filters');

const LAT = 35.6895;
const LNG = 139.752465;
const PIN_LATITUDE = 35.66399;
const PIN_LOMGITUDE = 139.73785;
const SCALE = 11;
const FINISH_ELEMNT = 10;
const TEXT_ALLERT_MESSAGE = 'Данные не загрузились. Попробуйте ещё раз.';
let adverts = []; // переменная для хранения получеенныч с сервера даннных


// Создадим карту
const map = L.map('map-canvas');
L.tileLayer( //  создаём нужный слой  командой L.tileLayer(), изображениями карт от OpenStreetMap добавив как слой на нашу созданную карту
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map); // добавляем слой на карту методом addTo()


// *******************************************Главный пин**************************************

const mainPinIcon = L.icon({ //  создаём L.icon() то, что нужно добавить на карту
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52], // координаты кончика хвоста метки
});

const mainPinMarker = L.marker( // добавить метку
  {
    lat: PIN_LATITUDE,
    lng: PIN_LOMGITUDE,
  },
  {
    draggable: true, // метку можно передвигать по карте
    icon: mainPinIcon, // добавляем icon: mainPinIcon в параметры маркера
  },
);


mainPinMarker.addTo(map); // затем добавляем на карту addTo()

// перемещение пина
mainPinMarker.on('moveend', (evt) => { // обработчик события moveen - означает, что пользователь закончил передвигать метку
  const temporaryAddress = evt.target.getLatLng(); // метод getLatLng() возвращает объект с новыми координатами
  address.value = `${temporaryAddress.lat.toFixed(5)}, ${temporaryAddress.lng.toFixed(5)}`;
});

// сброс карты(RESET)
const onButtonResetClick = () => {
  mainPinMarker.setLatLng({ //  setLatLng() вернуть метку на своё изначальное место с нужными координатами
    lat: PIN_LATITUDE,
    lng: PIN_LOMGITUDE,
  });

  map.setView({ //  возвращение к начальным значениям масштаба и центра карты
    lat: 35.6895,
    lng: 139.692,
  }, SCALE);
};

resetButton.addEventListener('click', () => {
  onButtonResetClick();
});


// ****************************** Дополнительные пины **********************************


const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const pointsGroup = L.layerGroup().addTo(map);

const creatingPoints = (data, card) => { // Добавление второстепенных пинов на карту
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
      .bindPopup(card(point)); // привяжем к каждой нашей метке балун bindPopup(), чтобы по клику на неё показывалась информация о месте
  });
};


//***********************************************Отрисовка нужных пинов, нормальная работа, обработка ошибок */

const removePoints = () => { // Удаление пинов
  pointsGroup.clearLayers();
};

const onMapFilterChange = () => {
  removePoints(); // удаляет метки

  creatingPoints(filterData(adverts), renderCard); // Создаёт метки уже с фильтрами
};

const onSuccess = (data) => {
  adverts = data.slice();

  disablingFormMapFilter(); // Разблокируеи фильтрацию
  creatingPoints(adverts.slice(0, FINISH_ELEMNT), renderCard); // Создаёт 10 меток сразу

  mapFilters.addEventListener('change', onMapFilterChange);
};

const onError = () => {
  showAlert(TEXT_ALLERT_MESSAGE);
};

map.on('load', () => { //  «инициализация», и когда карта будет готова
  disablingAdForm(); // разблокируем форму
  makeRequest(onSuccess, onError, 'GET');
})
  .setView({
    lat: LAT,
    lng: LNG,
  }, SCALE);


export {
  onButtonResetClick, // Сброс главного пина
};

