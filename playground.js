// 截止到i（包含i）
max[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1]); // 不取当前数，之前的最大值，可能是前一个取或者不取的情况
max[i][1] = Math.max(nums[i], dp[i - 1][1] * nums[i]); // 必须取当前数，分为两种情况：必须看取前一个数的最大值和当前数的乘机。取前一个数的最大值和当前数构成的值更小了（比如dp[i-1][1]是-2，nums[i]是1，则不如从nums[i]单独开一个连续的子数组）

/**
 * 这道题的动态转移方程非常多种情况。因为nums[i]可以是正负数，而最大值和nums[i]的符号强相关。
 * 因此我们要加入分类讨论。
 *
 * 考虑的是通过三维的dp来储存状态，但是考虑到三维的dp维护起来太复杂（通过第三维来区分最小值和最大值），
 * 而事实上，动态转移方程的储存结果没有人能限制只能有一个变量。所以就用max和min来维护了。
 */

var maxProduct = function (nums) {
  const max = Array.from({ length: nums.length }, () =>
    new Array(2).fill(-Infinity)
  );
  const min = Array.from({ length: nums.length }, () =>
    new Array(2).fill(Infinity)
  );

  max[0][1] = nums[0];
  min[0][1] = nums[0];

  for (let i = 1, len = nums.length; i < len; i++) {
    // max[i][0]：截止到nums[i]（包含），但不取nums[i]的子数组乘积最大值
    // max[i][1]：截止到nums[i]（包含），但必须取nums[i]的子数组乘积最大值
    // min[i][0]：截止到nums[i]（包含），但不取nums[i]的子数组乘积最小值
    // min[i][1]：截止到nums[i]（包含），但必须取nums[i]的子数组乘积最小值
    max[i][0] = Math.max(max[i - 1][0], max[i - 1][1]);
    min[i][0] = Math.min(min[i - 1][1], min[i - 1][0]);

    // 因为nums[i]可以是正负数，而最大值和nums[i]的符号强相关，所以需要对正负数以及0的情况进行分类讨论
    if (nums[i] < 0) {
      // 如果当前数是负数
      max[i][1] = Math.max(min[i - 1][1] * nums[i], nums[i]); // 因为需要保持连续，必须取之前连续的最大值，但结果可能是更小了，所以要和自身对比一下。
      min[i][1] = Math.min(max[i - 1][1] * nums[i], nums[i]); // 因为需要保持连续，必须取之前连续的最大值，但结果可能是更大了，所以要和自身对比一下。
    } else if (nums[i] > 0) {
      max[i][1] = Math.max(max[i - 1][1] * nums[i], nums[i]); // 道理同上
      min[i][1] = Math.min(min[i - 1][1] * nums[i], nums[i]);
    } else {
      max[i][1] = 0;
      min[i][1] = 0;
    }
  }

  return Math.max(max[nums.length - 1][1], max[nums.length - 1][0]);
};
