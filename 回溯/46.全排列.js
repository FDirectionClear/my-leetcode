/**
  我自己的思路：
    如 [1,2,3]的全排列，那么就是 1和[2,3]的所有全排列 + 2和[1,3]的所有全排列 + 3和[1,2]的所有全排列
 */

var permute = function (nums) {
  if (!nums.length) return [];
  if (nums.length === 1) return [nums];
  const res = [];

  for (let i = 0, len = nums.length; i < len; i++) {
    const subPermute = permute(nums.slice(0, i).concat(nums.slice(i + 1)));
    for (let j = 0, l = subPermute.length; j < l; j++) {
      res.push([nums[i]].concat(subPermute[j]));
    }
  }

  return res;
};

var nums = [1, 2, 3];

console.log(permute(nums));

var nums = [1];

console.log(permute(nums));
