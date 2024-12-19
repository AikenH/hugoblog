---
calendar_date: 2023-04-26
catalog: true
categories:
- AIGC-StableDiffusion
cover:
  image: /cover/cover11.jpeg
date: 2023-04-26 21:19:41
description: Using Control Net to optimize you pic
lang: cn
mathjax: false
tags:
- AIGC
thumbnail: /img/header_img/lml_bg38.jpg
title: AIGC03 Stable Diffusion Control Net
toc: true
---

> ControlNet 是 Stable Diffusion 最强力的插件之一，它能够控制 SD 的整个扩散过程，包括让 AI 参考动作/骨架/线条/景深，从而更精准的生成图片。

- [ControlNet 按照骨架動作繪圖 | Stable Diffusion WebUI使用手冊](https://ivonblog.com/posts/stable-diffusion-webui-manuals/extensions/controlnet/)
- [骨架人偶 PoseX | Stable Diffusion WebUI 使用手冊]( https://ivonblog.com/posts/stable-diffusion-webui-manuals/extensions/posex/ )
- [生成多個人物 Latent Couple | Stable Diffusion WebUI使用手冊](https://ivonblog.com/posts/stable-diffusion-webui-manuals/extensions/latent-couple/)
- 拓展地址：[Mikubill/sd-webui-controlnet: WebUI extension for ControlNet (github.com)](https://github.com/Mikubill/sd-webui-controlnet)
- ControlNet 地址：[lllyasviel/ControlNet: Let us control diffusion models! (github.com)](https://github.com/lllyasviel/ControlNet)
- 模型地址：[lllyasviel/ControlNet-v1-1 at main (huggingface.co)](https://huggingface.co/lllyasviel/ControlNet-v1-1/tree/main)



## 插件安装和模型下载

> AssertionError: extension access disabled because of command line flags
> 无法在 Listen 模式下安装插件，这是为了安全性考虑。

插件安装界面安装 ControlNet 的 webui 插件，然后去模型地址下载 ControlNet 的模型，将模型放置在：`stable-diffusion-webui/extensions/sd-webui-controlnet/models` 目录中，而 CN 其中包含了很多种类，包括：

- Anime Lineart ：偵測線條，生成的圖片亦會保留原始的線條，適合處理動漫圖像
- Canny：偵測圖片邊緣，比較模糊，不如 Scribbles 完整。
- Depth：偵測輸入圖片的深度圖(depth map)。
- Illumination：偵測輸入圖片的光源與照明效果。
- **Inpaint：** 功能類似「內補繪製」，使用50%隨機遮罩＋50%隨機光流遮罩訓練而成。
- Instruct Pix2Pix 
	模型檔名為`ip2p`，類似「圖生圖」，但是使用訓練50%的指示(instruction)提示詞和50%的敘述(description)提示詞訓練而成。因為是ControlNet，使用此模型時不需要調整CFG Scale。
	根據原作者的說法，此模型在下「使其成為X」的提示詞所生成的圖，效果比「使Y成為X」要好。
	Also, it seems that instructions like “make it into X” works better than “make Y into X”.
- Lineart：偵測線條，適合處理線稿，生成的圖片亦會保留原始的線條。
- M-LSD ：偵測輸入圖片的直線。
- Normalbae 
- **Openpose：** 使用 OpenPose 技術偵測輸入圖片人物的動作，不一定會保留線條。
- Scribbles：偵測線條，偵測到的線條品質介於 Soft Edge 和 Lineart 之間。
- Segmentation：模型檔名為 `seg`，將偵測的圖片物件切成一個一個色塊處理，例如房子一個色塊，後面的天空一個色塊。
- **Shuffle：** 把輸入圖片的概念轉移到生成的圖片。作者給的例子：輸入灰色裝甲圖片，生成的鋼鐵人盔甲也會是灰色的。
- Soft Edge：偵測圖片邊緣，效果較為柔和，像用炭筆塗過。
- Tile：輸入圖片，選取一個區域，使其變清晰的模型。

模型放置完后，就可以开始使用 ControlNet 插件了。

## 插件设置和使用

安装完插件和模型后，就能在文生图和图生图部分看到 Control Net 的选项，点击该选项就能进入 ControlNet 的选单，

其中大部分的直接看字面意思就行了，解释一下重要或者难理解的几个：

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230426222417.png)


- **Enable** 必须启用
- **Low VRAM** 降低现存使用，无脑启用
- **Pixel Perfect** 由 ControlNet 决定预处理的分辨率，无脑启用
- **Allow Preview** 允许预览，包括线条和骨架，无脑启用
- **Preprocessor** 预处理器，通常要和模型一致，先将上传的处理过一轮，处理成骨架等线稿，如果图片是白底黑线，则需要选取反转
- Control Weight：control 的生效权重
- Start/ending step: 开始和结束参与的步数
- Loopback，将生成的图像在传回 ControlNet unit


## PoseX 使用

可以代替提供图片作为参照，可以自己作画画一个骨架，依赖项：

- 插件：[hnmr293/posex (github.com)](https://github.com/hnmr293/posex)
- openpose 的 controlnet 模型

装完插件就可以使用了，在列表中选择 Posex 即可开启调整，选择 send this to controlnet；
然后在 ControlNet 选单中

- Enable
- preprocess：None
- Model：openpose

其他的照常设置即可，效果如下：

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230426223026.png)

## Latent Couple 使用

结合 ControlNet 和 PoseX 使用，可以分割提示词，同时绘制多个人，指定不同的提示词和动作。

WorkFlow：

选中选单 -> Enable -> Create Blank Canvas 建立画布 -> 不同颜色鼠标绘制不同区域标识不同个体 -> finish sketch -> fill prompt in for the mask -> prompt info update 会自动上传到提示词窗口

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230426223743.png)

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230426223753.png)



## FI

本章节暂时到这，上述的两个插件在不同的场景下的使用是类似的，就不再赘述，本篇主要还是基于参考资料来的，建议查看原文，还有更多的插件推荐和说明。

下一章节主要整理一些 Prompt 相关的写法和资源推荐，最后有时间了再来梳理模型训练和原理。