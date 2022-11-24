const MINIMUM_VALUE = 0;
const MAXIMUM_VALUE = 100000;
const STEP_CHANGE = 1;

const sliderElement = document.querySelector('.ad-form__slider');
const price = document.querySelector('#price');
const resetButton = document.querySelector('.ad-form__reset');


noUiSlider.create(sliderElement, {
  range: {
    min: MINIMUM_VALUE,
    max: MAXIMUM_VALUE,
  },
  start: price.placeholder,
  step: STEP_CHANGE,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('slide', () => {
  price.value = sliderElement.noUiSlider.get();
});


price.addEventListener('input', () => {
  sliderElement.noUiSlider.set(price.value);
});


const resetSlider = () => {
  sliderElement.noUiSlider.reset();
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  resetSlider();
});

export {
  resetSlider,
};
