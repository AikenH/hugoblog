---
calendar_date: 2023-04-26
catalog: true
categories:
- AIGC-StableDiffusion
cover:
  image: /cover/cover2.jpeg
date: 2023-04-26 21:22:38
lang: cn
mathjax: false
subtitle: null
tags:
- AIGC
thumbnail: /img/header_img/lml_bg29.jpg
title: AIGC04 Stable Diffusion Write Prompt Better
toc: true
---

> 该章节主要包括 Promot 生成和部分工作流的分析，旨在了解如何写出更好的关键词，如何生成更好的图片，当我们不知道怎么描述的时候也可以将该工作交给 ChatGPT，让其为我们攥写一般基础的提示词

## Prompt 编写范式

参考资料：[【Stable Diffusion】Prompt](https://zhuanlan.zhihu.com/p/619247417?utm_id=0)

通常编写可以遵照以下的类别进行组织，主要有 `<质量控制> + <前置> + <主体> + <场景词>` 几类，其中分别包括以下的几类词：

- **质量控制**：画质、镜头效果、光照效果
- **前置词**：画风、艺术家、风格
- **主体**：人物&对象、姿势、服装、道具
- **场景**：环境、背景、细节
- **Additional Network**：载入额外模型

**分割符号：** 各个关键词之间用 `,` 分割，且对应的权重从前到后依次递减，因此在编写关键词的时候也要注意先后顺序。

**权重加权符号**：各种括号代表各种不同的加权系数，这里建议用 `(prompt: weight)` 统一来编写提示词的权重规则，整体可读性会更好。

这里的 weight 指的是权重变成原本的 weight 倍，就可以调整加强或减弱。

> 各个括号的默认系数如下: () -> 1.1 ; {} -> 1.05 ; `[]` -> 0.952
> 可以通过(())进行叠加即 1.1*1.1



**额外模型调取**：编写格式为 `<lora:loramodelname:multiplier>`，即载入 loramodelname 模型，权重为 multiplier，该权重不建议过大。

**关键词的切换**： 语法如下 `[key1:key2:step]`，通过该语法可以实现在进行到不同步骤的时候使用不同的关键词进行渲染，其中 `:key2` 可以忽略，忽略后即可理解为 `["":key1:step]`，有一下的一些规则：

- Step 在大于 1 时表示具体的步骤，小于 1 时表示迭代步数的百分比
- 如果想要在某步之后忽略 key1，与上面忽略 key2 正好相反，可以写成 `[key1::step]`
- `[key1|key2]` 则表示两个关键词交替选择渲染

**反向提示词**：反向提示词就是让 AI 避免生成什么样的图片，使用得当可以帮助我们更好的生成想要的图片，后面再关键词的地方会介绍一些常见的反向关键词，例如低画质相关和一些容易变形身体部位的描述等

这里介绍一个 `easynegative` 的 embedding 模型，其是通过大量的不好的图片训练出来的模型，通过在反向关键词部分调用 easynegative 调用该模型即可过滤。

具体的使用方式如下：

首先去 C 站下载模型， [EasyNegative - EasyNegative | Stable Diffusion Textual Inversion | Civitai](https://civitai.com/models/7808/easynegative); 然后将其放入 `stable-diffuison-webui` 资料夹下的 `embeddings` 文件夹；重启之后在负向关键词中填入 EasyNegative 即可生效（也可从额外网络中选择 Textual inversion/tembeding，然后将该模型填入 Negative 中）

> 但是单独使用的话，效果可能还是没有那么好，所以最好还是结合着一些特定的负向关键词一起使用。


## Keyword 关键词

该部分主要来自参考资料，[原文推荐](https://zhuanlan.zhihu.com/p/619247417?utm_id=0) 阅读，如果觉得有用，请给原文点赞。

> 通过在文章前面添加画质关键词能提升生成图片的质感，质量，描述简单通用而有效

| prompt                                  | Desc                                         |
| --------------------------------------- | -------------------------------------------- |
| HDR, UHD, 8 k                           | 这样的质量词可以带来巨大的差异提升照片的质量 |
| Best quality                            | 最佳质量                                     |
| masterpiece                             | 杰作                                         |
| Highly detailed                         | 细节添加                                     |
| Studio lighting                         | 演播室灯光                                   |
| ultra-fine painting                     | 精细绘图                                     |
| sharp focus                             | 清晰聚焦                                     |
| physically-based rendering              | 基于物理渲染                                 |
| extreme detail description              | 详细刻画                                     |
| Professional                            | 改善图片的对比细节                           |
| Vivid Colors                            | 色彩鲜艳                                     |
| Bokeh                                   | 模糊背景，突出主题                           |
| (EOS R8, 50mm, F1.2, 8K, RAW photo:1.2) | 相机设置                                     |
| High resolution scan                    | 年代感                                       |
| Sketch                                  | 素描                                         |
| Painting                                | 绘画                                         | /

还有一些诸如：depth of field 景深、wide angle 广角之类术语，也能帮助我们生成更好的或者更符合预期的图片。

> 可以通过添加艺术家关键词来使得生成图片具备特定风格，常用于固定的风格模仿。

| prompt                                           | Artist                                                                   |
| ------------------------------------------------ | ------------------------------------------------------------------------ |
| 肖像画（Portraits）                              | Derek Gores, Miles Aldridge, Jean Baptiste-Carpeaux, Anne-Louis Girodet  |
| 风景画（Landscape）                              | Alejandro Bursido, Jacques-Laurent Agasse, Andreas Achenbach, Cuno Amiet |
| 恐怖画（Horror）                                 | H.R.Giger, Tim Burton, Andy Fairhurst, Zdzislaw Beksinski                |
| 动漫画（Anime）                                  | Makoto Shinkai, Katsuhiro Otomo, Masashi Kishimoto, Kentaro Miura        |
| 科幻画（Sci-fi）                                 | Chesley Bonestell, Karel Thole, Jim Burns, Enki Bilal                    |
| 摄影（Photography）                              | Ansel Adams, Ray Earnes, Peter Kemp, Ruth Bernhard                       |
| 概念艺术家（视频游戏）Concept artists video game | Emerson Tung, Shaddy Safadi, Kentaro Miura                               |

> 常用的反向 Prompt 常有如下的这些，实际上可以根据生成的情况放上去，或者根据需要的图片直接一股脑的放上去即可，希望 AI 画好一个元素，可以通过正 tag 结合反向的约束来实现。

| negative prompt           | Desc           |
| ------------------------- | -------------- |
| mutated hands and fingers | 变异的手和手指 |
| deformed                  | 变形的         |
| bad anatomy               | 解剖不良       |
| disfigured                | 毁容           |
| poorly drawn face         | 脸画的不好     |
| mutated                   | 变异的         |
| extra limb                | 多余的肢体     |
| ugly                      | 丑陋           |
| poorly drawn hands        | 手画的不好     |
| missing limb              | 缺少肢体       |
| floating limb             | 漂浮的四肢     |
| disconnected limbs        | 肢体不连贯     |
| malformed hands           | 畸形的手       |
| out of focus              | 脱离焦点       |
| long neck                 | 长脖子         |
| long body                 | 长身体               |



## Sample一些简单成品

{{< galleries >}} 
{{<gallery src="https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20230428141358.png" title="exam1" >}}
{{<gallery src="https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20230428141926.png" title="exam 2" >}}
{{<gallery src="https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/00037-1231245.png" >}}
{{<gallery src="https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/00030-1231245.png" >}}
{{<gallery src="https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/00206-3876028130.png" >}}
{{< /galleries >}}

## 参考资料

- [Stable Diffusion prompt: a definitive guide - Stable Diffusion Art (stable-diffusion-art.com)](https://stable-diffusion-art.com/prompt-guide/)
-  [繪圖AI - Stable Diffusion 相關教學與參考資源 202303 update - yoyojojo的創作 - 巴哈姆特 (gamer.com.tw)](https://home.gamer.com.tw/artwork.php?sn=5617022)
- [魔咒百科词典 (aitag.top)](https://aitag.top/)
- [AI繪圖魔導書 - Google 表格](https://docs.google.com/spreadsheets/d/16wR5Zg_aQEbxLdrTOrB9cZf8QmsMrJnSGxFKbZVtrKc/edit#gid=329580922)
- [https://majinai.art/zh-tw/index.php](https://ref.gamer.com.tw/redir.php?url=https%3A%2F%2Fmajinai.art%2Fzh-tw%2Findex.php)