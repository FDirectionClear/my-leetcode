let no = 1;

function mockPost(url) {
  let noi = no;
  console.log(`${no++}. 请求发送 ${url}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`${noi} back`);
      resolve();
    }, Math.random() * 2000);
  });
}

/**
 * 方法一、方法二都行，思路都是一样的
 */
function multiRequest1(urls = [], maxNum) {
  let doingCount = 0;

  function requestSimple() {
    if (!urls.length) return;

    let curr = urls.splice(0, 1);

    doingCount++;

    mockPost(curr).then(() => {
      doingCount--;
      requestSimple();
    });

    if (doingCount < maxNum) {
      requestSimple();
    }
  }

  requestSimple();
}

function multiRequest2(urls = [], maxNum) {
  let count = 0;

  function requestSimple() {
    if (count + 1 > maxNum || !urls.length) return;
    const url = urls.pop();
    count++;
    mockPost(url).then(() => {
      count--;
      requestSimple();
    });
    requestSimple();
  }

  requestSimple();
}

const list = new Array(14)
  .fill("http")
  .map((item, index) => item + (index + 1));

// multiRequest2(list, 6)

function multiRequest(urls = [], maxNum) {
  let active = 0;
  let queue = [];
  let res = [];

  const execute = (request) => {
    active++;
    return Promise.resolve(request)
      .then((value) => {
        res.push(value);
      })
      .catch((e) => {
        res.push(e);
      })
      .finally(() => {
        active--;
        if (queue) {
          execute(queue.shift());
        }
      });
  };

  for (let i = 0; i < urls.length; i++) {
    if (active < maxNum) {
      execute(mockPost(urls[i]));
    } else {
      queue.push(mockPost(urls[i]));
    }
  }

  return res;
}

multiRequest(list, 6);
