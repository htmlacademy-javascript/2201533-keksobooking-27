const randomInt = function (start, end){
  const max = Math.floor(Math.max(start, end));
  const min = Math.ceil(Math.min(start, end));
  if (min < 0){
    //console.error(`Границы интервала должны быть неотрицательными`);
    return NaN;
  }
  return Math.round((max - min) * Math.random()) + min;
};

const floorFraction = (val, precision)=>
  Math.floor(val * (10 ** precision)) / (10 ** precision);

const ceilFraction = (val, precision)=>
  Math.ceil(val * (10 ** precision)) / (10 ** precision);

const roundFraction = (val, precision)=>
  Math.round(val * (10 ** precision)) / (10 ** precision);

const randomFloat = function(start, end, precision){
  if (!Number.isInteger(precision)){
    //console.warn(`Количество знаков: ${precision} - дробное, буду округлять`);
    precision = Math.round(precision);
  }
  if (precision < 0){
    //console.warn(`Количество знаков: ${precision} - отрицательное, буду обнулять`);
    precision = 0;
  }
  const max = floorFraction(Math.max(start, end), precision);
  const min = ceilFraction(Math.min(start, end), precision);
  if (min < 0){
    //console.error(`Границы интервала должны быть неотрицательными, вот так`);
    return NaN;
  }
  return roundFraction((max - min) * Math.random() + min, precision);
};

/*console.log(randomFloat(10, 1, 3));
console.log(randomInt(1, 2));*/

/*randomFloat(10, 1, 3);
randomInt(1, 2);*/

const getLocation = function(){
  return {
    lat: randomFloat(35.65000, 35.70000, 5),
    lng: randomFloat(139.70000, 139.80000, 5)
  };
};

const getTitle = function(){
  const res = [];
  const words = [
    ['Уютное', 'гнездышко', 'молодоженов'],
    ['Убогое', 'лежбище', 'наркоманов'],
    ['Помпезное', 'жилище', 'нарциссов'],
    ['Превосходное', 'помещение', 'бездомных'],
    ['Прекрасное', 'место', 'туристов'],
    ['Скрытное', 'пристанище', 'злых гангстеров']
  ];
  for (let i = 0; i < 3; i++){
    const j = randomInt(0, 5);
    res[i] = words[j][i];
  }
  res[3] = res[2];
  res[2] = 'для';
  return res.join(' ');
};

const kFromN = function(variants){
  const select = [];
  const size = randomInt(1, variants.length);
  for (let i = 0; i < size; i++){
    const j = randomInt(0, variants.length - 1);
    select[i] = variants[j];
    variants.splice(j, 1);
  }
  return select;
};

const getFeatures = function(){
  const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  return kFromN(features.slice());
};

const getDescription = function(){
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
  return kFromN(sentences.slice()).join(' ');
};

const getPhotos = function(){
  const maxSize = 10;
  const photos = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
      'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
      'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
  ];
  const select = [];
  const size = randomInt(1, maxSize);
  for ( let i = 0; i < size; i++){
    select[i] = photos[randomInt(0, photos.length - 1)];
  }
  return select;
};

const getAvatar = function(num){
  let numStr = num.toString();
  const mask = '00';
  numStr = mask.substr(0, mask.length - numStr.length) + numStr;
  return `img/avatars/user${numStr}.png`;
};

const createItem = function(num){
  const types = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
  const checks = ['12:00', '13:00', '14:00'];
  const location = getLocation();
  return {
    author: {
      avatar: getAvatar(num + 1)
    },
    offer: {
      title: getTitle(),
      address: `${location.lat}, ${location.lng}`,
      price: randomInt(3000, 300000),
      type: types[randomInt(0, 4)],
      rooms: randomInt(1, 14),
      guests: randomInt(1, 34),
      checkin: checks[randomInt(0, 2)],
      checkout: checks[randomInt(0, 2)],
      features: getFeatures(),
      description: getDescription(),
      photos: getPhotos(),
    },
    location: {
      lat: location.lat,
      lng: location.lng
    }
  };
};


const createData = function(){
  const DATASIZE = 10;
  const data = [];
  for(let i = 0; i < DATASIZE; i++){
    data[i] = createItem(i);
  }
  return data;
};

//console.log(createData());
createData();
