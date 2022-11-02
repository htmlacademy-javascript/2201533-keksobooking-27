import {DATA_URL, MAX_ADS, SUBMIT_URL} from './setings.js';
import {loadingDataError} from './errors.js';

const loadData = (renderAds)=>
  fetch(DATA_URL)
    .then((response)=>{
      if (response.ok){
        return response.json();
      }
      throw `status: ${response.status},
        statusText: ${response.statusText}`;
    })
    .then((data)=>renderAds(data.slice(0, MAX_ADS)))
    .catch(loadingDataError);


const submitForm = (form, onSuccess, onError)=>{
  fetch(SUBMIT_URL,{
    method: 'POST',
    body: new FormData(form)
  })
    .then((response)=>{
      if (response.ok){
        onSuccess();
      }
      else{
        onError();
      }
    });
};

export {loadData, submitForm};
