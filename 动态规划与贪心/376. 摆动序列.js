/**
 * 动态规划：
 *  这是我自己写的方法，竟然一把就秒了这道题。
 * 这道题的难点在于找动态转移方程。
 * dp[i][0] 前i个，最后差值为负值 的最长子序列长度
 * dp[i][1] 前i个，最后差值为正值，的最长子序列长度
 * 之所以分情况讨论，是因为前i个最长子序列中，它的最后一个差值为正或负，取的长度可能都不一样。
 * 可以这样想。如果前i-1个元素提取的子序列中，最后为正和负的长度一样，那么最后这个第i个能否成为前面某个子序列的一员的问题，就需要讨论。
 *
 * map是用来追踪动态规划最后一个元素的
 * map[i][0] 表示前i个元素中，最后差值为负值的那个子串 的最后一个元素。这样在求dp[i][1]时候能用上
 * map[i][0] 表示前i个元素中，最后差值为正值的那个子串 的最后一个元素。这样在求dp[i][0]时候能用上
 */

var wiggleMaxLength = function (nums) {
  if (nums.length === 1) return 1;
  const dp = new Array(nums.length).fill(1).map(() => []);
  const map = new Array(nums.length).fill(1).map(() => []);
  dp[0][0] = 1; // 因为只要有
  dp[0][1] = 1;
  map[0][0] = nums[0];
  map[0][1] = nums[0];

  for (let i = 1, len = nums.length; i < len; i++) {
    if (nums[i] - map[i - 1][1] < 0) {
      dp[i][0] = dp[i - 1][1] + 1; // 如果第i个元素可以融合进前面某个子串，最后形成的子串最后差值为负数，那么条件是nums[i]-<i-1及之前最后差值为正的子串>
      map[i][0] = nums[i]; // nums[i]能融入先前的最后差值为负数的子串，所以更新map[i][0]为当前的nums[i]
    } else {
      dp[i][0] = dp[i - 1][0]; // 如果第i个元素不能融入进最后形成的子串最后差值为负数子串，那么dp[i][0]自然继承dp[i - 1][0]
      map[i][0] = map[i - 1][0]; // map同理，继承map[i - 1][0]
    }
    if (nums[i] - map[i - 1][0] > 0) {
      dp[i][1] = dp[i - 1][0] + 1; // 如果第i个元素可以融合进前面某个子串，最后形成的子串最后差值为正数，那么条件是nums[i]-<i-1及之前最后差值为负的子串>
      map[i][1] = nums[i]; // nums[i]能融入先前的最后差值为正数的子串，所以更新map[i][0]为当前的nums[i]
    } else {
      dp[i][1] = dp[i - 1][1]; // 如果第i个元素不能融入进最后形成的子串最后差值为正数子串，那么dp[i][1]自然继承dp[i - 1][1]
      map[i][1] = map[i - 1][1]; // map同理，继承map[i - 1][1]
    }
  }

  return Math.max(dp[nums.length - 1][0], dp[nums.length - 1][1]); // 取最长
};
