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
var preorderTraversal = function(root) {
    let result = []

    function travalSingleTree(single) {
        if (!single) return
        result.push(single.val)
        travalSingleTree(single.left)
        travalSingleTree(single.right)
    }

    travalSingleTree(root)

    return result
};


/**
 * 中序遍历
 */
var inorderTraversal = function(root) {
    let result = []

    function travalSingleTree(single) {
        if (!single) return
        travalSingleTree(single.left)
        result.push(single.val)
        travalSingleTree(single.right)
    }

    travalSingleTree(root)

    return result
};


/**
 * 中序遍历
 */
var postorderTraversal = function(root) {
    let result = []

    function travalSingleTree(single) {
        if (!single) return
        travalSingleTree(single.left)
        travalSingleTree(single.right)
        result.push(single.val)
    }

    travalSingleTree(root)

    return result
};
