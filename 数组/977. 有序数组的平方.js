// 给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。

// 示例 1：

// 输入：nums = [-4,-1,0,3,10]
// 输出：[0,1,9,16,100]
// 解释：平方后，数组变为 [16,1,0,9,100]
// 排序后，数组变为 [0,1,9,16,100]
// 示例 2：

// 输入：nums = [-7,-3,2,3,11]
// 输出：[4,9,9,49,121]

// 提示：

// 1 <= nums.length <= 104
// -104 <= nums[i] <= 104
// nums 已按 非递减顺序 排序

// 进阶：

// 请你设计时间复杂度为 O(n) 的算法解决本问题

/**
 * 自我实现，按照O(n)复杂度进行尝试
 */

var sortedSquares = function (nums) {
  let left = 0, // left其实永远是0
    right = nums.length - 1;
  const getPow2 = (val) => Math.pow(val, 2);

  if (nums.length === 1) {
    nums[0] = getPow2(nums[0]);
    return nums;
  }

  while (left < right) {
    if (right === nums.length - 1) {
      // 说明是第一轮移动指针，left和right都需要平方
      nums[left] = getPow2(nums[left]);
    }

    nums[right] = getPow2(nums[right]);

    if (nums[right] < nums[left]) {
      let temp = nums[left];
      nums[left] = nums[right];
      nums[right] = temp;
    }

    right--;
  }

  return nums;
};

// [-4,-1,0,3,10]

// left和right都平方
// [16, -1, 0, 3, 100]

// right-1 后平方与left比较
// [16 -1 0 9 100]

// left大，left和right交换
// [9 -1 0 16 100]

// right - 1，后平方
// [9 -1 0 16 100]

// right < left，交换
// [0 -1 9 16 100]

// right - 1, 后平方
// [0 1 9 16 100]

// right > left，什么都有不做
// [0 1 9 16 100]

// right - 1 === left，结束，返回
// [0 1 9 16 100]

// ==============

// [-7,-3,2,3,11]

// left和right都平方
// [49 -3 2 3 121]

// left < right，不交换
// [49 -3 2 3 121]

// right - 1，后平方
// [49 -3 2 9 121]

// left > right，交换
// [9 -2 2 49 121]

// right - 1，后平方
// [9 -2 4 49 121]

// left > right，交换
// [4 -2 9 49 121]

// right - 1，后平方
// [9 4 4 49 121]

// left > right，交换
// [4, 9 4 49 121]
