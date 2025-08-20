class ProxySandbox {
  constructor() {
    const fakeWindow = {};
    this.sandboxProxy = new Proxy(fakeWindow, {
      set(target, key, value) {
        target[key] = value;
      },
      get(target, key) {
        if (target[key] !== undefined) {
          return target[key];
        }
        return window[key];
      },
    });
    this.proxy = sandboxProxy; // 不active直接使用就相当于active
  }

  active() {
    this.proxy = this.sandboxProxy;
  }

  inactive() {
    this.proxy = window;
  }
}
