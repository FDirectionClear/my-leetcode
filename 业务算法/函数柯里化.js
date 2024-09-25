/**
 * 可见学习笔记：https://yphwhoca2u.feishu.cn/docx/JjICd8xfKoBBiexpZjscaiTLn0e
 */
/**
 * 实现一个函数 curry，支持代入一个明确形参数量的函数，返回这个函数的柯里化结果。
 */

function sum(a,b,c,d) {
  // debugger
    return a + b + c + d
}

const curriedSum = curry(sum)

/**下面都会返回14*/
console.log(curriedSum(2,3,4,5)) 
console.log(curriedSum(2)(3)(4)(5))
console.log(curriedSum(2,3)(4)(5))
console.log(curriedSum(2,3,4)(5))

/**
 * 下面这是我写的，缺点是每次curry后的结果都是一个单例，不能多次复用，因为他们共享allArgs。
 * 优点是容易理解，面试时候容易写出来
 */
function curry(fn) {
  let needArgsLen = fn.length
  let allArgs = []

  return function curried (...args) {
    allArgs = allArgs.concat(args)
    if (args.length < needArgsLen) {
      needArgsLen = Math.max(needArgsLen - args.length, 0)
      return curried
    } else {
      return sum(...allArgs) 
    }
  }
}

/**
 * 优点是更简洁，没有单例的限制。
 * 但是使用了bind函数，不容易想到。可以尝试背下来。
 */

function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args)
    } else {
      return curried.bind(this, ...args)
    }
  }
}
