var generateMatrix = function (n) {
  const result = Array.from({ length: n }, () =>
      Array.from({ length: n }, () => undefined)
    ),
    maxNum = n * n;
  let current = 1;

  const matrixHandler = (start, size /**start左上起始坐标，size是大小 */) => {
    let topColIdx = 0;
    // 遍历上边
    while (topColIdx < size - 1) {
      result[start][topColIdx] = current++;
      topColIdx++;
    }
    // 遍历右边
    let rightRowIdx = 0;
    while (rightRowIdx < size - 1) {
      result[rightRowIdx][start + size - 1] = current++;
      rightRowIdx++;
    }
    // 遍历底边
    let bottomColIndex = size - 1;
    while (bottomColIndex > start) {
      result[size - 1][bottomColIndex] = current++;
      bottomColIndex--;
    }

    // 遍历左边
    let leftRowIdx = size - 1;
    while (leftRowIdx > start) {
      result[size - 1][leftRowIdx] = current++;
      leftRowIdx--;
    }

    if (current < maxNum) {
      // 如果循环过一周，当前数字还是比最大的数字小，那就说明还要继续内层环绕
      matrixHandler(start + 1, size - 1);
    }
  };

  matrixHandler(0, 3);

  return result;
};

console.log(generateMatrix(3));
