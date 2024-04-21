/*	
	我的做法：解答错误！ 通过用例 31/50
	max <= b && max >= a 说明一定存在交集
	min > b || max < a 说明一定没交集
	取交集 [Math.max(a, min), Math.min(b, max)]
	如果当前集合和成员有交集就更新成员为最新交集，没有交集就做成员
*/
var findMinArrowShots1 = function(points) {
	if (points.length <= 0) return 0
	const sections = [points[0]]
	for(let i = 1, len = points.length; i < len; i ++) {
		let point = points[i]
		for(let j = 0, l = sections.length; j < l; j ++) {
			let section = sections[j]
			let [min, max] = section
			let [a, b] = point
			if (a > max || b < min) {
				// 说明和当前几何没有交集
				// 如果到最后一项也没有发生交集，就作为新成员加入sections
				j === l - 1 && sections.push(point)
			} else {
				// 其他情况都是多少有交集，更新当前交集
				section[0] = Math.max(a, min)
				section[1] = Math.min(b, max)
				break
			}
		}
	}

	console.log(sections)
	return sections.length
};

const points1 = [[10,16],[2,8],[1,6],[7,12]]
const points2 = [[1,2],[3,4],[5,6],[7,8]]
const points3 = [[1,2],[2,3],[3,4],[4,5]]
const points4 = [[3,9],[7,12],[3,8],[6,8],[9,10],[2,9],[0,9],[3,9],[0,6],[2,8]]

console.log(
	// findMinArrowShots(points1),
	// findMinArrowShots(points2),
	// findMinArrowShots(points3),
	// findMinArrowShots(points4)
)

/*
答案思路：这种做法比较难想到。总结可能实用的技巧如下：
1. 区间问题，可以尝试对每个区间节点进行排序，来减少更多需要考虑的变量：
	1）这道题对区间尾部进行从小到大排序，按顺序遍历，就能轻松保证，开始起点是否<目前重叠区间的最小结束点 的区间都有重合在一起的部分。eg：[1,5],[3,8]
	2）如果不这么做，就很难找到 目前重叠区间的最小结束点 这个变量。
*/
var findMinArrowShots = function (points) {
    if (!points.length) {
        return 0;
    }

    points.sort((a, b) => a[1] - b[1]); //按照区间结尾排序
    let pos = points[0][1];
    let ans = 1;
    for (let balloon of points) {
        if (balloon[0] > pos) {
            //如果后面一个区间的开始大于前一个区间的结尾 就需要新增一支箭
            pos = balloon[1]; //更新pos为新的区间的结尾
            ans++;
        }
    }
    return ans;
};


const points = [[1,5], [3,8], [8,10], [9, 12]]
console.log(
	findMinArrowShots(points)
)
