---
autofoldtoc: true
catalog: true
categories:
- 笔记系统和博客搭建
cover:
  image: /cover/cover15.jpeg
date: 2024-12-19 16:52:43
description: 进一步对PaperMod主题修改，设置侧边目录，侧边导航栏，评论区等功能
lang: cn
mathjax: false
tags:
- Blog
- Hugo
thumbnail: /img/header_img/lml_bg1.jpg
title: 调整PaperMod的页面结构以及新增功能
toc: true
---

> [!summary]+
> 除了基础的样式和功能，本篇介绍一些会改变原本页面结构的样式调整，或是支持一些除了 markdown 渲染外的一些额外的功能。

## Assign Unique ClassName for Pages 给页面注册单独的类名

在进行一些比较复杂的样式设置之前，为了避免样式会影响到预期之外的页面，因此通过 hugo 中的 go-template 语法判断页面类型后，通过修改原有模版，给搜索，时间线，profile 等页面注册一个单独的类名。

修改 `themes/PaperMod/layouts/_default/baseof.html`，将其中对应部分替换为如下内容：

```html
<body class="
{{- if (or (ne .Kind `page` ) (eq .Layout `archives`) (eq .Layout `search`)) -}}
{{- print "list" -}}
{{- end -}}
{{- if eq .Type `linklog` -}}
{{- print "-linklog-" -}}
{{- end -}}
{{- if eq .Layout `search` -}}
{{- print " search" -}}
{{- end -}}
{{- if (eq .Layout `archives`) -}}
{{- print "-archive" -}}
{{- end -}}
{{- if .IsHome -}}
{{- print "-profile" -}}
{{- end -}}
{{- if not .IsHome | and .Title | and .Description }}
{{- print "post" -}}
{{- end -}}
{{- if eq site.Params.defaultTheme `dark` -}}
{{- print " dark" }}
{{- end -}}
" id="top">
```

替换即可通过如下的 class 对页面进行索引：

|      Selector      | Page       |
| :----------------: | :----------: |
| .list-linklog-post | linklog 页面 |
|    .list.search    | search 界面  |
|   .list-archive    | archive 界面 |
|   .list-profile    | 主页         |

在上述页面选择器之后添加 `.dark` 即可定位对应的深色主题样式，这部分可以按照自己的习惯去随便修改即可。

### Background Image 设置背景

可以参考笔者的设置，给背景添加一层简单的遮罩，具体代码如下：

```css
#top,
.list,
.list-profile {
  background-image: url(/cover/cover1.jpeg);
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

#top.dark,
.list.dark,
.list-profile.dark {
  background-image: url(/cover/cover0.jpeg);
}

#top::after,
.list::after,
.list-profile::after {
  background: inherit;
  filter: blur(5px);
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  background-size: cover;
  z-index: -1;
  background-attachment: fixed;
}
```

如果后续由于背景图像的色块比较杂乱，会导致文本模糊不清，可以给文本区域添加底色和对应的毛玻璃特效如下：

```css
.list-archive .main,
.list-linklog-post .main,
#top article.post-single {
  -webkit-backdrop-filter: blur(30px);
  backdrop-filter: blur(30px);
  background-color: rgba(104, 152, 191, 0.45);
}
```

完成了基础设置之后就可以开始对页面结构做调整了，接下来主要介绍一下侧边目录、侧边导航栏，以及新建分享页面三个部分的页面调整和页面新增。

## Support LinkLog Page 添加博文收藏界面

受到 [Xiaofei Ge](https://xiaofei.ge/posts/modify-hugo-papermod-theme-and-templates/) {{< sidenote >}} [Linklog | Xiaofei Ge](https://xiaofei.ge/linklog/) {{< /sidenote >}} 的启发，确实希望能有一个页面来专门存放一些自己喜欢或者希望存档的文章，通过直接跳转或者表明转载（防止原博挂掉）的方式进行收藏，避免和自己的文章混在一起。

参考 [Using Hugo as a redirect service - Dan North & Associates Limited](https://dannorth.net/hugo-redirects/)，设计对应收藏博文的 markdown 元信息应该如下：

```yaml
title: 「特别篇」在关闭光猫、路由器IPv6防火墙后可能遇到的安全问题
url: "www.bilibili.com/opus/825167559504429056"
date: 2023-11-05
draft: false
type: "linklog"
author: "ce-12"
```

通过 type 定义页面类型，日期存储我们收藏的时间，url 则是核心的跳转页面，还有一些作者和 title 的展示信息，并在 archive 按照日期展示每一条链接。

因此借助 GPT 快速实现了一版，并调整了一下搜索代码，使得搜索到 Linklog 文章的时候，会有符号&样式去标识其为外部跳转的博文。

### Add LinkLog Page 添加博文收藏界面

上述说到希望以 archive 界面的形式来收藏博文，通过简单的标题和简介来记录对应的博文，以及存放博文的时间，因此参考 `/layouts/_default/archives.html` 创建 `layouts/linklog/list.html` 如下，定义 LinkLog 的界面.

```html
{{- define "main" }}

<header class="page-header">
  <h1>{{ .Title }}</h1>
  {{- if .Description }}
  <div class="post-description">{{ .Description }}</div>
  {{- end }}
</header>

{{- $linklogPages := where site.RegularPages "Type" "linklog" }} <!-- Adjust this if necessary -->

{{- range $linklogPages.GroupByPublishDate "2006" }}
{{- if ne .Key "0001" }}
<div class="archive-year">
  {{- $year := replace .Key "0001" "" }}
  <h2 class="archive-year-header" id="{{ $year }}">
    <a class="archive-header-link" href="#{{ $year }}">
      {{- $year -}}
    </a>
    <sup class="archive-count">&nbsp;{{ len .Pages }}</sup>
  </h2>
  {{- range .Pages.GroupByDate "January" }}
  <div class="archive-month">
    <h3 class="archive-month-header" id="{{ $year }}-{{ .Key }}">
      <a class="archive-header-link" href="#{{ $year }}-{{ .Key }}">
        {{- .Key -}}
      </a>
      <sup class="archive-count">&nbsp;{{ len .Pages }}</sup>
    </h3>
    <div class="archive-posts">
      {{- range .Pages }}
      <div class="archive-entry">
        <h3 class="archive-entry-title">
          {{- if .Params.url}}
            <span class="jump-icon"><ion-icon name="link-outline"></ion-icon></span>
            <a href="https://{{ .Params.url }}" target="_blank" rel="noopener noreferrer">{{ .Title }}</a> <!-- Prepend the protocol -->
          {{- else}}
            <a href="{{ .Permalink }}" >转) {{ .Title }}</a> <!-- Prepend the protocol -->
          {{- end}}
        </h3>
        {{- if .Params.description }} <!-- Check if description exists -->
        <div class="archive-entry-description">
          {{ .Params.description }} <!-- Display the description -->
        </div>
        {{- end }}
        <div class="archive-meta">
          {{- partial "post_meta.html" . -}} <!-- Optional: Include meta info -->
        </div>
      </div>
      {{- end }}
    </div>
  </div>
  {{- end }}
</div>
{{- end }}
{{- end }}

{{- end }}{{/* end main */}}
```

其中根据页面元信息是否存在 url 决定是否是外部链接，来决定 title 前面的样式是跳转符号还是转载标识，随后设置跳转标识的样式如下：

```css
.jump-icon {
  position: relative;
  top:3px;
  padding-right: 10px; /* Space between the icon and the title */
  font-size: 1em; /* Adjust size as needed */
}
#search-link{
  text-decoration: underline;
  color: slateblue;
}

.list-linklog-post .archive-entry-description{
  color: var(--secondary);
}
```

设置完成后，即可在 content 中新建 linklog 文件夹，并在其中存放对应的转载文章，例如 `linklog/example.md` ，然后填写上述我们设计的格式，尝试跳转效果。最终页面效果如下：

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20241220222745.png)

外部链接点击后即可跳转到对应的博文。

### Avoid Url Directly Visit Wrong Page 避免直接用 url 访问对应页面时出现空页面

添加 `layouts/linklog/single.html` 来设置页面的重定向，避免直接输入 linklog 对应地址以后，跳转到了一个空的 markdown 页面，具体代码如下：

```html
{{- define "main" }}

{{- if .Params.url }}
<meta http-equiv="refresh" content="0; url=https://{{ .Params.url }}">
<script>
    window.location.href = "https://{{ .Params.url }}";
</script>
<title>Redirecting...</title>
<p>If you are not redirected, <a href="https://{{ .Params.url }}">click here</a>.</p>
{{- else }}
....
{{- end }}

{{- end }}{{/* end main */}}
```

通过判断参数中是否存在 url 来设置是否执行跳转，否则则使用默认的 `single.html` 的方式渲染 markdown 的转载文章。 {{< sidenote >}} else 中省略的部分填写的是 `_dafault/single.html` {{< /sidenote >}} 中的内容。



### Add Diff Style in Search Result 搜索结果中支持跳转和特殊样式

由于在搜索中可能会搜到对应的文章，这里也需要和普通的文章做一些区分，因此修改 `assets/js/fastsearch.js` 的搜索结果部分如下：

```js
/ execute search as each character is typed
sInput.onkeyup = function (e) {
    // run a search query (for "term") every time a letter is typed
    // in the search box
    if (fuse) {
        let results;
        if (params.fuseOpts) {
            results = fuse.search(this.value.trim(), {limit: params.fuseOpts.limit}); // the actual query being run using fuse.js along with options
        } else {
            results = fuse.search(this.value.trim()); // the actual query being run using fuse.js
        }
        if (results.length !== 0) {
            // build our html if result exists
            let resultSet = ''; // our results bucket

            for (let item in results) {
                const permalink = results[item].item.permalink; // Get the permalink
                
                const url = new URL(permalink)
                const pathAfterDomain = url.pathname;

                console.log("Permalink:", permalink); // Log the permalink

                console.log("Last Segment:", pathAfterDomain); // Log the last segment
                // Check if the last segment contains a period
                const jumpIcon = pathAfterDomain.includes('.') ? '<span class="jump-icon"><ion-icon name="link-outline"></ion-icon></span>' : '';
                
                if (pathAfterDomain.includes('.'))
                {
                    resultSet += `<li class="post-entry">
                        <header class="entry-header" id="search-link">${jumpIcon}${results[item].item.title}&nbsp;»</header>
                        <a href="${permalink}" target="_blank" rel="noopener noreferrer" aria-label="${results[item].item.title}"></a>
                    </li>`;
                }
                else
                {
                    resultSet += `<li class="post-entry">
                        <header class="entry-header">${jumpIcon}${results[item].item.title}&nbsp;»</header>
                        <a href="${permalink}" aria-label="${results[item].item.title}"></a>
                    </li>`;
                }
            }

            resList.innerHTML = resultSet;
            resultsAvailable = true;
            first = resList.firstChild;
            last = resList.lastChild;
        } else {
            resultsAvailable = false;
            resList.innerHTML = '';
        }
    }
}
```

由于在之前的设置下，通过判断搜索结果的跳转链接在我们域名之后是否还存在 `.` 来判断其是否为外部链接，进而为其添加跳转标识即可，最终效果如下：

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20241220222656.png)


## Side Toc 宽屏下设置侧边目录

正如以往笔者的 hexo 博客的设置，将目录放到侧边，一是能优化 PaperMod 主题在宽屏时对空间的利用，二是能够方便阅读的时候进行章节的跳转以及对进度的提示，因此下定决心在页面较宽时将目录改至侧边。

实现的方案主要借鉴自[周鑫的个人博客](https://www.zhouxin.space/logs/introduce-side-toc-and-reading-percentage-to-papermod/)，在此之上添加了以下的一些特性：

1. 为已读的内容添加 read 的类名，设置不同的样式；
2. 在加密页面隐藏 toc
3. 仅展开当前正在阅读的章节的子章节
4. 添加 toc 中 H2 的 index

这里仅额外介绍一下改动部分，**最终的源码可从 Github 上获取** {{< sidenote >}} [papermod-sidebar/layouts/partials/toc.html · AikenH/papermod-sidebar](https://github.com/AikenH/papermod-sidebar/blob/master/layouts/partials/toc.html) {{< /sidenote >}} {{< sidenote >}} [papermod-sidebar/assets/css/common/toc.css · AikenH/papermod-sidebar](https://github.com/AikenH/papermod-sidebar/blob/master/assets/css/common/toc.css){{< /sidenote >}}

>  本博客的回到顶部也是基于周鑫的实现完成，这里不在赘述，可以自行前往参考。

### Diff Style for Read & Unread 基于阅读状态修改样式

在周鑫的实现中 `toc.html` 的滚动函数部分首先添加 read 状态的重置，避免回滚时的样式错误：

```html
window.addEventListener('scroll', () => {
	// Get the current scroll position
	const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

	// Check if the scroll position is at the top of the page
	if (scrollPosition === 0) {
		return;
	}

	// Ensure elements is a valid NodeList
	// ---------------------状态重置添加位置
	if (elements && elements.length > 0) {
		elements.forEach(element => {
			const id = encodeURI(element.getAttribute('id')).toLowerCase();
			const tocLink = document.querySelector(`.inner ul li a[href="#${id}"]`);
			tocLink.classList.remove('read');
		});
	 // --------------------------------------------
		// Check if there is an object in the top half of the screen or keep the last item active
		...
		...
```

然后再滚动判断 active 元素的部分添加 read 属性的赋值：添加如下 3 行即可

```html
elements.forEach((element, index) => {
	const id = encodeURI(element.getAttribute('id')).toLowerCase();
	const tocLink = document.querySelector(`.inner ul li a[href="#${id}"]`);
	if (element === activeElement){
		tocLink.classList.add('active');

		// Ensure the active element is in view within the .inner container
		const tocContainer = document.querySelector('.toc .inner');
		const linkOffsetTop = tocLink.offsetTop;
		const containerHeight = tocContainer.clientHeight;
		const linkHeight = tocLink.clientHeight;

		// Calculate the scroll position to center the active link
		const scrollPosition = linkOffsetTop - (containerHeight / 2) + (linkHeight / 2);
		tocContainer.scrollTo({ top: scrollPosition, behavior: 'smooth' });
	} else {
		// ------------------添加部分---------------------
		if (getOffsetTop(element) < scrollPosition) {
			tocLink.classList.add('read'); // Mark as read
		}
		// ------------------添加部分---------------------
		tocLink.classList.remove('active');
	}
});
```

`toc.css` 中对 read 添加样式

```css
.read {
    color: rgb(105, 105, 105) !important;
}
```

### Only Unfold Current Chapter 自动折叠其他章节

在 `layouts/partials/head.html` 中添加如下代码

```html
{{ if or .Params.autofoldtoc .Page.Site.Params.autofoldtoc }}
    {{ $styles := resources.Get "css/autofoldtoc.css.tmpl" | resources.ExecuteAsTemplate "autofoldtoc.css" . }}
    <style>
        {{ $styles.Content | safeCSS }}
    </style>
{{ end }}
```

使得页面在设置了 `autofoldtoc` 时，引入我们预先定义好的样式表，实现对非激活章节的折叠，然后在 `assets.css` 中新建 `autofoldtoc.css.tmpl` 预先定义折叠样式{{< sidenote >}}[为Hugo主题添加动态跟随目录Scrollspy效果](https://blog.csdn.net/DuChongYY/article/details/136244762) {{< /sidenote >}}如下

```css
.toc-container.wide li>ul {
    display: none;
}

.toc-container.wide li:has(a.active) ul{
    display: inherit !important;
} 
```

后续可以在 `hugo.yaml` 中设置如下开启**全局**目录自动折叠功能

```yaml
params:
  autofoldtoc: true
```

或者在 markdown 的 meta-info 中添加如下一行即可**针对单篇文章**开启。

```yaml
autofoldtoc: true
```

### Hide Toc before Decrypt 博文解密之前隐藏目录

修改 `toc.html` 的 `getOffsetTop` 如下：

```html
<script>
function getOffsetTop(element) {
    if (!element.getClientRects().length) {
        if (!document.querySelector('.hugo-encryptor-prompt') && elements.length != 0) {
            // Re-query the elements if the class is not found
            elements = document.querySelectorAll('h1[id],h2[id],h3[id],h4[id],h5[id],h6[id]');
            // console.log('Elements re-queried:', elements);
        }
        return 0;
    }
    let rect = element.getBoundingClientRect();
    let win = element.ownerDocument.defaultView;
    return rect.top + win.pageYOffset;   
}
</script>
```

这一部分后面使用简码加密的会讲到，实际上是一个伪加密，只是不显示对应模块罢了。

### Auto Index 添加章节计数

`toc.css` 中设置 H2 的样式如下：

```css
.toc .inner > ul > li{
    list-style: none;
    counter-increment: toc-section;
}
.toc .inner > ul > li::before{
    content: counter(toc-section) '.';
    margin-right: 0.4em;
}
```

## Sidebar 宽屏下设置侧边导航栏

在默认的 nav 之外添加一个 sidebar 结构体，然后通过 css 在不同的视窗中启用不同的导航栏即可，sidebar 可以添加在 `layouts/partials/header.html` 中：

```html
<header>
...
</header>

{{- $iconMap := dict "home" "home-outline" "posts" "newspaper-outline" "tags" "pricetags-outline" "categories"
"grid-outline" "archives" "folder-outline" "search" "search" "about" "person" "linklog" "link"}}
{{- $bgColorMap := dict "home" "#f44336" "posts" "#b145e9" "tags" "#0f93c7" "categories" "#ffa117" "archives" "#0fc70f"
"search" "#15c095" "about" "#d16111" "linklog" "#0fc70f"}}
<div class="sidebar">
    <ul>
        <li class="logo" style="--bg: #333;">
            <a href="#">
                <div class="logo-icon"><img src="/logo/logo.png"></div>
                <div class="logo-text">Aiken's Blog </div>
            </a>
        </li>
        <div class="menulist">
            {{- range site.Menus.main }}
            {{- $menu_item_url := (cond (strings.HasSuffix .URL "/") .URL (printf "%s/" .URL) ) | absLangURL }}
            {{- $page_url:= $currentPage.Permalink | absLangURL }}
            {{- $is_search := eq (site.GetPage .KeyName).Layout `search` }}
            {{- $iconName := index $iconMap .Name }}
            {{- $bgColor := index $bgColorMap .Name }}
            <li class="{{- if eq $menu_item_url $page_url }}active{{- end }}" style="--bg: {{ $bgColor }};">
                <a href="{{ .URL | absLangURL }}" title="{{ .Title | default .Name }} {{- cond $is_search (" (Alt + /)" | safeHTMLAttr) ("" | safeHTMLAttr ) }}"
                {{- cond $is_search (" accesskey=/" | safeHTMLAttr) ("" | safeHTMLAttr ) }}>

                    <div class="logo-icon">
                        <ion-icon name="{{ $iconName }}"></ion-icon>
                    </div>

                    <div class="logo-text">{{ .Name }}</div>
                </a>
            </li>
            {{- end }}
        </div>
        <div class="logo-switches">
            <button id="theme-toggle" accesskey="t" title="(Alt +T)">
                <li>
                    <div class="logo-icon" id="moon">
                        <ion-icon name="moon-outline"></ion-icon>
                    </div>
                    <div class="logo-icon" id="sun">
                        <ion-icon name="sunny-outline"></ion-icon>
                    </div>
                </li>
            </button>
        </div>
    </ul>
</div>

```

然后通过 css 去控制 sidebar 的位置和基本样式即可，这里的样式是来自之前自己[练手项目](https://github.com/AikenH/myWebProj/tree/side-nav)，这里就不再详细分享：

基本的一些设置，包括 hover，nav 和 sidebar 的切换部分的 css 如下：

```css
/* sidebar styles */
@media screen and (min-width: 768px) {
  .nav{
    display: none;
  }
}
/* @media screen and (min-width: 768px) and (max-width: 1600px){
  .main:has(>article:first-child){
    margin-left: 80px;
  }
} */

.sidebar {
  /* background-color: var(--para-color); */
  background-color: #abc3d1bb;
  opacity: 0.9;
  position: fixed;
  padding-top: 0vh;
  padding-left: 10px;
  height: 100%;
  width: 80px;
  overflow: hidden;
  border-radius: 0px/30px 30px/30px;
  box-shadow: 20px 40px 40px rgba(0, 0, 0, 0.3);
  transition: width 0.5s ease 0s;
  z-index: 999;
}

@media screen and (max-width: 768px){
  .sidebar {
    display: none;
  }
}

.sidebar:hover {
  width: 270px;
  height: 100vh;
}
```

主题中完整的侧边 css 可从 [sidebar.css at · AikenH/papermod-sidebar](https://github.com/AikenH/papermod-sidebar/blob/master/assets/css/common/sidebar.css) 获取。
## Extensions 功能拓展

### Disqus Support 使用 Disqus 作为评论区

> 为博客添加评论区实际上有比较多的选择，这里由于之前使用的都是 disqus，这里暂时就不做切换，后续如果有需求的话可能会做别的尝试，例如 [giscus](https://tunan.org/posts/add-comment-system-to-hugopapermo/)

参考 PaperMod 主题的说明 {{< sidenote >}} [papermod-wiki-comments](https://github.com/adityatelange/hugo-PaperMod/wiki/Features#comments) {{< /sidenote >}} ，创建 `layouts/partials/comments.html` ，然后将 disqus 获取的代码贴进去，同时在设置 `hugo.yaml` 中打开评论区即可。

```yaml
params:
  comments: true
```

而由于 disqus 在国内的访问不是特别的友好，可能会成为页面加载的瓶颈，甚至阻碍其他核心的板块的加载进程，因此使用**延迟加载方案**使得当页面滚动到评论区域时才开始加载 disqus 板块，这里建议去原作者站点查看，故不再赘述  {{< sidenote >}} [使 Disqus 不再拖累性能和页面加载 | Sukka's Blog](https://blog.skk.moe/post/prevent-disqus-from-slowing-your-site/) 感谢作者，这也是本博客使用的方案 {{< /sidenote >}} {{< sidenote >}} [延迟加载 Disqus 评论 | CSS-Tricks 中文](https://css-tricks.org.cn/lazy-loading-disqus-comments/) 感谢作者分享 {{< /sidenote >}}

此外由于觉得 disqus 的 reactions 模块有点烦人，因此在设置中讲 reactions 板块关闭 {{< sidenote >}} [Document how to disable reactions · Issue #146 · disqus/disqus-react](https://github.com/disqus/disqus-react/issues/146) {{< /sidenote >}} ;

### busuanzi 统计网站访问人数

使用[不蒜子](https://busuanzi.ibruce.info/)统计站点访问次数和人数，参考官方教程将对应的代码嵌入 footer 中即可，如果需要人次的话就把 pv 改成 uv 。

最终代码如下：

```html
...
<script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>
        <span id="busuanzi_container">
            Visitors: <span id="busuanzi_value_site_uv"></span>
            Views: <span id="busuanzi_value_site_pv"></span>
    </span> 
</footer>
```

如果希望初始化站点的访问量和人数，避免域名转换后的重新计数，可以使用在西面添加 js 脚本对技术进行调整，可以参考 [Hugo + PaperMod搭建技术博客 | Kunyang's Blog](https://kyxie.me/zh/blog/tech/web/papermod/#%e6%b5%81%e9%87%8f%e7%bb%9f%e8%ae%a1) 这里不再重复说明。

### Sakana Widget 石蒜模拟器

页面中引入 Sakana 摆件{{< sidenote >}}[dsrkafuu/sakana-widget: Sakana widget for Web. | 网页小组件版本的石蒜模拟器。](https://github.com/dsrkafuu/sakana-widget?tab=readme-ov-file) {{< /sidenote >}}，并将其自定义了欣欣向荣两兄弟的图片效果如下：

{{< galleries >}} 
{{< gallery src="https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20241220115346.png" title="欣欣" >}}
{{< gallery src="https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20241220115403.png" title="小荣" >}}
{{< /galleries >}}

该组件的使用，包括样式的调整文档里已经非常详细了，这里不在多说；

>  以供参考：本文在 hugo 中引入相关代码的位置位于`layouts/partials/header,html`的末尾

本文引入新角色的代码如下：

```js
function initSakanaWidget() {
	const ronSang = SakanaWidget.getCharacter('chisato');
	ronSang.initialState = { 
		...ronSang.initialState,
		controls: false,
		t: 0.8, i: 0.002, s: 1, d: 0.999, t: 0.5, w: 0.05,
	};

	ronSang.image = 'xxx.png';
	SakanaWidget.registerCharacter('ronSang', ronSang);
	new SakanaWidget({ character: 'ronSang' }).mount('#sakana-widget');
	...
}
```

### World Cloud 词云

尝试了一下做标签云，试图优化一下 tag 页面，但是设置了背景以后配合的不是很好，因此本博客中没有使用这个功能，这里分享一下实现词云 {{< sidenote >}} [Hugo的标签使用词云WordCloud2展示 | Blog - XLapTop](https://blog.xlap.top/post/tech/wordcloud4hugo/) {{< /sidenote >}} {{< sidenote >}} [wordcloud2.js/API.md at gh-pages · timdream/wordcloud2.js](https://github.com/timdream/wordcloud2.js/blob/gh-pages/API.md)  {{< /sidenote >}} {{< sidenote >}} [Adding a Tag Cloud to my Hugo blog · Jack Henschel's Blog](https://blog.cubieserver.de/2020/adding-a-tag-cloud-to-my-hugo-blog/) {{< /sidenote >}} 的代码:

这里需要去 [wordcloud2.js/src/wordcloud2.js at gh-pages · timdream/wordcloud2.js](https://github.com/timdream/wordcloud2.js/blob/gh-pages/src/wordcloud2.js) 将该 js 文件存在 static 目录下，然后将下述代码替换到 `layouts/_default/terms.html` 中


```html
<!--标签云-->

<div id="sourrounding_div" style="width:100%;height:100%;min-height: 500px;">
    <div id="tag-canvas"></div>
</div>

<script src="/js/wordcloud2.js"></script>

{{- range $key, $value := .Data.Terms.Alphabetical }}
    {{ if eq "" ($.Scratch.Get "tagsMap") }}
        {{ $.Scratch.Set "tagsMap" (slice (dict .Name .Count))  }}
    {{ else }}
        {{ $.Scratch.Add "tagsMap" (slice (dict .Name .Count)) }}
    {{ end }}
{{- end }}
{{ $result := ($.Scratch.Get "tagsMap")}}
`<span id="tag-temp" style="display:none">`{{$result | jsonify }}

<script>
    //因为前期每个标签值比较小，帮X一个系数
    //为了动态宽度[[]()]()
    var div = document.querySelector("#sourrounding_div");
    var canvas = document.querySelector("#tag-canvas");
    canvas.style.width = div.offsetWidth+'px';
    canvas.style.height = div.offsetHeight+'px';
    var wordFreqData =  document.querySelector("#tag-temp").innerHTML;

    let tagMap = new Map();
    let tagArray = new Array();
    {{- range $key, $value := .Data.Terms }}
    tagMap.set("{{ $key }}", {{- len $value }});
    tagArray.push([{{- $key }}, {{- len $value }}]);
    {{- end }}
    
    //获取当前是暗色还是浅色
    var isDark = document.body.className.includes("dark");
    WordCloud(canvas, {
          "list": tagArray,//或者[['各位观众',45],['词云', 21],['来啦!!!',13]],只要格式满足这样都可以
          "shape": "diamond", //形状 circle (default), cardioid (心型), diamond, square, triangle-forward, triangle, pentagon, and star.
          "gridSize": 18, // 密集程度 数字越小越密集
          "weightFactor": 6, // 字体大小=原始大小*weightFactor
          "fontWeight": 'normal', //字体粗细
          "fontFamily": 'Times, serif', // 字体
          "hover": window.drawBox,
          "color": isDark?'random-light':'random-dark', // 字体颜色 'random-dark' 或者 'random-light'
          "backgroundColor": 'transparent', // 背景颜色
          "classes": "tag-cloud-item word-color", //用于点击事件
          "shrinkToFit": true,
          "rotationSteps": 2,
          "minSize": "32",
          "rotateRatio": 0,
      });
      canvas.addEventListener('wordcloudstop', function (e) {
            //点击
            document.querySelectorAll('.tag-cloud-item').forEach(function (element) {
                const text = element.innerHTML;
                element.innerHTML = `<a href="/tags/${text}" style="color: inherit;">${text}</a>`;
            });
        });
  
</script>

{{- end }}{{/* end main */ -}}
```

效果演示如下，各种的形状，参数等可以根据官网进行调整尝试，找到适合自己的。

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20241220104910.png)

### gallery 使用简码支持 neogallery2

参考：[Hugo博客添加相册功能-腾讯云-素履coder](https://cloud.tencent.com/developer/article/2246324) 的实现，这里不赘述，感谢博主，可以参照下一个章节优化一下国内的速度，替换一下 CDN。

## CDN 加速访问

通过 CDN {{< sidenote >}} Content Delivery Network 内容分发网络，使用靠近访问者的服务器为其分发内容 {{< /sidenote >}} 来加速博客在不同地区的访问速度；

国内目前可用的 CDN 节点的话可以参考 [aksBlog](https://blog.akass.cn/resources/mirrors)，感谢其整理与分享，目前本站主要使用的是cdn.jsdmirror.com {{< sidenote >}} 感谢 blog.jsdmirror.com {{< /sidenote >}} ;

此外其实也可以将一些资源直接上传至仓库，直接利用发布平台托管静态文件，利用托管平台自身的服务也行吧；

## Something More 

### 一些注意事项

**调试的时候**记得使用 `--cleanDestinationDir` 选项，不然有时部分页面生成失败了，延续了之前的页面，会使得定位错误变得更加复杂麻烦。
### 一些其他博主的设计

-  [PaperMod 搜索页展示系列列表 | loyayz](https://loyayz.com/website/220610-hugo-papermodx-series-in-search-page.md/)
-  [我的Hugo博客搭建记录 - 少数派](https://sspai.com/post/87431) 最后两个章节，集成 loading 和 memos =》 [Obsidian到Anytype：Anytype介绍+个人实践分享](https://morick66.com/post/20241111200044/) 有很多有意思的页面爆改
-  [Hello World - Hugo博客搭建笔记 | Kenshin2438](https://kenshin2438.top/archives/a8baf211.html/) 一些修改的点子，虽然有一些没有实现
-  [零基础搭建我的个人博客 | HermyGong's Studio](https://hermygong.com/posts/papermod/build-my-website/#%e5%88%9b%e5%bb%ba%e7%ab%99%e7%82%b9%e5%92%8c%e4%b8%bb%e9%a2%98) 简单入门
-  [PaperMod主题Markdown示例 | 向着悠远的苍穹](https://kdjlyy.github.io/posts/tech/markdown-note/#fnref:1)

## Fi 写在最后

本博客的源码位于：[AikenH/hugoblog: my blog’s hugo variant.](https://github.com/AikenH/hugoblog) with submodule [AikenH/papermod-sidebar: my sidebar & transparnet background variant of papermod](https://github.com/AikenH/papermod-sidebar) 

一些处理脚本后续可能会分享到：[AikenH/ManipulateMarkdownNotes: manipulate markdown file for publish or some other reason](https://github.com/AikenH/ManipulateMarkdownNotes) 目前在 dev 分支完善中。

文中有任何错误、版权使用不当之处、或者问题欢迎指正和交流，可以留言也可以发邮件；