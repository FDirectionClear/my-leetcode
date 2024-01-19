var makesquare = function(matchsticks) {
	const sumBorderWidth = matchsticks.reduce((prev, curr) => prev + curr)
	if (sumBorderWidth % 4 !== 0 || matchsticks.length < 4) return false

	const borderWidth = sumBorderWidth / 4		
	let result = false

	debugger

	const backtrace = (currBorderLen, surplus, borderIndex) => {
		if (currBorderLen === borderWidth && borderIndex === 4) {
			// 如果正在拼的边长已经是既定边长，且正在拼的是第4条边，说明已经形成正方形
			debugger
			return true
		} 
		if (currBorderLen > borderWidth) {
			// 如果当前边长已经超过既定边长，那么无论如何都无法拼成正方形
			debugger
			return false
		}
		if (currBorderLen < borderWidth) {
			debugger
			// 如果当前正在拼接的边长小于既定边长，那么尝试从剩余火柴中找火柴继续拼接
			for (let i = 0, len = surplus.length; i < len; i ++) {
				debugger
				let a = backtrace(currBorderLen + surplus[i], surplus.slice(0, i).concat(surplus.slice(i + 1)), borderIndex)
				debugger
				if (a) {
					return true
				}
			}
		}
		if (currBorderLen === borderWidth) {
			// 如果当前正在拼接的边长等于既定边长，那么尝试从剩余火柴中找火柴继续拼接下个个边
			for (let i = 0, len = surplus.length; i < len; i ++) {
				let a = backtrace(surplus[i], surplus.slice(0, i).concat(surplus.slice(i + 1)), borderIndex + 1)
				debugger
				if (a) {
					return true
				}
			}
		}
	}

	for (let i = 0, len = matchsticks.length; i < len; i ++) {
		debugger
		let a = backtrace(matchsticks[i], matchsticks.slice(0, i).concat(matchsticks.slice(i + 1)), 1)
		debugger
		if (a) {
			return true
		}
	}

	return false
};


// const borderWidth = 2
// b(has, surplus, i) // [surplus]中能不能拼接出第i条边

// b(1, [1,2,2,2], 1) 
//     b(2, [2,2,2], 2)
//         b(2, [2,2],3)
//             b(2, [2], 4) true
//         b(2, 3)
//         b(2, 3)
//     b(3, [1,2,2], 2) ×
//     b(3, [1,2,2], 2) ×
//     b(3, [1,2,2], 2) ×
// console.log(
// 	makesquare([1,1,2,2,2])
// )

console.log(
	makesquare([5,5,5,5,4,4,4,4,3,3,3,3])
)

// 输入: matchsticks = [1,1,2,2,2]
// 输出: true
// 解释: 能拼成一个边长为2的正方形，每边两根火柴。
