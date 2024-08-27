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
 * @return {boolean}
 */
/**
 * 下面是自己写的，为什么错？
 * 1. 并不能完全以子树为单位判断，因为子树过于局部，在我们错误的判断下，任意左节点可以无限小，
 * 以至于出现在整个树的左侧的某个子节点可以比整个树的根节点更小。或者出现在整个树右侧的某个子节点
 * 可以比整个树的根节点更大。
 *
 */
// var isValidBST = function(root) {
//     if (!root) return false

//     let result = true

//     if (root.left && root.left.val < root.val) {
//         result = isValidBST(root.left)
//     } else if (!root.left) {
//         result = true
//     } else {
//         return false
//     }

//     if (root.right && root.right.val > root.val) {
//         result = isValidBST(root.right)
//     } else if (!root.right) {
//         result = true
//     } else {
//         return false
//     }

//     return result
// };

function checkBST(root, upper, lower) {
  if (!root) return true;
  if (root.val < upper && root.val > lower) {
    return (
      checkBST(root.left, root.val, lower) &&
      checkBST(root.right, upper, root.val)
    );
  }
  return false;
}

var isValidBST = function (root) {
  // 给予一个节点的上线和下限。树左侧的往往可以无限小，但不能比它的根还要大。右侧则相反。
  return (
    checkBST(root.left, root.val, -Infinity) &&
    checkBST(root.right, Infinity, root.val)
  );
};
