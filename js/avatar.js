const DEFAULT_AVATAR = '../img/muffin-grey.svg';
const FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];

const fileChooserAccaunt = document.querySelector('.ad-form__field input[type=file]');
const previewAccaunt = document.querySelector('.ad-form-header__preview img');
const fileChooserHouse = document.querySelector('.ad-form__upload input[type=file]');
const previewHouse = document.querySelector('.ad-form__photo');


const isValidType = (file) => FILE_TYPES.some((it) => file.endsWith(it));

fileChooserAccaunt.addEventListener('change', () => {
  const file = fileChooserAccaunt.files[0];
  const fileName = file.name.toLowerCase();

  const isMatches = isValidType(fileName);

  if (isMatches) {
    previewAccaunt.src = URL.createObjectURL(file);
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
  previewAccaunt.src = DEFAULT_AVATAR;
  previewHouse.innerHTML = '';
};


export {
  resetImages,
};
