---
calendar_date: 2023-05-06
catalog: true
categories:
- AIGC-StableDiffusion
cover:
  image: /cover/cover3.jpeg
date: 2023-05-06 23:43:41
lang: cn
mathjax: false
subtitle: null
tags:
- AIGC
thumbnail: /img/header_img/lml_bg3.jpg
title: AIGC05 Stable Diffusion Model Training
toc: true
---

> 该章节主要介绍 Stable-Diffusion 中模型的训练，考虑到硬件条件的限制，实际上这里介绍的训练，都是针对大模型的各种微调技术（Lora，Dreambooth，HyperNetwork, ...），这里会以 LoRA 模型的训练为主。

参考文献：

- [AIGC教程：Stable Diffusion精进，如何训练特定画风LoRA模型？ | 游戏大观 | GameLook.com.cn](http://www.gamelook.com.cn/2023/04/514936)
- [stable diffusion打造自己专属的LORA模型 - 王清培 - 博客园 (cnblogs.com)](https://www.cnblogs.com/wangiqngpei557/p/17301360.html)
- [sd-scripts/train_README-zh.md at main · kohya-ss/sd-scripts · GitHub](https://github.com/kohya-ss/sd-scripts/blob/main/train_README-zh.md)

## Train LoRA

> LoRA 的优势就是其模型更小，且更加模块化；也就是说其的训练成本和要求都更低，同时使用代价小，可以作为某种风格插件或者角色插件来使用。

-  [使用 LoRA 进行 Stable Diffusion 的高效参数微调 (huggingface.co)](https://huggingface.co/blog/zh/lora)
- [[2106.09685] LoRA: Low-Rank Adaptation of Large Language Models (arxiv.org)]( https://arxiv.org/abs/2106.09685 )

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20230706171541.png)

其中蓝色的是预训练好的源网络，而橙色的是新加的网络，通过控制 R 的宽度（文章主要论证了大模型的参数可能存在较低维度的秩，因此可以使用较小的 R 来对大模型的参数造成有效的影响），可以有效的减少需要训练的网络的 Size。


### 事前准备

> 这里只介绍本地训练，训练也可以在 Colab Notebook 等在线训练集群中进行，这里就不进行介绍了

1. WebUI + 想训练的基础 SD 模型
2. `.txt` 带说明的文本文件
3. Training Repo（[sd-script](https://github.com/kohya-ss/sd-scripts)、[lora-script](https://github.com/Akegarasu/lora-scripts)）
4. 数据集准备（准备好训练图像）

### 训练包准备

这里我们使用 lora-script 来进行模型训练，lora-script 实际上是 sd-script 之外在包了一层，新增了一些可视化的功能和一些其他的脚本，让 sd-script 更加易用，它调用 sd 中的脚本来实现训练，但是封装了一些注释和整理，此外还支持的 tensorboard 可视化。

> sd-script 本身包含了训练 lora、dreambooth、text-embedding、UNet、Text Encoder、图像生成、模型转换等多种功能。lora-script 还是主要专注于 LoRA 训练

查看 repo 也能知道 lora-script 中包含了 sd-script，所以我们部署的时候只需

```bash
git clone --recurse-submodules https://github.com/Akegarasu/lora-scripts
```

即可将需要的库安装下来，然后安装环境和相关以来只需要执行 `.\install.ps1` 即可（该脚本有 cn 版本，但是可能会出现问题），其会安装 sd-scripts 和 lora-scripts 需要的库。具体的可以参考相关 repo（sd-script 详细说明，lora-script 有简化版说明）。

> 安装的时候可能会出现虚拟环境未激活的问题，我们可以提前在改目录执行一次 python -m venv venv 一次即可。

Finish.


### 数据集准备

> 准备数据集的时候，要根据当前的设备显存对图片进行预处理，避免图片的分辨率过大，导致显存爆了，这里可以使用微软自己的 Powertoys 对文件进行批量 resize。

**数据需求：** 

- 如果希望有**更好的泛化性**，训练素材中应该包含各种：角度、表情、光线。
	- 如果是角色的话，建议尽可能的手机正面，侧面，背面，头像特写，
	- 画风素材可以多一点
	- 可以考虑扣白底： https://pickwant.com/home
- 简单预处理：调整分辨率（64 的倍数），裁剪。
- 数据量：如果是角色训练集在 20~50 左右足够，但是重要的是训练数据和训练轮次之间需要根据可视化做一个协调，避免过拟合（有时候可能也允许过拟合，取决于使用的场景）或者欠拟合的情况发生，原则上讲数据数量和轮次是正相关的关系。

预处理之**生成图像描述**：图像描述实际上是作为训练的标签存在，而显然，我们需要自动生成描述，如果还记得之前的文档，图生图功能中有**反向推演提示词**的方法，同样我们也会用该 Deepbooru 方法去生成标签，webui 中提供了一个专门的入口：

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230507164237.png)

在 resize 完成后，我们执行改生成图像描述的方法，指定好原图像位置和预处理之后的文件夹名字位置即可。

- 预处理之后的文件夹会包含原图和对应生成的描述 txt 文件。
- 生成的描述文件可以 check 一下进行手动修改，错误的标签可能会引导出错误的训练方向。
- 为了便于 LoRA 的后续描述生成相同的效果，可以删除部分不必要的标签，令重要的标签和效果的相关度提高，并覆盖部分细节标签，可以理解成把一系列标签打包成一个标签。

**训练数据就位：** 将训练数据转移到 `<...>/lora-scripts/train/` 中，如果没有该 train 目录就创建一个，单次的训练数据放在一个文件夹中，例如 `<..>/train/train_1_person/`

**正则化数据准备**(option)：在 train 中新建一个 reg 文件夹，用于正则化训练，命名和此次训练的文件夹名相同，例如：`<..>/train/reg/train_1_person/`，在其中放的数据和训练数据应该是同类的不同对象。

> 正则化的作用通常是避免模型过拟合，对模型添加额外的约束。例如我们训练一个猫，正则文件夹里应该同样存放猫（别的猫）的照片。

**基础模型就位**：将训练用到的基础模型复制到 `<...>/lora-scripts/sd-models/` 中，lora 是针对基础模型的注入（额外的 FC），对原模型进行部分的调整。

**注意事项：** 避免文件名重复，使用相同的文件后缀能够避免文件名重复的问题。

### 训练脚本编辑

better read: [sd-scripts/train_network_README-zh.md at main · kohya-ss/sd-scripts (github.com)](https://github.com/kohya-ss/sd-scripts/blob/main/train_network_README-zh.md) 

接下来就是编辑训练脚本中的基础设置，lora-scripts 中的注释已经非常详细的写好了每个参数的含义，这里就介绍一些可能需要或者常用的参数设置：

训练相关的一些设置如下

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230507170822.png)

-  `save_every_n_epochs ` 会决定我们最终获得几个模型，这里也可以设置一下。
- `reg_data_dir` 设置正则化的目录，为空为默认不启用。
- ... 其他的看看注释

还有一些输出相关的设置，包括输出模型的目录和名称，名称最好修改，避免一直都是默认的错误覆盖了：

> 目录最好用 10_\<EN\> 或者纯数字的目录，然后路径填写的时候只填写到上级目录，比如说数据存放在 `<...>/train/10_ron`，那么脚本中就填写到 `./train`，正则化目录同理。

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230507171041.png)

其他参数设置简单推荐：

- unet_lr 一般=lr
- lr_scheduler: `constant_with_warmup` 用的蛮多
- 优化器：
	- use_lion 目前最好的，但是有正则化素材最好别开

编辑完成后直接执行该 `ps1` 脚本即可。

> 脚本运行过程中可能会出现 nomodule named triton 的错误，可能是由于 windows 不支持该模块导致的，但是不影响最后的生成。

### LoRA 模型测试和选择

将模型导入 `/extensions/sd-webui-additional-networks/models/lora` 中，然后利用之前介绍过的 scripts 的 xyzplot 功能，分别测试和对比各个模型的效果，选择其中效果好的保留。

### 成品展示 & 简单心得

> 用我家猫小荣的 10-14 张照片训练出来了小荣的 Lora 模型（DreamBooth）也训了一下，但是显存（3070）不太够。

训练 Lora 中使用了如下的参数配置：

- Clilloutmix 作为底层模型
- 使用训练 DreamBooth 中生成的 700 张猫的图片作为正则化数据集
- BatchSize=2，Lr=e-4, Lion, Cosine_with_restarts, Max_train_epoch=10

此外，由于图片少（一致性太强）训练轮次多，应该是有些过拟合，Lora 调用时只能在 3 以下，不然难以和原图区分，可以对训练轮次和图片数量做一下调整。

训练的时候打标签除了自动生成的，最好还是主动去修改，各种细节剖开来，描述好姿势，颜色，背景，表情等，后面学到的模型对各个部分进行修改的化比较方便区分，避免全都耦合在一起。

此外标签中要给特定的对象一个特定的标签，方便我们产出该指定效果（或者角色）。

{{< galleries >}} 
{{<gallery src="https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/00009-3706840146.png" title="00009-3706840146.png" >}}
{{<gallery src="https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/00021-1903439770.png" title="00021-1903439770.png" >}}
{{<gallery src="https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/00031-4141742147.png" title="00031-4141742147.png" >}}
{{<gallery src="https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/00034-1003575578.png" title="00034-1003575578.png" >}}
{{<gallery src="https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/00000-4244496505.png" title="00000-4244496505.png" >}}
{{<gallery src="https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/00021-3282103832.png" title="00021-3282103832.png" >}}
{{<gallery src="https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/00024-4215830362.png" title="00024-4215830362.png" >}}
{{<gallery src="https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/00056-533810957.png" title="00056-533810957.png" >}}
{{<gallery src="https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/00001-2335627500.png" title="00001-2335627500.png" >}}
{{< /galleries >}}

## Dreambooth

> DreamBooth: Fine Tuning Text-to-Image Diffusion Models for Subject-Driven Generation。 
> 这种训练方式旨在微调 diffusion model 使其生成的图像专注于某个 object，具体可以看下面的示例图

相关资源链接： [webui训练插件](https://github.com/d8ahazard/sd_dreambooth_extension) | [offical repo](https://github.com/google/dreambooth) | [Paper](https://arxiv.org/abs/2208.12242) | [Dreambooth原理与实践](https://juejin.cn/post/7219968440760582205) 

> 如果需要深入了解实现原理的可以查看官方论文和对应的 repo 内容。

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20230511172006.png)

其具备以下的优势：

- 仅需要同一个**主体（动物，模型，等）** 的少量图片即可（3 到 5 张可以，但是越多越好）
- 可以基于该主体生成各种图片

> 针对该场景考虑将训练数据扣成白底可能也会使得生成的效果更好。

具体的训练的详细介绍，可以参考训练插件页面的说明进行尝试，这里简单介绍一下工作流程：

**A. 模型创建**：Dreambooth tab -> "Create Model" sub-tab -> 确定一个新的模型名称 ->选择本地的模型 / HF(model URL & token) -> 确定后源 ckpt 会暂时存储在 `models\dreambooth\MODELNAME\working` -> 点击 Create

**B. 参数设置**：Settings tab -> 是否使用 LoRA、BatchSize、Epochs 、学习率等等的设置都是基本的参数就不在介绍 

> 设置(settings)中的 `performance wizard (WIP)` 中可以查看建议的参数。

**C. Concepts 设置**：主要有两个类别：数据路径 + （class + prompt）

- 数据路径不在赘述
- Prompt 指的是我们的目标样本应该用什么提示词
- Class 填入的是与目标同类但是不同个体的样本，避免过拟合

**D. Saving 设置**： 主要是设置我们各种模型的保存策略，类似步长之类的。

**E. Generate 设置**：生成过程中的调整

设置完成后开始训练即可，可以看训练中的 loss 和模型训练过程中生成的图片，AFK，训练完成后就可以看到训练好的 CKPT 了。

## Textual Inversion

相关资源链接：[论文](https://arxiv.org/abs/2208.01618) | [官方代码](https://github.com/rinongal/textual_inversion) | [webui说明](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Textual-Inversion) | [textual-inversion.github.io](https://textual-inversion.github.io/)

> 其全称为 An Image is Worth One Word: Personalizing Text-to-Image Generation using Textual Inversion

**Textual Inversion**： 功能和其名字相互对应，反转 Text2Img 的过程，Img2Text 地建立图像与指定文本（Prompt）的关联。也就是说，当我们希望输入特定的 Prompt 能稳定的产生某个效果的时候，可以利用 Textual Inversion 技术来对模型进行改造，使得该特定的 prompt 能取得特定效果。

实际上该技术也能取得和 Dreambooth 类似的效果，具体可以看论文和例子，这里也只简单介绍一下训练和使用。

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230512085236.png)

**A. 创建 Word Embedding**（指定 Prompt）：

在 Train 标签页下创建 Embedding 页面，name 指定一个关键字（prompt），该 prompt 代表我们后续要训练出来的概念，创建完成后，就可以在 `/<...>/stable-diffusion-webui/embeddings` 路径下看到我们创建的 pt 文件

**B.数据预处理**：同 Lora 介绍的预处理图像，准备好训练数据

**C.参数设置**：

- Train-> Train 页面中，只训练 Embedding，所以 Hypernetwork 的地方放空。
- 填写的基本学习率等参数就不再赘述，
- **填写**：数据集目录、Log 目录等即可
- "Prompt template"需要注意下, 提供了几种可选的训练模式:
	-   style_filewords.txt: 表示训练画风
	-   subject_filewords.txt: 表示训练人物或物体

**D.选择训练 Embedding**：即可开始训练

**E.使用**：放在 `/<...>/stable-diffusion-webui/embeddings` 中，在相关生成过程中，填写 Prompt 的时候像 easynagetive 启用即可。

## HyperNetworks

[NovelAI Improvements on Stable Diffusion | by NovelAI | Medium](https://blog.novelai.net/novelai-improvements-on-stable-diffusion-e10d38db82ac) 

>Hypernetwork 是一种微调技术（by Novel AI ），它是一个**小型附加神经网络**附加在 Stable Diffusion 模型上以修改其风格，这种方式和当时的论文并不一致，当时的 HyperNetwork 是通过修改权重来进行调整，NovelAI 中使用到的则是添加一个小型的线性附加网络。

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20230706170343.png)

具体而言，其插入到噪声预测器 UNet 的交叉注意力模块中，（通常情况下是一个简单的神经网络：具有 dropout 和激活函数的全连接线性网络）通过插入两个转换 key 和 query 向量的网络来劫持交叉注意力模块。

其训练过程与 Text Inversion 几乎一致，这里就不在赘述，只描述部分不同：

- 创建模型的时候在 Train/Create Hypernetwork 选项卡
- 训练的时候选择 train hypernetwork
- 使用时存放的目录（应该也可以存放在 Addition Network 的文件夹中）为： `stable_difusion\stable-diffusion-webui\models\hypernetworks` 像 Lora 一样启用即可。


## FI

stable diffusion 的介绍暂时就到这边了，原理相关的东西就先不介绍了，以后如果有必要的话，或者谁有需求的话可以联系我更新。

- [x] 通过训练小荣来给出一个详细的参数设置（Dreambooth 和 Lora 和 TextInversion）