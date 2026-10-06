import {formatcurrancy} from '../scripts/utils/money.js';

console.log('works cents to dollar');
if(formatcurrancy(2095)==='20.95'){
    console.log('passed');
}else{
  console.log('failed');
}

console.log('works with 0');
if(formatcurrancy(0)==='0.00'){
  console.log('passed');
}else{
  console.log('failed');
}

console.log('round up to the nerrest cent');
if(formatcurrancy(2000.5)==='20.01'){
    console.log('passed');
}else{
  console.log('failed');
}



