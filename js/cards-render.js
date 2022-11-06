import {TYPES_ATTRIBUTES} from './setings.js';

//const crutch = document.createElement('div');

const fillBlock = (card, value, classStr, prop = 'textContent')=>{
  const block = card.querySelector(classStr);
  if (!value){
    block.remove();
  }
  else{
    block[prop] = value;
  }
};

const createCard = (data)=>{
  const {offer, author} = data;
  const {title, address, price, type, rooms, guests, checkin, checkout, description, features, photos} = offer;
  const template = document.querySelector('#card').content;
  const card = template.cloneNode(true);
  fillBlock(card, title,'.popup__title');
  fillBlock(card, address,'.popup__text--address');
  fillBlock(card, `${price} ₽/ночь`,'.popup__text--price');
  fillBlock(card, TYPES_ATTRIBUTES[type].name,'.popup__type');
  fillBlock(card, `${rooms} комнаты для ${guests} гостей`,'.popup__text--capacity');
  fillBlock(card, `Заезд после ${checkin}, выезд до ${checkout}`,'.popup__text--time');
  fillBlock(card, description,'.popup__description');
  fillBlock(card, author.avatar,'.popup__avatar', 'src');
  const featuresUl = card.querySelector('.popup__features');
  if (!features || features.length === 0){
    featuresUl.remove();
  }
  else{
    const featuresCollection = featuresUl.querySelectorAll('.popup__feature');
    featuresCollection.forEach((itemCollection)=>{
      const stay = features.some((feature)=> itemCollection.classList.contains(`popup__feature--${feature}`));
      if (!stay){
        itemCollection.remove();
      }
    });
  }
  const photoContainer = card.querySelector('.popup__photos');
  if (!photos || photos.length === 0){
    photoContainer.remove();
  }
  else{
    const photoTemplate = photoContainer.querySelector('.popup__photo');
    photos.forEach((photo)=>{
      const photoImg = photoTemplate.cloneNode(false);
      photoImg.src = photo;
      photoContainer.append(photoImg);
    });
    photoTemplate.remove();
  }
  const getCardInner = ()=>{
    const crutch = document.createElement('div');
    crutch.append(card);
    return crutch.innerHTML;
  };
  return getCardInner();
};

export {createCard};
