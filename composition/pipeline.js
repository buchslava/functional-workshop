'use strict';

const { count, head, tail } = require('../arrayHelpers.js');
const { reduce } = require('../higher-order/filterMapReduce.js');

const pipeline = (...functions) => {
  if (count(functions) === 0) return (input) => input;
  if (count(functions) === 1) return (input) => head(functions)(input);
  return (input) => pipeline(...tail(functions))(head(functions)(input));
};

const reducePipeline = (...functions) => {
  return (input) => reduce((acc, fn) => fn(acc), input, functions);
};


module.exports = pipeline;
