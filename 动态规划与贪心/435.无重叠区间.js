// 动态规划，时间复杂度O(n^2)，会超时
var eraseOverlapIntervals1 = function (intervals) {
    if (!intervals.length) {
        return 0;
    }

    intervals.sort((a, b) => a[0] - b[0]); //按左边界排序
    const n = intervals.length;
    const dp = new Array(n).fill(1); //初始化dp数组

    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            //循环i,j找出intervals中最多有多少个不重复的区间
            //j的右边界小于i的左边界 相当于多出了一个不重合区间
            if (intervals[j][1] <= intervals[i][0]) {
                dp[i] = Math.max(dp[i], dp[j] + 1); //更新dp[i]
            }
        }
    }
    return n - Math.max(...dp); //n减去最多的不重复的区间 就是最少删除区间的个数
};

// 贪心算法，时间复杂度O(nlogn)，不会超时
var eraseOverlapIntervals = function (intervals) {
    if (!intervals.length) {
        return 0;
    }

    //按右边界排序，然后从左往右遍历，右边界结束的越早，留给后面的区间的空间就越大，不重合的区间个数就越多
    intervals.sort((a, b) => a[1] - b[1]);

    const n = intervals.length;
    let right = intervals[0][1]; //right初始化为第一个区间的右边界
    let ans = 1; //最多的不重合区间的个数
    for (let i = 1; i < n; ++i) {
        //循环区间数组
        if (intervals[i][0] >= right) {
            //当区间的左边界大于上一个区间的右边界的时候 说明是一对不重合区间
            ++ans; //ans加1
            right = intervals[i][1]; //更新right
        }
    }
    return n - ans; //intervals的长度减去最多的不重复的区间 就是最少删除区间的个数
};


/**
犯的问题：
1. 不敢落笔，想到了思路后，担心时间复杂度超了，短时间又没有得到更好的思路，还在硬想，不如就把这个已有的思路写上次。要骑驴找马。
2. 动态规划搞不定，马上想想贪心能不能搞定。。

总结：
1. 时间复杂度上，如果出现原生排序算法，时间复杂度就是0(nlogn)
2. 多个时间复杂度相加，如果都是与n相关，则取取复杂度高的那一个，例如：O(nlogn + n) = O(nlogn)，O(nlogn + n^2) = O(n^2)。

多个时间复杂度相加，如果其中有些项的复杂度和n不相关则不能忽略任何项，例如：O(AlogA + B)，O(AlogA + B^2)

两个循环依次执行，则取复杂度高的那个，嵌套多个循环则需要累乘复杂度。
 */
