/**
 * @param {number[]} nums
 * @return {number}
 */

// 示例 1：

// 输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
// 输出：6
// 解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
// 示例 2：

// 输入：nums = [1]
// 输出：1
// 示例 3：

// 输入：nums = [5,4,-1,7,8]
// 输出：23

// const max = -Infinity
// let res = []

// -2 > max = -Infinity
// max = -2
// res = [-2]

// 右指针移动
// -2 1 = -1
// -1 > -2
// max = -1
// res = [-2 1]

// 右指针移动
// -2 1 -3 = -4
// -4 < -1
// 左指针移动
// -4 - -2 = -2
// -2 < -1
// 左指针移动
// -2 - 1 = -3
// -3 < -1
// 左指针无法移动和i重合
// i继续向右移


// [-2,1,-3,4,-1,2,1,-5,4]
var maxSubArray = function (nums) {
  const max = -Infinity;
  const set = []
  res = '';
  let l = 0,
    r = 0;
  let currSum = 0;

  while (r < nums.length) {
    // 右进，加和
    currSum = currSum + nums[i];
    if (currSum > max) {
      // 如果当前值变大，继续右进
      max = currSum;
      set.push(nums[i]);
      res = set.join('')
      r ++
    } else {
      while(l < r) {
        currSum = currSum - nums[l]
        set.shift();
        if (currSum > max) {
          res = set.join('')
          break;
        }
      }
    }

  }
};
