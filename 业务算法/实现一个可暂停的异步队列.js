// 一、题目背景
// 在某些场景下，我们需要处理一系列任务，但希望能够控制任务的执行流程，比如在某些条件下暂停执行，然后恢复执行。这类似于视频播放器的暂停/继续功能，但是用于任务处理。

// 请实现一个 PausableAsyncQueue 类，它能够管理异步任务的执行，并支持暂停和继续功能。

// 二、核心需求
// 添加任务：能够向队列中添加异步任务（返回 Promise 的函数）

// 执行任务：队列按照先进先出的顺序执行任务

// 暂停功能：能够在任何时刻暂停队列的执行（当前正在执行的任务会完成，但后续任务不会开始）

// 继续功能：能够从暂停的地方继续执行

// 状态查询：能够获取队列的当前状态（等待中、执行中、已暂停、已完成）

// 三、示例用法
// javascript

// 复制

// 下载
// const queue = new PausableAsyncQueue();

// // 添加一些任务
// queue.addTask(() => delay(1000).then(() => console.log('Task 1 done')));
// queue.addTask(() => delay(500).then(() => console.log('Task 2 done')));
// queue.addTask(() => delay(800).then(() => console.log('Task 3 done')));

// // 开始执行
// queue.start();

// // 1.2 秒后暂停
// setTimeout(() => {
//   console.log('Pausing queue...');
//   queue.pause();

//   // 2 秒后继续
//   setTimeout(() => {
//     console.log('Resuming queue...');
//     queue.resume();
//   }, 2000);
// }, 1200);

// // 辅助函数：模拟异步操作
// function delay(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// 期望的输出顺序：

// text

// 复制

// 下载
// Task 1 done
// Pausing queue...
// (等待2秒)
// Task 2 done （因为1.2s暂停时候，test2已经进入运行状态，所以即使已经进入暂停2s的状态，task 2 done也会继续执行直到完成）
// Resuming queue...
// Task 3 done

const UNSTART = "unstart";
const RUNNING = "running";
const PAUSED = "paused";

class PausableAsyncQueue {
  constructor() {
    this.tasks = [];
    this.status = UNSTART;
  }

  addTask(task) {
    if (typeof task !== "function") return false;
    this.tasks.push(task);
  }

  _exeTask() {
    if (this.status === RUNNING) {
      const currTask = this.tasks.shift();
      currTask && Promise.resolve(currTask()).then(this._exeTask.bind(this));
    }
  }

  start() {
    if (this.status !== UNSTART) return true;
    this.status = RUNNING;
    this._exeTask();
  }

  pause() {
    this.status = PAUSED;
  }

  resume() {
    this.status = RUNNING;
    this._exeTask();
  }
}

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const queue = new PausableAsyncQueue();

// 添加一些任务
queue.addTask(() => delay(1000).then(() => console.log("Task 1 done")));
queue.addTask(() => delay(500).then(() => console.log("Task 2 done")));
queue.addTask(() => delay(800).then(() => console.log("Task 3 done")));
queue.addTask(() => delay(800).then(() => console.log("Task 4 done")));

// 开始执行
queue.start();

// 1.2 秒后暂停
setTimeout(() => {
  console.log("Pausing queue...");
  queue.pause();

  console.log("等待2秒");
  // 2 秒后继续
  setTimeout(() => {
    console.log("Resuming queue...");
    queue.resume();
  }, 2000);
}, 1200);

// 预期执行结果
