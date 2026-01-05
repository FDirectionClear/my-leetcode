// 凭空简单构思一个可能得思路模式，不用想的特别清楚，可行即可。不用考虑边界条件
// 在草纸上结合可能性的思路进行推演和丰富情况，记录边界条件
// 然后开始写代码，不用一次性想清楚要写什么。

// 写代码的注意事项：
// 一定要顺着思路来，写代码的过程中可能会遇到当前逻辑已经知道要写的内容，但是我们还是要根据最开始的构思来写逻辑流，
// 逻辑流可以是横着的，也可以是竖着的，也可以是横竖混合的，但无论如何，都要按照自己思维的逻辑流来，不然容易乱

const flatten = [
  {
    id: "A",
    pid: "",
    children: [],
  },
  {
    id: "C",
    pid: "B",
    children: [],
  },
  {
    id: "D",
    pid: "B",
    children: [],
  },
  {
    id: "B",
    pid: "A",
    children: [],
  },
];

// A pid 空，推入handled
// handled = [A]
// res = [A]

// C pid B，res中无B
// waiting = [C]

// D pid B, handle中无B
// waitiong = [C, B]

// B pid A，handle中有A
// A挂在到B，[A.B]
// handled = [A, B]

// 遍历waiting=[C,D]
// handled中有B，C推入handled=[ABC]

function flattenTreeRecover(flatten) {
  const res = [];
  const handled = [];
  const waitingHandled = [];

  const nodeToParent = (currNode) => {
    const parentNode = handled.find((node) => node.id === currNode.pid); // 找到当前节点的父节点

    if (parentNode) {
      // 如果当前节点的父节点已经得到挂载，直接挂载上去
      parentNode.children.push(currNode);
      handled.push(currNode);
    }

    if (!parentNode) {
      // 如果当前节点的父节点已经还未得到挂载，推入处理队列的末尾
      waitingHandled.push(currNode);
    }
  };

  for (let i = 0, len = flatten.length; i < len; i++) {
    const currNode = flatten[i];

    if (currNode.pid === "") {
      // 📝 说明当前是根节点
      res.push(currNode);
      handled.push(currNode);
      continue;
    }

    nodeToParent(currNode);
  }

  while (waitingHandled.length) {
    // 循环不断处理waiting，直到清空所有等待处理队列
    const currNode = waitingHandled.shift(); // 队头出一个还未处理的
    nodeToParent(currNode);
  }

  return res;
}

// console.log(flattenTreeRecover(flatten));

/**
 * （推荐）不用handled队列
 */
function flattenTreeRecover(flatten) {
  const flattenCloned = [...flatten];
  const result = [];

  const findChildNode = (parent) => {
    const stack = [];

    for (let i = 0; i < flattenCloned.length; i++) {
      const node = flattenCloned[i];

      if (
        (parent === null && node.pid === "") ||
        (parent !== null && node.pid === parent.id)
      ) {
        // 如果当前节点的pid和当前要处理的id一致，说明当前节点是子节点
        parent !== null ? parent.children.push(node) : result.push(node);
        flattenCloned.splice(i, 1);
        i--;
        stack.push(node);
      }
    }

    stack.forEach((node) => {
      findChildNode(node);
    });
  };

  findChildNode(null);

  return result;
}

console.log(flattenTreeRecover(flatten));
