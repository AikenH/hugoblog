---
calendar_date: 2021-11-29
catalog: true
categories:
- Machine_Learning
cover:
  image: /cover/cover1.jpeg
date: 2021-11-29 13:12:05
description: null
lang: cn
mathjax: false
password: aikenhong_blog
tags:
- Survey
- FSL
thumbnail: /img/header_img/lml_bg28.jpg
title: FSL前期调研
toc: true
---

{{% hugo-encryptor "aikenhong_blog" %}} 
## 主要是limited labels & Few Samples & Data programing  

---
~~Weakly supervised learning~~  
~~semi-supervised in video field~~  
if we can recoding this work?  
~~多指标下降（LOSS的耦合或者循环的选择）、相关的CV最新论文等等会在后续关注~~  
~~元学习、浅层神经网络的概念等等~~  ~~semi-supervised~~ 

---
### PART1 Limited Labels （base on LiFeiFei‘s reference）
*in this part we may list the paper which is useful for my recoding.*  
    还有一些其他重要的可能在对论文进行重新精读的时候要记得注意reference：就比如说在loss变换和决策树生成那一块。  
*distant supervision(it's kind of early) can be another baseline for our method, we need to understand how this method work for that situation*  
    distant supervisor到底是什么机制可以去CSDN什么的看一下  

---
Transfer Learning\label propagation算法也是这一块重要的baseline  
[Baseline](https://arxiv.org/abs/1904.11622)：scene graph prediction with limited labels  

---
**reference：**  
>- ~~×[Induction of decision trees](https://www.semanticscholar.org/paper/Induction-of-decision-trees-Quinlan/058bb096ce1507cd65b91e341317a8ab11a675de)~~  
~~if want download, try google it~~ 
>- [Pattern Learning for Relation Extraction with a Hierarchical Topic Model](https://www.semanticscholar.org/paper/01e2ed7202e357209c855927d23352b0f882c0a0)  
maybe we'll need this paper,when we try to recoding.  
nope.当我们写论文需要理论基础的时候可能需要，  
>- √[Data Programming: Creating Large Training Sets, Quickly](https://www.semanticscholar.org/paper/37acbbbcfe9d8eb89e5b01da28dac6d44c3903ee)  
it's important to see if this article have same idea with me?

it's kind of learning paradigm,  
是一种构建数据集中，标注数据的范式，通过这样的method可以对多种labeling function进行整合，同时减少标注的误差和overlap情况的解决。后续我们实现方法的时候可以参考一下这个的数学理论，帮助在实际中进行应用。  
（本文中对这里的noise-aware的损失函数进行了应用，使其适应概率标签从而抑制噪声。）  
**严重怀疑这是snorkel算法中的引文，直接引用过来**  

>- ×[Knowledge-Based Weak Supervision for Information Extraction of Overlapping Relations](https://www.semanticscholar.org/paper/d48edf9e81653f4c3da716b037b0b50d54c5b034)  
figure out how can knowledge-based benefit weakly supervised learning ?  
nope. NIP method. 运用语言结构，类似于发的东西，来对文本进行补全。如果我们需要了解基础知识怎么使用，可以尝试参考。

>- ※[Realistic Evaluation of DeepSemi-Supervised Learning Algorithms](https://arxiv.org/pdf/1804.09170.pdf)NIPS 2018  
深度半监督学习的现实性评估：公布了统一的重新实现和评估的平台（方式？），（针对于算法在生产现实之中的适用性发布的一个标准。）  
based on analysis of image algorithm：半监督的方法通过对未标注的数据中的结构范式进行学习，从而降低了对标注数据的需求，也就是说输入的数据是大部分未标注和少量标注数据，就可以逼近完全标记数据集的表现效果。[32,50,39]，这几个针对于图像情况的方法。  
分析后发现，他们评估算法的方式并不适用于将算法推广到实际的生产领域中，于是我们对于评估ssl算法的方式提出了一些新的看法。  
说的就是以前这些ssl在算法的效果上可能作弊的一些方面，如果使用这样统一的标准对算法进行评估的话，才能使得算法得到一个好的效果，此外他也提出了一些ssl在训练过程中的一些棉铃的问题：比如说假如我们把其他类别的数据，混入其中的话，那么所有这些ssl的算法的效果都会受到极大的影响。
>- ~~×[Learning from labeled and unlabeled data with label propagation](https://www.semanticscholar.org/paper/71a6896c98672fc9f41f48b7c10688d06d56437b)~~  
~~这是一个很重要的方法，但是没想到这个竟然这么早？（math or algorithm？）（2002）（最近读的另一篇论文好像就借鉴的这个思路）  
将数据从标记的高密度区域向未标记的数据区域进行传播，这一篇论文的话，主要存在一些数学推导，我建议从19的那一篇新的标签传播开始阅读，通过这篇来补全需要的数学基础，如果另一边已经讲述的很完备了就不需要这篇的内容了~~
---
### PART2 key words searching（such as few samples etc.）
**limited labels on github：**
>- **※microsoft's work:[github](https://github.com/microsoft/metric-transfer.pytorch)|[paper](https://arxiv.org/abs/1812.08781)**  
i think it’ll be important one，we‘ll need to think carefully about this.seems like they have already make it great.  
思路上可以给我们启发：提出了一个针对few samples的通用框架（通过度度量传播来进行的label propagation方法），来解决无论是transfer、semi-supervised、few-shot这样解决的问题，并有了一个巨大的提升。  
将少量标记的label propagation到大量的未标注数据上，从而创建训练数据。主要贡献：用于传播的相似性度量从其他相关域转移时，这样的标签传播方法非常有效。  
**这个算法框架可以细读一下，后续关照一下具体的思路和实现** 

>- ※The Limited Multi-Label Projection Layer:[github](https://github.com/locuslab/lml)|[paper](https://arxiv.org/abs/1906.08707)CVPR19    
LML projection Layer 是一种几何的K类预测，用来再**多类别少样本**的情况下**取代softmax**的一个映射函数，这一篇主要是数学理论，在最后实现的话，要进行一定的参考和学习。
>-  ※Learning Classifiers for Target Domain with Limited or No Labels[paper](https://arxiv.org/abs/1901.09079v2)ICML2019  
从所有的训练数据中学习一个混杂（mixture）的“原型”，然后将原型撕裂成一个个part/part-type（用attention机制来实现）、 然后通过多个part的概率组合来表示一个new instance。（use MACNN）。（即将变成低维的概率向量组成的编码=低维视觉属性LDVA）到时候找个图把这些方法全都对比一下。md花样太多了，玩晕了。
>-  Hand and Face Segmentation with Deep Convolutional Networks using Limited Labelled Data(论文还没出)[github](https://github.com/au-cvml-lab/Hand-and-Face-Segmentation-With-Limited-Data)  
>- 一些奇奇怪怪的github项目[github1](https://github.com/UdayaSameer/DeepSiameseNetwork)
---
**limited labels on google scholar：**
>- √[Large Scale Sentiment Learning with Limited Labels](https://dl.acm.org/citation.cfm?id=3098159)SIGKDD2017  
他是通过对tweet的表情数据进行标注，建立的数据集，使用了**self-learning**和**co-training**两种WSL的方法，来对未标注的数据进行标注两种方法的具体注解我已经放在pdf上了
>- ~~×[Large-Scale Video Understanding with Limited Training Labels](google it)~~  
~~这尼玛是本综述的书，吓老子一跳~~  
---
**few samples on google scholar：**  
>- ~~×[Learning Convolutional nerual networks from few samples](https://ieeexplore.ieee.org/abstract/document/6706969)2013  
this paper use the method of pre-trained (transfer learning instead nowadays) to get a satisfatory result.  
这篇文章太早了，需要的话再重新说吧。先不看~~
>- **※※[Few-Shot Learning with Graph Neural Networks](https://arxiv.org/abs/1711.04043)**（two-version）（2017）（2018ICLR）  
using graph network to implement semi-supervised. this research prove that the graph method perform well on 'relathinal' tasks.  
定义了一种图模型的网络框架来实现few-shot等few samples的任务，表明这样的图网络架构能够很好的实现关系这样的处理，也很容易在这样的情境下进行拓展，这也是一个框架设计的任务。但是我们能够从中学习一下图模型如何针对关系网络进行学习和训练的，以及探讨一下图网络的优势。这一篇文章也探讨了度量学习和元学习的一些东西，这一篇可以给一个高的阅读优先级。
---
**data programing:**
>- end
---

**Label propagation:**
>- ※[Active Frame Selection for Label Propagation in Videos](https://link.springer.com/chapter/10.1007/978-3-642-33715-4_36)ECCV2012  
decide how many frames we'll need to mark by human for the best result .  
文章通过动态规划来选定视频中的k个frame，作为key frame，通过这几个frame的人工标记，能够最大的降低算法在label propagation中的标记误差，（其中num of k和误差的权衡还不是特别清楚）取代了以往这个key frame选择的随机性，带来更好的性能。  
此外这个方法还关注于帧数选择的动态性，由于视频的独立性，所以固定帧数的选择不一定是合适的，应该根据视频本身的特性来选择才是更好的。（但是不知道时空复杂度怎么说）  
值得一提的是，文中还提到了一些辅助人工标注的算法，这些算法有时间的话可以通过CSDN去调研一下。（防撞车）
>- √[Dynamic Label Propagation for Semi-Supervised Multi-class Multi-label Classification](http://openaccess.thecvf.com/content_iccv_2013/html/Wang_Dynamic_Label_Propagation_2013_ICCV_paper.html)ICCV2013  
是一个基于图的方法，和eccv2012一致的地方在于，都认为视频任务的标注任务中，动态规划的part是需要的，上一篇用动态规划来实现keyframe的选择，这篇文章这是完全的semi-supervised的任务，他用dynamic的办法，动态的对多标签和多类信心进行拟合，从而动态的去更新相似性的度量，使用KNN来保留数据的固有结构。
>- ※※[Label Propagation via Teaching-to-Learn and Learning-to-Teach](https://ieeexplore.ieee.org/abstract/document/7447818)2016TNNLS  
一个迭代的label propagation方法，结合了一定self-learning 的机制，从dataset中迭代的选出易于分类的部分，然后通过不断的对这种易于标注的数据中去self-learning，从而提高分类器的性能，然后逐步的去针对模糊边界进行propagate。感觉是一个好方法  
intro中简要的对比介绍了这之前的一些label propagation方法，包括DLP。
based on the sota LPmethod，所以之前的一些可能可以不用看了，
>- ※※※[Learning to Propagate Labels: Transductive Propagation Network for Few-shot Learning](https://arxiv.org/abs/1805.10002)ICLR2019  
结合了meta-learning/label propagation/transductive inference的方法，细看细看，这一篇一定要细看。太强了兄弟。intro里面也包含了很多的东西。  

---

### PART3 few-shot learning  etc.（including one-shot learning)
淦淦淦，这尼玛比的定义能不能统一一哈

**Few-Shot Learning:**
>- √[Prototypical Networks for Few-shot Learning](http://papers.nips.cc/paper/6996-prototypical-networks-for-few-shot-learning)2017\NIPS  
思路上好像和19年的cvpr那片有点像，先学习一个overall 再通过度量空间对newdata进行适应性的分配和训练。通过intro，我认为更像是一个简单的embedding的办法，将sample聚集到embedding space的一个原型上，在对其进行近邻标签传播算法把。  
但是里面有一些数学推导，可能是关于距离的，在我们后续需要划分指标的时候可以来看看这篇到底说了啥。（原型网络的数学推导。）
>- √[Meta-Learning for Semi-Supervised Few-Shot Classification](https://arxiv.org/abs/1803.00676)2018、ICLR  
正好是上面那片原型网络的升级方法，这也太巧了把。重开一个新的课题，设置环境成为一个wild的环境，存在干扰项，将未标注的data也混杂进原型的训练中。
>- ~~×[Conditional Networks for Few-Shot Semantic Segmentation](https://openreview.net/forum?id=SkMjFKJwG)2018\ICLRworkshop track  
貌似有点弟弟，没提出什么有用的东西~~
>- ※[Few-Shot Object Detection via Feature Reweighting](http://openaccess.thecvf.com/content_ICCV_2019/html/Kang_Few-Shot_Object_Detection_via_Feature_Reweighting_ICCV_2019_paper.html)2019/ICCV   
在一个base class 的dataset上进行meta training，然后通过 reweighting 操作，adapt to novel classes。  
global原型，meta的场景学习策略，transfer的reweighting操作，以及在few-shot问题种加入了很多算法并没有考虑的localization问题。  
这篇论文看起来还行。  
>- ※※[Meta-Transfer Learning for Few-Shot Learning](http://openaccess.thecvf.com/content_CVPR_2019/html/Sun_Meta-Transfer_Learning_for_Few-Shot_Learning_CVPR_2019_paper.html)2019\CVPR  
通过多次的meta学习，来找到参数相对于原DNN网络（普通的meta都是用的浅层网络）而言的scaling和shifting，感觉和上一篇reweighting方法存在一定的相似性。 同时我们也知道基本的meta-learning 方法和场景图应用的方法存在极大的相似性。
此外在训练策略上，采用了一个HTmini-batch的变体策略。（figure1有简要说明，结合后面的策略观看）
>- ~~×[Deep Learning Models for Few-shot and Metric Learning](http://104.211.88.42:8080/handle/2005/4275)  
这一篇看不了~~  
>- √[Learning to Compare: Relation Network for Few-Shot Learning](http://openaccess.thecvf.com/content_cvpr_2018/html/Sung_Learning_to_Compare_CVPR_2018_paper.html)2018\CVPR  
meta-learning 中的query 和support 不要搞混了。  
（前面还有一步是通过embedding来学习一个合适的feature）  
感觉上是一个基础的meta-learning框架，通过训练过程中对metric distance的学习，得到一个模型框架，然后通过模型将support data在metric space中与query data进行distance的衡量，从中选择shortest one作为classification的指标。
>- ※[Dynamic Few-Shot Visual Learning Without Forgetting](http://openaccess.thecvf.com/content_cvpr_2018/html/Gidaris_Dynamic_Few-Shot_Visual_CVPR_2018_paper.html)2018\CVPR  
为了使得模型在学习新的类别的时候，对旧的类别的识别能力依旧能保留下来，提出了两个策略，一个是基于attention 的分类权重生成器，二是对ConvNet进行重新设计，使其提取出feature的表征向量和分类权重向量之间的余弦相似性。？具体的还没看。但我认为主要努力的方向好像不是很对。
>- [Few-Shot Human Motion Prediction via Meta-Learning](http://openaccess.thecvf.com/content_ECCV_2018/html/Liangyan_Gui_Few-Shot_Human_Motion_ECCV_2018_paper.html)2018\CVPR  
是一种结合了MAML、MRN、Meta-Learning的策略，本质还是一个few-shot的工作，没有提到怎么把这样的工作适应到真实的应用上，  
这一篇论文非常需要机器详细的阅读，不然的话不知道他到底是怎么操作的。  

最终我们可以提出一个framework，通过对弱监督方法的嵌入，使得标注的任务变成一个人机交互的loop，通过我们对算法的干预，他将从标签的概率预测变成一个确定的指标预测，然后执行self-learning的方法，让自己逐渐变得更好，设定一个drop out，可以计算一个算法的最终所求时间。
{{% /hugo-encryptor %}}