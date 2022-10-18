import {TYPES_LABEL, FEATURES} from './setings.js';
import {getRandomElement} from './utils.js';

const fillBlock = (card, value, classStr, prop = 'textContent')=>{
  const block = card.querySelector(classStr);
  if (!value){
    block.remove();
  }
  else{
    block[prop] = value;
  }
}

const createCard = (data)=>{
  const {offer, author} = data;
  const {title, address, price, type, rooms, guests, checkin, checkout, description, features, photos} = offer;
  const template = document.querySelector('#card').content;
  const card = template.cloneNode(true);
  fillBlock(card, title,'.popup__title');
  fillBlock(card, address,'.popup__text--address');
  fillBlock(card, `${price} ₽/ночь`,'.popup__text--price');
  fillBlock(card, TYPES_LABEL[type],'.popup__type');
  fillBlock(card, `${rooms} комнаты для ${guests} гостей`,'.popup__text--capacity');
  fillBlock(card, `Заезд после ${checkin}, выезд до ${checkout}`,'.popup__text--time');
  fillBlock(card, description,'.popup__description');
  fillBlock(card, author.avatar,'.popup__avatar', 'src');
  for (let feature of FEATURES){
    let featureLi = card.querySelector('.popup__feature--' + feature);
    if (!features.includes(feature)){
      featureLi.remove();
    }
  }
  const photoContainer = card.querySelector('.popup__photos');
  let photoTemplate= photoContainer.querySelector('.popup__photo');
  for (let photo of photos){
    let photoImg = photoTemplate.cloneNode(false);
    photoImg.src = photo;
    photoContainer.appendChild(photoImg);
  }
  photoTemplate.remove();
  return card;
}

const renderRandomCard = (cards)=>{
  const canvas = document.querySelector('#map-canvas');
  canvas.appendChild(createCard(getRandomElement(cards)));
}

export {createCard, renderRandomCard}
