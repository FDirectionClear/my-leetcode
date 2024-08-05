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
/**
 * 前序遍历
 */
var preorderTraversal = function (root) {
  let result = [];

  function travalSingleTree(single) {
    if (!single) return;
    result.push(single.val);
    travalSingleTree(single.left);
    travalSingleTree(single.right);
  }

  travalSingleTree(root);

  return result;
};

/**
 * 中序遍历
 */
var inorderTraversal = function (root) {
  let result = [];

  function travalSingleTree(single) {
    if (!single) return;
    travalSingleTree(single.left);
    result.push(single.val);
    travalSingleTree(single.right);
  }

  travalSingleTree(root);

  return result;
};

/**
 * 后序遍历
 */
var postorderTraversal = function (root) {
  let result = [];

  function travalSingleTree(single) {
    if (!single) return;
    travalSingleTree(single.left);
    travalSingleTree(single.right);
    result.push(single.val);
  }

  travalSingleTree(root);

  return result;
};

/*
迭代法要先有的意识：
 * 维护一个stack是常用的解题方法，stack只是一个容器，并没有要求stack中的元素都具有统一的意义，只要需要记忆的，无论这个记忆的元素是为哪个环节服务的，都可以放进去。通过stack中取出的元素可以用标志位去区分应该属于当前元素此时此刻的处理方法。
 * 1. stack的作用是记忆需要遍历的根节点 + 需要收集进入res的节点值！
 * 2. 每次while循环都取出了stack中的节点，然后通过标志位来控制流程（标志位可以是推入stack中的特殊元素——null，也可以是一个普通的flag变量），是收集进res，还是取出根节点进行拆分。
 * 3. 通常都是以清空栈为循环结束，即 while(stack.length) { ... }
 */

// 然后再来看本题是怎么应用的：
// 1. stack中的最后一个元素，是等待收入res中的。之前的元素，都是未来需要进一步拆分的根节点。
// 2. 每一次拆分节点的最后都推入null，是为了在下一轮循环中，先进入res的维护流程，收集stach最后那个元素
// 4. 每一轮while循环，要么找到左右子节点，要么是将需要遍历的节点收集到res
// 3. stack有两个用处：
//   1. 最后一个元素是要被推入res的遍历结果
//   2. 前面的都是根节点，用于记忆还未遍历的节点有哪些。

// 在了解完上面这些精髓过后，你甚至都可以简单修改给出的答案

var preorderTraversal = function (root, res = []) {
  if (!root) return [];
  const stack = [];
  stack.push(root);

  while (stach.length) {
    const curr = stack.pop();
    if (!curr) {
      // 进入到收集res的过程
      res.push(curr);
      continue;
    }
    if (curr.right) stack.push(curr.right);
    if (curr.left) stack.push(curr.left);
    stack.push(curr.val); // 修改点：推入节点值，而不是节点本身。凸显一个stack中元素多元化的思想。
    stack.push(null); // 推入标志位，下次开始收集节点值，而不是拆分节点
  }
};
