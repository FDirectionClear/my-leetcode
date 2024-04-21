/**
 * 
https://xiaochen1024.com/courseware/60b4f11ab1aa91002eb53b18/6196d19cc1553b002e57bf26
下面题解思路是中心扩散法，自己写的
 */
var longestPalindrome = function(s) {
  if (s <= 1) return s
  let result = ''
  for (let i = 0; i < s.length; i ++) {
    let temp = []

    // 先以当前点为中心点
    temp.push(s[i])
    let j = i - 1, k = i + 1
    expandToFindMax(j, k)

    

    if (s[i] === s[i + 1]) {
      // 如果当前和下一个紧邻相同，再以当前点和下一个点为中心点
      temp = [s[i], s[i + 1]]
      j = i - 1
      k = i + 2
      expandToFindMax(j, k)
    }

    function expandToFindMax(j, k) {
      while (j >= 0 && k < s.length) {
        if (s[j] === s[k]) {
          temp.unshift(s[j])
          temp.push(s[k])
        } else {
          break
        }
        j --;
        k ++
      }

      if(temp.length > result.length) {
        result = temp.join('')
      }
    }
  }

  return result
};


const a = longestPalindrome('aaaa')

console.log(a)

// 示例 1：

// 输入：s = "babad"
// 输出："bab"
// 解释："aba" 同样是符合题意的答案。
// 示例 2：

// 输入：s = "cbbd"
// 输出："bb"
