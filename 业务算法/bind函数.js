Function.prototype.myBind = function (target, ...prevArgs) {
  let self = this;

  bindFn.prototype = this.prototype;
  return function bindFn(...args) {
    return self.apply(this instanceof bindFn ? this : target, [
      ...prevArgs,
      ...args,
    ]);
  };
};
