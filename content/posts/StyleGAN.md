---
calendar_date: 2021-10-03
catalog: true
categories:
- Machine_Learning
cover:
  image: /cover/cover11.jpeg
date: 2021-10-03 13:16:40
description: null
lang: cn
mathjax: false
tags:
- GAN
thumbnail: /img/header_img/lml_bg11.jpg
title: StyleGAN
toc: true
---

# StyleGAN V1 

@AikenHong 2020 10.8

《A Style-Based Generator Architecture for Generative Adversarial Networks》

## Related Work：
继承的文献工作： ProGAN
参考解读：

- [《其中子链接值得一看》](https://blog.csdn.net/a312863063/article/details/88795147)（包括源码解析啥的）（甚至还有GAN的笔记）
- [《StyleGan源码解析和拓展应用》](http://www.gwylab.com/pdf/Note_StyleGAN.pdf)
- [《秃头生成器1》](https://cuijiahua.com/blog/2020/07/dl-22.html)[《秃头生成器2》 ](https://cloud.tencent.com/developer/article/1658228)
- [NO.3](https://medium.com/swlh/hairstyle-transfer-semantic-editing-gan-latent-code-b3a6ccf91e82)

Contribution（Problem）：

1.  解纠缠：Mapping Network
2.  Noise Generator
3.  AdaIN before all conv

## Structure：

![image-20210930135938114](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/imgs/img/20210930135941.png)

![image-20210930161258031](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/imgs/img/20210930161259.png)

### Part1：AdaIN


复习一下IN（inception normalization）
 
<div>
$$ 
AdaIN(x_i,y) = y_{s,i}\frac{x_i-\mu(x_i)}{\sigma(x_i)}+y_{b,i}
 $$
</div>
 
![image-20210930161121411](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/imgs/img/20210930161124.png)

### Part2：Noise Generator

通过独立分辨率的高斯误差生成器，独立生成误差，然后控制例如毛发，胡须，雀版等等的随机生成。

### **Part3** 解纠缠（Mapping Function）

解纠缠定义：由线性空间组成的潜在空间，使得每个线性子空间控制一个变化因子。

如果使用原始输入的话，潜在空间各种因子的采样概率需要与训练数据集中的分布匹配，各factor就还是纠缠在一起，不能使得较好的独立性存在。

**解决方法：**

通过Mapping Network，将input Z -> W，在 W这个latent layer中提取出来的factor，就不需要遵循既有的分布，实现了解纠缠，使得各个变量能够独立的对特征进行控制。

**附加问题：**

如何衡量解纠缠效果，空间因子的分离程度：“线性空间中的插值可能对图像产生非线性变化”基于latent space中的变化和图像发生的变化来衡量分离的效果，潜伏空间中较小的变化也应该导致的是图像上较小（平滑）的变化。

**度量标准：**

- 基于感知的图像对距离**：**

  （通过2个加权VGG16 Embedding 之间的距离），假如我们再潜在空间的分割时线性的，也就是每一段都是线性路径，就能使得线性变化成立，理论上无限细分是可行的，实际上使用Σ = 1e-4,所以Z中平均的感知距离为：Lz，同理求得W中的Lw

- 线性可分离性**：**

  "如果充分的解纠缠，则应该找到始终和各个变化因素相对应的方向向量"。该度量标准是通过量化线性超平面，能够将隐含空间的点分成两个独立的集合的程度。这样每个集合能够对应图像的特定二值属性。（男女）

  在判别过程中使用和判别器又相同架构的分类器：保留属性，生成图像，进行分类，去除低置信度，得到带标签的钱再空间向量，svm预测标签，进行分类，计算条件熵

球面插值是归一化输入隐层空间中进行插值的最佳方法。

没有归一化的情况下就使用线性插值就好了

![image-20210930161345507](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/imgs/img/20210930161347.png)

![image-20210930161358285](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/imgs/img/20210930161359.png)

# V2 Analyzing and Improving the Image Quality of StyleGAN

**Relted Work**：Based on styleGAN.

[中文译文](http://www.gwylab.com/pdf/stylegan2_chs.pdf)

**Contribution**（Problem）：

1. 重新设计了生成器归一化方法，**改善了图像的质量**：
2. 同时路径长度调节器使得**生成器的过程可逆**，从而实现了网络可视化和方便对网络结构进行分析。

解决生成图像中水滴伪影的问题，将StyleGAN中的感知路径作为新的正则化器。

**Part1**：修改**AdaIN**的具体执行，消除伪像**

架构变化主要是：B->C->D