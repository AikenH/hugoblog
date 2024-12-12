---
calendar_date: 2024-01-31
catalog: true
categories:
- 前端三剑客入门笔记
cover:
  image: /cover/cover4.jpeg
date: 2024-01-31 15:58:10
lang: cn
mathjax: false
subtitle: null
tags:
- Web
- CSS
thumbnail: /img/header_img/lml_bg4.jpg
title: LearnWeb03-CSS01-基础CSS规则
toc: true
---

> [!summary]+
> 在前文 web 入门中已经简单介绍了 CSS 是如何起作用，如何与 HTML 进行相互合作的，本篇主要简单介绍如何编写 CSS 文件中的各种样式。

ref: [mdn css入门](https://developer.mozilla.org/zh-CN/docs/Learn/Getting_started_with_the_web/CSS_basics) | [MDN css属性大全](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference)

在本文及后续的尝试中，都使用单独 CSS 文件外挂的格式，该种格式的结构会更清晰，即将下述代码放入 HTML 文件的 Head 部分。

```html
<link rel="stylesheet" href="styles/style.css" />
```

href 部分需要替换为自己实际存放 css 文件的地址即可，此外也简单重复一下剩下的两种使用 CSS 的方式：内部样式表和内联样式表

- **内部样式表**即在 HTML 的 Head 部分添加 `<style>your css code</style>` 将 CSS 代码都包裹起来
- **内联样式表**即在特定元素中定义 style 属性，`<p style="your css code">` 在 style 属性中填充需要的 CSS 代码。

接下来进入正文，讲解 css 部分的组成和编写规则。

## Pattern 基础范式

> The Principle to Write Css.

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20240131161211.png)

这是一个最基本的 CSS 结构，更为专业的名称是 **CSS 规则集**（简称为规则），其组成分成一下几个部分：

- **选择器 Selector**：类似表格中的筛选，筛选这个规则使用的范围，针对 Class、ID、Tag 等不同类型有不同的选择器写法
- **属性 Property**: 选择要修改的属性，如颜色，大小，位置灯多重类型。
- **属性值 Property value**: 各种对应属性的取值，如具体的哪个颜色，字体多大等。
- **声明 Declaration**：由属性和属性值组成的一条单独的规则，指定一种特定的样式。

上述结构称为规则**集**，因为其可以同时包含多个规则（即声明），编写时有以下约定：

- 每个规则使用 `;` 作为结尾的分割
- 同一个规则集的规则需要编写在 `{}` 之中
- 属性和属性值为 K-V 对，声明时使用 `:` 作为分割符，且属性和值均不区分大小写

## 注释方法

```css
/*
all between those two symbol is comment.
*/
```

 

## 选择器使用基础

该部分主要介绍如何使用选择器选中、多选不同的元素，更好更灵活的使用选择器来构建出各种不同的效果。

### 不同类型选择器定义

除了使用标签名称进行选择，大多数时候会希望使用更加 specific 的 Class 等去选择需要渲染的内容，才能使得风格更加多样可定制。下面列出一些常见的选择器定义方法，[更多的还是参阅MDN](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors)

|选择器名称|选择的内容|示例|
|---|---|---|
|元素选择器（也称作标签或类型选择器）|所有指定类型的 HTML 元素|`p`  <br>选择 `<p>`|
|ID 选择器|具有特定 ID 的元素。单一 HTML 页面中，每个 ID 只对应一个元素，一个元素只对应一个 ID|`#my-id`  <br>选择 `<p id="my-id">` 或 `<a id="my-id">`|
|类选择器|具有特定类的元素。单一页面中，一个类可以有多个实例|`.my-class`  <br>选择 `<p class="my-class">` 和 `<a class="my-class">`|
|属性选择器|拥有特定属性的元素|`img[src]`  <br>选择 `<img src="myimage.png">` 但不是 `<img>`|
|伪类选择器|特定状态下的特定元素（比如鼠标指针悬停于链接之上）| `a:hover`  <br>选择仅在鼠标指针悬停在链接上时的 `<a>` 元素|

## 引入[字体文件](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Styling_text/Web_fonts)

如果需要修改/导入字体文件，可以类似导入 css 文件一般，导入字体文件，一般有两种方式，一种是导入在线字体（**不推荐**，访问 google 字体库时可能会导致用户的 IP 泄漏），或者导入本地字体（推荐）。

导入字体的例子如下：

```css
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans" />
```

然后在 CSS 文件中全局/局部定义字体，这里给一个全局定义的例子，后面可以通过局部的规则对其进行覆盖：

```css
html {
	font_family: "Open Sans", sans-serif /* 这应该是从Google Fonts能得到的其余输出*/
}
```

获取字体的手段：[GoogleFonts](https://developers.google.com/fonts)，Github，推荐将字体下载到本地之后再进行挂载，或者使用安全的 [web通用字体](https://web.mit.edu/jmorzins/www/fonts.html)如：Arial、Times New Roman、Courier New。

导入本地字体的指引可以参考 [css 字体嵌入方法](https://www.iware.com.tw/qa-508.html)，实际上没有导入在线字体方便，需要考虑加载时间，导入支持各种浏览器的字体，优先加载用户本地字体等。

## CSS 的一切皆盒子

> COPY FROM MDN

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20240131170500.png)

CSS 布局主要是基于盒子模型。在你的页面上占用空间的每个盒子都有类似的属性：

- `padding`（内边距）：是指内容周围的空间。在下面的例子中，它是段落文本周围的空间。
- `border`（边框）：是紧接着内边距的线。
- `margin`（外边距）：是围绕元素边界外侧的空间。

创建一个这样的文本块还会需要用到一下的这些规则集：

- `width`：元素的宽度
- `background-color`：元素内容和内边距底下的颜色
- `color`：元素内容（通常是文本）的颜色
- `text-shadow`：为元素内的文本设置阴影
- `display`：设置元素的显示模式

设置整个 `<body>` 内容块的实例：

```css
body {
  width: 600px;
  margin: 0 auto;
  background-color: #ff9500;
  padding: 0 20px 20px 20px;
  border: 5px solid black;
}
```

- width 限制了整个 body 的宽度一直为 600 个像素
- `margin: 0 auto;` 当你在 `margin` 或 `padding` 这样的属性上设置两个值时，第一个值影响元素的上下方向（在这个例子中设置为 `0`）；第二个值影响左右方向。(这里，`auto` 是一个特殊的值，它将可用的水平空间平均分配给左和右）。如 [Margin 语法](https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin#%E8%AF%AD%E6%B3%95)中所记载的那样，你也可以使用一个、两个、三个或四个值
- `padding: 0 20px 20px 20px;` 我们给内边距设置了四个值来让内容四周产生一点空间。这一次我们不设置上方的内边距，设置右边，下方，左边的内边距为 20 像素。值以上、右、下、左的顺序排列。与 `margin` 一样，你也可以像 [Padding 语法](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding#%E8%AF%AD%E6%B3%95)中所记载的那样，使用一个、两个、三个或四个值。
- `border: 5px solid black;` 这是为边框的宽度、样式和颜色设置的值。在本例中，它是一个在主体的所有侧面的 5 像素宽的纯黑色边框。

默认的标题样式并不美观，可以按照以下方式做一些简单的改善：

```css
h1 {
  margin: 0;
  padding: 20px 0;
  color: #00539f;
  text-shadow: 3px 3px 1px black;
}
```

- padding：标题的顶部和底部内边距设置为 20 像素。
- text-shadow：
	- 第一个像素值设置阴影与文本的**水平偏移量**：它横移的距离。
	- 第二个像素值设置阴影与文本的**垂直偏移量**：它向下移动的距离。
	- 第三个像素值设置阴影的**模糊半径**。一个更大的值会产生一个更模糊的阴影。
	- 第四个值设置阴影的基色。

最后，我们把**图像居中**来使页面更美观。可以复用 body 的 `margin: 0 auto`，但有一些差异，需要额外的设置来使 CSS 发挥作用。

[`<body>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/body) 元素是**块级**元素，意味着它占据了页面的空间并且能够赋予外边距和其他改变间距的值。而图片是**行级**元素，不具备块级元素的一些功能。所以为了使图像有外边距，我们必须使用 `display: block` 给予其块级行为。

> [!callout]+
>  **备注：** 以上说明假定所选图片小于页面宽度（600 像素）。更大的图片会溢出 body 并占据页面的其他位置。要解决这个问题，可以： 1）使用[图片编辑器](https://en.wikipedia.org/wiki/Raster_graphics_editor) 来减小图片宽度； 2）用 CSS 限制图片大小，即减小 `<img>` 元素 [`width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/width) 属性的值。

> [!callout]+
>  **备注：** 如果你暂时不能理解 `display: block` 和块级元素与行级元素的差别也没关系；随着你对 CSS 学习的深入，你将明白这个问题。`display` 属性的更多信息请查看 [display 属性参考页面](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display)。

```css
img {
    width: 400px;
    align-self: center;
    margin: 0 auto;
    display: block;
}
```


## Example 最终效果

```css
html {
    font-family: "Open Sans", sans-serif;
    font-size: 20px;
}

/* h1 {
    font-size: 50px;
    text-align: center;
  } */

h1 {
    margin: 0;
    padding: 20px 0;
    color: #00539f;
    text-shadow: 3px 3px 1px black;
}
  
  
p,li {
font-size: 16px;
line-height: 2;
letter-spacing: 1px;
}

html {
    background-color: #2050b8;
}

body {
    width: 600px;
    margin: 0 auto;
    background-color: #ff9500;
    padding: 0 20px 20px 20px;
    border: 5px solid black;
}
 
img {
    width: 400px;
    align-self: center;
    margin: 0 auto;
    display: block;
}
  
```

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20240131172103.png)