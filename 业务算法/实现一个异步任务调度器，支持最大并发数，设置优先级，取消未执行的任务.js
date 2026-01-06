/**
 * 实现一个异步任务调度器，支持最大并发数、设置优先级、取消未执行的任务
 */

class AsyncTaskScheduler {
  /**
   * 构造函数
   * @param {number} maxConcurrent - 最大并发任务数，默认值：3
   */
  constructor(maxConcurrent = 3) {
    this.taskQueue = []; // 待执行的任务队列，config队列
    this.currentCount = 0; // 当前正在并发的任务数
    this.maxConcurrent = maxConcurrent;
  }

  /**
   * 添加异步任务到调度器
   * @param {() => Promise<any>} taskFn - 返回Promise的异步函数
   * @param {number} options.priority - 任务优先级（数字越大优先级越高），默认值：0
   * @param {string} options.id - 任务唯一标识
   */
  addTask(taskFn, options = {}) {
    const { id, priority = 0 } = options;
    const taskConfig = {
      id,
      taskFn,
      priority,
    };
    this.taskQueue.push(taskConfig);
    this.taskQueue.sort((a, b) => b.priority - a.priority); // 根据优先级从大到小排列
    console.log("排序结果", [...this.taskQueue]);
    this._scheduler();
  }

  /**
   * 取消指定任务
   * @param {string} taskId - 任务ID
   * @returns {boolean} 是否取消成功
   */
  cancelTask(taskId) {
    try {
      let index = this.taskQueue.findIndex(
        (taskConfig) => taskConfig.id === taskId
      );

      if (index !== -1) {
        this.taskQueue.splice(index, 1); // 删除当前id对应的任务config
        return true;
      }
    } catch {
      // 如果逻辑执行出错也返回false
      return false;
    }

    // 删除不存在的任务也是false
    return false;
  }

  /**
   * 获取调度器状态
   * @returns {Object} 状态对象
   */
  getStatus() {
    return {
      currentCount: this.currentCount, // 返回当前正在并发的数量
      tasks: this.taskQueue, // 当前还未执行的任务
    };
  }

  /**
   * 清空所有等待中的任务
   * @returns {number} 被取消的任务数量
   */
  clearPendingTasks() {
    const cancelCount = this.taskQueue.length;
    this.taskQueue = [];

    return cancelCount;
  }

  /**
   * 内置的任务调度器
   */
  _scheduler() {
    if (this.currentCount >= this.maxConcurrent) return true;
    // 如果当前并发的任务数 < 最大并发数限制
    const { taskFn } = this.taskQueue.shift() ?? {};

    if (typeof taskFn === "function") {
      this.currentCount++;
      taskFn().then((res) => {
        this.currentCount--;
        // 递归进行并发
        this._scheduler();
      });
    }
  }
}

const mockAsyncTask = (id, duration = 1000) => {
  return () =>
    new Promise((resolve) => {
      console.log(`${id}.开始`);
      setTimeout(() => {
        console.log(`${id}.完成，尝试进行下一个`);
        resolve(`${id}.完成，尝试进行下一个`);
      }, duration);
    });
};

const queue = Array.from({ length: 10 }, (_, index) =>
  mockAsyncTask(index + 1)
);

const asyncTaskScheduler = new AsyncTaskScheduler(3);

// 上来先尝试并发10个
queue.forEach((taskFn, index) => {
  asyncTaskScheduler.addTask(taskFn, { id: index + 1, priority: 1 });
});

// 1s后删除某个任务
setTimeout(() => {
  console.log("删除1任务10");
  asyncTaskScheduler.cancelTask(10);
}, 2000);

// 2s添加两个
setTimeout(() => {
  console.log("添加两个任务");
  asyncTaskScheduler.addTask(mockAsyncTask(11), { id: 11, priority: 1 });
  asyncTaskScheduler.addTask(mockAsyncTask(12), { id: 12, priority: 10 });
}, 2000);
