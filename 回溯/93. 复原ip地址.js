// 示例 1：

// 输入：s = "25525511135"
// 输出：["255.255.11.135","255.255.111.35"]
// 示例 2：

// 输入：s = "0000"
// 输出：["0.0.0.0"]
// 示例 3：

// 输入：s = "101023"
// 输出：["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]

var restoreIpAddresses = function (s) {
  const result = [],
    path = [];

  const backtracking = (startIndex, depth) => {
    // 终止条件 (4-depth+1)*3 > s.length - startIndex | depth > 4
    if (depth > 4 || (4 - depth + 1) * 3 < s.length - startIndex) {
      // debugger;
      if (depth === 5) {
        result.push(path.join("."));
      }
      return;
    }
    for (let i = startIndex; i < startIndex + 3; i++) {
      // debugger;
      path.push(s.slice(startIndex, i + 1));
      // debugger;
      backtracking(i + 1, depth + 1);
      // debugger;
      path.pop();
    }
  };

  backtracking(0, 1);

  return result;
};

var s1 = "25 525 511 135";
console.log(restoreIpAddresses(s1));
