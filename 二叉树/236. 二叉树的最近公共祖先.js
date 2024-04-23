/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
/**
 * 经验：
 * 1. 每一层的递归单层逻辑一般都是按照“点”来“来处理的。比较的都是当前点。
 * 当然也会按照1层的小树为最小递归单层逻辑处理的情况，这种方法不是很灵活，所以能解决的问题可能都比较简单。
 * 2. 可以考虑按照语意去构思递归思维。eg: 题目是找二叉树的最近公共祖先，那语意就可以是”子树中是否包含pq的其中一个，或者pq的最近公共祖先“，
 * 最终的递归解题逻辑可以定为 “左/右大结构的子树中如果仅包含pq其中一个点，那么就返回这个点，如果都包含就返回这个公共祖先点” 。
 * 3. 有些题是要根据满足结果的找规律的。这道题就是，需要找到4种情况才行，我觉得很难想到。
 * 
 * https://xiaochen1024.com/courseware/60b4f11ab1aa91002eb53b18/6196d279c1553b002e57bf27
 */ 
var lowestCommonAncestor = function(root, p, q) {
  // 1. 确定递归的函数
  const travelTree = function(root,p,q) {
      // 2. 确定递归终止条件
      if(root === null || root === p||root === q) {
          return root;
      }
      // 3. 确定递归单层逻辑
      let left = travelTree(root.left,p,q);
      let right = travelTree(root.right,p,q);
      //如果在某一个节点的左右子树都能找到p和q说明这个节点就是公共祖先
      if(left !== null&&right !== null) {
          return root;
      }
      if(left ===null) {//如果左子树没找到就说明p，q都在右子树
          return right;
      }
      return left;//如果右子树没找到就说明p，q都在左子树
  }
 return  travelTree(root,p,q);//递归开始
};
