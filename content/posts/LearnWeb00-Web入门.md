---
calendar_date: 2024-01-28
catalog: true
categories:
- 前端三剑客入门笔记
cover:
  image: /cover/cover1.jpeg
date: 2024-01-28 21:25:30
description: null
lang: cn
mathjax: false
tags:
- Web
- HTML
- CSS
- JS
thumbnail: /img/header_img/lml_bg1.jpg
title: LearnWeb00-Web入门
toc: true
---

> [!summary]+
> Web 前端开发者路线学习，基本的目的是能够为自己想做的项目搭建前端界面，从 web 开始再到各个移动设备的前端 UI，基于 Mdn 课程，Roadmap 具体项目逐步推进对各个知识点的学习。

根据下面的课程、Roadmap、搭建自己的知识架构，在搭建过程中结合具体的项目，包括自己部署的界面去逐步实践，完善和熟悉整个知识体系和技术栈，并通过和现代 AI 辅助工具的合作，建立自己独立的前端开发流。

- [Roadmap For Beginner](https://metisy.cool/library/library/46/series/398/manga/1714?incognitoMode=false)
- [Roadmap For All](https://metisy.cool/library/library/46/series/397/pdf/1712?incognitoMode=false)
- [Mdn Web Tutor](https://developer.mozilla.org/zh-CN/docs/Learn/Front-end_web_developer)

## Be Ready 准备以及基础了解

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20240128213825.png)

- 基础：开发环境准备、页面设计、文件架构规划（由于网站需要包含多种代码、文本、素材、因此如何组织文件是相当重要的）
- 语言：HTML 、CSS、JS 三驾马车为一个网页必不可少的要素，通过结合各自不同的功能来实现多样化的页面设计。

## What's WEB

[What's WEB?](https://www.youtube.com/watch?v=O_GWbkXIqEY&list=PLo3w8EB99pqLEopnunz-dOOBJ8t-Wgt2g&index=1) 通过 URL 统一资源定位符向服务器请求 HTML，HTML 通过包含的信息告诉 Browse 需要额外的信息来呈现该页面，因此基于 HTML 提供的信息 web browser 继续请求资源、CSS、JS 等文件，并将这些文件按照 HTML 的描述进行组合最终呈现完整的页面。

 

<iframe width="560" height="315" src=" https://www.youtube.com/embed/O_GWbkXIqEY?si=4KI068N1LN2k422F" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

### How HTML Work

[How HTML(Hyper Text Markup Language) Work?](https://www.youtube.com/watch?v=PORRrz3Y8Vc&list=PLo3w8EB99pqLEopnunz-dOOBJ8t-Wgt2g&index=2) HTML 提供了一个标准（告诉 browser）用**特定标签**来描述一些纯文本，这些标签就对应特定的文本渲染方式。

> [!quota]+
> HTML is a descriptive language that allow us to tell a web browser how to handle text content. HTML 是一个描述性语言，允许告知网页浏览器如何去处理这些文本内容并进行对应的渲染。

更具体一点可以说以下面这个例子来说：

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20240131110224.png)

> [!Quota]+
> HTML 不是一门编程语言，而是一种用于定义内容结构的标记语言。HTML 由一系列的[元素](https://developer.mozilla.org/zh-CN/docs/Glossary/Element)组成，这些元素可以用来包围不同部分的内容，使其以某种方式呈现或者工作。一对[标签](https://developer.mozilla.org/zh-CN/docs/Glossary/Tag)可以为一段文字或者一张图片添加超链接，将文字设置为斜体，改变字号，等等。

**HTML 标签**：
- 用 `<>` 包裹**标签名称**这里是 p -> `<p>`，
- 可以在其之上通过更多的**属性**来提供更多的信息 `<p lang='en'>` ，这里的 lang 为**属性名称**，‘en’为**属性值**，值得一提的是 **class 属性**可以为元素提供一个**标识名称**，用于后续 css 中为元素定义各种样式。
- 将**标签和对应的结束标签**将文本段落，即**内容**，包围起来，就形成了**HTML 元素**（段落）：`<p> some text </p> `
- 通过**嵌套组合各种元素**，就可以创建一个 HTML 文档了。

基础的架构如下 ：

- `<html> </html>` 包裹文件中 HTMl 的部分（文件中可以包含其他的 css，js 等内容）
- `<!DOCTYPE html> `  <!-- 告诉 Browser 这是一个标准的 HTML 文档 -->
- 如 `head` `body` `title` 之类的元素/标签的制定由 W3C(world wide web consortium) 确定和维护，可以在 MDN web 文档中查看所有 Tag 的文档，相对基本文档更加易于理解。

```html
<!DOCTYPE html>  <!-- 告诉Browser这是一个标准的HTML文档 -->
<html>

<head>
	<title> My cat have not eat yet.
</head>

<body>
	<p> My cat is <strong>very</strong> cute </p>
</body>

</html>
```

HyperText 只是一个花哨的词语，意味着 HTML 可以创建一个到另一个 HTML 文件的连接，类似超链接，实现页面的跳转。

页面的跳转对应的为 a 元素，可以通过如下的超文本实现页面跳转功能（也就是超链接）

```html
<a herf=" https://aikenh.cn/">Homepage</a>
```

总结一下，也就是 HTML 是为了 Browser 理解文本的一种语言，通过 W3C 指定的各种标签/元素规则来理解&实现 Browser 对页面的渲染。


### How CSS work 

[What's CSS & How it Style the web pages](https://www.youtube.com/watch?v=Y02yI1OfZjI&list=PLo3w8EB99pqLEopnunz-dOOBJ8t-Wgt2g&index=3)? CSS 也是一种描述性语言，但描述的不是文本的“语义”，而是对每一种 HTML 元素的外观和感觉进行描述，例如描述 `<head>content</head>` Head,strong 这类元素应该如何呈现，就像是一种 HTML 的化妆（样式补充）

> CSS (Cascading Style Sheets) 层叠样式表

CSS 描述的是文本的 Presentation 表现形式，而 HTML 描述的是文本的 Semantics 语义（将表现从 HTML 分离出来避免最终页面代码混杂导致的混乱）。

**How it works?** 通常使用 CSS 有三种方法：

- （尽量避免，缺乏灵活性且难以维护）在 HTML 标记中使用 style 属性如 `<strong style="...">`
- （只适用于单个 HTML 文档，通常网站由多个 HTML 组成）将 CSS 声明添加到 HTML 文档中，用 `<style> </style>` 包围，上述代码中用 `<html></html>` 标签将 HTML 的代码块包裹起来就是为了和其他类型的代码区分。
- （首选）创建单独的 CSS 文件，然后在多个 HTML 中连接特定的样式表，从而维持一致的样式特征，如：

```html
<link rel="stylesheet" herf="style.css" />
```

**How to defined CSS？** Starts with selector to indicate which HTML element we want to style. Then using {} to defind all the property.

例如我们定义上述提到的 strong 和 head 的样式就可以按照下面的方式：

```css
strong {
	color: red;
	display: flex;
}

head {
	align-items: center;
	display: flex;
}
```

CSS 有 300 多个属性，可以定义任何方式的页面，最好**了解常见**的一些属性，属性的组合常常出乎你的意料，

**CSS 的另一个重要特性就是 Cascading 级联**，通过不同的 Selector（类似过滤器） 可以指定不同类型的元素进行样式处理（渲染），也就是说通过 selector 的特性，一个元素可以按照某种顺序被多种样式渲染（CSS 定义了一组规则）需要的话可以在 MDN 查看，在开发者模式中也可以看到顺序：

> 允许覆盖和组合

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20240129000141.png)

CSS 声明一种外观和渲染形式，后续通过选择器将这些 Style 应用到各个 HTML 元素上（在同个元素上可能会出现样式的覆盖或者堆叠的情况），实现对整个页面的渲染。

### How JavaScript Works

**JavsScript** is the Progamming language at the heart of the modern web.

实际上 JavaScript 可以完全分成两个不同的分支（flavors）：

1. **JaveScript inside the browser**：用于修改 HTML、网络请求、数据处理和渲染等用于Web
2. **JavaScript on the server**：(Nodejs)计算机控制和管理，进程和文件处理等，更接近一个普通的编程语言。

两者存在许多独立的有用的库，除了语法，两者在应用和实际编写上重叠的地方很少，该视频后续主要介绍的是 Browser 中的 JS 。

CSS & HTML 一样，可以
- 直接在 HTML 中使用 `<script></script>` 元素来包裹 JS 的代码块
- 独立写在一个 js 文件中，并在 html 代码中使用 `<script src="myScript.js">` 将其连接到 HTML 中

JS 和其他语言不一样的特点为，其自带**原生的异步处理机制**，可以对设定好的事件及时做出反应（触发），如下面的代码当窗口的 load 被触发了，就会执行{}中的代码，实现及时对事件做出反应。

```js
windows.addEventListener('load', () => {

})
```

这种机制对用户交互界面原生的友好，如点击，加载完成等浏览器抛出事件，然后使用 JS 及时的对特定的事件做出反应。

## What's SVG

> **Scalable Vector Graphics** is the only vector image format for the web. 可缩放的矢量图形是网络上唯一的矢量图形。

图片有两种主要的格式：位图&矢量图；位图是简单的定义每个像素点的颜色行程的图片，web 中最常见的位图格式是 JPEG，PNG，GIF。矢量图则是一组渲染图像的函数，用这些函数来定义图像。两种图像的适用范围不同：

- 位图用于更为细节的图像，如照片，具体的描述每个图片的像素点。
- 矢量图则更适用于，需要使用**不同尺寸缩放**的不太详细的图像，例如图标，因此对于 web 具备的多种分辨率场景具有无可比拟的优势。

矢量图还具有一些其他的特性：1. 它是一种用标签编写的文本格式，就想 HTML 一样；2.可以用 CSS 进行样式设计；3. 他可以使用 JavaScript 编写脚本来实现一些变化。（绘制或者创建 SVG 需要很好的数学 or 很好的 SVG 绘图软件）

> Inskape, Illustrator, Sketch 是最常见的用于绘制 SVG 的软件 （2019）
> or JS 库：snap.svg, Bonsai, D3.js

## How web browsers works

**web browser are mixing things together in order to display web.** 接下来分析一下 Web Browser 需要具备什么能力来支撑这样的功能呢？

首先，Web Browser 需要获取(html)文件，因此实际上：

- 最根本的一点就是其通过 HTTP/HTTPs 协议来完成网络连接，实现对文件的 C(Create) R(Read) U(Update) D(Delete)；
- 此外还可以建立双向的定向通信服务通道，和特定的服务器建立双向连接（WebSockets）
- 创建 Peer to peer 连接等。

其次，需要**理解和执行和渲染**不同的语言，字体、图像、视频、文档等。
第三，需要具备交互式功能，可以实现文本选择，点击，滚动等。
第四，需要提供一些缓存存储功能，能够存储部分数据
第五，加密和安全管理功能，避免恶意入侵。

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20240129152217.png)

由于页面是动态的，必须按照一定的刷新频率来对页面进行重绘，以实现预期的显示效果。

## How WWW works

>[!quota]+ this part is from mdn

- **互联网**：好比地球上纵横交错的道路。
- **网络连接**：道路通到了村子路口。从此，村子里的苹果就可以运出去卖了。
- **TCP/IP**：为了将村里的苹果能规范有效的运卖出去而不出问题，村长作出如下规定：“用规格刚好 20 cm * 20 cm * 20 cm 的泡沫箱来装，之后外面又用相应规格的纸箱包裹上，最后打上透明胶”。并且要求，对方收到时，一定要外包装完好，不然就会补发。而且还给对方发了一张发货单，明确说明了，苹果有多少，是用什么方法包装的，只有货和发货单对上了，对方才会确认收货。
- **DNS**：突然一天，郭德纲想吃苹果，就跟于谦说，“我听说盘溪新村（域名）的苹果好，要他们那个套餐一选项啊！”，于谦一听，得，也不知道盘溪新村在哪，打开地图查（DNS）吧，一查，好嘛，江苏省苏州市（IP 地址），于是于谦去了苏州，找了村子，告诉村长，要套餐一，要用顺丰快递，并且留下了北京德云社的地址。
- **HTTP**：过了几天，德云社的人一看，有快递来了，来了这么一句，“只收‘顺丰’，拒收其他快递”。司机忙说，“是顺丰，是顺丰”，这才对上暗号，德云社的人收下了货。
- **组成文件**：送来的货可不止一车，而且也不止一种苹果，这车是红富士，那车黄富士的。
    - **代码**：有点像，村长事先安排的说明书，让司机到了地方，如何卸车，货放到什么位置，而德云社的看说明书，知道什么样的苹果放到什么位置上，什么样苹果如何食用最佳，等等。
    - **资源**：不同种类的苹果。

更"专业"一些的写法为：

- **网络连接**: 允许你在互联网上发送和接受数据。
- **TCP/IP**: 传输控制协议和因特网互连协议是定义数据如何传输的通信协议，对传输的数据进行打包和封装。
- **DNS**: 域名系统服务器像是一本网站通讯录。当你在浏览器内输入一个网址时，浏览器获取网页之前将会查看域名系统。浏览器需要找到存放你想要的网页的服务器，才能发送 HTTP 请求到正确的地方。
- **HTTP**: 超文本传输协议是一个定义客户端和服务器间交流的语言的协议（[protocol](https://developer.mozilla.org/zh-CN/docs/Glossary/Protocol) ），定义传输的方式。
- **组成文件**: 一个网页由许多文件组成，就像商店里不同的商品一样。这些文件有两种类型：
    - **代码** : 网页大体由 HTML、CSS、JavaScript 组成，不过你会在后面看到不同的技术。
    - **资源** : 这是其他组成网页的东西的集合，比如图像、音乐、视频、Word 文档、PDF 文件。
## FI