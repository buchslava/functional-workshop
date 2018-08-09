'use strict';

// TODO Copy the impure version of your function here:


const getDate = () => new Date().toDateString();



// TODO Now write a refactored, pure version of the function:

const _getDate = (dateValue) => dateValue.toDateString();
const getDate = () => _getDate(new Date());