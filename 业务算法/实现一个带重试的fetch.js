function fetchRequest(url, duration) {
  return new Promise((resolve, reject) => {
    console.log(`${url}请求发送 =>`);
    setTimeout(() => {
      console.log(`${url}请求返回 <=`);
      reject("错误信息");
      // resolve("成功信息");
    }, duration);
  }, duration);
}

class FetchWithRetry {
  constructor(tryCount = 6) {
    this.tryCount = tryCount;
  }
  request(url, reducetryCount = this.tryCount) {
    return fetchRequest(url)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.warn("请求失败，开始重试");
        if (reducetryCount > 1) {
          // 如果现在还有剩余重试
          return this.request(url, --reducetryCount);
        } else {
          // 如果没有了，就直接抛出错误给业务层
          return new Error(err);
        }
      });
  }
}

const fetchWithRetry = new FetchWithRetry();

fetchWithRetry
  .request("url1")
  .then((res) => {
    console.log("请求成功", res);
  })
  .catch((err) => {
    console.error("重试失败", err);
  });
