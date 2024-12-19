---
calendar_date: 2023-10-28
catalog: true
categories:
- 笔记系统和博客搭建
cover:
  image: /cover/cover2.jpeg
date: 2023-10-28 00:39:59
description: null
lang: cn
mathjax: false
tags:
- Obsidian
thumbnail: /img/header_img/lml_bg29.jpg
title: Obsidian使用 Spaced Repetition 制作闪念卡片
toc: true
---

该文作为基础的闪念卡片的使用说明，介绍几种闪念卡片定义的方式，便于后续查阅，参考：

- [Obsidian: Spaced Repetition插件使用指南 ](https://zhuanlan.zhihu.com/p/558326315)
- [Index - Obsidian Spaced Repetition](https://www.stephenmwangi.com/obsidian-spaced-repetition/)


## 基本规则

- 单个确定为 Flashcards 的笔记文件中可以存放多个闪念卡片。
- 会根据记忆程度来设立需要复习的时间

## 卡片分组

在 Tab 中使用 `/` 可以引出卡片界面的层级，只需要在设置里设定最高层的分组，后续的分组用 `/` 引出即可。

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20231027212958.png)

使用以下的标签就能实现上述的分组结果：`#vocabulary/day00`；需要注意到的是只有至少一个问答时才会显示在对应的表中。



## 卡片制作

在使用标签确定为 FlashCard 的页面可以使用如下的格式来定义一个一个的问答卡片，基础问答卡片的制作以如下的格式确认：

```txt
Question :: Answer.
```

{{< galleries >}} 
{{<gallery src="https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20231027232414.png" >}}
{{< /galleries >}}

### 单行翻转卡片

进行问答的翻转，会将一张卡变为两张，正反各问一遍，互为答案与问题；

```txt
Question ::: Answer
```

效果与单卡相似，只是多了一张卡，这里不再展示。

### 多行问答

-  `?` 分割问题和回答，此时的问题和回答都可以使用多行文本，便于编写复杂文本的问题。
- 类似的文本翻转可以使用 `??` 实现多行文本翻转

```txt
Multi Line Question1
Question2
??
Answer1
Answer2
```

### 完形填空

使用 == 连等号==框起来的文本==将会被自动识别为完形填空, 例如以下情况：

```txt
Using ==Obsidian== plugin to achieve ==flashcard== function
```

会分别识别成两个卡片，将 Obsidian 和 Flashcard 作为完形填空的问题，效果如下所示：

![](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20231028003022.png)

<img src=" https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20231028003101.png" style="zoom:50%;">

## FI