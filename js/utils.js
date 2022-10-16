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

const getRandomElement = (array)=>array[getRandomInt(0, array.length - 1)];

const newArray = (size)=>Array(size).fill(0);

export {getRandomFloat, getRandomInt, getUniqRandomArray, getRandomElement, newArray}
