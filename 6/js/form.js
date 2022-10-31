// родитель форма
const formAds = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');


//функция включения неактивного состояния у формы
const disablingForm = (teg) => {
  // Добавляем класс с окончанием--disabled к форме
  teg.classList.add(`${teg.classList}--disabled`);

  // Все интерактивные элементы формы должны быть заблокированы с помощью атрибута disabled
  const fieldsets = teg.querySelectorAll('fieldset, select'); // выбираем теги fieldset и select
  // перебираем forEach и каждому fieldset с помощью fieldset.disabled = true ставим атрибут disabled
  fieldsets.forEach((fieldset) => {
    // fieldset.setAttribute('disabled', 'disabled');
    fieldset.disabled = true;
  });
};

//функция выключения неактивного состояния у формы
const enablingForm = (teg) => {
  //  Удаляем 2 класс (с окончанием--disabled) у формы
  teg.classList.remove(teg.classList[1]);

  // Все интерактивные элементы формы должны быть разблокированы с помощью удаления атрибута disabled
  const fieldsets = teg.querySelectorAll('fieldset, select'); // выбираем теги fieldset и select
  // перебираем forEach и каждому fieldset с помощью fieldset.disabled = false удаляем атрибут disabled
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });
};


// Выключение формы .ad-form
disablingForm(formAds);
// Выключение формы .map__filters
disablingForm(mapFilter);

// Включение формы
enablingForm(formAds);
enablingForm(mapFilter);
