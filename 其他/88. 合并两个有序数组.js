var merge = function(nums1, m, nums2, n) {
  if (nums1.length === 0) return
  const moveRight = (m) => {
    let prev = 0
    for (let i = m, len = nums1.length; i < len; i ++) {
      temp = nums1[i]
      nums1[i] = prev
      prev = temp
    }
  } // 代表将nums的第m个元素后面的元素后移1位

	for (let i = 0, len = nums2.length; i < len; i ++) {
		const currNum2 = nums2[i]
    debugger
    for (let j = 0, l = nums1.length; j < l; j ++) {
      const currNum1 = nums1[j]
      debugger
      if (currNum2 <= currNum1 || (!currNum1 && j > m - 1)) {
        moveRight(j)
        debugger
        nums1[j] = currNum2
        debugger
        break;
      }
    }
	}

  return nums1
};

[-1 0 0 1 3 0 0]

const nums1 = [-1,3,0,0,0,0,0] m = 2
const nums2 = [0,0,1,2,3] n = 5

// 输出
[-1,0,1,2,3,0,3]
// 预期结果
[-1,0,0,1,2,3,3]