const ESC_KEY = 'Escape';
const onEsc = (evt)=>{
  if (evt.key === ESC_KEY){
    onRemoveEvents();
  }
};

const onClick = ()=>onRemoveEvents();

function onRemoveEvents (){
  document.querySelector('#this_element_need_delete').remove();
  document.removeEventListener('keydown', onEsc);
  document.removeEventListener('click', onClick);
}

const addEvents = ()=>{
  document.addEventListener('keydown', onEsc);
  document.addEventListener('click', onClick, {once: true});
  document.addEventListener('removeEvents', onRemoveEvents);
};

const renderMessage = (fragment)=>{
  fragment.querySelector('div').id = 'this_element_need_delete';
  document.body.append(fragment);
  addEvents();
};

const renderLoadingDataError = (msg)=>{
  const template = document.querySelector('#error_load_ads').content;
  const error = template.cloneNode(true);
  error.querySelector('.error__message').textContent = msg;
  renderMessage(error);
};

const renderSubmitSuccess = ()=>{
  const template = document.querySelector('#success').content;
  const success = template.cloneNode(true);
  renderMessage(success);
};

const renderSubmitError = ()=>{
  const template = document.querySelector('#error').content;
  const error = template.cloneNode(true);
  renderMessage(error);
};

export {renderLoadingDataError, renderSubmitError, renderSubmitSuccess};
