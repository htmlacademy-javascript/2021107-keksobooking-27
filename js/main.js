import { disablingAdForm, disablingFormMapFilter, onUserFormSubmit, resettingForm, onResetClick } from './form.js';
import { onButtonResetClick } from './map.js';
import './slider-form.js';
import './message-user.js';
// import './sort-points.js';
console.log('filterData');

disablingAdForm();
disablingFormMapFilter();

onUserFormSubmit(resettingForm, onButtonResetClick); // сброс формы после успешной отпрвавки
onResetClick(); // кнопка сброс
