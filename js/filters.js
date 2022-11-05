import {renderAds} from './map.js';
import {changeState} from './forms.js';
import {debounce} from './utils.js';
import {DELAY_BETWEEN_RENDER_ADS} from './setings.js';

const ID_PREF = 'housing-';
const ANY = 'any';
const PRICE = 'price';
const FEATURES = 'features';
const filterForm = document.querySelector('.map__filters');
const inputs = filterForm.querySelectorAll('select, input[type=checkbox]');

const changeStateFilterForm = (enable)=>changeState(filterForm, enable);

const filters = {
  filter: {},
  features: {},
  prices: {
    lowBorder: 10000,
    highBorder: 50000,
    low: function(val){
      return !(val < this.lowBorder)
    },
    high: function(val){
      return !(val > this.highBorder)
    },
    middle: function(val){
      return !(this.low(val) && this.high(val));
    }
  }
};

const getFilterKey = (id)=>id.substring(ID_PREF.length)

const setFilter = (element)=>{
  switch (element.tagName){
    case 'SELECT':
      if (element.value === ANY){
        delete(filters.filter[getFilterKey(element.id)]);
      }
      else{
        filters.filter[getFilterKey(element.id)] = element.value;
      }
      break;
    case 'INPUT':
      if (element.checked){
        filters.features[element.value] = true;
      }
      else{
        delete(filters.features[element.value]);
      }
      if (Object.keys(filters.features).length > 0){
        filters.filter.features = true;
      }
      else{
        delete (filters.filter.features);
      }
      break;
    default:
  }
};

const setAll = ()=>{
  inputs.forEach((val)=>setFilter(val));
};

setAll();

const compareData = (ad)=>{
  for(const key in filters.filter){
    switch (key){
      case (PRICE):{
        if (filters.prices[filters.filter.price](ad.offer.price)){
          console.log(`${filters.filter.price}: ${ad.offer.price}`);
          return false;
        }
        break;
      }
      case (FEATURES):{
        for(const keyF in filters.features){
          if (!ad.offer.features || !ad.offer.features.includes(keyF)){
            return false;
          }
        }
        break;
      }
      default:{
        if(filters.filter[key] !== ad.offer[key].toString()){
          return false;
        }
      }
    }
  }
  return true;
};

const wrapper_function = debounce(renderAds, DELAY_BETWEEN_RENDER_ADS);

filterForm.addEventListener('change', (evt)=>{
  setFilter(evt.target);
  wrapper_function();
});

const setDefaultFilters = ()=>{
  inputs.forEach((val)=>{
    val.value = ANY;
    val.checked = false;
  });
  setAll();
  wrapper_function();
};

export {compareData, changeStateFilterForm};
export {setDefaultFilters};
