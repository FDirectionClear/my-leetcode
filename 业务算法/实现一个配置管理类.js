function isReferenceObj(val) {
  // 只考虑对象类型
  return Object.toString.call(val) === "[object Object]";
}

class CreateConfigManager {
  constructor(initial, onChange) {
    this.initial = initial;
    this.onChange = typeof onChange === "function" ? onChange : (v) => v;
  }
  // 非递归版本
  // set(path, value) {
  //   const pathSplited = path.split("."); // 路径拆分成数组
  //   let target = this.initial;

  //   for (singlePath of pathSplited) {
  //     if (target[singlePath] === undefined) {
  //       // 如果设置的路径发现不存在，需要报错
  //       throw new Error("当前路径错误");
  //     }
  //     if (isReferenceObj(target[singlePath])) {
  //       // 如果是引用类型的对象则继续寻找下层路径
  //       target = target[singlePath];
  //     }
  //     // 寻址途中发现是一个基本类型，那么保持上层target不变
  //   }
  //   target[singlePath] = value;
  // }

  // 递归版本
  set(path, value) {
    this.setValueToObject(this.initial, path, value);
  }

  setValueToObject(obj, path, value) {
    const currPath = [...path].shift();
    const target = obj[currPath];

    if (!isReferenceObj(target) && path.length > 1) {
      // 如果当前已经是基本类型，并且后续还有路径，那么直接报错
      throw new Error("当前路径错误");
    } else if (!isReferenceObj(target)) {
      // 如果是基本类型的，直接设置，并且终止递归
      obj[currPath] = value;

      return obj[currPath];
    } else {
      // 如果是引用类型的，继续递归进行设置
      setValueToObject(obj[currPath], path, value);
    }
  }
}

const initial = {
  theme: "light",
  lang: "en",
  outer: {
    inner: {
      innerProp: "innerProp",
    },
  },
};

const configManage = new CreateConfigManager(initial, (cfg) => {
  console.log(log.push(`onChange: ${cfg.v}`));
});
