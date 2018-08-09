'use strict';

const { count, head, tail } = require('../arrayHelpers.js');

/*const filter = (predicateFn, array) => {
  const result = [];

  for (const item of array) {
    if (predicateFn(item)) {
      result.push(item);

    }
  }

  return result;
}*/

const filter = (predicateFn, array) => {
  if (count(array) === 0) return [];
  const aHead = head(array);
  const aTail = tail(array);
  const filtered = predicateFn(aHead) ? [aHead] : [];
  return filtered.concat(filter(predicateFn, aTail));
}

/*const map = (mappingFn, array) => {
  const result = [];

  for (const item of array) {
    result.push(mappingFn(item));
  }

  return result;
};*/

const map = (mappingFn, array) => {
  if (count(array) === 0) return [];
  return [mappingFn(head(array))].concat(map(mappingFn, tail(array)));
};

/*const reduce = (reducerFn, initialValue, array) => {
  let result = initialValue;

  for (const item of array) {
    result = reducerFn(result, item);
  }

  return result;
};*/

const reduce = (reducerFn, initialValue, array) => {
  if (count(array) === 0) return initialValue;
  return reduce(reducerFn, reducerFn(initialValue, head(array)), tail(array));
};


module.exports = { filter, map, reduce };
