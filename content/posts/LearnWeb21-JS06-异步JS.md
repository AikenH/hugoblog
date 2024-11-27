---
title: LearnWeb21-JS06-异步JS
subtitle: 
date: 2024-05-01 06:22:33
lang: cn
toc: true
catalog: true
tags:
  - NotDone
categories: 
mathjax: false
cover:
    image: cover/cover2.jpeg # image path/url
---

>[!summary]+
> 如果页面的功能较为复杂，且涉及到了从服务端获取数据等操作，如果简单的使用同步编程，等待一个个任务按顺序执行，由于网络或者某些时间复杂度较高的操作，导致网页加载时间过长，或者使用逻辑不合理（加载某些资源的同时无法进行浏览等），因此异步编程的特性在 web 端是十分重要的。

通过**异步编程**使一个长时间运行的任务运行的同时能够对网页做出其他的操作和对其他事件做出相应，而不需等待该任务完成，以下的这些功能就是最常见需要异步完成的；

- `fetch` 发起 http 请求
- `getUserMedia()` 获取用户的摄像头和麦克风
- `showOpenFilePicker()` 请求用户选择文件以供访问。

## 基于事件处理程序实现异步

> 事件处理的逻辑实际上也是一种接近异步编程的方式，对应的函数不是即时执行，而是等事件被触发后在进行调用。一些早期的异步 API 就是这样使用事件的。

一些早期的异步 API 就是这样来使用事件，例如 `XMLHttpRequest` 可以使用 JS 向远程服务器发起 HTTP 请求，这类网络请求操作都会比较耗时，因此通常会使用异步，以下面的例子进行后续说明；

```js
const log = document.querySelector(".event-log");
document.querySelector("#xhr").addEventListener）("click", () => {
	log.textContent = "";
	const xhr  = new XMLHttpRequest();
	xhr.addEvenetLister("loadend", () => {
		log.textContent = `${log.textContent} 完成, 状态码: ${xhr.status}`;
	});
	xhr.open("GET",
	"https://URL/dir/file.json");
	xhr.send():
	log.textContent = `${log.textContent} 请求已发起\n`;
});
```

 `xhr` 按钮点击后，声明一个 `XMLHttpRequest` 对象，并监听其 `loadend` 事件，然后发送请求，并将字符串修改为请求已发起，该字符串会在触发了 `loadend` 加载完了请求事件后改为，已完成。

> 事件处理程序本身是一种特殊类型的回调函数（函数作为参数传递到另一个函数），多层回调函数的嵌套会导致代码难以理解和 debug，因此后面大多数 API 不在使用回调函数去处理异步的情况。

## Promise 现代 JS 异步编程的基础

>**Promise** 是现代 JavaScript 中异步编程的基础。它是一个由异步函数返回的对象，可以指示操作当前所处的状态。在 Promise 返回给调用者的时候，操作往往还没有完成，但 Promise 对象提供了方法来处理操作最终的成功或失败。

一个基于 `Promise` 的 API，异步函数会启动操作并直接返回一个 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 对象，可以将后续的处理函数附加到该对象上，当操作完成时（成功、失败），执行对应的处理函数。

### 以 fetch() 为例

```js
const fetchPromise = fetch(
	"https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);
console.log(fetchPromise);

fetchPromise.then((response) => {
	console.log(`已受到响应 ${response.status}`);
});

console.log("已发送请求...");
```

```console
Promise { <state>: "pending"}
```
    
 1. 调用 `fetch()` 将返回的 `promise` 存储到 `fetchPromise` 变量
 2.  `Promise` 的变量输出结果如下
 3. 将处理函数传递给 promise 变量的 then 函数，当 fetch 操作成功的时候，promise 就会调用对应的处理函数。

整体的处理逻辑还是比较清晰的，关键是使用 promise 变量的 then 函数去处理 fetch 的各种不同结果。

### 链式使用 Promise

在前面通过 fetch 获取 response 对象的时候，我们需要使用对应的 `json()` 方法将其转换为 js 专属的对象，这里的 json 实际上也是一个异步方法，由此我们可以链式的实现异步如下：

```js
const fetchPromise = fetch(
	"https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);

fetchPromisze.then((response) => {
	const jsonPromise = response.json();
	jsonPromise.then((json) => {
		console.log(json[0].name);
	});
});
```

这种情况在多层嵌套的时候也会堆叠得很难理解，但是相比于回调函数，每一级的回调都会有个 promise 的**即时返回值**来指示对应异步函数中的完成状态。

由于 `promise` 是一个**即时返回值**，因此上述的代码可以简写为：

```js
fetchPromise
	.then((response) => response.json())
	.then((data) => {
		console.log(data[0].name);
	});
```

不必在第一个 then 中调用下一个 then，可以直接返回对应的 promise 对象，对对应的 promise 对象调用处理即可，这样可以避免多级缩进叠加；

### 处理异常返回值

对 `promise` 中的状态值进行检查，如果状态码不是 ok 就需要对应的抛出错误：

```js
const fetchPromise = fetch(
	"https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);

fetchPromise
	.then((response) => {
		if(!response.ok){
			throw new Error(`HTTP 请求错误 ${response.status}`);
		}
	})
	.then((json) => {
		console.log(json[0].name);
	});
	
```

此外由于这种异步的函数返回机制，如果要按照上面的方式逐个进行错误处理非常的困难，需要在每个嵌套层中进行处理，为了避免这种麻烦，Promise 对象提供了一个 `catch()` 方法（类似 then），当调用成功时触发的是 `then` 而调用失败了就会调用 `catch` 中定义的处理函数。

将 `catch` 添加到 `Promise` 的末尾，他可以在任何异步函数失败的时候调用，下面是一个例子：

```js
const fetchPromise = fetch(
  "bad-scheme://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);

fetchPromise
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP 请求错误：${response.status}`);
    }
    return response.json();
  })
  .then((json) => {
    console.log(json[0].name);
  })
  .catch((error) => {
    console.error(`无法获取产品列表：${error}`);
  });

```

### Promise 的状态值

> 需要注意 `promise` 对应的成功和失败的含义随着 API 的不同而不同，例如 `fetch` 认为服务器返回一个错误如（404 not found）时请求成功，但如果网络错误阻止请求被发送，则认为请求失败。

| Status        |            Desc            |
| :------------ | :------------------------: |
| Pending 待定    |   还在请求中，尚未有确定的结果，也是初始状态    |
| fulfilled 已兑现 | 操作成功的标准返回，后续进入调用 then 的逻辑  |
| rejected 已拒绝  | 操作失败的标准返回，后续进入调用 catch 的逻辑 |

有时用**已敲定(settled)**来同时表示已兑现和已拒绝；如果一个 Promise 已敲定，或者他被"锁定"以跟踪另一个 Promise 的状态，那么就是**已解决(resolved)**的。

### 组式使用 Promise (合并使用)

> 当操作由多个异步函数组成，如果需要串行完成那就需要 promise 链，如果需要组合使用多个 promise，相互之间不依赖但是需要所有 promise 都实现的情况，可以考虑合并多个异步函数的使用。

使用 `Promise.all()` 接受一个 `Promise` 数组，并返回一个单一的 `Promise`，使用该操作通过合并来简化对一批 `promise` 的处理，由 `promise.all()` 返回的 `promise` 有以下的特性：

- 什么时候调用 then？当数组中所有 promise 都兑现时;
- 传入 then 的形式式什么？提供一个包含所有响应的数组，顺序与传入 all 的顺序一致;
- 什么时候拒绝/调用catch？任何一个promise 没有兑现的时候，调用 `catch`，并提供被拒绝的 promise 抛出的错误; 

```js
const fetchPromise1 = fetch(
  "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);
const fetchPromise2 = fetch(
  "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found",
);
const fetchPromise3 = fetch(
  "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json",
);
//const fetchPromise3 = fetch(
//  "bad-scheme://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json",
//);

Promise.all([fetchPromise1, fetchPromise2, fetchPromise3])
  .then((responses) => {
    for (const response of responses) {
      console.log(`${response.url}：${response.status}`);
    }
  })
  .catch((error) => {
    console.error(`获取失败：${error}`);
  });

```

### 选择使用 Promise (任一)

如果需要一组Promise 中某一个实现即可，这种时候可以使用 `promise.any()`, 任意一个被兑现时便兑现，仅当所有 Promise 被拒绝的时候才拒绝。

## async 和 await

在函数的开头添加 `async` 关键词可以使得一个函数成为一个异步函数：

```js
async function myFunction(){
	...
}
```

`await` 关键词则使得我们不再并行执行异步函数，而是在原地等待该异步函数执行完成，也就是讲异步函数当成同步函数来使用，直到其 Promise 相应彻底完成，如下可以将 fetch 改写成同步函数：

```js
async function fetchProducts() {
  try {
    // 在这一行之后，我们的函数将等待 `fetch()` 调用完成
    // 调用 `fetch()` 将返回一个“响应”或抛出一个错误
    const response = await fetch(
      "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
    );
    if (!response.ok) {
      throw new Error(`HTTP 请求错误：${response.status}`);
    }
    // 在这一行之后，我们的函数将等待 `response.json()` 的调用完成
    // `response.json()` 调用将返回 JSON 对象或抛出一个错误
    const json = await response.json();
    console.log(json[0].name);
  } catch (error) {
    console.error(`无法获取产品列表：${error}`);
  }
}

fetchProducts();
```

这个 `fetchProducts()` 还是一个异步函数，因此不能按照以下的方法调用：

```js
const promise = fetchProducts();
console.log(promise[0].name); // “promise”是一个 Promise 对象，因此这句代码无法正常工作
```

相反的，需要按照 promise 的方式去调用：

```js
const promise = fetchProducts();
promise.then((data) => console.log(data[0].name));
```

同样地，请注意你只能在 `async` 函数中使用 `await`，除非你的代码是 [JavaScript 模块](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules)。这意味着你不能在普通脚本中这样做：

你可能会在需要使用 Promise 链地方使用 `async` 函数，这也使得 Promise 的工作更加直观。

请记住，就像一个 Promise 链一样，`await` 强制异步操作以串联的方式完成。如果下一个操作的结果取决于上一个操作的结果，这是必要的，但如果不是这样，像 `Promise.all()` 这样的操作会有更好的性能。

## Promise 实战

> 前面讨论**如何使用返回** promise 的 APIs，这一节研究**如何实现返回** Promise 的 Apis，这与基于使用 promise 的 APIs 相比，是一个不太常见的任务。参考文献 [mdn如何实现基于promise的api](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Asynchronous/Implementing_a_promise-based_API) | [菜鸟教程JavaScript Promise](https://www.runoob.com/js/js-promise.html) | [廖雪峰JavaScript](https://www.liaoxuefeng.com/wiki/1022910821149312/1023024413276544)

以一个普通的回调转换为 Promise 的例子来说明：

```js
const output = document.querySelector("#output");
const button = document.querySelector("#set-alarm");

function setAlarm() {
  window.setTimeout(() => {
    output.textContent = "Wake up!";
  }, 1000);
}

button.addEventListener("click", setAlarm);
```

利用 Promise 来构造后会变成如下的实现：

```js
function alarm(person, delay) {
  return new Promise((resolve, reject) => {
    if (delay < 0) {
      throw new Error("Alarm delay must not be negative");
    }
    window.setTimeout(() => {
      resolve(`Wake up, ${person}!`);
    }, delay);
  });
}

```

该函数会创建并返回一个新的 Promise，其中需要说明的是，Promise 本身需要两个参数 resolve 和 reject，当执行成功了就会调用 resolve（类似 return），如果失败了，就会自动调用 reject，（throw error 的部分），两者都可以讲任何类型的单个参数传递，具体而言参考后续调用如下：

```js
button.addEventListener("click", () => {
  alarm(name.value, delay.value)
    .then((message) => (output.textContent = message))
    .catch((error) => (output.textContent = `Couldn't set alarm: ${error}`));
});
```

可以讲一个函数变成具备原生异步功能的 Promise？由此我们就可以对其使用 await 或者 async 来灵活的决定该 Function 要同步或者异步执行。


## Workers 页面线程简介

>[!summary]+
>[Worker](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Asynchronous/Introducing_workers)使页面能在单独执行的线程中运行一些任务，避免因为一个长期运行的同步任务使整个任务完全没有响应。

一些多线程的 Principle，避免同时访问相同的变量带来的意外等：

- 主代码和你的 worker 代码永远不能直接访问彼此的变量
- Workers 和主代码运行在完全分离的环境中，只有通过相互发送消息来进行交互
- 这意味着 workers 不能访问 DOM（窗口、文档、页面元素等等）

有三种不同类型的 workers，不过该章节只会介绍第一个，其他两个简要的讨论。

- dedicated workers
- shared workers
- service workers

以页面中的质数生成器为例，如果作为同步任务执行，在计算过程中整个页面将会卡住，按照以下的方式来讲计算交付于另一个 worker。

```js
// 在 "generate.js" 中创建一个新的 worker
const worker = new Worker("./generate.js");

// 当用户点击 "Generate primes" 时，给 worker 发送一条消息。
// 消息中的 command 属性是 "generate", 还包含另外一个属性 "quota"，即要生成的质数。
document.querySelector("#generate").addEventListener("click", () => {
  const quota = document.querySelector("#quota").value;
  worker.postMessage({
    command: "generate",
    quota: quota,
  });
});

// 当 worker 给主线程回发一条消息时，为用户更新 output 框，包含生成的质数（从 message 中获取）。
worker.addEventListener("message", (message) => {
  document.querySelector("#output").textContent =
    `Finished generating ${message.data} primes!`;
});

document.querySelector("#reload").addEventListener("click", () => {
  document.querySelector("#user-input").value =
    'Try typing in here immediately after pressing "Generate primes"';
  document.location.reload();
});

```

通过 worker.postMessage 来和对应的线程传递信息，在对应的 worker 中，可以按照以下的方式来接受和传递信息；

```js
// 监听主线程中的消息。
// 如果消息中的 command 是 "generate"，则调用 `generatePrimse()`
addEventListener("message", (message) => {
  if (message.data.command === "generate") {
    generatePrimes(message.data.quota);
  }
});

// 生成质数 (非常低效)
function generatePrimes(quota) {
  function isPrime(n) {
    for (let c = 2; c <= Math.sqrt(n); ++c) {
      if (n % c === 0) {
        return false;
      }
    }
    return true;
  }

  const primes = [];
  const maximum = 1000000;

  while (primes.length < quota) {
    const candidate = Math.floor(Math.random() * (maximum + 1));
    if (isPrime(candidate)) {
      primes.push(candidate);
    }
  }

  // 完成后给主线程发送一条包含我们生成的质数数量的消息消息。
  postMessage(primes.length);
}

```

worker 要做的第一件事情就是开始监听来自主脚本的消息。这通过使用 `addEventListener()` 实现，它在 worker 中是一个全局函数。在 `message` 事件处理器内部，事件的 `data` 属性包含一个来自主脚本的参数的副本。

>[!Note]+
>**备注：**要运行此站点，你必须运行一个本地 web 服务器，因为 file:// URLs 不允许加载 workers。参考我们的[设置一个本地测试服务器](https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/Tools_and_setup/set_up_a_local_testing_server)的指导。完成后，你应该可以点击 "Generate primes" 并且使你的主页面保持响应。 如果你在创建和运行这个样例的过程中有疑问，你可以在 [https://github.com/mdn/learning-area/blob/main/javascript/asynchronous/workers/finished](https://github.com/mdn/learning-area/blob/main/javascript/asynchronous/workers/finished) 查看完成后的版本，并且在 [https://mdn.github.io/learning-area/javascript/asynchronous/workers/finished](https://mdn.github.io/learning-area/javascript/asynchronous/workers/finished) 进行在线尝试。

我们刚刚创建的 worker 被称为 _dedicated worker_。这意味着它由一个脚本实例使用。

不过，还有其他类型的 worker：

- [`SharedWorker`](https://developer.mozilla.org/zh-CN/docs/Web/API/SharedWorker) 可以由运行在不同窗口中的多个不同脚本共享。
- [_Service worker_](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API) 的行为就像代理服务器，缓存资源以便于 web 应用程序可以在用户离线时工作。他们是[渐进式 Web 应用](https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps)的关键组件。