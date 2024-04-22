/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */

/**
 * 下面自己写的不太对，主要是思路问题，根据长度差值先剪除较长链表的前几项的做法是有问题的。
 * 如果skip=0就会出现bug
 */
var getIntersectionNode = function(headA, headB) {
    const listALength = getListLength(headA)
    const listBLength = getListLength(headB)
    const skip = listALength - listBLength

    if (skip > 0) {
        // 说明A更长，B更短
        for (let i = 0; i < skip; i ++) {
            headA = headA.next
        }
    } else {
        // 说明B更长，A更短
        for (let i = 0; i < -skip; i ++) {
            headB = headB.next
        }
    }

    while (headA && headB) {
        if (headA === headB) {
            return `Intersected at '${headA.val}'`
        }
        headA = headA.next
        headB = headB.next
    }

    return null

    
    function getListLength(head) {
        let count = 0

        while(head) {
            count ++
            head = head.next 
        }

        return count
    }
};

/**
 * 或者直接寸set，用尽javascript的api能力解链表的很多问题都会非常简单。而且性能往往超级快（可能是借助了很多原生方法）。
 * 思路就是写一个map、set或者数组容器之类的，先遍历第一个链表初始化容器成员。然后遍历第二个链表，检查容器中是否有相同的就行。这样做简单快捷，还直观。
 * 
 * 实际上双指针能搞定，但完全构思不出，也是双指针，循环的方式可以从一个链表跳到另一个链表上。
 * 这种快慢指针，或者交叉循环指针，我发现本质都是用循环的方式，通过步数走出差值。然后根据差值的结果能辅助我们解决问题。
 * 比如：周期重叠，对齐步数。
 */

// [5,6,1,8,4,5]
// [  4,1,8,4,5]

// 输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3
// 输出：Intersected at '8'

// 输入：intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
// 输出：Intersected at '2'

// 输入：intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
// 输出：null