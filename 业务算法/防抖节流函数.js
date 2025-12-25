// 防抖
function debounce(fn, duration) {
  let timer = null;

  return (...args) => {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
    }, duration);
  };
}

// 节流
function throttle(fn, duration) {
  let timer = null;

  return function (...args) {
    if (timer === null) {
      fn.apply(this, args);
      timer = setTimeout(() => {
        clearTimeout(timer);
        timer = null;
      }, duration);
    }
  };
}
