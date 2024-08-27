// 给定一个字符串 s ，找到 它的第一个不重复的字符，并返回它的索引 。如果不存在，则返回 -1 。

// 示例 1：

// 输入: s = "leetcode"
// 输出: 0
// 示例 2:

// 输入: s = "loveleetcode"
// 输出: 2
// 示例 3:

// 输入: s = "aacbb"
// 输出: -1

// 提示:

// 1 <= s.length <= 105
// s 只包含小写字母

/**
 * 没看题解，但是xiaochen的题解看上去更优秀，但也更难理解
 * 下面是我的题解。
 */
const firstUniqChar = function (s) {
  if (s.length === 1) return 0;
  let set = new Set([]);

  for (let i = 0, len = s.length; i < len; i++) {
    if (set.has(s[i])) continue;
    if (i === len - 1) {
      return i;
    }
    set.add(s[i]);
    for (let j = i + 1; j < len; j++) {
      if (s[j] === s[i]) break;
      if (j === len - 1) {
        return i;
      }
    }
  }

  return -1;
};

// const s = "loveleetcode";
const s = "dddccdbba";
console.log(firstUniqChar(s));
