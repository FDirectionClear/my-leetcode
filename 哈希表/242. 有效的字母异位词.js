// 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的 字母异位词。

// 示例 1:

// 输入: s = "anagram", t = "nagaram"
// 输出: true
// 示例 2:

// 输入: s = "rat", t = "car"
// 输出: false

// 提示:

// 1 <= s.length, t.length <= 5 * 104
// s 和 t 仅包含小写字母

// 进阶: 如果输入字符串包含 unicode 字符怎么办？你能否调整你的解法来应对这种情况？

/**
 * 很简单，就是建立映射表。需要注意异位词的定义是：两个字符串用到的单词和各个单词的数量必须严格一致。只是字母的排布数量可能不一致。
 */
var isAnagram = function (s, t) {
  const map = {};

  for (let i = 0, len = s.length; i < len; i++) {
    if (!map[s[i]]) {
      map[s[i]] = 1;
    } else {
      map[s[i]]++;
    }
  }

  for (let j = 0, l = t.length; j < l; j++) {
    if (map[t[j]]) {
      if (--map[t[j]] === 0) {
        delete map[t[j]];
      }
      continue;
    }
    return false;
  }

  if (Object.keys(map).length > 0) {
    return false;
  }

  return true;
};

/**
 * 答案甚至可以用数组去维护。
 */
var isAnagram = function (s, t) {
  if (s.length !== t.length) return false;
  const resSet = new Array(26).fill(0);
  const base = "a".charCodeAt();
  for (const i of s) {
    resSet[i.charCodeAt() - base]++;
  }
  for (const i of t) {
    if (!resSet[i.charCodeAt() - base]) return false;
    resSet[i.charCodeAt() - base]--;
  }
  return true;
};
