import {
  DATA_SIZE, FEATURES, SENTENCES, PHOTOS, TYPES, COORDINATES_PRECISION, CHECKS, BORDERS, PHOTO_COUNT, Title
} from "./setings.js";
import {
  getRandomElement, getRandomFloat, getRandomInt, getUniqRandomArray, newArray
} from "./utils.js";

const getLocation = ()=>({
  lat: getRandomFloat(BORDERS.location.lat.min, BORDERS.location.lat.max, COORDINATES_PRECISION),
  lng: getRandomFloat(BORDERS.location.lng.min, BORDERS.location.lng.max, COORDINATES_PRECISION)
});

const getFeatures = ()=>getUniqRandomArray(FEATURES.slice());

const getDescription = ()=>getUniqRandomArray(SENTENCES.slice()).join(' ');

const getPhotos = () =>newArray(getRandomInt(1, PHOTO_COUNT)).map(()=>getRandomElement(PHOTOS));

const getAvatar = (num) =>`img/avatars/user${num.toString().padStart(2,'0')}.png`;

const createItem = (num)=>{
  const location = getLocation();
  return {
    author: {
      avatar: getAvatar(num + 1)
    },
    offer: {
      title: Title.get(),
      address: `${location.lat}, ${location.lng}`,
      price: getRandomInt(BORDERS.price.min, BORDERS.price.max),
      type: getRandomElement(TYPES),
      rooms: getRandomInt(BORDERS.rooms.min, BORDERS.rooms.max),
      guests: getRandomInt(BORDERS.guests.min, BORDERS.guests.max),
      checkin: getRandomElement(CHECKS),
      checkout: getRandomElement(CHECKS),
      features: getFeatures(),
      description: getDescription(),
      photos: getPhotos(),
    },
    location: location
  };
};

const createData = ()=>newArray(DATA_SIZE).map((e, i)=>createItem(i));

export {createData};
