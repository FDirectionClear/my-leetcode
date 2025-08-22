/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

// 输入：root = [1,null,2,3]

class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

const root = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: {
      val: 3,
      left: null,
      right: null,
    },
    right: null,
  },
};

// 中续遍历
var inorderTraversal = function (root) {
  const result = []; // 1 3 2

  const traveral = (root) => {
    if (root === null) return;
    traveral(root.left);
    result.push(root.val);
    traveral(root.right);
  };

  traveral(root);

  return result;
};

console.log(inorderTraversal(root));

var inorderTraversal = function (root) {
  let res = [];
  const dfs = function (root) {
    if (root === null) {
      return;
    }
    dfs(root.left);
    res.push(root.val);
    dfs(root.right);
  };
  dfs(root);
  return res;
};
