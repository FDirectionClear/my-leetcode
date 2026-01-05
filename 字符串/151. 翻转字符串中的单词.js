// 给你一个字符串 s ，请你反转字符串中 单词 的顺序。
// 单词 是由非空格字符组成的字符串。s 中使用至少一个空格将字符串中的 单词 分隔开。
// 返回 单词 顺序颠倒且 单词 之间用单个空格连接的结果字符串。

// 注意：输入字符串 s中可能会存在前导空格、尾随空格或者单词间的多个空格。返回的结果字符串中，单词间应当仅用单个空格分隔，且不包含任何额外的空格。

// 示例 1：

// 输入：s = "the sky is blue"
// 输出："blue is sky the"
// 示例 2：

// 输入：s = "  hello world  "
// 输出："world hello"
// 解释：反转后的字符串中不能存在前导空格和尾随空格。

// 输入：s = "a good   example"
// 输出："example good a"
// 解释：如果两个单词间有多余的空格，反转后的字符串需要将单词间的空格减少到仅有一个。

"the sky is blue";

var reverseWords = function (s) {
  const res = [];
  let start = 0;

  for (let i = 0, len = s.length; i < len; i++) {
    if (s[i] === " " && real) {
      res.push(s.slice(start, i - 1));
      real = false;
    } else if (start === 0) {
      start = i;
    }
  }

  return res.join(" ");
};

// ("  the  is blue   ");

// 0 空
// 1 空
// 2 t  start = 2
// 3 h
// 4 e
// 5 空
// slice(start = 2, i - 1= 4) = the
// res = [the]
// real = 0

// 6 空
// 7 空
// 8 i start = 8
// 9 s
// 10 空
// slice(start = 8, i - 1 = 9) = is
// res = [sky, the]
// start = 0
// ...

var reverseWords = function (s) {
  if (s.length) {}
};