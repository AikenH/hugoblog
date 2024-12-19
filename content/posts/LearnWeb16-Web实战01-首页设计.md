---
calendar_date: 2024-02-17
catalog: true
categories:
- 前端三剑客入门笔记
cover:
  image: /cover/cover16.jpeg
date: 2024-02-17 08:28:28
description: null
lang: cn
mathjax: false
tags:
- Web
- CSS
- HTML
- JS
thumbnail: /img/header_img/lml_bg17.jpg
title: LearnWeb15-Web实战01-首页设计
toc: true
---

>[!summary]+
>设计个人首页作为 HTML 和 CSS 的实战，主要设计以下的几个部分，导航栏，侧边栏，logo，页脚，背景，以及一个简单的个人介绍页面，首先不考虑使用框架和库，仅对整体流程做熟悉，使用纯 HTML 和 CSS 进行基础实现。后续考虑使用框架和组件库进行重写。

[CheckList for Web Design](https://www.checklist.design/) : Using this website to checkout those element u missed in your design. Prepare for those elements. Get Ready and Start.

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20240219134111.png)

## Nav-Bar 页眉的导航栏设计

### Buger 下拉菜单(侧边菜单)

https://alvarotrigo.com/blog/hamburger-menu-css/

### flex 布局设计

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20240221035525.png)

使用 html css 进行布局时，如果计划使用 flex 等布局，避免无谓的划分子集的 div 等 box，避免多余的额外对齐工作，原型和草稿确认布局是很重要的。例如上述的导航栏，分成左右两个 div 即可，如果将搜索框等独立出来，在后续对齐和确认间距的时候会多出很多麻烦。

> 可以缩减为仅使用一个 div，使用 flex 的布局技巧来使得元素一半左对齐一半右对齐即可，下面时具体说明。可以参考文献 1 的《使用自动的外边距在主轴上对齐》章节。

如果希望让 flex 子元素靠右显示，可以在子元素中定义 `margin-left: auto;` (auto 也可使用其他数值单位替代)，参考 [👍MDN弹性盒子容器中的对齐方式](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_flexible_box_layout/Aligning_items_in_a_flex_container) |  [flex子元素靠右](http://m.tnblog.net/notebook/article/details/7906) | [Flex的最后一个元素靠右](https://blog.51cto.com/mouday/4373479) | [Flexbox](https://developer.mozilla.org/zh-CN/docs/Glossary/Flexbox) 

- align-items 如果没有设置正确的话，所有的元素会按照撑满 flex 容器的高度去对齐。
- 使用 margin:auto 可以实现元素的居中
- 使用 align-self 可以实现单个 flex 子项的不同对齐方式。

可能接着阅读更多布局相关的资料，加深对布局的认识，以及正确选择合适的布局：[Mdn Layout Cookbook](https://developer.mozilla.org/en-US/docs/Web/CSS/Layout_cookbook)

 

### Search Bar 搜索框

搜索框设计：使用 logo 和 input 的形式来实现一个搜索框的样式，如下图所示，由三个 box 的组合而成：form 包裹内部的 svg 和 input 两个 box。

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20240221034829.png)
具体的 HTML 如下：

```html
<form class="search-tool">
	<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none"
		role="img" class="icon nav-v2-search__icon">
		<path
			d="M1.5 7.75C1.5 9.4076 2.15848 10.9973 3.33058 12.1694C4.50269 13.3415 6.0924 14 7.75 14C9.4076 14 10.9973 13.3415 12.1694 12.1694C13.3415 10.9973 14 9.4076 14 7.75C14 6.0924 13.3415 4.50269 12.1694 3.33058C10.9973 2.15848 9.4076 1.5 7.75 1.5C6.0924 1.5 4.50269 2.15848 3.33058 3.33058C2.15848 4.50269 1.5 6.0924 1.5 7.75V7.75Z"
			stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
		</path>
		<path d="M12.814 12.8132L15.5 15.4999" stroke="currentColor" stroke-width="1.5"
			stroke-linecap="round" stroke-linejoin="round"></path>
	</svg>
	<input type="text" placeholder="Search..." value="" autocapitalize="off" class="search-form" />
</form>
```

为了美观我们去除 input 原本的边框和底色，同时避免内容溢出，css 可参考如下：

```css
.nav-func .search-tool {
    margin-top: 5px;
    background-color: rgba(14, 82, 30, 0.28);
    border-radius: 5000px;
    max-width: 180px;
}

.nav-func .nav-v2-search__icon {
    padding-left: 10px;
    /* position: relative; */
    display: inline-block;
    /* left: 15px; */
}

.nav-func .search-tool input {
    background: transparent;
    color: black;
    border: none;
    outline: 0;
    overflow: hidden;
}
```

最好结合其父元素来限制搜索框的最大最小 width 以及 logo 的位置，同时为了小窗口的响应式设计可以结合媒体查询来控制搜索框的显示与否。

```css
@media screen and (max-width: 850px) {
	.nav-func .search-tool input {
		visibility: hidden;
		display: none;
		width: 0;
	}
}
```

这里介绍一下 `display: none;` 和 `visibility: hidden;` 的区别：

- 如果使用 `visibility: hidden;` 那么其结构，如在 flex 中的占位会仍然存在，只是元素并不显示，有时候我们需要使用它
- 如果使用 `display: none;` 那么其内容和结构都会完全小时，我们在计算的时候就仿佛 html 中没有这个元素一般，在一些响应式的场景会需要用到
### Switch 主题切换按钮/亮暗色主题切换

给 body 添加 darktheme class 属性来为页面的基本元素设置亮暗的双主题切换，使用一下的选择器前缀来为不同主题下的页面添加不同背景颜色的属性：

```css
body.dark-mode {
  background-color: #232946;
  /* background: url(../images/background-dark.jpeg); */
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
```

建议使用预先定义好的不同主题的色彩变量来实现无需多重定义各个单元的元素：

```css
:root {
  --clr: #141e15;
  --bga: #004643;
  --btm-color: #f9bc60;
  --para-color: #abd1c6;
  --font-color: #fffffe;
  --stroct-color: #001e1d;
}
```

按照自己想要的设计亮暗切换按钮：

```html
<div class="theme-toggle">
	<button class="sun"> <ion-icon name="sunny-outline"></ion-icon> </button>
	<button class="moon"> <ion-icon name="moon"></ion-icon> </button>
</div>
```

```css
/* theme switcher here */
header .theme-toggle {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 2;
}

header .theme-toggle button {
  background: transparent;
  border: none;
  font-size: 1.5em;
}

header .theme-toggle .sun,
header .theme-toggle .moon {
  display: none;
  cursor: pointer;
}

body:not(.dark-mode) header .theme-toggle .moon {
  display: inline-block;
}

body.dark-mode header .theme-toggle .sun {
  display: inline-block;
}
```

使用以下的 js 代码来修改 body 的 classlist，实现类别标签的切换

```js
function changeTheme() {
    let body = document.querySelector('body')
    const isDarkMode = body.classList.toggle("dark-mode");
    localStorage.setItem('darkMode', isDarkMode);
}

document.querySelector(".theme-toggle").addEventListener("click", changeTheme);
```
### Login/Regiest 登录和注册按钮

简单的两个 Span，使用不同的背景颜色来做区分会使得显示的效果更加的优雅美观，如果设计了这两个按钮，就可能还需要设计登出以及用户 Avater 标签来切换状态。

```css
.nav-func .login {
    /* border: 1px solid #1fb870; */
    font-size: 0.9em;
    border-radius: 29999px;
    padding: 5px 5px;
    min-width: 60px;
    text-align: center;
}

.nav-func .login:hover {
    background-color: rgba(11, 29, 6, 0.2);
    font-weight: bold;
}

.nav-func .regiest {
    font-size: 0.9em;
    border-radius: 29999px;
    padding: 5px 5px;
    min-width: 67px;
    text-align: center;
    background-color: rgba(0, 0, 0);
    color: white;
}

.nav-func .regiest:hover {
    background-color: rgba(0, 0, 0, 0.6);
    font-weight: bold;
}
```
## Background 背景设计

> 用于美观的背景界面在 CSS 中进行编写，如何在页面上放置你的背景，使其较好的展现

REF：[FreeCodeCamp](https://www.freecodecamp.org/chinese/news/html-background-image-how-to-add-wallpaper-images-to-your-website/) 

```css
body {
    /* Set up the background image which fix to the widows view*/
    background-image: url("/images/background.jpg");
    /* background-image: linear-gradient(-20deg, #2b5876 0%, #4e4376 100%); */
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
}
```

为了使得图片适应各种 size 的显示窗口，需要以下的几个关键设置：

- `background-repeat: no-repeat;` 避免图片小于窗口时出现的复制图片来填满窗口的情况；
- `background-size: cover;` 使用 Cover 参数来缩放图片，使得图片得以充满整个窗口；
- `background-attachment: fixed;` 确保图片的位置时固定的，避免滚动页面使得图像的位置发生不恰当的变化。

**设计注意事项**： 一个现实拍摄的背景图片，往往存在比较复杂的色彩分布和细节，而作为背景而言，这样繁杂的色块和元素会给页面布局和色彩设计带来很多困扰，这里推荐的方式是：

1. 将背景添加模糊效果，这样能够突出表面的页面元素，包括字体等。
2. 尽量使用大色块的合适图片
3. 图片仅作为类似 Banner 的效果，页面布局整体还是以纯色为主。

### 模糊背景设置

为了设置模糊的背景，主要涉及到的思想为：使用 after 伪元素，在 Background 元素后面添加一层模糊遮罩，并通过 z-index=-1 避免其遮盖住其他元素。

可以使用两种写法，一种使用 filter，直接复制一层元素到原本的元素之上，同时多定义一层背景避免百变。第二种为使用 backdrop-filter，直接对底层背景进行模糊：

使用 filter：

```css
body:after{
  background: inherit;
  filter: blur(10px);
  content:'';
  position:absolute;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  background-size: cover;
  z-index: -1; 
}
```

使用 backdrop-filter：

```css
body:after{
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(10px);
  z-index: -1;
}
```

## Meterial 素材准备和设计

### Tools 形状和背景等

**Meterial**: 形状，背景，元素生成

-  [CSS Generators](https://css-generators.com/)：大合集，有诸多 CSS 生成的元素可供参考，丰富自己的页面元素。
-  [作为前端开发，你应该知道的这十几个在线免费工具](https://zhuanlan.zhihu.com/p/654142246) 
-  [Gradient Color BG](https://webgradients.com/?ref=usniemvuilaptrinh) using color as your background
-  [CSS Gradient — Generator, Maker, and Background](https://link.zhihu.com/?target=https%3A//cssgradient.io/)
-  [Upload Image – remove.bg](https://link.zhihu.com/?target=https%3A//www.remove.bg/upload): 去除背景，用来做人物剪影等功能
-  [Logo/Post Design By Canva](https://www.canva.cn/en/?display-com-option=true): 使用其中的模板来设计自己的 logo 或者海报
-  [YourWave](getwaves.io/) : 生成浪花分割线，用来做背景等页面元素
-  [Blobmaker](https://link.zhihu.com/?target=https%3A//www.blobmaker.app/) :生成水滴
-  [Smooth Shadow](https://link.zhihu.com/?target=https%3A//shadows.brumm.af/) : 投影/阴影生成
-  [Clippy - CSS clip-path maker](https://link.zhihu.com/?target=https%3A//bennettfeely.com/clippy/) : 生成将图像放在特定形状后面的 CSS 代码
-  [Fancy Border Radius Generator](https://link.zhihu.com/?target=https%3A//9elements.github.io/fancy-border-radius/) : 圆角生成器，[MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_backgrounds_and_borders/Border-radius_generator) 中也有一个
-  [HaiKei](https://app.haikei.app/): Sharp Provider, 提供各种生成的形状
-  [Ribbon Shapes](https://css-generators.com/ribbon-shapes/): 生成各种飘带
-  [Picography](https://picography.co/)： upslash 的备胎，免费开源的图片。
-  [Space](https://space.js.org/)： 3d js 范例
-  [calendar.js](https://calendar-js.com/index.html) 开源日历 js 组件

**Character**：角色，插画生成

- [PeepsLab](https://peepslab.com/) ：简单一些插图头像生成，主要是肤色、发色、配饰面部等。
- 

**Charts**：图表生成

- [SVG Chart Generator](https://www.magicpattern.design/tools/svg-chart-generator): 生成 Svg 图表，可以根据自己的数据进行定制
- [Observable Plot](https://observablehq.com/plot/getting-started)：JS 库，类似 matplotlib 用来画图表 
### Color 颜色选择和搭配

**Color**：主题颜色和颜色搭配选择，结合背景进行页面设计

-  [colorhunter](https://colorhunt.co/palette/0926351b42425c83749ec8b9)：简单的调色板组合
-  [colors.lol](https://colors.lol/)：简单的调色板组合
-  [happyhues](https://www.happyhues.co/palettes/10)：一个模板应用各种组合颜色以后的效果展示，非常实用，本身也是一个很美的页面
-  [Color Palette Generator](https://colors.muz.li/)：调色板组合以及部分样例
-  [zhihu-色彩搭配网站分享](https://zhuanlan.zhihu.com/p/520757581)：一个调色网站分享的汇总帖子，也是该部分的主要来源
-  [Accessible color palette generator]( https://venngage.com/tools/accessible-color-palette-generator ) : 基于提供的颜色提供调色盘

Windows 可以结合 PowerToy 中的取色器来获取壁纸中的主要色彩，进而进行进一步的色彩搭配，功能开启后的快捷键为：win+shift+c

### Icons 图标文件

> 一个一个图标素材去找显然是一件不现实的事情，图标框架就是为此而生的。

较为主流常见的图标框架主要有：

- [fontawesome](https://fontawesome.com/)：
- [ionicons](https://ionic.io/ionicons/usage)
- [Free Icons](https://freeicons.io/search/icons?q=sun) : 下载或者复制 svg 代码
- [Iconhunt](https://www.iconhunt.site/?query=next)：icon 的搜索引擎，可以搜索到很多开源免费的 svg
- element-ui：与框架相关的这里暂时不做研究。

其中 **fontawesome** 的使用可以参考[菜鸟教程](https://www.runoob.com/font-awesome/fontawesome-tutorial.html) ：可以去官网下载、直接复制 svg，或者使用 stylesheet 引入（**推荐**）来使用对应的图标。

通常使用 `<i>` 和 `<span>` 等内联元素进行调用，其中 `<i>` 尤为，且更为推荐，如：

```html
<head>
<link rel="stylesheet" href="https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.css">
</head>

<body>
<i class="fa fa-car"></i>
</body>
```

**ionicons** 的用法则主要就是使用 style 参考：[官网](https://ionic.io/ionicons/usage) 引入的方式，或者 stylesheet 引入的方式，参考：[菜鸟教程](https://www.runoob.com/ionic/ionic-icon.html)，图标列表可以查看 [Icons](https://ionic.io/ionicons)。

使用 defer 或者添加于页面末尾，body 结束之前：

```html
<script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
```

然后再需要图标的地方添加即可：

```html
<ion-icon name="heart"></ion-icon>
```

### Template 模板

Loader : [CSS Loaders](https://css-loaders.com/classic/) 用于占位的加载动画，只需要赋值粘贴到自己的页面中即可。

### Fonts 字体文件

> 这里介绍两种，在线引入字体的资源和本地引入字体的具体操作。


## 亚克力材质生成和原理

ref: [DIY: A Web Version of the Fluent Design System’s Acrylic Material]( https://medium.com/microsoft-design/diy-a-web-version-the-fluent-design-systems-acrylic-material-fe2eac2a40bb )

```css
backdrop-filter: blur(20px);  
background-color: rgba(255,255,255,.3);
```

这里的 `backgrop-filter` 是一个新的 css 特性，能够对元素底下的内容添加模糊效果，也就是一个 filter（为当前元素提供模糊效果）的变体。

## 简单的响应式设计思路

实现简单的响应式设计实际上就是：

- 确定一些元素的显示与否，简化显示界面，或者将其使用额外弹出界面显示；
- 结合 overflow 后的行为，避免异常溢出；
- 确定一些最小最大尺寸和确保定位方式 Work Well，避免在视窗大小发生改变的时候导致元素偏移；
- 更多的还要用百分比和计算等更多的要素来实现