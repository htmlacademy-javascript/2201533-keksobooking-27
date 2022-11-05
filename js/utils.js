import {WORDS} from './setings.js';


const roundFraction = (val, precision)=>
  Math.round(val * (10 ** precision)) / (10 ** precision);


const declineNouns = (number, word)=>{
  const num = Math.floor(number);
  if (num > 10 && num < 15){
    return WORDS.get(word)[2];
  }
  const rightDigit = Number(num.toString().substring(num.toString().length - 1));
  if (rightDigit === 1){
    return WORDS.get(word)[0];
  }
  if (rightDigit > 1 && rightDigit < 5){
    return WORDS.get(word)[1];
  }
  return WORDS.get(word)[2];
};


function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}


function throttle (callback, delayBetweenFrames) {
  let lastTime = 0;
  return (...rest)=>{
    const now = Date.now();
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
      return lastTime;
    }
  };
}


export {declineNouns};
export {roundFraction};
export {throttle, debounce};
