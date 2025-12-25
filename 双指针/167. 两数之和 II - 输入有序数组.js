var twoSum = function (numbers, target) {
  for (let i = 0, j = i + 1, len = numbers.length; i < len; i++, j = i + 1) {
    for (; j < len; j++) {
      if (numbers[i] + numbers[j] === target) {
        return [i + 1, j + 1];
      }
      if (numbers[i] + numbers[j] > target) {
        break;
      }
    }
  }

  return [];
};
