import {getRandomInt, newArray, roundFraction} from './utils.js';

const DATA_SIZE = 10;
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const SENTENCES = [
  'Великолепная квартира-студия в центре Токио.',
  'Подходит как туристам, так и бизнесменам.',
  'Квартира полностью укомплектована и недавно отремонтирована.',
  'Ремонт делали год назад, все свежее и уютное.',
  'В коридоре в районе крючков для курток вздулись обои, но под верхней одеждой эти дефекты не видны.',
  'В гостиной есть диван, стеллаж, подставка под телевизор.',
  'В обеих спальнях есть двуспальные кровати с только что купленными матрасами, шкаф-купе, зеркало.',
  'Высокоскоростной интернет.',
  'Полностью оборудованная кухня: холодильник, плита с 4 конфорками, духовка, микроволновка, электрический чайник, небольшой набор посуды.',
  'Санузел совмещенный, есть стиральная машина.',
  'Из окна виден парк.'
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TYPES_ATTRIBUTES = {
  palace: {name: 'Дворец', minPrice: 10000},
  flat: {name: 'Квартира', minPrice: 1000},
  house: {name: 'Дом', minPrice: 5000},
  bungalow: {name: 'Бунгало', minPrice: 0},
  hotel: {name: 'Отель', minPrice: 3000},
};

const CHECKS = ['12:00', '13:00', '14:00'];
const BORDERS = {
  price: {
    min: 300,
    max: 100000
  },
  rooms: {
    min: 1,
    max: 14
  },
  guests: {
    min: 1,
    max: 34
  },
  location: {
    lat: {
      min: 35.65000,
      max: 35.70000
    },
    lng: {
      min: 139.70000,
      max: 139.80000
    }
  }
};
const COORDINATES_PRECISION = 5;
const PHOTO_COUNT = 10;

const Title = {
  words :[
    ['Уютное', 'гнездышко', 'для молодоженов'],
    ['Убогое', 'лежбище', 'для наркоманов'],
    ['Помпезное', 'жилище', 'для нарциссов'],
    ['Превосходное', 'помещение', 'для бездомных'],
    ['Прекрасное', 'место', 'для туристов'],
    ['Скрытное', 'пристанище', 'для злых гангстеров']
  ],

  get: function(){
    const sentenceSize = this.words[0].length;
    return newArray(sentenceSize).map((e,i)=>
      (this.words)[getRandomInt(0, this.words.length - 1)][i]).join(' ');
  }
};

const words = new Map();
words.set('символ',['символ', 'символа', 'символов']);

const {lat, lng} = BORDERS.location;
const MAP_CENTER = {
  lat: roundFraction((lat.min + lat.max) / 2, COORDINATES_PRECISION),
  lng: roundFraction((lng.min + lng.max) / 2, COORDINATES_PRECISION),
};
const MAP_ZOOM = 10;
const PIN_SIZE = 40;
const MAIN_PIN_SIZE = 52;
const PIN_ICON = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [PIN_SIZE, PIN_SIZE],
  iconAnchor: [PIN_SIZE / 2, PIN_SIZE],
});
const MAIN_PIN_ICON = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [MAIN_PIN_SIZE, MAIN_PIN_SIZE],
  iconAnchor: [MAIN_PIN_SIZE / 2, MAIN_PIN_SIZE],
});

const STEP_PRICE = 100;
const RADIX = 10;

export {DATA_SIZE, FEATURES, SENTENCES, PHOTOS, TYPES, COORDINATES_PRECISION, CHECKS, BORDERS, PHOTO_COUNT, Title};
export {TYPES_ATTRIBUTES};
export {words};
export {MAP_CENTER, MAP_ZOOM, PIN_ICON, MAIN_PIN_ICON};
export {STEP_PRICE, RADIX};
