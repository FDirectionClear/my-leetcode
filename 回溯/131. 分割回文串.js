// 示例 1：

// 输入：s = "aab"
// 输出：[["a","a","b"],["aa","b"]]
// 示例 2：

// 输入：s = "a"
// 输出：[["a"]]

// "sk s jaa j s mam s b a s";

// [a][ab]
//   [aa][b]
//     [aab] 终止
// [aa][b]
// [aab]

// [s] [kjaajsmamsbas] 是回文组合继续考虑分割，拿到后面的回文组合进行拼接
// [sk] [sjaajsmamsbas] 已经不是回文了，分割作废
// [sks] [jaajsmamsbas] 是回文组合继续取
//   [j][aajsmamsbas] 是回文组合继续考虑分割，拿到后面的回文组合进行拼接
//     [a][ajsmamsbas]
//   [ja][ajsmamsbas] 已经不是回文了，分割作废
//   ...
//   [jaaj][smamsbas]
// [s k s j] [aajsmamsbas] 已经不是回文了，分割作废
// [s k s j a] [ajsmamsbas] 已经不是回文了，分割作废
// [s k s j a a] [jsmamsbas] 已经不是回文了，分割作废
//           ...

var partition2 = function (s) {
  const result = [];

  const findPartition = (currIndex) => {
    let left = currIndex,
      right = currIndex;
    let left2 = currIndex - 1,
      right2 = currIndex;

    while (left >= 0 && right <= s.length) {
      if (s[left] === s[right]) {
        result.push([s.slice(left, right + 1)]);
      } else {
        break;
      }

      left--;
      right++;
    }

    while (left2 >= 0 && right2 <= s.length) {
      if (s[left2] === s[right2]) {
        result.push([s.slice(left2, right2 + 1)]);
      } else {
        break;
      }
      left2--;
      right2++;
    }
  };

  for (let i = 0, len = s.length; i < len; i++) {
    findPartition(i);
  }

  return result;
};

function isHuiwen(str) {
  if (str.length === 0) return true;

  let left = 0,
    right = str.length - 1;

  while (left < right) {
    if (str[left] !== str[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}

var partition = function (s) {
  const result = [],
    path = [];

  const backtracking = (startIndex) => {
    if (startIndex >= s.length) {
      result.push(path.slice());
      return;
    }

    for (let i = startIndex, len = s.length; i < len; i++) {
      const sliced = s.slice(startIndex, i + 1);
      if (isHuiwen(sliced)) {
        path.push(sliced);
        backtracking(i + 1);
        path.pop();
      }
    }
  };

  backtracking(0);

  return result;
};

const s1 = "skjaajsmamsbas";
const s2 = "aab";
const s3 = "a";
console.log(partition(s1));
// console.log(partition(s2));
// console.log(partition(s3));
