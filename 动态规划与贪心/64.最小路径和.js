var minPathSum = function(grid) {
	let m = grid.length - 1,
		n = grid[0].length - 1
	if (m < 0 || n < 0) return 0

	const dp = Array(grid.length).fill(Array(grid[0].length).fill(Infinity))

	for (let i = 0; i <= m; i ++) {
		for(let j = 0; j <= n; j ++) {
			if (i === 0 && j === 0) {
				dp[0][0] = grid[0][0]
			} else if (i === 0) {
				dp[i][j] = dp[i][j-1] + grid[i][j]
			} else if (j === 0) {
				dp[i][j] = dp[i-1][j] + grid[i][j]
			} else {
				dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1]) + grid[i][j]
			}
		} 
	}

	return dp[m][n]
};

const grid1 = [[1,3,1],[1,5,1],[4,2,1]]
const grid2 = [[1,2,3],[4,5,6]]
