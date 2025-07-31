var combine = function (n, k) {
  // 回溯法
  let result = [],
    path = [];
  let backtracking = (_n, _k, startIndex) => {
    // 终止条件
    if (path.length === _k) {
      result.push(path.slice()); // copy一份，放入result
      return;
    }
    // 循环本层集合元素
    for (let i = startIndex; i <= _n; i++) {
      // 这道题没什么需要对根节点和当前子节点特殊处理的逻辑
      path.push(i); // 形成下一层backtracking的根节点
      backtracking(_n, _k, i + 1); // 递归
      path.pop(); // 将路径回溯成根节点的状态，方便下一轮for循环形成新的根节点
    }
  };
  backtracking(n, k, 1);
  return result;
};
