// 给定一个含有 n 个正整数的数组和一个正整数 target 。

// 找出该数组中满足其总和大于等于 target 的长度最小的 子数组 [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 。

// 示例 1：

// 输入：target = 7, nums = [2,3,1,2,4,3]
// 输出：2
// 解释：子数组 [4,3] 是该条件下的长度最小的子数组。
// 示例 2：

// 输入：target = 4, nums = [1,4,4]
// 输出：1
// 示例 3：

// 输入：target = 11, nums = [1,1,1,1,1,1,1,1]
// 输出：0

// 提示：

// 1 <= target <= 109
// 1 <= nums.length <= 105
// 1 <= nums[i] <= 104

/**
 * 这道题算是作对了，采用滑动窗口法。因为没看清题目，把小于等于看成了等于，导致用例没有完全通过。
 * 实际按照等于来做，解法和难度完全一致。
 */
// 自己的方法：
var minSubArrayLen = function (target, nums) {
  let left = 0,
    right = 0;
  let minLen = 0;
  let sum = nums[0]; // 12
  while (right < nums.length) {
    if (sum < target) {
      right++;
      sum = sum + nums[right];
    } else if (sum > target) {
      sum = sum - nums[left];
      left++;
    } else {
      minLen = minLen ? Math.min(right - left + 1, minLen) : right - left + 1;
      right++;
      sum = sum + nums[right] - nums[left];
      left++;
    }
  }
  return minLen;
};

// 代码随想录题解
var minSubArrayLen = function (target, nums) {
  let start, end;
  start = end = 0;
  let sum = 0;
  let len = nums.length;
  let ans = Infinity;

  while (end < len) {
    sum += nums[end];
    while (sum >= target) {
      ans = Math.min(ans, end - start + 1);
      sum -= nums[start];
      start++;
    }
    end++;
  }
  return ans === Infinity ? 0 : ans;
};
