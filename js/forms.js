let enabled = true;
const forms = document.querySelectorAll('form');

/*const changeState = ()=>{
  const tags = ['input','select','textarea','button', '.ad-form__slider'];
  forms.forEach(
  (form)=> {
    form.classList.toggle('ad-form--disabled');
    tags.forEach(
      (tag) => form.querySelectorAll(tag).forEach(
        element => element.disabled = enabled
      )
    );
  });
  enabled = !enabled;
};*/

const changeState = ()=>{
  forms.forEach((form)=>{
    form.classList.toggle('ad-form--disabled');
    for (const child of form.children) {
      child.disabled = enabled;
    }
  });
  enabled = !enabled;
};

const promo = document.querySelector('.promo');
promo.addEventListener('click', ()=>changeState());

