/**
 * 这道题的难度不小。自己构思出了一种做法，但是可见的复杂度很高，为了节省时间没有仅做构思没写代码。
 * 具体思路是这样的:
 * 
 * 例子：[1,2,2,2,1] 

 * length = 所有火柴个数，all = 所有火柴长度之和

 * 一. 先判断明显条件
 * (1)是否能够造出生方形，length % 4 === 0 ?
 * (2)在判断是否足够4条边？
 * (3)在判断是否有边超过了 all/4
 * 其中 length 是火柴个数，all是所有火柴长度之和。
 * 即 length >= 3 &&  all % 4 === 0，否则 return false
 * 
 * 二. 很容易求出每一条边的和是多少
 * all / 4
 * 
 * backtrack([[1,1]], [2,2,2]) 代表第一条边是[1,1]组合的情况下，继续向第一条边里尝试添加火柴。目前可以选择的火柴有[2,2,2]
 * backtrack([[1,1], [2]],[2,2]) 代表第一条边是[1,1] + [2]组合的情况下，继续向第二条边里尝试添加火柴。目前可以选择的火柴有[2,2]
 * backtrack([[1,1], [2], [2]],[2,2]) 代表第一条边是[1,1] + [2] + [2]组合的情况下，继续向第三条边里尝试添加火柴。目前可以选择的火柴有[2]
 * backtrack([[1,1], [2]],[2,2]) 代表第一条边是[1,1] + [2] + [2] + [2]组合的情况下，继续向第四条边里尝试添加火柴。目前可以选择的火柴有[]
 * 
 * 将火柴挨个取出作为第一条边的成员，开始回溯，先从放入第一条边开始
 * backtrack([[1]], [1,2,2,2])
 * 
 * 
 * [[1]]，[1,2,2,2]
    [[1,1]], [2,2,2]

    [[1,2]], [1,2,2]
    [[1,2]], [1,2,2]
    [1]
 */


/**
 * 

通过了 139 / 195 条测试用例
[1,1,2,2,2] 这个没过，懒得调了，感觉思路应该是对的。
 */
var makesquare = function (nums) {
  nums.sort((a, b) => a - b) // 先从小到大排序，方便提前剪枝，优化性能
  const length = nums.length
  const all = nums.reduce((prev, next) => prev + next, 0)
  const borderMax = all / 4
  
  if (length < 4 || all % 4 !== 0 || nums.find(item => item > borderMax)) {
    // 能否够造出生方形？是否足够4条边？是否有边超过了单边最大限制？
    return false
  }

  const backtrack = (borders, rests) => {
    if (borders[borders.length - 1].reduce((prev, next) => prev + next, 0) === borderMax) {
      if (borders.length === 4) return true // 如果当前已经有4条边，并且第4条边的长度和边长最大相等，那么说明可以构成三角形了
      borders.push([]) // 如果当前正在装填的非第4条边已经达到边长最大值，那么接下来要开一条新的边
    }
    // const sumLength = borders.reduce((preLen, currArr) => preLen + currArr.length, 0) // 当前构成的边的总长度
    
    for (let i = 0, len = rests.length; i < len; i ++) {
      if ((rests[i] + borders[borders.length - 1].reduce((prev, next) => prev + next, 0)) > borderMax) {
        // 如果从剩余的火柴里挑出来的第i根火柴长度 + 当前正在构造的这条边的长度 > 边长度上限，因为nums已经排过序了，那么下一根火柴必定更长，所以borders的已有放法已经行不通了，回到上一层。
        break;
      } else if ((rests[i] + borders[borders.length - 1].reduce((prev, next) => prev + next, 0)) <= borderMax) {
        // 如果从剩余的火柴里挑出来的第i根火柴长度 + 当前正在构造的这条边的长度 <= 边长度上限，那么将这根火柴放入这条边
        borders[borders.length - 1].push(rests[i])
        // 然后继续尝试在已有边的情况下够造
        backtrack(borders, rests.slice(i + 1))
      }
    }
  }

  return !!backtrack([[]], nums) // 开始从第一条边够造
};

//例子：[1,1,2,2,3]
/**
 * 题解，水桶问题，难在得想到转换成水桶的思想。其实也是贪心算法，也是回溯算法。这种解法就是 回溯 + 贪心。而我上面的思路才是典型的回溯。
 */
var makesquare = function (nums) {
  function backtrack(i, nums, edge, bucket) {
      if (i >= nums.length) {//递归结束条件
          return true;
      }
      for (let j = 0; j < 4; j++) {//循环4个桶
          if (bucket[j] + nums[i] > edge) {//这个桶装不下 继续找下一个桶
              continue;
          }
          bucket[j] += nums[i];//将当前元素加入桶中
          if (backtrack(i + 1, nums, edge, bucket)) {//索引i加1 继续递归下一个nums中的元素
              return true;//下一个元素能放进桶中
          }
          bucket[j] -= nums[i];//回溯状态
      }
      return false;//循环结束都没放进合适的桶 那不能构成正方形
  }

  if (nums.length < 4) {//nums长度小于4 直接不能构成正方形
      return false;
  }
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
      sum += nums[i];
  }
  if (sum % 4) {//nums的和不能整除4 不能构成正方行
      return false;
  }
  nums.sort((a, b) => b - a);//排序nums
  let bucket = Array(4).fill(0);//准备4个桶
  return backtrack(0, nums, sum / 4, bucket);//传入nums元素的索引i，nums，一个边长，和桶bucket
};
