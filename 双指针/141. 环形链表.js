/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    const queue = []
    while(head.next) {
      if (!queue.includes(head.next)) {
        queue.push(head.next)
        head = head.next
      } else {
        return true
      }
    }

    return false
};
