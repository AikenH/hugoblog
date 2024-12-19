---
calendar_date: 2024-02-06
catalog: true
categories:
- 前端三剑客入门笔记
cover:
  image: /cover/cover10.jpeg
date: 2024-02-06 15:08:50
description: null
lang: cn
mathjax: false
tags:
- Web
- CSS
thumbnail: /img/header_img/lml_bg11.jpg
title: LearnWeb10-CSS04-盒子模型
toc: true
---

>[!summary]+
>HTML 和 CSS 中，所有的元素都是基于一个个的 Box 去渲染的，理解盒子模型的设计，才能知道如何进行布局，从而使的页面按照希望的样子呈现，该定义实际上和 HTML 的块级元素和内联元素使完全相对应的。需要注意两者之间的关联性。


## 块级盒子(Block Box)和内联盒子(Inline Box)

块级盒子和 HTML 中的块级元素使相互对应的，例如 `h` 和 `p` 有以下的特点：

- 与其他元素之间会换行
- 因为换行，在内联的方向上（也就是行）会占据所有可用空间，即绝大多数情况下和父容器一样宽。
- width 和 height 属性均可发挥总用
- 内边距（padding）, 外边距（margin）和边框（border）会将其他元素从当前盒子周围“推开”

内联盒子和 HTML 中的内联元素相互对应，例如 `span`, `em`, `strong` 等，有以下的特点：

- 不会换行
- width 和 height 属性不起作用
- 垂直方向的内边距、外边距以及边框会被应用但是不会把其他处于 `inline` 状态的盒子推开。
- 水平方向的内边距、外边距以及边框会被应用且会把其他处于 `inline` 状态的盒子推开。

如果希望切换元素的内联或者块级属性，可以通过对盒子的 display 属性设置进行切换，对应的属性值为 `inline` 和 `block`，而更有趣的，如果我们希望不换行，但是内联中的 `width` 和 `height` 属性起到作用，可以使用 `inline-box` 属性。

> Inline-box 属性在导航栏/链接元素中很常见，我们通过增大内容区域来使得链接存在更大的命中区域，同时不影响别的元素的呈现。

在这里还会看到片一个十分常见的盒子属性 `flex` 其通常会将外部的显示类型转换为 block，但是内部的显示类型设置为 flex，对其内部的各个子元素，都将转换为 flex 元素，并基于 flex 即[弹性盒子的规则](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Flexbox)进行布局，可以生成更灵活的界面，这个后面在排版部分针对性的了解，这里简单介绍如下：

- flex 会将内部的元素默认沿着行的方向均分切成几个 box，但是具体的切分可以根据后续的属性进行定义。
- 如果希望 flex 的外部为内联的，则使用 inline-flex 属性。

 

### 盒子模型

CSS 中一个块级**标准盒子**包括几个重要的定义，可以结合下面这张图查看，其中蓝色的同样也是可以调整的属性值, 可以很容易的通过浏览器的开发者工具去检查和查看 box 模型：

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20240206155014.png)

- **Content Box** 区域可以结合 Height 和 Width 属性定义区域大小
- **Padding Box** 也就是内容区域和边界之间的空白；
- **Border Box** 边框的范围是在 Content 区域+四周 Padding 指定值得到，包含内容和 padding 区域
- **Margin Box** 所在的虚线框则是我们的盒子和其他元素之间的空白区域，也可以理解为间隔，使用 Margin 属性定义 Border 和外界的距离

也可以使用替代模型去描述一个 box，如果是这种情况就使用 `box-sizing: border-box;` 处理一个盒子，这种情况下 width 和 height 指的是到 border 的长和宽，这里不多讲，如果希望全部使用原始盒模型可以使用以下的代码：

```css
html{
  box-sizing: border-box;
}
*,
*::before,
*::after{
  box-sizing: inherit;
}
```


### Box 的属性设置详解

**MARGIN**：详情参考之前的属性简写部分，主要是上左下右四个 margin，这里需要注意的是，其 value 均可为正负值

- 通过负值收缩空间，可以呈现元素相交和堆叠的效果。
- 通过正值推开空间，令 box 独立呈现。
- 如果有两个 BOX 相邻等类似的情况，这样两者之间的 Margin 会取 margin-top 和 margin-bottom 中较大的一个，而非相加，需要详解可参阅[外边距重叠](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_box_model/Mastering_margin_collapsing)

Padding：和 Margin 一样，但是不可以为负值。

Border：边框 box 本身和 padding 做区分的原因是因为其主要描绘的是四条边框线，同样可以区分或者共同控制：

分别设置每边的宽度、颜色和样式，可以使用：

- [`border-top`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-top)
- [`border-right`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-right)
- [`border-bottom`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-bottom)
- [`border-left`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-left)

设置所有边的颜色、样式或宽度，请使用以下属性：

- [`border-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-width)
- [`border-style`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-style)
- [`border-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-color)

设置单边的颜色、样式或宽度，可以使用最细粒度的普通属性之一：

- [`border-top-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-top-width)
- [`border-top-style`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-top-style)
- [`border-top-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-top-color)
- [`border-right-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-right-width)
- [`border-right-style`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-right-style)
- [`border-right-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-right-color)
- [`border-bottom-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-bottom-width)
- [`border-bottom-style`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-bottom-style)
- [`border-bottom-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-bottom-color)
- [`border-left-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-left-width)
- [`border-left-style`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-left-style)
- [`border-left-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-left-color)

参阅 MDN 文档。

### 内容溢出处理

当往 box 塞入太多内容的时候可能会导致元素从 Box 边框中溢出，导致呈现效果一团答辩（但是也比消失了好，消失了可能会导致问题没有被发现），css 中通过 [`overflow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow) 来控制这些溢出内容：

```css
.box{
  ...
  overflow: hidden;
}
```

- 默认为 visible 会溢出
- 设置为 hidden 则会直接截断，
- 设置为 `scroll` 浏览器会总是提供滚动条，避免内容的消失（但并不适合所有情况），如果我们仅需在一个方向上滚动，可以使用 overflow-y 仅对 y 轴方向设置溢出处理，不然有两个滚动条可能也不太美观。
- 设置为 `auto` 浏览器会仅在内容溢出的时候才会显示滚动条。