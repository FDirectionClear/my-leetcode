/**
 * 自己写的题解，没有用到递归，只是单纯的计数，外加去除已经统计过的元素
 */
var majorityElement = function (nums) {
  if (nums.length === 1) return nums[0];
  const maxCount =
    nums.length % 2 ? Math.ceil(nums.length / 2) : nums.length / 2 + 1;
  const set = new Set();

  for (let i = 0, len = nums.length; i < len; i++) {
    const curr = nums[i];
    if (set.has(curr)) continue;
    set.add(curr);
    let count = 1;
    for (let j = i + 1; j < len; j++) {
      if (nums[j] === curr) {
        count++;
        if (count >= maxCount) {
          return curr;
        }
      }
    }
    count = 0;
  }
};

/**
 * 在这里总结一下分治的共同特征。分治的共同特征就2个：
 * 1. 类似于动态规划，局部的结果对全局的结果判断有利。全剧的结果可以通过组合局部的结果来得到。
 * 2. 局部怎么找？非常有规律，清一色的从中间半劈。左右。
 * 左中左、左中右、右中左、右中右.....
 */

// 如果使用分治，我的思路和萧晨是一样的，但是没有实操
// 感觉这道题用分治变得复杂了
var majorityElement = function (nums) {
  const getCount = (num, lo, hi) => {
    //统计lo到hi之间num的数量
    let count = 0;

    for (let i = lo; i <= hi; i++) {
      if (nums[i] === num) count++;
    }

    return count;
  };

  const getMode = (lo, hi) => {
    if (lo === hi) return nums[lo]; //拆分成更小的区间
    let mid = Math.floor((lo + hi) / 2);
    let left = getMode(lo, mid);
    let right = getMode(mid + 1, hi);

    if (left === right) return left;

    let leftCount = getCount(left, lo, hi); //统计区间内left的个数
    let rightCount = getCount(right, lo, hi); //统计区间内right的个数

    return leftCount > rightCount ? left : right; //返回left和right中个数多的那个
  };
  return getMode(0, nums.length - 1);
};
