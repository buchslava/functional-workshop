const Rx = require('rxjs');
const uuid = require('uuid');
require('rxjs/add/operator/mergeMap');

function StepByStep(handler, customFunNames = []) {
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
  for (const alternativeName of customFunNames) {
    out[alternativeName] = (fn) => {
      queue.next(fn); return out;
    };
  }
  resultQueue.subscribe((data) => {
    if (data === finishBoudary) {
      return handler(storage);
    }
  });
  return out;
}

const hack = (...params) => storage => resolve => {
  setTimeout(() => {
    storage.hack = `done hack ${JSON.stringify(params)}`;
    resolve();
  }, 5000);
};

const sound = (value) => storage => resolve => {
  if (!storage.sounds) {
    storage.sounds = [];
  }

  setTimeout(() => {
    storage.sounds.push(value);
    resolve();
  }, 0);
};

const waitFor = (...params) => storage => resolve => {
  setTimeout(() => {
    storage.waitFor = `done waitFor ${JSON.stringify(params)}; prev storage: ${JSON.stringify(storage)}`;
    resolve();
  }, 1000);
};

async function myStory() {
  return new Promise(resolve => {
    const allData = [];
    function handler(data) {
      allData.push(data);

      if (allData.length === 2) {
        resolve(allData);
      }
    }

    StepByStep(handler).do(hack('microsoft')).do(waitFor('new apple products')).finish();
    StepByStep(handler, ['make', 'and']).make(sound('bark')).and(sound('meo')).and(sound('yay')).finish();
  });
}

(async () => {
  const result = await myStory();

  console.log(result);
})();
