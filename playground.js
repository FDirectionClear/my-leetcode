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
 * @return {number[]}
 */
var preorderTraversal = function (root) {
  if (!root) return [];
  const res = [];

  function traverse(r) {
    res.push(r.val);
    if (r.left) {
      traverse(r.left);
    }
    if (root.right) {
      traverse(r.right);
    }
  }

  traverse(root);

  return res;
};
