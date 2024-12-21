---
catalog: true
categories:
- 笔记系统和博客搭建
cover:
  image: /cover/cover21.jpeg
date: 2024-12-12 13:26:12
description: 以PaperMod主题为例，初始化hugo主题，并配置一些基础的功能
lang: cn
mathjax: false
tags:
- Blog
- Hugo
thumbnail: /img/header_img/lml_bg1.jpg
title: 初始化&设置PaperMod主题的基础功能
toc: true
---

本文其实是配置和自定义 hugo 主题的第一章，从 papermod 的部署开始，记录整个基于 papermod 进行功能拓展和定制化的过程；

## Setup PaperMod 安装和设置 PaperMod

### Init Hugo Project 初始化 Hugo 项目

通过 hugo 指令新建一个 hugo 项目并制定使用 yaml 格式的配置进行设置；

```bash
hugo new site {your-proj-name} --format yaml
```

进入目录并通过 `git clone` 安装一个主题到 theme/ 目录下，如果想要使用 git 进行一些版本管理进行自己的修改，可能需要使用 submodule 的方式添加；

如果想直接对主题的内容也进行修改的话，建议先 fork 一下原仓库，将 fork 的仓库作为 submodule 和 hugo proj 一起进行版本管理和开发；

```shell
cd {your-proj-name}
git init # [optional] for develop
git clone https://github.com/adityatelange/hugo-PaperMod themes/PaperMod --depth=1 
git submodule add --depth=1 https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod # [optional] for develop
```

如果是自己的仓库，记得使用 git 的方式拉取，如果用 http 的方式拉取后，可能无法提交后续的修改，可以用下列命令去修改 submodule 对应的 url {{< sidenote >}} [How to change the remote repository for a git submodule? - Stack Overflow](https://stackoverflow.com/questions/913701/how-to-change-the-remote-repository-for-a-git-submodule) {{< /sidenote >}}

```bash
git submodule set-url themes/PaperMod git@github.com:{your-proj}.git
```

>  后续部署的分支需要转换为 http 的形式，这里可以参见后面部署的文章。

### Manage Your Configurations 配置文件管理

推荐使用 config 文件夹切分基础配置和主题配置，这样方便在多个主题之间进行切换；

```bash
cd your-prj-name
mkdir -p config/_default
mkdir -p config/papermod
touch config/paermod/hugo.yaml
```

配置文件相关的目录结构如下：

```txt
.
├── hugo.yaml
├── config
│   ├── _default
│   │   └── hugo.yaml
│   └── papermod
│       └── hugo.yaml
```

此处使用根目录的 `hugo.yaml` 作为默认的配置文件，`papermod/hugo.yaml` 设置主题特有的配置项，启动特定主题时使用 `--environment {config-dif}` 指定使用特定的配置文件：

```bash
hugo --environment papermod server
```

> 该部分具体的配置切分目前还没有完全确定，暂时还没有深入尝试使用别的主题，但是结构上应该是没问题的；

### Hugo's Organization 博客的文件夹组织逻辑

在进行后续的修改和迭代之前，了解一下 hugo 目录结构对应的作用 {{< sidenote >}} [目录结构 | Hugo官方文档](https://hugo.opendocs.io/getting-started/directory-structure/) {{< /sidenote >}} 是相当重要的，此外由于本文对 PaperMod 主题进行修改，也要对 PaperMod 的覆盖逻辑有一定的了解，包括模版覆盖 {{< sidenote >}} [hugo-PaperMod Wiki-override-theme-template](https://github.com/adityatelange/hugo-PaperMod/wiki/FAQs#override-theme-template) {{< /sidenote >}} 和样式覆盖 {{< sidenote >}} [hugo-PaperMod Wiki-bundling-custom-css-with-themes-assets](https://github.com/adityatelange/hugo-PaperMod/wiki/FAQs#bundling-custom-css-with-themes-assets) {{< /sidenote >}} ，由于官方文档中的介绍都比较详细，这里就不在赘述。

这里有一个特殊功能界面 `_index.md` 可以通过[内容组织 | Hugo官方文档](https://hugo.opendocs.io/content-management/organization/) 简单了解并尝试一下，后面对组织文档和界面可能会有用武之地。

### PaperMod Setting 主题的基础页面配置

**一、设置自己的文章模版**

 Archetypes 文件夹中可以注册不同的文章模版 `archetypes/{template.md}`，可以使用下列命令来基于指定的模版新建文章，此处由于大多时候都是直接使用 obsidian 编写后迁移过来的，该部分就不做太多说明；

```shell
hugo new --kind template {post-name}.md
```

但是[官方模版中页面](https://github.com/adityatelange/hugo-PaperMod/wiki/Installation#sample-pagemd)包含了大量的元数据信息，如果不是需要经常修改的属性，可以直接丢到 `Theme/Hugo.yaml` 中，避免每个 markdown 的元信息都十分冗长，等需要修改的时候再用指定的 `markdown` 上新增去覆盖即可；

**二、启用 Archive 、 Search 、About页面等**

此外 PaperMod 的很多页面是没有默认开启的包括 Search，Archive ，这些参考[官方 wiki](https://github.com/adityatelange/hugo-PaperMod/wiki/Features) 或者中文的话 [PaperMod主题配置 | 🚀 田少晗的个人博客](https://www.shaohanyun.top/posts/env/blog_build2/) 简单配置一下这些页面，并启动 server 看一下这些页面是否正常生成；

about 界面可以仿照 archive 界面直接创建一个 about.md 在 content 目录中，最终其呈现的 URL 如下：`http://localhost:1313/about/`，content 中存放文件的最终路径均类似，会包含对应的文件夹路径。创建完成后将其新增到导航栏中 {{< sidenote >}} [FAQs · adityatelange/hugo-PaperMod Wiki](https://github.com/adityatelange/hugo-PaperMod/wiki/FAQs#add-menu-to-site) {{< /sidenote >}} : 

**三、参考[官方wiki](https://github.com/adityatelange/hugo-PaperMod/wiki/Features) 完成自己需要的基本模式和参数设置。**

完成上面三步设置之后，添加一下博文测试一下各方面效果是否符合预期，没问题的话就可以开始折腾了👹

## Extra Basic Function Support 额外基础功能支持

现在编写 Markdown 的时候事实上大多都额外支持或者使用了 Html 的部分语法来使得 Markdown 更加美观，或者是 Latex 来记录一些数学推导，但是博客本身这些功能要么没有默认开启或者是没有很好的支持，因此首先拓展这些基础功能；

### Render Html 支持对 html 的渲染

基于安全性考虑，默认的 Goldmark 并不会渲染混合在 markdown 中的 html {{< sidenote >}} [Configure markup | Hugo](https://gohugo.io/getting-started/configuration-markup/#rendererunsafe) {{< /sidenote >}} ，要打开的话修改/添加如下设置即可：

```yaml
markup:
  goldmark:
    renderer:
      unsafe: true
```

> 这里请确保自己的 html 内容是安全的

### Render Latex 支持渲染 Latex

这一部分相关的资料和文章还是比较多的，主要会遇到的问题都是由于 markdown 渲染和 latex 渲染之间的冲突导致的，被 ` $` 或者 `$$ ` 包裹的内容需要如何被匹配和被谁渲染，以及一些其他的特殊字符之间的问题；

> [!Error]
>  没有特别处理过的话，最终会导致一些复杂的 Latex 或者是一些内联公式导致最后的样式混乱；

经过多种尝试后，这里最终使用的如下方案 {{< sidenote >}} 使用 [Mathematics in Markdown | Hugo](https://gohugo.io/content-management/mathematics/) 中的分隔符处理 {{< /sidenote >}} {{< sidenote >}} 使用 [How to enable latex on PaperMod | terakoya](https://kiwamizamurai.github.io/posts/2022-03-06/) 该博主的 katex 方案 {{< /sidenote >}}  {{< sidenote >}} [How to enable Math Typesetting in PaperMod? · Issue #236 · adityatelange/hugo-PaperMod](https://github.com/adityatelange/hugo-PaperMod/issues/236) 也提到了这种混合解法 {{< /sidenote >}} ：

修改 `hugo.yaml` ：

```yaml
markup:
  goldmark:
    extensions:
      passthrough:
        delimiters:
          block:
          - - \[
            - \]
          - - $$
            - $$
          inline:
          - - \(
            - \)
        enable: true
params:
  math: true
```

在 `layouts/partials` 中添加 `math.html`

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css" integrity="sha384-MlJdn/WNKDGXveldHDdyRP1R4CTHr3FeuDNfhsLPYrq2t0UBkUdK2jyTnXPEK1NQ" crossorigin="anonymous">
<!-- The loading of KaTeX is deferred to speed up page rendering -->
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.js" integrity="sha384-VQ8d8WVFw0yHhCk5E8I86oOhv48xLpnDZx5T9GogA/Y84DcCKWXDmSDfn13bzFZY" crossorigin="anonymous"></script>
<!-- To automatically render math in text elements, include the auto-render extension: -->
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/contrib/auto-render.min.js" integrity="sha384-+XBljXPPiv+OzfbB3cVmLHf4hdUFHlWNZN5spNQ7rmHTXpd7WvJum6fIACpNNfIR" crossorigin="anonymous"
    onload="renderMathInElement(document.body);"></script>

<!-- for inline -->
<script>
document.addEventListener("DOMContentLoaded", function() {
    renderMathInElement(document.body, {
        delimiters: [
            {left: "$$", right: "$$", display: true},
            {left: "$", right: "$", display: false}
        ]
    });
});
</script>
```

在 `layouts/partials/extend_head.html` 的末尾添加如下内容：

```html
{{ if or .Params.math .Site.Params.math }}
{{ partial "math.html" . }}
{{ end }}
```

此外，针对有时因为三个 `{{{` 的出现导致渲染公式异常的情况{{< sidenote >}} [Hugo博客添加LaTeX语法支持 | 🚀 田少晗的个人博客](https://www.shaohanyun.top/posts/env/hugo_mathjax/){{< /sidenote >}}，可以通过脚本在 publish 时在代码块外侧添加 `<div></div>` 避免 markdown 干涉公式的渲染，使其正确渲染：

这里提供我的处理脚本，以供参考：
> 并不一定需要处理，可以视自己配置后的具体情况而定

```python
def _surround_latex_by_tag(self, content:str) -> str:
        # *. need to match those inline latex & block latex & ignore those $ in ``` block
        # 1. read code block and ignore it.
        # 非贪婪匹配
        code_block_pattern = re.compile(r'```.*?```', re.DOTALL)
        preserved_code_blocks = {}
        for i, match in enumerate(code_block_pattern.finditer(content)):
            placeholder = f"__CODE_BLOCK_{i}__"
            preserved_code_blocks[placeholder] = match.group(0)
            content = content.replace(match.group(0), placeholder)

        # 2. add space surround the inline latex sentence
        inline_latex_pattern = re.compile(r'(?<!\ $)(\$ .*?\ $)(?!\$ )')
        
        content = inline_latex_pattern.sub(lambda match: self._latex_add_space_inline(match, content), content)

        # 3. add newline between the `\ $\$ ` block or `\ $\$ \$` block 
        block_latex_pattern = re.compile(r'(?<!\S)(\ $\$ .*?\ $\$ |(?<!\S)\ $\$ \ $.*?\$ \ $\$ )(?!\S)', re.DOTALL)

        content = block_latex_pattern.sub(lambda match: self._latex_add_div_tags(match, content), content)

        # 4. restore the code block
        for placeholder, code_block in preserved_code_blocks.items():
            content = content.replace(placeholder, code_block)
            
        return content
```

其他参考资料 {{< sidenote >}} [Math Typesetting | PaperMod](https://adityatelange.github.io/hugo-PaperMod/posts/math-typesetting/) {{< /sidenote >}}

### Rss Setting for Follow 为 follow 认证设置 rss 

Ref： [Follow 中如何 Claim 自己的博客 | Rokcso's blog](https://rokcso.com/p/follow-claim-feed/) 

参考上述文章，在 `rss.xml` 中设置相关的 RSS Tag 即可，感谢博主的分享；

### CopyRight Setting 在 footer 设置 License

参考：[Hugo+PaperMod 双语博客搭建 Home-Info+Profile Mode - YUNYI BLOG](https://www.yunyitang.me/hugo-papermod-blog/) ，从 [Choose a License](https://chooser-beta.creativecommons.org/) 按自己的需求选择一个协议，并设置自己的知识共享协议；

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20241218212740.png)

我这里直接硬编码进 `layouts/partials/footer.html` 中 如下：

```html
<footer class="footer">
    {{- if not site.Params.footer.hideCopyright }}
        {{- if site.Copyright }}
        <span>{{ site.Copyright | markdownify }}</span>
        {{- else }}
        
        <span>&copy; {{ now.Year }} <a href="{{ "" | absLangURL }}">{{ site.Title }}</a></span>
        <span xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/">
            Licensed under
            <a
              href="https://creativecommons.org/licenses/by-nc/4.0/?ref=chooser-v1"
              target="_blank"
              rel="license noopener noreferrer"
              style="display:inline-block;"
              >CC BY-NC 4.0 </a
            ></span
        >
        {{- end }}
        {{- print " · "}}
    {{- end }}
```

## Basic Style Change 基础样式修改

PaperMod 主题本身有一些基础样式个人不是很喜欢，例如内容部分的宽度比较窄，在全屏或者宽屏观看的时候比较变扭。因此这里也会针对主题的一些基础样式做针对的调整。
### Get Wider Space for Content 拓宽正文区域

根据自己的布局修改 `css` 中如下属性即可 {{< sidenote >}} [Change width of the content  hugo-PaperMod · Discussion #442](https://github.com/adityatelange/hugo-PaperMod/discussions/442) {{< /sidenote >}} ：

```css
:root {
  --post-width: max(60vw, 100vh);
  --main-width: max(60vw, 100vh);
}
```

### Header Counter 为 Title 添加章节序号

直接利用 CSS 的 `counter` 和 `before` 属性为正文中的小标题添加对应的章节序号，实现如下：

```css
main {
    counter-reset: h1-cnt h2-cnt h3-cnt h4-cnt h5-cnt h6-cnt;
}

.post-content h1 {
    counter-increment: h1-cnt;
    counter-reset: h2-cnt h3-cnt h4-cnt h5-cnt h6-cnt; /* Reset lower levels */
}

.post-content h2 {
    counter-increment: h2-cnt;
    counter-reset: h3-cnt h4-cnt h5-cnt h6-cnt; /* Reset lower levels */
}

.post-content h3 {
    counter-increment: h3-cnt;
    counter-reset: h4-cnt h5-cnt h6-cnt; /* Reset lower levels */
}

.post-content h4 {
    counter-increment: h4-cnt;
    counter-reset: h5-cnt h6-cnt; /* Reset lower levels */
}

.post-content h5 {
    counter-increment: h5-cnt;
    counter-reset: h6-cnt; /* Reset lower levels */
}

.post-content h6 {
    counter-increment: h6-cnt;
}

.post-content h1::before {
    content: counter(h1-cnt) '. ';
}

.post-content h2::before {
    content: counter(h2-cnt) '. ';
}

.post-content h3::before {
    content: counter(h2-cnt) '.' counter(h3-cnt) '. ';
}

.post-content h4::before {
    content: counter(h2-cnt) '.' counter(h3-cnt) '.' counter(h4-cnt) '. ';
}

.post-content h5::before {
    content: counter(h2-cnt) '.' counter(h3-cnt) '.' counter(h4-cnt) '.' counter(h5-cnt) '. ';
}

.post-content h6::before {
    content: counter(h2-cnt) '.' counter(h3-cnt) '.' counter(h4-cnt) '.' counter(h5-cnt) '.' counter(h6-cnt) '. ';
}
```

需要注意的是，这里由于笔者习惯在正文中仅使用>=2 级的标题，因此对 H1 是没有做显示的，如果需要从 H1 开始需要对上述 css 进行简单调整；

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20241218190430.png)

将该 css 存放在 `assets/css/extended` 中即可生效。

### Pagination Update 分页拓展

当博客多起来以后，如果在 post 界面不显示页码，以及不能快速的回到首页的话，十分破坏体验，因此简单的添加了回到首页和去到尾页的按钮，方便翻页操作，同时将页码打开，效果如下：

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20241218190634.png)

一、在 `hugo.yml` 中开启页码

```yaml
params:
  ShowPageNums: true
```

二、添加跳转至首页和尾页的 button {{< sidenote >}} 参数参考[分页 | Hugo官方文档](https://hugo.opendocs.io/templates/pagination/) {{< /sidenote >}}

在 `layouts/_default/list.html` 中的 prev 和 next 处添加 button 如下：

```html
<footer class="page-footer">
  <nav class="pagination">
    {{- if $paginator.HasPrev }}
    <a class="last-icon" href="{{ $paginator.First.URL | absURL }}">
      <!-- <ion-icon name="play-back-circle-outline"></ion-icon> -->
      <span><<</span>
    </a>
    <a class="prev" href="{{ $paginator.Prev.URL | absURL }}">
      «&nbsp;{{ i18n "prev_page" }}&nbsp;
      {{- if (.Param "ShowPageNums") }}
      {{- sub $paginator.PageNumber 1 }}/{{ $ paginator.TotalPages }}
      {{- end }}
    </a>
    {{- end }}
    {{- if $paginator.HasNext }}
    <a class="next" href="{{ $paginator.Next.URL | absURL }}">
      {{- i18n "next_page" }}&nbsp;
      {{- if (.Param "ShowPageNums") }}
      {{- add 1 $paginator.PageNumber }}/{{ $ paginator.TotalPages }}
      {{- end }}&nbsp;»
    </a>
    <a class="last-icon" href="{{ $paginator.Last.URL | absURL }}">
      <!-- <ion-icon name="play-forward-circle-outline"></ion-icon> -->
       <span>>></span>
    </a>
    {{- end }}
  </nav>
</footer>
```

三、简单设置其样式即可，可以在 `assets/css/extended` 中随意添加一个 css 文件对默认样式进行覆盖，当然也可以考虑写在主题的 css 中。

```css
.pagination a.last-icon {
  background: unset;
  border: unset;
  font-size: 1.3rem;
  color: #001e1d;
  /* padding-top: 2px; */
  font-weight: bold;
}

.pagination a.last-icon {
  color: var(--primary);
}
```

虽然没有按照该方法实现，但是如果想要更好的分页，可以参考[自定义 Hugo 的分页导航栏 | DSRBLOG](https://blog.dsrkafuu.net/post/2019/hugo-custom-pagination/)；

### PanGu JS 引入盘古之白

{{< quote-center >}}

為什麼你們就是不能加個空格呢？{{< sidenote >}} [vinta/pangu.js: Paranoid text spacing in JavaScript](https://github.com/vinta/pangu.js) {{< /sidenote >}}

如果你跟我一樣，每次看到網頁上的中文字和英文、數字、符號擠在一塊，就會坐立難安，忍不住想在它們之間加個空格。這個外掛（支援 Chrome 和 Firefox）正是你在網路世界走跳所需要的東西，它會自動替你在網頁中所有的中文字和半形的英文、數字、符號之間插入空白。

漢學家稱這個空白字元為「盤古之白 ，因為它劈開了全形字和半形字之間的混沌。另有研究顯示，打字的時候不喜歡在中文和英文之間加空格的人，感情路都走得很辛苦，有七成的比例會在 34 歲的時候跟自己不愛的人結婚，而其餘三成的人最後只能把遺產留給自己的貓。畢竟愛情跟書寫都需要適時地留白。

{{< /quote-center >}}

感谢 `pangu.js` 的作者，以及分享异步加载方案的博主 {{< sidenote >}} [盘古之白 - 中英文之间自动加空格 - Yihui Xie | 谢益辉](https://yihui.org/cn/2017/05/pangu/) {{< /sidenote >}} {{< sidenote >}} [Hugo：中英文之间自动加空格 | Blog](https://huuuuuuo.github.io/post/hugo%E4%B8%AD%E8%8B%B1%E6%96%87%E4%B9%8B%E9%97%B4%E8%87%AA%E5%8A%A8%E5%8A%A0%E7%A9%BA%E6%A0%BC/) {{< /sidenote >}} ， 将该脚本异步引入 hugo 中。

在 `layouts\partials\footer.html` 中添加即可。

```html
<script>
    (function(u, c) {
      var d = document, t = 'script', o = d.createElement(t),
          s = d.getElementsByTagName(t)[0];
      o.src = u;
      if (c) { o.addEventListener('load', function(e) { c(e); }); }
      s.parentNode.insertBefore(o, s);
    })('//cdn.bootcss.com/pangu/3.3.0/pangu.min.js', function() {
      pangu.spacingPage();
    });
    </script>
```

### Font Setting 字体修改

本文使用的中文字体为[霞鹜文楷](https://github.com/chawyehsu/lxgw-wenkai-webfont) ，感谢开源分享，英文字体可以去 [google font](https://fonts.google.com/specimen/Open+Sans?preview.text=Let%E2%80%99s%20learn%20and%20innovate%20together!) 中找一个顺眼的，参考上述开源字体的指引，通过 cdn 引入对应的 html 和 css 即可直接在 font-family 中调用。

- html 插入到：`layouts/partials/extend_head.html` 中
- （如有）css 插入到 `assets/css/extended/blank.css` 中

然后直接在 css 中使用 `font-family` 调用即可：

```css
body {
  font-family: "Open Sans", "LXGW WenKai", sans-serif;
}
```

### Tags on Post Page 文章 widget 中显示 tag 信息

当 post 数量较多时，文章是比较零散的，希望能在 widget 界面展示文章的 Tag 提供更多文章的信息，来建立文章和文章之间的关联。

![](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20241219085800.png)

找到主题中定义 widget 结构和样式的地方 `/layouts/_default/list.html` 中的 `post-entry` 部分 {{< sidenote >}} [How to display tags in the post list? · adityatelange/hugo-PaperMod · Discussion #606](https://github.com/adityatelange/hugo-PaperMod/discussions/606) {{< /sidenote >}} {{< sidenote >}} 主要样式和实现参考：[novikov-ai/novikov-ai.github.io](https://github.com/novikov-ai/novikov-ai.github.io/blob/cc240bfc77819b168f1e70a55d4f7ee44c296ab3/layouts/_default/list.html#L85) {{< /sidenote >}} ，使用 go-template 语法遍历&获取具体的 tag {{< sidenote >}} 参考 [Params | Hugo官方文档](https://hugo.opendocs.io/methods/page/params/)获取 tag {{< /sidenote >}} ，然后将其添加到对应的 meta 模块后面如下：

```html
<footer class="entry-footer">
      {{- partial "post_meta.html" . -}}
    </footer>
    {{- if .Params.tags }}
    <div class="tags" style="padding: 2px;">
      <div style="display: flex; flex-wrap: wrap; justify-content: flex-end; margin-top: 5px;">
        {{ range .Params.tags }}
        <a href="/tags/{{ . | urlize }}" style="margin-right: 5px; 
                  color: white; 
                  background-color: rgba(53, 174, 128, 0.7); 
                  border-radius: 6px; 
                  padding: 1px 10px;
                  font-size: 13px;
                  z-index: 999; ">
          #{{ . }}
        </a>
        {{ end }}
      </div>
    </div>
    {{- end }}
```

- 这里添加 z-index 将 tag 标签移至外层，避免元素置于其余元素下方导致跳转失效。
- 此外为了使得 tag 和 meta 信息处于同一行而非另起一行，添加如下样式：

```css
.tags {
  /* display: inline-block; */
  float: right;
}
```

### Tag on Meta info 文章的元信息中显示 Tag

在上述的讨论区中 [mgopsill](https://github.com/adityatelange/hugo-PaperMod/discussions/606#discussioncomment-4705301) 提供了解决方案，感谢其分享，具体操作是通过修改 `layouts/partials/post_meta.html` 中的 `author` 部分如下：

```html
{{- $author := (partial "author.html" .) }}
{{- $tags := (partial "tags.html" .) }}
{{- if $tags }}
    {{- $scratch.Add "meta" (slice $ author $tags) -}}
{{- else}}
    {{- $scratch.Add "meta" (slice $ author) -}}
{{- end}}
```

并添加对应的 `layouts/partials/tags.html` 如下：

```html
{{- $tags := .Params.tags -}}
{{- if $tags -}}
  {{- $lastIndex := sub (len $ tags) 1 -}}
  {{- range $index, $ tag := $tags -}}
    <a href="/tags/{{ $tag | urlize }}"> {{ $ tag }}</a>
    {{- if ne $index $ lastIndex }}&nbsp;·&nbsp;{{ end -}}
  {{- end -}}
{{- end -}}
```

### Post Widget's Image to left 将文章封面图移至侧边

在 post 页面，如果封面图片处于信息块的上方，会导致其对页面空间过度占用，同时不同 size 也会导致呈现效果好坏参差不齐，因此为了使得页面更加美观且高效，参考 [Hugo博客文章封面图片缩小并移到侧边 | PaperMod主题-素履coder](https://cloud.tencent.com/developer/article/1969889) 的文章，将文章的封面移至侧边；

按照上述博主说的用 `div clss=post-info` 将整个 post-entry 卡片的内容包括 content、meta、footer 等包裹起来后，将下列两行移至 post-info 的上一行即可，最终结构如下：

```html
<article class="{{ $class }}">
  {{- $isHidden := (.Param "cover.hiddenInList") | default (.Param "cover.hidden") | default false }}
  {{- partial "cover.html" (dict "cxt" . "IsSingle" false "isHidden" $isHidden) }}
  <div class="post-info">
    ...
  </div>

```

该方法会导致同时影响了文章顶部的图片展示，笔者不同于原文的解决方案，这里通过更具体的 css 选择器做区分即可，还有一些其他的调整如下 `assets/css/common/post-entry.css`：

```css
/* F2 make the cover in the side on blogs page */
.post-entry {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.post-info {
  display: inline-block;
  overflow: hidden;
  width: 90%;
}

.post-entry .entry-cover {
  overflow: hidden;
  padding-right: 18px;
  height: 80%;
  width: 40%;
  margin-bottom: unset;
}
```

## Something more 一些别的

### 一个多图片居中失败的例子

以往使用如下代码使得多张图片同一行居中显示如下图所示，此次在该主题上失效：

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20241219150455.png)

源码：

```html
<p align="center">
  <a href=" https://aikenh.cn"><img alt="github" title="AikenD" src=" https://custom-icon-badges.demolab.com/badge/-aiken%20blog-palegreen?style=for-the-badge&logo=package&logoColor=black"></a>
  <a href=" https://twitter.com/aiken_h97"><img alt="twitter" title="Twitter" src=" https://custom-icon-badges.demolab.com/badge/-twitter%20aikenh97-plum?style=for-the-badge&logo=package&logoColor=black"></a>
  ...
</p>
```

可以考虑使用 div 或者内联样式去覆盖主题或 hugo 的样式修复该问题如下：

使用 div：

```html
<div style="display: flex; justify-content: center; align-items: center;"> 
<a href="https://aikenh.cn"><img alt="github" title="AikenD" src="https://custom-icon-badges.demolab.com/badge/-aiken%20blog-palegreen?style=for-the-badge&logo=package&logoColor=black"></a> <a href="https://twitter.com/aiken_h97"><img alt="twitter" title="Twitter" src="https://custom-icon-badges.demolab.com/badge/-twitter%20aikenh97-plum?style=for-the-badge&logo=package&logoColor=black"></a> 
...
</div>
```

使用 inline-style in p:

```html
<p align="center">
  <a href="https://aikenh.cn" style="display: inline-block; margin: 0 5px;"><img alt="github" title="AikenD" src="https://custom-icon-badges.demolab.com/badge/-aiken%20blog-palegreen?style=for-the-badge&logo=package&logoColor=black"></a>
  <a href="https://twitter.com/aiken_h97" style="display: inline-block; margin: 0 5px;"><img alt="twitter" title="Twitter" src="https://custom-icon-badges.demolab.com/badge/-twitter%20aikenh97-plum?style=for-the-badge&logo=package&logoColor=black"></a>
 ...
</p>
```

### 一些资源或参考

- 网页图标：[favicon.io]( https://favicon.io/ ) 
- 一种毛玻璃的实现方式：[Achieving backdrop blur without 'backdrop-filter' - DEV Community](https://dev.to/rolandixor/achieving-backdrop-blur-without-backdrop-filter-16ii) 
- 给网站添加 loading 页面： [How to Quickly Add a Loading Screen onto your website! - DEV Community](https://dev.to/lensco825/how-to-quickly-add-a-loading-screen-onto-your-website-7ga)
- 对 hugo 的理解：[风月](https://kuang.netlify.app/blog/hugo.html) 

## FI

文中有任何错误、版权使用不当之处、或者问题欢迎指正和交流，可以留言也可以发邮件，本博客的源码位于：

[AikenH/hugoblog: my blog’s hugo variant.](https://github.com/AikenH/hugoblog) with submodule [AikenH/papermod-sidebar: my sidebar & transparnet background variant of papermod](https://github.com/AikenH/papermod-sidebar)

一些处理脚本后续可能会分享到：

[AikenH/ManipulateMarkdownNotes: manipulate markdown file for publish or some other reason](https://github.com/AikenH/ManipulateMarkdownNotes) 

目前在 dev 分支完善中。