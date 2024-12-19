---
calendar_date: 2023-04-19
catalog: true
categories:
- AIGC-StableDiffusion
cover:
  image: /cover/cover2.jpeg
date: 2023-04-19 16:00:00
description: Intro on How to Set up and use it.
lang: cn
mathjax: false
tags:
- AIGC
thumbnail: /img/header_img/lml_bg2.jpg
title: AIGC01 Stable Diffusion and midjourney Setup
toc: true
---

> This Chapter introduce how to set up stable diffusion and mid-journey, and record some problem I meet when I deploy it. 

## (Deprecated) midjourney

> 由于 midjourney 现需要付费使用，同时没有开源，因此我们讲一笔带过该部分内容，该部分内容大多转载于  [超详细！AI 绘画神器 Midjourney 基础使用手册](https://www.uisdc.com/midjourney)

[midjourney](https://midjourney.com/home/?callbackUrl=%2Fapp%2F) 的安装步骤主要分成以下的几步：

1. 点击 Join the Beta 注册账号，注册完会跳转到；
2. Discord 首页，亲自创建自己的服务器，仅供我和我的朋友使用；
3. 下载客户端，在默认对话界面讯在或开始新的对话，输入 Midjourney Bot，添加到服务器
4. 付费开启体验。

## (Deprecated) DreamStudio

> 说是可以本地部署，但是实际体验非常不好，应该只是部署了 Webui，然后调用官方提供的免费 API；所以有时候生成不出来，但是又不报错，不知道是不是使用姿势有问题，反正很屎。

- https://github.com/Stability-AI/StableStudio
- 装好 npm 和 yarn
- 参考 quick start，git clone -> (cd) yarn 安装 -> yarn dev 部署在本地端口上。
- 官网注册账号-> 获取 API -> 填入并在最上方转到 Generate 页面即可。

## Stable Diffusion 部署专题

> 该部分作为 Intro，仅介绍 Stable Diffusion 的安装和部署，以及一些启用参数等，具体的使用在后面的文章进行进一步的讲解。

**基于官方 REPO**： [AUTOMATIC1111/stable-diffusion-webui: Stable Diffusion web UI (github.com)](https://github.com/AUTOMATIC1111/stable-diffusion-webui)

这里介绍基于 windows 的安装和 WSL2 的安装部署过程。整体的安装可能会分成以下的几个步骤进行：（推荐在安装和部署之前，参考 [[Published发布/WindowsCudaCudnn]] 一文，首先配置 CUDA，也可以遇到问题再部署）

- 基础依赖和环境安装（python、CUDA）
- Stable DIffusion 的 UI 界面和部分插件安装
- 模型下载和加载

<!--More-->

### Win 部署

> 一些像是 Conda 之类的包的安装这里都不会再赘述，可以参考相关文章 [[Published发布/python_pack_manager]]，这一部分仅针对 Stable Diffusion 的安装进行描述

1. (optional) 创建 Conda 环境，避免依赖冲突和污染，envname 可以是你自选的一个环境名。

```powershell
conda create -n <envname> python=3.10.6
```

2. 下载 stable-diffusion-webui 仓库, 会将该 repo 下载到当前目录，即 `./stable-diffusion-webui/`

```powershell
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git
```

3. ~安装 python 依赖的过程已经集成在启动脚本中，因此无需执行依赖安装~

> xformers 可能需要手动安装，并且需要额外的启动参数，安装脚本如下 `pip install -U xformers`

4. （已安装就忽略）安装 cuda，cudnn，参考相关文章

1.   启动网页客户端进行使用和测试
	- 其中如果带 listen 参数的话可以开启局域网访问。
	- 带 share （不推荐）可通过 python 的库托管，会给定一个公网 url，支持进行公网访问。
	- 带 xformers 可以在 webui 中启用 xformer，手动先安装一下

```powershell
./web-ui.bat --listen --xformers
```

或者直接双击运行即可。


### WSL 2 部署

> 这里的部署也可以作为 LINUX 部署的方式，实际上安装的过程和 windows 是相似的，只是最后启动的脚本不同。

其中 1~4 的步骤都是类似的，cuda 安装参考相关文章中 WSL2 专题即可；最后的执行脚本如下：

```bash
sudo ./webui.sh -f
```

这样执行的原因是可能会提示不是 root 用户，使用-f 参数强制其运行，并通过 sudo 避免访问受限。


### Docker 部署

参考资料：[Docker版Stable Diffusion WebUI，可cpu运行](https://zhuanlan.zhihu.com/p/614421868)

Docker Image：[AbdBarho/stable-diffusion-webui-docker: Easy Docker setup for Stable Diffusion with user-friendly UI (github.com)](https://github.com/AbdBarho/stable-diffusion-webui-docker)

安装的时候记得使用 -v 将 model 和 output 目录挂载出来，方便后续下载模型以及下载图片。

参考的启动脚本如下（WSL 2）：

```docker
docker run -it --name sdw --network host \
  -v /mnt/d/software/ai/stable-diffusion-webui/models:/app/stable-diffusion-webui/models \
  -v /mnt/d/software/ai/stable-diffusion-webui/outputs:/app/stable-diffusion-webui/outputs \
  --rm siutin/stable-diffusion-webui-docker \
  bash webui.sh --skip-torch-cuda-test --precision full --no-half --use-cpu Stable-diffusion GFPGAN ESRGAN VAE --all --share
```

后续有空的话会修改一下，或者给出 compose 文件。

## 插件安装和设置

插件安装，下列位置 URL 填入 Github 地址，点击安装后重启 UI 即可。

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230425125811.png)

- **Addition Net Work**插件：[kohya-ss/sd-webui-additional-networks (github.com)](https://github.com/kohya-ss/sd-webui-additional-networks)
- **中文插件安装和设置**：[VinsonLaro/stable-diffusion-webui-chinese: stable-diffusion-webui 的汉化版本 (github.com)](https://github.com/VinsonLaro/stable-diffusion-webui-chinese)

中文插件的启用主要在 Setting 选项卡中，用户界面的最下面，选择后保存（Apply Setting）并重载 UI （Reload Web UI）即可。

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230425125945.png)

### 插件更新&其他安装方式

直接到 extensions 目录下进行 git clone、git pull 或者下载安装包来进行解压都可以。

## 安装问题汇总

**Something went wrong Expecting value: line 1 column 1 (char 0)** ： 该错误和代理有关，关闭或者重启部分代理设置可解决。

**虚拟环境启动失效的问题**：删除 wsl2 中 stable-diffusion-webui 目录下的虚拟环境目录，重新执行即可。

```bash
rm -rv venv
```

## FI 后续安排

部署的部分到这里就结束了，之后的篇章会如下安排，时间未定，有时间的话会写：

- 基础的使用：页面和基本功能元素、各种模型的介绍、载入和使用、以及各种启动项的介绍；
- 插件和拓展：Control Net 和部分插件专题
- 训练：提供自己的图像训练自己的模型
- Prompt：整理 Prompt 资源，归纳自己用的 Prompt、Prompt 小技巧
- not sure）原理：Stable Diffusion 的论文原理和代码解读