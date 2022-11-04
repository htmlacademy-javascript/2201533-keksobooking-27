import {DATA_URL, SUBMIT_URL} from './setings.js';
import {loadingDataError} from './errors.js';

let data = [];

const setData = (res)=>{
  data = res
};

const loadData = ()=>
  fetch(DATA_URL)
    .then((response)=>{
      if (response.ok){
        return response.json();
      }
      throw `status: ${response.status},
        statusText: ${response.statusText}`;
    })
    .then(setData)
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

const getData = ()=>data;

export {loadData, submitForm, getData};
