---
calendar_date: 2021-11-28
catalog: true
categories:
- Machine_Learning
cover:
  image: /cover/cover21.jpeg
date: 2021-11-28 06:24:17
description: 困难样本再采样
lang: cn
mathjax: true
tags:
- ML-Training
thumbnail: /img/header_img/lml_bg21.jpg
title: Hard Task Sampling
toc: true
---

# Trick：Hard Task

思路来源于Meta-Tranfer-Learning，基本思路是在Meta-Learning的每一次Meta-Test的时候，会从预训练错误率比较高的Task中再次采样，增加那些task的训练次数。也就是难题多做的策略。

## 基本思路

### 对比Adaboost

这样的思路其实和AdaBoost的想法是有一定的异曲同工之妙的，或者说其实就是AdaBoost的思路：

**Adaboost**

[参考笔记](https://zhuanlan.zhihu.com/p/39972832)，从该笔记中我们可以看到，AdaBoost的基本思路如下：

> Boosting算法的工作机制是首先从训练集用初始权重训练出一个弱学习器1，根据弱学习的学习误差率表现来**更新训练样本的权重**，使得之前弱学习器1学习误差率高的训练样本点的权重变高，使得这些**误差率高的点**在后面的弱学习器2中**得到更多的重视**。然后基于调整权重后的训练集来训练弱学习器2.，如此重复进行，直到弱学习器数达到事先指定的数目T，最终将这T个弱学习器通过集合策略进行整合，得到最终的强学习器.

和Meta-Transfer-Learning对比一下，我们可以发现，这个方法实际上就是讲Transfer Learning的与训练网络当成弱学习器1，然后通过弱学习器1的训练样本权重，来增大Hard-Task的配比（也就是增加任务的权重）完全一致。

### 具体实现

实现上主要是，样本sample的过程，就是如何在进行参数选择后和原本的Dataloader，结合起来。在这里我们主要参考MTL中的方法，进行网络的构建处理。

第一部分：**sampler构建**，为了后续Dataloader中进行数据的采样，需要构建一个这样的sampler，关键在于index的对应关系，以及最后输出的是index的集合。



```python
import torch 
import numpy as np
# 注意的点，我们需要确定我们batch数目，cls数目和每次每个cls选出多少个数据per
# 紧接着定义一个sample，sample输出的是对应原dataset中的数据的index，
class CatagoriesSampler():
    def __init__(self, label, n_batch, n_cls, n_per):
        self.n_batch = n_batch
        self.n_cls = n_cls
        self.n_per = n_per
        
        label = np.array(label)
        # 根据不同的label输入情况，我们可可能需要找到每个label对应的样本的index，将其整合在一起。如下（option）
        self.m_idx = []
        for i in range(max(label)+1):
            idx = np.argwhere(label==i).reshape(-1)
            idx = torch.from_numpy(idx)
            self.m_idx.append(idx)
   
	def __len__(self):
        # 要注意一下这里数据的长度是根据我们要输出的batch数目决定的
        return self.n_batch
    
    def __iter__(self):
        # 直接定义每次采样的时候的batch输出
        for i_batch in range(self.n_batch):
            batch = []
            classes = torch.randperm(len(self.m_idx))[:self.n_cls]
            for c in classes:
                # 随机选择出的类标签
                l = self.m_idx[c]
                # 随机选择样本
                random_pos = torch.randperm(len(l))[:self.n_per]
                batch.append(l[random_pos])
            # stack t and reshape的作用👇
            # stack 变成n_cls * n_per , t转置，reshape（-1）变成行向量
            batch = torch.stack(batch).t().reshape(-1)
            yield batch
```

第二部分：直接调用部分

其实就是很简单的Dataloader中就有这个参数设置，只需要定义好sampler就没什么太大的问题了。

```python
self.trainset = Dataset('train', self.args)
self.train_sampler = CategoriesSampler(
    self.trainset.label,self.args.num_batch, self.args.way, 
    self.args.shot+self.args.train_query)
self.train_loader = DataLoader(
    dataset=self.trainset,batch_sampler=self.train_sampler, num_workers=8, 
    pin_memory=True)
# 关键的地方在于最后一样的batch_sampler，这个在pytorch的dataload文档中分析过，就是每次会按这个规则在这里采样数据出来，一起训练。
```

第三部分：Hard-Task的选取

以什么形式或者标准来对Hard-Task进行选择，以及构建这个label list，因为我们知道，很多时候dataloader是不输出index的。

本文作者tmd直接偷懒，直接用数据集的label，也就是根本就不是Hard-Task的处理