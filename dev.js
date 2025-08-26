const express = require("express");
const path = require("path");
const { spawn } = require("child_process");

process.stdout.setDefaultEncoding("utf8");

const app = express();

app.use(express.static(path.join("./"))); // 提供node本地静态服务

app.listen(3000, () => {
  import("open").then(async ({ default: open }) => {
    try {
      let tsclog = spawn("tsc", ["--watch"]);

      tsclog.stdout.on("data", function (data) {
        console.log(data.toString());
        console.log(
          "服务已经启动 http://localhost:3000/，自动打开浏览器，请手动修改index.html"
        );
      });

      tsclog.stdout.on("error", function (data) {
        console.log("出现错误");
      });

      await open("http://localhost:3000/");
    } catch (err) {
      console.log("出现错误");
      console.log(err);
    }
  });
});
