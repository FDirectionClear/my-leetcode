/**
 * 这道题做出来了感觉非常自豪。因为我完全没看到题干下提供的解题思路，完全是通过自己在草纸上的猜测推导和验证发现的解决办法。（这道题看来计算规律不好找，所以就在下面提示了，但是我完全没看到....直接百度了什么是逆波兰表达式，然后自己去演算规律）
 *
 * 方法：通过栈。栈内储存的是当前每一步的结果。
 * 遍历到数字，就按顺序入栈。因为光看数字式没办法找到组合方式的，所有我们还没有处理办法，就把每一个数字视为最小的运算单元的结果，按照顺序推入栈内，等待后续遇到符号后处理。
 * 遍历到符号，因为波兰表达式的特点是，符号是处理紧挨着的两个单元的结果。因此，我们就先连续出栈两个元素，根据符号进行计算，得到处理结果后，将结果重新入栈，
 *
 * 最后栈内剩下的唯一元素就是整个波兰表达式的计算结果
 *
 * 下面的实现方式和标准答案基本完全一样。
 *
 * https://programmercarl.com/0150.%E9%80%86%E6%B3%A2%E5%85%B0%E8%A1%A8%E8%BE%BE%E5%BC%8F%E6%B1%82%E5%80%BC.html#%E5%85%B6%E4%BB%96%E8%AF%AD%E8%A8%80%E7%89%88%E6%9C%AC
 *
 * PS：波兰表达式也称为后缀表达式，是计算机做计算的一种简单方式，相比人肉计算的数学表达式，后缀表达式对计算机来说更简单。
 *  */

var evalRPN = function (tokens) {
  const stack = [];

  const compute = (left, right, token) => {
    let result = NaN;

    switch (token) {
      case "+": {
        result = left + right;
        break;
      }
      case "-": {
        result = left - right;
        break;
      }
      case "*": {
        result = left * right;
        break;
      }
      case "/": {
        result = (left / right) | 0;
      }
    }

    return result;
  };

  for (let i = 0, len = tokens.length; i < len; i++) {
    if (!["+", "-", "*", "/"].includes(tokens[i])) {
      // 说明当前项是普通数字
      stack.push(tokens[i]);
      continue;
    } else {
      // 如果当前是符号，就拿出栈底的两个元素进行运算，之后将结果推入栈中
      const right = stack.pop();
      const left = stack.pop();
      stack.push(compute(+left, +right, tokens[i]));
    }
  }

  return +stack[0];
};

// var tokens = [
//   "10",
//   "6",
//   "9",
//   "3",
//   "+",
//   "-11",
//   "*",
//   "/",
//   "*",
//   "17",
//   "+",
//   "5",
//   "+",
// ];
var tokens = ["2", "1", "+", "3", "*"];
console.log(evalRPN(tokens));
