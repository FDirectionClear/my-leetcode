const fakeAPI = (q) => {
  console.log("Calling API with:", q);
  return new Promise((resolve, reject) => {
    setTimeout(
      () =>
        Math.random() > 0.7 ? resolve({ data: q }) : reject("Network error"),
      200,
    );
  });
};

class Request {
  constructor(apiFn = () => Promise.resolve(), config = {}) {
    this.requestMap = new Map(); // 请求 id-{参数，返回的promise实例}
    this.config = config;
    this.apiFn =
      typeof apiFn === "function" ? apiFn : (params) => Promise.resolve(params);
  }

  request(params) {
    const requestId
    // this.requestMap.set()
    return this.apiFn(params).then(() => {})
  }
}

const request = createRequest(fakeAPI, { maxRetries: 2, cacheTime: 3000 });

// 第一次：发起请求
request({ keyword: "前端" }).then(console.log).catch(console.error);

// 1秒内再次调用：命中缓存 or 共享 pending 请求
request({ keyword: "前端" }).then(console.log);

// 4秒后调用：缓存过期，重新请求
setTimeout(() => request({ keyword: "前端" }), 4000);

// 支持取消
const ac = new AbortController();
request({ keyword: "取消我" }, ac.signal).catch((e) =>
  console.log("Canceled:", e.name),
);
ac.abort(); // 立即取消
