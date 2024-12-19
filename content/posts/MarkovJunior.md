---
calendar_date: 2022-07-10
catalog: true
categories:
- Game Generate
cover:
  image: /cover/cover22.jpeg
date: 2022-07-10 11:26:00
description: 概率编程语言Markov Junior 随机生成迷宫
lang: cn
mathjax: false
tags:
- Algorithm
thumbnail: /img/header_img/lml_bg22.jpg
title: Markov Junior
toc: true
---

@Reference: [Jack Cui](https://mp.weixin.qq.com/s?__biz=MzIxODg1OTk1MA==&mid=2247513354&idx=1&sn=28b5492cc0a86b04f0a0b975bf42568c&ascene=56&devicetype=iOS15.5&version=1800172f&nettype=WIFI&abtest_cookie=AAACAA%3D%3D&lang=zh_CN&fontScale=100&exportkey=ARSr9kinLTM%2B6fr7WYBKF%2FM%3D&pass_ticket=gK4kcTE5wfRRXzd0FMTJlg9zBNGh%2BZ5VoWQkUbqSJXykXGIdMXasyLJgUxII1IDt&wx_header=3) | [Github-Markov Junior](https://github.com/mxgmn/MarkovJunior) | [Wiki Markov algorithm](https://github.com/mxgmn/MarkovJunior)

第一篇文章简要介绍了一下该编程语言能实现什么效果；第二个是官方repo，其文档和代码都有很强的借鉴意义；第三个是wikipedia对马尔可夫算法的解释，在该编程语言的实现中有重要的意义。

## markov algorithm

马尔可夫算法指的是字符串重写算法，其基本逻辑如下:

1. 自顶向下依次检查规则，看是否能在符号串中找到任何在箭头左边的字符串。
2. 如果没有找到，停止执行算法。
3. 如果找到一个或多个，把符号串中的最左匹配的文字替换为在第一个相应规则的箭头右边的字符串。
4. 返回步骤1并继续。（如果应用的规则是终止规则，则停止执行算法。） [1] 



![image-20220710134410108](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/imgs/image-20220710134410108.png)

## MarkovJunior

Markov Junior是一种基于概率的编程语言，通过重写和传播规则（约束）来实现随机的生成和编写。最终对画布进行重写来实现随机的生成。

![sample](https://github.com/mxgmn/MarkovJunior/raw/main/images/top-iso.gif)

如上图所示，基础规则的约束以上图所示的**色块变换**和**Pattern**决定，再**基于马尔可夫算法**的规则，从上到下的规则逐渐进行**转化和重写**，实现最终关卡和规则的生成。

具体的例子如下，通过设定红色起点和颜色转换规则来进行全局的随机搜索实现色块的变化最后生成迷宫。

![MazeBackTracker](https://github.com/mxgmn/MarkovJunior/raw/main/images/MazeBacktracker.gif)

最基本的规则如上图所示，更为复杂的规则和写法可以通过参考GIthub上面的样例并进行自我实现来学习一下。

### 实现和测试