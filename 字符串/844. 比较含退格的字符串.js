var backspaceCompare = function(s, t) {
  if (s === t) return true

  function backHandledStr(str) {
    const curr = []
    for (let i = 0, len = str.length; i < len; i ++) {
      if (str[i] !== '#') {
        curr.push(str[i])
      } else {
        curr.pop()
      }
    }
    return curr.join('')
  }

  return backHandledStr(s) === backHandledStr(t)
};