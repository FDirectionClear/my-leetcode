// 动态规划
const maxProfit = function (prices) {
  let n = prices.length;
  let dp = Array.from(new Array(n), () => new Array(2));
  dp[0][0] = 0; //第0天不持有
  dp[0][1] = -prices[0]; //第0天买入 花了prices[0]
  for (let i = 1; i < n; i++) {
      dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
      dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
  }
  return dp[n - 1][0];
};

// 贪心
const maxProfit2 = function (prices) {
    let ans = 0;
    for(let i = 1, len = prices.length; i < len; i ++) {
        ans += Math.max(prices[i] - prices[i-1], 0)
    }
    return ans
}


/*
  贪心算法的特点：
  1. 无限次数，选择最优解的策略通常比较简单，通过局部最优的求解方案，不会导致选择出错误的全局最优方案。
  2. 下一步的最优解一定可以由上一步的最优解直接推到出来。或者说，下一步的最优解只和上一步的最优解相关，不会选择更之前得出的结果。
     贪心策略必须具备无后效性，即某个状态以前的状态不会影响以后的状态，只与当前状态有关。

  动态规划的特点
  1. 本质是递归，需要求得所有子问题的最优解，并缓存这些结果，因为下一个子问题的最优解可能也会需要到先前某个求得的最优解。
  2. 最优解选择策略比较复杂，还可能有一些棘手的限制

  共同点：
  1. 都是拆分成子问题求解，很多题既可以用贪心也可以用动态规划。能用贪心解的题，有时候用动态规划也能解，但是贪心的时间复杂度更低。
*/