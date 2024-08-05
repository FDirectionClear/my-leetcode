// 树节点定义
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

/**
 * 广度优先遍历不适用递归，你会发现递归很难处理横向遍历的顺序。
 * 用栈处理，是非常简单的做法。
 */
// 广度优先遍历
function bfs(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];

  while (queue.length) {
    const node = queue.shift();
    result.push(node.val);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }

  return result;
}

/**
 * dfs用递归处理就很简单了
 * 实际上深度优先遍历分为3种，就是我们所说的前中后序遍历；
 * 深度优先遍历和前中后序遍历是相同的概念的。不是两种不同的方法
 */
function dfs(root) {
  // 这就是个明显的前序遍历
  if (!root) return [];
  const result = [];
  const dfsVisit = (node) => {
    result.push(node.val);
    if (node.left) dfsVisit(node.left);
    if (node.right) dfsVisit(node.right);
  };
  dfsVisit(root);
  return result;
}

// 示例树
const tree = new TreeNode(1);
tree.left = new TreeNode(2);
tree.right = new TreeNode(3);
tree.left.left = new TreeNode(4);
tree.left.right = new TreeNode(5);
console.log(bfs(tree)); // 输出: [1, 2, 3, 4, 5]
console.log(dfs(tree)); // 输出: [1, 2, 4, 5, 3]
