/**https://leetcode.cn/problems/unique-paths-ii/ */

// 1. 判断这是有多个重叠的子问题，满足动态规划的解题思路
// 2. 确定动态解析方程

/**
 * 方法一：
 * 自底向上
 */

const uniquePathsWithObstacles = function(obstacleGrid) {
  const m = obstacleGrid.length, 
        n = obstacleGrid[0].length

  if (n === 0) return 0

  if (obstacleGrid[0][0] === 1) return 0

  const memo = new Array(m).fill(0).map(() => new Array(n).fill(0))

  memo[0][0] = 1


  for(let i = 0; i < m; i ++) {
    for (let j = 0; j < n; j++) {
      if (obstacleGrid[i][j] === 1) {
        // 如果当位置的结果映射的是地图中的障碍物，那到达该点的路有0条
        memo[i][j] = 0
      } else if (i === 0 && j > 0) {
        // 当处于上边界时，动态转移方程只需要考虑左侧元素
        memo[i][j] = memo[i][j - 1]
      } else if (j === 0 && i > 0) {
        // 当处于左边界时，动态转移方程只需要考虑右侧元素
        memo[i][j] = memo[i - 1][j]
      } else if (i > 0 && j > 0) {
        // 如果不是边界也不是障碍物，就等于该点的上面和左面的点的结果之合
        memo[i][j] = memo[i - 1][j] + memo[i][j - 1]
      }
    }
  }

  return memo[m - 1][n - 1]
};

/**
 * 方法二：
 * 同上，只不过人家的初始值做的很好，而且只用了一种动态转移方程
 */

const obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]


console.log(
  uniquePathsWithObstacles(obstacleGrid)
)


