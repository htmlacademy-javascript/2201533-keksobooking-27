import {declension} from './utils.js';
import {TYPES_ATTRIBUTES} from './setings.js';

const adForm = document.querySelector('.ad-form');
const selectType = adForm.querySelector('#type');
const inputPrice = adForm.querySelector('#price');
const selectRooms = adForm.querySelector('#room_number');
const selectGuests = adForm.querySelector('#capacity');
const inputAddress = adForm.querySelector('#address');
const inputTitle = adForm.querySelector('#title');

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

//Это для пристины

adForm.querySelectorAll('fieldset').forEach(
  (e)=>e.classList.add('classTo'));

adForm.querySelectorAll('input').forEach((e)=>{
  if (e.required){
    e.dataset.pristineRequiredMessage = 'Обязательное поле';
  }
  if (e.minLength > -1){
    e.dataset.pristineMinlengthMessage =
      `Минимальная длина ${e.minLength}  ${declension(e.minLength, 'символ')}`;
  }
  if (e.maxLength > -1){
    e.dataset.pristineMaxlengthMessage =
      `Максимальная длина ${e.minLength}  ${declension(e.maxLength, 'символ')}`;
  }
  if (e.max !== ''){
    e.dataset.pristineMaxMessage =
      `Максимальное значение ${e.max}`;
  }
});

const pristineConfig = {
  classTo: 'classTo',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'classTo',
  errorTextClass: 'text-help'
};

const pristine = new Pristine(adForm, pristineConfig);


const priceFieldParam = ()=>{
  const minPrice = TYPES_ATTRIBUTES[selectType.selectedOptions[0].value].minPrice;
  inputPrice.min = minPrice;
  inputPrice.placeholder = `${minPrice} - ${inputPrice.max
  }`;
  inputPrice.pristine.params.min[1] = minPrice;
  inputPrice.pristine.messages.en.min = `Минимальное значение: ${minPrice}`;
};

priceFieldParam();
selectType.addEventListener('change', priceFieldParam);

const validateGuests = ()=>{
  const rooms = Number(selectRooms.selectedOptions[0].value);
  const guests = Number(selectGuests.selectedOptions[0].value);
  return (guests <= rooms && rooms !== 100 && guests !== 0) || (guests === 0 && rooms === 100);
};

const getRoomsErrorMessage = ()=>'Количество гостей не соответствует количеству комнат';

const getGuestsErrorMessage = ()=>{
  const options = {};
  selectGuests.querySelectorAll('option').forEach((option)=>{
    options[option.value] = option.textContent;
  });
  const variants = [];
  const rooms = Number(selectRooms.selectedOptions[0].value);
  if (rooms === 100) {
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
validateRoomsGuests();
selectRooms.addEventListener('change', validateRoomsGuests);
selectGuests.addEventListener('change', validateRoomsGuests);

adForm.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  const valid = pristine.validate();
  if (valid) {
    adForm.submit();
  }
});

//Это временный вспомогательный код
inputAddress.value = 'Где то в центре Токио';
inputTitle.value = 'Милая, уютная квартирка в центре Токио';
const forms = document.querySelectorAll('form');
const promo = document.querySelector('.promo');
promo.addEventListener('click', ()=>{
  forms.forEach((form)=>{
    changeState(form, form.classList.contains('ad-form--disabled'));
  });
});

