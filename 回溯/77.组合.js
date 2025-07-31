// [1,2,3,4]

// [1] [2 3 4]
//             [1 2] [3 4]
//                         [1 2 3] [4]
//                         [1 2 4] []
//             [1 3] [4]
//                         [1 3 4] []
//             [1 4] []
// [2] [3 4]    [2 3] [4]
// [3] [4]      [3 4] []

// [4] []       []

/**
 * 通过全部测试用例
 */
var combine = function (n, k) {
  const result = [];
  const group = Array.from({ length: n }).map((_, i) => i + 1);

  const backtracking = (left, right) => {
    if (left.length === k) {
      result.push(left);
      return;
    }
    if (right.length === 0) {
      return;
    }
    for (let i = 0, len = right.length; i < len; i++) {
      const newCombiner = right.shift();
      backtracking([...left, newCombiner], [...right]);
    }
  };

  for (let i = 0; i < n; i++) {
    backtracking([], group);
  }

  return result;
};
