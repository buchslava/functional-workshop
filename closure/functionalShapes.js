'use strict';

const rectangle = (height, width) => {
  return (method) => {
    switch (method) {
      case 'getWidth': return () => width;
      case 'getHeight': return () => height;
      case 'getArea': return () => width * height;
      case 'setWidth': return (newWidth) => rectangle(height, newWidth);
      case 'setHeight': return (newHeight) => rectangle(newHeight, width);
      case 'toString': return () => new Array(height+1).join(new Array(width+1).join('X ') + '\n');
      default: return (...args) => `unknown method "${method}"`;
    }
  }
};

const square = (side) => {
  return (method) => {
    if (method === 'setSize' || method === 'setWidth' || method === 'setHeight') {
      return (size) => square(size);
    } else {
      return rectangle(side, side)(method);
    }
  }
};

module.exports = { rectangle, square };
