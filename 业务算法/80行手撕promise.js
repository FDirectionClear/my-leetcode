const PENDING = "pending";
const FULLFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  constructor(fn) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.resolvedCallback = [];
    this.rejectedCallback = [];

    let resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULLFILLED;
        this.value = value;
        setTimeout(() => {
          this.resolvedCallback.forEach((thenCb) => thenCb());
        });
      }
    };

    let reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        setTimeout(() => {
          this.rejectedCallback.forEach((rejectCb) => rejectCb());
        });
      }
    };

    try {
      fn(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(resolveCb, rejectCb) {
    return new MyPromise((resolve, reject) => {
      resolveCb = typeof resolveCb === "function" ? resolveCb : (v) => v;
      rejectCb =
        typeof rejectCb === "function"
          ? rejectCb
          : (err) => {
              throw err;
            };
      const thenCb = () => {
        let res = resolveCb(this.value);
        if (res instanceof MyPromise) {
          res.then(resolve, reject);
        } else {
          resolve(res);
        }
      };
      const errCb = () => {
        let res = rejectCb(this.reason);
        if (res instanceof MyPromise) {
          res.then(resolve, reject);
        } else {
          resolve(res);
        }
      };
      this.resolvedCallback.push(thenCb);
      this.rejectedCallback.push(errCb);
    });
  }
}

const mp = new MyPromise((resolve) => {
  console.log("my Promise start!");
  setTimeout(() => {
    resolve(1);
  }, 1000);
});

mp.then((res) => {
  console.log(res);
  return 2;
})
  .then((res) => {
    console.log(res);
    return new MyPromise((resolve) => {
      setTimeout(() => resolve(3), 2000);
    });
  })
  .then((res) => {
    console.log(res);
  });

// const mp = new Promise((resolve) => {
//   console.log("my Promise start!");

//   resolve(
//     new Promise((innerResolve) => {
//       setTimeout(() => innerResolve(1), 3000);
//     })
//   );
// });

// mp.then((res) => {
//   console.log(res);
//   return 2;
// })
//   .then((res) => {
//     console.log(res);
//     return new Promise((resolve) => {
//       setTimeout(() => resolve(3), 2000);
//     });
//   })
//   .then((res) => {
//     console.log(res);
//   });
