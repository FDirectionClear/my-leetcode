// 贪心：我的做法
var findContentChildren = function(g, s) {
    let ans = 0
    for (let i = 0, len = g.length; i < len; i ++) {
        let minIdx = -1;
        let cookie = 0
        for (let j = 0, l = s.length; j < l; j ++) {
            if (s[j] < g[i]) {
                continue
            } else {
                if (cookie === 0) {
                    cookie = s[j]
                    minIdx = j
                } else if (s[j] < cookie) {
                    cookie = s[j]
                    minIdx = j
                }
            }
        }
        if (minIdx !== -1) {
            s = [...s.slice(0, minIdx), ...s.slice(minIdx + 1)]  
        }
        if (cookie > 0) {
            ans ++
        } 
    }
    return ans
};

// 贪心：也可以中间穿插排序降低复杂度
var findContentChildren = function (g, s) {
    g = g.sort((a, b) => a - b);
    s = s.sort((a, b) => a - b); //排序数组
    let result = 0;
    let index = s.length - 1;
    for (let i = g.length - 1; i >= 0; i--) {
        //从胃口大的小孩开始满足
        if (index >= 0 && s[index] >= g[i]) {
            result++; //结果加1
            index--;
        }
    }
    return result;
};

const g = [1,2]
const s = [1,2,3]

console.log(findContentChildren(g, s))
