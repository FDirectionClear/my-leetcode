/**
 * 这道题很难做，但有多种方法实现。这里的解决方法是双指针法
 * https://programmercarl.com/0042.%E6%8E%A5%E9%9B%A8%E6%B0%B4.html#%E5%85%B6%E4%BB%96%E8%AF%AD%E8%A8%80%E7%89%88%E6%9C%AC
 */
//                         1
// 1                       1           1
// 1           1           1     1     1
// 1     1     1     1     1     1     1
// 1 1   1 1   1     1 1   1 1   1     1
// 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1

/**
 * 思路是根据每一列计算，先计算排除自身高度情况下，每一列能容纳的最大水量，然后再减去自身高度，就能得到当前列头顶的最大水量。
 *
 * 如何判断一列排除自身高度情况下能容纳的水量是多少？
 * - 当前列左侧最高的形成左边界，右边最高的形成右边界。
 * - 取 Math.min(左边最多水，右边最多水)
 *
 * 当然如果当前列排除自身高度后能得到的最大水量还不如当前列自身高度高，那他头上顶的水自然就是0.
 * eg: 2 0 3 0 5。对于中间的3而言，左边最大是2，右边最大是5，他所能容纳的水是2,而2连自身列高都达不到，因此中间列顶着的水是0
 *
 * 3个不嵌套的for循环，时间复杂度O(n)
 *
 * 这道题也能用单调栈去做，但是用单调栈太难了。不如这个双指针方法来的简单。
 */

var trap = function (height) {
  const maxLHeight = [];
  const maxRHeight = [];
  const len = height.length;
  let sum = 0;

  maxLHeight[0] = height[0]; // 要包含自己，否则最后一个元素就无法通过计算得到了。
  for (let i = 1; i < len; i++) {
    maxLHeight[i] = Math.max(maxLHeight[i - 1], height[i]);
  }

  maxRHeight[len - 1] = height[len - 1];
  for (let i = len - 2; i >= 0; i--) {
    maxRHeight[i] = Math.max(maxRHeight[i + 1], height[i]);
  }

  // 第一列和最后一列肯定是不盛水的。当然也可以不排除第一列和最后一列，只不过要在maxLHeight溢出之外的地方给0
  for (let i = 1; i < len - 1; i++) {
    let count = Math.min(maxLHeight[i], maxRHeight[i]) - height[i];
    if (count > 0) {
      // 当然，一个特殊情况是 2 0 3 0 5。对于中间的3而言，左边最大是2，右边最大是5，他所能容纳的水是2
      // 而2连自身列高都达不到，因此中间列顶着的水是0
      sum += count;
    }
  }

  return sum;
};
