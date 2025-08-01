/**
 * 先判断适不适用于回溯:
 *  （1）经典排列组合问题；
 *  （2）指明了需要给出决策的结果内容（要求给出排列组合的结果）；
 *  （3）每一步选择不同的字母，都会有N种资情况对应，可以形成一颗树形图。
 */

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

/**
 * 我的答案，算不上是回溯，只是普通的递归实现。
 * 为什么不是回溯？因为我们没有涉及到状态的回退，演算过程也不是树状结构的。也就是并没有维护path变量 + 每次处理完单个节点下的所有节点都path.pop() 这个过程。
 *
 * 当然这是我最容易构思出的结果：先组合前两个，然后用组合结果和后面的按键再进行新的组合，以此往复直到没有新的按键。
 * 面试的时候如果能写这个用这个完全可以，能做出题最为有限。
 *
 */
const letterCombinations = function (digits) {
  if (!digits) return [];
  const keyMap = ["", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];
  const keys = digits.split("").map((item) => keyMap[item - 1]);
  const result = [];

  const recursion = (
    prevMembers,
    index /**先前组合好的成员们，将要组合的是哪个键的映射成员 */
  ) => {
    const key = keys[index];
    for (let i = 0, len = key.length; i < len; i++) {
      if (index === keys.length - 1) {
        result.push(prevMembers + key[i]);
      } else {
        recursion(prevMembers + key[i], index + 1);
      }
    }
  };

  recursion("", 0);

  return result;
};

/**
 * 还有一种的我的答案，逻辑和上一道题一样，只是写法不同，也不是回溯。
 */
var letterCombinations2 = function (digits) {
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

  const recursion = (target) => {
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
    recursion(target); // 拿path中的每一个根节点去和currRight中的每一个字母做组合
  }
  return results;
};

/**
 * 萧晨给的答案，通过dfs的办法解决，实际上也算不上回溯。
 * 题解答案：dfs+回溯
 */
var letterCombinations3 = (digits) => {
  if (digits.length == 0) return [];
  const res = [];
  const map = {
    //建立电话号码和字母的映射关系
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };

  const dfs = (curStr, i) => {
    //curStr是递归每一层的字符串，i是扫描的指针
    if (i > digits.length - 1) {
      //边界条件，递归的出口
      res.push(curStr); //其中一个分支的解推入res
      return; //结束递归分支，进入另一个分支
    }
    const letters = map[digits[i]]; //取出数字对应的字母
    for (const l of letters) {
      //进入不同字母的分支
      dfs(curStr + l, i + 1); //参数传入新的字符串，i右移，继续递归
    }
  };
  dfs("", 0); // 递归入口，传入空字符串，i初始为0的位置
  return res;
};

/**
 * 真正的回溯。在看了教程之后又所启发，但教程没太看懂，算是半个自己做出来的。
 * 思路并不是两两匹配，而是一次处理所有按键，每一个按键里一次都取一个和前一个作为组合，这样推演结构就是一个树状结构，我们就能用回溯了。
 */
// [a][def][ghi]
//   [ad][ef][ghi]
//     [adg][][hi]
//     [adh][][i]
//     [adi][][]
//   [ae][f][ghi]
//   [af][][ghi]

// [b][def ghi]

// [c][def ghi]
var letterCombinations4 = function (digits) {
  const letterMap = [
    "", // 0
    "", // 1
    "abc", // 2
    "def", // 3
    "ghi", // 4
    "jkl", //
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

var digits = "23";
console.log(letterCombinations(digits));

var digits = "";
console.log(letterCombinations(digits));

var digits = "2";
console.log(letterCombinations(digits));

var digits = "22";
console.log(letterCombinations(digits));
