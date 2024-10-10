/**
 * 给定二叉搜索树的根结点 root，返回值位于范围 [low, high] 之间的所有结点的值的和。
 * */

// 广度优先遍历 bfs
var rangeSumBST = function (root, low, high) {
  const roots = [root];
  let res = 0;

  while (roots.length) {
    const node = roots.shift();
    const nodeValue = node.val;
    if (nodeValue >= low && nodeValue <= high) {
      res += nodeValue;
    }
    if (node.left) {
      roots.push(node.left);
    }
    if (node.right) {
      roots.push(node.right);
    }
  }

  return res;
};

// 深度优先遍历 dfs
var rangeSumBST = function (root, low, high) {
  let res = 0;

  function transvers(node) {
    const nodeValue = node.val;
    if (nodeValue >= low && nodeValue <= high) {
      res += nodeValue;
    }
    if (node.left) {
      transvers(node.left);
    }
    if (node.right) {
      transvers(node.right);
    }
  }

  transvers(root);
  return res;
};
