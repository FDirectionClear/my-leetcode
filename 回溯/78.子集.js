/**
 * 这道题和组合何其的相似，只是多了每一步的路径推入result数组中而已
 * 不做了，直接上题解答案：
 */
var subsets = function(nums) {
  let result = []//存放结果
  let path = []//存放一个分支的结果
  function backtracking(startIndex) {//startIndex字符递归开始的位置
      result.push(path.slice())//path.slice()断开和path的引用关系
      for(let i = startIndex; i < nums.length; i++) {//从startIndex开始递归
          path.push(nums[i])//当前字符推入path
          backtracking(i + 1)//startIndex向后移动一个位置 继续递归
          path.pop()//回溯状态
      }
  }
  backtracking(0)
  return result
};

/**
 * 我的思路，典型回溯算法解题，明显能形成一颗树。
 */
// var subsets = function(nums) {

// };

// [1,2,3,4]

// [1] 
//     [1,2] 
//         [1,2,3]
//             [1,2,3,4]
//         [1,2,4]
//     [1,3]
//         [1,3,4]
//     [1,4]
// [2]
//     ...

// backtrack([1,2])

//例子：nums = [1,2,3]
