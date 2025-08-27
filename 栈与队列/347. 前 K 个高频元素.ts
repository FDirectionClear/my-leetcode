// 输入：nums = [1,1,1,2,2,3], k = 2
// 输出：[1,2]

/**
 * 完全自己构思，也完全没有用到栈的构思，反而用的是hash表的做法。但这个答案对于js而言已经是标准答案！
 * 实际上这道题carl给出的做法是用 小顶堆。而js中没有堆这个数据结构，需要自己构造堆。非常麻烦。
 * 因此不做重点。面试估计够呛能涉及。但是需要知道什么是大顶堆，什么是小顶堆。
 * 
 * 一看到记录元素出现频率了，不用想花招，直接就是hash法。
 * 后面用堆的做法也是基于hash法得到的结果，通过奇技淫巧实现的。所以hash法统计各个元素的频率是绕不开的。
 * 也就是对结果排序取前k个的做法需要考虑。 
 */
var topKFrequent = function(nums: number[], k: number) {
  const hashMap = new Map<number, number>()
  let sortedHashMap = []

  for (let i = 0, len = nums.length; i < len; i ++) {
    if (hashMap.has(nums[i])) {
      hashMap.set(nums[i], hashMap.get(nums[i])! + 1)
    } else {
      hashMap.set(nums[i], 1)
    }
  }

  sortedHashMap = Array.from(hashMap).sort((a, b) => b[1] - a[1]).slice(0, k)
  console.log(sortedHashMap)

  return sortedHashMap.map((item) => item[0])
};

var nums = [1,1,1,2,2,3], k = 2
console.log(topKFrequent(nums, k))

var nums = [1], k = 1
console.log(topKFrequent(nums, k))

var nums = [1,2,1,2,1,2,3,1,3,2], k = 2
console.log(topKFrequent(nums, k))
