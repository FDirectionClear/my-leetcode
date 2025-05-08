// https://programmercarl.com/0027.%E7%A7%BB%E9%99%A4%E5%85%83%E7%B4%A0.html#%E6%80%9D%E8%B7%AF

// 给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素。元素的顺序可能发生改变。然后返回 nums 中与 val 不同的元素的数量。

// 假设 nums 中不等于 val 的元素数量为 k，要通过此题，您需要执行以下操作：

// 更改 nums 数组，使 nums 的前 k 个元素包含不等于 val 的元素。nums 的其余元素和 nums 的大小并不重要。
// 返回 k。

// 示例 1：

// 输入：nums = [3,2,2,3], val = 3
// 输出：2, nums = [2,2,_,_]
// 解释：你的函数函数应该返回 k = 2, 并且 nums 中的前两个元素均为 2。
// 你在返回的 k 个元素之外留下了什么并不重要（因此它们并不计入评测）。
// 示例 2：

// 输入：nums = [0,1,2,2,3,0,4,2], val = 2
// 输出：5, nums = [0,1,4,0,3,_,_,_]
// 解释：你的函数应该返回 k = 5，并且 nums 中的前五个元素为 0,0,1,3,4。
// 注意这五个元素可以任意顺序返回。
// 你在返回的 k 个元素之外留下了什么并不重要（因此它们并不计入评测）。

// 原地算法的核心要求：
// ‌允许创建新变量‌：例如临时变量、指针、索引等，只要数量是固定且与输入规模无关（即空间复杂度为 O(1)）。
// ✅ 示例：交换数组元素时需要的 temp 变量。
// ✅ 示例：双指针法中的 left 和 right 指针。
// ‌不允许创建额外数据结构‌：如新数组、哈希表、列表等，这些会导致额外空间复杂度超过 O(1)。
// ❌ 示例：新建一个数组存储结果，再复制回原数组。
// ❌ 示例：使用递归且递归栈深度与输入规模相关（导致隐式 O(n) 空间）。

/**
 * 这个做法算是借用js的splice了
 */
var removeElement = function (nums, val) {
  let i = 0,
    noEqualCount = 0;

  while (i < nums.length) {
    if (nums[i] === val) {
      nums.splice(i, 1);
    } else {
      noEqualCount++;
      i++;
    }
  }

  return noEqualCount;
};

/**
 * 补充一个不需要splice的做法（自己的做法，双指针-首尾指针法）
 */
var removeElement2 = function (nums, val) {
  const len = nums.length;
  let k = 0;
  let left = 0;
  let right = len - 1;
  // 操作n次，n=nums的长度，用for循环去控制，当然这里也可以用while循环判断left<=right去控制
  for (let i = 0; i < len; i++) {
    if (nums[left] !== val) {
      left++;
      k++;
    } else {
      let temp = nums[left];
      nums[left] = nums[right];
      nums[right] = temp;
      right--;
    }
  }

  console.log(k, nums);
  return k;
};

/**
 * 补充一个课程中涉及到的双指针法（双指针-快慢指针）
 * 这个方法不好理解，左指针内的是要返回的“新数组”。右指针则承担寻找“新数组”中的元素的任务。只不过两个指针是在
 * 同一个数组中操作的。可以将左指针内形成的“新数组”理解成一个全新的数组。
 */
var removeElement3 = function (nums, val) {
  let k = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] != val) {
      nums[k++] = nums[i];
    }
  }
  return k;
};

removeElement2([3, 2, 2, 3], 3);
