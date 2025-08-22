/**
 * 看到判断匹配的问题就非常适合用栈。
 */
var isValid = function (s) {
  if (s.length <= 1) return false;

  const stack = [];

  const isMatch = (a, b) => {
    return (
      (a === "(" && b === ")") ||
      (a === "{" && b === "}") ||
      (a === "[" && b === "]")
    );
  };

  for (let i = 0, len = s.length; i < len; i++) {
    if (["(", "{", "["].includes(s[i])) {
      stack.push(s[i]);
      continue;
    }
    if (isMatch(stack[stack.length - 1], s[i])) {
      stack.pop();
    } else {
      return false;
    }
  }

  return stack.length === 0;
};
