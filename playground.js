// 1. 先求合，然后 /2 就是背包的容量,建设是sum
dp[i][j] = dp[i-1][j] || dp[i][j-nums[i]]; j-nums[i] >= 0
dp[i][j] = dp[i-1][j]; j-nums[i] < 0

dp[0][0] = true
dp[0][1 ~ sum] = false
dp[i][nums[i]] = true

// 求dp[nums.length-1][sum]
