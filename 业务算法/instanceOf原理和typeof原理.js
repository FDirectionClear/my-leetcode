function myInstanceof(left, right) {
  const target = right.prototype;
  let left = left.__proto__;

  while (left) {
    if (left === target) {
      return true;
    }
    left = left.__proto__;
  }

  return false;
}

// typeof 返回值
// string;
// number;
// boolean;
// symbol;
// object;
// function
// undefined;

// 你需要注意的是
// array => object
// null => object
