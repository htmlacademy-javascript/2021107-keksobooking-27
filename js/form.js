// родитель форма
const adForm = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');

// Функция добавления/удаления disabled у элементов с классами fieldset, select.map__filter
const disablingEnablingForm = (form) => {
  form.querySelectorAll('fieldset, select.map__filter').forEach((fieldItem) => {
    // меняем состояние disabled на противоположное
    fieldItem.disabled = !fieldItem.disabled;
  });
};


// функция включения/выключения неактивного состояния у формы
const disablingAdForm = () => {
  // с помощью classList.toggle если нет/есть класс то добавляем/удаляем класс
  adForm.classList.toggle('ad-form--disabled');

  disablingEnablingForm(adForm);
};

const disablingFormMapFilter = () => {
  // с помощью classList.toggle если нет/есть класс то добавляем/удаляем класс
  mapFilter.classList.toggle('ad-form--disabled');

  disablingEnablingForm(mapFilter);
};


export {
  disablingAdForm, // включения/выключения формы adForm
  disablingFormMapFilter, // включения/выключения формы mapFilter
};

