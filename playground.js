dp[i][j] = Math.min(dp[i][j - 1], dp[i-1][j]) + nums[i][j];
i > 1;
j > 1;
dp[i][j] = Math.min(dp[i][j - 1]) + nums[i][j];
i < 1;
dp[i][j] = Math.min(dp[i-1][j]) + nums[i][j];
j < 1;

dp[0][0] = 1;
