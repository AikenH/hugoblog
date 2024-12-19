---
calendar_date: 2024-02-06
catalog: true
categories:
- 前端三剑客入门笔记
cover:
  image: /cover/cover11.jpeg
date: 2024-02-06 16:24:17
description: null
lang: cn
mathjax: false
tags:
- Web
- CSS
thumbnail: /img/header_img/lml_bg12.jpg
title: LearnWeb11-CSS05-部分常见样式设置
toc: true
---

> [!summary]+
> 该篇章主要收集一些常见的样式设置的参考页和一些需要记住的重要设置内容，由于不可能记住所有的属性和设置，善用查询可能才是唯一的王道。

---

## CSS 中的值与单位

[CSS 中的值与单位](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Values_and_units) 这里介绍常见的一些值和单位，有一些新的可能会有所缺失，但是大部分都有了，这里可以列举几个常见但是之前不理解的。

- `em` 相对字体大小
- `vw` 视窗宽度，值为百分比的含义
- 百分比：与父辈容器的百分比
- rgba 或者 rgb 的第四个值代表透明度，十六进制想设置透明度的话，就在后面再加两位 16 进制表示透明度的百分比。

这里倒是提示我们需要有个比较好的取色器或者像 vscode 中的色盘来编写 css，颜色搭配网站在 css 中也是很重要的。

 

## CSS 调整大小

> 该章节内容来自 [MDN 在 CSS 中调整大小](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Sizing_items_in_CSS) ，节选。

- **原始尺寸&固有尺寸:** 如图像等外部资源的固有尺寸；而 div 之类的空元素本身是没有尺寸的（0），其高度由其所含的内容高度决定，这就是元素的固有尺寸；
- **指定尺寸:** 可以为元素指定 height 和 width，因此当使用绝对值和百分比进行设置尺寸时，如果和内容尺寸不匹配等可能会存在溢出等情况，需要谨慎使用；

**一、使用百分比设置尺寸**：在使用百分数时，需要知道我们指定的是什么的百分比：

- **百分比通常指可用空间的百分比**：在具体的语境中有，整个**可视空间的百分比**（没有父容器时），或者**父容器宽度的百分比**。
- 百分比用于内外边距时：其不会根据方向设置为宽或高的百分比，而是固定使用内联尺寸的百分比进行计算，即**宽度的百分比**。

**二、使用最大最小值设定尺寸**：`min-` & `max-` 尺寸，如果我们有一个内容变化的盒子，我们希望固定某个高度或者宽度的最大值或者最小值的情况使用。

```css
.box{
  min-height: 150px;
  width: 200px;
}
```

上述例子就拥有一个固定宽度，但是高度随着内容量变化的盒子，这也是一种处理内容溢出的方式；

此外 `max-width` 还常用于限制图片的大小，避免图片过大导致的显示异常，例如以下用法：

```css
.box{
 width: 200px;
}

.width{
  max-width: 100%;
}
```

```html
<div class=box>
  <img src="imgurl" alt="big picture" class='width' />
</dib>
```

这种情况下图片会自动限制其表现比例，避免超出 box 的宽度，而无需去手动指定，通过这种方式可以使得图片可相应，避免在更小的设备上显示异常（但是还是应该处理多图片文件，避免过大的图片造成的流量浪费。）

**三、使用视口单位设置尺寸:** vw 值的话会反应当前的窗口大小，1vw 指视窗宽度的 1%，直接基于视窗值设置可以获得更为灵活的一些设计，例如可以使用 100vw 来做对应的 banner 或者 nav 等。

## CSS 中常见样式

### 文本

- [基本文本和字体样式](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Styling_text/Fundamentals)
- [web 字体获取和导入](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Styling_text/Web_fonts)
-  [`text-align`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-align) 属性可以实现文本居中显示
-  [`writing-mode`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/writing-mode) 属性可以修改文字的竖排横排等，该模式也会影响块级元素的 box 的切分方向，参考：[处理不同方向的文本](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Handling_different_text_directions)，在文字修改为竖排的时候 width 和 heigh 也应该切换，为此 css 提供了一种映射属性来处理这种情况，如果需要的话再去了解。
### 列表

- [列表样式](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Styling_text/Styling_lists)：包括列表符号，行高，间距，数字的开始和计算..

### 链接

- [链接样式](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Styling_text/Styling_links) ：设置各种状态下的连接表现，设置连接后面添加跳转图标等

### 边框

[`border`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border) 圆角设置使用 `border-radius` 属性进行设置，其通过指定两个值分别定义水平半径和垂直半径来实现，也可以只传入一个值（可为绝对值或者百分比）来设置两个值，其他的参见文档。

### 背景

[`background`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background) 背景可定义诸多属性，是一个比较复杂的简写属性，这里介绍一些基本能设置的内容，以及简写的规则，背景主要被设置的有：

1. 颜色，可以使用 `rgba(x,x,x,y)` 前三位是颜色代码，最后一位代表透明度。
2. 图片(链接和地址使用 `url()` 包裹)，可以指定多个图片
3. `Background-repeat` 设置小图片的平铺，
4. **使用 `Background-size` 控制图片的大小**，可以使用长度或者百分比，也可以使用 cover（保持比例完全覆盖 box，可能会只显示局部） 或者 contain（保持比例，图片完全在 box 中，可能会留白） 关键字
5. 使用 `-position` 控制图片的左上角位置，一个水平值和垂直值，可以是值或者 top center 之类的关键字
6. 可以使用 [`<gradient>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient) 渐变函数来获得渐变背景
7. 背景附加 [`background-attachment`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-attachment) 控制图片在元素和页面滚动时候的表现
	1.  `scroll`：使元素的背景在页面滚动时滚动。如果滚动了元素内容，则背景不会移动。实际上，背景被固定在页面的相同位置，所以它会随着页面的滚动而滚动
	2. `fixed`：使元素的背景固定在视口上，这样当页面或元素内容滚动时，它就不会滚动。它将始终保持在屏幕上相同的位置
	3. `local`：将背景固定在它所设置的元素上，所以当你滚动该元素时，背景也随之滚动。

简写属性的规则：

- `background-color` 只能在最后一个逗号之后指定。
- `background-size` 值只能立即包含在 `background-position` 之后，用“/”字符分隔，例如：`center/80%`。

## CSS 中的图像、媒体和表单

**替换元素**：css 中的图像和视频被称为替换元素，css 无法影响他们的内部布局。

### 图像大小调整

前面已经有几种图像大小调整的方式了，这里回顾一下：如果使用 background 属性的处理，使用 max-width 的方式处理；

```css
.box{
  ...
  background-size: cover;
}

img{
  max-width: 100%
}
```

这里介绍一下其他的处理方式，可以使用 `object-fit` 属性，可以设置多种将图像嵌入盒子的样式，这里的属性部分和 Background 是重叠的，例如 cover，contain，fill（不会保持比例）

```css
.cover{
  object-fit: cover;
}

.contain{
  object-fit: contain;
}
```

### 替换元素的布局特殊性

**替换元素在布局时有特殊表现：**在对替换元素使用 CSS 布局时，例如使用 flex 或者 grid 布局时，**默认元素会被拉伸到布满整块区域**，但是**替换元素不会被拉伸，而是对齐网格区域或者弹性容器的起始处**；

如果希望图像拉伸，我们可以利用下述 css 对 layout 的 image 元素强制拉伸。

```css
layout > img {
  height: 100%;
  width: 100%;
}
```

### 表单 `form` 元素

> 用 CSS 格式化表单元素是一个需要技巧的工作，[HTML 表单指南](https://developer.mozilla.org/zh-CN/docs/Learn/Forms)包含了详细的格式化表单元素的指导，我不会在这里复述。本节需要介绍的是一些值得关注的关键基础内容。

- 很多表单控件是通过 [`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input) 元素（html）添加到网页上的。该元素定义了简单的表单区域，例如文字输入。更进一步还有 HTML5 新加入的更加复杂的区域，例如颜色和日期撷取器。
- **表单元素默认不会继承字体样式**，可以通过在最上面设置 `textarea, input, button{font-family: inherit; font-size:100%}` 来默认继承
- **使用 border-box 来设置表单**，由于跨浏览器的 form 元素对于不同的挂件使用不同的盒子约束规则，所有我们可以使用 border-box 来保证统一，然后将内外边距都设置为 0，在设置具体样式的时候再分别添加
- 为 `<textarea>` 默认添加 `overflow:auto` 避免不需要的滚动条。
- 可以将上述作为我们的表单的默认设置，作为一个层或者最上方添加。

```css
button,
input,
select,
textarea {
  font-family: inherit;
  font-size: 100%;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

textarea {
  overflow: auto;
}
```

**可以使用下述代码的方式来调整表单的一些样式：**

```css
input[type="text"],
input[type="email"] {
  border: 3px solid #111;
  margin: 0 0 1em 0;
  padding: 10px;
  width: 100%;
}

input[type="submit"] {
  border: 3px solid #333;
  background-color: #000;
  border-radius: 5px;
  padding: 10px 2em;
  font-weight: bold;
  color: #fff;
}

input[type="submit"]:hover, input[type="submit"]:focus {
  background-color: #333;
}
```

```html
<form>
  <div><label for="name">Name</label>
  <input type="text" id="name"></div>
  <div><label for="email">Email</label>
  <input type="email" id="email"></div>

  <div class="buttons"><input type="submit" value="Submit"></div>
</form>
```

至于样式化表单的更加深入的信息，可以看下这些教程的 HTML 一节的这两篇文章：

- [Styling HTML Forms](https://developer.mozilla.org/zh-CN/docs/Learn/Forms/Styling_web_forms)
- [Advanced Styling for HTML Forms](https://developer.mozilla.org/zh-CN/docs/Learn/Forms/Advanced_form_styling)