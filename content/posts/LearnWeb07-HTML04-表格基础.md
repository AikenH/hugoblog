---
calendar_date: 2024-02-04
catalog: true
categories:
- 前端三剑客入门笔记
cover:
  image: /cover/cover8.jpeg
date: 2024-02-04 16:30:09
description: null
lang: cn
mathjax: false
tags:
- Web
- HTML
thumbnail: /img/header_img/lml_bg8.jpg
title: LearnWeb07-HTML04-表格基础
toc: true
---

> [!summary]+
> HTML 中需要使用 CSS 进行样式组合才能得到一个阅读体验较好的表格，目前还是先专注在 HTML 的部分，后面到 CSS 部分的时候再合起来一起看。

本文主要是参考 [MDN 范例](https://mdn.github.io/learning-area/html/tables/basic/personal-pronouns-styled.html)中的源码以及对应的文章 [HTML 表格基础](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Tables/Basics)的一篇阅读笔记。

## 表格基础

从源码开始我们可以看到表格对应的 Tag 核心的一下几个：

- `<Table>` 包裹整个表格
- `<caption>` 设置表格的标题
- `<tr>` 一行一行的包裹表格，全称应该是 table row

可以看到 HTML 中编写表格是使用 `<tr>` 进行逐行编写的，逐行的描述整个表格：

- 用 `<td>` 描述表格的内容语义，table data
- 用 `<th>` 描述表格的标题语义，即首行首列的标题元素 table header

主要的元素就是上面这些，但是复杂的表格包括：合并的单元格（纵向和横向）需要再 `th` 和 `td` 中使用额外的属性来定义：`colspan` 和 `rowspan`

- `colspan="2"` 属性定义占据两个单元格宽度（横向合并）
- `rowspan="3"` 属性定义占据三个单元格的宽度（纵向合并）

然后每个 tr 中排除掉被合并的单元格还需要多少个 td 需要我们自己计算。

### HTML 的表格基础样式

可以使用 `colgroup` 和 `col` 为整列设置同样的样式，每个 col 元素代表一列，如果需要一条元素定义多列的样式的时候可以使用 span 属性，下述代码会将第二列背景设置为黄色。

对单个单元格设置样式可以仿照使用 style 属性来嵌入对应的 css 样式，包括宽度什么的。

```html
<table>
  <colgroup>
    <col />
    <col style="background-color: yellow" />
  </colgroup>
  <tr>
    <th>Data 1</th>
    <th>Data 2</th>
  </tr>
  <tr>
    <td>Calcutta</td>
    <td>Orange</td>
  </tr>
  <tr>
    <td>Robots</td>
    <td>Jazz</td>
  </tr>
</table>
```

### HTML 表格结构化

>[!quota]+
>由于表格在结构上有点复杂，如果把它们定义得更加结构化，那会帮助我们更能了解结构。一个明确的方法是使用 [`<thead>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/thead)、[`<tfoot>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/tfoot) 和 [`<tbody>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/tbody)，这些元素允许你把表格中的部分标记为表头、表尾、表体三部分。

这样的结构化实际上没有什么默认 style，主要是帮助我们后续定义各个部分的样式。

## 其他

- 表格元素支持嵌套
- 使用 [scope 属性](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Tables/Advanced#scope_%E5%B1%9E%E6%80%A7) 来支持视障人士来理解这个表格