/*
贪心：我自己的版本，但超时
思路，既然所有人都要上船，那就尽可能先上最胖的，然后同伴也是从剩余人数中选最胖的，不断降低两个人不能组队的隐患。
*/
const numRescueBoats1 = function (people, limit) {
    let ans = 0
    people = people.sort((a, b) => b - a)

    for (let i = 0; i < people.length; i = 0) {
        const person = people.shift()
        let weight = limit - person // 当前船上剩余的载重
        for (let j = 0; j < people.length; j ++) {
            if (people[j] <= weight) {
                people = people.slice(0, j).concat(people.slice(j + 1))
                break
            }
        }
        ans ++
    }

    return ans
}

/*
贪心：也是贪心算法，用的双指针来降低时间复杂度
*/
var numRescueBoats = function (people, limit) {
    people.sort((a, b) => (a - b));
    let ans = 0,
        left = 0,//左指针初始化在0的位置
        right = people.length - 1 //右指针初始化在people.length - 1的位置
    while (left <= right) {//两指针向中间靠拢 遍历
        //当people[left] + people[right--]) <= limit 表示左右两边的人可以一起坐船 然后让left++ right--
        //如果两人坐不下，那只能让重的人先坐一条船 也就是让right--
        if ((people[left] + people[right--]) <= limit) {
            left++
        }
        
        ans++
    }
    return ans
};

const people = [1,2], limit = 3
const people1 = [3,2,2,1], limit1 = 3
const people2 = [3,5,3,4], limit2 = 5

console.log(
    numRescueBoats1(people, limit),
    numRescueBoats1(people1, limit1),
    numRescueBoats1(people2, limit2),
)
