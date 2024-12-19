---
calendar_date: 2022-04-12
catalog: true
categories:
- 笔记系统和博客搭建
cover:
  image: /cover/cover6.jpeg
date: 2022-04-12 11:16:30
description: 以 Livemylive 为例搭建并发布自己的Hexo博客
lang: cn
tags:
- Blog
- Hexo
thumbnail: /img/header_img/lml_bg6.jpg
title: 部署和发布 Hexo 博客
toc: true
---

该文档用以，记录自己（外行）利用Hexo建立Blog的过程，将原本用Gitbook构建的笔记转移到Hexo中，同时购买域名并部署其上。网页部署于[Github Page](AikenH.cn)。以Live my Live主题为例。

腾讯云和Github Page的操作和理解在现有的一些博客中过时了，或者说存在一些问题，后续会对此进行简单的讲解。同时大部分博客都是使用NexT主题进行配置，这里采用的是Live My Life主题，该博文介绍自己的粗浅理解，也为自己后续的工作进行一定的参考。

还存在一些**没有解决**的问题：

- 对主题切换和主题配置和全局配置的的深入理解（Live my Life主题覆盖了很多默认配置）
- 前端代码的理解，**自定义Layout**，超链接，图标等
- 深入理解插件的应用和自定义
- 推送网站到baidu和google（Option）（没有计划）

之后有时间的话可以去研究一下：

**关键词**：Hexo_Livemylive、Github Page、腾讯云（Domain、DNS、SSL）



## Environment

需要准备的环境如下：本地Node（NPM），Page部署Git（SSH），可在Windows，Linux，WSL2中部署均可，但需要注意的是，如果在WSL2中进行部署，生成速度与部署速度会明显慢于宿主机。

首先安装NodeJS、NPM、Git并验证是否成功安装，根据Linux和Windows不同环境进行安装，可以去官网了解相关的安装步骤，或者参考Gitee和Github的两篇博文。

为了更好的编写笔记，最好配置一个图床，图床的配置可以使用Github、Gitee或者腾讯云的COS服务，相关的配置可以参考[LInk](https://aikenh.cn/en/PicBed/)


```sh
git version
node -v
npm -v
```

安装Hexo

```sh
npm install -g hexo-cli

# 查看Hexo的版本
hexo -v
```


## Initialize

### Blog

对博客目录初始化：`hexo init blog`，blog为空的话初始化当前文件夹，初始化后基本结构如下：

```sh
.
├── _config.yml # 网站的全局配置信息，在此配置大部分的参数。 
├── package.json # 定义Hexo，以及对应安装的依赖的版本等
├── node_module: # Hexo安装插件的位置
├── scaffolds # 页面模版文件夹
├── source  # 资源文件夹，除 _posts 文件，其他以下划线_开头的文件或者文件夹不会被编译打包到public文件夹
|   ├── _drafts # 草稿文件
|   └── _posts # 文章Markdowm文件 
└── themes  # 主题文件夹
```

有了初始化的目录后，就可以参考相关主题的官方介绍页面进行对应的 配置，不同的主题可能有不同的配置方法。接下来我们会以[《Live my life》](https://github.com/V-Vincen/hexo-theme-livemylife/blob/master/README_CN.md)主题为例。

后续基于别的主题对文件配置有了更深入的理解后，会对配置部分进行更新说明，或另开一贴。

### Github

 本文使用Github Page构建自己的静态站点，用于部署自己的网页。GitHub只能使用一个同名仓库托管一个静态站点：aikenh.github.io，但是可以在此站之上，使用其他仓库构建子域名如: aikenh.github.io/Docs 

Git和Github仓库和链接的初始化参见[GitWorkflow](https://aikenh.cn/en/GitGithub/)；对应的io，可以通过建立【UserName】.github.io为名的Repo，并在**Setting**-> **Code and automation** -> **Page**中选择对应的Branch作为Source.

![](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/imgs/20220413001718.png)

完成后如图所示，后续设置好域名解析服务后后可在**Custom domain**中设置你的自定义域名，github.io将自动转换成该域名，会在域名解析部分详细介绍

![](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/imgs/20220413001932.png)

创建完该网站Github的初始部分差不多完成。

## Config-livemylife

本章节的基本操作均针对`_config.yml`进行。

基于我的理解，为了便于多主题的配置和切换，在主*Config.yml* 中应该尽量不参与特定主题的设置，而在`Theme/SpecificTheme/_config.yml`中为每个主题定制基本的配置为好。但目前只用过这个主题，就以此为例。

更多的设置去主题的readme中查看和设置。

**初始化主题**：设置主题的基本需求，并基于此安装相关依赖

```sh
cd blog
rm -rf scaffolds source themes _config.landscape.yml _config.yml package.json yarn.lock #just keep node_modules
git clone https://github.com/V-Vincen/hexo-theme-livemylife.git
mv hexo-theme-livemylife/* ./
rm -rf hexo-theme-livemylife
npm install
```

**设置主题**：修改配置中的theme值

```yaml
theme: livemylife

themecolor:
	enable: true
	mode: light
```

完成了基础设置后，可以直接在本地运行博客，查看效果，方便后续调试后部署，具体命令如下

```bash
hexo cl && hexo g && hexo s -p your-port
# default port is 4000
hexo g && hexo s
```

### Basic Configs

使用自己的信息修改配置文件的对应选项，以下介绍一些基本属性配置：

```yaml
# header
title: My_Blog
subtitle: some description of u or ur site
author: NickName
timezone: 

# url
url: http://aikenh.cn # note: 不要忘了修改source文件中的CNAME
root: 
permalink: :lang/:title/ # 子页面的链接形式

# site setting
SEOTitle: Names Blog # 标签栏显示的标题
email：
description: "Development Documentation"
keyword: "name,Name,blog,Blog"
header-img: img/header_img/bg_img.jpg # 标题图像的存储路径，Source为根路径

favicon: img/avatar/f_img.png # 标签栏显示的图像

# 暂时不使用签名
signature: false
signature-img: _ 

```

不使用[Internationalization](https://v-vincen.life/en/How-to-Use-Internationalization%EF%BC%88i18n%EF%BC%89/)设置，关掉选项：

```yaml
langselect:
	enable: false
```

该选项会关闭生成语言选择按钮。

### Effects custom

该部分控制页面的特效设置。主要包括关闭线段背景，线段背景消耗CPU的同时还会遮挡文字，故而关闭；鼠标点击特效mouseclick关闭，在界面使用的时候异常选中的问题以及遮挡的问题。

```yaml
wave: true

# false can not disable this, should del content and color alse
mouseclick:
	enable: false
	content: 
	color: 

ribbonDynamic: true
bglinecanvas: false

```

### Sidebar & SNS

启用侧边栏放置相关的个人信息，SNS的设置实际上也与该部分相关，会显示在头像的下方。

```yaml
sidebar: true   # whether or not using Sidebar.
sidebar-about-description: "making trash"
sidebar-avatar: img/avatar/samura.jpg    # use absolute URL, seeing it's used in both `/` and `/about/`
widgets:
- visitor   # busuanzi: https://busuanzi.ibruce.info/
- featured-tags
- short-about
- recent-posts
- friends-blog
- archive
- category

# widget behavior 设置相关的Archieve侧边部件
## Archive
archive_type: 'monthly'
show_count: true

## Featured Tags 
featured-tags: true   # whether or not using Feature-Tags
featured-condition-size: 0    # A tag will be featured if the size of it is more than this condition value

## Friends 友站设置
friends: [
    {
        title: "GitBook",
        href: "https://Name.github.io/Docs"
    },
    {
        title: "Hexo",
        href: "https://hexo.io/"
    }]

# SNS Settings just enable what u want.
RSS: false
github_username: yourAccount
twitter_username: yourAccount
# instagram_username: 
# facebook_username:  yourAccount
# linkedin_username:  yourAccount
zhihu_username: yourAccount
weibo_username: numid of weibo in url
```

### Layout Custom

修改一些页面布局，除了一些基础设置，还有还有一些对应的标签问题。

```yaml
# top scroll progress
scroll: true
# make article sticky
top: true
# count word for each doc
wordcount: true
# show tag of each article
home_posts_tag: true
# anchorjs 设置锚点
anchorjs: true
socialshare: true
viewer: true
```

页面的Newer Posts和Old Posts在`theme`中，根据不同的语言选项去修改即可。
![](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/imgs/20220413013824.png)

页面背景在博文中通过Header（Meta-data）设置，批量转化的时候可以通过代码循环生成，后续进行转化的时候最好依靠随机数指定。

### Github Page

安装部署插件如下：

```shell
npm install hexo-deployer-git  --save
```

实际上就是将`public` 文件夹`push`到对应仓库的指定分支，有插件能够直接执行该操作，在config中执行如下设置：

```yaml
deploy:
  type: git
  repo: https://github.com/<yourAccount>/<repo> # or https://gitee.com/<yourAccount>/<repo>
  branch: <your-branch>
```

之后执行 `hexo d`即可

### Mathjax（TB fix）

用于下一次验证的策略：手动添加MathJa支持而不基于[Kramed](http://masikkk.com/article/hexo-13-MathJax/)，基于此思想迁移到[Mathjax3](https://adaning.github.io/posts/33457.html)，也避免了Kramed和Prismjs的冲突。

支持公式的方式主要有[以下](https://dog.wtf/tech/making-hexo-next-theme-latex-math-equation-supported/)的几种思路，该设置实际上主要是和Next主题相关，包括Katex等

![](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/imgs/20220413155935.png)

该主题目前使用的是Mathjax + kramed + it的方式。

官方描述对应的Latex支持, 该部分目前的渲染效果处于玄学状态，有时候能用，有时候针对一些语法会出现渲染错误，但是并不能很好的定位到错误的原因。现象如下：

- 缩略图中出现正常的渲染，而在正文中只显示公式
- 部分语法可以正常渲染，稍微复杂一点的无法渲染，且原因不定。

目前猜测可能与Package有一定的关系，在对hexo-renderer-marked等Package进行操作后，可能就会恢复正常。

当前情况下在Windows清除，在WSL2中执行Hexo命令好像就可以，非常的玄学。

目前按照[主题](https://v-vincen.life/en/How-to-Use-Mathjax/)的方式（默认已配置好），后续如果效果仍然不稳定，可能会对渲染的方式进行改动。比如利用[math的jax支持](https://linkinpark213.com/2018/04/24/mathjax/)，或者基于[pandoc](https://hexo-next.readthedocs.io/zh_CN/latest/next/advanced/%E9%85%8D%E7%BD%AEMathJax/)的方式把。后续再出现问题的话对比一下。

- 利用pandoc可以完美的显示所有的LaTex，但是原有设置下Archive主页的归档信息消失：
- 基于karmx等的数学公式无法完美显示，问题有些严重，所以最终还是换了

其中的一些[语义冲突修改](https://blog.csdn.net/qq_44766883/article/details/107103668)倒是在新版本中，好像影响不是很明显，可能更多的是与marked的冲突，但是我们使用的是别的渲染引擎

**CDN的设置**：可能需要自动[添加文件末尾](https://cps.ninja/2019/03/16/hexo-with-latex/)，CDN可以自己去找一找了，把后面的对其就行

> 在 ~/blog/\_config.yml 文件（注意，是 Hexo 博客文件夹根目录中的 /\_config.yml 而不是主题目录下的 /themes/next/\_config.yml）中增加 MathJax 的支持，并手动设置下面的 src（这一步很重要，使用默认的 src 会导致数学表达式渲染显示失败。这里的关键是 src 中的 ?config=TeX-MML-AM_CHTML 这个字段）

#### Pandoc

MathJax + PanDoc + it的解决方案，最好部署在自己的服务器上，部署在Github上有一些折磨, Pandoc需要使用CI或者Action去部署，等熟悉了再采用该方法把。

pandoc 需要本机中首先安装 [pandoc](https://pandoc.org/installing.html#windows)，各平台参考官方链接进行安装即可。

```bash
npm uninstall hexo-renderer-kramed --save
npm install hexo-renderer-pandoc -- save
```

（非正常方式）对于Archive的问题只需要修改一下生成Archive的路径即可，即通过修改config的生成archive和archive的路径

![](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/imgs/20220413155305.png)

具体的对pandoc的配置可以参考：[Link1](https://feigeek.com/posts/b1bbb984. html)，对其一些bug的修复则用[Link2](https://yidaoxiangan.com/blog/2021/03/17/Hexo%E4%BD%BF%E7%94%A8Pandoc%E6%B8%B2%E6%9F%93%E5%B8%A6%E6%9D%A5%E7%9A%84%E5%88%97%E8%A1%A8%E7%BC%A9%E8%BF%9B%E9%97%AE%E9%A2%98%E5%8F%8A%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88/)，但是暂时作为可选项，新版的好像已经没有问题。

目前配置如下（有一些不对的冗余存在）：
```bash
mathjax: 
  enable: true
  mhchem: false

katex: 
  enable: false
  copy_tex: false

pandoc:
 extensions:
    - '+hard_line_breaks'
    - '+emoji'
    - '-implicit_figures'
```

### Prismjs

在Hexo6.0[之前](https://sdwh.dev/posts/2022/01/Hexo-Syntax-Highlight/)还是需要借助插件的，但是根据[官方说明](https://hexo.io/zh-cn/docs/syntax-highlight.html#PrismJS)，在6.0之后官方已经添加了Prismjs的支持，disable Hightlight，Enable prismjs后，基于preprocess模式

```yaml
highlight:
  enable: false
  line_number: true
  auto_detect: true
  tab_replace:
  wrap: true
  hljs: false
  
prismjs:
  enable: true
  preprocess: true
  line_number: true
  tab_replace: ''
```

在对应的Theme/specific theme/layout/`_partial`/head.ejs中添加需要的css样式。
```javascript
<head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-lucario.min.css">
  ...
  
<\header>
```

对应的样式可以在[github prismjs](https://github.com/prismjs/prism-themes?utm_source=cdnjs&utm_medium=cdnjs_link&utm_campaign=cdnjs_library#readme) 中查看，其对应的cdn则按照此[链接](https://cdnjs.com/libraries/prism-themes)查询，虽然不懂得javascript，但是我寻思下载到本地也是一样的，按照其他对应的prismjs-hexo-Blog中的处理即可。

```javascript
<head>
  <link rel="stylesheet" href="/js/prism/prism.css">
  ...
  
<\header>
```

之后应该就可以正常使用

### Password 4 Blog

利用插件对特定的文章进行加密，使得特定的文章的查看需要输入密码。

安装插件：

```shell
npm install --save hexo-blog-encrypt
```

快速使用: 只需要在文章的Meta信息中添加Password字段即可

```markdown
---

password: test

---
```

也可进行全局加密设置：参考[Password](https://www.itfanr.cc/2021/04/16/hexo-blog-article-encryption/)

## Domain Setup

**腾讯云注册**：首先获取一个免费的域名或是去[腾讯云](https://dnspod.cloud.tencent.com/)/阿里云购买一个域名，（实名制->付钱->审核备案）

### DNS Setting

**DNS解析**：在购买域名的提供商为域名添加解析，以腾讯云为例：

（不推荐）如果想要使用ipv4，ipv6进行dns解析的话可以搜索Github Page的IP，或者
   ```bash
   ping username.github.io
   ```

（推荐）在[域名注册控制台](https://console.cloud.tencent.com/domain) 选择对应的域名解析
	   ![](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/imgs/20220413163700.png)

**主机记录**：@、www分别注册一次，分别用于https://yourdomain和 https:// www. yourdomain的解析。

**记录类型**：由于同个网站的CNAME和AAAA会发生冲突，这里建议使用CNAME类型，并在后续的

**记录值**: 中填写自己的username.github.io
![](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/imgs/20220413163804.png)

后面有免费的SSL记得勾选，等待审核即可。

### Deploy it

**Hexo部署：**

本地部署和服务启动不需要d（eploy）执行到前面即可在指定的端口查看本地的部署效果了。远程部署实际上就是`git Push -f` 到远程仓库的指定分支，完成前面github page的设置可以使用hexo -d 进行部署。

```bash
hexo cl 
hexo g
hexo s
hexo d

hexo cl && hexo g && hexo s && hexo d
```

**Github绑定：**

在站点的source目录下创建CNAME并添加域名

```bash
echo "yourDomain" >> CNAME
```

在Github-> Repo -> Settting -> Page —> Custom Domain 中填写域名并保存，等待解析完成后，即可。

参考资料：[Link1](https://cloud.tencent.com/developer/article/1834163)、[Link2](http://t.zoukankan.com/zengmianhui-p-12634066.html)


## Themes Switch

主题之间的切换应该和我预想的一致，下载主题到对应的Theme文件夹，在最外层的_Config中切换，但是由于我们的初始主题Live my LIfe极度依赖默认`_config.yml`，而非自身目录下的配置文件。故而有以下的几点工作

- **Compatibility Check**： config setting，plugin version and dependencies conflics
- **Dir structure**： check the consistency of the dir tree structure
- **Find themes u like**: latex-support，post-style，archive，tag，Difficulty，Long-Time-Support...

以下这些是一些初步筛选出来的觉得还可以的主题，之后可以切换看看：

1. [画廊](http://miccall.tech/2018/12/05/Shader/toolbag3%20Shader/) Miccall主页为画廊的基本样式，有对应的图库功能，作为图片和效果展示的话可能还不错，post页面和标签等页面较为一般。
2. [三钻主题](https://tridiamond.tech/)，亮色惊艳，暗色太花，设计难度和修改难度估计较大，Archive为时间轴模式，大爱，可以的话看看怎么将LivemyLife的Archive也变为这种样式。正文的效果以及对应的TOC
3. [极简程序员博客](https://www.iequa.com/)，简洁美但是稍微有点太简洁，Archive界面好像崩了
4. [闪耀狐](https://blinkfox.github.io/)，LTS，分类的雷达图，标签的热力图大爱，想办法搞到自己的主题里，功能较为全面和完善，如果想要自定义或者添加一些功能，完全可以参考这个主题。
5. [Find More](https://hexo.io/themes/) 官方主题游廊

当前对各方各面的概念还不是太理解，后面考虑对网页构建的底层，以及其他的相关知识进行进一步的了解，方便自己对网站进行更进一步的自定义。

## Public

站点提交，通过将自己的网页提交给搜索引擎，使得自己的文章能够被搜索到，目前暂时先不考虑Public，所以这里先行占位，功能暂时不进行支持。

主要参考[Link1](https://www.hansion.win/2020/04/13/hexo-bo-ke-deng-jing-tai-wang-ye-ti-jiao-bai-du-he-google-gu-ge-shou-lu/)，初步计划使用sitemap进行站点提交，由于baidusitemap存在较多冲突考虑先不启用。后续进行继续实验。

## Reference

1. [基础+百度网站提交](https://segmentfault.com/a/1190000017986794) | [基础解读](https://hackmd.io/@Heidi-Liu/note-hexo-github#%E4%BB%80%E9%BA%BC%E6%98%AF-Hexo%EF%BC%9F) | 
2. [Official SIte](https://hexo.io/zh-tw/docs/configuration)： 介绍默认_config文件的配置信息
4. [简单修改](https://yesmore.cc/cn/hexo-livemylife/#Mathjax%E6%B8%B2%E6%9F%93%E9%85%8D%E7%BD%AE)livemylife主题的一些简单修改
5. [知乎教程](https://zhuanlan.zhihu.com/p/26625249) 可以添加网易云音乐的外链，同时有我们需要的自定义社交网络按钮的部分（基于Next）去看看用的是什么插件，怎么嵌入。
6. [zhihu2](https://zhuanlan.zhihu.com/p/33616481)，基本同上，但是多了一些其他的自定义的
7. 大小写的改变不会git推送，导致发生[404](https://www.lovesofttech.com/general/hexoTagsAndCategories404Error.html)错误