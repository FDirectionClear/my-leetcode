/**
 * 我的答案：滑动窗口法
 * 和题解答案基本类似。
 * 滑动窗口法，有些时候不需要双重循环，不要基于双重循环的思维定式去入手
 */
var containsNearbyDuplicate = function(nums, k) {
  let set = new Set()
  let j = 0

  for (let i = 0, len = nums.length; i < len; i ++) {
    if (i - j > k) {
      set.delete(nums[j])
      j ++
    }
    if (!set.has(nums[i])) {
      set.add(nums[i])
    } else {
      return true
    }
  }

  return false
};
