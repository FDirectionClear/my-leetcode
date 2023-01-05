/**https://leetcode.cn/problems/maximum-product-subarray/ */

/**
 * 动态规划方法：自底向上.
 * 1. 首先判断是否存在重叠的子问题，并且子问题的解决方式都依赖于上一个子问题，能找到动态转译方程？
 *  答：设dp[i]为第0项到第i项的最大的非空连续子数组的乘积。dp[i]取决于dp[i-1]的值。
 *  表面上看，dp[i]=dp[i-1]*nums[i]。
 * 2. 动态转移方程？
 *  答：需要注意：
*      1）在不知道x的具体值的情况下，一个数n与x相乘，因为n与x都可能是正数或是负数，也有可能是小数，所以dp[x-1] * dp[x] 未必> x；所以，dp[x+1]的取值，需要将dp[x]的最大值和最小是都计算出来，然后分别和dp[x+1]相乘，得到的两个结果再和x自身比较大小，以得到dp[x+1]
 *     2）任何数 n1 < n2 < 0，都有 n1 * 任何正数x（包括小数）< n2 * 任何正数（包括小数）；这个n1,n2可以视为是dp[x-1]的最大值和最小值
*      3）任何数 0 < n1 < n2，都有 n1 * 任何负数x（包括负小数）< n2 * 任何负数（包括负小数）；
       4）同号的情况，并且x ≠ 0，|n1| > |n2|, 那么 n1 * x > n2 * x
 */

const maxProduct = function(nums) {
  let memo = []
  memo[0] = [nums[0], nums[0]] // [最小值，最大值]
  for(let i = 1, len = nums.length; i < len; i ++) {
    memo[i] = []
    memo[i][0] = Math.min(memo[i-1][0] * nums[i], memo[i-1][1] * nums[i], nums[i])
    memo[i][1] = Math.max(memo[i-1][0] * nums[i], memo[i-1][1] * nums[i], nums[i])
  }
  let temp = []
  memo.forEach(item => temp = [...temp, ...item])
  memo = temp

  return Math.max(...memo)
};

const nums1 = [2,3,-2,4]
const nums2 = [-2,0,-1]
const nums3 = [-2,3,-4]
const nums4 = [2,-5,-2,-4,3]

console.log(
  maxProduct(nums1)
)
console.log(
  maxProduct(nums2)
)
console.log(
  maxProduct(nums3)
)
