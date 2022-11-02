// родитель форма
const formAd = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');
const disabledFields = document.querySelectorAll('fieldset, select.map__filter');

// Функция добавления/удаления disabled у элементов с классами fieldset, select.map__filter
const disablingEnablingForm = () => {
  disabledFields.forEach((fieldItem) => {
    // меняем состояние disabled на противоположное
    fieldItem.disabled = !fieldItem.disabled;
  });
};

// функция включения/выключения неактивного состояния у формы
const disablingForm = () => {
  // с помощью classList.toggle если нет/есть класс то добавляем/удаляем класс
  formAd.classList.toggle('ad-form--disabled');
  mapFilter.classList.toggle('map__filters--disabled');

  disablingEnablingForm();
};


disablingForm();

