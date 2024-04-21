// gas2 =[4,5,2,6,5,3], cost2 = [3,2,7,3,2,9]
/*
我的做法：通过超过一半的测试用例。
思路很简单，按部就班的便利去算就行，完全没有在做贪心的感觉。
没通过测试用例的原因，是因为第22行似乎不太对。花费太长时间调试了，不再花时间修改。
*/
var canCompleteCircuit = function(gas, cost) {
	let i = 0, len = gas.length
	for (i = 0; i < len; i ++) {
		// 从第index个加油站开始
		let = stopStation = i // 当前驻足的位置
		let gasRetire = 0 // 当前驻足节点油箱中的汽油
		debugger
		for(let j = 1; j < len + 1; j ++) {
			debugger
			// 看能不能走五步,j代表当前要走的步数，从1开始
			gasRetire = gas[stopStation] + gasRetire - cost[stopStation]
			if (gasRetire < 0) {
				break;
			}
			if (j === 5) return i
			stopStation = i + j >= len ? (i + j + 1) % len - 1 : i + j 
		}
	}
	return -1
};

const gas = [1,2,3,4,5], cost = [3,4,5,1,2]
const gas1 = [2,3,4], cost1 = [3,4,3]
const gas2 =[4,5,2,6,5,3], cost2 = [3,2,7,3,2,9]


console.log(
	canCompleteCircuit(gas, cost),
	canCompleteCircuit(gas1, cost1),
)
