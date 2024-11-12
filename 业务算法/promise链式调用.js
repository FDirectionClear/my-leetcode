function chainPromise(list) {
  debugger;
  return function (prop) {
    let promise = Promise.resolve();
    while (list.length) {
      debugger;
      promise = promise.then(() => list.shift()(prop));
    }
    return promise;
  };
}

const obj = {};

function fn1(prop) {
  return new Promise((resolve) => {
    setTimeout(() => {
      prop.a = "1";
      console.log("1");
    }, 2000);
  });
}

function fn2(prop) {
  return new Promise((resolve) => {
    setTimeout(() => {
      prop.b = "2";
      console.log("2");
    }, 2000);
  });
}

function fn3(prop) {
  prop.c = "3";
  console.log("3");
}

const fns = [fn1, fn2, fn3];

debugger;

const chainHandler = chainPromise(fns);

const resPromise = chainHandler(obj);

resPromise.then(() => {
  console.log(prop);
});
