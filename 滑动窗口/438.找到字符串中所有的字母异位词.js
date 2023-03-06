/**
 * 我的滑动窗口法。但是超时了。可能是不断地findIndex导致的。
 * 因为想要满足p的异位子串，子串的大小必须和p的长度严格一直，所以本题的窗口大小固定。
 */
var findAnagrams = function(s, p) {
  const result = []
  const isAnagram = (str) => {
    let arr = p.split('')
    for (let i = 0, len = str.length; i < len; i ++) {
      const index = arr.findIndex(item => item === str[i])
      if (index !== -1) {
        arr = arr.slice(0, index).concat(arr.slice(index + 1))
      } else {
        return false
      }
    }
    return true
  }

  for (let i = p.length - 1, j = 0; i < s.length; i ++) {
    const substr = s.slice(j, i + 1)
    if (isAnagram(substr)) {
      result.push(j)
    }
    j ++
  }

  return result
};


var s = "cbaebabacd", p = "abc"
console.log(
  findAnagrams(s, p)
)

s = "abab", p = "ab"
console.log(
  findAnagrams(s, p)
)

/**
 * 题解答案：也是滑动窗口遍历所有子串，滑动窗口的异动方式本质上和我的答案没什么区别。
 * 但是题解解决了超时问题。
 * 当需要对数组进行频繁且重复性很高的遍历操作的时候。可以思考一下能否通过建立映射表的形式，
 * 通过空间换取时间。
 * 题解中，建立对p的字符映射表，然后不断地滑动窗口，更新窗口内的字符映射表，然后通过val来随时记录
 * 目前 窗口内的字符映射表 相比 p中的字符映射表 有多少符合了条件，进一步减轻对p映射表字段的遍历成本。
 */
var findAnagrams = function (s, p) {
  let need = {};//需要的字符
  let win = {};//窗口中的字符
  for (let a of p) {//统计异位词的数量
      need[a] = (need[a] || 0) + 1;
  }
  //左右指针
  let left = 0,
      right = 0;
  let val = 0;//窗口中和need中字符数量一致的字符种类
  let res = [];
  while (right < s.length) {
      let c = s[right];
      right++;//右边的字符进入窗口
      if (need[c]) {
          win[c] = (win[c] || 0) + 1;//当前字符在need中，更新窗口中的字符数量
          if (win[c] == need[c]) {
              val++;//该字符在窗口中和need中的字符匹配时，字符种类+1
          }
      }
      if (right - left >= p.length) { // 如果当前有边界和左边界之间的长度已经扩张到合p的长度相同。注意：这一行代码和题解中的代码不一样，题解中用的while循环，但是没必要，因为while永远都只能循环一次，所以用if更适合。
          if (val == Object.keys(need).length) {//如果此时窗口中的子串和p是异位词则将左边界加入res中
              res.push(left);
          }
          let d = s[left];
          left++;//出窗口
          if (need[d]) {//如果该字符在need中 更新窗口中的字符数量 和字符种类
              if (win[d] == need[d]) {
                  val--;
              }
              win[d]--;
          }
      }
  }
  return res;
};
