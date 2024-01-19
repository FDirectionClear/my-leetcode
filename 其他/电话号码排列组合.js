var letterCombinations = function(digits) {
  if (!digits.length) return []
  const keyMap = ['', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']
  const combineSources = digits.split('').map(d => keyMap[d - 1])
  let results = []

  const backtrace = (preCombine, keyIndex) => {
    if (keyIndex >= combineSources.length) {
      results.push(preCombine)
      return true
    }

    const splitKeys = combineSources[keyIndex].split('') // 当前需要组合的keys

    for(let i = 0, len = splitKeys.length; i < len; i ++) {
      backtrace(preCombine + splitKeys[i], keyIndex + 1)
    }
  }

  backtrace('', 0)

  return results
};

const digits = "23"
// ["ad","ae","af","bd","be","bf","cd","ce","cf"]

// console.log(
// 	letterCombinations("23")
// )
// console.log(
//   letterCombinations("")
// )
// console.log(
//   letterCombinations("235")
// )