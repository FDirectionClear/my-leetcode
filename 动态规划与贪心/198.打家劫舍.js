/**每一家都可以偷或者不偷，如果决定偷第i家，那么他的最大收益取决于前面那家偷或者不偷的所能实现的最大收益 */
const rob = function (nums) {
  const dp = [[0, nums[0]]];

  for (let i = 1, len = nums.length; i < len; i++) {
    dp[i] = [];
    dp[i][0] = Math.max(dp[i - 1][1], dp[i - 1][0]); // 不偷第i家，那么前一家可以偷也可以不偷，就看前一家偷或者不偷实现的最大收益谁更大。
    dp[i][1] = dp[i - 1][0] + nums[i]; // 一定偷第i家，那前一家一定不能偷，所以只看不偷前一家的最大收益+当前家所拥有的钱即可
  }

  return Math.max(dp[nums.length - 1][0], dp[nums.length - 1][1]);
};

// 实际上这道题的动态转移方程也可以只有一个维度
//dp[i]表示0-i能偷的最大金额
const rob2 = (nums) => {
  const len = nums.length;
  const dp = [nums[0], Math.max(nums[0], nums[1])]; //初始化dp数组的前两项
  for (let i = 2; i < len; i++) {
    //从第三个位置开始遍历
    //dp[i - 2] + nums[i] 表示偷当前位置，那么i-1的位置不能偷，
    //而且需要加上dp[i-2],也就是前i-2个房间的金钱
    //dp[i - 1]表示偷当前位置，只偷i-1的房间
    dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);
  }
  return dp[len - 1]; //返回最后最大的项
};
