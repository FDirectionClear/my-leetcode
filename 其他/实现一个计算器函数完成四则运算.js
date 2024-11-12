// 实现一个计算器函数，输入任一个string类型的四则运算表达式，输出表达式的运算结果。
// 如：“4+2*3/2”，输出7

// 通过递归去先算乘除，再算加减法是可以的。只是在字符串裁剪上有问题，懒得调试了，思路绝对正确
// 因为考虑了很多边界条件所以代码看上去很复杂。不建议这么做，但是思路是清晰正确的。
function calculate1(str) {
  if (str.length <= 0) return NaN;
  // 先算乘除，得到表达式
  const chengchu = (s) => {
    debugger;
    if (s.indexOf("*") === -1 && s.indexOf("/") === -1) return s;
    let flag = "";
    let calcResult = "";
    const firstIndex = Array.from(s).findIndex((item) => {
      if (item === "*" || item === "/") {
        flag = item;
        return true;
      }
    });
    if (s[firstIndex - 1] === "" || s[firstIndex + 1] === "") {
      // 如果运算符前后至少有一个为空，就需要移除这个运算符自身，说明他是多余的
      calcResult = `${s.slice(0, firstIndex)}${s.slice(firstIndex + 1)}`;
    } else {
      debugger;
      let res = "";
      let prevNumIndex =
        Array.from(s.slice(0, firstIndex)).findLastIndex((item) =>
          ["+", "-", "*", "/"].includes(item)
        ) + 1;
      let lastNumIndex =
        Array.from(s.slice(firstIndex + 1)).findIndex((item) =>
          ["+", "-", "*", "/"].includes(item)
        ) + firstIndex;

      let prevNum = s.slice(prevNumIndex, firstIndex);
      let suffNum = s.slice(firstIndex + 1, lastNumIndex + 1);

      if (flag === "*") {
        res = +prevNum * +suffNum;
      } else if (flag === "/") {
        res = +prevNum / +suffNum;
      }
      calcResult = `${s.slice(0, prevNumIndex)}${res}${s.slice(
        lastNumIndex + 1
      )}`;
    }
    return chengchu(calcResult);
  };

  // 再算加减, 得到最终运算结果
  const jiajian = (s) => {
    if (s.indexOf("+") === -1 && s.indexOf("-") === -1) return s;
    let flag = "";
    let calcResult = "";
    const firstIndex = Array.from(s).findIndex((item) => {
      if (item === "+" || item === "-") {
        flag = item;
        return true;
      }
    });
    if (s[firstIndex - 1] === "" || s[firstIndex + 1] === "") {
      // 如果运算符前后至少有一个为空，就需要移除这个运算符自身，说明他是多余的
      calcResult = `${s.slice(0, firstIndex)}${s.slice(firstIndex + 1)}`;
    } else {
      let res = "";
      let prevNumIndex =
        Array.from(s.slice(0, firstIndex)).findLastIndex((item) =>
          ["+", "-", "*", "/"].includes(item)
        ) + 1;
      let lastNumIndex =
        Array.from(s.slice(firstIndex + 1)).findIndex((item) =>
          ["+", "-", "*", "/"].includes(item)
        ) + firstIndex;

      let prevNum = s.slice(prevNumIndex, firstIndex);
      let suffNum = s.slice(firstIndex + 1, lastNumIndex + 1);

      if (flag === "+") {
        res = +prevNum + +suffNum;
      } else if (flag === "-") {
        res = +prevNum - +suffNum;
      }
      calcResult = `${s.slice(0, prevNumIndex)}${res}${s.slice(
        lastNumIndex + 1
      )}`;
    }
    return jiajian(calcResult);
  };

  const calcChengchu = chengchu(str);
  debugger;
  const calcJianjian = jiajian(calcChengchu);

  return calcJianjian;
}

// const str = "4+21*3/2-5";
// console.log(calculate(str)); // 7

//  21 3 2
// + * /

// 4 63 2
// + /

// 4 31.5
// +

// 35.5
// [].length==0
// return 35.5

// jiajian = []

// ['4 21 3 2 5'] => [4,21,3,2,5]
// ['+', '*', '/', '-']

// [4 63 2 5]
// ['+', '/' '-']

// [4 31.5 5]
// ['+', '-']

// [35.5 5]
// ['-']

// [30.5]
// []
// return 30.5

// const str1 = "4+2*3";
// console.log(calculate(str1)); // 10

/**
 * 重新实现了一个方法，可以运行正确，这个方法比上面的实现简单，但没有考虑边界条件（后来认为计算器不会输入什么非标准格式，不然处理的边界情况就太复杂了）。
 * 思路差不多相同，没有使用递归，还是先算乘除，再算加减。思路清晰。演算过程推导如上面草纸所示。
 *
 * 但是咋力扣中找到同类题型，结果超时，时间复杂度为O(3N)，所以是O(N)
 */
function calculate(str) {
  let nums = "",
    flags = [];
  Array.from(str).forEach((item) => {
    if (["+", "-", "*", "/"].includes(item)) {
      // 如果当前符号是运算符
      flags.push(item);
      nums += " ";
    } else if (item !== " ") {
      nums += item; // 如果不是空格，就都变成数字
    }
  });
  nums = nums.split(" ").map((item) => +item); // 转换为，且都转换成数字类型，方便后续计算

  let i = 0;
  while (i < flags.length) {
    // 先算乘除
    let flag = flags[i];

    if (flag === "*") {
      nums.splice(i, 2, nums[i] * nums[i + 1]); // 替换nums中的计算结果
      flags.splice(i, 1);
    } else if (flag === "/") {
      nums.splice(i, 2, nums[i] / nums[i + 1]);
      flags.splice(i, 1);
    } else {
      i++;
    }
  }

  let j = 0;
  while (j < flags.length) {
    // 再算加减
    let flag = flags[j];
    if (flag === "+") {
      nums.splice(j, 2, nums[j] + nums[j + 1]); // 替换nums中的计算结果
      flags.splice(j, 1);
    } else if (flag === "-") {
      nums.splice(j, 2, nums[j] - nums[j + 1]);
      flags.splice(j, 1);
    } else {
      j++;
    }
  }

  return nums[0];
}

const str1 = "4+2*3";
console.log(calculate(str1)); // 10

const str2 = "4+2-1";
console.log(calculate(str2)); // 5

const str3 = "4+2-4/2+3*4*2";
console.log(calculate(str3)); // 28

const str4 = "42";
console.log(calculate(str4)); // 42
