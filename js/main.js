import { disablingAdForm, disablingFormMapFilter } from './form.js';
import { creatingPoints } from './map.js';
import { renderCard } from './offer-card.js';
import './slider-form.js';

const FINISH_ELEMNT = 10;

disablingAdForm();
disablingFormMapFilter();

// fetch('https://27.javascript.pages.academy/keksobooking/data')
//   .then((response) => response.json())
//   .then((wizards) => {
//     console.log(wizards);
//   });

fetch('https://27.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((rooms) => {
    creatingPoints(rooms.slice(0, FINISH_ELEMNT), renderCard);
  });
