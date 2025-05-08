(function (root, factory) {
  if (typeof exports === "object" && typeof module === "object") {
    module.exports = factory();
  } else if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof define === "function" && define.cmd) {
    define(function (require, exports, module) {
      module.exports = {
        libraryName: factory(),
      };
    });
  } else {
    root[libraryName] = factory();
  }
})(this, factory);
