/**
 * 自己写的没有通过全部测试用例，但是通过了19个测试用例。
 * 思路是对的，懒得调了。
 */
var longestCommonSubsequence = function(text1, text2) {
  let result = ''
  let q1 = q2 = 0
  for (; q1 < text1.length; q1 ++) {
    let temp = []
    for (let i = q1, len = text1.length; i < len; i ++) {
      const char1 = text1[i]
      const idxInText2 = text2.slice(q2).indexOf(char1)
      if (idxInText2 !== -1) {
        q2 = idxInText2 + 1
        temp.push(char1)
      } else {
        break;
      }
    }
    if (temp.length > result.length) {
      result = temp.join('')
    }
  }

  return result.length
};

/**
 * 这道题，不追求过程，可以用动态规划，最开始考虑了，但没想出来动态规划的动态解析方程，就认为不能用动态规划。
 * 下面是教程上的题解，用的动态规划：
 */
var longestCommonSubsequence = function(text1, text2) {
  const m = text1.length, n = text2.length;
  const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));//初始化dp
  for (let i = 1; i <= m; i++) {
      const c1 = text1[i - 1];
      for (let j = 1; j <= n; j++) {
          const c2 = text2[j - 1];
          if (c1 === c2) {
              dp[i][j] = dp[i - 1][j - 1] + 1;//text1与text2字符相同时 最长公共子序列长度+1
          } else {
              //text1与text2字符不同时 返回text1或text2向前减少一位之后的最长公共子序列中的较大者
              dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
          }
      }
  }
  return dp[m][n];
};



// 给定两个字符串 text1 和 text2，返回这两个字符串的最长 公共子序列 的长度。如果不存在 公共子序列 ，返回 0 。

// 一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。

// 例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。
// 两个字符串的 公共子序列 是这两个字符串所共同拥有的子序列。

 

// 示例 1：

// 输入：text1 = "abcde", text2 = "ace" 
// 输出：3  
// 解释：最长公共子序列是 "ace" ，它的长度为 3 。
// 示例 2：

// 输入：text1 = "abc", text2 = "abc"
// 输出：3
// 解释：最长公共子序列是 "abc" ，它的长度为 3 。
// 示例 3：

// 输入：text1 = "abc", text2 = "def"
// 输出：0
// 解释：两个字符串没有公共子序列，返回 0 。

// abcde fbghbdibjklmn
// bd
// res = []
// substart=0
// i j=substart
// 0a 0
//    1
//    ...
// 1b 0
//    1b
//      i=1 j=1 res=[b] substart=j+1=2
//      break
// 2c 
//   j=substart=2 g
//   3h
//   ...
// 3d
//   j=substart=2 g
//   ...
//   5d
//     i=3 j=5 res=[b,d] substart=j+1=6
//     break
// 4e
//   j=substart=6 i
//   ...

// return substart

const text1 = "oxcpqrsvwf"
const text2 = "shmtulqrypy"

/**
 * 实际上算理错了，只通过了部分测试用例
 * 这道题有动态规划的味道很浓，但没找到动态转移方程是什么。
 * 看了萧晨的解答后，发现确实是动态规划，但他给出的动态转移方程非常复杂，
 * 因为时间有限，不在纠缠。
 */
var longestCommonSubsequence = function(text1, text2) {
  if (text1.length > text2.length) {
    [text2, text1] = [text1, text2]
  }
  let res = []
  let substart = 0

  for(let i = 0, text1len = text1.length; i < text1len; i ++) {
    for(let j = substart, text2len = text2.length; j < text2len; j ++) {
      if (text1[i] === text2[j]) {
        res.push(text1[i])
        substart = j + 1
        break
      }
    }
  }
  return res.length
};

console.log(longestCommonSubsequence(text1, text2))




