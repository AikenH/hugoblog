---
calendar_date: 2021-09-28
catalog: true
categories:
- Machine_Learning
cover:
  image: /cover/cover3.jpeg
date: 2021-09-28 05:34:22
description: null
lang: cn
mathjax: false
tags:
- ML-Backbone
thumbnail: /img/header_img/lml_bg3.jpg
title: EfficientNet
toc: true
---

Tags: Paper
URL1: https://arxiv.org/pdf/1905.11946.pdf
URL2: https://arxiv.org/pdf/2104.00298.pdf

提出了一种模型缩放策略，如何更高效的平衡网络的深度、宽度、和图片分辨率
**1. Efficient Net: Rethinking Model Scaling for Convolutional Neural Networks
2. EfficientNetV2: Smaller Models and Faster Training**

---

@Aiken H 2021 find detail to code his 

# Efficient Net V1

除了提出了缩放策略以外，还使用神经架构搜索还建立了一个新的baseline network，得到了一系列模型。

平衡网络宽度、深度、分辨率至关重要，这种平衡可以通过简单的恒定比率缩放维度来实现，于是我们**提出了一种简单有效的复合缩放**方法。

![https://raw.githubusercontent.com/AikenH/md-image/master/img/image-20210610180603496.png](https://raw.githubusercontent.com/AikenH/md-image/master/img/image-20210610180603496.png)

复合缩放的物理意义：输入图像更大的话就需要更多层来增加感受野和更多通道，从而能在更大的图像上捕获更多细粒度的图案，而宽度和深度（对于表达能力来说很重要）之间也存在着一定的关系，“我们”是第一个对此进行了建模的。

从各个维度单独的进行缩放能发现都存在着增益瓶颈，如何去得到这么一个合适的等比缩放增益


## Motivation and Method

**一些直观上的motivation，以及假想**

1. 不同的缩放维度不是独立的 
2. 直观上，对于更高分辨率的图像我们应该增加网络深度。
这样更大的感受野可以帮助捕捉更大图像中包含的更多像素的相似特征  
3. 相应的，更高分辨率的图像也应该增加网路的深度以便再高分辨率图像中捕获具有更多像素的更细粒度的图案。

**基于实验最终得到了这样的结果：**

 
<div>
$$ depth: d = \alpha^\phi $$
</div>
 
 
<div>
$$ width: w = \beta^\phi $$
</div>
 
 
<div>
$$ resolution: r = \gamma^\phi $$
</div>
 
 
<div>
$$ s.t. \alpha · \beta^2 · \gamma^2 \approx 2 $$
</div>
 
 
<div>
$$ \alpha \geq 1, \beta \geq 1, \gamma \geq 1 $$
</div>
 

![https://pic1.zhimg.com/v2-c98089649e1dd2a1e2f461347375a304_r.jpg](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/imgs/img/20210911211033.jpg)

**求解方法：**

1. 固定φ，然后通过网格搜索得到最基本的模型 Efficient Net-B0
2. 固定α、β、γ的值，使用不同的φ，得到相应的B1 -B7

## Experience Detail

[github.surf](https://github.surf/rwightman/pytorch-image-models/blob/HEAD/timm/models/efficientnet_blocks.py)

[github.surf](https://github.surf/facebookresearch/pycls/blob/HEAD/pycls/models/effnet.py)

[EfficientNet网络结构图_LYS_1129的博客-CSDN博客_efficientnet网络结构](https://blog.csdn.net/weixin_43915511/article/details/108285329?utm_medium=distribute.pc_aggpage_search_result.none-task-blog-2~aggregatepage~first_rank_v2~rank_aggregation-2-108285329.pc_agg_rank_aggregation&utm_term=efficientnet%E7%BD%91%E7%BB%9C%E7%BB%93%E6%9E%84&spm=1000.2123.3001.4430)

[图解EfficientNet模型的完整细节](https://cloud.tencent.com/developer/article/1699699)

[EfficientNet网络解析_bblingbbling的博客-CSDN博客_efficientnet网络结构](https://blog.csdn.net/bblingbbling/article/details/107113806)

[EfficientNet B0-B7 网络参数_繁华落尽，寻一世真情的博客-CSDN博客](https://blog.csdn.net/weixin_43509698/article/details/113824833)

![https://raw.githubusercontent.com/AikenH/md-image/master/img/image-20210611001122494.png](https://raw.githubusercontent.com/AikenH/md-image/master/img/image-20210611001122494.png)

从第三个连接中，我们可以整理出那些需要input的相关参数，然后输入网络中去建立该Model。

### 实现中的问题：

blockN

1. stride和padding在各个重复组合层中间的变化（只有DW卷积改变Imageview）（堆叠的层不改变相应的HW），也是由第一个层去进行处理
2. channel，在各个组合层之间的变化（堆叠的层刚好不改变channel数目）