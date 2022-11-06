const FILE_TYPES = ['jpg', 'jpeg', 'png', 'svg', 'ico', 'bmp', 'gif'];

const elements = {
  avatar: {
    preview: document.querySelector('.ad-form-header__preview img'),
    input: document.querySelector('#avatar'),
    default: function(){
      this.preview.src = 'img/muffin-grey.svg';
    }
  },
  images: {
    preview: document.querySelector('.ad-form__photo'),
    input: document.querySelector('#images'),
    default: function(){
      const img = this.preview.querySelector('IMG');
      if(img){
        img.remove();
      }
    }
  },
};

const getPreview = (id)=>{
  if (elements[id].preview.tagName === 'IMG'){
    return elements[id].preview;
  }
  const img = document.createElement('img');
  img.width = elements[id].preview.clientWidth;
  img.height = elements[id].preview.clientHeight;
  elements[id].preview.append(img);
  return img;
};

const setImage = (evt)=>{
  const chooser = evt.target;
  const id = chooser.id;
  const file = chooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  const preview = getPreview(id);
  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
};

const setDefaultPhoto = ()=>{
  for (const key in elements){
    elements[key].default();
  }
};

for (const key in elements){
  elements[key].input.accept = `image/${FILE_TYPES.join(', image/')}`;
  elements[key].input.addEventListener('change', setImage);
}

export {setDefaultPhoto};
