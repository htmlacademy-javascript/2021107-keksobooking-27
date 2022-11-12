import { showAlert } from './utils.js';
import { disablingAdForm, disablingFormMapFilter, onUserFormSubmit, resettingForm, onResetClick } from './form.js';
import { creatingPoints, onButtonResetClick } from './map.js';
import { renderCard } from './offer-card.js';
import './slider-form.js';
import './message-user.js';
import {getData} from './api.js';

const FINISH_ELEMNT = 10;
const TEXT_ALLERT_MESSAGE = 'Данные не загрузились. Попробуйте ещё раз.';

disablingAdForm();
disablingFormMapFilter();

// AJAX-запрос на получение данных
getData(creatingPoints, renderCard, FINISH_ELEMNT, showAlert, TEXT_ALLERT_MESSAGE);

onUserFormSubmit(resettingForm, onButtonResetClick); // сброс формы после успешной отпрвавки
onResetClick(); // кнопка сброс
