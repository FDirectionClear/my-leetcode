/**
 *  这道题的动态转移方程相当难找
 * */
var numSquares = function (n) {
  const dp = [...Array(n)].map((_) => 0); //初始化dp数组 当n为0的时候
  for (let i = 1; i <= n; i++) {
    dp[i] = i; // 最坏的情况就是每次+1 比如: dp[3]=1+1+1
    for (let j = 1; i - j * j >= 0; j++) {
      // 枚举前一个状态，为什么是j*j，因为只有j*j才能保证是由小到大遍历所有小于当前数的完全平方数
      // 之所以 + 1，是因为j*j的结果就是完全平方数，
      // dp[i]就是dp[i-j*j]+<j*j这个完全平方数，归到数量上就是1>，只不过这个j是不确定的，需要自底向上选
      dp[i] = Math.min(dp[i], dp[i - j * j] + 1); // 动态转移方程
    }
  }
  1;
  return dp[n];
};
