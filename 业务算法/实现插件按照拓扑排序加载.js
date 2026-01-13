// 🔧 题目：实现一个支持“懒加载 + 依赖注入”的地图插件注册与执行系统
// 背景：
// 高德地图 Web SDK 支持通过插件扩展功能（如“3D 楼块”、“交通态势”、“室内地图”）。这些插件体积大、按需加载，并且可能互相依赖（例如“室内导航”依赖“室内地图”）。

const { factory } = require("typescript");

// 你需要设计一个轻量级插件管理器，满足以下要求：

// 要求：
// 实现 PluginManager 类，包含两个方法：
// register(name: string, deps: string[], factory: Function)
//    name: 插件名（唯一）
//    deps: 该插件依赖的其他插件名列表
//    factory: 工厂函数，接收依赖插件的实例作为参数，返回本插件实例（可为 Promise）
// use(name: string): Promise<any>

// 加载并返回指定插件的实例
// 自动递归加载其所有依赖（按拓扑顺序）
// 同一插件多次 use 应返回同一实例（单例）
// 插件加载过程必须：
// 懒加载：只有调用 use() 时才执行 factory
// 依赖解析：若依赖未注册，抛出错误
// 循环依赖检测：如 A → B → A，应报错
// 并发安全：多次并发 use('X') 只触发一次加载
// 不使用任何构建工具或模块系统（如 ES Module、Webpack），纯运行时逻辑。

function mockPluginLoader(pluginConfig, duration = Math.random() * 1000) {
  return new Promise((resolve) => {
    console.log(`${plugin.name}加载开始 =>`, pluginConfig);
    setTimeout(() => {
      console.log(`${plugin.name}加载完成 <=`, pluginConfig);
      resolve(pluginConfig);
    }, duration);
  });
}

class PluginManager {
  constructor() {
    this.pluginsNameDevsMap = new Map(); // 插件name-{deps: [], factory}
    this.pluginsNameInstanceMap = new Map(); // 已经加载的 插件name-插件实例
  }

  register(name, deps, factory) {
    const { pluginsNameDevsMap } = this;
    deps = [...deps]; // clone一份

    if (!pluginsNameDevsMap.has(name)) {
      pluginsNameDevsMap.set(name, { deps, factory });
    } else {
      console.warn("当前插件已经注册成功，请勿重复注册");

      return true;
    }
  }

  use(name) {
    return new Promise((resolve, reject) => {
      const { pluginsNameDevsMap, pluginsNameInstanceMap } = this;

      if (!pluginsNameDevsMap.has(name)) {
        reject(`${name}插件还没注册过！`);
        return false;
      }

      let { deps, factory } = pluginsNameDevsMap.get(name).deps;

      if (deps.length > 0) {
        const devInstances = [];
        // 如果当前有依赖，则等待前置依赖都完成再进行注册
        for (let depName of deps) {
          if (!pluginsNameDevsMap.has(depName)) {
            throw new Error(`${name}插件需要前置注册${depName}插件！`);
          }
          devInstances.push(this.use(depName));
        }
        Promise.all(devInstances).then(() => {
          let pluginRes = factory();
          // 当所有前置依赖都加载完成，就可以将当前插件实例的构造结果注册进去，此时可能是promise pending
          pluginsNameInstanceMap.set(name, Promise.resolve(pluginRes));
          pluginRes.then((pluginConfig) => resolve(pluginConfig));
        });
      } else {
        // 如果没有前置依赖，直接实例化
        pluginRes = factory();
        pluginsNameInstanceMap.set(name, Promise.resolve(pluginRes));
        pluginRes.then((pluginConfig) => resolve(pluginConfig));
      }
    });
  }
}

// 测试用例
const pm = new PluginManager();

pm.register("map", [], () => ({ name: "BaseMap", version: "1.0" }));

pm.register("traffic", ["map"], (map) => {
  console.log("Initializing traffic layer on", map.name);
  return { name: "TrafficLayer", map };
});

pm.register("navi", ["map", "traffic"], (map, traffic) => {
  return { name: "Navigation", components: [map, traffic] };
});

// 使用
pm.use("navi").then((navi) => {
  console.log(navi.name); // Navigation
});
