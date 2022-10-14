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

randomFloat(10, 1, 3);
randomInt(1, 2);
