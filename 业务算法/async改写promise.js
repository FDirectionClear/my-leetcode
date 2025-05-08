async function async1() {
  console.log("async1");
  const res = await async2();
  console.log("async1 end");
  return 1;
}

async function async2() {
  console.log("async2");
  const res = await async3();
  console.log("async2 end");
  return 2;
}

async function async3() {
  console.log("async3 end");
  return 3;
}

async1();
console.log("window1");

// 改写async1
function async1() {
  return new Promise((resolve) => {
    console.log("async1");
    async2().then((res) => {
      console.log("async1 end");
    });
    resolve(1);
  });
}
