---
catalog: true
categories:
- 笔记系统和博客搭建
cover:
  image: /cover/cover4.jpeg
date: 2024-12-17 17:38:18
description: 利用render hook修改markdown元素的默认渲染样式
lang: cn
mathjax: false
tags:
- Blog
- Hugo
thumbnail: /img/header_img/lml_bg1.jpg
title: 更改hugo主题的markdown渲染
toc: true
---

> [!summary]+
> 利用 hugo 主题的 render hook 的功能，修改 markdown 转换为 html 的样式，通过这种方法更改特定 Markdown 元素的渲染；

## What's Render Hook In Hugo 啥是渲染钩子

Render Hook 是 Hugo 给希望增强 Markdown 渲染功能的开发者留出的工具，通过 Render Hook 可以使开发者为各种 Markdown 元素创建自定义的渲染模版，满足不同用户对于渲染的不同需求；

具体而言，当编辑/创建如下这些特定路径的文件，其会覆盖默认的 markdown 渲染成 html 的方式，具体路径为 {{< sidenote >}} [Render Hooks Introduction](https://gohugo.io/render-hooks/introduction/) {{< /sidenote >}} ：

```text
layouts/
└── _default/
    └── _markup/
        ├── render-blockquote.html  # 渲染引用快
        ├── render-codeblock.html   # 渲染代码块
        ├── render-image.html       # 图片
        ├── render-link.html        # 链接
        └── render-table.html       # 表格
```

具体的参数和各种类型的具体文件，请在修改的时候参考对应的官方文档即可，如：[codeBlock](https://gohugo.io/render-hooks/code-blocks/)

### Why ？为啥使用它呢

简单介绍 Render Hook 后，其实其优点就呼之欲出了：

- 灵活 | 可自定义 | 增强功能：可以根据自己的需求随意的更改渲染的样式，甚至嵌入 js 引入复杂功能（收起，复制等）；
- 无需对博文做任何调整，不破坏 markdown 本身的可迁移性；
- 一劳永逸，统一管理；

同时默认的样式在功能和外观上都比较基础，很多特性不被支持，如：

- 外部打开链接
- 代码块的复制和折叠
- 图片的大小限制和位置限制等

而为了支持这些特性，相比借助简码使用支持原生 markdown 的 render hook 去实现新特性，保持文章的简洁和完整性，那当然是最好不过；

## Define Personal Render 定义自己的渲染

### Mermaid 流程图支持

[官方文档](https://gohugo.io/content-management/diagrams/)已经给出了对应的支持方案，主要分为三步：

一、在 `layouts/_default/_markup/render-codeblock-mermaid.html` 中添加

```html
<pre class="mermaid">
    {{- .Inner | htmlEscape | safeHTML }}
  </pre>
  {{ .Page.Store.Set "hasMermaid" true }}
```

二、在内容模版的底部添加如下内容（这里我是添加到 ``layouts/_default/single.html` 中）

```html
{{ if .Store.Get "hasMermaid" }}
  <script type="module">
    import mermaid from 'https://cdn.jsdmirror.com/npm/mermaid/dist/mermaid.esm.min.mjs';
    // import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid/+esm'
    mermaid.initialize({ 
      startOnLoad: true,
      'theme': 'dark',
     });
  </script>
  {{ end }} 
```

>  可以修改 CDN 来加速 mermaid 的加载 {{< sidenote >}} 感谢blog.jsdmirror.com 的镜像站 {{< /sidenote >}}

三、可以在 markdown 中通过代码块的方式调用 mermaid ：

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20241217194932.png)
四、如果 mermaid 仍然渲染失败，或者没有开始渲染，尝试将 guessSyntax 设置为 false 如下 {{< sidenote >}} [Mermaid doesn't work ](https://github.com/adityatelange/hugo-PaperMod/discussions/850) {{< /sidenote >}} {{< sidenote >}}[从零开始搭建Hugo博客](https://ooe.ooo/posts/%E4%BB%8E%E9%9B%B6%E5%BC%80%E5%A7%8B%E6%90%AD%E5%BB%BAhugo%E5%8D%9A%E5%AE%A2/) {{< /sidenote >}}：

```yaml
markup:
  highlight:
    guessSyntax: true
```

最终应该可正常渲染 mermaid，下面是一个随机例子

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20241217201621.png)

[从零开始搭建Hugo博客](https://ooe.ooo/posts/%E4%BB%8E%E9%9B%B6%E5%BC%80%E5%A7%8B%E6%90%AD%E5%BB%BAhugo%E5%8D%9A%E5%AE%A2/) 中还有两种其他的支持 mermaid 的方式，感兴趣的也可以参考；

### Image 自适应图片大小 & FancyBox 查看原图

多年图像不居中就难受症候群，对原始的图片渲染确实是十分不满意，同时一些比较大/长的图片也会很破坏整个页面的结构和阅读体验，为了避免用 html 逐个调整，因此修改图像的默认 render hook {{< sidenote >}} 这里感谢[夜云泊](https://lifeislife.cn/posts/hugo%E4%B8%BB%E9%A2%98%E9%85%8D%E7%BD%AE/)分享的十分完整的解决方案 {{< /sidenote >}} ；

这里我针对 PaperMod 主题对[夜云泊](https://lifeislife.cn/posts/hugo%E4%B8%BB%E9%A2%98%E9%85%8D%E7%BD%AE/) 提供的代码做了简单的改动，具体原因已不可考，依稀记得是由于原始的 markdown 中有部分用 html 呈现的图像会有一些问题：

修改后的 `render-image.html` 如下：

```html
{{- $u := urls.Parse .Destination -}}
{{- $src := $u.String -}}
{{- if not $u.IsAbs -}}
  {{- $path := strings.TrimPrefix "./" $u.Path }}
  {{- with or (.PageInner.Resources.Get $path) (resources.Get $path) -}}
    {{- $src = .RelPermalink -}}
    {{- with $u.RawQuery -}}
      {{- $src = printf "%s?%s" $src . -}}
    {{- end -}}
    {{- with $u.Fragment -}}
      {{- $src = printf "%s#%s" $src . -}}
    {{- end -}}
  {{- end -}}
{{- end -}}
{{- $attributes := merge .Attributes (dict "alt" .Text "src" $src "title" (.Title | transform.HTMLEscape) "loading" "lazy") -}}
{{if .Page.Site.Params.fancybox }}
<div class="post-img-view">
  <a data-fancybox="gallery" href="{{ .Destination | safeURL }}">
    <img {{- with $attributes -}}
    {{- range $k, $v := . -}}
      {{- if $v -}}
        {{- printf " %s=%q" $k $v | safeHTMLAttr -}}
      {{- end -}}
    {{- end -}}
  {{- end -}}  class="responsive-image" src="{{ .Destination | safeURL }}" style="display: block; margin: 0 auto;"
      alt="{{ .Text }}" {{ with .Title}} title="{{ . }}" {{ end }} />
  </a>
</div>
{{else}}
<img
  {{- range $k, $v := $attributes -}}
    {{- if $v -}}
      {{- printf " %s=%q" $k $v | safeHTMLAttr -}}
    {{- end -}}
  {{- end -}} style="display: block; margin: 0 auto; " class="responsive-image">
{{- /**/ -}}
{{ end }}

<script>
  document.addEventListener("DOMContentLoaded", function() {
      var images = document.querySelectorAll(".responsive-image");
      var maxHeight = window.innerHeight / 2.5;
      images.forEach(function(image) {
          image.style.maxHeight = maxHeight + "px";
      });
  });
</script>
```

然后去 Hugo 配置文件 `hugo.yml` 中新增一项：

```yaml
params:
  fancybox: true
```

具体的代码介绍请转向原作者 👍，最终效果如下：

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20241217201918.png)

开启 fancybox：

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20241217201933.png)

### Link 默认新窗口打开网页

参考： [How to open plain URL links in a new tab? - support - HUGO](https://discourse.gohugo.io/t/how-to-open-plain-url-links-in-a-new-tab/25523/6) 实现如下 `render-link.html`：

```html
<a href="{{ .Destination | safeURL }}" {{ with .Title}} title="{{ . }}" {{ end }}{{ if strings.HasPrefix
    .Destination "http" }} target="_blank" rel="noopener" {{ end }}>{{ .Text | safeHTML }}</a>
```

### Code Block  代码折叠

由于有时会分享一些较长的代码，如果始终使代码完整呈现的话，其实页面不是那么的美观，而且也废滚轮，因此感觉折叠功能还是很必要的🔥，同时由于默认的样式怎么看都有些变扭，因此也顺便的加上标签栏来优化对应的样式。

实现代码折叠主要是如下思路：

1. 将原本的代码渲染包含在 `<div class="code-content">` 中；
2. 新增同级别元素 `<div class="code-title">` 用于存放标题，同时作为开关控制折叠；

接着话不多说开始实现，首先获取原本的基础实现和一些基本参数 {{< sidenote >}} [Code block render hooks | Hugo](https://gohugo.io/render-hooks/code-blocks/) {{< /sidenote >}} 如下：

```go template
{{ $result := transform.HighlightCodeBlock . }}
{{ $result.Wrapped }}
```

> 该代码置于 `render-codeblock.html` 中，为默认的代码块渲染样式，如果需要修改特定语言的渲染，可以参考官方文档和 mermaid 的方式去处理；

接着就很简单了，通过 `{{.Type}}` 可以获取语言类型信息用作 title，然后通过 js 和 css 实现折叠效果和样式调整即可，最终实现效果如下：

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20241218071014.png)

折叠后：

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20241218071043.png)

具体代码如下：

```html
<div class="code-block">
    <div class="code-title" onclick="toggleCode(this)">
        <span class="code-block-open"><ion-icon name="code-slash-outline"></ion-icon></span>
        <span>{{.Type}}</span>
    </div>
    <div class="code-content">
        {{ $result := transform.HighlightCodeBlock . }}
        {{ $result.Wrapped }}
    </div>
</div>

<script>
function toggleCode(element) {
    const codeContent = element.nextElementSibling;
    if (codeContent.style.display === "none" || codeContent.style.display === "") {
        codeContent.style.display = "block"; // Show the code block
        codeContent.parentNode.classList.remove("code-has-hidden-child");
    } else {
        codeContent.style.display = "none"; // Hide the code block
        codeContent.parentNode.classList.add("code-has-hidden-child");

    }
}
</script>
```

```css
.code-block {
    background: var(--code-block-bg);
    box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    position: relative;
    /* padding: 2px; */
    margin: 8px 0px;
}

.code-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.602);
    cursor: pointer;

}

.code-title span {
    letter-spacing: 1.57px;
    color: rgb(212 212 212);
    /* width: 90%; */
    /* align-items: center; */
    font-size: 1rem;
    padding: 5px;
    padding-left: 10px;
    text-transform: capitalize;
}

.code-has-hidden-child {
    border: 1px solid salmon;
}
```

此外这里也将 copy-code 按钮挪到了标题栏上，主要是修改 copy 的样式和渲染位置 {{< sidenote >}} 可以参考 [[Feat] update default code style · AikenH ]( https://github.com/AikenH/papermod-sidebar/commit/2305a1c5a7098edaee8c850bae4efa2e22bb700d ) 剩余部分的修改，感兴趣的也可以点个 star，感谢。 {{< /sidenote >}}
### Alert-Blockquote 特殊引用块

在之前简码部分的博客已经介绍了一些特殊的引用块样式和实现，可以根据官网 [Blockquote render hooks | Hugo](https://gohugo.io/render-hooks/blockquotes/) 将其改为自己的默认引用块即可，即可 markdown 中按照如下方式引用实现：

```markdown
> [!{alert-keywork}]
> {alert-content}
```

这是本博客中部分样式展示：

Note 样式：

> [!note]
> test note block's style.

important 样式

> [!important]
>  重要内容

Error 样式

> [!Error]+
> Error

该部分可以发现大家都参考了 [hugo-notice](https://github.com/martignoni/hugo-notice) ，而本博客则是在其他博主分享 {{< sidenote >}} 感谢 [tom's blog](https://blog.grew.cc/posts/hugo-alert-blockquote/)  {{< /sidenote >}} {{< sidenote >}} 感谢[绅士喵](https://blog.hentioe.dev/posts/hugo-support-blockquote-alerts.html) {{< /sidenote >}} 的样式之上根据本人的 Obsidian 调整了一下样式和默认值，具体实现如下：

```html
{{ $alertTypes := dict
  "note" "<path d=\"M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z\"></path>"
  "tip" "<path d=\"M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z\"></path>"
  "important" "<path d=\"M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z\"></path>"
  "warning" "<path d=\"M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z\"></path>"
  "caution" "<path d=\"M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z\"></path>"
  "error" "<path d=\"M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z\"></path>"
}}

{{
  $default := "<path d=\"M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z\"></path>"
}}
  
  
{{ if eq .Type "alert" }}
<blockquote class="alert-blockquote alert-{{ .AlertType }}">
  <p class="alert-heading">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
      {{- $alertType := index $alertTypes .AlertType | default $default }}
      {{ $alertType | safeHTML }}
    </svg>
    <span>{{ or (i18n .AlertType) (title .AlertType) }}</span>
  </p>
  {{ .Text | safeHTML }}
</blockquote>
{{ else }}
<blockquote>
  {{ .Text | safeHTML }}
</blockquote>
{{ end }}
```

```css
.alert-blockquote {
  --title-color: #fff;
  --content-color: inherit;
  padding: 18px 18px 10px 18px !important;
  line-height: 24px;
  margin: 1rem 0;
  border-radius: 4px;
  color: var(--content-color);
  /* border-left: none !important; */
  /* border: 1px solid black; */
}

.dark .alert-blockquote *,
.alert-blockquote * {
  color: var(--content-color) !important;
}

.post-content blockquote%3Ep>p{
    padding: unset;
}

.alert-blockquote .alert-heading {
  margin: -18px -18px 12px;
  padding: 10px 18px;
  border-radius: 4px 4px 0 0;
  font-weight: 600;
  color: var(--title-color) !important;
  display: flex;
  align-items: center;
}

.alert-blockquote .alert-heading svg {
  width: 1em !important;
  height: 1em !important;
  margin-right: 0.5rem !important;
  fill: currentColor !important;
}

.alert-blockquote p:last-child {
  margin-bottom: 0;
}

/* Light theme */
/* default */
.alert-blockquote {
  border-top:unset;
  /* border: 1px solid #166dd0; */
  /* --title-background-color: rgba(221, 233, 244, 0.631); */
  --content-background-color: rgba(221, 233, 244, 0.602);
}
.alert-blockquote > .alert-heading {
  /* border-bottom: 1px dashed #166dd07c; */
  color: #0969da !important;
}

/* note */
.alert-blockquote.alert-note {
  /* border: 1px solid #166dd0; */
  /* border-left-color: #0969da !important; */
  /* --title-background-color: rgba(221, 233, 244, 0.631); */
  --content-background-color: rgba(221, 233, 244, 0.602);
}
.alert-blockquote.alert-note .alert-heading {
  color: #0969da !important;
}

/* tip */
.alert-blockquote.alert-tip {
  /* border: 1px solid #1a7f37; */
  /* --title-background-color: rgb(173,193,182); */
  --content-background-color: rgba(222, 240, 223, 0.7);
}
.alert-blockquote.alert-tip .alert-heading {
  color: #1a7f37 !important;
  /* border-bottom: 1px dashed #1a7f37; */
}

/* important */
.alert-blockquote.alert-important {
  /* border: 1px solid #8250df; */
  /* border-left-color: #8250df !important; */
  /* --title-background-color: #6843ae7c; */
  --content-background-color: rgba(235, 227, 245, 0.9);
}

.alert-blockquote.alert-important .alert-heading {
  color: #8250df !important;
  /* border-bottom: 1px dashed #8250df; */
}

/* warning */
.alert-blockquote.alert-warning {
  /* border: 1px solid #9a6700; */
  /* border-left-color: #9a6700 !important; */
  /* --title-background-color: rgb(232, 198, 140); */
  --content-background-color: rgba(243, 232, 222);
}
.alert-blockquote.alert-warning .alert-heading {
  color: #9a6700 !important;
  /* border-bottom: 1px dashed #9a6700; */
}

/* caution */
.alert-blockquote.alert-error,
.alert-blockquote.alert-caution {
  /* border: 1px solid #cf222e; */
  /* border-left-color: #cf222e !important; */
  /* --title-background-color: rgb(244, 224, 223,0.5); */
  --content-background-color: rgba(243, 207, 205, 0.9);
}
.alert-blockquote.alert-error .alert-heading,
.alert-blockquote.alert-caution .alert-heading {
  color: #cf222e !important;
  /* border-bottom: 1px dashed #cf222e; */
}

/* Dark theme */
.dark .alert-blockquote {
  border-top:unset;
  /* --content-color: #d0d7dd; */
  /* --title-background-color: #5151527c; */
  --content-background-color: rgba(22, 37, 50, 0.8);
}

.dark .alert-blockquote .alert-heading {
  color: #58a6ff !important;
}

.dark .alert-blockquote.alert-note {
  /* --title-background-color: #58a6ff7c; */
  --content-background-color: rgba(22, 37, 50, 0.8);
}
.dark .alert-blockquote.alert-note .alert-heading {
  color: #58a6ff !important;
}

.dark .alert-blockquote.alert-tip {
  /* --title-background-color: #82bd8a7c; */
  --content-background-color: rgba(55, 84, 56, 0.7);
}
.dark .alert-blockquote.alert-tip .alert-heading {
  color: #3fb950 !important;
}

.dark .alert-blockquote.alert-important {
  /* --title-background-color: #9173c57c; */
  --content-background-color: rgba(46, 32, 62, 0.9);
}
.dark .alert-blockquote.alert-important .alert-heading {
  color: #8d62d8 !important;
}

.dark .alert-blockquote.alert-warning {
  /* --title-background-color: #d1b068a0; */
  --content-background-color: rgb(84, 68, 55);
}
.dark .alert-blockquote.alert-warning .alert-heading {
  color: #d1b271 !important;
}

.dark .alert-blockquote.alert-error,
.dark .alert-blockquote.alert-caution {
  /* --title-background-color: #c94a43; */
  --content-background-color: rgba(108, 57, 54, 0.9);
}
.dark .alert-blockquote.alert-error .alert-heading,
.dark .alert-blockquote.alert-caution .alert-heading {
  color: #ff9791 !important;
}

.alert-blockquote .alert-heading {
  background: var(--title-background-color);
}

.alert-blockquote {
  background: var(--content-background-color);
}


blockquote:not(.alert-blockquote){
  color: #a02222c2;
  border-top: 2px solid  #9c1e1ec2;
  font-size: 0.9rem;
  font-style: italic;
}
```

源码也都已经在 Github 中分享。
## Change Default Renders' Style 改变一些默认样式

除了上述 markdown 基本单元的渲染调整，表格的样式也不是特别美观，但是由于表格本身的 html 模版已经不在需要调整，因此这里仅对其 css 样式做调整。
### Tables 表格样式调整

默认的表格本身主要存在以下的一些问题：

- 非全宽&不居中：这里考虑直接调整为全宽；
- 样式单调：可以按照需求调整为三线表或者调整一下标题栏等；
- 可以添加 Hover 效果来优化交互；

这里通过将 `display` 调整为 `table` 来支持全宽，同时通过 `overflow` 和 `wordbreak` 等属性来自适应格子宽度避免溢出 {{< sidenote >}} [Responsive tables in markdown - support - HUGO](https://discourse.gohugo.io/t/responsive-tables-in-markdown/10639/8) {{< /sidenote >}} {{< sidenote >}} [html - Horizontal scroll on overflow of table - Stack Overflow](https://stackoverflow.com/questions/19794211/horizontal-scroll-on-overflow-of-table/62451601#62451601) {{< /sidenote >}} ；

样式代码如下，编写的时候要避免 table 属性对其他元素的影响，特别是代码块，因此需要用 not 属性做一些排除：

```css
/* make the table fully wide  & style */
.post-content table:not(.lntable .highlighttable,.highlight table,.gist .highlight){
  display: table;
  background-color: transparent;
  border-radius: 6px;
  border: 1px solid black;
  outline: 2px solid black;
  overflow-x: auto;
  table-layout: fixed;
  word-break: break-all;
}
/* responsive ref */
/* ref: https://discourse.gohugo.io/t/responsive-tables-in-markdown/10639/8 */
/* ref: https://stackoverflow.com/questions/19794211/horizontal-scroll-on-overflow-of-table/62451601#62451601 */

.dark .post-content table:not(.lntable .highlighttable,.highlight table,.gist .highlight){
  outline: 2px solid rgb(54, 156, 95);
}

.post-content table:not(.lntable .highlighttable,.highlight table,.gist .highlight) thead{
  background-color: #545d7b8a;
}

.dark .post-content table:not(.lntable .highlighttable,.highlight table,.gist .highlight) thead{
  background-color: rgb(62, 62, 62);
}

.post-content table:not(.lntable .highlighttable,.highlight table,.gist .highlight) td,
.post-content table:not(.lntable .highlighttable,.highlight table,.gist .highlight) tr,
.post-content table:not(.lntable .highlighttable,.highlight table,.gist .highlight) th{
  border-bottom: unset;
  border: 1px solid black,
}

.post-content table:not(.lntable .highlighttable,.highlight table,.gist .highlight) td:hover,
.post-content table:not(.lntable .highlighttable,.highlight table,.gist .highlight) td:focus{
  background-color: rgba(170, 217, 248, 0.8);
  /* transform: scale(1.1); */
  /* border: 2px solid black; */
}

.dark .post-content table:not(.lntable .highlighttable,.highlight table,.gist .highlight) td:hover,
.dark .post-content table:not(.lntable .highlighttable,.highlight table,.gist .highlight) td:focus{
  background-color: rgb(0, 0, 0, 0.7);
  /* transform: scale(1.1); */
  /* border: 2px solid black; */
}
```
## Fi 

>  有错误欢迎指正和交流，感兴趣的也欢迎去 github 上点个 star，不胜感激；