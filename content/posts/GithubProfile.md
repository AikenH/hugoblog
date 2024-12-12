---
calendar_date: 2023-01-21
catalog: true
categories:
- Github个人主页设置
cover:
  image: /cover/cover18.jpeg
date: 2023-01-21 21:25:24
lang: cn
mathjax: false
subtitle: null
tags:
- Github
thumbnail: /img/header_img/lml_bg18.jpg
title: Github Profile 个人主页
toc: true
---

**Reference**

本文介绍如何配置自己的 Github 的个人资料界面，同时会介绍相关美化个人资料的一些资源网站和项目，并简单介绍其用法。最终结果如下（还有许多优化的空间）：

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20230122113307.png)



## 创建同名仓库

Github 中创建用户名的同名仓库，该仓库的 README.md 将会在个人的资料页进行展示。(附上官方的说明如下)

> AikenH/AikenH is a special repository. Its `README.md` will appear on your public profile.

创建该仓库之后，我们对 Readme 的改动将会实时的同步到我们的个人界面，后续我们就只需要专注于编写和修改该 Readme 即可。

## 相关资源推荐

由于大家的审美和风格不同，这里不做设计上的推荐，仅推荐一些用于美化个人界面的资源和部分项目的用法（以本人的 blog 为例）。

名字部分，简单文字转图片随便找一个[工具箱](http://www.atoolbox.net/Tool.php?Id=723)或者网站生成即可，不在赘述；

**这里是一个工具和推荐仓库的大全集**：[abhisheknaiidu/awesome-github-profile-readme]( https://github.com/abhisheknaiidu/awesome-github-profile-readme#tools )

这里是一些优秀的 [readme profile](https://zzetao.github.io/awesome-github-profile/) 

## 动态字幕

介绍使用的动态字幕效果实现：[DenverCoder1/readme-typing-svg](https://github.com/DenverCoder1/readme-typing-svg)，进入其 [Demo Site](https://readme-typing-svg.demolab.com/demo/)，设定想要的样式和文字即可生成对应的 markdown 和 html 代码。

```html
<p align="center">
	<a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&color=CC7DF7&width=435&lines=The+five+boxing+wizards+jump+quickly" alt="Typing SVG" /></a>
</p>
```

并通过 Html 样式指定居中对齐，将其放入 readme 中即可，效果如下：

<p align="center">
	<a href=" https://git.io/typing-svg"><img src=" https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&color=CC7DF7&width=435&lines=The+five+boxing+wizards+jump+quickly" alt="Typing SVG" /></a>
</p>

## 统计卡片

笔者更喜欢统计卡片 [anuraghazra/github-readme-stats](https://github.com/anuraghazra/github-readme-stats/blob/master/docs/readme_cn.md) 的风格和 ui，也可以展示特定的仓库等，统计指标更为完善。

使用时只需要指定 Username 即可，并根据自己的需求，添加和调整对应的参数，如添加 `&count_private=true`。

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&count_private=true&show_icons=true&theme=synthwave)

该项目也能展示如：热门语言卡片、pin 其他的 repo 等等功能的卡片。

## 徽章定制

徽章定制主要是 [Shields](https://shields.io)，输入自己的信息和颜色定制特定徽章，结合 Html 使用 href 超链接为佳，同时可以使用下面其他的样式来改变自己的徽标。

```url
https://img.shields.io/badge/<LABEL>-<MESSAGE>-<COLOR>
```

原始默认的样式如下： 
![]( https://img.shields.io/badge/github-aikenh-blue )

可以改变写法，引入样式进行改变：
```url
https://img.shields.io/static/v1?label=github&message=aikenh&color=blue&style=for-the-badge&logo=appveyor
```

变成如下的形式等等，其他的参考网站。
![](https://img.shields.io/static/v1?label=github&message=aikenh&color=blue&style=for-the-badge&logo=appveyor)


使用 [DenverCoder1/custom-icon-badges](https://github.com/DenverCoder1/custom-icon-badges/blob/main/README.md) 基于获取的 shields 的徽标进行进一步的自定义，得到更多样式，可以自己上传标志，或者打上更多标签。

- 修改 shields 的 url
- 选择其中的各种 slug 和 log 去进一步自定义该徽标

例如下面这个徽标，可以基于其 example usage 修改其中的文本和 icon 部分即可得到类似的效果。同样结合 html 的样式和 href 使用更佳。

```
<a href="https://aikenh.cn"><img alt="github" title="AikenD" src="https://custom-icon-badges.demolab.com/badge/-aiken%20blog-palegreen?style=for-the-badge&logo=package&logoColor=black"></a>
```

<a href=" https://aikenh.cn"><img alt="github" title="AikenD" src=" https://custom-icon-badges.demolab.com/badge/-aiken%20blog-palegreen?style=for-the-badge&logo=package&logoColor=black"></a>


## 统计奖杯

统计奖杯 [ryo-ma/github-profile-trophy](https://github.com/ryo-ma/github-profile-trophy) 可以根据 Github 账号的 Commit 等信息来统计 Github 的活跃程度，并通过奖杯的方式呈现出来（账户较为活跃的就可以使用这个来展示）。

```
[![trophy](https://github-profile-trophy.vercel.app/?username=AikenH)](https://github.com/ryo-ma/github-profile-trophy)
```

[![trophy](https://github-profile-trophy.vercel.app/?username=AikenH)]( https://github.com/ryo-ma/github-profile-trophy )

使用方法较为简单，只要修改提供链接的 username 改为自己的即可，当然也有一些包括设定 rank 或者显示特定奖杯之类的，可以在 readme 界面看看介绍，并进行自定义即可。

## 其他

1. 简单的 readme 生成工具：[rahuldkjain/github-profile-readme-generator]( https://rahuldkjain.github.io/gh-profile-readme-generator/ ) 可以借助这个生成工具得到部分产品图标。
2. Icons of bands，产品图标 svg 大全：[simple icons](https://simpleicons.org)，获取不同的产品图标，可以在定制 widget 什么的时候使用。