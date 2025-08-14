/**
 * 没有任何技巧，也没有使用单调栈，纯暴力求解，也没超时
 */
// 输入：nums1 = [4,1,2], nums2 = [1,3,4,2].
// 输出：[-1,3,-1]
var nextGreaterElement2 = function (nums1, nums2) {
  const result = [];

  for (let i = 0, len = nums1.length; i < len; i++) {
    const idxIn2 = nums2.indexOf(nums1[i]);
    if (idxIn2 === nums2.length - 1) {
      // 如果当前已经是最后一个了
      result.push(-1);
      continue;
    }
    for (let j = idxIn2 + 1, L = nums2.length; j < L; j++) {
      if (nums2[j] > nums1[i]) {
        // 如果已经找到了第一个比nums[i]更大的元素，那么直接统计进入结果。
        // 跳出循环
        result.push(nums2[j]);
        break;
      } else if (j === nums2.length - 1) {
        // 如果已经找到了最后一个，还没得到更大的元素，说明找不到了，放入-1
        result.push(-1);
      }
    }
  }

  return result;
};

// result = [3,4,-1];
// stack = [4, 2]; // Ying

// curr=3
// 1<3
// stack.pop() = 1
// result push 3
// stach push 3

// curr=4
// 3<4
// stack.pop() = 3
// result.push 4
// stack.push 4

// curr=2
// 4>2
// result.push(-1)
// stack.push 2

/**
 * 比较大小，数组，一个元素处理一次就没有后续处理必要了。所以这道题用单调栈的味道很明显
 *
 * 自己写的单调栈的写法，想了好久，实际上只关注nums2就行，找到全部答案后，只需要映射nums1就可以。
 *
 * stack中存的不一定是索引位置，也可以是数据本身。result也不一定是数组，也可以是对象。
 */
var nextGreaterElement = function (nums1, nums2) {
  const resultMap = {};
  const stack = []; // [4]

  for (let i = 0, len = nums2.length; i < len; i++) {
    if (i === 0) {
      // 第一个只有等待到下一轮才能经过判断逻辑，才能计算出映射的result，所以首个只能先放进stack中等待处理
      stack.push(nums2[i]);
      continue;
    }
    while (stack.length && nums2[i] > stack[stack.length - 1]) {
      // 如果说当前正在遍历的元素 > stack栈头对应的nums2中的元素
      resultMap[stack[stack.length - 1]] = nums2[i];
      stack.pop();
    }
    stack.push(nums2[i]);
  }

  return nums1.map((item) => resultMap[item] ?? -1);
};

var nums1 = [4, 1, 2],
  nums2 = [1, 3, 4, 2];

// var nums1 = [2, 4],
//   nums2 = [1, 2, 3, 4];

console.log(nextGreaterElement(nums1, nums2));

/**
 * 代码随想录的答案，实际上和我的想法如出一辙
 */
var nextGreaterElement = function (nums1, nums2) {
  let stack = [];
  let map = new Map();
  for (let i = 0; i < nums2.length; i++) {
    while (stack.length && nums2[i] > nums2[stack[stack.length - 1]]) {
      let index = stack.pop();
      map.set(nums2[index], nums2[i]);
    }
    stack.push(i);
  }

  let res = [];
  for (let j = 0; j < nums1.length; j++) {
    res[j] = map.get(nums1[j]) || -1;
  }

  return res;
};
