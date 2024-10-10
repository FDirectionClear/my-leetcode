/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  let str = s.replace(/\W+/g, "").replace(/_+/g, "").toLowerCase();
  let i = 0,
    j = str.length - 1;

  while (j > i) {
    if (str[i] !== str[j]) {
      return false;
    }
    i++;
    j--;
  }

  return true;
};

// 示例 1：

// 输入: s = "A man, a plan, a canal: Panama"
// 输出：true
// 解释："amanaplanacanalpanama" 是回文串。
// 示例 2：

// 输入：s = "race a car"
// 输出：false
// 解释："raceacar" 不是回文串。
// 示例 3：

// 输入：s = " "
// 输出：true
// 解释：在移除非字母数字字符之后，s 是一个空字符串 "" 。
// 由于空字符串正着反着读都一样，所以是回文串。

/**
 * 注意：
 *  1. while 循环可以使用 break和continue，while执行感到疑惑时候看是不是把break和continue写混了
 *  2. 下面这个解法如果没有标点符号是可行的。如果需要标点符号就需要写正则表达式。
 */
var isPalindrome = function (s) {
  if (s.length === 1) return true;
  let l = 0,
    r = s.length - 1;

  while (l <= r) {
    if (s[l] === " ") {
      l++;
      continue;
    }
    if (s[r] === " ") {
      r--;
      continue;
    }
    if (s[l].toLowerCase() !== s[r].toLowerCase()) {
      return false;
    }
    l++;
    r--;
  }

  return true;
};

const s = "race a car";

console.log(isPalindrome(s));
