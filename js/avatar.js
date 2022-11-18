const fileChooserAccaunt = document.querySelector('.ad-form__field input[type=file]');
const previewAccaunt = document.querySelector('.ad-form-header__preview img');
const fileChooserHouse = document.querySelector('.ad-form__upload input[type=file]');
const previewHouse = document.querySelector('.ad-form__photo');

const DEFAULT_AVATAR = '../img/muffin-grey.svg';


const FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif']; // допустимыми расширениями

const isValidType = (file) => FILE_TYPES.some((it) => file.endsWith(it)); // endsWith()Метод определяет, заканчивается ли строка символами указанной строки

fileChooserAccaunt.addEventListener('change', () => {
  const file = fileChooserAccaunt.files[0]; // единственный в списке файл получить по индексу, он у него будет всегда 0
  // name — свойство, в котором хранится имя файла
  const fileName = file.name.toLowerCase(); //  имя файла приведём к строчным буквам

  // оканчивается ли имя файла одним из допустимых расширений
  const matches = isValidType(fileName);

  // Метод some возвращает булево значение, поэтому мы можем результат выполнения этого метода использовать в условии
  if (matches) {
    previewAccaunt.src = URL.createObjectURL(file); // URL.createObjectURL() позволяет сделать ссылку на содержимое
  }
});


const onImageChange = () => {
  const file = fileChooserHouse.files[0];
  const fileName = file.name.toLowerCase();

  if (file && isValidType(fileName)) {
    previewHouse.innerHTML = '';
    const image = document.createElement('img');
    image.src = URL.createObjectURL(file);
    image.style.maxWidth = '100%';
    image.style.height = 'auto';
    previewHouse.append(image);
  }

};

fileChooserHouse.addEventListener('change', () => {
  onImageChange();
});

const resetImages = () => {
  previewAccaunt.innerHTML = '';
  previewAccaunt.src = DEFAULT_AVATAR;
  previewHouse.innerHTML = '';
};


export {
  resetImages,
};
