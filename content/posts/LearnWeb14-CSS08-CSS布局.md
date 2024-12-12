---
calendar_date: 2024-02-07
catalog: true
categories:
- 前端三剑客入门笔记
cover:
  image: /cover/cover14.jpeg
date: 2024-02-07 17:09:44
lang: cn
mathjax: false
subtitle: null
tags:
- Web
- CSS
thumbnail: /img/header_img/lml_bg15.jpg
title: LearnWeb14-CSS08-CSS布局
toc: true
---

> [!summary]+
> 这里 CSS 的布局指的是通过控制元素的属性：宽度，高度，块（不同类型），内联等来实现在 HTML 的基础上对整体页面的布局进行调整。将其排布在页面上。

>CSS 页面布局技术允许我们拾取网页中的元素，并且控制它们相对正常布局流、周边元素、父容器或者主视口/窗口的位置。在这个模块中将涉及更多关于页面[布局技术](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Layout_mode)的细节：

## 布局模式介绍

[**正常布局流**](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Normal_Flow)：指的是不对页面进行任何布局控制的时候，浏览器默认的 HTML 布局方式，实际上就是按照源码中的先后次序依次出现，在 HTML 布局的过程中，最为重要的就是元素的块和内联两种布局方式。这里需要注意的就是，块的方向和元素的书写方向的关系。

而当我们希望使用 CSS 来改变正常的布局形式的时候，通常会使用以下的一些属性，或者说布局技术，来覆盖掉默认的 HTML 布局行为。

- **[`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display)** 属性：改变元素在 HTML 中的渲染形式，如 `block` `inline` `inline-block` 还有 CSS 引入的 [CSS Grid](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Grids) 和 [Flexbox](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Flexbox).
- **[`float`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/float)** 属性：使用 float 属性能改变块级元素换行的特性，实现类似换行的效果，其值指定其他元素围绕块级元素的哪一边。
- **[`position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position)** 属性：利用 position 来设置盒子在盒子中的位置，在嵌套的情况下就可以产生多样的排布
- 表格布局：表格的布局方式可以用在非表格内容上，可以使用`display: table`和相关属性在非表元素上使用
- 多列布局： [Multi-column layout](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_multicol_layout) 属性可以让块按列布局，比如报纸的内容就是一列一列排布的。

在讨论布局时，`display` 最多用到的属性为 `flex` 和 `grid` 属性，利用这两个属性值来改变布局。

 

### [flex 弹性盒子](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Flexbox)

弹性盒子的出现为以下的几类问题有一个更好的解决方案：

- 在父内容里面垂直居中一个块内容。
- 使容器的所有子项占用等量的可用宽度/高度，而不管有多少宽度/高度可用。
- 使多列布局中的所有列采用相同的高度，即使它们包含的内容量不同。

举个例子可能会更加直观，接下来用一个例子说明，flex 最直观的用法：

```css
.container {
  display: flex;
}
```

```html
<div class='container'>
  <div class='box0'>One</div>
  <div class='box1'>Two</div>
  <div class='box2'>Three</div>
</div>
```

如果没有 css 的话，会从上到下排列，但是在父容器上加上 `flex` 属性以后，就会变成 3 个并排的 box 如下（该控制的方向会随着文字方向）

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20240207223841.png)


- 高度会随着最高的一个去设定，排成一行后留下剩下的空白

flex 中可以设置许多属性来改变 flex 项在 flex 布局中占用宽/高的方式，允许对块级元素进行拉伸处理，避免在尾部留下空白。例如在上面的例子中，修改 css 如下

```css
.container {
  display: flex;
}

.container > div {
  flex: 1;
}
```

在这种情况下 flex 将会对元素进行拉伸，使其充满整个父容器空间如下：

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20240207223905.png)



### Grid 网格布局

当设置 `display: grid` 时，布局将会改成网格布局，此时还需要用两个辅助属性 `grid-template-rows` 和 `grid-template-columns` 分别定义行和列的轨道，从而描绘出理想的网格的情况。

例如：

```css
.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 100px 100px;
  grid-gap: 10px;
}
```

columns 定义了 3 个 1fr（fraction） 的列和两个 100px 的行，这样就定义出了如下的网格（2\*3），且每个列都是均等的一份，可以简单的描述出将一行分为 3 等分，每个网格占据一份的情况。

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20240207224538.png)

在获得了一个和这样的网格后，我们可能不希望使用所有的网格去放置元素，或者希望有的元素占据多个网格，除了让 html 自动进行排序，我们也可以显示的设置元素的位置。

```css
.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 100px 100px;
  grid-gap: 10px;
}

.box1 {
  grid-column: 2 / 4;
  grid-row: 1;
}

.box2 {
  grid-column: 1;
  grid-row: 1 / 3;
}

.box3 {
  grid-row: 2;
  grid-column: 3;
}
```

`grid-column` 或者 `grid-row` 可以设置占据的行或列，以及从哪一行到哪一行 `1/3` 指的是第一到第三（前闭后开）即第一第二行。这种情况下就会呈现下面的效果：

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20240207225157.png)


### Float 浮动

该属性主要是实现一种 word 文档中的**环绕**的效果，会改变元素身边的流向，其主要有四个取值上下左右：

- `left`：将本身这个元素浮动到页面的左侧
- 以此类推

例如下述这个代码，及其呈现效果如下：

```css
.box {
  float: left;
  width: 150px;
  height: 150px;
  margin-right: 30px;
}
```

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20240207225628.png)


### Table 表格布局

使用 `display: table` 和 `display: table-cell` 等将父容器和元素转换为格子元素去处理，沿用表格的 layout 来排布我们的元素，可以参考[介绍 CSS 布局](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Introduction) 的相关部分。
### [multi-column 多列布局](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Multiple-column_Layout)

要把一个块转变成多列容器 (multicol container)，我们可以使用 [`column-count`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/column-count) 属性来告诉浏览器我们需要多少列，也可以使用[`column-width` (en-US)]( https://developer.mozilla.org/en-US/docs/Web/CSS/column-width "Currently only available in English (US)")来告诉浏览器以至少某个宽度的尽可能多的列来填充容器。

例如以下的例子 [multi-column-layout](https://developer.mozilla.org/zh-CN/play) 将两个 div 均按照同样的宽度进行多列布局，类似报纸中常用的使用多列来呈现信息。

```css
body {
  max-width: 800px;
  margin: 0 auto;
}

.container {
  column-width: 300px;
  border: 5px solid black;
}

.container2 {
  column-count: 3;
  border: 5px dotted red;
}
```

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20240207230504.png)

### Position 定位技术

>定位 (positioning) 能够让我们把一个元素从它原本在正常布局流 (normal flow) 中应该在的位置移动到另一个位置。定位 (positioning) 并不是一种用来给你做主要页面布局的方式，它更像是让你去管理和微调页面中的一个特殊项的位置。

>定位 (positioning) 能够让我们把一个元素从它原本在正常布局流 (normal flow) 中应该在的位置移动到另一个位置。定位 (positioning) 并不是一种用来给你做主要页面布局的方式，它更像是让你去管理和微调页面中的一个特殊项的位置。

- **静态定位**（Static positioning）是每个元素默认的属性——它表示“将元素放在文档布局流的默认位置——没有什么特殊的地方”。
- **相对定位**（Relative positioning）允许我们相对于元素在正常的文档流中的位置移动它——包括将两个元素叠放在页面上。这对于微调和精准设计（design pinpointing）非常有用。
- **绝对定位**（Absolute positioning）将元素完全从页面的正常布局流（normal layout flow）中移出，类似将它单独放在一个图层中。我们可以将元素相对于页面的 `<html>` 元素边缘固定，或者相对于该元素的_最近被定位祖先元素_（nearest positioned ancestor element）。绝对定位在创建复杂布局效果时非常有用，例如通过标签显示和隐藏的内容面板或者通过按钮控制滑动到屏幕中的信息面板。
- **固定定位**（Fixed positioning）与绝对定位非常类似，**但是它是将一个元素相对浏览器视口固定**，而不是相对另外一个元素。这在创建类似在整个页面滚动过程中总是处于屏幕的某个位置的导航菜单时非常有用。
- **粘性定位**（Sticky positioning）是一种新的定位方式，它会让元素先保持和 `position: static` 一样的定位，当它的相对视口位置（offset from the viewport）达到某一个预设值时，它就会像 `position: fixed` 一样定位

各个定位的例子请参考对应的 MDN 列表，粘性定位和固定定位绝对是我们想要的东西。

这里简单总结以下最重要的一些点：
- 定位除了设置 `position: ` 属性之外，还需要使用 `top` 和 `left` 来对位置进行解释。
- 相对定位时 top 和 left 相当于是于默认偏移相比要远离正常的 top 和 left 的距离
- 绝对定位的 top 和 left 则是距离页面左侧和顶侧的距离，即 html 元素
- 固定定位和绝对定位的一样，但是不会随着滚动移动
- 粘性定位将默认的静态定位 (static positioning) 和固定定位 (fixed positioning) 相混合。当一个元素被指定了 `position: sticky` 时，它会在正常布局流中滚动，直到它出现在了我们给它设定的相对于容器的位置，这时候它就会停止随滚动移动，就像它被应用了 `position: fixed` 一样。

## FLEX 弹性盒子详解

首先介绍 flex 的模型和一些基本的定义，能够对 flex 的布局调整有更清楚的认知：

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20240207234612.png)

- **主轴**（main axis）是沿着 flex 元素放置的方向延伸的轴（比如页面上的横向的行、纵向的列）。该轴的开始和结束被称为 **main start** 和 **main end**。
- **交叉轴**（cross axis）是垂直于 flex 元素放置方向的轴。该轴的开始和结束被称为 **cross start** 和 **cross end**。
- 设置了 `display: flex` 的父元素（在本例中是 [`<section>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/section)）被称之为 **flex 容器（flex container）。**
- 在 flex 容器中表现为弹性的盒子的元素被称之为 **flex 项**（**flex item**）（本例中是 [`<article>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/article) 元素。

### 修改主轴方向

弹性盒子提供了 [`flex-direction`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-direction) 这样一个属性，它可以指定主轴的方向（弹性盒子子类放置的地方）——它默认值是 `row`，这使得它们在按你浏览器的默认语言方向排成一排

### 换行设置

当你在布局中使用定宽或者定高的时候，可能会出现问题即处于容器中的弹性盒子子元素会溢出，可以通过添加换行声明属性，让其自动换行，同时我们也可以限定每个 flex 项的最小宽度，让其不必吧所有都排在同一行，可以多用几行。

在 flex-container 中设置：

```css
flex-wrap: wrap;
```

在 flex-item 中设置：

```css
flex: 200px;
```

### flex-flow 缩写

可以将 flex-direction 和 flex-wrap 缩写为 flex-flow。

```css
flex-flow: row wrap;
```

### flex 项的动态尺寸

flex 计算空间的占用比例的时候使用的是一个无单位的比例值进行表示，例如设置每个 `article` 的 flex 值为 1，即每个元素占用的空间为 1：1：1 ，**占用的空间**是基于 padding 和 margin 之后剩余的空间计算。

通过调整这个 flex 值可以调整每个值的相对比例，在指定相对值的同时还可以指定 flex-item 的最小值，避免为了并排多个元素导致元素宽度过大或者过小导致异常表现。

```css
article {
  flex: 1 200px;
}
```

上述代码将首先为每个 flex 占据 200px 的空间，最后将剩余的空间按照比例分给各个 flex-item，flex 的灵活性就是他最大的优势，对于不同浏览器窗口都能有一个比较好的排布。

### flex 的缩写和全写

flex 作为一个简写可以按顺序替代一下的三个属性：

- flex-grow：实际上就是上述的无单位比例值，
- flex-shrink：是一个比较高级的功能，用于溢出容器的 flex 项，预防一些预防情景，一般不用
- flex-basis：就是上述用到的最小值。

### 水平和垂直对齐

```css
div{
  display: flex;
  align-items: center;
  justify-content: space-around;
}
```

上述代码的效果可以让 div 中的元素垂直水平居中，如下图所示：

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20240208154240.png)

其中各个元素的作用如下（如果对名词不清晰的记得去看上述的 flex 模型图）：

- [`align-items`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-items)：控制 flex-item 在 cross-axis 的位置（也就是垂直位置）。
	- 默认是 stretch，也就是从顶开始延伸，然后和最大高度的 item 保持一致。
	- center 则会使得元素在垂直位置居中，高度和上述保持一致。
	- 也可以设置 `flex-start` 或者 `flex-end` 使得元素在最高处或者最低处对齐。
	- 在容器的子元素中可以使用 `align-self` 属性覆盖 `align-iterms` 的行为，对其中的特定元素选择特定的位置呈现。
- [`justify-content`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-content) ：控制 flex 项在主轴上的位置，默认书写位置的话即水平位置：
	- 默认值是 `flex-start`，从主轴的开始处开始排列，也可以用 `flex-end`
	- `center` 可以让 flex 项在主轴居中
	- `space-around` 会使得所有 flex 项沿着主轴均匀的分布，在任意一端留有一点空间
	- `space-between` 和上述相似，但是不会再两侧留下空间。
### flex 项排序

可以使用 flex 的属性来改变容器中元素显示的顺序，对其中的元素使用 order ；

```css
button:first-child{
  order: 1;
}
```

所有的 flex 项的 order 默认为 0，order 值大的项在显示过程中的顺序更靠后，支持设置负值。

### flex 嵌套

flex 允许嵌套使用，当元素为 flex 的时候，其子袁术默认为 flex-item，但是我们可以手动修改 flex-item 项的 display 为 flex，这样其子节点也会变成 flex-item。

支持实现如下的效果:

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20240208155347.png)

这种情况下使用的代码为：

```css
article:nth-of-type(3) {
  flex: 3 200px;
  display: flex;
  flex-flow: column;
}
```

## Grid 网格布局

网格布局是一种很经典且常用的布局模式，可以帮助我们更好的划分页面，获得一个更为统一的页面设计，一个网格通常包含很多行和列，行或者列中间的空隙都被成为沟槽 gutter。

一般网页通常用 12-16 列的网格布局来构成，我们也可参考该布局思路和方式。

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20240208160449.png)

定义网格的时候如果只设置 `display: grid` 页面不会发生变化因为默认只有一列，需要指定网格的行和列的属性和个数，页面才会相对应的改变。

```css
div{
  display: grid;
  grid-template-columns: 200px 200px 200px;
}
```

如上述 `grid-template-columns` 按照列的个数为每个列指定了宽度，这里的列值可以是绝对值也可以是各种百分比等任何值，而如果我们希望类似 flex 按照比例来设置的话可以使用 `fr`，同样还是看占几份 fr 来划分。

**fr 如何和其他值并用**：例如和绝对值并用的话会在减掉了绝对值剩下的空间中按照 fr 中所占的比例来进行平等划分。

### grid-网格间隙

使用 [`grid-column-gap` (en-US)]( https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap "Currently only available in English (US)") 属性来定义列间隙；使用 [`grid-row-gap` (en-US)]( https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap "Currently only available in English (US)") 来定义行间隙；使用 [`grid-gap` (en-US)]( https://developer.mozilla.org/en-US/docs/Web/CSS/gap "Currently only available in English (US)") 可以同时设定两者。

```css
.container {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    grid-gap: 20px;
    gap: 20px;
}
```

网格间隙可以使用 px 或者百分比，但是不能使用 fr 值。

>**备注：** `gap`属性曾经有一个`grid-`前缀，不过后来的标准进行了修改，目的是让他们能够在不同的布局方法中都能起作用。尽管现在这个前缀不会影响语义，但为了代码的健壮性，你可以把两个属性都写上。

### 快速创建重复网格

假设要创建多个 1fr 的网格，没道理一个个编写，这样太慢且冗余了，可以使用`repeat`的函数来快速表达：

```css
.container{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}
```

repeat(n, value)表示重复 value 多次，value 也可以是多个值。n 和 value 之间要用 `,` 隔开，值和值之间则不用。

### 隐式创建的网格

可以显示定义行和列，也可以隐式的根据内容自动扩充行网格，这种弥补显式网格无法放下的内容而生成的网格就是隐式网格（或者说被隐式定义的网格），具体的方法如下：

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 100px;
  grid-gap: 20px;
}
```

这里设置了行为自动的 100px，这种情况下，当网格内容装不下的时候，就会根据网格内容按照 100px 的高度来自动切分和增加新的网格。

- 该 auto 属性只会适用于隐式定义出来的网格，如果存在显示定义的网格并不会受其影响。
- 可以使用 minmax 函数来约束隐式网格，`minmax(minvalue, auto)`，这样我们就约束了网格的最小高度，而没有限制最大高度，这样其会根据内容自动确定行高（且最多只有一行隐式网格）


### 自动多列填充

有时候我们希望能够自动生成很多列来填满容器，可以使用下述的代码：

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: minmax(100px, auto);
  grid-gap: 20px;
}
```

这里使用了关键字 auto-fill 来代替具体的次数，生成的列最小为 200px 宽。而且容器总会被列塞满。

### 元素放置

> 需要注意的是格子的 index 和对应的文字书写顺序相关，如果使用了如阿拉伯语等非常规的文字书写顺序，需要注意你的 index 是否还适用。

通常使用 [`grid-column`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-column) 和 [`grid-row`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-row) 来定义元素放置的开始格子和结束格子（或所在格子），当然也可以用诸如 `grid-column-start` 和 `grid-column-end` 来确定，但是没这个必要。具体的写法如下，开始和结束使用 `//` 分割。

```css
header {
  grid-column: 1 / 3;
  grid-row: 1;
}
```

也可以使用类似 markdown 表格描述的方式来描述元素放置的位置如下:

```css
.container {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar content"
    "footer footer";
  grid-template-columns: 1fr 3fr;
  gap: 20px;
}

header {
  grid-area: header;
}

article {
  grid-area: content;
}

aside {
  grid-area: sidebar;
}

footer {
  grid-area: footer;
}
```

在 grid-template-areas 处定义好每个 var 所在的行列，然后在后续使用 grid-area 将元素放入这些定义好的 var，或者说 area 中即可。

## FLOAT 浮动布局

浮动布局这里的使用上文已经介绍过了，基本的使用就是按照这种方式，但是需要注意的是：

- 浮动元素实际上是脱离了原本正常的文档布局流，所以无法使用别的元素的 margin 将浮动元素推开，只能使用浮动元素将其他元素的内容推开。
- 为浮动元素后的元素添加可视化的背景颜色，可以看到浮动实际上和后面的元素盒子是重合的，缩小的其实是盒子中的行内/内容盒子，才营造出了浮动的效果。 ![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20240208170326.png)
- 如果我们只希望环绕其中一段文本而非全部，可以为后续的元素添加浮动清除属性，这样后续的元素就会依旧换行在这个元素完全到这个元素之下：
  ```css
  .cleared {
	clear: left;
  }
  /* 这里的clear支持left right和both 分别用于取消某一侧的浮动*/
  ```
- 如果我们将浮动和文本包裹在同一个 box 中，并添加背景的时候可能会存在下面这种现象：![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20240208171303.png) 而我们希望背景的颜色能将浮动元素包裹，这就需要我们取消盒子的浮动，这种情况下比较现代的方法是实用属性：`display: flow-root;` ![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20240208171420.png) 上面背景没覆盖的情况是因为我们在计算 box 背景的时候，由于浮动元素从正常的布局流中脱离出去了，因此计算元素高度的时候并不将其包裹在内，因此可以理解成，需要取消元素之后的盒子的浮动。

## Position 定位

基本的知识上面已经介绍了，这里不在重复，只添加一些额外的信息和知识点，详细介绍参考 [mdn](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Positioning)：

### Z-Index

该属性主要用于多个元素发生堆叠的时候谁在更上方，当存在多个绝对定位的元素的时候，这一点非常有用，可以为滚动的时候带来不同的效果。

简单的讲，z 轴就是以屏幕到你眼睛的向量为正向，因此 z 轴越大会在最上面，未被设置的时候都默认为 0，设置的时候使用如下代码：

```css
p:nth-of-type(1) {
  position: absolute;
  background: lime;
  top: 10px;
  right: 30px;
  z-index: 1;
}

```

### 绝对定位的父容器设置

默认是 html 页面的边缘，可以为父容器设置 relative 来实现绝对定位参考的边缘改为父容器。

### 滚动粘性位置

每个后续的粘性会替换上一个, 这里目前好像只看到的 dd 和 dt 的方法，别的还没看到，后续值得研究一下。