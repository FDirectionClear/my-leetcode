/**
 * 
剑指 Offer 10- I. 斐波那契数列
写一个函数，输入 n ，求斐波那契（Fibonacci）数列的第 n 项（即 F(N)）。斐波那契数列的定义如下：

F(0) = 0,   F(1) = 1
F(N) = F(N - 1) + F(N - 2), 其中 N > 1.
斐波那契数列由 0 和 1 开始，之后的斐波那契数就是由之前的两数相加而得出。

答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。

 

示例 1：

输入：n = 2
输出：1

示例 2：

输入：n = 5
输出：5
 

提示：

0 <= n <= 100
 */

// 暴力递归，自顶向下，超时
const fib1 = function(n) {
    if (n === 0) return 0
    if (n === 1) return 1
    return fib1(n - 1) + fib1(n - 2)
};

// 递归 + 记忆法，递归都是自顶向下的
const fib2 = function(n) {
  const memo = {}
  const main = (N) => {
    if (N === 0) return 0
    if (N === 1) return 1
    if (memo[N]) return memo[N]
    return main(N - 1) + main(N - 2)
  }
  return main(n)
}

// 动态规划，是自下往上的，性能更佳
const fib3 = function(n) {
  const memo = [0, 1]
  if (n <= 1) return memo[n]
  let i = 2
  while(i <= n) {
    memo[i] = memo[i - 2] + memo[i - 1]
    i++
  }
  return memo[n - 2] + memo[n - 1]
}
