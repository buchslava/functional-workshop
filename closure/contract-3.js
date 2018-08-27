function prepareProductsQueryByGroup(group, filter = '', pageNum = '', limit = '') {
  return method => {
    switch (method) {
      case 'filteredBy': return newFilter => prepareProductsQueryByGroup(group, newFilter);
      case 'onPage': return newPageNum => prepareProductsQueryByGroup(group, filter, newPageNum);
      case 'withLimit': return newLimit => prepareProductsQueryByGroup(group, filter, pageNum, newLimit);
      case 'getData': {
        const pageNumPart = !pageNum ? '' : `OFFSET ${pageNum}`;
        const limitPart = !limit ? '' : `LIMIT ${limit}`; 

        return `SELECT name, price, unit FROM products WHERE group=${group} ${filter} ${pageNumPart} ${limitPart}`;
      }
      default: return (...args) => `unknown method "${method}"`;
    }
  };
}

console.log(prepareProductsQueryByGroup('milk')('filteredBy')('AND price>10')('onPage')(5)('withLimit')(25)('getData'));
console.log(prepareProductsQueryByGroup('milk')('filteredBy')('AND price>10')('getData'));
console.log(prepareProductsQueryByGroup('milk')('getData'));


// ///////

function prepareProductsQueryByGroup(group, filter = '', pageNum = '', limit = '') {
  return method => {
    switch (method) {
      case 'filteredBy': return newFilter => prepareProductsQueryByGroup(group, newFilter);
      case 'onPage': return newPageNum => prepareProductsQueryByGroup(group, filter, newPageNum);
      case 'withLimit': return newLimit => prepareProductsQueryByGroup(group, filter, pageNum, newLimit);
      case 'withPagination': return (newPageNum, newLimit) => prepareProductsQueryByGroup(group, filter, newPageNum, newLimit);
      case 'getData': {
        const pageNumPart = !pageNum ? '' : `OFFSET ${pageNum}`;
        const limitPart = !limit ? '' : `LIMIT ${limit}`; 

        return `SELECT name, price, unit FROM products WHERE group=${group} ${filter} ${pageNumPart} ${limitPart}`;
      }
      default: return (...args) => `unknown method "${method}"`;
    }
  };
}

console.log(prepareProductsQueryByGroup('milk')('filteredBy')('AND price>10')('onPage')(5)('withLimit')(25)('getData'));
console.log(prepareProductsQueryByGroup('milk')('filteredBy')('AND price>10')('getData'));
console.log(prepareProductsQueryByGroup('milk')('getData'));
console.log(prepareProductsQueryByGroup('milk')('filteredBy')('AND price>10')('withPagination')(5, 25)('getData'));
