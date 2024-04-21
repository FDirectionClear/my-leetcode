/**
 * 如果借助js的split(' ')和reverse api就没啥意思了。
 * 下面用双指针做。
 */
var reverseWords = function (s) {
  let arr = s.split("");

  let l = 0, r = l;
  while (l < arr.length) {
      //找到结尾的空格
      while (arr[r] && arr[r] !== " ") {
          r++;
      }

      //反转单词
      for (let i = l, j = r - 1; i < j; i++, j--) {
          // 这个es6技巧，在按位交换的过程中非常实用。
          [arr[i], arr[j]] = [arr[j], arr[i]];
      }

      //跳到下一个单词
      l = r + 1;
      r = l;
  }

  return arr.join("");
};
