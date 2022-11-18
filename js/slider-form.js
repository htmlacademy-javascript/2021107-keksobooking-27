const sliderElement = document.querySelector('.ad-form__slider');
const price = document.querySelector('#price'); // Цена за ночь
const resetButton = document.querySelector('.ad-form__reset');


noUiSlider.create(sliderElement, { // Создадим слайдер
  range: {
    min: 0,
    max: 100000,
  },
  start: price.placeholder,
  step: 1,
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

// сброс карты(RESET)
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  sliderElement.noUiSlider.reset(); // начальное значение устанавливать вызовом метода .set() у свойства noUiSlider
});
