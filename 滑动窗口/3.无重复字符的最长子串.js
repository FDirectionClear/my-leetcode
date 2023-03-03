/**
 * 滑动窗口法应用场景：
 *  （1）一般是一些有规律数组问题的最优解
 *  （2）通常是连续的
 *  （3）窗口的大小可以是固定的，也可以是不固定的。
 * 
 * 主要做法：
 * （1）L、R连个指针，都在左起始点
 * （2）L向左移动，收缩窗口范围；R向右移动，扩张窗口范围。
 * 
 * 其他：
 * （1）滑动窗口法其实也是双指针法
 * （2）能用动态规划能解，同时也能用滑动窗口能解的问题，后者更简单，性能更佳
 * 
 *
 滑动窗口使用双指针解决问题，所以一般也叫双指针算法，因为两个指针间形成一个窗口。

什么情况适合用双指针呢？一般双指针是暴力算法的优化版，所以：

如果题目较为简单，且是数组或链表问题，往往可以尝试双指针是否可解。
如果数组存在规律，可以尝试双指针。
如果链表问题限制较多，比如要求 O(1) 空间复杂度解决，也许只有双指针可解。

也就是说，当一个问题比较有规律，或者较为简单，或较为巧妙时，可以尝试双指针（滑动窗口）解法。


 */

const lengthOfLongestSubstring = function(s) {
  const members = new Set()
  let maxLength = 0
  let L = R = 0
  let len = s.length

  for (R; R < len; R ++) { // 要先移动右边界，尝试扩张区间
    if (!members.has(s[R])) {
      members.add(s[R])
      maxLength = Math.max(members.size, maxLength) // 右边界扩张要不断更新最大长度
    } else {
      while (members.has(s[R])) {
        members.delete(s[L]) // 如果右重复，那就要尝试不断缩减左边界，直到将发生重复的点之前的部分截断，此时截断的包括那个发生重复的点
        L ++
      }
      members.add(s[R]) // 这一部很关键，清除掉和当前点发生重复的片段后，不要忘记将当前的点放入
    }
  }

  return maxLength
};

var s = "abcabcbb"
console.log(
  lengthOfLongestSubstring(s)
)

var s = "bbbbb"
console.log(
  lengthOfLongestSubstring(s)
)

var s = "pwwkew"
console.log(
  lengthOfLongestSubstring(s)
)

/**
 * 总结：
 *  1. 只要起始点是0，怎么得都是先移动右边界，尝试扩张
 *  2. 滑动窗口法通常都需要根据条件判断来决定是否需要继续下一步循环，所以用while循环更加合适
 *  3. 用Set存值，可以直接通过api进行delete操作和排重操作，这一点如果用数组会比较麻烦。
 */
