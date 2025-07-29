/**
 * 先判断是不是动态规划问题
 * 1. 首先判断是否存在多个重叠的子问题，并且每个子问题的结果都依赖另一个结构相同的子问题
 * 2. 动态解析方程式什么？
 * 3. 边界值又是什么？
 */

// 【可以最后看】首先这道题可以不通过动态规划完成，所以我认为这是最优解
// 因为只能买一次，卖一次，所以这个问题可以抽象成，数组中最大值和最小值的差值（要求最小值在左）
const maxProfit2 = function (prices) {
  let maxProfit = 0; // 记录当前收益最大值
  let minPrice = Infinity; // 记录截止当前，股价最低点

  for (let i = 0, len = prices.length; i < len; i++) {
    maxProfit = Math.max(prices[i] - minPrice, maxProfit); // 假设每天都卖，看看今天的股价和历史最低点的差值是否大于之前的最大差值，如果成立就更新收益最大值
    minPrice = Math.min(prices[i], minPrice); // 在遍历的过程中，如果发现了新的历史最低点，就更新历史最低点。不要直接Math.max(...prices)，这样会使得时间复杂度飙升为O(n^2)，可能导致超时。这种事情在遍历的过程中就可以通过两两对比的方式搞定。
  }

  return maxProfit;
};

// 动态规划
const maxProfit = function (prices) {
  const dp = []; // dp[i] 截止第i天之前的最大收益
  let min = prices[0]; // 当前股价的历史最低点

  dp[0] = 0;

  for (let i = 1, len = prices.length; i < len; i++) {
    // 到第i天了，要么操作，要么不操作
    // 截止第i天之前的最大收益可能因为今天的股价而发生改变，所以每天都要重新计算一下当天和历史最低点的差值来和i-1天之前能获得的最大收益做对比，
    // 如果更少了，那么第i天就不操作，延续dp[i-1]即可。
    dp[i] = Math.max(dp[i - 1], prices[i] - min);
    min = Math.min(prices[i], min);
  }

  return dp[prices.length - 1];
};

/**
 * https://xiaochen1024.com/courseware/60b4f11ab1aa91002eb53b18/61963bcdc1553b002e57bf13
 * 建议先完整的看完所有股票求解问题的视频课后再看下面的总结。
 * 我的理解和课程里讲的有点出入，课程里k被理解为“还可以交易k次”，这种理解我始终没明白，但是如果换成“截止到第i天已经交易了k次”，就瞬间理解了。
 * 总结：
 * 1. 当我们很难通过一个动态转移方程确定答案的时候（往往是找不到上一个子问题的结果和当下子问题的结果的关系是什么），就要想想，是否可以将子问题分不同的情况细化，将一个难解的子问题 拆分成 多个在某种情况标识下的子问题。然后站在上帝视角，选择所有情况下子问题的最优解。
 * 2. 每一个子问题的结果可能会按条件拆分成多种求解方式（可能出现的多种动态转移方程），在我们不知道哪一种求解情况是最优解的情况下，就要想办法将其全都保存，在最后取最优解。保存的最常见方法就是采用多维数组。
 * 比如，买股票的问题中（除了121这道简单题），我们无法单纯的根据截止到昨天的最佳收益判断截止到今天的最佳收益是什么，也就没法得到动态转移方程，此时就应该拆分情况：今天是否持有，截止到今天还能交易几次，从而得到一个3维结果数组。
 */
const maxProfit3 = function (prices) {
  let n = prices.length;
  let dp = Array.from(new Array(n), () => new Array(2));
  dp[0][0] = 0; //第0天不持有
  dp[0][1] = -prices[0]; //第0天持有
  for (let i = 1; i < n; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
    dp[i][1] = Math.max(dp[i - 1][1], -prices[i]);
  }
  return dp[n - 1][0];
};

let prices1 = [7, 1, 5, 3, 6, 4];
let prices2 = [7, 6, 4, 3, 1];

console.log(maxProfit(prices1));
console.log(maxProfit(prices2));
