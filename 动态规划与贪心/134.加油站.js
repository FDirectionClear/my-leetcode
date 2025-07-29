// gas2 =[4,5,2,6,5,3], cost2 = [3,2,7,3,2,9]
/*
自己的方法：
结果：通过了70%的测试用例，应该就是调试的问题，思路是正确了。
思路：动态规划（没意识到是贪心算法，也没用贪心算法考虑）。将每一个点都轮番作为起始点进行动态规划，当出现动态规划
为的最终结果为通过的话，就可以返回true了
动态转移方程：
dp[i] = dp[i-1] + gas[i-1] - cost[i-1]; // 刚到第curr点时剩余的油（但在当前节点不补充油，如果dp[i] >= 0 就说明能到达i点）
*/
var canCompleteCircuit = function (gas, cost) {
  const dpSingleSite = function (start) {
    const dp = new Array(gas.length).fill(0);

    dp[start] = 0; // dp[i] 刚到第i个点时剩余的油，最开始油箱里没有汽油

    // i 3
    for (let i = 1, len = gas.length; i <= len; i++) {
      let curr, pre;

      if (start + i <= len - 1) {
        curr = start + i;
      } else {
        curr = start + i - len - 1; // curr 1
      }

      if (curr === 0) {
        // 如果是第一个点，那么前一个点是最后一个点
        pre = gas.length - 1;
      } else {
        pre = curr - 1; // pre 0
      }

      dp[curr] = dp[pre] + gas[pre] - cost[pre]; // 刚到第curr点时剩余的油

      if (dp[curr] < 0) {
        // 表示从start点出发不能绕一圈
        console.log(dp);
        return false;
      }
    }
    console.log(dp);
    return true;
  };

  for (let i = 0, len = gas.length; i < len; i++) {
    if (dpSingleSite(i)) {
      return i;
    }
  }

  return -1;
};

const gas = [1, 2, 3, 4, 5],
  cost = [3, 4, 5, 1, 2];
const gas1 = [2, 3, 4],
  cost1 = [3, 4, 3];
const gas2 = [4, 5, 2, 6, 5, 3],
  cost2 = [3, 2, 7, 3, 2, 9];

console.log(canCompleteCircuit(gas, cost), canCompleteCircuit(gas1, cost1));
