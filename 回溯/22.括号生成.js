/**
 * 什么场景下使用回溯？
 * 回溯法可以看成暴力法的升级版，它从解决问题的所有可能选项里系统地选择出一个可行的解决方案。
 * 回溯法非常适合由多个步骤组成的问题，并且每个步骤都有多个选项。当我们在某一步选择了其中一个选项时，就进入下一步，然后又面临新的选项。一直这样重复选择，直至到达最终状态。
 * 
 * 用回溯法解决问题的所有选项可以形象地用树状结构表示。在某一步有n个可能的选项，那么该步骤可以看成是树状结构中的一个节点，
 * 每个选项看成树中节点连接线，经过这些连接线到达该节点的n个子节点。树的叶节点对应着终结状态。如果在叶节点的状态满足题目
 * 的约束条件，那么我们找到一个解决方法。
 */

/**
 * 步骤（我总结的）：
 * 0. 构思：先想想子情况是什么，如何去构建这个树？
 * 1. 判断可行方案，或说终止条件
 *  1.1 终止条件又分为求解条件（可行条件）、退出条件（不可行条件）
 * 2. 判断回溯方法backtrack的参数是什么
 *  2.1 这个不必一开始就想好，可以在编写中慢慢丰富需要的参数
 * 3. 递归逻辑，就是为backtrack的下一步创造下一个子问题的参数，然后递归backtrach
 *  3.1 在基础递归条件中，基于不同选项，下一步的子问题可能有多种情况，所以backtrack可能也有多种情况，要保证把基于当前子问题的下一步子问题都列全。
 */
var generateParenthesis = function(n) {
  if (n == 0) return []
  const res = []
  let track = []
  backtrack(n, n, track, res) // 回溯参数有什么需要定义好
  return res
  function backtrack(left, right, track, res) {
      // 数量小于0，不合法
      if (left < 0 || right < 0) return /** 回溯终止条件1，退出条件，说明当前子问题没有后续潜力，不符合要求，会回到上一个循环 */
      // 若左括号剩下的多，说明不合法
      if (right < left) return /** 回溯退出条件2,退出条件，说明当前子问题没有后续潜力，不符合要求，会回到上一个循环 */ 
      // 所有括号用完，得到合法组合
      if (left == 0 && right == 0) {  /** 求解条件，当left === right === 0的时候，就是解了，把它推进结果数组里。*/
          res.push(track.join(''))
          return
      }

      /**
       * 单层递归逻辑，在当前问题的情况下，下一个子问题可能是加入左括号，也可能是加入又括号。
       * 所以要把这两种情况都列举出来，分别进行backtrack.
       */
      /** 尝试添加左括号 ，也就是为backtrack创造下一个子问题的参数 */
      track.push('(')
      //这个地方一定要注意 需要拷贝一份track，也就是采用[...track]， 不然会影响其他分支
      
      backtrack(left - 1, right, [...track], res) // 选择其他分支（递归下去）
      track.pop()

      /** 尝试添加右边括号 ，也就是为backtrack创造下一个子问题的参数 */
      // 尝试添加右括号
      track.push(')')
      backtrack(left, right - 1, [...track], res)
      track.pop()
  }
};


var myGenerateParenthesis = function (n) {
  const result = []
  let track = []

  function backtrack(supPlusL, suplusR, track, result) {
    if (supPlusL > suplusR) return false
    if (supPlusL === 0 && suplusR === 0) {
      result.push(track.join(''))
      return 
    }

    track.push('(')
    backtrack(supPlusL - 1, suplusR, [...track], result)
    track.pop()

    track.push(')')
    backtrack(supPlusL, suplusR - 1, [...track], result)
    track.pop()
  }

  backtrack(n, n, track, result)
  return result
}
