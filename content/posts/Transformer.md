---
calendar_date: 2021-11-23
catalog: true
categories:
- Machine_Learning
cover:
  image: /cover/cover4.jpeg
date: 2021-11-23 06:38:19
description: null
lang: cn
mathjax: false
tags:
- ML-Backbone
thumbnail: /img/header_img/lml_bg31.jpg
title: Transformer
toc: true
---

@aikenhong 2021   

References For Transformer:

1. NLP [The Transformer Family (lilianweng.github.io)](https://lilianweng.github.io/lil-log/2020/04/07/the-transformer-family.html)
2. VIT [Transformer眼中世界 VS CNN眼中世界](https://mp.weixin.qq.com/s?__biz=MjM5ODExNDA2MA==&mid=2449941486&idx=1&sn=336a47a31f4b4ff0f6cd8e2fc3cb184a&chksm=b13c258d864bac9b32d10ec36a058d77cc7cf90e066e76ae476fd2fde1b54256cd608a559bb6&mpshare=1&scene=23&srcid=1101rcBaNzO4pu00PCPsJOAl&sharer_sharetime=1635744838591&sharer_shareid=ec299f1c891fc72cd699f8eaeb8a0cd5#rd)
3. 李沐 NLP [Transformer论文精读](https://www.bilibili.com/video/BV1pu411o7BE?spm_id_from=333.999.0.0)
3. Suveys [cver1](https://mp.weixin.qq.com/s?__biz=MzUxNjcxMjQxNg==&mid=2247514162&idx=2&sn=d094eecbfd91ca1e478c41e29f2b98d5&scene=21#wechat_redirect)， [cver2](https://mp.weixin.qq.com/s?__biz=MzUxNjcxMjQxNg==&mid=2247514982&idx=2&sn=7e38021234b7ab5455429e4485128efd&chksm=f9a1c9e9ced640ff045d1c4fe9d4e98a785602d980b25df4fa18477dd2b4b829ed4fc3fd028f&scene=21#wechat_redirect)，[cver3](https://mp.weixin.qq.com/s/_th7rXfZDuSu2xo7gdPp0w)

This blog will divided into several part : lil's blog, the survey for ViT, we using those article to help us understand the transformer.

综述我们以最新的一篇为准进行阅读，其他的可能后续进行查缺补漏把，如无必要，勿增烦恼。

## Intro导言

主要参考文章2来进行我们简单的导入

### 基本问题

Transformer原本是NLP中的重要模型, 作为LSTM的后继者, 用于处理Seq2Seq的数据类型和情景, 若是要将Transformer运用到Vision的领域中, 首要的问题就是如何:

**将Image作为序列化的Token输入Transform中** , 而达成这个目的主要有三种典型的方法:

- 像素点作为token,
- 使用VAE离散化图片作为token再输入
- ViT: 将图片切为一个个`Patch`在经过线性的`projector`之后组成一个`embedding`表示进行交互

![图片](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/imgs/3070imgs/20211120010516)

### CNN的异同分析

差异分析和计算主要靠CKA向量相似度计算来计算模型和表征之间的差异，这里的理论分析暂且不赘述，后续有需求的话可参考论文Similarity of neural network representations revisited或当前文章.


1. ViT的深浅特征高度相似, 而CNN则是层次化的存在表征区别.

   我想这和网络的结构之间有很大的关系, 序列化的结构和层次化的结构之间存在的差别.

2. ViT最后输出使用的是CLS token, 而CNN最终的Global Pooling导致Vi     T的顶层特征是独特的, 与CNN的深浅都不匹配

3. ViT 模型，在底层就已经是局部和全局信息都混在一起了，而上层则基本都是全局信息。和 ResNet 差别在于，因为 CNN 本身特性，底层只利用局部信息。

   此外，当用少量数据训练 ViT 的时候，发现底层的头是学习不到局部信息的。

   而这也导致了模型性能不是很好，所以视觉模型需要表现好，底层一般都需要学习到局部信息，这也是符合解剖学里面人类视觉神经结构的。

4. 最后一层的空间信息的学习和Pooling有关, 导致了ViT中有更多空间信息.

## Attention Is All You Need 李沐

实际上《Attention is All You Need》就是NLP的Transformer的祖宗，这一篇论文已经反反复复的度过很多次了, 所以这一部分主要用来做查缺补漏。