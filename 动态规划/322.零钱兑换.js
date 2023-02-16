/**
 * 这道题不能用贪心来做，贪心不能得到最优解
 * 本来的想法是这样的：dp[i]代表尽可能使用第i枚硬币获得30元的最少硬币数量，假设i=7，dp[7] = 30/7 +  coinChange[30%7],
 * 然后找出dp[1-7]中，谁最小，就是结果。这个做法也许能解出，但是没有重叠的子问题，所有不属于动态规划。
 * 
 * 这里很明显，如果使用动态规划，就一定要抓住 “重叠” 这个特性去寻找子问题。
 * 可以假定dp[i]为面额为i的最少硬币数量。
 * 所以，理应想到穷举dp[i]
 */

var coinChange = function (coins, amount) {
  let dp = new Array(amount + 1).fill(Infinity); //初始化dp数组，因为循环中dp[i - coin]可能为dp[0]，dp[0]是边界值，而dp[i]代表i元最少硬币，也就是i是从1开始的。所以要初始化31位数组元素，给dp[0]加一个位置
  dp[0] = 0;//面额0只需要0个硬币兑换

  for (let i = 1; i <= amount; i++) {//循环面额
      for (let coin of coins) {//循环硬币数组
          if (i - coin >= 0) {//当面额大于硬币价值时
              //dp[i - coin]： 当前面额i减当前硬币价值所需要的最少硬币
              //dp[i] 可由 dp[i - coin] + 1 转换而来
              dp[i] = Math.min(dp[i], dp[i - coin] + 1);
          }
      }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];//如果dp[amount] === Infinity，则无法兑换
};

dp[30] = 30/7 +  dp[30%7]
dp[i]