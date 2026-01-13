/**
 * 请实现一个LRUCache（最近最少使用）缓存类，它需要支持get(key)和put(key, value)两个方法，并在初始化时可以指定缓存的容量capacity。当缓存容量满时，再执行put操作需要先将最近最少使用的数据淘汰出去。
 *
 */

class LRUCache {
  constructor(capacity = 10) {
    this.cacheQueue = [];
    this.capacity = capacity;
  }
  put(key, value) {
    const cacheItem = {
      key,
      value,
      useCount: 0, // 已经使用的数量
      latestUseTemp: Date.now(), // 最后一次使用时间，光推入也算是
    };

    const target = this.cacheQueue.find((item) => item.key === key);

    if (target) {
      // 如果能找到，直接原地替换
      target.value = value;
      target.latestUseTemp = Date.now();
      return true;
    }

    if (this.cacheQueue.length < this.capacity) {
      // 如果还没满，直接推入队列中
      this.cacheQueue.push(cacheItem);
    } else {
      // 如果已经满了，先排序，然后剔除队头
      this.cacheQueue.sort((a, b) => {
        if (a.useCount !== b.useCount) {
          return a.useCount - b.useCount; // 优先使用次数
        } else {
          /**
           * 经过调试，当put一连串执行的时候执行速度会过快，导致一连串的put可能时间戳是相同的，
           * 此时可以使用更精准的时间戳 performance.now()
           */
          return a.latestUseTemp - b.latestUseTemp; // 使用次数相同，优先更新时间最近
        }
      });

      this.cacheQueue.shift(); // 剔除队头
      this.cacheQueue.push(cacheItem);
    }

    return true;
  }

  get(key) {
    const targetIndex = this.cacheQueue.findIndex((item) => item.key === key);

    if (targetIndex !== -1) {
      // 当前缓存中存在
      const target = this.cacheQueue[targetIndex];

      target.useCount++;
      target.latestUseTemp = Date.now();

      return this.cacheQueue[targetIndex].value;
    } else {
      return null;
    }
  }
}

const lru = new LRUCache(5);

const timeDump = 10;
let duration = 10;

setTimeout(() => {
  lru.put(1, 1);
}, duration);
duration = duration + 10;

setTimeout(() => {
  lru.put(1, 1);
}, duration);
duration = duration + 10;

setTimeout(() => {
  lru.put(2, 2);
}, duration);
duration = duration + 10;

setTimeout(() => {
  lru.put(3, 3);
}, duration);
duration = duration + 10;

setTimeout(() => {
  lru.put(4, 4);
}, duration);
duration = duration + 10;

setTimeout(() => {
  lru.put(2, 2.1);
}, duration);
duration = duration + 10;

setTimeout(() => {
  lru.put(5, 5);
}, duration);
duration = duration + 10;

setTimeout(() => {
  lru.put(6, 6);
}, duration);
duration = duration + 10;

setTimeout(() => {
  console.log(lru.get(1));
}, duration);
duration = duration + 10;

setTimeout(() => {
  console.log(lru.get(2));
}, duration);
duration = duration + 10;

setTimeout(() => {
  lru.put(7, 7);
}, duration);
duration = duration + 10;

setTimeout(() => {
  console.log(lru.cacheQueue);
}, duration);
duration = duration + 10;
