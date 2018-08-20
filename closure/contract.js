const _ = require('lodash');

/*
логика
*/

/*
function getProductsListQuery(productsGroup, filter = '', pageNum = 0, limit = 0) {
  let sql = `SELECT name, price, unit FROM products WHERE group='${productsGroup}' ${filter} #pagination#`;

  if (!pageNum && !limit) {
    sql = sql.replace('#pagination#','');
  } else if (pageNum && limit) {
    sql = sql.replace('#pagination#',`OFFSET ${pageNum} LIMIT ${limit}`);
  } else {
    throw new Error('Bad pagination parameters!');
  }

  return sql;
}


console.log(getProductsListQuery('milk', 'AND price>10', 5, 25));
console.log(getProductsListQuery('milk', 'AND price>10'));
console.log(getProductsListQuery('milk'));

console.log('--------');
*/

function getProductsListQueryNew() {
  const states = [`SELECT name, price, unit FROM products WHERE group='#group#' #filter# #pagination#`];
  const _get = () => _.last(states);
  const _set = (key, value) => states.push(_.last(states).replace(`#${key}#`, value));
  const allList = () => { _set('pagination', ''); _set('filter', ''); return _get(); };
  const onPage = (pageNum) => ({
      withLimit: (limit) => {
        _set('filter', '');
        _set('pagination', `OFFSET ${pageNum} LIMIT ${limit}`);
        return _get();
      }
  });

  return {
    forGroup: (group) => {
      _set('group', group);
      return ({
        filteredBy: (filter) => {
          _set('filter', filter);
          return ({ onPage, allList });
        },
        onPage,
        allList
      });
    }
  }
}

console.log(getProductsListQueryNew().forGroup('milk').filteredBy('AND price>10').onPage(5).withLimit(25));
console.log(getProductsListQueryNew().forGroup('milk').onPage(5).withLimit(25));
console.log(getProductsListQueryNew().forGroup('milk').filteredBy('AND price>10').allList());
console.log(getProductsListQueryNew().forGroup('milk').allList());
/*
console.log('--------');

function getProductsListQueryTrace(traceIt = false) {
  const states = [`SELECT name, price, unit FROM products WHERE group='#group#' #filter# #pagination#`];
  const _get = () => _.last(states);
  const _set = (key, value) => states.push(_.last(states).replace(`#${key}#`, value));
  const allList = () => {
    _set('pagination', '');
    _set('filter', '');
    return traceIt ? states : _get();
  };

  return {
    forGroup: (group) => {
      _set('group', group);
      return ({
        filteredBy: (filter) => {
          _set('filter', filter);
          return ({
            withPagination: () => ({
              onPage: (pageNum) => {
                return {
                  withLimit: (limit) => {
                    _set('pagination', `OFFSET ${pageNum} LIMIT ${limit}`);
                    return traceIt ? states : _get();
                  }
                };
              }
            }),
            allList
          });
        },
        allList
      });
    }
  }
}

console.log(getProductsListQueryTrace().forGroup('milk').filteredBy('AND price>10').withPagination().onPage(5).withLimit(25));
console.log(getProductsListQueryTrace(true).forGroup('milk').filteredBy('AND price>10').withPagination().onPage(5).withLimit(25));
*/