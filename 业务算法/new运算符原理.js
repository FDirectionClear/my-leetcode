function newInstance(Con, ...args) {
  let obj = Object.create(null);
  obj.__proto__ = Con.prototype;
  let res = Con.apply(obj, args);
  return typeof res !== "object" ? obj : res; // 如果返回的是引用类型，则返回引用类型的原值，否则返回res
}
