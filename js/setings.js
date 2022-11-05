import {roundFraction} from './utils.js';

const TYPES_ATTRIBUTES = {
  palace: {name: 'Дворец', minPrice: 10000},
  flat: {name: 'Квартира', minPrice: 1000},
  house: {name: 'Дом', minPrice: 5000},
  bungalow: {name: 'Бунгало', minPrice: 0},
  hotel: {name: 'Отель', minPrice: 3000},
};

const BORDERS = {
  lat: {
    min: 35.65000,
    max: 35.70000
  },
  lng: {
    min: 139.70000,
    max: 139.80000
  }
};

const COORDINATES_PRECISION = 5;

const WORDS = new Map();
WORDS.set('символ',['символ', 'символа', 'символов']);

const {lat, lng} = BORDERS;
const MAP_CENTER = {
  lat: roundFraction((lat.min + lat.max) / 2, COORDINATES_PRECISION),
  lng: roundFraction((lng.min + lng.max) / 2, COORDINATES_PRECISION),
};
const MAP_ZOOM = 10;
const PIN_SIZE = 40;
const MAIN_PIN_SIZE = 52;

const PIN_ICON = {
  iconUrl: './img/pin.svg',
  iconSize: [PIN_SIZE, PIN_SIZE],
  iconAnchor: [PIN_SIZE / 2, PIN_SIZE],
  popupAnchor: [0,-PIN_SIZE / 2]
};

const MAIN_PIN_ICON = {
  iconUrl: './img/main-pin.svg',
  iconSize: [MAIN_PIN_SIZE, MAIN_PIN_SIZE],
  iconAnchor: [MAIN_PIN_SIZE / 2, MAIN_PIN_SIZE],
};

const STEP_PRICE = 100;
const RADIX = 10;
const DATA_URL = 'https://27.javascript.pages.academy/keksobooking/data';
const MAX_ADS = 10;
const SUBMIT_URL = 'https://27.javascript.pages.academy/keksobooking';

const DELAY_BETWEEN_RENDER_ADS = 500;

export {COORDINATES_PRECISION};
export {TYPES_ATTRIBUTES};
export {WORDS};
export {MAP_CENTER, MAP_ZOOM, PIN_ICON, MAIN_PIN_ICON};
export {STEP_PRICE, RADIX};
export {DATA_URL, MAX_ADS, SUBMIT_URL};
export {DELAY_BETWEEN_RENDER_ADS};
