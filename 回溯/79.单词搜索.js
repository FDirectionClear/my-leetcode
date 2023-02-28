/**
 * 我的答案：
 *  思路对了，但是程序没写全对，通过18个测试用例，懒得调试了
 */
var exist = function(board, word) {
  if (!board[0].length) return false
  const track = [] // 已经路过的路径，这些路径不能再被使用
  const backtrack = function (start, target /**开始寻找的坐标，需要找的字符串 */) {
    if (track.find(item => item[0] === start[0] && item[1] === start[1])) return false // 如果当前寻找的开始坐标已经在过往路径中，那不能再继续寻找
    if (!target.length) return true // 如果当前target已经不存在字母，说明再上一步就已经找到了所有字母，直接返回true，表示寻找成功

    for (let i = start[0], len = board.length; i < len; i ++) {
      for (let j = start[1], l = board[0].length; j < l; j ++) {
        if (board[i][j] === target[0]) {
          track.push([i, j])
          if (
            (i - 1 >= 0 && backtrack([i - 1, j], target.slice(1))) ||
            backtrack([i + 1, j], target.slice(1)) || 
            backtrack([i, j + 1], target.slice(1)) || 
            (j - 1 >= 0 && backtrack([i, j - 1], target.slice(1)))
          ) {
            return true
          } else {
            track.pop()
          }
        } else {
          return false
        }
      }
    }
  }

  return backtrack([0, 0], word)
};

/**
 * 题解答案：
 *  其实思路和我的思路是一样的。上面的程序还需要调试。
 */
var exist = function(board, word) {
  const h = board.length, w = board[0].length;//网格的长和宽
  const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];//方向数组
  const visited = new Array(h);//标记是否访问过的数组
  for (let i = 0; i < visited.length; ++i) {//初始化visited数组
      visited[i] = new Array(w).fill(false);
  }
  const check = (i, j, s, k) => {//检查从网格i，j出发是否能搜索到0-k的字符组成的子串
      //如果i，j位置的字符和第k个的字符不相等，则这条搜索路径搜索失败 返回false
      if (board[i][j] != s.charAt(k)) {
          return false;
       //如果搜索到了字符串的结尾，则找到了网格中的一条路径，这条路径上的字符正好可以组成字符串s
      } else if (k == s.length - 1) {
          return true;
      }
      visited[i][j] = true;//标记i，j被访问过了
      let result = false;
      for (const [dx, dy] of directions) {//向i，j的四个方向继续尝试寻找
          let newi = i + dx, newj = j + dy;
          if (newi >= 0 && newi < h && newj >= 0 && newj < w) {//新的坐标位置合法检查
              if (!visited[newi][newj]) {//新的坐标不能存在于visited中，也就是不能是访问过的
                  const flag = check(newi, newj, s, k + 1);//继续检查新的坐标
                  if (flag) {//如果在网格中找到了字符串 则跳过循环
                      result = true;
                      break;
                  }
              }
          }
      }
      visited[i][j] = false;//回溯状态
      return result;//返回结果
  }

  for (let i = 0; i < h; i++) {
      for (let j = 0; j < w; j++) {
          const flag = check(i, j, word, 0);
          if (flag) {
              return true;
          }
      }
  }
  return false;
};

/**
 * 总结：
 *  （1）循环体不一定写在哪儿，有可能就是写在backtrack之外，灵活应用，回溯的模板就是这样的，不要一定就卸载backtrack里面。
 */


var board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"

console.log(
  exist(board, word)
)

var board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"

console.log(
  exist(board, word)
)


var board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"

console.log(
  exist(board, word)
)
