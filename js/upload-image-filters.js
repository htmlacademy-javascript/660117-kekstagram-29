const effectLevelSlider = document.querySelector('.effect-level__slider');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview').querySelector('img');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
const effectNone = document.querySelector('#effect-none');
let effect;


const createSlider = () => {
  noUiSlider.create(effectLevelSlider,{
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  });
}

const resetStyles = () => {
  imgUploadPreview.style.filter = '';
  imgUploadPreview.style.transform = '';
}

const setSliderState = () => {
  if(effectNone.checked) {
    imgUploadEffectLevel.classList.add('hidden');
    resetStyles()
  } else {
    imgUploadEffectLevel.classList.remove('hidden');
  }
}

const createFilterStyle = () => {
  if(effect === 'invert'){
    imgUploadPreview.style.filter = `${effect}(${effectLevelValue.value}%)`;
  }
  if(effect === 'blur'){
    imgUploadPreview.style.filter = `${effect}(${effectLevelValue.value}px)`;
  }
  else {
    imgUploadPreview.style.filter = `${effect}(${effectLevelValue.value})`;
  }
}

const fillValueFromSlider = () =>{
  effectLevelSlider.noUiSlider.on('update', () => {
    effectLevelValue.value = effectLevelSlider.noUiSlider.get();
    createFilterStyle();
  });
}

const createSliderUpdateOptions = (currentEffect, min, max, start, step) => {
  effect = currentEffect;
  effectLevelSlider.noUiSlider.updateOptions ({
    range: {
      min: min,
      max: max
    },
    start: start,
    step: step,
  })
}

const effectsListClickHandler = (event) => {
  setSliderState();
  if(event.target.closest('#effect-chrome')) {
    createSliderUpdateOptions('grayscale',0, 1, 1, 0.1);
  }
  if(event.target.closest('#effect-sepia')) {
    createSliderUpdateOptions('sepia',0, 1, 1, 0.1);
  }
  if(event.target.closest('#effect-marvin')) {
    createSliderUpdateOptions('invert',0, 100, 100, 1);
  }
  if(event.target.closest('#effect-phobos')) {
    createSliderUpdateOptions('blur',0, 3, 3, 0.1);
  }
  if(event.target.closest('#effect-heat')) {
    createSliderUpdateOptions('brightness',0, 3, 3, 0.1);
  }
}

const scaleControlSmallerClickHandler = () => {
  const startValue = parseInt(scaleControlValue.value, 10);
  if (startValue > 25) {
    scaleControlValue.value = startValue - 25 + '%';
  }
  imgUploadPreview.style.transform = `scale(${scaleControlValue.value})`;
}

const scaleControlBiggerClickHandler = () => {
  const startValue = parseInt(scaleControlValue.value, 10);
  if (startValue < 100) {
    scaleControlValue.value = startValue + 25 + '%';
  }
  imgUploadPreview.style.transform = `scale(${scaleControlValue.value})`;
}

const createFilters = () => {
  setSliderState();
  createSlider();
  fillValueFromSlider();
  effectsList.addEventListener('click', effectsListClickHandler);
  scaleControlSmaller.addEventListener('click', scaleControlSmallerClickHandler);
  scaleControlBigger.addEventListener('click', scaleControlBiggerClickHandler);
}

export { createFilters };
