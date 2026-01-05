var lengthOfLastWord = function (s) {
  let prevCount = 0,
    currCount = 0;

  for (let i = 0, len = s.length; i < len; i++) {
    if (s[i] === " ") {
      s?.[i - 1] !== " " && (prevCount = currCount);
      currCount = 0;
    } else {
      currCount++;
    }
  }

  return currCount || prevCount;
};
