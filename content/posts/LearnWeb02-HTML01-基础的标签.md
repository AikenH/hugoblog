---
calendar_date: 2024-01-31
catalog: true
categories:
- 前端三剑客入门笔记
cover:
  image: /cover/cover3.jpeg
date: 2024-01-31 15:00:58
description: null
lang: cn
mathjax: false
tags:
- Web
- HTML
thumbnail: /img/header_img/lml_bg3.jpg
title: LearnWeb02-HTML01-基础的标签
toc: true
---

> [!Intro]+
> 在 Web 入门，How HTML Work 部分已经简单介绍过，HTML 是一种定义内容结构的标记语言，通过一系列标记（确定其表现形式）和对应内容组成的元素，嵌套，排列，构成完整的页面。本文主要是整理和熟悉一下基础的标记元素

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20240131110224.png)

REF: [HTML 入门](https://developer.mozilla.org/zh-CN/docs/Learn/Getting_started_with_the_web/HTML_basics)

从上述图像可以看到一个基本的 HTML 元素的构成，元素的 Tag 可以包含属性，**多个属性之间用空格隔开**，Class 属性可以为元素标识名称，进而为其指定 Style 等。

属性通常为 K-V 键值对，attr="value" 的形式呈现，这里引号可以是单或者双，甚至可以没有，但是没有引号有时候会导致问题，所以建议保持使用引号的风格去编写。

## Head/Overview 部分

参考网站中的范例如下，一个基本的 HTML 文件有以下这些可以注意的地方：

```html
<!doctype html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>My test page</title>
  </head>
  <body>
    <img src="images/firefox-icon.png" alt="My test image" />
  </body>
</html>
```

- `<head>` 就如 cpp 中的 head 文件，定义一些不用于向用户显示的内容，给浏览器的关键词，字符集声明，页面描述等内容
- `<meta charset="utf-8">` 定义文档使用的字符串编码类型，utf-8 支持世界上大部分语言的渲染，避免因为中文等出现乱码的情况。
- `<meta name="viewport" content="width=device-width">` 视口元素，可以确保页面以视口宽度进行渲染，避免移动端浏览器上因页面过宽导致缩放。
- `<title>` 对当前网页的描述和注解，显示在标签栏中，以及收藏时显示的文字
- `<body>` 部分则是包含网站的全部需要显示的内容。

 

## Body 部分常见元素

**标题**：例如 markdown 中的 `##` 定义各级标题，Html 中使用 `<hn>` n 从 1-6 定义网页的各级标题，一般最多用到 3-4 级；

**段落**：按照 word 中的段落来理解，基本为常规的文本内容，段落间和段落内的间距会有所区别，使用标签 `<p>` 来定义段落；

**列表**：分为无序列表 `<ul>` 和有序列表 `<ol>` 两种，无论是那种列表，具体的每一个列表项使用 `<li>` 定义，具体例子如下(列表中也可以嵌套别的列表)

```html
<p>here is a example for list</p>

<ul>
	<li>item1</li>
	<li>item2</li>
</ul>

<p>if u want ordered list, change ul to ol.</p>
```

此外还存在**空元素**（图像元素），即不需要 Content 内容部分的元素，如图像元素，这是因为图像元素本身就是内容，具体的元素例子如下：

```html
<img src="https://<img-url->" alt="the alias of this img" />
```

图像元素的 tag 即 `img`, src 定义了图像的来源，可以是网站或者文件路径，alt 为图像的注解，为视障人士或者图像加载过程中，显示的图像元素的占位或注解。

> 空元素无需再末尾添加/但是加上也没问题，加上也能使其作为有效的 XML 格式

**超链接**：例如 markdown 中的 `[]()`, Html 使用 Anchor 标签 `<a>` 和指定属性 href 即 `()` 以及显示的内容(content)也即 `[]` 来共同完成一个超链接, 以跳转到 google 为例：

```markdown
[google](https://www.google.com)
```

```html
<a href='https://www.google.com'>google</a>
```


## Example 尝试

尝试一个 Dashboard 界面，加载一张基础图片，然后使用各个元素来列出一些服务。

```html
<!DOCTYPE html>
<html>
<head>
	<title>Aikenhong Dashboard for Home Sevices</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body>
    <h1> Welcome to Aikenhong Dashboard for Home Services</h1>
    <img src="https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/80a5366f89dfbd27ec46f669e0eac84.jpg" alt="Aikenhong Logo">
    <H3> Intro:
    <p> 网站对中文提供支持，希望大家有一个友好的访问体验。</p>
    <H3> Links </H3>
    <ul>
        <li><a href="https://www.aikenh.cn/">myBlog</a></li>
        <li><a href="https://www.aikenh.cn/about/">About Us</a></li>
        <li><a href="https://metisy.cool/">Metisy</a></li></a>
    </ul>
</body>
</html>
```

## FI