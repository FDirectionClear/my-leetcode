["abc", "def", "ghi"];

// [a][def][ghi]
//   [ad][ef][ghi]
//     [adg][][hi]
//     [adh][][i]
//     [adi][][]
//   [ae][f][ghi]
//   [af][][ghi]

// [b][def ghi]

// [c][def ghi]

backtracking = (groupIndex, startIndex) => {
  path.push(map[groupIndex][startIndex]);
  backtracking(groupIndex + 1, i + 1);
};

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
  const result = [],
    path = [];
  const group = digits
    .split("")
    .map((dig) => letterMap[dig])
    .filter((item) => item !== "");

  const backtracking = (groupIndex) => {
    const currGroup = group[groupIndex];
    if (path.length === group.length) {
      result.push(path.join(""));
      return;
    }
    for (let i = 0, len = currGroup.length; i < len; i++) {
      path.push(currGroup[i]);
      backtracking(groupIndex + 1);
      path.pop();
    }
  };

  backtracking(0);

  return result;
};
