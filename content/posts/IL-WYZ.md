---
calendar_date: 2022-01-03
catalog: true
categories:
- Incremental Learning
cover:
  image: /cover/cover18.jpeg
date: 2022-01-03 10:41:56
description: null
lang: cn
mathjax: false
tags:
- Incremental Learning
- Survey
thumbnail: /img/header_img/lml_bg18.jpg
title: WYZ-IL-Collection
toc: true
---

: hammer: 王耀智

## Regularization 系列方法

这类方法旨在添加一些正则化损失来解决 `catastrophic forgetting` 的问题。

### Weight Regularization

这类方法一般是对网络中每个参数的重要性进行评估，根据每个参数的重要性和梯度信息更新参数。

典型的文章为 [EWC](https://www.pnas.org/content/pnas/114/13/3521.full.pdf) .

> PS: 这类文章我也没有读过。

### Data Regularization

这类方法专注于记住特征表示，通常是结合 Hinton 的知识蒸馏损失函数使得模型记住旧类别的知识，解决 catastrophic forgetting。

推荐以下几篇文章：

- `LwF`(Learning without forgetting)，这篇文章在我看来是增量学习的开山之作，第一次给增量学习找到了一个比较好的方向，也是第一次将知识蒸馏应用到增量学习上；
- [PODNet CVPR2020](https://arxiv.org/abs/2004.13513) ，这篇文章最大的贡献在我看来是设计了一个全新的蒸馏损失函数，最终结果也是达到了当时的sota，甚至目前也是几个榜单的sota。

## Rehearsal 系列方法

这类方法主要的想法是使用一些旧类别的数据，在新类别到来时使用新旧数据一起训练模型，根据旧类别数据的真假分为以下两种方法。


### Pseudo rehearsal

这类方法通常是在学习旧类别的同时，训练一个生成模型，可以生成旧的类别数据，在新类别数据到来时，生成相当数量的旧类别数据，一起训练新模型。

这里推荐一篇文章：Continual learning with deep generative replay。

> PS：这个小类别的论文我也没有太关注，个人不是很推荐这类方法。

### Save real data

这类方法是开辟一个内存空间，空间中保存旧类别的少部分训练数据，在新类别到来时，使用内存空间的数据与新数据共同学习，按照对空间的使用方法不同可分为：

#### Exemplar Rehearsal

这类方法是将新旧数据混合，共同作为训练数据，一起训练模型，使得模型能够保持旧类别的知识。

但是在训练过程中新旧数据的类别数量是不均衡的，这也催生了我下面会说到的一大类解决方法。

这种方法推荐的论文是 `iCaRL`，这篇论文是 exemplar rehearsal 的开山之作，第一次提出了内存空间这个概念，也提出了一个非常有效的内存选择策略(herb)，并且也是第一个使用特征作为分类依据的方法，我个人认为是继 LwF 之后又一个将 IL 推到一个新的高度的方法。

#### Gradient Rectification

这类方法我称之为 Gradient Rectification，其主要思路是模型每次更新的梯度由 shared gradient 和 task-specific gradient 组成。分别代表所有类别的共性信息和某一个类别的特性信息，在新类别学习时借助内存空间中的数据获得旧类别的两项梯度，在更新时对梯度进行修正，力求做到不增加共享梯度代表的损失，尽量减少类别特定梯度代表的损失。

这类方法的论文推荐是 CVPR 2021 的 `Layerwise optimization by gradient decomposition for continual learning`，还有其前身作 `GEM`。

## Struture Base Methods

这类方法旨在设计一些新的结构或者更改结构以适应 IL 的实验设置，具体也分为两类：

### Special Architecture

这类方法设计一些特殊的模型或者拓展模型来适应 IL。

推荐几篇文章：

- `Lifelong learning with dynamically expandable network.`
- [`Adaptive Aggregation Networks for Class-Incremental Learning`](https://arxiv.org/pdf/2010.05063.pdf)

### Violent Stacking

这类方法是每次 task 训练一个特征提取器，然后将其与之前的堆叠，最后进行剪枝操作，减少模型参数。

这类方法目前只有一篇文章，CVPR 2021 的 `DER`，也是达到了部分 sota。

## Classifier Rectification

这类方法很大程度上是为了解决上面提到的数据不均衡提出的，主要是对训练完成后的模型的 FC 层进行修正。

这类方法的思路通常比较简单，但是非常有效。

推荐以下几篇文章：

- `BiC`: Large scale incremental learning
- `Maintaining discrimination and fairness in class incremental learning`

## Others

### Combine SSL

### Combine Meta-learning

### Define New Problem(Few-shot IL)

### Application in other tasks, like object detection