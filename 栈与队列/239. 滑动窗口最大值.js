// 输入：nums = [1,3,-1,-3,5,3,6,7], k = 3
// 输出：[3,3,5,5,6,7]

/**
 * 没有通过全部测试用例，只通过了一半，但是思路是对的，只是边界情况 k=1 时候得问题。
 * 这道题用暴力求解并不困难，只要每次形成窗口，都暴力求解即可。我们其实用的也是暴力求解的问题，只不过加了一些性能优化方法(增加了maxIndex)，节省了中间可能多余的暴力求解过程。
 *
 * 面试的时候能写出来这样其实就可以了。基本上就是处理边界情况的问题。
 *
 * 实际上这道题应该用单调队列去做。
 */
var maxSlidingWindow = function (nums, k) {
  let result = [];
  let maxIndex = 0;
  const set = [];

  let left = 0,
    right = 0;

  const findMaxIndex = (startIndex) => {
    let maxIndex = startIndex;
    for (let i = startIndex, len = set.length + startIndex; i < len; i++) {
      if (set[i] >= set[maxIndex]) {
        maxIndex = i;
      }
    }
    return maxIndex - 1;
  };

  while (right < nums.length) {
    set.push(right);

    if (right - left <= k - 1) {
      // 说明当前窗口还未充满，处于扩张状态
      if (nums[right] >= nums[maxIndex]) {
        maxIndex = right;
      }
      if (right - left === k - 1) {
        result.push(nums[maxIndex]);
      }
    } else {
      set.unshift();

      // 如果当前窗口已经溢出，那么左边出窗口一个后，重新求窗口内最大值
      if (nums[right] >= nums[maxIndex]) {
        maxIndex = right;
      } else if (left === maxIndex) {
        // 如果左边界正好是先前窗口内的最大值索引，那么重新求窗口内最大值
        maxIndex = findMaxIndex(left + 1);
      }

      result.push(nums[maxIndex]);
      left++;
    }

    right++;
  }

  return result;
};

var nums = [1, 3, 1, 2, 0, 5];
var k = 3;
console.log(maxSlidingWindow(nums, k));

/**
 * 这道题其实可以用单调队列的最大去做。但是想到这种方法比较困难。
 * https://programmercarl.com/0239.%E6%BB%91%E5%8A%A8%E7%AA%97%E5%8F%A3%E6%9C%80%E5%A4%A7%E5%80%BC.html#%E5%85%B6%E4%BB%96%E8%AF%AD%E8%A8%80%E7%89%88%E6%9C%AC
 *
 * 这个答案自己写的，思路正确但通过 40/51 测试用例。不打算继续调试了
 */
// [1,3,-1,-3,5,3,6,7]
var maxSlidingWindow = function (nums, k) {
  const result = []; // 7
  const queue = []; // 单调递减队列 7 1

  let left = 0, // 2
    right = 0;

  const flushQueue = (newMember) => {
    let i = 0;

    while (i < queue.length) {
      if (queue[i] <= newMember) {
        queue.splice(i, 1);
      } else {
        i++;
      }
    }
  };

  while (right < nums.length) {
    if (right - left >= k) {
      // 说明窗口需要收缩，已经过了扩张阶段
      if (nums[left] === queue[0]) {
        // 如果离开窗口的元素正好是队头元素，那么要给他出栈
        queue.shift();
      }
      left++;
    }

    if (queue.length > 0) {
      flushQueue(nums[right]);
    }

    queue.push(nums[right]);

    if (right - left === k - 1) {
      // 如果当前窗口中的元素个数正好是k，那么就要上报result
      result.push(queue[0]);
    }

    right++;
  }

  return result;
};

/**
 * 下面是carl给的正确答案
 */
var maxSlidingWindow = function (nums, k) {
  class MonoQueue {
    queue;
    constructor() {
      this.queue = [];
    }
    enqueue(value) {
      let back = this.queue[this.queue.length - 1];
      while (back !== undefined && back < value) {
        this.queue.pop();
        back = this.queue[this.queue.length - 1];
      }
      this.queue.push(value);
    }
    dequeue(value) {
      let front = this.front();
      if (front === value) {
        this.queue.shift();
      }
    }
    front() {
      return this.queue[0];
    }
  }
  let helperQueue = new MonoQueue();
  let i = 0,
    j = 0;
  let resArr = [];
  while (j < k) {
    helperQueue.enqueue(nums[j++]);
  }
  resArr.push(helperQueue.front());
  while (j < nums.length) {
    helperQueue.enqueue(nums[j]);
    helperQueue.dequeue(nums[i]);
    resArr.push(helperQueue.front());
    i++, j++;
  }
  return resArr;
};
