---
calendar_date: 2024-02-07
catalog: true
categories:
- 前端三剑客入门笔记
cover:
  image: /cover/cover12.jpeg
date: 2024-02-07 15:06:05
lang: cn
mathjax: false
subtitle: null
tags:
- Web
- CSS
thumbnail: /img/header_img/lml_bg13.jpg
title: LearnWeb12-CSS06-表格样式处理
toc: true
---

>[!summary]+
>表格的部分主要还是要实操，[MDN](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Styling_tables) 中给了一个例子，这里给我的启示是要更多的去阅读[表格的相关属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_table)，或者去阅读别人对表格设计中用到的元素，才能更好的掌握一些设计的思路，这里就给出本文中给出的一些常见的属性和设置方法，后续在具体实践中慢慢补充。

```css
table{
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  border: 3px solid purple;
}

thead th:nth-child(1) {
  width: 30%;
}

thead th:nth-child(2) {
  width: 20%;
}

thead th:nth-child(3) {
  width: 15%;
}

thead th:nth-child(4) {
  width: 35%;
}

th,
td {
  padding: 20px;
}
```

- 当为表格设置初始样式的时候，使用 layout 为 fixed 会使得表格的行为更好预测，避免由于内容产生的畸变导致难以设置或者出现一些奇怪对齐情况，使用 fixed 然后设置每一列的宽度，在对内容进行处理可能更好。
- 使用 `nth-child` 设置每一列的宽度，最终相加为 100%，使得在不同分辨率下比较好控制。
- `border-collapse: collapse;` 原本两个格子之间会有两条边线，这样的话可以合并重叠的边线，让表格更符合我们的预期。
- 使用 `text-align` 设置对齐方式
- 使用 `thead`，`tfoot`，`tbody` 来分别设置样式，可以做出类似三线表之类的东西
- 为标题 `caption` 设置对应的样式

后续可能会找一些比较常见的表之类的来整理，& 查看一下组件库。