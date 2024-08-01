eg: 背包问题.js;
// https://xiaochen1024.com/courseware/60b4f11ab1aa91002eb53b18/61963bcdc1553b002e57bf13
// 可以直接 ctrl+f 搜索 0-1背包问题

/*
背包问题个人总结的特点：
1. 所有东西都是有数量限制的，通常都是拿过一次就不能再拿了。eg: dp[2] = dp[1] + dp[1]，但是dp[1]事件发生时
就不能再次发生dp[1]，因为1已经被拿走了。可以先后做 322.零钱兑换 416.分割等和子集 两个题型，感受一下。
*/

/*
下面补充0-1背包问题的必备特征：
* 1. 所有物品都是只能拿1次，每个物品都要考虑要么拿（1），要么不拿（0）
* 2. 容器有限重
* 3. 物品不能分割，不能说那一部分某个物品
至于求解什么不一定，但上面特征必须全满足。0-1背包问题肯定能用动态规划求解。
 */
