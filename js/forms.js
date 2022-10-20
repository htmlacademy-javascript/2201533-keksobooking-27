const forms = document.querySelectorAll('form');

const changeState = (enabled)=>{
  forms.forEach((form)=>{
    form.classList.toggle('ad-form--disabled');
    for (const child of form.children) {
      child.disabled = !enabled;
    }
  });
};

const promo = document.querySelector('.promo');
promo.addEventListener('click', ()=>
  changeState(forms[0].classList.contains('ad-form--disabled')));

