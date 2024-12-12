---
calendar_date: 2024-02-04
catalog: true
categories:
- 前端三剑客入门笔记
cover:
  image: /cover/cover9.jpeg
date: 2024-02-04 17:05:12
lang: cn
mathjax: false
subtitle: null
tags:
- Web
- CSS
thumbnail: /img/header_img/lml_bg9.jpg
title: LearnWeb08-CSS02-CSS入门
toc: true
---

>[!note]+
>1. 你永远无法记住所有的 CSS 属性，善用参考资料：[MDN CSS reference](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference) 和 GPT
>2. 善用浏览器的开发者面板在页面上及时编辑 CSS。

## CSS 运行逻辑

前面在 [LearnWeb00-Web入门](tmp/LearnWeb00-Web入门.md) 中简单提及了浏览器以及 CSS 起了什么作用，这里则是对于 CSS 是如何具体参与进页面的渲染的讲解，包括早该知道的 DOM 的定义也会在这里介绍，是 [CSS 是如何运行](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/First_steps/How_CSS_works)的读书笔记。

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20240205140358.png)

浏览器获取了 HTML 之后：

1. 会拉取其所依赖的所有 CSS，JS 和静态资源（Parser HTML）
2. 解析 HTML 代码，根据其中的 Tag、Class、ID 和相互之间的关系将 HTML 解析成 DOM ，每个元素作为其中的一个节点放进相对应的桶中。（元素桶、ID 桶之类）

紧接着，在拉取完 CSS 之后，浏览器开始解析 CSS，基于 CSS 中的选择器找到每个样式所属的 DOM 节点，并将其添加进去。

最后基于最终的 DOM(Document Object Model) 渲染出完整的页面，这里对 DOM 进行一个简单的解释：

> 一个 DOM 有一个树形结构，标记语言中的每一个元素、属性以及每一段文字都对应着结构树中的一个节点（Node/DOM 或 DOM node）。节点由节点本身和其他 DOM 节点的关系定义，有些节点有父节点，有些节点有兄弟节点（同级节点）。

此外浏览器在渲染过程中如果遇到了位置的 CSS 会直接跳过相应的 CSS ，然后渲染下一个规则。

 

## @规则

@rules(at-rules)是一类特殊的规则，"提供了关于 CSS 应该执行什么或如何表现的指令"。具体而言主要有以下两类：

第一类：引入别的样式文件

```css
@import "style/style2.css";
```

第二类：引入[媒体查询](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_media_queries)，按照媒体的样式（例如视窗的大小）来决定使用的样式，这一点也是为了响应式布局很重要的一点；

```css
body {
  background-color: pink;
}

@media (min-width: 30em) {
  body {
    background-color: blue;
  }
}
```

当窗口（可以通过调整浏览器宽度来改变）宽度>30em 时使用另外的背景颜色。

## 代码添加空白

>[!quota]+
>空白是指实际的空格、制表符和换行符。就像浏览器忽略了 HTML 中的空白一样，浏览器也忽略了 CSS 中的空白。空白的价值在于它可以提高可读性。

```css
body {
  font:
    1em/150% Helvetica,
    Arial,
    sans-serif;
  padding: 1em;
  margin: 0 auto;
  max-width: 33em;
}

@media (min-width: 70em) {
  body {
    font-size: 130%;
  }
}
```

可以使用 format 插件来对代码进行重构，增强代码的可读性。但是记得空白也不是随便用的，比如简写属性中的空白就用来区分不同的属性值，对于名称中的空白切分也会导致异常。

## 属性与值进阶

大多数情况下属性的值为关键词或者数值，但是也会有一些较为复杂的场景存在，例如简单的一些函数。

### Calc() 函数

```css
.outer {
  border: 5px solid black;
}

.box {
  padding: 10px;
  width: calc(90% - 30px);
  background-color: rebeccapurple;
  color: white;
}
```

```html
<div class="outer"><div class="box">内部盒子的宽度为 90% - 30px。</div></div>
```

上述的 width 使用 calc 将宽度表达为 90% - 30 像素，使用 Calc 可以执行一些简单的数值计算流程。

### Transform 函数

transform 属性通常用于图像变形，因此其取值通常为一些函数，这里以 rotate 为例。

```html
<div class:"box"></div>
```

```css
.box {
	margin: 30px;
	width: 100px;
	height: 100px;
	background-color: rebeccapurple;
	transform=rotate(0.8turn)
}
```

上述代码会得到一个旋转后的 box，诸如此类，[Transform](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform) 还有一些别的常用函数，后续可能会比较频繁的遇到，同样可以在 MDN 查询。

### 简写属性

>[!quota]+
>一些属性，如 [`font`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font)、[`background`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background)、[`padding`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding)、[`border`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border) 和 [`margin`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin) 等属性称为**简写属性**。它们允许在一行中设置多个属性值，从而节省时间并使代码更整洁。

典型的例子就是边框定义，需要定义四个方向的边框，如 `padding-top` 和 `padding-bottom`，可以使用 `padding` 直接定义四个值来节省时间，**顺序为顺时针（上右下左）**

```css
padding: 10px 15px 15px 5px;
```

更多的可以参考 MDN 的 [CSS 参考页面](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference)，找到更多简写资源如：[background](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background)

## 选择器进阶

基础 CSS 规则中介绍了一些基本的选择器类别，这里为选择器做相对进阶的介绍，包括一些选择器的组合和运算，一些其他的用法，还有一些特别的选择器。
### 同时选择多个元素

如果要选择多个类型的元素并为他们添加同一种规则集，可以使用 `，` 对不同元素进行分割如下。

```css
p,li,h1 {
  color: red;
}
```

上述代码会将列表，大标题，普通段落都使用红色渲染。

### 伪类选择器理解

参考[伪类和伪元素](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors/Pseudo-classes_and_pseudo-elements)，伪类选择器的名称可能会让人困惑，实际上可以理解为一些状态或者一些辅助类别，可能是选择**在特定状态**下的某些元素，举个例子，链接点击前后的不同颜色：

```css
a:link{
	color: pink;
}

a:visited{
	color: grey;
}
```

或者一些父子节点关系，如**选择元素的某一个部分而不是整个元素**，下面的例子选择 article 中作为第一个 child 的 p 元素，通常为第一段

```css
article p:first-child{
}
```

或者用一些选择特定子节点的伪类 `:nth-child(even)`，括号内接 index 为特定的子元素，也可以用 even 和 odd 指定奇偶，有特殊需求的时候可以去查表或者查 Chatgpt。
### 伪元素选择器

参考[伪类和伪元素](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors/Pseudo-classes_and_pseudo-elements)有一些特殊的元素，描述了一些特别的状态，例如：

- `::first-line`:选中第一行的内容
- `::before`: 在所有内容之前添加，可以插入一些辅助图标等
- `::after`:在所有内容之后添加，可以插入一些辅助图表等

举个例子，选择 article 部分的第一段的第一行：

```css
article p:first-child::first-line{
}
```

### 选择器组合方法

- **元素和类选择器嵌套**：如果使用了 `p.my-class` 作为选择器，含义是只选择 p 元素中类名为 my-class 的元素，这个时候 a 元素的 my-class 就会被忽略。
- **类选择器嵌套**：如果使用了 `.log.warning` 作为选择器，则会选择出 log 类中的 warning 类的元素，这里补充一个知识，就是 HTML 一个元素定义多个类的方式 `<p class="log warning">` 使用空格分割
- 使用空格**后代选择**：下述代码的选择器会选中 list 中的所有 em 元素，不在 list 中的 em 元素会被忽略，使用方法是基于先后顺序，以及使用空格分开。

```css
li em {
	color:red;
}
```

- 使用 `+` **相邻选择**符：下述代码会选中与 `h1` 相邻的 `p` 中的 `span` 元素

```css
h1 + p span{
  font-size: 200%;
  color: red;
}
```

- 使用 `>` **子代关系选择符**：只会选中子代，孙代及以上的不会被选中
- 使用 `~` **兄弟关系选择符**：举个例子，下述代码会选中 h1 之后的所有 p 元素。

```css
h1 ~ p {
}
```

### 全局选择器 `*`

`*` 全局选择器，选中文档中的所有内容（或者是父元素中的全部内容），通常用于和其他元素组合，避免一些选择器组合中的歧义，例如和伪类选择器组合，选择第一个子元素的情况。

```css
article :first-child {
}
```

上述代码用来选择 article 中的第一个子元素，但是该写法容易和下述写法混淆

```css
article:first-child{
}
```

而该写法表示的则是任何作为第一个子元素的 article 元素，意义上完全不同，因此为了可读性和可维护性，建议引入全局变量如下：

```css
article *:first-child{
}
```

表达了作为 article 元素中第一个子元素的任何元素，则符合我们的需求，也不容易产生混淆。

### 属性选择器

属性选择器引入了部分正则的语法，可以较为灵活的判断属性值是否（以某种形式）包含了某个 Value，基础的语法如下：

```css
[attr]{
}
```

该语句选择具有 `[attr]` 属性的所有元素，当然也可以和其他的选择器做组合，这里后续不在赘述。

如果需要指定 attr 的值，有以下的多种方式：

- `[attr=value]`: 存在只有一个且正好相等
- `[attr^=value]`: 存在至少一个以 value 开头的属性
- `[attr$=value]`: 存在至少一个以 value 结尾的属性
- `[attr*=value]`: 存在至少一个含有 value 的属性
- `[attr~=value]`: 完全相等或者包含一个 value
- `[attr|=value]`: 匹配 value 或者以 value 加连字符开头的属性值
- ...

如果希望属性值大小写不敏感，可以添加 i 如下：

```css
[attr i]
```

## 页面样式渲染逻辑

会有同个元素被多个选择器渲染的情况，这种情况下会基于**层叠**（cascade）和**优先级**（specificity）规则对元素进行渲染。

### 样式渲染规则

**规则一：后出现的规则会覆盖先出现的规则（即层叠规则）**

```css
p { color: red; }
p { color: blud; }
```

在同等优先级的情况下 `css` 后出现的会覆盖之前出现的，可以理解为按顺序声明的语句。

**规则二：更具体的选择器具备更高的优先级：**

```css
.special { color: blue; }
p { color: red; }
```

```html
<p class="special">我是什么颜色的？</p>
```

例如上述 Case 中，css 中 special 的定义是在段落的基础之前的，因此段落文本理论上首先被渲染为蓝色，后续被 p 的红色覆盖，但是由于 special 作为类，被认为是比基础标签 p 的优先级更高，因此最终会被渲染成蓝色；

**具体的权重计算规则：**

一个选择器的优先级可以说是由三个不同的值（或分量）相加，可以认为是百（ID）十（类）个（元素）——三位数的三个位数：

- **ID**：选择器中包含 ID 选择器则百位得一分。
- **类**：选择器中包含类选择器、属性选择器或者伪类则十位得一分。
- **元素**：选择器中包含元素、伪元素选择器则个位得一分。

此外还有**内联样式**：总是最高优先级; 以及特殊的属性值  `!important` 也是默认为**最高优先级**

因此，由于优先级的存在，有时候某个元素可能会不按照预期渲染，这种时候查看被多少个选择器选中并进行调整即可。且优先级计算的时，由于有 `!important` 特殊属性值的存在，因此并不总是按照组来整体应用和计算。`@important` 和其他的属性不同，是先定义的优先级更高。

### 样式继承关系

> 子元素的例如颜色，字体等属性是会继承父元素的，而像是 box 相关的边框属性（边框边距等）是不会继承的，否则设置了一个相对 page 为 50%的 box，其中的子元素直接指数级缩小可还得了。

🔥[mdn YTB 视频教程：如何使用开发者工具来检查级联和优先级](https://youtu.be/Sp9ZfSvpf7A)： 在 rule 面板会列出所有的规则，可以点击元素旁边的按钮来定位，也可以直接在页面上修改，且位于越上方的规则其权重越重。在规则页面的下方也会有继承的面板。

当然也可以手动的调整和控制继承，CSS 定义了五个特殊的**通用属性值**，用来简化部分内容重写的工作：

- `inherit` 继承父元素的对应属性值，实际上就是开启集成
- `initial` 将属性还原初始值
- `revert` 还原为浏览器的默认样式，大多数情况下=unset
- `revert-layer` 将属性值还原为上一个层叠层中建立的值
- `unset` 重置为自然值，如果属性是自然继承就是 inherited, 否则就是 initial。

可以结合 `all` 属性将所有属性重置。

### 级联层顺序

级联层相当于是将 css 分成几个大组，同样还是后声明的优先级更高，同样 import 还是个例外是相反的。未包含在某个级联层的则会默认放在最后一个未命名的组中声明，因此会有最高的优先级。

下面给个级联层的定义例子，这个特性暂时不需要掌握，后续再看。

```css
@layer firstLayer, secondLayer;

p { /* 0-0-1 */
  background-color: red;
  color: grey !important;
  border: 5px inset purple;
}
p#addSpecificity { /* 1-0-1 */
  border-style: solid !important;
}

@layer firstLayer {
  #addSpecificity { /* 1-0-0 */
    background-color: blue;
    color: white !important;
    border-width: 5px;
    border-style: dashed !important;
  }
}

@layer secondLayer {
  p#addSpecificity { /* 1-0-1 */
    background-color: green;
    color: orange !important;
    border-width: 10px;
    border-style: dotted !important;
  }
}
```