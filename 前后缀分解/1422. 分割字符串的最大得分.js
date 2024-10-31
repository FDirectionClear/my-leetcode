/**
 * @param {string} s
 * @return {number}
 */
var maxScore = function (s) {
  const dp = [];
  const prev = [];
  const suff = [];
  let max = 0;
  prev[0] = +s[0] === 0 ? 1 : 0; // 1 2
  suff[s.length - 1] = +s[s.length - 1] === 1 ? 1 : 0; // 0 0

  for (let i = 1, len = s.length; i < len; i++) {
    prev[i] = prev[i - 1] + (+s[i] === 0 ? 1 : 0);
  }

  for (let j = s.length - 2; j >= 0; j--) {
    suff[j] = suff[j + 1] + (+s[j] === 1 ? 1 : 0);
  }

  for (let k = 1, len = s.length; k < len - 1; k++) {
    dp[k] = prev[k - 1] + suff[k];
    if (dp[k] > max) {
      max = dp[k];
    }
  }

  return max;
};

var s = "011101";
var s = "00111";
var s = "1111";

console.log(maxScore(s));
