// 输入: temperatures = [73,74,75,71,69,72,76,73]
// 输出: [1,1,4,2,1,1,0,0]

var dailyTemperatures = function (temperatures) {
  const result = new Array(temperatures.length).fill(0);
  const noUpdateIdxs = []; // [2, 4, 5]

  for (let i = 0, len = temperatures.length; i < len; i++) {
    debugger;
    let j = 0; // i = 6  temperatures[i]=72 j=1  noUpdateIdxs[j]=4 temperatures[noUpdateIdxs[j]]=69
    while (j < noUpdateIdxs.length) {
      debugger;
      if (temperatures[i] > temperatures[noUpdateIdxs[j]]) {
        debugger;
        result[noUpdateIdxs[j]] = i - noUpdateIdxs[j];
        noUpdateIdxs.splice(j, 1);
        debugger;
        break;
      }
      debugger;
      j++;
    }
    debugger;
    noUpdateIdxs.push(i);
  }

  return result;
};

var temperatures = [73, 74, 75, 71, 69, 72, 76, 73];
console.log(dailyTemperatures(temperatures));

// 遍历 73 i=0
// noUpdateIndex = [0]

// 遍历 74 i=1
//   遍历noUpdateIndex j=0
//   if temp[i] > temp[j]
//     noUodateIndex删除第j个
//     result[i] = i-j
// noUpdateIndex.push(i)
