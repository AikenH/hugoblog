---
calendar_date: 2024-02-03
catalog: true
categories:
- 前端三剑客入门笔记
cover:
  image: /cover/cover7.jpeg
date: 2024-02-03 09:51:08
lang: cn
mathjax: false
subtitle: null
tags:
- Web
- HTML
thumbnail: /img/header_img/lml_bg7.jpg
title: LearnWeb06-HTML03-多媒体元素
toc: true
---

>[!summary]+ 
> 接下来主要探讨 HTML 中的多媒体元素，图片、视频、音频以及 iframe 等等。

## 图片元素 Image

```html
<img src="<img_url or location>" />
```

`src `：最基本的图片元素仅需一个 **src** 属性来指向图片资源，这样就可以将图片导入页面中，其中关于 Location 这里有一个 SEO Tips(Google Recommand)：

- 本地存储推荐存储于 `images`
- 图片的命名更加具备描述性。
- 不要将自己的 SRC 属性指向他人网页上的照片（这种行为为"盗链"）

如图像元素和视频元素这类嵌入的元素，有时候也被成为**替换元素**：元素的内容和原始尺寸由外部资源所定义，而非元素本身。（可以使用属性或者 CSS 进行控制）

`alt`：alt 为了视障，节省带宽，浏览器支持问题等原因设置的代替图片出现的描述性文本，推荐根据图片内容进行编写：

- `装饰需求 `: 使用空的 `alt=""` 避免输出多余信息，同时推荐将装饰性图片在 CSS 文件中定义而非 html，下文会详细讲解 CSS 设置装饰图片
- `内容需求`：如果正文中没有描述，则 alt 对图片进行描述，否则设置为空。

`width` 与 `height` ：上文中提到图片的 size 由外部资源决定，单位了适应页面的大小，可以使用 img 标签中的 width 和 height 属性来实现对图片的缩放，同时也会**在页面尚未加载完成时预留空间，避免页面结构混乱**。（因此无需缩放也建议，获取图片的 size 写入属性。）

`title`：类似超链接中的 title 属性，可以给照片添加悬停提示，当空间不够时可以通过这种方式来添加部分信息，但不推荐。

`figure` 与 `figcaption`：创建一个容器（box），可以为图片在图片下方添加说明，像论文中的那种，对于无障碍用户来说起到和 alt 一样的作用。

```html
<figure>
	<img src= "https://the-network-photo" alt="" title="key img", width="400", height="200" />
	<figcaption>通过为网络添加一个低纬嵌入来实现用最小的空间代价控制网路行为</figcaption>
</figure>
```

figure 中可以存放几张图片、一段代码、音视频、方程、或者任何其他的内容，而不只是单张照片，类似的补充说明的场景都可以使用 figure 元素呈现。

 

### 使用 CSS 添加背景图片

举个例子，为整个页面/任何标签/元素设置一个背景图片，可以使用 `background-img` 属性来指定图片，并使用 ` background-*` 属性来指定图片的 size 等呈现方式。

```css
html {
	background-img: url("images/dinosaur.jpg");
	background-size: auto;
}
```

## 音视频内容 Video & Audio

> **补充知识**：早期的 HTML 无法支持音视频因此有了 FLash 等技术的兴起，由于安全性和其无法支持 HTML 和 CSS 特性，且后续 HTML5 中支持了 `video` 和 `audio` 标签，故而这些技术就被淘汰。

音视频的插入方式主要有：

- （学习）HTML5 提供了 `video` 和 `audio` 标签支持以及相应的 JavaScript 中提供了 [`APIs`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement)对这些音视频进行控制，
- （推荐）OVPs(Online Video Provide Server)在线视频/音频提供商，如 b 站和 youtube 等，会提供现成的代码在网页中嵌入其音视频资源，可以避免我们主机的带宽消耗等诸多难题

### Video 元素

```html
<video src="your video location or url" controls>
	<p>
		你的浏览器不支持HTML5视频,可点击<a href="videosize">此链接</a>观看
	</p>
</video>
```

使用方式和 `<img>` 标签相似使用 src 定位资源，而其他的一些别的用法说明：

- controls：布尔属性，为视频包含浏览器提供的默认控件页面来控制视频的播放，同时也可以使用 [JS Media API](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement) 来创建自己的页面
- 标签中包裹的内容：如 `<img>` 中的 `alt` 为视频提供后备方案，如果视频不被支持或者加载失败，可以显示其中内容。

由于浏览器/设备的对不同音视频编解码器的不同支持(相关编解码知识请参考 [MDN](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Video_and_audio_content#%E4%BD%BF%E7%94%A8%E5%A4%9A%E4%B8%AA%E6%92%AD%E6%94%BE%E6%BA%90%E4%BB%A5%E6%8F%90%E9%AB%98%E5%85%BC%E5%AE%B9%E6%80%A7) 使用多个播放源以提高兼容性章节)，可能会需要**提供多个备选资源来源**，可以使用以下的方式：

```html
<video controls>
	<source src="name.mp4" type="video/mp4" />
	<source src="name.webm" type="video/webm" />
	<p>
		你的浏览器不支持HTML5视频,可点击<a href="videosize">此链接</a>观看
	</p>
</video>
```

还有一些其他的属性，需要的时候建议查看文档。

- `width` 和 `height`
- `autoplay`：自动开始播放；`loop`：自动循环播放
- `muted`：默认静音
- `poster`：指向一个图像的 url，通常用于预览或者广告
- `preload`：提供缓冲选项，none，auto，metadata 三个选项。

可以使用 `track` 标签，基于 `WebVTT` 格式为视频提供字幕，具体例子如下：

```html
<video controls>
  <source src="example.mp4" type="video/mp4" />
  <source src="example.webm" type="video/webm" />
  <track kind="subtitles" src="subtitles_en.vtt" srclang="en" />
</video>
```

其中 king 中有 subtitle 翻译字幕，caption 同步字幕，timed description 将文字转换为音频，服务视觉障碍人士。
### audio 元素

音频元素和视频元素基本完全一致，区别由于占用的空间较小，因此没有视觉部件，如同 `width`, `height` 和 `poster` 

### JS 控制举例

```js
const mediaElem = document.getElementById("my-media-element");
mediaElem.load();
```

例如：使用上述 load 命令可以重置媒体元素，其他的控制等使用的时候再进行补充

## 网页与其他对象的嵌入 Iframe&Object

可以上 Mdn 查看 Web 中各种[嵌入元素的简史](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Other_embedding_technologies)，这里主要记录 `iframe` 元素：提供了一种将整个 web 页面嵌入另一个网页中的方法，是现在 web 中经常被使用的元素。

> 上文中提到的基于 OVPs 插入音视频的方法实际上就是基于 iframe 元素实现的，通常可以在 OVPs 页面的分享处找到，复制其嵌入代码即可。

随便找了一个 B 站的例子，使用 `<iframe>` tag，以 src 指定嵌入来源，还有其他相关的诸多属性设置。

```html
<iframe src="//player.bilibili.com/player.html?aid=1750103776&bvid=BV1m4421w7a2&cid=1428891154&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
```

除了视频还可以嵌入：在线地图、广告、Disqus 评论系统等，接下来可以介绍一下一些常用的属性。

- `width=“100%“` 与 `height="500"` 支持百分比和像素控制两种，可以指定一个绝对值剩下百分比。
- `frameborder`: 设置为 1 会绘制边框，0 会删除边框，建议设置为 0，不建议设置，可以在 css 中操作边框的表现，如 `border: none;`
- `allowfullscreen`：布尔属性，是否可以以全屏方式打开该 frame。
- `sandbox`：**无脑 100%添加**，可以增加一些安全性，但是需要较新的浏览器版本。

`<iframe>` 可以如视频一样指定备选内容，如果无法加载的话就显示对应的备选内容，或者直接指向视频网站。

###  废弃 embed & object 嵌入

这两个 Tag 可以嵌入 Flash，脚本和 PDF 等内容，但是并不推荐这么去做，详细请参考 [MDN 说明](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Other_embedding_technologies)，避免使用 Flash 这个过时的技术，像 PDF 这种最好直接指向其链接，而非将其添加为嵌入。

### 部分安全设置

1. **CSP 指令**：部署网站的时候添加安全响应头，避免自己的网站被别人作为嵌入插入自己的页面，为自己带来没有必要的额外带宽消耗。

方法参考自 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/X-Frame-Options)，配置 Nginx，将一下这行添加到 http,server,或者 location 的配置中。

```conf
add_header X-Frame-Options SAMEORIGIN always;
```

2. 使用HTTPS
## 矢量图形 SVG

矢量图的定义这里不再重复，其用一组函数来定义图形，具体的编写方法这里也不再多说，最好使用第三方工具直接生成 SVG。这里只介绍一下如何插入和操作 SVG：

插入 SVG 主要有两种方法：

- 第一种可以使用 `<img>` 但是无法使用 JS 操作图像，且只有在 svg 内部的 css 才能操作其样式
- 第二种直接使用 `<svg>` 里面添加 svg 的定义代码，可以为其添加 class 和 id，可以使用外部 css 调整器样式

```html
<svg width="300" height="200">
  <rect width="100%" height="100%" fill="green" />
</svg>
```

想要了解 SVG 还是从 [MDN 原文](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Adding_vector_graphics_to_the_Web)开始并补充更多绘图知识吧。

## 🔥响应式图片

**响应式照片**：如何在**不同的屏幕尺寸，分辨率设备**上都显示良好的图片，从而提升阅读体验和性能，之所以在 HTML 就需要介绍响应式图片，是因为页面在刚开始加载的时候就会获取图片，会先于 JS 和 CSS 显示出来，等到 JS 检测再动态加载新的照片会有点缓慢/奇怪。

>[!note]+
> CSS 是比 HTML 更好的响应式设计工具，本章节仅仅专注于 HTML，待到 CSS 部分再学习。

>[!TODO]+
>该部分肯定还要再深入研究的，这一点肯定不够用。
### 针对不同分辨率提供不同尺寸的图片

使用 img 中额外的属性 `scrset` 和 `sizes` 来指定不同条件下是选择显示的照片如下：

```html
<img
  srcset="elva-fairy-480w.jpg 480w, elva-fairy-800w.jpg 800w"
  sizes="(max-width: 600px) 480px,
         800px"
  src="elva-fairy-800w.jpg"
  alt="Elva dressed as a fairy" />
```

- `srcset` 使用 `, ` 分割多个图片 src
- `sizes` 使用类似三元表达式的形式做判断，`(cond), res1, res2` 例如这里 cond 为屏幕宽度<=600px，这样在小分辨率屏幕下就会选择原始尺寸更接近 480px 的图片（res1，res2 需要取图片的固有宽度曲线则）进行渲染。

`html` 文件的 `head` 中的 `<meta name="viewport" content="width-device-width">` 会强制让手机浏览器采用他们的真实可视窗口的宽度来加载网页，这样避免错误的尺寸（有的浏览器会虚报放大再缩小）为网页响应式渲染带来问题。

这种情况下，图片的大小在不同分辨率的屏幕上是不同的，取决于照片本身。

### 为不同分辨率提供相同尺寸的图片

希望在不同分辨率屏幕上看到的实际尺寸是相同的，可以使用 `srcset` 结合 x 语法来让浏览器选择合适的照片。

```html
<img
  srcset="elva-fairy-320w.jpg, elva-fairy-480w.jpg 1.5x, elva-fairy-640w.jpg 2x"
  src="elva-fairy-640w.jpg"
  alt="Elva dressed as a fairy" />
```

在这种情况下，会计算屏幕用多少个像素表示一个 css 像素，也就是说按照分辨率与标准分辨率的倍数来选择/缩放照片。

### 美术设计（更为实际的需求）

同一张照片在手机上表示效果如果和桌面端保持一致，可能会导致图片中的元素过小等各种各样的问题，导致阅读起来非常不便，这里建议使用 `<picture>` 属性替换 img 属性。

```html
<picture>
  <source media="(max-width: 799px)" srcset="elva-480w-close-portrait.jpg" />
  <source media="(min-width: 800px)" srcset="elva-800w.jpg" />
  <img src="elva-800w.jpg" alt="Chris standing up holding his daughter Elva" />
</picture>
```

同样在 media 选择条件，scrset 设置将会加载的图像。这种情况下我们**可以对多张照片分别指定 size**，来满足更为灵活的多样定制英雄，切记里面至少要有一个默认图像元素 `img`。

### 使用新图像格式

`WebP` 和 `AVIF` 都可以在高质量的时候保持较小的文件大小。

## 总结 FI

- 音视频方面：建议还是尽量使用视频提供商来嵌入多媒体内容，这些方式带来的带宽消耗和各种问题都相对棘手。
- 网页部署的时候需要注意 iframe 安全，同时可以使用 iframe 嵌入有趣的内容，但是切记仅在必要的时候嵌入
- SVG 相比 img 有诸多优势，但是最好还是使用第三方软件生成。
- 使用响应式图片来适应多种屏幕，不打算使用美术设计的时候不要用 media 属性。