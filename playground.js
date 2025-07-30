dp[i][0] = Math.max(dp[i - 1][1], dp[i - 1][0]);
dp[i][1] = dp[i - 1][0] + nums[i];

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  const dp = [[0, nums[0]]];

  for (let i = 1, len = nums.length; i < len; i++) {
    dp[i] = [];
    dp[i][0] = Math.max(dp[i - 1][1], dp[i - 1][0]);
    dp[i][1] = dp[i - 1][0] + nums[i];
  }

  return Math.max(dp[nums.length - 1][0], dp[nums.length - 1][1]);
};
