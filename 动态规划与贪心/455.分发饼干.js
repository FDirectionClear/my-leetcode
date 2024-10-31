// 贪心：我的做法 2024/10/31星期四
var findContentChildren = function (g, s) {
  let count = 0;
  g = g.sort((a, b) => a - b); // 先排序
  s = s.sort((a, b) => a - b);

  while (g.length && s.length) {
    const kid = g.pop(); // 取出当前胃口最大的孩子
    const currPic = s.pop(); // 取出当前最大饱食度的饼干
    if (currPic >= kid) {
      count++; // 如果当前最大的饼干满足胃口最大的孩子，就增加计数
    } else {
      s.push(currPic); // 如果当前最大的饼干不能满足最大的孩子，就把饼干放回去，让孩子离开，不计数
    }
  }

  return count;
};

// 贪心：我的做法
var findContentChildren = function (g, s) {
  let ans = 0;
  for (let i = 0, len = g.length; i < len; i++) {
    let minIdx = -1;
    let cookie = 0;
    for (let j = 0, l = s.length; j < l; j++) {
      if (s[j] < g[i]) {
        continue;
      } else {
        if (cookie === 0) {
          cookie = s[j];
          minIdx = j;
        } else if (s[j] < cookie) {
          cookie = s[j];
          minIdx = j;
        }
      }
    }
    if (minIdx !== -1) {
      s = [...s.slice(0, minIdx), ...s.slice(minIdx + 1)];
    }
    if (cookie > 0) {
      ans++;
    }
  }
  return ans;
};

// 贪心：也可以中间穿插排序降低复杂度
var findContentChildren = function (g, s) {
  g = g.sort((a, b) => a - b);
  s = s.sort((a, b) => a - b); //排序数组
  let result = 0;
  let index = s.length - 1;
  for (let i = g.length - 1; i >= 0; i--) {
    //从胃口大的小孩开始满足
    if (index >= 0 && s[index] >= g[i]) {
      result++; //结果加1
      index--;
    }
  }
  return result;
};

const g = [1, 2];
const s = [1, 2, 3];

console.log(findContentChildren(g, s));
