/**
 * 接雨水这道题非常难，属于hard难度，如果不能找到诀窍，这道题很难攻破。估计面试时候也不会考。
 * 这道题可以用单调栈的做法求解，但是我认为用单调栈更难。卡玛给的答案也不全是单调栈的。
 * 所以这道题就不用单调栈解题了。
 * https://programmercarl.com/0042.%E6%8E%A5%E9%9B%A8%E6%B0%B4.html#%E5%85%B6%E4%BB%96%E8%AF%AD%E8%A8%80%E7%89%88%E6%9C%AC
 */

//暴力解法
var trap = function (height) {
  const len = height.length;
  let sum = 0;
  for (let i = 0; i < len; i++) {
    // 第一个柱子和最后一个柱子不接雨水
    if (i == 0 || i == len - 1) continue;
    let rHeight = height[i]; // 记录右边柱子的最高高度
    let lHeight = height[i]; // 记录左边柱子的最高高度
    for (let r = i + 1; r < len; r++) {
      if (height[r] > rHeight) rHeight = height[r];
    }
    for (let l = i - 1; l >= 0; l--) {
      if (height[l] > lHeight) lHeight = height[l];
    }
    let h = Math.min(lHeight, rHeight) - height[i];
    if (h > 0) sum += h;
  }
  return sum;
};

//双指针，思路其实也是和上面一样，就是在暴力遍历方面做出了类似动态规划的优化。
// https://yphwhoca2u.feishu.cn/docx/UCYDduY3DoCykOx59KBcGBbdnbc
var trap = function (height) {
  const len = height.length;
  if (len <= 2) return 0;
  const maxLeft = new Array(len).fill(0);
  const maxRight = new Array(len).fill(0);
  // 记录每个柱子左边柱子最大高度
  maxLeft[0] = height[0];
  for (let i = 1; i < len; i++) {
    maxLeft[i] = Math.max(height[i], maxLeft[i - 1]);
  }
  // 记录每个柱子右边柱子最大高度
  maxRight[len - 1] = height[len - 1];
  for (let i = len - 2; i >= 0; i--) {
    maxRight[i] = Math.max(height[i], maxRight[i + 1]);
  }
  // 求和
  let sum = 0;
  for (let i = 0; i < len; i++) {
    let count = Math.min(maxLeft[i], maxRight[i]) - height[i];
    if (count > 0) sum += count;
  }
  return sum;
};
