const DATA_SIZE = 10;
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const sentences = [
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
const photos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];
const types = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const checks = ['12:00', '13:00', '14:00'];
const BORDERS = {
  price: {
    min: 3000,
    max: 300000
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

const getRandomInt = (start, end) =>{
  const max = Math.floor(Math.max(start, end));
  const min = Math.ceil(Math.min(start, end));
  if (min < 0){
    return NaN;
  }
  return Math.floor((max - min + 1) * Math.random() + min);
};

const floorFraction = (val, precision)=>
  Math.floor(val * (10 ** precision)) / (10 ** precision);

const ceilFraction = (val, precision)=>
  Math.ceil(val * (10 ** precision)) / (10 ** precision);

const roundFraction = (val, precision)=>
  Math.round(val * (10 ** precision)) / (10 ** precision);

const getRandomFloat = (start, end, precision)=>{
  if (!Number.isInteger(precision)){
    precision = Math.round(precision);
  }
  if (precision < 0){
    precision = 0;
  }
  const max = floorFraction(Math.max(start, end), precision);
  const min = ceilFraction(Math.min(start, end), precision);
  if (min < 0){
    return NaN;
  }
  return roundFraction((max - min) * Math.random() + min, precision);
};

const getLocation = ()=>{
  return {
    lat: getRandomFloat(BORDERS.location.lat.min, BORDERS.location.lat.max, COORDINATES_PRECISION),
    lng: getRandomFloat(BORDERS.location.lng.min, BORDERS.location.lng.max, COORDINATES_PRECISION)
  };
};

let Title = {
  words :[
    ['Уютное', 'гнездышко', 'для молодоженов'],
    ['Убогое', 'лежбище', 'для наркоманов'],
    ['Помпезное', 'жилище', 'для нарциссов'],
    ['Превосходное', 'помещение', 'для бездомных'],
    ['Прекрасное', 'место', 'для туристов'],
    ['Скрытное', 'пристанище', 'для злых гангстеров']
  ],

  get: function(){
    const res = [];
    for (let i = 0; i < this.words[0].length; i++){
      const j = getRandomInt(0, this.words.length - 1);
      res[i] = (this.words)[j][i];
    }
    return res.join(' ');
  }
};

const getUniqRandomArray = (variants)=>{
  const chosen = [];
  const size = getRandomInt(1, variants.length);
  for (let i = 0; i < size; i++){
    const j = getRandomInt(0, variants.length - 1);
    chosen[i] = variants[j];
    variants.splice(j, 1);
  }
  return chosen;
};

const getFeatures = ()=>getUniqRandomArray(FEATURES.slice());

const getDescription = ()=>getUniqRandomArray(sentences.slice()).join(' ');

const getPhotos = () =>{
  const arrayPhotos = Array(getRandomInt(1, PHOTO_COUNT)).fill(0);
  return arrayPhotos.map(e=>photos[getRandomInt(0, photos.length - 1)]);
};

const getAvatar = (num) =>`img/avatars/user${num.toString().padStart(2,'0')}.png`;

const getRandomElement = (array) =>array[getRandomInt(0, array.length - 1)]

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
      type: getRandomElement(types),
      rooms: getRandomInt(BORDERS.rooms.min, BORDERS.rooms.max),
      guests: getRandomInt(BORDERS.guests.min, BORDERS.guests.max),
      checkin: getRandomElement(checks),
      checkout: getRandomElement(checks),
      features: getFeatures(),
      description: getDescription(),
      photos: getPhotos(),
    },
    location: location
  };
};

const createData = ()=>Array(DATA_SIZE).fill(0).map((e, i)=>createItem(i));

//console.log(createData());
createData();
