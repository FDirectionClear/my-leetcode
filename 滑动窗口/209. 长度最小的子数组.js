// 给定一个含有 n 个正整数的数组和一个正整数 target 。

// 找出该数组中满足其总和大于等于 target 的长度最小的
// 子数组
//  [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 。

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

// [2,3,1,2,4,3]

// 给做成等于target的了
var minSubArrayLen = function (target, nums) {
  const arr = []; // 2 3 1 2
  let res = Infinity;
  let sum = 0; // 8
  let r = 0, // 3
    l = 0; // 0

  for (let len = nums.length; r < len; r++) {
    arr.push(nums[r]);
    sum += nums[r];
    if (sum <= target) {
      if (sum === target) {
        res = Math.min(arr.length, res);
      }
    } else {
      while (l <= r) {
        arr.shift();
        sum -= nums[l];
        l++;
        if (sum <= target) {
          if (sum === target) {
            res = Math.min(arr.length, res);
          }
          break;
        }
      }
    }
  }

  return res === Infinity ? 0 : res;
};

// 大于等于
// ...
