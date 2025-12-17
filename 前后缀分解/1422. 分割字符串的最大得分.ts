/**
 * @param {string} s
 * @return {number}
 */

/**
 * 前后缀分解
 */

var maxScore = function (s: string) {
  let leftStandard: number[] = [+s[0] === 0 ? 1 : 0],
    rightStandard: number[] = [+s[0] === 1 ? 1 : 0];
  let maxScore = 0;

  for (let i = 1, len = s.length; i < len; i++) {
    leftStandard.push((+s[i] === 0 ? 1 : 0) + leftStandard[i - 1]);
    rightStandard.push((+s[i] === 1 ? 1 : 0) + rightStandard[i - 1]);
  }

  for (let j = 0, l = s.length; j < l - 1; j++) {
    maxScore = Math.max(
      maxScore,
      leftStandard[j] + rightStandard[l - 1] - rightStandard[j]
    );
  }

  return maxScore;
};
