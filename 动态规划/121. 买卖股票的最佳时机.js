/**
 * 先判断是不是动态规划问题
 * 1. 首先判断是否存在多个重叠的子问题，并且每个子问题的结果都依赖另一个结构相同的子问题
 * 2. 动态解析方程式什么？
 * 3. 边界值又是什么？
 */

const maxProfit2 = function(prices) {
  if (prices.length < 1) return 0
  const min = [prices[0]]
  const profits = [0]
  
  for(let i = 1, len = prices.length; i < len; i ++) {
    profits[i] = Math.max(profits[i - 1], prices[i] - min[i - 1])
    min[i] = Math.min(...prices.slice(0, i + 1)) // 注意这种写法会导致maxProfit2在执行时超时，因为Math.min也是循环遍历每一个数组，这时候要对min进行状态压缩处理，不然时间复杂度就是O(n^2)了，完全可以压缩到O(n)
  }
  
  return Math.max(...profits)
};

const maxProfit = function(prices) {
  if (prices.length < 1) return 0
  const profits = [0]
  let min = prices[0] // 最小值很容易统计，在遍历过程中时刻跟踪寻找最小值，根本无需Math.min让内核在遍历一遍数组。
  
  for(let i = 1, len = prices.length; i < len; i ++) {
    profits[i] = Math.max(profits[i - 1], prices[i] - min)
    min = prices[i] < min ? prices[i] : min
  }
  
  return Math.max(...profits)
};

let prices1 = [7,1,5,3,6,4]
let prices2 = [7,6,4,3,1]

console.log(maxProfit(prices1))
console.log(maxProfit(prices2))
