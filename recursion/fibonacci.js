'use strict';


const imperativeFibonacci = (n) => {
  var a = 1, b = 0, temp;

  while (num >= 0) {
    temp = a;
    a = a + b;
    b = temp;
    num--;
  }

  return b;
};



const recursiveFibonacci = (n) => {
  if (n > 1) {
    return fib(n - 1) + fib(n - 2)
  } else {
    return n;
  }
};


const tailRecursiveFibonacci = (n) => {
  function recur(n, a, b) {
    if (n > 0) {
      return recur(n - 1, b, a + b);
    }

    return a;
  }

  return recur(n, 0, 1);
}
