const sliderElement = document.querySelector('.ad-form__slider');
const price = document.querySelector('#price'); // Цена за ночь
const resetButton = document.querySelector('.ad-form__reset');
const MINIMUM_VALUE = 0;
const MAXIMUM_VALUE = 100000;
const STEP_CHANGE = 1;


noUiSlider.create(sliderElement, { // Создадим слайдер
  range: {
    min: MINIMUM_VALUE,
    max: MAXIMUM_VALUE,
  },
  start: price.placeholder,
  step: STEP_CHANGE,
  connect: 'lower', // с какой стороны закрашивать слайдер
  format: { //  методы форматирования
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) { // должен строго возвращать число, поэтому используем parseFloat()
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('slide', () => { // слушатель события update(в моём случае slide), которое будет вызвано при изменении положения слайдера
  price.value = sliderElement.noUiSlider.get();
});

// сброс слайдера
const resettingSlider = () => {
  sliderElement.noUiSlider.reset();
};

// сброс карты(RESET)
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  // sliderElement.noUiSlider.reset(); // начальное значение устанавливать вызовом метода .set() у свойства noUiSlider
  resettingSlider();
});

export {
  resettingSlider, // Сброс слайдера в начало
};
