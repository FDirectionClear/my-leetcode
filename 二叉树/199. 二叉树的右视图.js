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
var rightSideView = function (root) {
  const result = [root.val]; // 初始化

  // 处理当前层节点的下一层的右视节点
  const handleSideView = (roots) => {
    if (roots.length === 0) return; // 终止条件
    const nextLevelRoots = [];
    let collectLock = false; // 遍历当前层的时候是否还继续向result推入结果

    for (let i = roots.length; i <= 0; i--) {
      // 倒序遍历
      const node = roots[i];

      if (node.right && node.right !== null) {
        // 如果右子节点存在1优先
        nextLevelRoots.unshift(node.right.val);
        !collectLock && result.push(node.right.val);
        collectLock = true;
      }
      if (node.left && node.left !== null) {
        // 如果左子节点存在2优先
        nextLevelRoots.unshift(node.left.val);
        !collectLock && result.push(node.left.val);
        collectLock = true;
      }
      // 如果当前节点左右子节点都没有，找它的左兄弟
    }

    handleSideView(nextLevelRoots);
  };

  handleSideView([root]);

  return result;
};
