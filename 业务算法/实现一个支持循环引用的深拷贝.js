/**
 * 这个问题已经被考察过两次了，百度1面、字节飞书1面
 * 思路：
 * - 就是对copy过的对象进行map收集，以原对象为key，值为copy过后的结果。
 * - 每次在深拷贝之前，都判断一下当前这个key是否已经被深拷贝过，如果存在，就直接拿出之前拷贝的结果。
 */

let map = new WeakMap();

function deepCloneWithCycle(obj) {
  // 如果传入的是null或undefined，直接返回
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // 如果对象已经在map中存在，则直接返回对应的拷贝对象
  if (map.has(obj)) {
    return map.get(obj);
  }

  // 根据obj的类型创建一个新的对象或数组
  const copy = Array.isArray(obj) ? [] : {};

  // 将新对象存入map中，注意此时是存了一个空壳，里面还没有开始拷贝内容
  map.set(obj, copy);

  // 递归拷贝对象的每一个属性或数组元素
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepCloneWithCycle(obj[key], map);
    }
  }

  return copy;
}

// 示例
const original = { a: 1 };
original.b = original; // 创建循环引用

const cloned = deepCloneWithCycle(original);

console.log(cloned.a); // 输出: 1
console.log(cloned.b === cloned); // 输出: true，说明循环引用被正确处理
console.log(cloned !== original); // 输出: true，说明是深拷贝，不是原对象
