const _ = require('lodash');

function getProductsListQueryNew() {
  const states = [`SELECT name, price, unit FROM products WHERE group='#group#' #filter# #pagination#`];
  const _get = () => _.last(states);
  const _set = (key, value) => states.push(_get().replace(`#${key}#`, value));
  const _shouldNotBeEmpty = (key, value) => {
    if (!value && value !== 0) {
      throw new Error(`"${key}" should NOT be empty`);
    }
    return [key, value];
  };
  const allList = () => { _set('pagination', ''); _set('filter', ''); return _get(); };

  return {
    forGroup: (group) => {
      _set(..._shouldNotBeEmpty('group', group));
      return ({
        filteredBy: (filter) => {
          _set(..._shouldNotBeEmpty('filter', filter));
          return ({
            onPage: (pageNum) => ({
              withLimit: (limit) => {
                _shouldNotBeEmpty('pageNum', pageNum);
                _shouldNotBeEmpty('limit', limit);
                _set(..._shouldNotBeEmpty('pagination', `OFFSET ${pageNum} LIMIT ${limit}`));
                return _get();
              }
            }), allList
          });
        }, allList
      });
    }
  }
}

console.log(getProductsListQueryNew().forGroup('milk').filteredBy('AND price>10').onPage(5).withLimit(25));
console.log(getProductsListQueryNew().forGroup('milk').filteredBy('AND price>10').allList());
console.log(getProductsListQueryNew().forGroup('milk').allList());
try {
  console.log(getProductsListQueryNew().forGroup('').allList());
} catch (e) {
  console.log(e.message);
}

try {
  console.log(getProductsListQueryNew().forGroup('milk').filteredBy('').allList());
} catch (e) {
  console.log(e.message);
}

try {
  console.log(getProductsListQueryNew().forGroup('milk').filteredBy('AND price>10').onPage().withLimit(25));
} catch (e) {
  console.log(e.message);
}
