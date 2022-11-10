import { showAlert } from './utils.js';
import { disablingAdForm, disablingFormMapFilter, onUserFormSubmit, resettingForm, onResetClick } from './form.js';
import { creatingPoints, onButtonResetClick } from './map.js';
import { renderCard } from './offer-card.js';
import './slider-form.js';
import './message-user.js';

const FINISH_ELEMNT = 10;

disablingAdForm();
disablingFormMapFilter();

// AJAX-запрос на получение данных
fetch('https://27.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json()) //  объект ответа Response;  превратить ответ в понятный нам вид, нужно вызвать метод json
  .then((rooms) => {
    creatingPoints(rooms.slice(0, FINISH_ELEMNT), renderCard); // обрезка до нужного количества
  })
  .catch(() => {
    showAlert('Данные не загрузились. Попробуйте ещё раз'); // Ошибка при загрузке
  });

onUserFormSubmit(resettingForm, onButtonResetClick); // сброс формы после успешной отпрвавки
onResetClick(); // кнопка сброс
