// 参考资料：programmercarl.com/0202.%E5%BF%AB%E4%B9%90%E6%95%B0.html#%E5%85%B6%E4%BB%96%E8%AF%AD%E8%A8%80%E7%89%88%E6%9C%AC
// 参考资料：https://leetcode.cn/problems/happy-number/solutions/224894/kuai-le-shu-by-leetcode-solution/

// 编写一个算法来判断一个数 n 是不是快乐数。

// 「快乐数」 定义为：

// 对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和。
// 然后重复这个过程直到这个数变为 1，也可能是 无限循环 但始终变不到 1。
// 如果这个过程 结果为 1，那么这个数就是快乐数。
// 如果 n 是 快乐数 就返回 true ；不是，则返回 false 。

// 示例 1：

// 输入：n = 19
// 输出：true
// 解释：
// 12 + 92 = 82
// 82 + 22 = 68
// 62 + 82 = 100
// 12 + 02 + 02 = 1
// 示例 2：

// 输入：n = 2
// 输出：false

/**
 * 这道题被标注为“简单”，但是个人认为比较难想。一旦思路抓到了，实现起来就很简单。
 * 思路：
 * 1. 循环“足够多的次数”去处理每一次计算，如果出现1，就true，否则就false
 * 2. “足够多的次数”一定存在么？难道不可能无穷无尽吗？
 *  1. 一定存在。eg:输入 674，那它过程中能得到的最大的结果不过是 9^2 + 9^2 + 9^2
 */
var isHappy = function (n) {
  let waitingAdd = splitNum(n);
  const maxCount = Math.pow(9, 2) * waitingAdd.length;
  const set = new Set([]);
  let sum = 0;

  function splitNum(num) {
    return new Number(num)
      .toString()
      .split("")
      .map((n) => +n);
  }

  for (let i = 0; i < maxCount; i++) {
    while (waitingAdd.length) {
      sum += Math.pow(waitingAdd.shift(), 2);
    }
    if (sum === 1) {
      return true;
    }
    if (set.has(sum)) {
      // 说明有循环
      return false;
    } else {
      set.add(sum);
    }
    waitingAdd = splitNum(sum);
    sum = 0;
  }

  return false;
};
