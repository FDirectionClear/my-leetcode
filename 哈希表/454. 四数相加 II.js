// 给你四个整数数组 nums1、nums2、nums3 和 nums4 ，数组长度都是 n ，请你计算有多少个元组 (i, j, k, l) 能满足：

// 0 <= i, j, k, l < n
// nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0

// 示例 1：

// 输入：nums1 = [1,2], nums2 = [-2,-1], nums3 = [-1,2], nums4 = [0,2]
// 输出：2
// 解释：
// 两个元组如下：
// 1. (0, 0, 0, 1) -> nums1[0] + nums2[0] + nums3[0] + nums4[1] = 1 + (-2) + (-1) + 2 = 0
// 2. (1, 1, 0, 0) -> nums1[1] + nums2[1] + nums3[0] + nums4[0] = 2 + (-1) + (-1) + 0 = 0
// 示例 2：

// 输入：nums1 = [0], nums2 = [0], nums3 = [0], nums4 = [0]
// 输出：1

//   提示：

// n == nums1.length
// n == nums2.length
// n == nums3.length
// n == nums4.length
// 1 <= n <= 200
// -228 <= nums1[i], nums2[i], nums3[i], nums4[i] <= 228

/**
 * 这道题没想出来，一方面是因为题意理解错误：没注意到一定是4个数组，本以为数组数量可以不确定。
 * 另一方面，没有找到如何去建表。
 */
var fourSumCount = function (nums1, nums2, nums3, nums4) {
  const twoSumMap = new Map();
  let count = 0;
  // 统计nums1和nums2数组元素之和，和出现的次数，放到map中
  for (const n1 of nums1) {
    for (const n2 of nums2) {
      const sum = n1 + n2;
      twoSumMap.set(sum, (twoSumMap.get(sum) || 0) + 1);
    }
  }
  // 找到如果 0-(c+d) 在map中出现过的话，就把map中key对应的value也就是出现次数统计出来
  for (const n3 of nums3) {
    for (const n4 of nums4) {
      const sum = n3 + n4;
      count += twoSumMap.get(0 - sum) || 0;
    }
  }

  return count;
};
