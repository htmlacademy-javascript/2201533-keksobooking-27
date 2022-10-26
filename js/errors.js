const onEsc = (evt)=>{
  if (evt.key === 'Escape'){
    document.dispatchEvent(new Event('removeEvents'));
  }
};
const onClick = ()=>document.dispatchEvent(new Event('removeEvents'));

const removeEvents = ()=>{
  document.querySelector('#this_element_need_delete').remove();
  document.removeEventListener('keydown', onEsc);
  document.removeEventListener('click', onClick);
  document.removeEventListener('removeEvents', removeEvents);
};

const addEvents = ()=>{
  document.addEventListener('keydown', onEsc);
  document.addEventListener('click', onClick, {once: true});
  document.addEventListener('removeEvents', removeEvents);
};

const renderMessage = (fragment)=>{
  fragment.querySelector('div').id = 'this_element_need_delete';
  document.body.append(fragment);
  addEvents();
};
const loadingDataError = (msg)=>{
  const template = document.querySelector('#error_load_ads').content;
  const error = template.cloneNode(true);
  error.querySelector('.error__message').textContent = msg;
  renderMessage(error);
};

const submitSuccess = ()=>{
  const template = document.querySelector('#success').content;
  const success = template.cloneNode(true);
  renderMessage(success);
};
const submitError = ()=>{
  const template = document.querySelector('#error').content;
  const error = template.cloneNode(true);
  renderMessage(error);
};

export {loadingDataError, submitError, submitSuccess};
