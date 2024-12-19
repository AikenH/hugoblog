---
calendar_date: 2020-01-14
catalog: true
categories:
- Dataset
cover:
  image: /cover/cover8.jpeg
date: 2020-01-14 02:13:25
description: how to build a Image Caption Dataset
lang: cn
mathjax: true
tags:
- Dataset
- Image Caption
thumbnail: /img/header_img/lml_bg35.jpg
title: Image Caption Dataset
toc: true
---

## Goals：

1.数据量要求  
2.标注的标准  
3.标注的手段  

## Microsoft COCO Captions: 

使用Amazon的Mechanical Turk(AMT)收集数据，再对数据进行标注。   
“Each of our captions are also generated using human subjects on AMT.”

### 一些其他信息：(Caption Evaluation Server):  

好像是可以评价caption的生成质量，但是应该是仅仅针对于使用COCO数据进行的，所以这一部分就不分析了。  
文中（section 3）包含了几种不同评价方法的介绍：  
>BLEU  
>ROUGE  
>METEOR  
>CIDEr

在进行Evaluation之前的 Tokenization and preprocessing中：  
使用了工具来添加caption标记：

- Stanford PTBTokenizer in Stanford CoreNLP tools (version 3.4.1)  

这个工具是模仿的是peen treebank3.   其参考文献和相关链接如下：  

>“The Stanford CoreNLP natural language processing toolkit,” in Proceedings of 52nd Annual Meeting of the Association for Computational Linguistics: System Demonstrations, 2014, pp. 55–60. [related-link](http://www.aclweb.org/anthology/P/P14/P14-5010)  

### 数据规模：


**（平均1-5）**   
330k image - >1.5m captions;   
训练&验证image : 每张照片的caption 由5个独立的人分别给出;  
对于Testing Image，收集额外的标题用来比较 人类标题的和机器生成的标题的表现。

>(MS COCO c5): 5 referenc captions for every image on MS COCO traning/ validation/ testing dataset.  
T: (82,782-413,915) V: (40,504-202,520) Testing: (40,775-179,189)

>(MS COCO c40): 40 reference sentences for a randomly chosen 5,000 images from the MS COCO testing dataset.  
>给出更多对应的句子，许多评估指标可能与人类判断，有更高的相关性。  
T: (82,782-413,915) V: (40,504-202,520) Testing: (40,775-200,060)

### 数据集搭建：
none

### 标注格式：

`#范例`

![3](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/imgs/img/20210911211210.jpg)
**Describtion**  
原则：尽量短，只包含准确且重要的现况，不包含任何推理的部分。  

>1. Describe all the important parts of the scene.  
>1. Do not start the sentences with “There is.
>1. Do not describe unimportant details.
>1. Do not describe things that might have happened in the future or past.  
>1. Do not describe what a person might say.  
>1. Do not give people proper names.
>1. The sentences should contain at least 8 words.

![figure2](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/imgs/img/20210911211229.jpg) 




## (NOT Caption)Microsoft COCO dataset:  
### 一些其他信息：  

“the creation of our dataset drew upon extensive crowd worker involvement via novel user interfaces for category detection, instance spotting and instance segmentation”  

“认为以往的数据集对于background信息过于忽视，除了主要的object 作为background的object很难识别”

应该是设计了一个便于标注的用户界面

### 标注格式：  
(Image-对应Question)为一组，按照实例分割对**对象**进行标记  
对每个对象main.backgroud都留存实例级别的分割掩膜(比bounding box精确的完全分割)  

![figure1](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/imgs/img/20210911211319.jpg)  
1.标注存在的类别：
>采用分层方法，先判断大类，这样逐层往下分，比较快  
>结果如图a

2.Instance Spotting： 
>第一步的时候，在找到的类别上画个x，这一轮，就找更多的类别，在新类上画新x
>结果图图b

3.分割实例
>修改了Bell等人的软件？用来标注  
>OpenSurfaces: A richly annotated catalog of surface appearance. SIGGRAPH 32(4) (2013)


### 数据规模：  
91 objects， 328k image， 250w instances  
类别少,实例多。避免long tail  
>COCO: 1 image - 7.7 object instance  
>imagenet: 3   
>SUN: 2.3  


### 数据集搭建：  

（COCO）基于Amazon Mechanical Turk收集数据，基于Image2text、SUNdatabase来查询图像对，从而收集。  
**分层标记方法**：将每个图像标记为特定的对象类别。

选择类别：只要那些thing（人，椅子，汽车），不要专注于stuff（天空街道草地）（没有精确的边界的）  

non-iconic & iconic图像：
（举个例子，比如证件照和乱拍的生活照？）是否是中心大对象之类的。
都有，但是大部分用non-