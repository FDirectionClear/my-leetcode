class SnapshotSandbox {
  constructor() {
    this.proxy = window;
    this.windowSnapshot = {};
    this.modifiedSnapshot = {};
  }

  active() {
    Object.keys(window).forEach((key) => {
      this.windowSnapshot[key] = this.window[key];
    });
    Object.keys(this.modifiedSnapshot).forEach((key) => {
      window[key] = this.modifiedSnapshot[key];
    });
    this.modifiedSnapshot = {}; // 清空之前的修改记录
  }

  inactive() {
    Object.keys(window).forEach((key) => {
      if (window[key] !== this.windowSnapshot[key]) {
        // 记录window上新增的属性、修改的属性。window上删除的属性还没记录
        this.modifiedSnapshot[key] = window[key];
      }
    });

    Object.keys(this.windowSnapshot).forEach((key) => {
      if (this.windowSnapshot[key] !== window[key]) {
        // 新增的属性、或者修改的属性
        window[key] = this.windowSnapshot[key]; // 删除的属性还原
        this.modifiedSnapshot[key] = window[key];
      }
    });
  }
}
