import './data.js';
import {createData} from './data.js';
import {renderRandomCard} from './cards-render.js';
import './forms.js';
//console.log(createData());

/*let und;
if (!und || und.length === 0){
  console.log('андефайнед');
}*/


const dates = createData();
renderRandomCard(dates);

//const cards = createData().map((item)=>renderCard(item));
