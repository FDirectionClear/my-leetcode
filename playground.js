// [a]

// [abc, def, ghi]

// result = [abc]
// [a] [def]
//     [ad][ef]
//     [ae][f]
//     [af][]
// [b] [def]
//     [bd][ef]
//     [be][f]
//     [bf][]
// [c] [def]

// ["ad","ae","af","bd","be","bf","cd","ce","cf"] [ghi]

// while

// [ad] [ghi]
//     [adg][hi]
//     [adh][i]
//     [adi][]
// [ae] [ghi]
//     ....

// const results = []
// const waitingCombine = []
// const path = []

var letterCombinations = function (digits) {
  const letterMap = [
    "", // 0
    "", // 1
    "abc", // 2
    "def", // 3
    "ghi", // 4
    "jkl", // 5
    "mno", // 6
    "pqrs", // 7
    "tuv", // 8
    "wxyz", // 9
  ];
  let results = [],
    waitingCombine = digits.split("").map((dig) => letterMap[dig]); // 初始化的所有点的映射

  const backtracking = (target) => {
    let tempResults = [];

    if (results.length === 0) {
      tempResults = target.split("");
    } else {
      for (let i = 0, len = results.length; i < len; i++) {
        for (let j = 0, l = target.length; j < l; j++) {
          tempResults.push(results[i] + target[j]);
        }
      }
    }

    results = tempResults;
  };

  while (waitingCombine.length) {
    const target = waitingCombine.shift();
    backtracking(target); // 拿path中的每一个根节点去和currRight中的每一个字母做组合
  }
  return results;
};

const digits = "23";

console.log(letterCombinations(digits));
