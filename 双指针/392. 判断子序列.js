var isSubsequence = function (s, t) {
  let i = 0;

  for (
    let target = 0, length = s.length, l = t.length;
    target < length;
    target++
  ) {
    if (i === l) {
      // 📝 如果s已经找净了，s中还有没找到的，说明不是
      return false;
    }
    for (; i < l; i++) {
      if (s[target] === t[i]) {
        // 如果t当前和正在找的s当前的相等
        i++;
        break;
      }
      if (i === l - 1) {
        // 📝 s如果找到最后一个依旧没有找到t当前，说明不在能找到
        return false;
      }
    }
  }

  return true;
};
