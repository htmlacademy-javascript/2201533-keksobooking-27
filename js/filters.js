import {renderAds} from './map.js';
import {changeState} from './forms.js';
import {throttle} from './utils.js';
import {DELAY_BETWEEN_RENDER_ADS} from './setings.js';

const ID_PREF = 'housing-';
const ANY = 'any';
const PRICE = 'price';
const FEATURES = 'features';
const filterForm = document.querySelector('.map__filters');
const lenIdPref = ID_PREF.length;
const inputs = filterForm.querySelectorAll('select, input');
const price = filterForm.querySelector('#housing-price');
const prices = price.querySelectorAll('option');
const changeStateFilterForm = (enable)=>changeState(filterForm, enable);

const Filter = {
  filter: {},
  features: {},
  prices: {
    low: 0,
    high: 0,
    middle: {
      min: 0,
      max: 0
    }
  },
};

const setPrices = ()=>{
  prices.forEach((option)=>{
    const text = option.textContent;
    switch(option.value){
      case (ANY):{
        break;
      }
      case ('middle'):{
        Filter.prices.middle.min = parseInt(text);
        Filter.prices.middle.max = parseInt(text.substring(text.indexOf('-') + 1));
        break;
      }
      default:{
        Filter.prices[option.value] = parseInt(text.substring(text.indexOf(' ')));
      }
    }
  })
}

const setFilter = (element)=>{
  switch (element.tagName){
    case 'SELECT':
      if (element.value === ANY){
        delete(Filter.filter[element.id.substring(lenIdPref)]);
      }
      else{
        Filter.filter[element.id.substring(lenIdPref)] = element.value;
      }
    break;
    case 'INPUT':
      if (element.type === 'checkbox' && element.checked){
        Filter.features[element.value] = true;
      }
      else{
        delete(Filter.features[element.value]);
      }
      if (Object.keys(Filter.features).length > 0){
        Filter.filter.features = true;
      }
      else{
        delete (Filter.filter.features);
      }
    break;
    default:
  }
};

const setAll = ()=>{
  inputs.forEach((val)=>{setFilter(val)});
};

setAll();
setPrices();

console.log(Filter.prices);

const compareData = (ad)=>{
  for(const key in Filter.filter){
    switch (key){
      case (PRICE):{
        switch(Filter.filter.price){
          case('low'):{
            if (ad.offer.price > Filter.prices.low){
              return false;
            }
            break;
          }
          case('high'):{
            if (ad.offer.price < Filter.prices.high){
              return false;
            }
            break;
          }
          case('middle'):{
            if (ad.offer.price < Filter.prices.middle.min || ad.offer.price > Filter.prices.middle.max){
              return false;
            }
            break;
          }
        }
        break;
      }
      case (FEATURES):{
        for(const keyF in Filter.features){
          if (!ad.offer.features || !ad.offer.features.includes(keyF)){
            return false;
          }
        }
        break;
      }
      default:{
        if(Filter.filter[key] !== ad.offer[key].toString()){
          return false;
        }
      }
    }
  }
  return true;
};

const wrapper = throttle(renderAds, DELAY_BETWEEN_RENDER_ADS);

filterForm.addEventListener('change', (evt)=>{
  setFilter(evt.target);
  wrapper();
});

export {compareData, changeStateFilterForm};
