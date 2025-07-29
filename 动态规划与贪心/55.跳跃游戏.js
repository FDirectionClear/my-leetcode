/*
 个人做法：
    本来想用动态规划，结果测试用例最后几个总是过不去，目前找不到原因
*/
var canJump_err = function (nums) {
  const dp = new Array(nums.length).fill([]);
  dp[0][0] = true;
  dp[0][1] = true;

  for (let i = 1, len = nums.length; i < len; i++) {
    dp[i][0] = dp[i - 1][0] && nums[i - 1] === 1;
    dp[i][1] = dp[i - 1][1];
  }
  return dp[nums.length - 1][0] || dp[nums.length - 1][1];
};

/*
答案1：动态规划
*/

var canJump1 = function (nums) {
  const dp = new Array(nums.length).fill(false);
  dp[0] = true;

  for (let i = 1, len = nums.length; i < len; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && nums[j] + j >= i) {
        dp[i] = true;
        break; // 当找到一个点能到达i的位置，就不用继续往后找了
      }
    }
  }

  return dp[nums.length - 1];
};

/**
 * 为什么我用动态规划没做对？
 * 1. 一直在从dp[i-1]入手，找dp[i-1]和dp[i]的关系。但实际上，方程中可能和dp[i-1]无关，而是和动态的j有关。
     * 在这道题里，动态转移方程：dp[i] = dp[j] && nums[j] + j >= i; 
     * j是不确定的变量，所以需要用循环来遍历每一个dp[j]，此时dp[i]就会映射出j个动态转移方程，但是能决定dp[i]最终结果的一定只有一个，需要为所有动态转移方程求得结，并选择最优解作为dp[i]。
     * 这就和先前遇到的 dp[i] = 择优（多个动态转移方程的结果），如出一辙；
     * 除了i是变量，j也是变量。可以用双层循环，外层先控制变量i，来循环j。
 * 
 * 2. 动态规划并非不可以O(n^2)穷举。动态规划的本质就是穷举。
 * 

/*
    canJump2是对答案1的改造写法更容易理解上面的总结。
*/

var canJump2 = function (nums) {
  const dp = new Array(nums.length).fill(false);
  dp[0] = true;

  for (let i = 1, len = nums.length; i < len; i++) {
    for (let j = 0; j < i; j++) {
      dp[i] = dp[j] && nums[j] + j >= i;
      if (dp[i] === true) {
        break;
      }
    }
  }

  return dp[nums.length - 1];
};

/*
    贪心算法：我的做法
*/
var canJump = function (nums) {
  let farthest = 0;
  for (let i = 0, len = nums.length; i < len; i++) {
    if (i <= farthest && farthest < len - 1) {
      farthest = Math.max(nums[i] + i, farthest);
    } else {
      break;
    }
  }
  return farthest >= nums.length - 1;
};

/*
    贪心算法：题解
    其实思路和我的思路可以认为是一样的。
*/
var canJump3 = function (nums) {
  if (nums.length === 1) return true; //长度为1 直接就是终点
  let cover = nums[0]; //能覆盖的最远距离
  for (let i = 0; i <= cover; i++) {
    cover = Math.max(cover, i + nums[i]); //当前覆盖距离cover和当前位置加能跳跃的距离中取一个较大者
    if (cover >= nums.length - 1) {
      //覆盖距离超过或等于nums.length - 1 说明能到达终点
      return true;
    }
  }
  return false; //循环完成之后 还没返回true 就是不能达到终点
};

const nums = [2, 3, 1, 1, 4];

console.log(canJump(nums));
