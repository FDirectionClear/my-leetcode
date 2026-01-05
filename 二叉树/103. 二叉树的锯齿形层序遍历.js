// 🧪 没通过测试用例，但是感觉应该是对的。
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function (root) {
  const result = []; // [[3], [20, 9]]
  let directionFlag = true; // false 下一层 false →， true ←

  const handleOrder = (roots) => {
    // [15, 7]
    if (roots.length === 0) return;

    const childrenRoots = []; // 栈 or 队列
    result.push(roots); // 将上层整理好的根节点入result

    for (let i = roots.length - 1; i <= 0; i--) {
      if (directionFlag) {
        if (roots[i].right !== null) {
          childrenRoots.push(roots[i].right);
        }
        if (roots[i].left !== null) {
          childrenRoots.push(roots[i].left);
        }
      } else {
        if (roots[i].left !== null) {
          childrenRoots.push(roots[i].left);
        }
        if (roots[i].right !== null) {
          childrenRoots.push(roots[i].right);
        }
      }

      directionFlag = !directionFlag;

      handleOrder(childrenRoots);
    }
  };

  handleOrder([root]);

  return result;
};

// [3]
// [20, 9]

// [20, 9]
// [null, null, 15, 7] => [15, 7]

// [15, 7]
// [null, null, null, null] => []

// []
// return result
