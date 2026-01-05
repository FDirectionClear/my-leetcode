/**
 * 字节抖音直播2面
 * 面试的编程题也不一定非要用纯算法的逻辑，也可以用前端常用的一些业务逻辑。
 * 比如这道题：既可以用栈，也可以用偏向业务的发布通知。
 */

const requestUrls = [
  {
    url: "url2",
    dep: "url3",
  },
  {
    url: "url2.1",
    dep: "url3",
  },
  {
    url: "url1",
    dep: "",
  },
  {
    url: "url3",
    dep: "url4",
  },
  {
    url: "url4",
    dep: "url1",
  },
];

// hasRes = ["url2.1", "url3", "url4", "url1"];
// handled = [url1, url4]

function mockPost(urlConfig, duration = Math.random() * 1000) {
  return new Promise((resolve) => {
    console.log(`${urlConfig.url}请求发送，依赖者为${urlConfig.dep}`);
    setTimeout(() => {
      resolve(urlConfig);
    }, duration);
  });
}

/**
 * 下面是用纯算法实现，相当于是匹配的场合，用的栈
 */
function requestWithDependencies(requestUrls) {
  const waitingHandled = []; // 储存的是config

  const handleResponse = (resConfig) => {
    console.log(
      `${resConfig.url} 请求返回，依赖 ${resConfig.dep} =>`,
      resConfig
    );

    const deps = waitingHandled.filter(
      (config) => config.dep === resConfig.url
    );

    deps.forEach((item) => {
      mockPost(item, 2500).then(handleResponse);
    });
  };

  for (let i = 0, len = requestUrls.length; i < len; i++) {
    // 找到无依赖的入口请求
    const currConfig = requestUrls[i];

    if (currConfig.dep === "") {
      // 如果是顶层的就先请求
      mockPost(currConfig, 2500).then(handleResponse);
    } else {
      // 如果不是就先放入等待队列
      waitingHandled.push(currConfig);
    }
  }
}

requestWithDependencies(requestUrls);

/**
 * 下面是用业务模式实现的
 */
class Dep {
  constructor() {
    this.preQueue = new Map();
    this.depMap = new Map();
  }

  on(depUrl, requestInstance) {
    if (this.depMap.has(depUrl)) {
      // 当前depUrl已经创建过订阅机制，说明依赖已经返回，直接请求
      requestInstance.request();
    } else {
      // 当前depUrl还没创建过订阅机制，用缓冲队列
      if (this.preQueue.has(depUrl)) {
        // 当前depUrl还没有缓冲队列
        const preQueue = this.preQueue.get(depUrl);
        preQueue.push(requestInstance);
      } else {
        this.preQueue.set(depUrl, [requestInstance]);
      }
    }
  }

  emit(url) {
    if (!this.depMap.has(url)) {
      this.depMap.set(url, [...(this.preQueue.get(url) ?? [])]); // 先创建
    }

    const queue = this.depMap.get(url);

    queue.forEach((instance) => {
      instance.request();
    });
  }
}

const dep = new Dep();

class DepRequest {
  constructor(config) {
    this.config = config;

    if (config.dep === "") {
      this.request();
    } else {
      // 订阅上层依赖
      dep.on(this.config.dep, this);
    }
  }

  request() {
    mockPost(this.config).then(() => {
      // 发送emit告知依赖可以发送请求
      console.log(
        `${this.config.url} 请求返回，依赖 ${this.config.dep} =>`,
        this.config
      );
      dep.emit(this.config.url);
    });
  }
}

function requestWithDependencies2(requestUrls) {
  requestUrls.forEach((config) => {
    new DepRequest(config);
  });
}

// requestWithDependencies2(requestUrls);
