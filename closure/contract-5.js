const Rx = require('rxjs');
const uuid = require('uuid');
require('rxjs/add/operator/mergeMap');

function StepByStep(handler) {
  const finishBoudary = uuid();
  const queue = new Rx.Subject();
  const storage = {};
  const resultQueue = queue.mergeMap(fn => new Promise(fn(storage)), 1);
  const out = {
    do: (fn) => {
      queue.next(fn); return out;
    },
    finish: () => queue.next(() => resolve => {
      resolve(finishBoudary);
      resultQueue.unsubscribe();
    })
  };
  resultQueue.subscribe((data) => {
    if (data === finishBoudary) {
      return handler(storage);
    }
  });
  return out;
}

const hack = (...params) => storage => (resolve, reject) => {
  setTimeout(() => {
    // reject(new Error('foo'));
    storage.hack = `done hack ${JSON.stringify(params)}`;
    resolve();
  }, 5000);
};

const waitFor = (...params) => storage => resolve => {
  setTimeout(() => {
    storage.waitFor = `done waitFor ${JSON.stringify(params)}; prev storage: ${JSON.stringify(storage)}`;
    resolve();
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
