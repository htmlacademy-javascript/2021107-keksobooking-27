import { disablingAdForm } from './form.js';

const resetButton = document.querySelector('.ad-form__reset');
const address = document.querySelector('#address');


// Создадим карту
const map = L.map('map-canvas')
  .on('load', () => { //  «инициализация», и когда карта будет готова
    disablingAdForm(); // разблокируем форму
  })
  .setView({
    lat: 35.6895,
    lng: 139.752465,
  }, 11);

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
    lat: 35.666881,
    lng: 139.752465,
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
    lat: 35.666881,
    lng: 139.754465,
  });

  map.setView({ //  возвращение к начальным значениям масштаба и центра карты
    lat: 35.6895,
    lng: 139.692,
  }, 11);
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

    marker.addTo(map)
      .bindPopup(card(point)); // привяжем к каждой нашей метке балун bindPopup(), чтобы по клику на неё показывалась информация о месте
  });
};

export {
  creatingPoints, // Добавление второстепенных пинов на карту
  onButtonResetClick, // Сброс главного пина
};
