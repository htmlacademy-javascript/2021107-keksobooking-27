// родитель форма
const formAds = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');


//функция включения неактивного состояния у формы
const disablingForm = (teg) => {
  // Добавляем класс с окончанием--disabled к форме
  teg.classList.add(`${teg.classList}--disabled`); // arrayItem.classList[1].replace('popup__feature--', '')

  // Все интерактивные элементы формы должны быть заблокированы с помощью атрибута disabled
  const fieldsets = teg.querySelectorAll('fieldset');
  // перебираем forEach и каждому fieldset с помощью setAttribute ставим атрибут disabled="disabled"
  fieldsets.forEach((fieldset) => {
    fieldset.setAttribute('disabled', 'disabled');
  });
};


// Форма заполнения информации об объявлении .ad-form
disablingForm(formAds);
// Форма с фильтрами .map__filters
disablingForm(mapFilter);


export {
  disablingForm, //перевод страницы в неактивное состояние
};
