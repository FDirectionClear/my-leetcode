function throttle(fn, duration = 1000) {
  let timer = null;

  return function (...args) {
    if (!timer) {
      fn.apply(this, args); // 立即执行
      timer = setTimeout(() => {
        timer = null;
      }, duration);
    }
  };
}

function debounce(fn, immediate = false, duration = 1000) {
  let timer = null;

  return function (...args) {
    if (!immediate) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = null;
      }, duration);
    } else {
      // 立即执行版本
      if (!timer) {
        fn.apply(this, args);
      }
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
      }, duration);
    }
  };
}

const throttledFn = throttle(() => {
  console.log("输出");
}, 1000); // 设置节流间隔为1000ms

const debouncedFn = debounce(
  () => {
    console.log("输出");
  },
  true,
  1000
);

// setInterval(() => {
//   throttledFn(); // 每次都调用同一个函数实例
// }, 100);

let count = 0;

let interval = setInterval(() => {
  if (count > 6) {
    clearInterval(interval);
  }
  count++;
  debouncedFn();
}, 200);

// 3000s后再次触发
setTimeout(() => {
  debouncedFn();
}, 3000);
