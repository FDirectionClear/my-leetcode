/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */

// surplus =

// dp[i] = dp[i - 1] + gas[i-1] - cost[i-1] // 刚到第i个点时剩余的油
// dp[0] = gas[0] = 1
// dp[1] = gas[1] - cost[1] = 1 - 3 = -2

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

// var gas = [1, 2, 3, 4, 5],
//   cost = [3, 4, 5, 1, 2];

gas = [2, 3, 4];
cost = [3, 4, 3];

console.log(canCompleteCircuit(gas, cost));
