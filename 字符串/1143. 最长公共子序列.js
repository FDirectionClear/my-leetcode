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