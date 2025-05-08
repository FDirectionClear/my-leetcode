// 给定一个整数数组 temperatures ，表示每天的温度，返回一个数组 answer ，其中 answer[i] 是指对于第 i 天，下一个更高温度出现在几天后。如果气温在这之后都不会升高，请在该位置用 0 来代替。

// 示例 1:

// 输入: temperatures = [73,74,75,71,69,72,76,73]
// 输出: [1,1,4,2,1,1,0,0]
// 示例 2:

// 输入: temperatures = [30,40,50,60]
// 输出: [1,1,1,0]
// 示例 3:

// 输入: temperatures = [30,60,90]
// 输出: [1,1,0]

// 提示：

// 1 <= temperatures.length <= 105
// 30 <= temperatures[i] <= 100

/**
 * 单调栈 [73,74,75,71,69,72,76,73]
 */
var dailyTemperatures = function (temperatures) {
  let res = new Array(temperatures.length).fill(0);
  let stack = [];

  for (let i = 0, len = temperatures.length; i < len; i++) {
    const curr = temperatures[i];
    while (stack.length && temperatures[stack[stack.length - 1]] < curr) {
      const targetIndex = stack.pop();
      res[targetIndex] = i - targetIndex;
    }
    stack.push(i);
  }

  return res;
};

/**
 * 暴力解法，不过还是超时了
 */
var dailyTemperaturesV2 = function (temperatures) {
  if (temperatures.length === 1) return [0];
  const res = [];

  for (let i = 0, len = temperatures.length; i < len; i++) {
    let target = temperatures[i];
    for (let j = i + 1; j < len; j++) {
      if (temperatures[j] > target) {
        res.push(j - i);
        break;
      }
      if (j === len - 1) {
        res.push(0);
      }
    }
  }

  res.push(0);

  return res;
};

/**
 * 资料可参考：
 *  https://programmercarl.com/0739.%E6%AF%8F%E6%97%A5%E6%B8%A9%E5%BA%A6.html#%E6%80%9D%E8%B7%AF
 */
