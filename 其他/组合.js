const combine = (n, k) => {
  const group = []
  for (let i = 1; i < n + 1; i ++) {
    group.push(i)
  }
  const len = group.length
  const results = []

  const backtrace = (startIndex, endIndex, m) => {
    debugger
    if (endIndex - startIndex <= 0) return []
    debugger
    if (m <= 0) return []
      debugger
    if (m === 1) return group.slice(startIndex, endIndex).map(item => [item]) 
      debugger
    if (endIndex - startIndex + 1 === m) {
      debugger
      return [group.slice(startIndex, endIndex)]
    } 

    const results = []

    for (let i = startIndex, len = group.length; i < len; i ++) {
      debugger
      results.concat(
        backtrace(startIndex + 1, len - 1, m - 1).map(item => results.push([group[startIndex], ...item]))
      )
      debugger
    }

    return results

  }

  backtrace(0, len - 1, k)
  return results
}

const n = 4, k = 2

console.log(
  combine(n, k)
)

