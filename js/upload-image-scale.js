const MIN_SCALE = 25;
const MAX_SCALE = 100;
const STEP_SCALE = 25;

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview img');

const resetScale = () => {
  imgUploadPreview.style.transform = '';
};

const updateScale = (value) => {
  scaleControlValue.value = `${value}%`;
  imgUploadPreview.style.transform = `scale(${scaleControlValue.value})`;
};

const scaleControlSmallerClickHandler = () => {
  const startValue = parseInt(scaleControlValue.value, 10);
  if (startValue > MIN_SCALE) {
    updateScale(startValue - STEP_SCALE);
  }
};

const scaleControlBiggerClickHandler = () => {
  const startValue = parseInt(scaleControlValue.value, 10);
  if (startValue < MAX_SCALE) {
    updateScale(startValue + STEP_SCALE);
  }
};

const initScaleControl = () => {
  scaleControlSmaller.addEventListener('click', scaleControlSmallerClickHandler);
  scaleControlBigger.addEventListener('click', scaleControlBiggerClickHandler);
};

export { initScaleControl, resetScale }
