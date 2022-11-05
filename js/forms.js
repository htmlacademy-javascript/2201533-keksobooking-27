import {declineNouns} from './utils.js';
import {setDefaultFilters} from './filters.js';
import {setDefaultMap} from './map.js';
import {setDefaultPhoto} from './photos.js';
import {
  TYPES_ATTRIBUTES,
  MAP_CENTER,
  COORDINATES_PRECISION,
  STEP_PRICE,
  RADIX,
} from './setings.js';
import {submitForm} from './real-data.js';
import {renderSubmitSuccess, renderSubmitError} from './errors.js';

const PRISTINE_CONFIG = {
  classTo: 'classTo',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'classTo',
  errorTextClass: 'text-help'
};

const LOT_OF_ROOMS = 100;

const adForm = document.querySelector('.ad-form');
const selectType = adForm.querySelector('#type');
const inputPrice = adForm.querySelector('#price');
const selectRooms = adForm.querySelector('#room_number');
const selectGuests = adForm.querySelector('#capacity');
const inputAddress = adForm.querySelector('#address');
const fieldTimes = adForm.querySelector('.ad-form__element--time');
const selectTimes = fieldTimes.querySelectorAll('select');
const forms = document.querySelectorAll('form');
const priceSliderContainer = adForm.querySelector('.ad-form__slider');
const resetButton = adForm.querySelector('.ad-form__reset');
const submitButton = adForm.querySelector('.ad-form__element--submit');
//Перевод форм во включенное или отключенное состояние

const changeState = (form, enable)=>{
  if (enable){
    form.classList.remove('ad-form--disabled');
  }
  else{
    form.classList.add('ad-form--disabled');
  }
  for (const child of form.children) {
    child.disabled = !enable;
  }
};

const changeStateAdForm = (enable)=>changeState(adForm, enable);


//Это для пристины

adForm.querySelectorAll('fieldset').forEach(
  (element)=>element.classList.add('classTo'));

adForm.querySelectorAll('input').forEach((e)=>{
  if (e.required){
    e.dataset.pristineRequiredMessage = 'Обязательное поле';
  }
  if (e.minLength > -1){
    e.dataset.pristineMinlengthMessage =
      `Минимальная длина ${e.minLength}  ${declineNouns(e.minLength, 'символ')}`;
  }
  if (e.maxLength > -1){
    e.dataset.pristineMaxlengthMessage =
      `Максимальная длина ${e.minLength}  ${declineNouns(e.maxLength, 'символ')}`;
  }
  if (e.max !== ''){
    e.dataset.pristineMaxMessage =
      `Максимальное значение ${e.max}`;
  }
});

const pristine = new Pristine(adForm, PRISTINE_CONFIG);

noUiSlider.create(priceSliderContainer, {
  range: {
    min: parseInt(inputPrice.min, RADIX),
    max: parseInt(inputPrice.max, RADIX),
  },
  start: parseInt(inputPrice.min, RADIX),
  step: STEP_PRICE,
  connect: 'lower',
  format: {
    to: (value)=>value.toFixed(0),
    from: (value)=>parseInt(value, RADIX)
  },
});

const priceSlider = priceSliderContainer.querySelector('.noUi-handle');

const setSliderParam = (minPrice)=>{
  priceSliderContainer.noUiSlider.updateOptions({
    range: {
      min: minPrice,
      max: parseInt(inputPrice.max, RADIX)
    }
  });
};

const setPriceFieldParam = ()=>{
  const minPrice = TYPES_ATTRIBUTES[selectType.selectedOptions[0].value].minPrice;
  setSliderParam(minPrice);
  inputPrice.min = minPrice;
  inputPrice.placeholder = `${minPrice} - ${inputPrice.max
  }`;
  inputPrice.pristine.params.min[1] = minPrice;
  inputPrice.pristine.messages.en.min = `Минимальное значение: ${minPrice}`;
};

const fillAddress = (location)=>{
  inputAddress.value = `${location.lat.toFixed(COORDINATES_PRECISION)},
  ${location.lng.toFixed(COORDINATES_PRECISION)}`;
};

const setDefault = ()=>{
  adForm.reset();
  setPriceFieldParam();
  priceSliderContainer.noUiSlider.updateOptions({
    start: parseInt(inputPrice.min, RADIX)
  });
  fillAddress(MAP_CENTER);
  setDefaultFilters();
  setDefaultMap();
  setDefaultPhoto();
};

fillAddress(MAP_CENTER);
resetButton.addEventListener('click', (evt)=>{
  evt.preventDefault();
  setDefault();
});

forms.forEach((form)=>changeState(form, false));

priceSliderContainer.noUiSlider.on('update', () => {
  if (document.activeElement === priceSlider){
    inputPrice.value = priceSliderContainer.noUiSlider.get();
    pristine.validate(inputPrice);
  }
});

inputPrice.addEventListener('input', ()=>{
  priceSliderContainer.noUiSlider.set(inputPrice.value);
});

selectType.addEventListener('change', ()=>setPriceFieldParam());

fieldTimes.addEventListener('change', (evt)=>
  selectTimes.forEach((select)=>{
    select.selectedIndex = evt.target.selectedIndex;
  })
);

const validateGuests = ()=>{
  const rooms = parseInt(selectRooms.selectedOptions[0].value, RADIX);
  const guests = parseInt(selectGuests.selectedOptions[0].value, RADIX);
  return (guests <= rooms && rooms !== LOT_OF_ROOMS && guests !== 0) || (guests === 0 && rooms === LOT_OF_ROOMS);
};

const getRoomsErrorMessage = ()=>'Количество гостей не соответствует количеству комнат';

const getGuestsErrorMessage = ()=>{
  const options = {};
  selectGuests.querySelectorAll('option').forEach((option)=>{
    options[option.value] = option.textContent;
  });
  const variants = [];
  const rooms = parseInt(selectRooms.selectedOptions[0].value, RADIX);
  if (rooms === LOT_OF_ROOMS) {
    variants.push(options[0]);
  }
  else{
    for (let i = 1; i <= rooms; i++){
      variants.push(options[i]);
    }
  }
  return `Возможные варианты: ${variants.join(', ')}.`;
};

pristine.addValidator(selectRooms, validateGuests, getRoomsErrorMessage);
pristine.addValidator(selectGuests, validateGuests, getGuestsErrorMessage);

const validateRoomsGuests = ()=>{
  pristine.validate(selectRooms);
  pristine.validate(selectGuests);
};

selectRooms.addEventListener('change', ()=>validateRoomsGuests());
selectGuests.addEventListener('change', ()=>validateRoomsGuests());

const onSuccessAdForm = ()=>{
  submitButton.classList.remove('ad-form--disabled');
  setDefault();
  renderSubmitSuccess();
};

const onErrorAdForm = ()=>{
  renderSubmitError();
};

adForm.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  const valid = pristine.validate();
  if (valid) {
    submitButton.classList.add('ad-form--disabled');
    submitForm(adForm, onSuccessAdForm, onErrorAdForm);
  }
});

export {fillAddress, changeStateAdForm, changeState};
