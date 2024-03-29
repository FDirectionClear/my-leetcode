/**
 * 如果按照22.括号生成的总结来看，这道题并不像回溯算法。
 * 但是和22也有一定的相似性。
 * 相似点：
 * 1. 22有track用来记录当前局部子问题的解，res记录所有符合要求的子问题，每一次循环中求解子问题都会回过头来更新track；36有rows、columns、boxes，每次也都会回过头来更新track。
 * 2. 本质上也都是穷举，都会有剪枝的过程：
 *  2.1 22中碰到left > right，说明没有后续求解潜力，直接种植子问题的后续求解。
 *  2.2 36中如果碰到有横竖和局部小方块中有重读的，直接让整个程序 return false
 */

var isValidSudoku = function(board) {
  // 方向判重
  let rows = {};//行
  let columns = {};//列
  let boxes = {};//3*3小方块
  // 遍历数独
  for(let i = 0;i < 9;i++){
      for(let j = 0;j < 9;j++){
          let num = board[i][j];
          if(num != '.'){//遇到有效的数字
              let boxIndex = parseInt((i/3)) + '-' + parseInt(j/3); // 找到boxIndex，为了方便理解，和教程上不一样。比如 1-2代表第1行第2个盒子
              if(rows[i+'-'+num] || columns[j+'-'+num] || boxes[boxIndex+'-'+num]){//重复检测
                  return false;
              }
              // 方向 + 数字 组成唯一键值，若出现第二次，即为重复
              // 更新三个对象
              rows[i+'-'+num] = true;
              columns[j+'-'+num] = true;
              boxes[boxIndex+'-'+num] = true;
          }
      }
  }
  console.log(rows, columns, boxes)
  return true;
};

var board = 
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]

console.log(isValidSudoku(board))

/**
 * 其他技巧：
 *  1. 建立map的形式多种多样，key值可以大胆开脑洞。很多时候能大幅度减轻时间复杂度，用空间换时间是划算的。
 *  2. 这种明显按照最复杂的情况下，时间和空间复杂度有限（固定9*9最大的时间复杂度也是O(1)），那么暴力穷举法往往是最简单最可靠的。
 */
