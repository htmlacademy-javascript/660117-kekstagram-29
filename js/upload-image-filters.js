const SLIDER_OPTIONS = {
  chrome: {
    effect: 'grayscale',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
  },
  sepia: {
    effect: 'sepia',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
  },
  marvin: {
    effect: 'invert',
    min: 0,
    max: 100,
    start: 100,
    step: 1,
  },
  phobos: {
    effect: 'blur',
    min: 0,
    max: 3,
    start: 3,
    step: 0.1,
  },
  heat: {
    effect: 'brightness',
    min: 1,
    max: 3,
    start: 3,
    step: 0.1,
  }
}
const UNITS = {
  invert: '%',
  blur: 'px'
}

const MIN_SCALE = 25;
const MAX_SCALE = 100;
const STEP_SCALE = 25;


const effectLevelSlider = document.querySelector('.effect-level__slider');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview').querySelector('img');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
const effectNone = document.querySelector('#effect-none');

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

const resetScale = () => imgUploadPreview.style.transform = '';

const resetStyles = () => imgUploadPreview.style.filter = '';

const setSliderState = () => {
  if(effectNone.checked) {
    imgUploadEffectLevel.classList.add('hidden');
    resetStyles()
  } else {
    imgUploadEffectLevel.classList.remove('hidden');
  }
}

const createFilterStyle = (effect) => {
  const unit = (UNITS[effect])? UNITS[effect] : '';
  imgUploadPreview.style.filter = `${effect}(${effectLevelValue.value}${unit})`;
}

const fillValueFromSlider = (effect) =>{
  effectLevelSlider.noUiSlider.on('update', () => {
    effectLevelValue.value = effectLevelSlider.noUiSlider.get();
    createFilterStyle(effect)
  });
}

const createSliderUpdateOptions = (value) => {
  const {effect, min, max, start, step} = SLIDER_OPTIONS[value];
  effectLevelSlider.noUiSlider.updateOptions ({
    range: {
      min: min,
      max: max
    },
    start: start,
    step: step
  });
  fillValueFromSlider(effect)
}

const effectsListClickHandler = (event) => {
  setSliderState();
  if (event.target.value) {
    createSliderUpdateOptions(event.target.value);
  }
}

const scaleControlSmallerClickHandler = () => {
  const startValue = parseInt(scaleControlValue.value);
  if (startValue > MIN_SCALE) {
    scaleControlValue.value = startValue - STEP_SCALE + '%';
  }
  imgUploadPreview.style.transform = `scale(${scaleControlValue.value})`;
}

const scaleControlBiggerClickHandler = () => {
  const startValue = parseInt(scaleControlValue.value);
  if (startValue < MAX_SCALE) {
    scaleControlValue.value = startValue + STEP_SCALE + '%';
  }
  imgUploadPreview.style.transform = `scale(${scaleControlValue.value})`;
}

const createFilters = () => {
  setSliderState();
  createSlider();
  effectsList.addEventListener('click', effectsListClickHandler);
  scaleControlSmaller.addEventListener('click', scaleControlSmallerClickHandler);
  scaleControlBigger.addEventListener('click', scaleControlBiggerClickHandler);
}

export { createFilters, resetScale };
