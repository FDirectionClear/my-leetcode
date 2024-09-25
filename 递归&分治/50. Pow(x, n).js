/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */

/**
 * 本以为非常简单，下面是自己写的，应该能通过所有测试用例，但是超时了。
 * n可以大的非常变态。
 */
var myPow = function (x, n) {
  if (x === 0) return 0;
  if (n === 0) return 1;

  let remain = Math.abs(n),
    curr = 1;

  if (n > 0) {
    while (remain >= 1) {
      curr = curr * x;
      remain--;
    }
  } else {
    while (remain >= 1) {
      curr = (curr * 1) / x;
      remain--;
    }
  }
  return curr;
};

/**
 * 下面是xiaochen给出的答案，借助了数学技巧，也体现了分治的思想，可以越过步骤，减少计算次数，非常变态。
 */
var myPow = function (x, n) {
  if (n === 0) return 1; // n=0直接返回1
  if (n < 0) {
    //n<0时 x的n次方等于1除以x的-n次方分
    return 1 / myPow(x, -n);
  }
  if (n % 2) {
    //n是奇数时 x的n次方 = x*x的n-1次方
    return x * myPow(x, n - 1);
  }
  return myPow(x * x, n / 2); //n是偶数，使用分治，一分为二，等于x*x的n/2次方
};
