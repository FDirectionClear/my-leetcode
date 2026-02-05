function mockPost(url, duration = 1500 * Math.random()) {
  return new Promise((resolve) => {
    console.log(`${url}请求发送 =>`);
    setTimeout(() => {
      console.log(`${url}请求返回 <=`);
      resolve();
    }, duration);
  });
}

const urls = Array.from({ length: 10 }, (_, index) => `url${index}`);

function mutipleReqeust(urls, count = 6) {
  let doingCount = 0;
  urls = [...urls];

  const requestSingle = () => {
    const currUrl = urls.shift(); // 取出一个

    if (doingCount >= 6) {
      return true; // 如果正在并行的超过6个
    }

    mockPost(currUrl).then(() => {
      doingCount--;
      requestSingle();
    });

    doingCount++;

    requestSingle();
  };

  requestSingle();
}
