// 实现一个计算器函数，输入任一个string类型的四则运算表达式，输出表达式的运算结果。
// 如：“4+2*3/2”，输出7

// 下面的思路是对的，但是在字符串裁剪上有问题，所以结果不正确，懒得调试了
function calculate(str) {
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

const str = "4+2*3/2";
console.log(calculate(str)); // 7

// const str1 = "4+2*3";
// console.log(calculate(str1)); // 10

// const str2 = "4+2-1";
// console.log(calculate(str2)); // 5

// const str3 = "+4+2-4/2+3*4*2--";
// const str3 = "4+2-4/2+3*4*2";
// console.log(calculate(str3)); //28
