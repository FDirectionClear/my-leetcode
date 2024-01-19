// backtrack(main, )
// backtrack([1], 2)  backtrack([1,2], 1)  backtrack([1,2,3], 0)
//                                             backtrack([1,2,4], 0)
//                                             backtrack([1,2,5], 0)
//                                             ...
//                      backtrack([1,3], 1) 
//                      backtrack([1,4], 1) 
//                      ...
// backtrack([2], 2)
// ...

/**
 * 我的做法：思路完全正确了。回溯的过程中还要注意及时剪枝。我甚至觉得我的做法比题解更简单。
 * 可以按照上面草稿的方式写树去构思。结果发现backtrack的第一个参数完全没必要是二维数组，并且第二个参数也完全没有必要。
 */

const combine = function(n, k) {
  const members = []
  const result = []

  for (let i = 1; i <= n; i ++) {
    members.push(i)
  }

  const backtrack = (group) => {
    if (group.length === k) {
      result.push(group)
      return
    }
    for (let i = group[group.length - 1]; i < n; i ++) {
      backtrack(group.concat(members[i]))
    }
  }

  for (let i = 0; i < n; i ++) {
    backtrack([members[i]])
  }

  return result
};

/**
 * 题解做法
 */
const combine1 = (n, k) => {
  const res = [];

  const helper = (startIndex, path) => { //startIndex表示搜索的起点位置 path是每条分支的一个组合）
    if (path.length == k) {
      res.push(path.slice());       //需要拷贝一份 避免受其他分支的影响
      return;                       
    }
    for (let i = startIndex; i <= n - (k - path.length) + 1; i++) {//剪枝
      path.push(i);                    //加入path
      helper(i + 1, path);             //下一层递归
      path.pop();                      //回溯状态
    }
  };

  helper(1, []); //递归入口
  return res;
}


var n = 4, k = 2
console.log(
  combine(n, k)
)


function  
