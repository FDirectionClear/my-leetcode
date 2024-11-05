/**
 * 这个做法能实现，但是curriedSum会变成单例的，当满足调用回调函数后就作废了。
 */
function curry1(fn) {
  let args = [];
  return function curried(...preArgs) {
    args = args.concat(preArgs);

    if (args.length < fn.length) {
      return curried;
    } else {
      return fn.apply(null, args);
    }
  };
}

/**
 * 这种做法就不是单例的，可以反复使用。关键点使用了bind特性。
 *
 * tip: 是单例的问题在于，上面的解法通过维护了一个args的闭包变量。如果能避免维护这个args，就能解决单例问题。
 * 但是解决办法光是在脑子里想是很难想出来的。你需要先动动手，删除这个args，然后尝试性的编写，可以想到什么就先写什么，
 * 然后就会发现，我们很容易就能想到了这个bind办法。正所谓“好记性不如烂笔头~”。
 */
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
