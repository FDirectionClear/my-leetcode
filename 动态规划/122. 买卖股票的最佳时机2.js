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
