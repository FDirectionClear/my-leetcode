// 最大循环num.length * 9^2次
// 用hash表判断每次看有没有循环

var isHappy = function (n: number) {
  const maxCount = n.toString().length * Math.pow(9, 2)
  const set = new Set([n])
  let currNum = n

  for (let i = 0; i <= maxCount; i ++) {
    const splitNumStack = currNum.toString().split('')
    let sum = 0

    while (splitNumStack.length) {
      sum = Math.pow(+(splitNumStack.pop()!), 2) + sum
    }

    if (sum === 1) {
      return true
    }

    if (set.has(sum)) {
      return false
    }

    set.add(sum)
    currNum = sum
  }

  return false
}

console.log(isHappy(19))
console.log(isHappy(2))

// 2
// 4
// 1 6 = 1 + 36
// 3 7 = 9+49= 58
// 5 8 = 25 + 64 = 89
// 8 9 = 64 81 = 145
// 1 4 5 = 1 + 16 + 25 = 42
// 4 2 = 16 + 4 = 20
// 2 0 = 4 + 0 = 4
// .