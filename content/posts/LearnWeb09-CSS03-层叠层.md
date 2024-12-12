---
calendar_date: 2024-02-06
catalog: true
categories:
- 前端三剑客入门笔记
cover:
  image: /cover/cover22.jpeg
date: 2024-02-06 10:48:11
lang: cn
mathjax: false
subtitle: null
tags:
- Web
- CSS
thumbnail: /img/header_img/lml_bg10.jpg
title: LearnWeb09-CSS03-层叠层
toc: true
---

>[!summary]+ 
>本章节是额外对于优先级的补充章节，在使用上可能会没有明显的感知，但是从概念上理解 CSS 的优先级和后续复杂项目的开发中还是起到了比较大的作用，该章节介绍层叠层的概念，在原先的优先级判定上添加了层的概念。

## 层叠概念回顾

该 Section 内容完全摘录自 MDN CSS 教程，也算是对于整体重要性和优先级的一个很好的总结。

1. **相关声明**：找到所有具有匹配每个元素的选择器的声明代码块。
2. **重要性**：根据规则是普通还是重要对规则进行排序。重要的样式是指设置了 [`!important` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/important "Currently only available in English (US)") 标志的样式。
3. **来源**：在两个按重要性划分的分组内，按作者、用户或用户代理这几个来源对规则进行排序。
4. **层**：在六个按重要性和来源划分的分组内，按层叠层进行排序。普通声明的层顺序是从创建的第一个到最后一个，然后是未分层的普通样式。对于重要的样式，这个顺序是反转的，但保持未分层的重要样式优先权最低。
5. **优先级**：对于来源层中优先权相同的竞争样式，按[优先级](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Specificity)对声明进行排序。
6. **出现顺序**：当两个来源层的优先权相同的选择器具有相同的优先级时，最后声明的具有最高优先级的选择器的属性值获胜。

CSS 渲染过程中会逐步往下选择，如果在中间已经决出了胜负就不会继续往下，例如对一个元素在每个来源中只有一个定义，那么在来源层就可以决出胜负，无需往下了，而若获胜的来源中有多个层定义了同个属性，那么就会对比各个层的优先级，诸如此类。

其他的部分前文已经基本提到了，接下来补充来源和层的两个概念。

>![note]+
> 三个来源中的：'用户代理'指的是浏览器，用户指的是网站访问者，作者指的是网站开发者，浏览器内部将来自这三个来源的样式表进行来源的排序。

### 来源的优先级排序

有三种[层叠来源类型](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Cascade#origin_types)：用户代理样式表、用户样式表和作者样式表。浏览器根据来源和重要性将每个声明分为六个来源分组。有八个优先权级别：六个来源分组、正在过渡的属性和正在动画的属性。优先权的顺序是从具有最低优先权的普通用户代理样式，到当前应用的动画中的样式，到具有最高优先权的重要用户代理样式，再到正在过渡的样式：

1. 用户代理普通样式
2. 用户普通样式
3. 作者普通样式
4. 正在动画的样式
5. 作者重要样式
6. 用户重要样式
7. 用户代理重要样式
8. 正在过渡的样式

用 [`<style>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/style) 元素直接在元素上声明的样式是作者样式。不包括动画和过渡样式，用户代理普通样式具有最低优先权；用户代理重要样式具有最高优先权。

 

### 层叠层的概念和作用

**概念:** 结合上述两个 section 的内容，我认为层叠层实际上就是引入一个 `layer` 的概念，在编写 CSS 的时候将规则放到不同的层中，用来更加方便的区分优先级，就想一层一层的给网页刷上样式一样，越往后的优先级默认越高；其中仅有一个例外就是限定了 `!important` 的规则，他就像是一个占位符，预先确定了某个元素的样式，基于该规则进行"拓展"，因此其越早出现优先级越高。

**作用:**

- 通过这种方式便于多人同时开发时的协作，复杂项目时的持续开发和维护等，也以一种类似分桶的方式便于 Debug 样式的问题，使得 CSS 的逻辑更加清晰。
- 层叠层中还允许创建嵌套层，例如每个人使用的组件库不同时，可以各自将组件库嵌入自己的层中，消除组件库的定义与其他人的样式冲突，同时也确保开发过程中能够方便的使用和调整组件库而无需考虑优先级。

因此具体使用的时候，我们可以使用嵌套层的方式，将默认样式、第三方组件、主题等等首先嵌入层中，然后在开始继续的开发，这样在处理优先级的时候我们就无需考虑也无需解决跨层的冲突。

## 层叠层使用

- 使用 `@layer` 声明 at 规则，使用 `@layer` 后跟一个或者多个层的名称来声明层，这将创建一个没有任何样式的具名层；
- 使用 `@layer` 块 at 规则，在快中的所有样式都将添加到一个命名或者未命名的层中
- 使用具有 `layer` 关键字或 `layer()` 函数的 `@import` 规则，将导入文件的内容分配到该层中。

在尚未初始化具有相同名称的层的情况下，这三种方法中的任何一种都会创建一个层。如果在 `@layer` at 规则或带有 `layer()` 的 `@import` 中没有提供层名称，则将创建一个新的匿名层。

1-2 的区别实际上就是先声明或者带初始值声明，例如以下的 cpp 代码

```cpp
// 第一种
std::vector<int> a_arr;
a_arr.push_back({1,2,3});
// 第二种
std::vector<int> a_arr = {1, 2, 3};
```

**备注：** 层的优先顺序是它们创建的顺序。不在层中的样式，或者称为“未分层样式”，会层叠到最终的隐式标签中。

### 使用 `@layer` 声明 at 规则

```css
@layer theme, components, default;
```

通常在 CSS 的第一行进行层的声明，避免有些规则漏掉导致没办法使用层完全控制样式的优先级，上述层的出现顺序即是声明的顺序，可以看到我们是先刷了一层主题，再往上刷组件，刷默认值，最后剩下的是我们最后自定义和调整的内容（未添加到具体名称里的会自动添加到匿名层中，且最后定义）。

此外需要注意的是，如果上述三个层并非放在最上方，而且有一些层已经被定义了，那么被定义的层在这里不会再次声明，而只会被忽略，剩下的层将添加在已有的层之后，所以推荐还是在最前面定义。

### 使用 `@layer` 块 at 规则添加具体的样式

```css
@layer theme{
	main {
		display: grid;
	}
}
```

使用块 at 规则可以：创建层并将块内的样式初始化添加进该层。如果没有指定 theme 名称的话，则会创建匿名层，每次未命名都会创建一个新的匿名层，而不是共用同个匿名层，这些匿名层也没办法往里面添加样式了。

### 使用媒体查询来创建层

同样考虑到不同的设备尺寸，让我们通过媒体查询来决定是否定义某些层，这样也可以用来做页面的响应式设计，在不同的设备上生效不同的层即可，具体的代码范例如下：

```css
@media (min-width: 50em) {
  @layer site;
}

@layer page {
  h1 {
    text-decoration: overline;
    color: red;
  }
}

@layer site {
  h1 {
    text-decoration: underline;
    color: green;
  }
}
```

这样在宽屏上，事先定义的则是 site，否则为 page，这样就会使得样式发生变化，从而实现页面的响应式设计。

### 使用 `@import` 将样式表导入层

> 这一部分直接节选自 MDN，描述得很清楚了。

[`@import`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@import) 规则允许用户直接从其他样式表导入样式规则到 CSS 文件或 [`<style>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/style) 元素中。

导入样式表时，必须在样式表或 `<style>` 块中的任何 CSS 样式之前定义 `@import` 语句。`@import` 语句必须出现在最前面，在任何样式之前，但可以在创建一个或多个层而不向这些层分配任何样式的 `@layer` 规则之后（`@import` 也可以在 [`@charset`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@charset) 规则之后）。

你可以将样式表导入具名层、嵌套具名层或匿名层。以下层分别将样式表导入 `components` 层、`components` 层中的嵌套 `dialog` 层和一个未命名层：

```css
@import url("components-lib.css") layer(components);
@import url("dialog.css") layer(components.dialog);
@import url("marketing.css") layer();
```

这里注意层的嵌套使用的是 `.` 符号，无论是命名，引用，添加样式表到该嵌套层，都使用的这个符号，使用 import 导入的嵌套层会默认在该层的末尾，吧    但是在同层中，非嵌套的样式会优先于普通嵌套的样式，嵌套层之间的优先级则基于顺序决定。

你可以将多个 CSS 文件导入到单个层中。以下声明将两个单独的文件导入到单个 `social` 层中：

```css
@import url(comments.css) layer(social);
@import url(sm-icons.css) layer(social);
```

你可以使用[媒体查询](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_media_queries/Using_media_queries)和[特性查询](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_conditional_rules/Using_feature_queries)根据特定条件导入样式并创建层。以下将样式表导入到 `international` 层，但前提是浏览器支持 `display: ruby`，而且被导入的文件取决于屏幕的宽度。

```css
@import url("ruby-narrow.css") layer(international) supports(display: ruby) and
  (width < 32rem);
@import url("ruby-wide.css") layer(international) supports(display: ruby) and
  (width >= 32rem);
```

### 层的优先级

整体判断优先级的逻辑和之前整理的是一致的，这里就简单给一下 MDN 中提到的总结。

- 层的优先权顺序是创建层的顺序。
- 一旦创建，就无法更改层顺序。
- 普通样式的层优先权是创建层的顺序。
- 未分层普通样式优先于有层普通样式。
- 重要样式的层优先权被反转，早期创建的层具有优先权。
- 所有有层的重要样式都优先于未分层的重要（和普通）样式。
- 普通内联样式优先于所有普通样式，无论是否分层。
- 重要内联样式优先于所有其他样式，正在过渡的样式除外。
- 作者样式无法覆盖重要内联样式（过渡除外，但这是临时的）

嵌套层的层叠优先权顺序与常规层类似，但包含在层内。优先权顺序基于嵌套层创建的顺序。**层中的非嵌套样式优先于嵌套的普通样式**，对于重要样式则相反。嵌套层之间的优先级权重并不重要，但它在嵌套层内的冲突样式中确实很重要。