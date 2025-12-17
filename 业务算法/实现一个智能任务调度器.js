// 一、题目背景
// 我们需要一个任务调度器，能够智能地管理异步任务的执行，支持并发控制、优先级和任务依赖。

// 二、核心需求
// 添加任务：addTask(task, options)，任务格式：{id, fn, priority, dependencies}

// 并发控制：支持设置最大并发数

// 优先级：高优先级任务优先执行

// 任务依赖：任务可以依赖其他任务，被依赖的任务必须先完成

// 执行控制：支持开始、暂停、继续、重置

// 三、示例用法
// const scheduler = new SmartScheduler({ concurrency: 2 });

// // 添加任务
// scheduler.addTask({
//   id: 'task1',
//   fn: () => delay(1000).then(() => console.log('Task 1')),
//   priority: 1
// });

// scheduler.addTask({
//   id: 'task2',
//   fn: () => delay(500).then(() => console.log('Task 2')),
//   priority: 2,  // 更高优先级
//   dependencies: ['task1']  // 依赖 task1
// });

// scheduler.addTask({
//   id: 'task3',
//   fn: () => delay(800).then(() => console.log('Task 3')),
//   priority: 1
// });

// scheduler.start();

// // 输出顺序应该是：
// // Task 1 (task2 在等待 task1 完成)
// // Task 2 (高优先级，即使 task3 先加入)
// // Task 3
// 四、考察点
// 图算法：任务依赖构成DAG，需要拓扑排序

// 优先级队列：按优先级调度任务

// 并发控制：限制同时执行的任务数

// 状态管理：任务状态（pending、running、completed、failed）

// 错误处理：任务失败时的处理策略

// 五、进阶功能
// 任务重试：失败任务自动重试

// 超时控制：任务执行超时处理

// 进度回调：执行进度通知

// 任务取消：取消尚未开始的任务
