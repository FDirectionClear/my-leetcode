var romanToInt = function (s) {
  const stack = []; // 1000 ,900, 90, 4
  const sArr = [...s];
  let decreaseLock = false;

  function getIntFromRoman(roman) {
    switch (roman) {
      case "I": {
        return 1;
      }
      case "V": {
        return 5;
      }
      case "X": {
        return 10;
      }
      case "L": {
        return 50;
      }
      case "C": {
        return 100;
      }
      case "D": {
        return 500;
      }
      case "M": {
        return 1000;
      }
    }
  }

  while (sArr.length > 0) {
    const currInt = getIntFromRoman(sArr.pop()); // 当前倒序遍历的罗马数字转换成数字的结果

    if (!decreaseLock && stack.length > 0 && currInt < stack[0]) {
      // 📝 如果当前的数 < 队头元素，说明要进一步转换成更小数，然后重新入栈
      stack.unshift(stack.shift() - currInt);
      decreaseLock = true;
    } else {
      stack.unshift(currInt);
      decreaseLock = false;
    }
  }

  return stack.reduce((prev, curr) => prev + curr);
};

// "MCMXCIV"

// "M"
