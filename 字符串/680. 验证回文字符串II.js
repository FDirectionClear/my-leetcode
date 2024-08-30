// 给你一个字符串 s，最多 可以从中删除一个字符。

// 请你判断 s 是否能成为回文字符串：如果能，返回 true ；否则，返回 false 。

// 示例 1：

// 输入：s = "aba"
// 输出：true
// 示例 2：

// 输入：s = "abca"
// 输出：true
// 解释：你可以删除字符 'c' 。
// 示例 3：

// 输入：s = "abc"
// 输出：false

// 提示：

// 1 <= s.length <= 105
// s 由小写英文字母组成

// abcba
// abddeba
// abcddeba

// abddeba

// a a i0 j6
// b b i1 j5
// d != e i2 j4
// return validPalindrome(abdeba) || validPalindrome(abddba)

// if j - i <= 1

/**
 * 性能比较差，属于leetcode倒数，但是非常简单理解，而且万能，还可以限制机会的次数。功能更加强大。
 */
var validPalindrome = function (s) {
  let chance = 1;

  const validPalindByChance = function (substr, chance) {
    for (let len = substr.length, i = 0, j = len - 1; j - i >= 1; i++, j--) {
      let left = substr[i],
        right = substr[j];
      if (left !== right) {
        if (chance) {
          const tempArr1 = substr.split("");
          const tempArr2 = substr.split("");
          tempArr1.splice(i, 1);
          tempArr2.splice(j, 1);
          return (
            validPalindByChance(tempArr1.join(""), chance - 1) ||
            validPalindByChance(tempArr2.join(""), chance - 1)
          );
        }
        return false;
      }
    }

    return true;
  };

  return validPalindByChance(s, chance);
};

/**
 * 萧晨给的答案非常的巧妙，性能优秀，但是仅能限制一次。
 * 这里学会一个技巧，就是主函数里的逻辑和内部的回调函数可以很相似，但是不同。
 * 在主函数里可以控制流程，因为主函数只会只会执行一次，之后就一直是内部的递归函数执行，所以一些一次性的东西可以写在主函数里
 */
function isPalindrome(str, l, r) {
  while (l < r) {
    //对撞指针不断判断两边的数字是否相等
    if (str[l] != str[r]) {
      return false;
    }
    l++;
    r--;
  }
  return true;
}

var validPalindrome2 = function (str) {
  let l = 0,
    r = str.length - 1; //头尾指针
  while (l < r) {
    if (str[l] != str[r]) {
      //左右指针不一样 还有一次机会，左指针向前一步或者右指针向后一步继续验证
      return isPalindrome(str, l + 1, r) || isPalindrome(str, l, r - 1);
    }
    l++;
    r--;
  }
  return true;
};

const s = "abc";
console.log(validPalindrome(s));
