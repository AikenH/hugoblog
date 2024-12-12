---
calendar_date: 2021-09-26
catalog: true
categories:
- 笔记系统和博客搭建
cover:
  image: /cover/cover14.jpeg
date: 2021-09-26 15:36:25
lang: cn
mathjax: true
subtitle: Build your Gitbook
tags:
- Blog
- Gitbook
thumbnail: /img/header_img/lml_bg14.jpg
title: 基于 Gitbook 发布笔记
toc: true
---

Gitbook命令行工具，基于Markdown编写文档，后续基于Github发布该Blog

笔记的构建流程：

## Chapter1 Install

安装`Gitbook`之前我们需要安装`node.js`和`npm`的依赖，使用`npm`安装`gitbook`

- 首先安装Install Nodejs，Npm

  Windows：[Node.js (nodejs.org)](https://nodejs.org/zh-cn/download/)

  Linux:

  ```bash
  # add & update apt source before install nodejs.
  curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
  sudo apt-get update
  
  # install nodejs after that.
  sudo apt-get install -y nodejs
  ```

- 然后安装gitbook

  ```bash
  npm install gitbook-cli -g 

  gitbook fetch beta # 安装历史版本
  gitbook ls-remote # 列举可以下载的版本

  ```

- 检查Gitbook版本

  ```bash
  gitbook -V
  ```



### 安装Gitbook插件

安装插件主要有两种方式：一种是直接通过book和gitbook的安装来实现，另一种是基于Npm预先安装

```bash
npm install gitbook-plugin-PACKAGE
```

基于**book**的安装方式

插件和相关的配置在`book.json`中指定，关键词`plugins` & `pluginsConfig`为对应的插件的配置信息

添加插件通过修改`book.json`如下：

```json
{
	"plugins": [
        "-summary","-katex","mathjax-pro","anchor-navigation-ex-toc",
        "search-plus","-lunr","-search","splitter","copy-code-button","github",
        "theme-comscore","-latex-codecogs","tbfed-pagefooter","-expandable-chapters-small",
        "-edit-link-plus","expandable-chapters","pageview-count","-editlink",
        "lightbox","-highlight","prism","disqus"
    ],
}
```

添加完新的插件配置之后，运行`gitbook install ./`来安装新的插件

[gitbook-plugin-mathjax-pro - npm (npmjs.com)](https://www.npmjs.com/package/gitbook-plugin-mathjax-pro)；[PrismJS/prism-themes: A wider selection of Prism themes (github.com)](https://github.com/PrismJS/prism-themes)

```bash
# gitbook-plugin-mathjax-pro 安装方式
npm install mathjax@2.7.7
npm install gitbook-plugin-mathjax-pro
# and editor the book.json as below
```

```json
{
    "author": "AikenHong",
    "title": "Aiken's Blogs",
    "language": "zh-hans",
    "plugins": [
        "-summary","-katex","mathjax-pro","anchor-navigation-ex-toc",
        "search-plus","-lunr","-search","splitter","copy-code-button","github",
        "theme-comscore","-latex-codecogs","tbfed-pagefooter","-expandable-chapters-small",
        "-edit-link-plus","expandable-chapters","pageview-count","-editlink",
        "lightbox","-highlight","prism","disqus"
    ],
    "pluginsConfig": {
        "insert-logo":{
            "url": "https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/imgs/img/20210927180958.png",
            "style": "background: none; max-height: 120px; min-height: 120px"
        },
        "github":{
            "url": "https://aikenh.github.io/about/"
        },
        "tbfed-pagefooter": {
            "copyright":"&copy AikenHong",
            "modify_label": "该文件修订时间：",
            "modify_format": "YYYY-MM-DD HH:mm:ss"
        },
        "mathjax-pro":{
            "version": "2.7.7"
        },
        "prism":{
            "css": [
                "prismjs/themes/prism-tomorrow.css"
            ],
            "lang":{
                "flow": "typescript"
            }
        },
        "disqus":{
            "shortName": "aikensdoc"
        }
        
    }
}
```

安装Disqus的时候，要到Disqus官网进行账号注册，并安装个人评论的网站，记录唯一的个人标识符，然后再配置中引入即可；

使用prism代替

## Chapter2 Configure

`gitbook init`会初始化文件目录，文件夹会包含如下的结构：目录中的文件对应有如下的作用

```bash
.
├── _book         # 自动生成的html
├── book.json     # 配置文件
├── README.md     # 电子书的前言或者简介
├── SUMMARY.md    # 电子书的目录
├── chapter-1/
|   ├── README.md # 章节的描述
|   └── something.md
└── chapter-2/ 
    ├── README.md # 章节的描述
    └── something.md
```

编辑对应的`SUMMARY`同时可以按照文件夹结构进行组织，基本的组织结构可以按照下面的来进行部署

```markdown
# 概要

* [卷 I](part1/README.md)
    * [写作很棒](part1/writing.md)
    * [GitBook很酷](part1/gitbook.md)
  
* [卷 II](part2/README.md)
    * [期待反馈](part2/feedback_please.md)
    * [更好的写作工具](part2/better_tools.md)
```

## Chapter3 Deploy

在本地部署和运行一个样本书，设置gitbook的配置文件

### 初始化

将书籍创建到当前的目录或者指定的目录中

```bash
gitbook init
gitbook init ./directory # 在指定的目录中生成
```

### 构建

使用下面的命令会在当前目录下或者指定目录里生成`_book`目录，里面的内容是静态站点的资源文件：

```bash
gitbook build
```

### Debugging

您可以使用选项 `--log=debug` 和 `--debug` 来获取更好的错误消息（使用堆栈跟踪）。例如：

```bash
gitbook build ./ --log=debug --debug
```

### 启动服务

使用下列服务在[LocalHost](http://localhost:4000/)可以预览我们的的本地书籍

```bash
gitbook serve
```

## Chapter4 Publish

希望可以不借助`gitbook`服务来可视化界面，全靠`git` & `cmd` & `github`来进行一系列操作，这样就能通过我的`onedrive`来进行比较好的统一管理

### 托管到Github Pages

optional: 创建username.github.io的个人repo,可以通过[jekyll](https://github.com/AikenH/aikenh.github.io)来init该githubpage

- 创建note's repo, 用来存储自己的所有Liture
- 调用`gitbook serve`之后将`_book`的文件推送到repo的gh-pages分支
- 就可以在下列的url中看到自己的文档：aikenh.github.io/REPONAME/
- 修改io文件夹中的\_layout中的Default.html如下
  ```html
    <a href="https://aikenh.github.io/Docs/">Blog</a>
  ```

```bash
# enter the right dir
# we need to excute gitbook serve int terminal first
cd _book

# using condtional rules to control the update actions
if [ -d ".git" ];then
  echo "exist git files"
else
  git init
fi

# update those blogs using git
git add . 
git commit -m "update those blogs"
echo "update the local git log"

# push the update to the remote repo
git remote add origin git@github.com:AikenH/Docs.git
git push -f origin master:gh-pages
echo "finish pushing files"
```


## Reference

- [集成GitHub | GitBook文档（中文版） (gitbooks.io)](https://chrisniael.gitbooks.io/gitbook-documentation/content/github/index.html)
- [GitBook插件整理 - book.json配置](https://www.cnblogs.com/mingyue5826/p/10307051.html#11-全局配置)
- [gitbook-notes (gitbooks.io)](https://dunwu.gitbooks.io/gitbook-notes/content/GLOSSARY.html)
- [内含github部署资料](https://blog.cugxuan.cn/2018/12/03/Markdown/How-to-use-gitbook-elegantly/)
- [Katex 测试验证](https://pandao.github.io/editor.md/examples/katex.html)
- [Gitbook-plugin-summary](https://github.com/julianxhokaxhiu/gitbook-plugin-summary#readme)
- [实用配置及插件介绍](https://www.cnblogs.com/zhangjk1993/p/5066771.html#_label2_2)
- [gitbook 入门教程之主题插件](https://www.cnblogs.com/snowdreams1006/p/10680684.html)
- [Gitbook插件和主题](https://szdastone.github.io/posts/2019/01/4dd0f083.html)
- [GitBook相关配置及优化](https://www.jianshu.com/p/53fccf623f1c)
- [打造完美写作系统：Gitbook+Github Pages+Github Actions - phyger - 博客园 (cnblogs.com)](https://www.cnblogs.com/phyger/p/14035937.html#Github_Pages_629)
- [插件](http://gitbook.zhangjikai.com/plugins.html#prsim)