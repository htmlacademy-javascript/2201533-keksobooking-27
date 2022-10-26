import {DATA_URL, SUBMIT_URL, MAX_ADS} from './setings.js';
import {loadingDataError} from './errors.js';

const loadData = (renderAds)=>{
  const url = DATA_URL;
  fetch(url)
    .then((response)=>{
      if (response.ok){
        return response.json();
      }
      else{
        throw `status: ${response.status},
          statusText: ${response.statusText}`;
      }
    })
    .then((data)=>renderAds(data.slice(0, MAX_ADS)))
    .catch((msg)=>loadingDataError(msg));
};

const submitForm = (form, onSuccess, onError)=>{
  const url = SUBMIT_URL;
  fetch(url,{
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
