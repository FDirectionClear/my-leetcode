/**
 * from: 美团1面
 * 题目：假设有10个ajax请求，每个请求返回的时间必然是不固定的，但是请求的顺序是固定的
 * 要求：先请求的结果先打印，即使后请求的比先请求的提前返回，也要等先请求的打印完成后才能打印。
 */

function mockPost(url, res, duration = Math.random() * 1500) {
  return new Promise((resolve) => {
    console.log(`${url}请求开始 =>`);
    setTimeout(() => {
      console.log(`${url}请求返回 <=`, res); 
      resolve(res);
    }, duration);
  });
}

class ResByOrderReqeust {
  constructor() {
    this.resQueue = []; // 响应的config
    this.waitingOrder = 1; // 等待的order
    this.requestOrder = 0; // 最新请求的序号
  }

  request(url, duration) {
    const requestConfig = {
      url,
      order: ++this.requestOrder,
    };

    mockPost(url, requestConfig, duration).then(this.scheduleRes.bind(this));
  }

  // 用于调度响应情况
  scheduleRes(res) {
    const { order } = res;

    if (order === this.waitingOrder) {
      // 如果当前返回的order是正在等待的Order，那么直接打印
      console.log(`第${order}个请求打印`, res);
      this.findRes(order + 1); // 在已经返回的请求中找
    } else {
      this.resQueue.push(res); // 如果不是就直接推入队列等待
    }
  }

  findRes(targetOrder) {
    const targetIndex = this.resQueue.findIndex(
      (item) => item.order === targetOrder
    ); // 找到当前目标请求的索引

    if (targetIndex !== -1) {
      // 如果说能找到
      console.log(
        `第${this.resQueue[targetIndex].order}个请求打印`,
        this.resQueue[targetIndex]
      );
      this.findRes(targetOrder + 1); // 递归找下一个
    } else {
      // 如果找不到，说明目标还没返回，登记该目标，等下次出现该目标就直接打印
      this.waitingOrder++;
    }
  }
}

const requestInstance = new ResByOrderReqeust();

requestInstance.request("url1");
requestInstance.request("url2");
requestInstance.request("url3");
requestInstance.request("url4");
requestInstance.request("url5");
