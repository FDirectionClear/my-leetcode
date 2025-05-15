// 给定两个数组 nums1 和 nums2 ，返回 它们的 交集 。输出结果中的每个元素一定是 唯一 的。我们可以 不考虑输出结果的顺序 。

// 示例 1：

// 输入：nums1 = [1,2,2,1], nums2 = [2,2]
// 输出：[2]
// 示例 2：

// 输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
// 输出：[9,4]
// 解释：[4,9] 也是可通过的

// 提示：

// 1 <= nums1.length, nums2.length <= 1000
// 0 <= nums1[i], nums2[i] <= 1000

/**
 * 我的写法。
 * 哈希表的题对javascript而言很便利。
 */
var intersection = function (nums1, nums2) {
  const set1 = new Set(nums1); // 顺带去重
  const set2 = new Set(nums2);
  const result = [];

  // 也可以额外增加一步优化。就是让set1一定是相对短的那个

  for (num of set1) {
    if (set2.has(num)) {
      result.push(num);
    }
  }

  return result;
};

/**
 * 秀操作
 */
function intersection(nums1, nums2) {
  return Array.from(new Set(nums1.filter((i) => nums2.includes(i))));
}
