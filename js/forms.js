let enabled = true;
const promo = document.querySelector('.promo');

const actions = {
  true: {
    'form': (element)=>element.classList.add('ad-form--disabled'),
    'child': (element)=>element.setAttribute('disabled', 'disabled')
  },
  false: {
    'form': (element)=>element.classList.remove('ad-form--disabled'),
    'child': (element)=>element.removeAttribute('disabled')
  }
};

const changeState = ()=>{
  const forms = document.querySelectorAll('form');
  forms.forEach((form)=>{
    actions[enabled]['form'](form);
    for (const child of form.children){
      actions[enabled]['child'](child);
    }
  });
  enabled = !enabled;
};

promo.addEventListener('click', ()=>changeState());
