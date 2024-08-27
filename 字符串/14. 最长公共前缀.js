// 编写一个函数来查找字符串数组中的最长公共前缀。

// 如果不存在公共前缀，返回空字符串 ""。

// 示例 1：

// 输入：strs = ["flower","flow","flight"]
// 输出："fl"
// 示例 2：

// 输入：strs = ["dog","racecar","car"]
// 输出：""
// 解释：输入不存在公共前缀。

/*
  这是我的题解，不是官方题解，使用递归，每次只处理头两个，然后返回公共字符串
 */
var longestCommonPrefix = function (strs) {
  if (!strs.length) return "";
  if (strs.length === 1) return strs[0];
  const first = strs.shift();
  const second = strs.shift();
  let prefix = "";
  for (let i = 0, len = Math.min(first.length, second.length); i < len; i++) {
    if (first[i] === second[i]) {
      prefix += first[i];
    } else {
      break;
    }
  }
  strs.unshift(prefix);
  return longestCommonPrefix(strs);
};

/*
  萧晨给的题解，实际上做法是一致的
 */
var longestCommonPrefix2 = function (strs) {
  if (strs.length == 0) return "";
  let ans = strs[0]; //ans初始值为字符串数组的第一个
  for (let i = 1; i < strs.length; i++) {
    //循环字符串数组
    let j = 0;
    for (; j < ans.length && j < strs[i].length; j++) {
      //循环字符，找到第一个不相同的位置
      if (ans[j] != strs[i][j]) break;
    }
    ans = ans.substr(0, j); //从0号位置到第一个不相同的位置 截取字符串
    if (ans === "") return ans;
  }
  return ans;
};

const strs = ["flower", "flow", "flight"];
console.log(longestCommonPrefix(strs));
