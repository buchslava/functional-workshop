const Rx = require('rxjs');
const uuid = require('uuid');
require('rxjs/add/operator/mergeMap');

function StepByStep(handler) {
  const finishBoudary = uuid();
  const queue = new Rx.Subject();
  const resultQueue = queue.mergeMap(fn => new Promise(fn), 1);
  const resultData = [];
  const out = {
    do: (fn) => {
      queue.next(fn); return out;
    },
    finish: () => queue.next(resolve => resolve(finishBoudary))
  };
  resultQueue.subscribe((data) => {
    if (data === finishBoudary) {
      return handler(resultData);
    }

    resultData.push(data);
  });
  return out;
}

const hack = (...params) => (resolve) => {
  setTimeout(() => {
    resolve(`done hack ${JSON.stringify(params)}`);
  }, 5000);
};

const waitFor = (...params) => (resolve) => {
  setTimeout(() => {
    resolve(`done waitFor ${JSON.stringify(params)}`);
  }, 1000);
};

async function myStory() {
  return new Promise(resolve => {
    const handler = data => resolve(data);

    StepByStep(handler).do(hack('microsoft')).do(waitFor('new apple products')).finish();
  });
}

(async () => {
  const result = await myStory();

  console.log(result);
})();
