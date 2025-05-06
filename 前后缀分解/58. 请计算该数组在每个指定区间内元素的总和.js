// https://programmercarl.com/kamacoder/0058.%E5%8C%BA%E9%97%B4%E5%92%8C.html#%E6%80%9D%E8%B7%AF
// https://kamacoder.com/problempage.php?pid=1070

// 题目描述
// 给定一个整数数组 Array，请计算该数组在每个指定区间内元素的总和。

// 输入描述
// 第一行输入为整数数组 Array 的长度 n，接下来 n 行，每行一个整数，表示数组的元素。随后的输入为需要计算总和的区间，直至文件结束。

// 输出描述
// 输出每个指定区间内元素的总和。

// 输入示例
// 5
// 1
// 2
// 3
// 4
// 5
// 0 1
// 1 3

// 输出示例
// 3
// 9

// 数据范围：
// 0 < n <= 100000

/**
 * 不能用暴力求解法，即多次遍历找到区间，然后计算区间内的值
 */
// [1,2,3,4,5], [0,1], [1,3], ....
// return [3,9]
function prefixSum(source, ...sections) {
  const p = [];
  const results = [];

  source.forEach((item, index) => {
    if (index === 0) {
      p[index] = item;
    } else {
      p[index] = p[index - 1] + item;
    }
  });

  sections.forEach(([left, right]) => {
    let result = 0;

    if (left - 1 < 0) {
      result = p[right];
    } else {
      result = p[right] - p[left - 1];
    }

    results.push(result);
  });

  return results;
}

console.log(prefixSum([1, 2, 3, 4, 5], [0, 1], [1, 3]));
