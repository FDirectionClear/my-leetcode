/**
 * 自行构思，没有通过全部测试用例，但是通过了绝大多数测试用例
 */

var groupAnagrams = function (strs) {
  const queue = strs;
  const res = [];

  const isSameStr = (s1, s2) => {
    console.log(s1, s2);
    // s1.split('') 完全可以通过 Array.from(s1) 去做
    // arr.join("")完全可以用 arr.toString()去做
    return s1.split("").sort().join("") === s2.split("").sort().join("");
  };

  while (queue.length) {
    const target = queue.shift();
    const contain = [target];
    let i = 1;

    while (i <= queue.length) {
      const curr = queue.shift();
      if (isSameStr(curr, target)) {
        contain.push(curr);
      } else {
        queue.push(curr);
      }
      i++;
    }

    res.push(contain);
  }

  return res;
};

const strs = ["eat", "tea", "tan", "ate", "nat", "bat"];
console.log(groupAnagrams(strs));

/**
 * 下面这个是官方题解，思路更简单，通过对每一项进行Array化后进行sort排序，
 * 异位词排序后一定是相同的。然后将异位词的排序结果作为key在哈希表中收纳。
 * 最后遍历哈希表的所有values，把他们作为一个数组返回即可。
 *
 * 重点可以关注Array.from的灵活应用
 */
var groupAnagrams = function (strs) {
  const map = new Map();
  for (let str of strs) {
    let array = Array.from(str);
    array.sort();
    let key = array.toString();
    let list = map.get(key) ? map.get(key) : new Array();
    list.push(str);
    map.set(key, list);
  }
  return Array.from(map.values());
};
