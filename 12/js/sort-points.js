const FINISH_ELEMNT = 10;
const DEFAULT_VALUE = 'any';

const priceHousing = {
  'low': {
    start: 0,
    end: 10000,
  },
  middle: {
    start: 10000,
    end: 50000,
  },
  high: {
    start: 50000,
    end: Infinity, // числовым значением, представляющим бесконечность
  },
};

const mapFilters = Array.from(document.querySelector('.map__filters').querySelectorAll('select, fieldset'));

const filterRules = {
  'housing-type': (data, filter) => filter.value === data.offer.type,
  'housing-price': (data, filter) => data.offer.price >= priceHousing[filter.value].start && data.offer.price < priceHousing[filter.value].end,
  'housing-rooms': (data, filter) => +filter.value === data.offer.rooms, // value преобразовываем в число
  'housing-guests': (data, filter) => +filter.value === data.offer.guests,
  'housing-features': (data, filter) => {
    let featuresChecked = []; // выбранные поля всё время меняются поэтому let
    featuresChecked = Array.from(filter.querySelectorAll('input[type="checkbox"]:checked')); // выбранные поля всё время меняются поэтому let
    return data.offer.features ? featuresChecked.every((checkbox) => data.offer.features.includes(checkbox.value)) : !(featuresChecked.length > 0);
  },
};

const filterData = (data) => {
  const filteredOffers = [];
  let i = 0;
  let result;

  while (i < data.length && filteredOffers.length < FINISH_ELEMNT) {
    result = mapFilters.every((filter) => (filter.value === DEFAULT_VALUE) ? true : filterRules[filter.id](data[i], filter));


    if (result) {
      filteredOffers.push(data[i]);
    }

    i++;
  }

  return filteredOffers;
};


export {
  filterData, // фильтрация по выбранным полям
};
