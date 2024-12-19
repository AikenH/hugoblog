---
calendar_date: 2024-01-31
catalog: true
categories:
- 前端三剑客入门笔记
cover:
  image: /cover/cover5.jpeg
date: 2024-01-31 21:42:46
description: null
lang: cn
mathjax: false
tags:
- Web
- JS
thumbnail: /img/header_img/lml_bg5.jpg
title: LearnWeb04-JS01-基础webJS编写
toc: true
---

> [!summary]+ 
> JS 除了 WEB 在现代还有很多 NodeJS 的应用也会使用 JS，这里只介绍 web 相关的 JS 代码编写的部分。

**ref:** [mdn JS 快速入门](https://developer.mozilla.org/zh-CN/docs/Learn/Getting_started_with_the_web/JavaScript_basics) | 《数据结构与算法 JavaScript 描述》

## Intro

JavaSript 和 Python 一样是一个脚本编程语言，也均为解释型语言，具备一个编程语言的所有基本编程特性，而在使用 JS 来实现网页的动态特性的时候，主要使用的是以下的一些**特性**：

> 解释型语言执行无需**预先编译**为二进制机器码执行，通常 JS 的转换器会使用即时编译的技术来使得代码运行更快。

- 存储长期/短期信息
- 文本和 dom 元素操作（使用 js 的 web api 进行操作）
- 创建监听事件，动态执行对应的函数, 基于时间去搭建动态的网页效果

作为一门完备的动态编程语言，可以借由诸多开发者编写的大量工具，为网站提供动态交互的特性（结合浏览器应用程序接口 API）主要用到的包括：

- **浏览器应用程序接口（API）**：浏览器内置的 API 提供了丰富的功能，比如：动态创建 HTML 和设置 CSS 样式、从用户的摄像头采集处理视频流、生成 3D 图像与音频样本等等。
- **第三方 API**：让开发者可以在自己的站点中整合其他内容提供者（Twitter、Facebook 等）提供的功能。
- **第三方框架和库**：用来快速构建网站和应用。

| API 类别 | A                                                                               | B                                                                    | C                                                                     | D                                                                                                                                            |
| :----: | ------------------------------------------------------------------------------- | -------------------------------------------------------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| 浏览器API | [DOM操作](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model) | [地理位置](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation) | [Canvas](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API) | [WebGL](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API) \| [WebGL example](https://experiments.withgoogle.com/collection/chrome) |
|        |                                                                                 |                                                                      |                                                                       | [WebRTC 等影音类API](https://developer.mozilla.org/zh-CN/docs/Web/API/WebRTC_API)                                                                |
| 第三方API | [Twitter](https://developer.twitter.com/en/docs)                                | [新浪微博](https://open.weibo.com/)                                      | [谷歌地图](https://developers.google.com/maps/)                           | [高德地图](https://lbs.amap.com/)                                                                                                                |

许多第三方的服务提供的 API 要自己去了解如何使用，这里&后续不会做太多的介绍。

通常而言一个网站的 JS 代码也会有两个部分组成：一部分是服务器端代码，另一部分是客户端代码。

客户端代码就是访问网页的时候再本机运行的代码，而服务端代码即服务再服务端提供，客户端使用 api 去请求对应的结果和信息等等，通常服务端代码由各种语言编写：PHP、Python、Ruby、ASP.NET、JS(but nodejs)等。

### HTML 引入 JS 代码

为了使得代码更清晰且好组织，本文依然使用引入外部 JS 的办法进行代码结构组织，HTML 中引入相关 JS 的方法和 CSS 的方法类似但略有不同。具体代码如下：

```html
<script src="scripts/main.js" defer></script>
```

这一段代码可以加在 Head 部分，其中的 defer 属性，及 deferred 延迟，是为了让元素都加载完成后再加载 JS 部分代码，否则最好将 JS 的引入放在 [HTML 快要结束的部分](https://www.freecodecamp.org/chinese/news/link-javascript-to-html-with-the-src/)（`</body>` 的前一行）。避免 JS 元素对 HTML 提前进行修改导致 HTML 加载失效。

参考资料：[async-defer](https://juejin.cn/post/6992371218481414152) | [Medium](https://realdennis.medium.com/html-script-%E4%B8%ADdefer%E8%B7%9Fasync%E6%98%AF%E4%BB%80%E9%BA%BC-1166ee88d18)

#### Async & defer

async 下载的时候不会阻碍网页的渲染，但是下载完成就会执行，defer 会按照指定的顺序执行，同时会等到 dom 全部加载完之后再执行，合理的运用这两个属性来加载 JS 是很重要的，具体的建议摘抄自 Mdn 如下：

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20240330162843.png)

- `async` 和 `defer` 都指示浏览器在一个单独的线程中下载脚本，而页面的其他部分（DOM 等）正在下载，因此在获取过程中页面加载不会被阻塞。
- `async` 属性的脚本将在下载完成后立即执行。这将阻塞页面，并不保证任何特定的执行顺序。
- 带有 `defer` 属性的脚本将按照它们的顺序加载，并且只有在所有脚本加载完毕后才会执行。
- 如果脚本无需等待页面解析，且无依赖独立运行，那么应使用 `async`。
- 如果脚本需要等待页面解析，且依赖于其他脚本，调用这些脚本时应使用 `defer`，将关联的脚本按所需顺序置于 HTML 的相应 `<script>` 元素中。


 
### 调试 JS 代码

JS 有几种调试 debug 的方式，按照个人现阶段的理解，可以分为两类：一是主要针对 NodeJS 类的**JavaScript on the server**的调试，配置起来相对简单，只需要安装好 Node 在 Vsocde 中使用 Nodejs 进行调试即可。

1. 使用 NodeJS + VsCode 进行本地调试，也可以直接使用 `node <yourjsfile>.js` 执行，如果是在 Vscode 的终端中执行也会触发调试界面，非常方便。
2. 【废弃】SpiderMonkey 中下载 JavaScript Shell 直接执行 JS 文件或者进入可交互终端。
3. 【不常用】浏览器开发者环境中的控制台进行调试。

二则主要用于**JaveScript inside the browser**的调试，最常见的是：

- 浏览器 F12 进入开发者环境中的控制台进行调试
- **VsCode** + 以下两个插件：**LiveServer**+**JavaScript Debugger**（原 Debugger for Chrome） 进行调试。

顺带一提这里的**JavaScript Debugger**建议使用预览版本，官方插件中有指引。具体如下：

>[!quota]+
>- Open the extensions view (ctrl+shift+x) and search for `@builtin @id:ms-vscode.js-debug`
>- Right click on the `JavaScript Debugger` extension and `Disable` it.
>- Search for `@id:ms-vscode%%  %%.js-debug-nightly` in the extensions view.
>- Install that extension.

LiveServer 可以直接启动对应端口的进程，查看对应的最终效果，使用很简单这里不过多介绍，假设其启动的服务在 3000 端口，JavaScript Debugger 可以做以下配置。

而**JavaScript Debugger**使用的时候需要新建 Lauch.json，使用 launch 模式进行 debug，具体配置如下（使用 edge 进行调试）该部分参考资料：[在VsCode中使用JavaScript Debugger](https://juejin.cn/post/7111978793220177934)

```json
"configurations": [
        {
            "type": "msedge",
            "request": "launch",
            "name": "launch vuejs: chrome",
            "url": "http://localhost:3000/",
            "webRoot": "${workspaceFolder}",
            // "breakOnLoad": true,
            "sourceMaps": true,
            "sourceMapPathOverrides": {
                "webpack:///src/*": "${webRoot}/*"
            }
        }
    ]
```

- url 为本地需要调试的项目地址
- sourceMaps: true 开启源码映射功能，从而更好的调试源码
- 设置源码映射路径 `sourceMapPathOverrides` ，上面映射了 webpack 打包后的源码文件夹到项目的 src 目录；其他需要映射的目录，可以自行添加。

替换为自己对应的路径后即可开始调试，在 Js 中打下的断点就会生效了，这里暂时没使用 Attach 模式，后续用到在研究。

了解代码调试和运行是学习语言的基础，对这些有所熟悉之后就可以开始学习和尝试编写 JS 代码了。