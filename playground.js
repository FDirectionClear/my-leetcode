// function curry(fn) {
//   let args = [];
//   return function curried(...preArgs) {
//     args = args.concat(preArgs);

//     if (args.length < fn.length) {
//       return curried;
//     } else {
//       return fn.apply(null, args);
//     }
//   };
// }

function curry(fn) {
  return function curried(...args) {
    if (args.length < fn.length) {
      return curried.bind(null, ...args);
    } else {
      return fn.apply(null, args);
    }
  };
}

function sum(a, b, c, d) {
  return a + b + c + d;
}

const curriedSum = curry(sum);
/**下面都会返回14*/
console.log(curriedSum(2, 3, 4, 5));
console.log(curriedSum(2)(3)(4)(5));
console.log(curriedSum(2, 3)(4)(5));
console.log(curriedSum(2, 3, 4)(5));
