/**
 * 这道题滑动窗口的味道明显，因为它是：连续的、按限制条件求值的、窗口内的状态有助于解题、本质是穷举...
 * 然后这道题找到左右指针移动的规律不太容易。我最开始用滑动窗口法想的思路解答错误。
 * 网友没几个人用滑动窗口，大多用动态规划。实际上这道题动态规划的特征也很明显。
 */
var maxSubArray = function (nums) {
  let left = 0;
  // 定义右指针
  let right = 0;
  // 定义窗口中的元素和，初始化为第一个元素
  let sumOfWindow = nums[0];
  // 定义结果，初始化为第一个元素
  let res = nums[0];

  // 只要右指针没有到倒数第二个索引，就一直往右走
  while (right < nums.length - 1) {
    // 右指针往右走一步
    right++;
    // 右指针走完，窗口就会扩大，所以窗口中的元素和就改变
    sumOfWindow += nums[right];
    // 如果右指针指向的元素比窗口中的元素和还大，那就说明窗口中右指针前面的数的总和拖后腿了，所以左指针要往右移，直到 nums[right] <= 窗口中的元素和
    while (nums[right] > sumOfWindow) {
      // 左指针往右移之前要先更新一下窗口中的元素和，要清白地离开
      sumOfWindow -= nums[left];
      left++;
    }
    // 左指针移完，窗口中的元素和一定是以 nums[right] 结尾的子数组的和中的最大值，所以我们要取这些和的最大值。
    res = Math.max(res, sumOfWindow);
  }
  return res;
};

/**
 * 动态规划，这是我想的思路，通过了全部测试用例，但是性能垫底。
 * 实际上可以状态压缩到比较优秀的性能，比如萧晨提供的状态转移方程就是一维的。
 */
function maxSubArray2(nums) {
  if (nums.length <= 0) return 0;
  /**
   * 下面是一个常见的错误点：
   * 1. 慎用 Array.prototype.fill 去实例化引用类型数组成员。因为这会导致所有数组成员都是同一个引用。
   * 修改其中任意一项，都会修改所有成员。
   * 2. 用Array.from是一个非常体现水平的方法。因为它原生结合了map实现。想要fill不同引用的引用类型成员，就用Array.from({ length: xxx }, ()=>{}||[])
   *
   */
  // const dp = new Array(nums.length).fill();
  const dp = Array.from({ length: nums.length }, () => []);
  dp[0][0] = -Infinity;
  dp[0][1] = nums[0];

  for (let i = 1, len = nums.length; i < len; i++) {
    dp[i][0] = Math.max(dp[i - 1][1], dp[i - 1][0]);
    dp[i][1] = Math.max(dp[i - 1][1] + nums[i], nums[i]);
  }

  console.log(dp);

  return Math.max(dp[nums.length - 1][0], dp[nums.length - 1][1]);
}

const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];

console.log(maxSubArray2(nums));
