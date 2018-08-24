function prepareProductsListQueryByGroup(group, filter = '', pageNum = '', limit = '') {
  return method => {
    switch (method) {
      case 'filteredBy': return newFilter => prepareProductsListQueryByGroup(group, newFilter);
      case 'onPage': return newPageNum => prepareProductsListQueryByGroup(group, filter, newPageNum);
      case 'withLimit': return newLimit => prepareProductsListQueryByGroup(group, filter, pageNum, newLimit);
      case 'getData': {
        const pageNumPart = !pageNum ? '' : `OFFSET ${pageNum}`;
        const limitPart = !limit ? '' : `LIMIT ${limit}`; 

        return `SELECT name, price, unit FROM products WHERE group=${group} ${filter} ${pageNumPart} ${limitPart}`;
      }
      default: return (...args) => `unknown method "${method}"`;
    }
  };
}

console.log(prepareProductsListQueryByGroup('milk')('filteredBy')('AND price>10')('onPage')(5)('withLimit')(25)('getData'));
console.log(prepareProductsListQueryByGroup('milk')('filteredBy')('AND price>10')('getData'));
console.log(prepareProductsListQueryByGroup('milk')('getData'));


// ///////

function prepareProductsListQueryByGroup(group, filter = '', pageNum = '', limit = '') {
  return method => {
    switch (method) {
      case 'filteredBy': return newFilter => prepareProductsListQueryByGroup(group, newFilter);
      case 'onPage': return newPageNum => prepareProductsListQueryByGroup(group, filter, newPageNum);
      case 'withLimit': return newLimit => prepareProductsListQueryByGroup(group, filter, pageNum, newLimit);
      case 'withPagination': return (newPageNum, newLimit) => prepareProductsListQueryByGroup(group, filter, newPageNum, newLimit);
      case 'getData': {
        const pageNumPart = !pageNum ? '' : `OFFSET ${pageNum}`;
        const limitPart = !limit ? '' : `LIMIT ${limit}`; 

        return `SELECT name, price, unit FROM products WHERE group=${group} ${filter} ${pageNumPart} ${limitPart}`;
      }
      default: return (...args) => `unknown method "${method}"`;
    }
  };
}

console.log(prepareProductsListQueryByGroup('milk')('filteredBy')('AND price>10')('onPage')(5)('withLimit')(25)('getData'));
console.log(prepareProductsListQueryByGroup('milk')('filteredBy')('AND price>10')('getData'));
console.log(prepareProductsListQueryByGroup('milk')('getData'));
console.log(prepareProductsListQueryByGroup('milk')('filteredBy')('AND price>10')('withPagination')(5, 25)('getData'));
