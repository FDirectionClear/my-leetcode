/**
 * 这道题可以有多种方法，我想到的第一种用的是O(n)的空间。
 * 这个方法比较容易想到，但是超出空间了
 */
var removeDuplicates = function (nums) {
  if (nums.length === 1) return 1;
  const map = {};

  for (let i = 0, len = nums.length; i < len; i++) {
    if (!map[nums[i]]) {
      map[nums[i]] = 1;
    } else {
      map[nums[i]] = map[nums[i]] + 1;
      if (map[nums[i]] > 2) {
        nums.splice(i, 1);
        i--;
      }
    }
  }

  return nums.length;
};

/**
 * 看题解，也可以用双指针尝试，于是自己想了一个双指针的做法，这个做法一下子就通过了所有测试用例
 * TIP：原生方法也有时间复杂度和空间复杂度，万幸的是splice方法的空间复杂度是O(1)，空间复杂度是O(N)。在面试中如果实在没有更优雅的题解，可以忽视原生方法的复杂度，能写出来为最优先。
 */
var removeDuplicates = function (nums) {
  if (nums.length === 1) return 1;

  for (let i = 0; i < nums.length; i++) {
    let duliCount = 1; // 记录当前和nums[i]重复的次数
    if (i > 0 && nums[i] === nums[i - 1]) continue; // 如果下一个i指针位置和上一个i指针位置重合，可以直接越过，节约性能，当然也可以没有这一步

    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] === nums[i]) {
        duliCount++; // 如果相同就累加1
        if (duliCount > 2) {
          nums.splice(j, 1); // 大于2的时候开始裁剪当前项
          j--; // 因为出现了裁剪，在for循环中需要让len实时取nums.length，并且裁剪过后应该j--回退指针以配合最后的j++让下一轮for循环依旧从当前位置开始，否则在裁剪情况下，就变成隔一个数组元素一处理了。
        }
      }
    }
  }

  return nums.length;
};
