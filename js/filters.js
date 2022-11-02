import {MAX_ADS} from './setings.js';
const ID_PREF = 'housing-';
const ANY = 'any';
const PRICE = 'price';
const FEATURES = 'features';
const filterForm = document.querySelector('.map__filters');
const lenIdPref = ID_PREF.length;
const inputs = filterForm.querySelectorAll('select, input');
const price = filterForm.querySelector('#housing-price');
const prices = price.querySelectorAll('option');

const Filter = {
  filter: {},
  features: {},
  data: [],
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

const setData = (data)=>{
    Filter.data = data;
    return data.slice(0, MAX_ADS);
};

/*offer:
  features:
    Array(4)
      0: "washer"
      1: "elevator"
      2: "wifi"
      3: "dishwasher"
  guests: 2
  price: 35000
  rooms: 3
  type: "palace"*/

const compareData = (dat)=>{
  for(const key in Filter.filter){
    console.log(key);
    switch (key){
      case (PRICE):{
        console.log(Filter.filter.price);
        switch(Filter.filter.price){
          case('low'):{

            if (dat.offer.price > Filter.prices.low){
              return false;
            }
            break;
          }
          case('high'):{
            if (dat.offer.price < Filter.prices.high){
              return false;
            }
            break;
          }
          case('middle'):{
            if (dat.offer.price < Filter.prices.middle.min || dat.offer.price > Filter.prices.middle.max){
              return false;
            }
            break;
          }
        }
        //console.log(`${key}: ${Filter.filter[key]}`);
        break;
      }
      case (FEATURES):{
        for(const keyF in Filter.features){
          console.log(`${keyF}: ${dat.offer.features.includes(keyF)}`);
          if (!dat.offer.features.includes(keyF)){
            return false;
          }
        }
        break;
      }
      default:{
        console.log(`filter: ${Filter.filter[key]}, data: ${dat.offer[key]} итог:${Filter.filter[key] ===
        dat.offer[key].toString()}`);
        if(Filter.filter[key] !== dat.offer[key].toString()){
          return false;
        }
      }
    }
  }
  return true;
};

const getFilteredData = (evt)=>{
  setFilter(evt.target);
  const dat = Filter.data[1];
  console.log('----------------------------------------');
  console.log(Filter.filter);
  console.log(dat);
//  console.log(dat.offer.features);
  console.log(compareData(dat));
  //return data.slice(0, MAX_ADS);
};

filterForm.addEventListener('change', getFilteredData);

export {setData, getFilteredData};
