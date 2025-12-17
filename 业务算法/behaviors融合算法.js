/**假如只考虑合并，不考虑策略模式 */

// {
//   a: 'a1'
//   c: 'c1'
//   d: {
//     d1: 'd1'
//   }
// }

// {
//   a: 'a2'
//   b: 'b2'
//   d: {
//     d2: 'd2'
//   }
// }

// {
//   a: 'a2',
//   b: 'b2',
//   c: 'c1',
//   d: {
//     d1: 'd1',
//     d2: 'd2'
//   }
// }

function isPlainObj(val) {
  return val.toString() === "[object Object]";
}

function isNotEmpty(val) {
  return val !== undefined && val !== null;
}

function strategay(prop, prev, curr) {
  let strateRes = null;

  const mergeObj = (origin, target) => {
    let result = {};

    if (!isNotEmpty(target)) {
      // 如果origin有data，target上压根没有data，则直接返回origin的data
      result = origin;
      return result;
    }

    Object.keys(origin).forEach((key) => {
      if (!isNotEmpty(target?.[key])) {
        // prev有，curr没有的key，保留prev
        result[key] = origin[key];
      }
      if (isNotEmpty(target[key])) {
        // prev和curr都有，根据情况判断
        if (isPlainObj(origin[key]) && isPlainObj(target[key])) {
          // prev[key]和curr[key]都是对象，则进行对象的融合
          result[key] = mergeObj(origin[key], target[key]);
        } else {
          result[key] = target[key];
        }
      }
    });

    Object.keys(target).forEach((key) => {
      if (!isNotEmpty(origin[key])) {
        // curr上有，prev上没有
        result[key] = target[key];
      }
    });

    return result;
  };

  switch (prop) {
    case "data": {
      strateRes = mergeObj(prev[prop], curr[prop]);
      break;
    }
    case "lifecycle": {
      strateRes = function (...args) {
        prev[prop](...args);
        curr[prop](...args);
      };
      break;
    }
    default: {
      strateRes = curr[prop] ?? prev[prop];
    }
  }

  return strateRes;
}
/**
 * 这个就相当于是xmpage函数
 */
function mergeBehaviors(options) {
  let behaviors = options.behaviors;

  if (!Array.isArray(options.behaviors) || options.behaviors.length <= 0) {
    // 如果当前option没有behaviors，那么就不用处理behaviors融合
    return options;
  }

  let result = {};
  let behaviorsMergedResult = {};

  // 把behaviors中的所有子behavior的嵌套behavior都完成深度合并，得到无嵌套的结果
  behaviors = behaviors.map((behavior) => {
    return mergeBehaviors(behavior);
  });

  // 通过策略模式进行整体合并
  const strategayMergeWhole = (prev, curr) => {
    let result = {};

    // 先遍历prev
    Object.keys(prev).forEach((key) => {
      result[key] = strategay(key, prev, curr);
    });

    // 再遍历curr
    Object.keys(curr).forEach((key) => {
      if (!isNotEmpty(prev[key])) {
        result[key] = curr[key];
      }
    });

    return result;
  };

  // 合并所有子behavior，此时已经没有嵌套
  behaviorsMergedResult = behaviors.reduce(
    // 这里应用策略模式即可
    strategayMergeWhole,
    {}
  );

  // 当前的option和所有子behavior合并的整体结果最终合并
  // result = { ...behaviorsMergedResult, ...options };
  result = strategayMergeWhole(behaviorsMergedResult, options);

  delete result.behaviors;

  return result;
}

const opt1_1 = {
  name: "opt1_1",
  method1: () => console.log("method1.1"),
  prop1: "prop1_1",
  opt1_1: "opt1_1",
  opt1_2: "opt1_1", // 注意，这里和opt1_2中的重名，结果应该取opt1_2的
  lifecycle() {
    console.log("opt1_1");
  },
};

const opt1_2 = {
  name: "opt1_2",
  method1: () => console.log("method1.2"),
  prop1: "prop1_2",
  opt1_2: "opt1_2",
  lifecycle() {
    console.log("opt1_2");
  },
};

const opt1 = {
  behaviors: [opt1_1, opt1_2],
  data: {
    arr: [1, 2, 3],
    text: "text1",
    obj: {
      innerObj: {
        name: "FDirector",
        sex: "male",
        age: 27,
      },
      inner1: "inner1",
      inner: "inner-from1",
    },
  },
  name: "opt1",
  method1: () => console.log("method1"),
  prop1: "prop1",
  lifecycle() {
    console.log("opt1");
  },
};

const opt2_1 = {
  name: "opt2_1",
  method2: () => console.log("method2.1"),
  prop2: "prop2_1",
  opt1_1: "opt2_1", // 注意，这里和opt1_1中的重名，结果应该取opt2_1的
  lifecycle() {
    console.log("opt2_1");
  },
};

const opt2 = {
  behaviors: [opt2_1],
  data: {
    arr: [4, 5, 6],
    text: "text2",
    obj: {
      inner2: "inner2",
      inner: "inner-from2",
      innerObj: {
        name: "Fangxiangming",
        sex: "male",
        age: 28,
      },
    },
  },
  name: "opt2",
  method2: () => console.log("method2"),
  prop2: "prop2",
  lifecycle() {
    console.log("opt2");
  },
};

const opt = {
  behaviors: [opt1, opt2],
  name: "opt",
  method: () => console.log("opt"),
  prop: "prop",
  lifecycle() {
    console.log("opt");
  },
};

let compOption = mergeBehaviors(opt);

console.log(compOption);

// 预期答案
// {
//     "name": "opt",
//     "prop1": "prop1",
//     "opt1_1": "opt2_1",
//     "opt1_2": "opt1_2",
//     "prop2": "prop2",
//     "prop": "prop"
// }
