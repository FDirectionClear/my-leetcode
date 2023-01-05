/**https://leetcode.cn/problems/triangle/ */

/**
 * 1. 先判断是不是动态规划能解决的问题
 *  (1) 是否有重叠的子问题，并且解决每一个动态子问题都能有相似的规律？
 * （2）动态转移方程是什么？
 * （3）边界值是什么？
 * 
 * 采用自底向上的做法
 */
var minimumTotal = function(triangle) {
  const memo = new Array(triangle.length).fill([]).map((item, index) => new Array(index + 1).fill(0)) // 初始化一个和triangle结构一样，但是初始值都为0的，用于储存每一个点的最小路径合的结果的数组
  const height = triangle.length

  memo[0][0] = triangle[0][0] // 处理边界值

  // 开始对memo除边界外的点进行求值
  for (let m = 1; m < height; m ++) {
    for (let n = 0, l = triangle[m].length; n < l; n ++) {
      if (n === 0) {
        // 如果该点位于金字塔左边界，那么它的最小路径合只能是 上一个同边边界点最小路径合 + 自身值
        memo[m][n] = memo[m-1][0] + triangle[m][n]
      } else if (n === l - 1) {
        // 如果该点位于金字塔右边界，那么它的最小路径合只能是 上一个同边边界点最小路径合 + 自身值
        memo[m][n] = memo[m-1][n-1] + triangle[m][n]
      } else {
        // 如果该点位于金字塔非边界，那么它的最小路径合需要从 上层同位置的点 和 上层同位置索引-1的点 的最小路径合中取那个最小的
        memo[m][n] = Math.min(memo[m-1][n], memo[m-1][n-1]) + triangle[m][n]
      }
    }
  }

  // memo最后一行的中最小的结果就是最终的最短路径合
  return Math.min(...memo[height - 1])
};

const triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]

console.log(
  minimumTotal(triangle)
)
