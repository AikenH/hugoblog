---
calendar_date: 2024-02-02
catalog: true
categories:
- 前端三剑客入门笔记
cover:
  image: /cover/cover6.jpeg
date: 2024-02-02 14:09:15
lang: cn
mathjax: false
subtitle: null
tags:
- Web
- HTML
thumbnail: /img/header_img/lml_bg6.jpg
title: LearnWeb05-HTML02-要素察觉
toc: true
---

>[!summary]+
> 本章节在 HTML01 的基础上加深对于一些基础概念，标签等的认知，还是以 HTML 编写的基础知识为主。

## 块级元素和内联元素

块级元素和内联元素就像 Markdown 的内联代码和代码块两种写法，一个需要另起一行且会占据行，下一个元素必须另起一行，如 `<p>` 段落等。而内联元素就是可以嵌入行内，内联元素前后都无需换行，一般如强调，高亮，超链接一类。

- 正是由于这种结构，**块级元素**在使用的时候除了内容，往往还承担着**网页的结构**相关的工作，如页眉，页脚, 列表，导航栏等等；
- **块级元素**不会嵌套在内联元素中，但是可能嵌套在另一个块级元素中。
- **内联元素**则通常在块级元素中和文本一起使用。

> 需要注意的是这类元素分类是过时的，HTML 定义了更加详细具体的分类，为了便于理解暂时使用旧的定义来做简单的区分。

## 布尔属性

前文提到过，属性通常以 k-v 键值对的形式呈现，但是有部分属性是没有值的，其 key 通常与值有着相同的含义，如 `disabled`，该布尔属性本身就代表着禁用，例如输入框 `<input>` 禁用就会阻止用户的输入。

```html
<input type="text" disabled />
```

这样就会创建一个无法输入的输入框，通常会以灰色呈现，type 则限制了输入框的输入类型。

 

## HTML 头部

html01 中已经简单介绍过一些在 HTML Head 中的元素，这里主要为其中的元素添加更为详细的说明
### 添加页面图标

页面添加网页图标的方式有：

1. 将其保存在与网站的索引页面相同的目录中，以 `.ico` 格式保存（大多数浏览器支持更通用的格式，如 `.gif` 或 `.png`）
2. 将以下行添加到 HTML 的 [`<head>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/head) 块中以引用它，可能会看到很多其他针对不同设备保存不同图标的代码，也会用类似的语句写在这里。

```html
<link rel="icon" href="favicon.ico" type="image/x-icon" />
```

### 设置主语言

例如在 `<html lang='zh-CN'>` HTMl 标签中加入 lang 属性为整个页面设置中文标签，这是为了搜索引擎的"搜索特定语言的页面"等功能提供支持。

也可以分段添加语言信息（可能为了视障人士设计，阅读时候切换语言）

```html
<p>Japanese example: <span lang="ja">ご飯が熱い。</span>.</p>
```

### Meta 元数据

元数据就是描述数据的数据，实际上所有在 Head 部分的数据都能称之为元数据，包括 JS，CSS 引用等等。而 HTML 有一个“官方的”方式来为一个文档添加元数据—— [`<meta>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta) 元素。用来指定网页编码的如下代码就是使用的 meta tag

```html
<meta charset="utf-8" /> 
```

正确的使用需要的编码能避免渲染时出现乱码，Meta 除了设置字符编码的元数据，还有以下的其他用法，大多是用于各个网站的专有元数据：

Meta 标签中包含的**name**和**content**属性，分别对应元素的说明，和元素的具体的值，可用来添加作者信息，详细描述，联系方式等额外信息，这些字段有如下的用处：

- 用于爬虫或者一些**自动化处理**的工作
- **SEO 优化**，使得网页在搜索引擎上出现的更多，例如 `description` 中的信息也会被搜索引擎用于搜索结果。

> 在谷歌搜索里，在主页面链接下面，你将看到一些相关子页面——这些是站点链接，可以在 [Google's webmaster tools](https://search.google.com/search-console/about) 配置——这是一种可以使你的站点对搜索引擎更友好的方式。

> 许多 `<meta>` 特性已经不再使用。例如，keyword `<meta>` 元素（`<meta name="keywords" content="fill, in, your, keywords, here">`，为搜索引擎提供关键词，用于确定该页面与不同搜索词的相关性）已经被搜索引擎忽略了，因为作弊者填充了大量关键词到 keyword，错误地引导搜索结果。

不同的网站（如 Facebook 之类的社交平台），涉及到网站分享，可能会有一些特有的元信息协议，让我们的网站可以为其提供更多额外的信息，如 logo 之类的，在分享的时候就能呈现出来。

## BODY 主体

### 无语义标签

除了 HTML01 中介绍的一些涵盖语义的标签（如 h1 等标题语义可能会在 web 的各种延伸应用中被使用，如阅读或搜索），还有一些不含语义的元素如

- 块级的 `<div>`
- 内联级的 `<span>`

这些元素是为了标记部分内容，便于开发者对其实现样式或者动态规则等的设置出现的，举个例子

```html
<span style="font-size: 32px; margin: 21px 0; display: block;">这是顶级标题吗？</span
>
```

span 没有含义和任何样式，该标签可以提供 class,id 等属性，使其可以用 css（如果是统一格式最好使用外嵌 css 文件的方式）进行控制。

>The `<span>` element is a very generic inline container that doesn't inherently represent anything. It can be easily styled with CSS or manipulated with JavaScript, making it a versatile tool for web developers to create specific styles or behaviors on parts of their content.【CHATGPT】

这些元素最好在找不到合适的语义描述的时候再进行使用，避免滥用导致代码可读性降低。
### em & Strong 强调

- `<strong>` 强烈（语义），显示未粗体，如果只是为了展现斜体而非强调，建议使用 span 和 css 样式，或者 `<b>`，不要使用该含语义的标签。
- `<em>` 强调（语义），显示为斜体，如果只是为了展现斜体而非强调，建议使用 span 和 css 样式，不要使用该含语义的标签。

### a 超链接

基础用法这里不再过多描述，下面给出一个简单的例子，然后就补充一些详细的描述。

```html
<a href='https://www.google.com'>google</a>
```

超链接可以包裹几乎一切其他的 tag，图片的也行

- 除了 href 属性，还可以使用 `target="_blank"` 属性使得页面在新标签页中打开，
- 使用 title 属性，添加即将跳转的页面的提示信息，悬停提示。
- 使用 download 属性，为下载链接下载的文件提供默认名称。
- 电子邮件地址可以在 href 中写为 `href=mailto:youremail@mail.com` 的话，打开的邮件会自动填充收件人

除了跳转链接还可以跳转到文档的特定部分，但是这要求给文档的各个部分添加 `id` 属性用于标识，一般用于标题 `hn`

```html
<h2 id='h2'>Title2</h2>
参见<a href="some.html#h2">第二章</a>的内容
```

如果是同个文件的话文件路径/文件名可以省略，在 `#` 后面添加对应 id 即可。

### dl 描述列表

描述列表对应的是一种独特的列表，其主要用于一些类似术语说明的场景，用来标注一组：术语&释义或者问题&答案。其基本使用方式为 `<dl>` description list 包裹整个组，列表中的每一项术语/问题用 `<dt>` description term 标记，回答/释义用 `<dd>` description definition 包裹，下面给出一个例子：

```html
<dl>
	<dt>谁是电影奥本海默的导演</dt>
	<dd>诺兰</dd>

	<dt>奥本海默的男主角扮演的角色是什么职业</dt>
	<dd>物理学家</dd>
</dl>
```

### blockquota 引用块和行内引用

- 块级内容的引用使用 `<blockquota>` 包裹，里面使用 `<cite>` 属性来描述引用的地方（实际上 cite 属性在大多数浏览器等地方都没有很好的利用，如果要显示要自己编写）
- 行内引用使用 `<q>` 包裹对应的部分，同样建议添加 `<cite>` 属性。

### Code 代码块

- [`<code>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/code)：用于标记计算机通用代码。
- [`<pre>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/pre)：用于保留空白字符（通常用于代码块）——如果文本中使用了缩进或多余的空白，浏览器将忽略它，你将不会在呈现的页面上看到它。但是，如果你将文本包含在 `<pre></pre>` 标签中，那么空白将会以与你在文本编辑器中看到的相同的方式渲染出来。
- [`<var>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/var)：用于标记具体变量名。
- [`<kbd>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/kbd)：用于标记输入电脑的键盘（或其他类型）输入。
- [`<samp>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/samp)：用于标记计算机程序的输出

主要的应该就是 pre 和 code 标记代码块内容，然后在正文编写的时候可以使用 var 标记变量。后面额外的这些标签主要应该是为了方便代码渲染，包括输入输出的区分等。

### 其他

- `<abbr title="全名">` 来包裹一个缩写，使得鼠标浮动的时候显示全称
- `<address>` 标记联系方式，不知道有啥用
- `<sup>` 上标，`<sub>` 下标
- `<time datetime="2024-02-02">` 2024 年 2 月 2 日 `</time>` 标记时间，主要是为了给计算机或者脚本提供一个更好解析的时间，避免很多不同种类的时间描述带来处理上的麻烦。
- `<br>` 提供换行
- `<hr>` 提供分割线

## Layout 页面布局

> 对 HTML 这些元素的合理应用能够从 HTML 就很好的"描述"整个页面的布局，也会给视障用户带来便利。为其清楚的了解页面的布局。

一个标注的页面通常包含以下的元素：（该部分直接摘录自 [MDN](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure)），对应的 html 标记元素

[页眉 `<header>`](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure#%E9%A1%B5%E7%9C%89)：通常横跨于整个页面顶部有一个大标题和/或一个标志。这是网站的主要一般信息，通常存在于所有网页。

[导航栏 `<nav>`](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure#%E5%AF%BC%E8%88%AA%E6%A0%8F)：指向网站各个主要区段的超链接。通常用菜单按钮、链接或标签页表示。类似于标题栏，导航栏通常应在所有网页之间保持一致，否则会让用户感到疑惑，甚至无所适从。许多 web 设计人员认为导航栏是标题栏的一部分，而不是独立的组件，但这并非绝对；还有人认为，两者独立可以提供更好的 [无障碍访问特性](https://developer.mozilla.org/zh-CN/docs/Learn/Accessibility)，因为屏幕阅读器可以更清晰地分辨二者。

[主内容 `<main>`](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure#%E4%B8%BB%E5%86%85%E5%AE%B9)：中心的大部分区域是当前网页大多数的独有内容，例如视频、文章、地图、新闻等。这些内容是网站的一部分，且会因页面而异。

[侧边栏 `<aside>`](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure#%E4%BE%A7%E8%BE%B9%E6%A0%8F)：一些外围信息、链接、引用、广告等。通常与主内容相关（例如一个新闻页面上，侧边栏可能包含作者信息或相关文章链接），还可能存在其他的重复元素，如辅助导航系统。

[页脚 `<footer>`](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure#%E9%A1%B5%E8%84%9A)：横跨页面底部的狭长区域。和标题一样，页脚是放置公共信息（比如版权声明或联系方式）的，一般使用较小字体，且通常为次要内容。还可以通过提供快速访问链接来进行 [SEO](https://developer.mozilla.org/zh-CN/docs/Glossary/SEO)。

针对上述这些标签，有以下的一些其他说明

- [`<main>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/main)：主内容。主内容中还可以有各种子内容区段，可用[`<article>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/article)、[`<section>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/section) 和 [`<div>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/div) 等元素表示。
- [`<aside>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/aside)：侧边栏，经常嵌套在 [`<main>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/main) 中。

理解所有 HTML 区段元素具体含义是很有益处的，这一点将随着个人 web 开发经验的逐渐丰富日趋显现。更多细节请查阅 [HTML 元素参考](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element)。现在，你只需要理解以下主要元素的意义：

- [`<main>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/main) 存放每个页面独有的内容。每个页面上只能用一次 `<main>`，且直接位于 [`<body>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/body) 中。最好不要把它嵌套进其他元素。
- [`<article>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/article) 包围的内容即一篇文章，与页面其他部分无关（比如一篇博文）。
- [`<section>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/section) 与 `<article>` 类似，但 `<section>` 更适用于组织页面使其按功能（比如迷你地图、一组文章标题和摘要）分块。一般的最佳用法是：以 [标题](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Howto/Set_up_a_proper_title_hierarchy) 作为开头；也可以把一篇 `<article>` 分成若干部分并分别置于不同的 `<section>` 中，也可以把一个区段 `<section>` 分成若干部分并分别置于不同的 `<article>` 中，取决于上下文。
- [`<aside>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/aside) 包含一些间接信息（术语条目、作者简介、相关链接，等等）。
- [`<header>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/header) 是简介形式的内容。如果它是 [`<body>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/body) 的子元素，那么就是网站的全局页眉。如果它是 [`<article>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/article) 或[`<section>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/section) 的子元素，那么它是这些部分特有的页眉（此 `<header>` 非彼 [标题](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML#%e5%a2%9e%e5%8a%a0%e4%b8%80%e4%b8%aa%e6%a0%87%e9%a2%98)）。
- [`<nav>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/nav) 包含页面主导航功能。其中不应包含二级链接等内容。
- [`<footer>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/footer) 包含了页面的页脚部分。

### Example 举个例子

> 例子来自 MDN 官网的作业，按照这种结构结合 css 去划分各个区块。

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20240203094414.png)

css 可以上[示例网站](https://roy-tian.github.io/learning-area/html/introduction-to-html/structuring-a-page-of-content-finished/)按 F12 查看

## Extra 额外信息

### 注释

HTML 中的注释需要使用如下的方式实现注释： `<!--注释的内容-->` 

### 特殊字符"转义"

我们必须使用字符引用——表示字符的特殊编码，它们可以在那些情况下使用。每个字符引用以符号 & 开始，以分号（;）结束。

|原义字符|等价字符引用|
|---|---|
|<|`&lt;`|
|>|`&gt;`|
|"|`&quot;`|
|'|`&apos;`|
|&|`&amp;`|

等价字符引用可以很容易记住，因为它使用的文本可以被看作是小于“&lt;”，引号是“&quot;”，其他的也是如此。要找到更多关于实体引用的信息，请参见 [XML 和 HTML 字符实体引用列表](https://zh.wikipedia.org/wiki/XML%E4%B8%8EHTML%E5%AD%97%E7%AC%A6%E5%AE%9E%E4%BD%93%E5%BC%95%E7%94%A8%E5%88%97%E8%A1%A8)（维基百科）

### 页面调试和校验

除了使用 VsCode 和浏览器预览做调试，还可以将 html 的代码放到 [Makeup Validation Service]( https://validator.w3.org/ ) 做校验。