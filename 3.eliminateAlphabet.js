

let input = 'alagcgcdodol';

function eliminateDuplicate(text){
let numbers = text.split();
let join = numbers.join();
let result = [...new Set(join)];
return result;
}

console.log(eliminateDuplicate(input));
