/**https://leetcode.cn/problems/unique-paths/ */

// 1. 判断重叠子问题
// 2. 寻找动态转译方程
// 3. 确定初始状态
// 4. 确定输出值

// 递归，超时
var uniquePaths = function (m, n) {
  if (m === 1 && n === 1) return 1;
  if (m === 1 && n === 2) return 1;
  if (m === 2 && n === 1) return 1;
  return uniquePaths(m - 1, n) + uniquePaths(m, n - 1);
};

// 递归 + 记忆法
var uniquePaths = function (M, N) {
  const memo = {};
  const helper = (m, n) => {
    if (m === 1 && n === 1) return 1;
    if (m === 1 && n === 2) return 1;
    if (m === 2 && n === 1) return 1;
    if (memo[`${M},${N}`]) return memo[`${M},${N}`];
    memo[`${M},${N}`] = helper(m - 1, n) + helper(m, n - 1);
    return memo[`${M},${N}`];
  };
  return helper(M, N);
};

console.log("提交3");
