---
calendar_date: 2024-04-17
catalog: true
categories:
- 前端三剑客入门笔记
cover:
  image: /cover/cover18.jpeg
date: 2024-04-17 09:31:23
lang: cn
mathjax: false
subtitle: null
tags:
- Web
- JS
thumbnail: /img/header_img/lml_bg1.jpg
title: LearnWeb18-JS03-事件
toc: true
---

> [!summary]+
> web-js 中主要的编程方式就是需要结合browser 的事件和属性来实现对页面的动态控制，事件章节可以说是web 动态编程中的核心部分了，了解主要存在和需要被控制的事件是相当重要的。

## 常见的浏览器事件

下面列出一些常见的事件类型和具体事件，更多的事件可以[参考Mdn](https://developer.mozilla.org/zh-CN/docs/Web/Events)，在设计页面的时候可以考虑我们希望获得什么效果来找寻是否有对应的事件来构建对应的动态响应。

| 事件类型      | 具体事件                           |
| --------- | ------------------------------ |
| **鼠标事件**  | 点击、选择、悬停、拖拽、滚轮、焦点(focus, blur) |
| **键盘事件**  | 按键、剪切板、文本输入                    |
| **窗口事件**  | 调整大小、窗口关闭                      |
| **页面事件**  | 加载结束、错误发生、CSS 变换、DOM 事件        |
| **自定义事件** | 点击按钮，表单提交                      |
| **多媒体事件** | 视频播放、暂停、结束                     |

在确定了事件之后，就需要对事件附加一个**事件处理器（监听器）**，当事件触发的时候，运行指定的js 代码对该事件做出相应。

## 事件处理器 

> [!summary]+
> 通常而言，我们使用特定的 `element` 调用 `addEventListener(event, function)` 添加一个事件监听器，当参数中指定的事件 `event` 在对应元素上发生，就调用对应的 `function` 执行相应的变动，如果不是通用的函数，这里经常可以看到使用匿名函数去定义对应的操作。

### 添加事件处理器 

因此对于一个事件而言，实际上包含的操作有以下的几个：找到 DOM 中要操作的对应元素、添加事件监听器、选择对应的事件、定义对应的操作函数；

```js
const btn = document.querySelector("button");
```

```js
function random(number) {
  return Math.floor(Math.random() * (number + 1));
}

function changeBackground() {
  const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
  document.body.style.backgroundColor = rndCol;
}
```

```js
btn.addEventListener("click", changeBackground);
```

可以为同一个事件设置多个处理器，也就是添加多个 function，对于添加事件来说其中 `addEventListener` 是最为通用的，可以绑定多种事件，不过除了 `addEventListener` 之外，还有一些特殊事件的添加监听的方法，例如 click 事件有一个内联的监听器：`onclick`。

```js
btn.onlick = changeBackground;
```

虽然有一些示例在 html 中绑定事件内联，但是最好还是分开在 js 中绑定更好。



### 移除监听器

如果使用 `addEventListener` 添加了一个事件处理器，可以使用 `removeEventListener(event, function)` 方法将该监听器删除，同样要使用对应的 `element` ，`event`，`function`。

也可以对元素调用 `abort` 移除与该元素相关的所有事件处理器：

```js
element.abort();
```

### 事件对象

有时候在事件处理函数内部，有时候会看到一些固定名称的参数，例如 `event`，`evt`，`e` 这些是事件对象，它会自动传递给事件处理函数。

```js
const btn = document.querySelector("button");

function random(number) {
  return Math.floor(Math.random() * (number + 1));
}

function bgChange(e) {
  const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
  e.target.style.backgroundColor = rndCol;
  console.log(e);
}

btn.addEventListener("click", bgChange);
```

例如上文中的 `e` 指的是事件对象，`e.target` 指的是这个按钮本身，类似的大多数事件对象都会有一些额外的属性和方法可供使用，这个可以参考 [event-object](https://developer.mozilla.org/zh-CN/docs/Web/API/Event)，找到对应 event 的事件对象的属性。

### 阻止默认行为

最常见的是 web 表单，当用户输入的内容不符合 format 的时候，我们希望直接阻止默认提交行为，不将其提交到服务器去处理。

```js
form.addEventListener("submit", (e) => {
  if (fname.value === "" || lname.value === "") {
    e.preventDefault();
    para.textContent = "You need to fill in both names!";
  }
});
```

## 事件行为/传播逻辑

### 事件冒泡

```html
<div id="container">
  <button>点我！</button>
</div>
```

以上述 DOM 为例，当我们点击 btn 的时候，btn、div、body 会依次冒泡触发 click 事件；

这种冒泡有时候会因为函数之间的冲突导致一些不希望出现的问题，这种时候我们可以对事件传递一个**阻止冒泡**的元素方法 `stopPropagation`，防止其继续向父级冒泡。

```js
video.addEventListener("click", (event) => {
  event.stopPropagation();
  video.play();
});
```


### 事件捕获

事件传播的另一种形式是事件捕获，这个就像事件冒泡，但是顺序是相反的，也就是从最外层逐渐到最里层的形式，但是需要在 `addEventListener()` 的 `capture` 选项中启用它，这样的顺序就会是完全相反的。

```js
const output = document.querySelector("#output");
function handleClick(e) {
  output.textContent += `你在 ${e.currentTarget.tagName} 元素上进行了点击\n`;
}

const container = document.querySelector("#container");
const button = document.querySelector("button");

document.body.addEventListener("click", handleClick, { capture: true });
container.addEventListener("click", handleClick, { capture: true });
button.addEventListener("click", handleClick);

```

例如上面的这串代码，有capture 和没有的顺序是完全相反的。

### 事件委托

上述的事件冒泡和事件捕获的一个应用，例如，我们将页面划分成n 个区域，希望每个区域都支持在点击后随机设置其背景颜色，

```html
<div id="container">
  <div class="tile"></div>
  <div class="tile"></div>
  <div class="tile"></div>
  <div class="tile"></div>
</div>
```

但我们显然不希望对每个子元素都进行一次绑定，尤其是子元素的数量多起来以后，因此，更简单的是我们对父元素设置事件处理器，然后基于事件冒泡来确认用户点击每个区域时函数被执行。

```js
function random(number) {
  return Math.floor(Math.random() * number);
}

function bgChange() {
  const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
  return rndCol;
}

const container = document.querySelector("#container");

container.addEventListener("click", (event) => {
  event.target.style.backgroundColor = bgChange();
});

```

> **备注：** 在这个例子中，我们使用 `event.target` 来获取事件的目标元素（也就是最里面的元素）。如果我们想访问处理这个事件的元素（在这个例子中是容器），我们可以使用 `event.currentTarget`。

可以去这里 [link](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Building_blocks/Events#%E4%BA%8B%E4%BB%B6%E5%AF%B9%E8%B1%A1) 查看对应效果，理解以下这个事件是怎么发生的，其实最关键的是 [target 和currentTarget 的区分](https://juejin.cn/post/6844903506399199246)，简单的讲：

- target 是实际触发事件的元素
- currentTarget 始终是绑定监听器的元素。

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20240425005404.png)