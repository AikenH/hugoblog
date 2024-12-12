---
calendar_date: 2024-01-30
catalog: true
categories:
- 前端三剑客入门笔记
cover:
  image: /cover/cover2.jpeg
date: 2024-01-30 10:40:23
lang: cn
mathjax: false
subtitle: null
tags:
- Web
- HTML
- CSS
- JS
thumbnail: /img/header_img/lml_bg2.jpg
title: LearnWeb01-DevPipeline
toc: true
---

>[!summary]+
> Familiar with the pipeline of how to build a website, how to organize the files, etc...


## Start Design

开始设计一个网站的时候，可以从以下三个方面入手来启动整个开发设计过程：网站的主题->基础的一些内容->整体的外观设计（草稿）

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20240130115132.png)

更具体一些：确定完要制作的网页，可以绘制草图有一个粗浅的整体效果，然后指定文本、图像、色彩、字体等资源，就可以开始制作了。

## File Structure

关于项目中的文件命名，需要注意的是以下的三点，建议养成这样的规范去建立网页文件夹。

- **建议使用完全小写来命名文件**，webserver 是大小写敏感的，所以复杂的大小写关系容易导致访问不到文件。
- **尽量不要使用空格**，空格可能会破坏链接被视为两个文件等，如果没有被区分很多服务器也需要使用 %20 对空格进行替换
- **尽量使用连字符代替下划线进行文件命名**，google 搜索引擎将连字符作为单词的分割符，而不会识别下划线

而文件存储结构部分，通常而言，有以下的关键文件和文件夹结构，在很多场景下也会将 image 等文件夹放到 static 文件夹中。

- index.html
- styles: 存放 css 文件
- images: 存放图片等媒体资源文件
- scripts: 存放 js 等脚本代码文件

资源的文件路径一般而言以 html 为 Basepath，然后根据上下级关系确认索引地址即可。

 

## Develop Online

一些 web 的在线开发和预览网站，可以通过编写 html,css,js 直接获取预览效果，对于一些简单的 web 应用可以直接在线开发，但是无法实现资源的存储和托管等。

- [JSFiddle](https://jsfiddle.net/)
- [Glitch](https://glitch.com/)
- [JSBin](http://jsbin.com/)
- [CodePen](https://codepen.io/)

这些线上集成开发环境还是比较方便好用的，可以尝试自己更喜欢哪一个。

## Publish

> 这里在家庭服务器中已经有过相关的介绍就不在赘述，简单描述一下流程

1. 从域名服务商获取域名
2. 获取 SSL 证书(https)
3. 具有公网 IP 的服务器部署服务到指定端口/ GITHUB Page 等托管网站
4. 使用 Nginx/Candy 之类的实现本地端口转发和域名解析
5. 服务商实现 DNS 解析，将域名解析到对应的 IP 地址（托管网站无需处理）