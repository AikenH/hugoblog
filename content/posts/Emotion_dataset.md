---
calendar_date: 2019-10-14
catalog: true
categories:
- Dataset
cover:
  image: /cover/cover13.jpeg
date: 2019-10-14 21:34:54
lang: cn
mathjax: true
subtitle: null
tags:
- Dataset
- Emotion
thumbnail: /img/header_img/lml_bg13.jpg
title: 表情数据集
toc: true
---

根据这次需要搜集的表情的数据集，整理一下搜索数据集的网站和思路等

##PART1 "表情数据集" 
下列是对数据搜集的要求： 

- 是否开源
- 图片的大小和数量
- 图片的采集方式

eg：**ck+**  

==数据来源及对应的搜索结果如下：==

-  [谷歌数据集搜索导航](https://toolbox.google.com/datasetsearch)  
-  [60个人脸识别的数据集汇总](https://www.kairos.com/blog/60-facial-recognition-databases)  
-  [cv方面的好几百个数据集汇总](http://homepages.inf.ed.ac.uk/rbf/CVonline/Imagedbase.htm)  
-  [另一个cv方向的数据集汇总](www.cvpapers.com/datasets.html)   
-  [github-CV汇总帖](https://github.com/ChanChiChoi/awesome-Face_Recognition)

1. [EmotioNet](http://cbcsl.ece.ohio-state.edu/EmotionNetChallenge/index.html#overview)   

>好像是一个什么挑战赛的数据集要博士后或者相应教员才能申请使用[申请页面](http://cbcsl.ece.ohio-state.edu/dbform_compound.html)      
没有具体的用于表情识别的数据子集的信息（好像数据很多，但是不知道在哪下，除了那个博士后申请的）  

2. [RAF](http://www.whdeng.cn/RAF/model1.html)  

>real-world Affective Face  
**数据量**29672个图像，7种基本情绪，12种复合情绪，（包含种族年龄范围性别属性，5个准确定位和37个自动生成的定位）  
**数据收集方式：**来源网络，大小应该很杂 （由40个人独立标定）  
email  



**onenote中标记的和google 数据集搜索**

1. [FaceTracer Database](http://www.cs.columbia.edu/CAVE/databases/facetracer/) 
	basic info：（有图片的原始url）（wild）(网上收集的)姿势、环境、照明、质量 等等参差不齐，**大小不固定**
                  (针对**非商业用途开放**)   (**表情只有笑容**) 
                  故而不在详细收集，其他的标注信息，文中有详细讲解。
2. [Tencent ML-Images](https://github.com/Tencent/tencent-ml-images?tdsourcetag=s_pctim_aiomsg#tencent-ml-images)
	可能会有表情吧，是一个很大规模的多标签数据集。。。
3. [ND-2006 Dataset](https://cvrl.nd.edu/projects/data/#nd-2006-data-set) 06年貌似
	13450张图片
	6种基本情感
	888个对象 
4. [Google facial expression comparison dataset](https://ai.google/tools/datasets/google-facial-expression/)
	没有对数据集的基本信息介绍

**百度/CSDN搜索**  

- https://blog.csdn.net/mathlxj/article/details/87920084
- https://blog.csdn.net/computerme/article/details/49469767

1. [JAFFE](https://zenodo.org/record/3451524#.XaQ4vm5uKmQ) 
	只有219张，标签为分散离散值。
     划分六种情感指标  256*256 
2. 中科大的[NVIE](http://nvie.ustc.edu.cn/)
	其中**正面光照103人，左侧光照99人，右侧光照103人**。每种光照下，每人有六种表情（**喜悦、愤怒、哀 伤、恐惧、厌恶、惊奇**）中的三种以上
	平静帧、最大帧都已挑出 [下载协议然后发给他们，才能下载](http://nvie.ustc.edu.cn/contact.html)  
3. [AFEW database](https://sites.google.com/site/emotiwchallenge/) 
	 **数据来源**：电影片段的剪辑。**情绪类型**：“六类基本表情”+中性
	[SFEW database](https://cs.anu.edu.au/few/emotiw2015.html) 
	**数据来源**：从AFEW中抽取出来的表情的静态帧。标注都在xml中
4. [LIRIS-ACCEDE database](https://liris-accede.ec-lyon.fr/)
	同样也是基于电影抽取的，有三种数据集，包含离散的情感数据和基于维度的情感数据
5. [BU-3DFE database](http://www.cs.binghamton.edu/~lijun/Research/3DFE/3DFE_Analysis.html)
	3D的人脸表情数据集 **数据来源：**找人来做实验采集，按照要求的情绪做出表情
	**数据量：**2500个3d面部模型（来自100个人）
	还有同类的一些包含序列的等等的数据集，估计差别不大。
	同样需要email获取
6. [Oulu-CASIA database](http://www.cse.oulu.fi/CMV/Downloads/Oulu-CASIA)
	**数据来源**：让80个受试者做出相应的表情并用不同相机采集（红外可见光正常光和弱光）
	**情绪类型**：快乐、悲伤、惊讶、愤怒、恐惧、厌恶
	email
7. [RAFD](http://www.socsci.ru.nl:8180/RaFD2/RaFD)
	**数据来源**：让67个受试者做出相应的表情在不同注视点和不同角度采集
	**情绪类型**：8种情感类型
	email
8. [KDEF database](https://www.emotionlab.se/kdef/) 
	**数据来源**：柔和、均匀的光线，多角度拍摄表情，使用统一的T恤颜色，在拍摄过程中使用网格将参与者面部居中，以及在扫描过程中将眼睛和嘴巴定位在固定的图像坐标中。
	**数据量**：4900张 (70个人，一个7个情感)
	页面底端超链接（没进去成功。。）
9. [ExpW](http://mmlab.ie.cuhk.edu.hk/projects/socialrelation/index.html)
	9w张左右，图片差不多8G
10. [AffectNet](http://mohammadmahoor.com/affectnet/) 
	百万量级数据（Emotion Net好像也是）
	**获取方式**：从互联网获取
	**7类情感**，首页有各种情感的数据量，最少的也有4k张
	填写申请表email下载
11. [Multi-PIE Face Database](http://www.flintbox.com/public/project/4742/)
	收钱给数据集
	**获取方式**：记录会话
	**数据量**：75w图片
	
一些视频数据集(具体的在CSDN站上)（这些我就没有去详细看了）  

- [HUMAINE Database](https://humaine-db.sspnet.eu/) 应为带表情标签的视频数据集（CSDN用户表示下载后没有标签）(我翻墙也进不去很奇怪)
- [Recola database]()  
- [MMI]()  
- RU-FACS database-未公开  
- [Belfast naturalistic database]()-主要是演讲时候的情感识别  
- [VAM corpus]()也是演讲的
- [AVEC系列数据集]()