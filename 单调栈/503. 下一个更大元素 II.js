// 给定一个循环数组 nums （ nums[nums.length - 1] 的下一个元素是 nums[0] ），返回 nums 中每个元素的 下一个更大元素 。

// 数字 x 的 下一个更大的元素 是按数组遍历顺序，这个数字之后的第一个比它更大的数，这意味着你应该循环地搜索它的下一个更大的数。如果不存在，则输出 -1 。

// 示例 1:

// 输入: nums = [1,2,1]
// 输出: [2,-1,2]
// 解释: 第一个 1 的下一个更大的数是 2；
// 数字 2 找不到下一个更大的数；
// 第二个 1 的下一个最大的数需要循环搜索，结果也是 2。
// 示例 2:

// 输入: nums = [1,2,3,4,3]
// 输出: [2,3,4,-1,4]

// 提示:

// 1 <= nums.length <= 104
// -109 <= nums[i] <= 109

/**
 * - 单调栈。
 * - 循环数组固定圈数的方法就是让循环的次数为 len * 2
 */
var nextGreaterElements = function (nums) {
  const result = new Array(nums.length).fill(-1); // 存元素
  const stack = []; // 存索引

  // 循环次数为2*len，一定能绕2周
  for (let i = 0, len = nums.length; i < 2 * len; i++) {
    let idx = i < len ? i : i % len; // 无论是第一圈还是第二圈，都要保证当下的索引正确

    while (stack.length && nums[idx] > nums[stack[stack.length - 1]]) {
      // 不断出栈，如果下一个>上一个，就将未找到答案的索引出栈，找到对应元素，记录到result中
      result[stack.pop()] = nums[idx];
    }

    if (i <= len) {
      // 第一圈已经push过了，第二圈不进行push
      stack.push(idx);
    }
  }

  return result;
};

/**
 * 代码随想录给的答案，几乎和我的想法一致，包括循环数组方面
 */
var nextGreaterElements = function (nums) {
  const len = nums.length;
  let stack = [];
  let res = Array(len).fill(-1);
  for (let i = 0; i < len * 2; i++) {
    while (stack.length && nums[i % len] > nums[stack[stack.length - 1]]) {
      const index = stack.pop();
      res[index] = nums[i % len];
    }
    stack.push(i % len);
  }
  return res;
};
