// https://leetcode.cn/problems/product-of-array-except-self/description/?envType=study-plan-v2&envId=top-interview-150

/**
 * 这道题想要做出来非常简单，下面是我的做法，只不过超时了
 */
var productExceptSelf = function (nums) {
  const res = [];
  const computed = (subnums) => {
    if (subnums.length <= 1) return subnums[0];
    return subnums.reduce((sum, curr) => sum * curr);
  };

  for (let i = 0, len = nums.length; i < len; i++) {
    let subnums = nums.slice(0, i).concat(nums.slice(i + 1));
    res[i] = computed(subnums);
  }

  return res;
};

/**
 * 如果不超时，需要按照题目做法，在O(n)的情况下实现，这时候一个非常精妙的办法叫做————DP状态机
 * 实际上就是采用类似动态规划的方式，自底向上的去求解子问题。而且动态规划的复杂度未必是O(n^2)，也有可能是O(n)
 * 相当于是用动态规划的方法去求解过程的一种方式。
 * 1. 当初考虑了用动态规划，但想到动态规划的解题场景，就果断放弃了。
 * 2. 认为动态规划会超时，认为动态规划是O(n^2)
 * 具体做法可以参见：https://leetcode.cn/problems/product-of-array-except-self/solutions/2783788/qian-hou-zhui-fen-jie-fu-ti-dan-pythonja-86r1/?envType=study-plan-v2&envId=top-interview-150
 */

var productExceptSelf2 = function (nums) {
  let prev = [];
  let suf = [];
  let dp = [];
  prev[0] = nums[0];
  suf[nums.length - 1] = nums[nums.length - 1];

  for (let i = 1, len = nums.length; i < len; i++) {
    prev[i] = prev[i - 1] * nums[i];
  }

  for (let j = nums.length - 2; j >= 0; j--) {
    suf[j] = suf[j + 1] * nums[j];
  }

  for (let k = 0, len = nums.length; k < len; k++) {
    if (k === 0) {
      dp[k] = suf[k + 1];
    } else if (k === nums.length - 1) {
      dp[k] = prev[k - 1];
    } else {
      dp[k] = prev[k - 1] * suf[k + 1];
    }
  }

  return dp;
};

let nums = [1, 2, 3, 4];

console.log(productExceptSelf2(nums));




/**
 * @param {number[]} nums
 * @return {number[]}
 */

// dp[i] = prev[i-1] * suf[i+1]
var productExceptSelf = function (nums) {

};