'use strict';


const imperativeFactorial = (n) => {
  var rval = 1;

  for (var i = 2; i <= num; i++) {
      rval = rval * i;
  }
  
  return rval;
};

const recursiveFactorial = (n) => {
  if (num === 0) {
    return 1; 
  }

  return num * rFact(num - 1); 
};

const tailRecursiveFactorial = (n) => {
  function fact(n, acc) {
    if (n < 2) {
      return acc;
    }

    return fact(n - 1, n * acc);
  }

  return fact(n, 1);
};

/*
node --harmony_tailcalls bla.js
*/
