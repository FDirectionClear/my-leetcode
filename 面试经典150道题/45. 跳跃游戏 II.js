/**
 * 思路对了，我用的动态规划。但是综合性能很差，虽然通过了所有测试用例，但是性能排名倒数第一。
 * 这道题用动态规划去做是一种全新的求解动态转移方程的过程。不再是一个简单的公式能搞定的，动态转移方程甚至也需要循环去求。
 * 本来想着用Math.min去写，但是想想这样写看上去很奇怪，不容易理解，就用普通
 * 的for循环来代替Math.min去做
 */
// dp[i] = Math.min(i-(i-1) + nums[i-1] >= i ? dp[i-1] + 1 : Infinity, dp[i-2] + 1, dp[i-3]+1)

// j + num[j] >= i ? dp[j] + 1 : Infinity; j < i;

// dp[0] = 0
// dp[1] = Math.min(0 + num[0] >= 1 ? dp[0] + 1 : Infinity)
var jump = function (nums) {
  if (nums.length === 1) return 0;
  const dp = new Array(nums.length).fill(Infinity);
  dp[0] = 0;

  for (let i = 1, len = nums.length; i < len; i++) {
    let minstep = Infinity;
    for (let j = i - 1; j >= 0; j--) {
      if (j + nums[j] >= i) {
        dp[i] = dp[j] + 1;
      } else {
        dp[i] = Infinity;
      }
      if (dp[i] < minstep) {
        minstep = dp[i];
      }
    }
    dp[i] = minstep;
  }

  return dp[nums.length - 1];
};

/**
 * 这道题的经典解法应该是贪心算法
 */
