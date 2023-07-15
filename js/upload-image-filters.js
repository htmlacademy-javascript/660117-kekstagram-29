const SLIDER_OPTIONS = {
  chrome: {
    effect: 'grayscale',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    unit: '',
  },
  sepia: {
    effect: 'sepia',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    unit: '',
  },
  marvin: {
    effect: 'invert',
    min: 0,
    max: 100,
    start: 100,
    step: 1,
    unit: '%',
  },
  phobos: {
    effect: 'blur',
    min: 0,
    max: 3,
    start: 3,
    step: 0.1,
    unit: 'px',
  },
  heat: {
    effect: 'brightness',
    min: 1,
    max: 3,
    start: 3,
    step: 0.1,
    unit: '',
  },
  default: {
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    connect: 'lower',
  }
}

const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.img-upload__effects');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
const imgUploadPreview = document.querySelector('.img-upload__preview img');

const createSlider = () => {
  const {min, max, start, step, connect} = SLIDER_OPTIONS.default;
  noUiSlider.create(effectLevelSlider,{
    range: {
      min: min,
      max: max
    },
    start: start,
    step: step,
    connect: connect,
  });
};

const fillValueFromSlider = (effect, unit) =>{
  effectLevelSlider.noUiSlider.on('update', () => {
    effectLevelValue.value = effectLevelSlider.noUiSlider.get();
    imgUploadPreview.style.filter = `${effect}(${effectLevelValue.value}${unit})`;
  });
};

const createSliderUpdateOptions = (value) => {
  const {effect, min, max, start, step, unit} = SLIDER_OPTIONS[value];
  effectLevelSlider.noUiSlider.updateOptions ({
    range: {
      min: min,
      max: max
    },
    start: start,
    step: step
  });
  fillValueFromSlider(effect, unit);
};

const setSliderState = (value) => {
  if(value === 'none') {
    imgUploadEffectLevel.classList.add('hidden');
    imgUploadPreview.style.filter = '';
    return;
  }
  imgUploadEffectLevel.classList.remove('hidden');
  createSliderUpdateOptions(value);
};

const effectsListChangeHandler = (event) => {
  setSliderState(event.target.value);
};

const createFilters = () => {
  createSlider();
  effectsList.addEventListener('change', effectsListChangeHandler);
}

export { createFilters, setSliderState};
