/**https://leetcode.cn/problems/climbing-stairs/ */

// 判断是不是动态规划问题？
// 1. 有没有重叠的子问题？
// 2. 有没有动态转移方程？
// 3. 初始值是什么？

/**自动向上的方法去做 */
var climbStairs = function(n) {
  const memo = [1, 2]
  if (n < 3) {
    return memo[n - 1]
  }
  for (let i = 2; i < n; i ++) {
    memo[i] = memo[i - 2] + memo[i - 1]
  }
  return memo[n - 1]
};

/**自动向上的方法去做 + 状态压缩，降低空间复杂度 */
var climbStairs = function(n) {
  const memo = [1, 2]
  if (n < 3) {
    return memo[n - 1]
  }
  for (let i = 3; i <= n; i ++) {
    const [prev1, prev2] = memo
    memo[0] = prev2
    memo[1] = prev1 + prev2
  }
  return memo[1]
};