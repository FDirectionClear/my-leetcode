// 这道题可以用动态规划，也可以用排序，用排序更简单

/**
 * 个人做法，一次过。
 */

// 倒序排序后得到[6, 5, 3, 1, 0]
// h=0
// 当前文章引用数6
// 当前是第几篇文章：i+1=1
// 所以，当前文章引用数 和 当前是第几篇文章 取一个最小值，就是当前能得到的h指数的最大潜力perfectH
// 然后perfectH和当前的h比，如果perfectH>h，那么 h = perfectH

// h=1
// 当前5
// i+1=2
// 所以H=2

// h=2
// 当前3
// i+1=3
// 所以 h=3

// h=3
// 当前1
// 当前是1了，不可能比h=3更大了，因为是倒序，所以继续遍历已经无用处
// 所以break

// return 3

var hIndex = function (citations) {
  let h = 0;

  citations.sort((a, b) => b - a); // 倒序排序

  for (let i = 0, len = citations.length; i < len; i++) {
    if (citations[i] < h) break;
    let perfectH = Math.min(citations[i], i + 1); // 当前的文章引用次数和当前的文章数比能得到最可能的i
    h = Math.max(h, perfectH);
  }

  return h;
};
