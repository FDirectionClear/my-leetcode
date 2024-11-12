Promise.prototype.myResolve = function (val) {
  return new Promise((resolve) => resolve(val));
};

Promise.prototype.myAll = function (promises) {
  let results = [];
  let count = 0;

  const dealFn = (res, index) => {
    results[index] = res;
    count++;
    if (count >= promises.length) {
      resolve(results);
    }
  };

  return new Promise((resolve) => {
    promises.forEach((promise) => {
      if (!promise instanceof Promise) {
        results[index] = promise;
      }
      promise.then(dealFn);
    });
  });
};

Promise.prototype.race = function (promises) {
  return new Promise((resolve) => {
    promises.forEach((promise) => {
      if (!promise instanceof Promise) {
        resolve(res);
      }
      promise.then((res) => resolve(res));
    });
  });
};
