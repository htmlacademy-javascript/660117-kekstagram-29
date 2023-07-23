const FILE_TYPES = ['.jpg', '.jpeg', '.png', '.webp'];

const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');

const insertPhoto = () => {
  const photo = imgUploadInput.files[0];
  const photoName = photo.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => photoName.endsWith(it));
  if (matches) {
    const photoURL = URL.createObjectURL(photo);
    imgUploadPreview.src = photoURL;
    effectsPreviews.forEach((element) => {
      element.style.backgroundImage = `url(${photoURL})`;
    });
  }
};

export { insertPhoto };
